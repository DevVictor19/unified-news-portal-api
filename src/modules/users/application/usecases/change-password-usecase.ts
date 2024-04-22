import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { IHashProvider } from '../providers/hash-provider.interface';

import { IBaseUseCase } from '@/common/application/usecases/base-usecase.interface';
import { TOKEN_TYPE } from '@/common/domain/enums/token-type.enum';
import { IDatabaseService } from '@/modules/common/database/application/services/database-service.interface';
import { PasswordRecoveryJwtParsed } from '@/modules/common/jwt/application/@types/jwt';
import { IJwtProvider } from '@/modules/common/jwt/application/providers/jwt-provider.interface';

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
