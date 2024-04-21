import { BadRequestException, Injectable } from '@nestjs/common';

import { ITemplateEngineProvider } from '../providers/template-engine-provider.interface';
import { IMailService } from '../services/mail-service.interface';

import { IBaseUseCase } from '@/common/application/usecases/base-usecase.interface';
import { TOKEN_TYPE } from '@/common/domain/enums/token-type.enum';
import { IDatabaseService } from '@/modules/common/database/application/services/database-service.interface';
import { IEnvConfigProvider } from '@/modules/common/env-config/application/providers/env-config-provider.interface';
import { EmailVerificationJwtPayload } from '@/modules/common/jwt/application/@types/jwt';
import { IJwtProvider } from '@/modules/common/jwt/application/providers/jwt-provider.interface';

type Input = { email: string };

type Output = void;

@Injectable()
export class SendEmailVerificationUseCase
  implements IBaseUseCase<Input, Output>
{
  private serverUrl: string;

  constructor(
    private databaseService: IDatabaseService,
    private templateProvider: ITemplateEngineProvider,
    private mailService: IMailService,
    private jwtProvider: IJwtProvider,
    private envConfigProvider: IEnvConfigProvider,
  ) {
    this.serverUrl = this.envConfigProvider.getServerUrl();
  }

  async execute(input: Input): Promise<Output> {
    const existingUser = await this.databaseService.users.findByEmail(
      input.email,
    );

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

    this.mailService.sendMail({
      body: html,
      subject: 'Verificação de Email',
      to: {
        email: input.email,
        name: existingUser.name,
      },
    });
  }
}
