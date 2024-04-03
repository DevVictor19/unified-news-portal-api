import { BadRequestException } from '@nestjs/common';

import { IJwtProvider } from '../../common/jwt/providers/jwt/jwt-provider.interface';
import { IUsersRepository } from '../database/repositories/users-repository.interface';
import { ITemplateEngineProvider } from '../providers/template-engine/template-engine-provider.interface';
import { IMailService } from '../services/mail/mail-service.interface';

import { EmailVerificationJwtPayload } from '@/common/@types/users/jwt-payloads.type';
import { IBaseUseCase } from '@/common/abstractions/usecases/base-usecase.abstraction';
import { TOKEN_TYPE } from '@/common/enums/token-type.enum';

type Input = { email: string };

type Output = void;

export class SendEmailVerificationUseCase
  implements IBaseUseCase<Input, Output>
{
  constructor(
    private usersRepository: IUsersRepository,
    private templateProvider: ITemplateEngineProvider,
    private mailProvider: IMailService,
    private jwtProvider: IJwtProvider,
    private serverUrl: string,
  ) {}

  async execute(input: Input): Promise<Output> {
    const existingUser = await this.usersRepository.findByEmail(input.email);

    if (!existingUser) {
      throw new BadRequestException('Email not registered');
    }

    const isEmailVerified = existingUser.email_is_verified;

    if (isEmailVerified) {
      throw new BadRequestException('Email is already verified');
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
        name: existingUser.name,
      },
    });
  }
}
