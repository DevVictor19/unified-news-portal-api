import { BadRequestException } from '@nestjs/common';

import { IJwtProvider } from '../../common/jwt/providers/jwt/jwt-provider.interface';
import { UsersFactory } from '../entities/users.factory';
import { IHashProvider } from '../providers/hash/hash-provider.interface';
import { IMailProvider } from '../providers/mail/mail-provider.interface';
import { ITemplateEngineProvider } from '../providers/template-engine/template-engine-provider.interface';
import { IUsersRepository } from '../repositories/users-repository.interface';

import { EmailVerificationJwtPayload } from '@/common/@types/users/jwt-payloads.type';
import { IBaseUseCase } from '@/common/abstractions/usecases/base-usecase.abstraction';
import { TOKEN_TYPE } from '@/common/enums/token-type.enum';

type Input = {
  name: string;
  email: string;
  password: string;
};

type Output = void;

export class SignupUserUseCase implements IBaseUseCase<Input, Output> {
  constructor(
    private usersRepository: IUsersRepository,
    private usersFactory: UsersFactory,
    private hashProvider: IHashProvider,
    private templateProvider: ITemplateEngineProvider,
    private jwtProvider: IJwtProvider,
    private mailProvider: IMailProvider,
    private serverUrl: string,
  ) {}

  async execute(input: Input): Promise<Output> {
    const existingUser = await this.usersRepository.findByEmail(input.email);

    if (existingUser) {
      throw new BadRequestException('Email already in use');
    }

    const payload: EmailVerificationJwtPayload = {
      email: input.email,
      token_type: TOKEN_TYPE.EMAIL_VERIFY,
    };

    const token = this.jwtProvider.sign({
      payload,
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

    await this.usersRepository.insert(user);
  }
}
