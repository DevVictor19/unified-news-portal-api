import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

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
