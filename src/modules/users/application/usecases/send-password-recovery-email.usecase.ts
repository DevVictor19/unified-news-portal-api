import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { ITemplateEngineProvider } from '../providers/template-engine-provider.interface';
import { IMailService } from '../services/mail-service.interface';

import { IBaseUseCase } from '@/common/application/usecases/base-usecase.interface';
import { TOKEN_TYPE } from '@/common/domain/enums/token-type.enum';
import { IDatabaseService } from '@/modules/common/database/application/services/database-service.interface';
import { PasswordRecoveryJwtPayload } from '@/modules/common/jwt/application/@types/jwt';
import { IJwtProvider } from '@/modules/common/jwt/application/providers/jwt-provider.interface';

type Input = {
  email: string;
};

type Output = void;

@Injectable()
export class SendPasswordRecoveryEmailUseCase
  implements IBaseUseCase<Input, Output>
{
  constructor(
    private databaseService: IDatabaseService,
    private jwtProvider: IJwtProvider,
    private templateProvider: ITemplateEngineProvider,
    private mailService: IMailService,
  ) {}

  async execute(input: Input): Promise<Output> {
    const existingUser = await this.databaseService.users.findByEmail(
      input.email,
    );

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

    this.mailService.sendMail({
      body: html,
      subject: 'Recuperação de Senha',
      to: { email: input.email, name: existingUser.name },
    });
  }
}
