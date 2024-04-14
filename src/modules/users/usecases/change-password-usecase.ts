import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { IHashProvider } from '../providers/hash/hash-provider.interface';

import { PasswordRecoveryJwtParsed } from '@/common/@types/users/jwt-payloads.type';
import { IBaseUseCase } from '@/common/abstractions/usecases/base-usecase.abstraction';
import { TOKEN_TYPE } from '@/common/enums/token-type.enum';
import { IDatabaseService } from '@/modules/common/database/database-service.interface';
import { IJwtProvider } from '@/modules/common/jwt/jwt-provider.interface';

type Input = {
  token: string;
  password: string;
};

type Output = void;

@Injectable()
export class ChangePasswordUseCase implements IBaseUseCase<Input, Output> {
  constructor(
    private databaseService: IDatabaseService,
    private jwtProvider: IJwtProvider,
    private hashProvider: IHashProvider,
  ) {}

  async execute(input: Input): Promise<Output> {
    const jwtPayload = this.jwtProvider.verify<PasswordRecoveryJwtParsed>(
      input.token,
    );

    if (!jwtPayload || typeof jwtPayload === 'string') {
      throw new UnauthorizedException(
        'Invalid token, please request another one',
      );
    }

    if (jwtPayload.token_type !== TOKEN_TYPE.PASSWORD_RECOVERY) {
      throw new UnauthorizedException('Invalid token type');
    }

    const existingUser = await this.databaseService.users.findById(
      jwtPayload.userId,
    );

    if (!existingUser) {
      throw new NotFoundException('User not found');
    }

    const newPassword = await this.hashProvider.generateHash(input.password);

    existingUser.password = newPassword;

    await this.databaseService.users.update(existingUser.id!, existingUser);
  }
}
