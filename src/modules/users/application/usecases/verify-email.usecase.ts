import { Injectable } from '@nestjs/common';

import {
  BadRequestError,
  InvalidTokenError,
  InvalidTokenTypeError,
  NotFoundError,
} from '@/common/application/errors/application-errors';
import { IBaseUseCase } from '@/common/application/usecases/base-usecase.interface';
import { TOKEN_TYPE } from '@/common/domain/enums/token-type.enum';
import { IDatabaseService } from '@/modules/common/database/application/services/database-service.interface';
import { EmailVerificationJwtParsed } from '@/modules/common/jwt/application/@types/jwt';
import { IJwtProvider } from '@/modules/common/jwt/application/providers/jwt-provider.interface';

type Input = {
  token: string;
};

type Output = void;

@Injectable()
export class VerifyEmailUseCase implements IBaseUseCase<Input, Output> {
  constructor(
    private jwtProvider: IJwtProvider,
    private databaseService: IDatabaseService,
  ) {}

  async execute(input: Input): Promise<Output> {
    const token = this.jwtProvider.verify<EmailVerificationJwtParsed>(
      input.token,
    );

    if (!token || typeof token === 'string') {
      throw new InvalidTokenError();
    }

    if (token.token_type !== TOKEN_TYPE.EMAIL_VERIFY) {
      throw new InvalidTokenTypeError();
    }

    const existingUser = await this.databaseService.users.findByEmail(
      token.email,
    );

    if (!existingUser) {
      throw new NotFoundError();
    }

    if (existingUser.email_is_verified) {
      throw new BadRequestError();
    }

    existingUser.email_is_verified = true;

    await this.databaseService.users.update(existingUser.id, existingUser);
  }
}
