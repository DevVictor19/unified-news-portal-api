import { BadRequestException } from '@nestjs/common';

import { UsersFactory } from '../entities/users.factory';
import { IHashProvider } from '../providers/hash-provider.interface';
import { IJwtProvider } from '../providers/jwt-provider.interface';
import { IMailProvider } from '../providers/mail-provider.interface';
import { ITemplateEngineProvider } from '../providers/template-engine-provider.interface';
import { IUsersRepository } from '../repositories/users-repository.interface';

import { IBaseUseCase } from '@/common/abstractions/usecases/base-usecase.abstraction';

type Input = {
  name: string;
  email: string;
  password: string;
};

type Output = void;

export class SignupUserUseCase implements IBaseUseCase<Input, Output> {
  constructor(
    private usersReporitory: IUsersRepository,
    private usersFactory: UsersFactory,
    private hashProvider: IHashProvider,
    private templateProvider: ITemplateEngineProvider,
    private jwtProvider: IJwtProvider,
    private mailProvider: IMailProvider,
    private serverUrl: string,
  ) {}

  async execute(input: Input): Promise<Output> {
    const existingUser = await this.usersReporitory.findByEmail(input.email);

    if (existingUser) {
      throw new BadRequestException('Email already in use');
    }

    const token = this.jwtProvider.sign({
      payload: { email: input.email },
      expiresIn: '2h',
    });

    const verifyEmailUrl = `${this.serverUrl}/users/verify?token=${token}`;

    const html = this.templateProvider.compile('email-verification.hbs', {
      link: verifyEmailUrl,
    });

    this.mailProvider.sendMail({
      body: html,
      subject: 'Verificação de Email',
      to: {
        email: input.email,
        name: input.name,
      },
    });

    const hashedPassword = await this.hashProvider.generateHash(input.password);

    const user = this.usersFactory.create({
      email: input.email,
      name: input.name,
      password: hashedPassword,
    });

    await this.usersReporitory.insert(user);
  }
}
