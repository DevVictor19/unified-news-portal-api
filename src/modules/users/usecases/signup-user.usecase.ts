import { BadRequestException, Injectable } from '@nestjs/common';

import { IUsersRepository } from '../database/repositories/users-repository.interface';
import { UserEntityFactory } from '../entities/users.factory';
import { IHashProvider } from '../providers/hash/hash-provider.interface';
import { ITemplateEngineProvider } from '../providers/template-engine/template-engine-provider.interface';
import { IMailService } from '../services/mail/mail-service.interface';

import { EmailVerificationJwtPayload } from '@/common/@types/users/jwt-payloads.type';
import { IBaseUseCase } from '@/common/abstractions/usecases/base-usecase.abstraction';
import { TOKEN_TYPE } from '@/common/enums/token-type.enum';
import { IEnvConfigProvider } from '@/modules/common/env-config/env-config-provider.interface';
import { IJwtProvider } from '@/modules/common/jwt/jwt-provider.interface';

type Input = {
  name: string;
  email: string;
  password: string;
};

type Output = void;

@Injectable()
export class SignupUserUseCase implements IBaseUseCase<Input, Output> {
  private serverUrl: string;

  constructor(
    private usersRepository: IUsersRepository,
    private userEntityFactory: UserEntityFactory,
    private hashProvider: IHashProvider,
    private templateProvider: ITemplateEngineProvider,
    private jwtProvider: IJwtProvider,
    private mailService: IMailService,
    private envConfigProvider: IEnvConfigProvider,
  ) {
    this.serverUrl = this.envConfigProvider.getServerUrl();
  }

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

    this.mailService.sendMail({
      body: html,
      subject: 'Verificação de Email',
      to: {
        email: input.email,
        name: input.name,
      },
    });

    const hashedPassword = await this.hashProvider.generateHash(input.password);

    const user = this.userEntityFactory.create({
      email: input.email,
      name: input.name,
      password: hashedPassword,
    });

    await this.usersRepository.insert(user);
  }
}
