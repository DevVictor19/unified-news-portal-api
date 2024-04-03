import { NotFoundException, UnauthorizedException } from '@nestjs/common';

import { IJwtProvider } from '../../common/jwt/providers/jwt/jwt-provider.interface';
import { IUsersRepository } from '../database/repositories/users-repository.interface';
import { ITemplateEngineProvider } from '../providers/template-engine/template-engine-provider.interface';
import { IMailService } from '../services/mail/mail-service.interface';

import { PasswordRecoveryJwtPayload } from '@/common/@types/users/jwt-payloads.type';
import { IBaseUseCase } from '@/common/abstractions/usecases/base-usecase.abstraction';
import { TOKEN_TYPE } from '@/common/enums/token-type.enum';

type Input = {
  email: string;
};

type Output = void;

export class SendPasswordRecoveryEmailUseCase
  implements IBaseUseCase<Input, Output>
{
  constructor(
    private usersRepository: IUsersRepository,
    private jwtProvider: IJwtProvider,
    private templateProvider: ITemplateEngineProvider,
    private mailProvider: IMailService,
  ) {}

  async execute(input: Input): Promise<Output> {
    const existingUser = await this.usersRepository.findByEmail(input.email);

    if (!existingUser) {
      throw new NotFoundException('User not found');
    }

    const isEmailVerified = existingUser.email_is_verified;

    if (!isEmailVerified) {
      throw new UnauthorizedException('Email not verified');
    }

    const payload: PasswordRecoveryJwtPayload = {
      token_type: TOKEN_TYPE.PASSWORD_RECOVERY,
      userId: existingUser.id,
    };

    const token = this.jwtProvider.sign({ payload, expiresIn: 1200 }); // 20min

    const recoveryPasswordUrl = `http://example?token=${token}`;

    const html = this.templateProvider.compile('password-recovery.hbs', {
      link: recoveryPasswordUrl,
    });

    this.mailProvider.sendMail({
      body: html,
      subject: 'Recuperação de Senha',
      to: { email: input.email, name: existingUser.name },
    });
  }
}
