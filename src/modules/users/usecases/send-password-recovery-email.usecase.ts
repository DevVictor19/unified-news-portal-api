import { NotFoundException } from '@nestjs/common';

import { IJwtProvider } from '../providers/jwt/jwt-provider.interface';
import { IMailProvider } from '../providers/mail/mail-provider.interface';
import { ITemplateEngineProvider } from '../providers/template-engine/template-engine-provider.interface';
import { IUsersRepository } from '../repositories/users-repository.interface';

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
    private mailProvider: IMailProvider,
  ) {}

  async execute(input: Input): Promise<Output> {
    const existingUser = await this.usersRepository.findByEmail(input.email);

    if (!existingUser) {
      throw new NotFoundException('User not found');
    }

    const payload: PasswordRecoveryJwtPayload = {
      token_type: TOKEN_TYPE.PASSWORD_RECOVERY,
      userId: existingUser._id!,
    };

    const token = this.jwtProvider.sign({ payload, expiresIn: '2h' });

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
