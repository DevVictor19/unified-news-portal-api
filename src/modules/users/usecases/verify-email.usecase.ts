import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { EmailVerificationJwtParsed } from '@/common/@types/users/jwt-payloads.type';
import { IBaseUseCase } from '@/common/abstractions/usecases/base-usecase.abstraction';
import { TOKEN_TYPE } from '@/common/enums/token-type.enum';
import { IDatabaseService } from '@/modules/common/database/database-service.interface';
import { IJwtProvider } from '@/modules/common/jwt/jwt-provider.interface';

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
      throw new UnauthorizedException(
        'Invalid token, please request another one',
      );
    }

    if (token.token_type !== TOKEN_TYPE.EMAIL_VERIFY) {
      throw new UnauthorizedException('Invalid token type');
    }

    const existingUser = await this.databaseService.users.findByEmail(
      token.email,
    );

    if (!existingUser) {
      throw new UnauthorizedException(
        'User not registered, please signup first',
      );
    }

    if (existingUser.email_is_verified) {
      throw new BadRequestException('Email already verified');
    }

    existingUser.email_is_verified = true;

    await this.databaseService.users.update(existingUser.id, existingUser);
  }
}
