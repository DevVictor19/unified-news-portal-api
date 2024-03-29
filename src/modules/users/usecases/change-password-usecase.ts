import { NotFoundException, UnauthorizedException } from '@nestjs/common';

import { IHashProvider } from '../providers/hash/hash-provider.interface';
import { IJwtProvider } from '../providers/jwt/jwt-provider.interface';
import { IUsersRepository } from '../repositories/users-repository.interface';

import { PasswordRecoveryJwtParsed } from '@/common/@types/users/jwt-payloads.type';
import { IBaseUseCase } from '@/common/abstractions/usecases/base-usecase.abstraction';
import { TOKEN_TYPE } from '@/common/enums/token-type.enum';

type Input = {
  token: string;
  password: string;
};

type Output = void;

export class ChangePasswordUseCase implements IBaseUseCase<Input, Output> {
  constructor(
    private usersRepository: IUsersRepository,
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

    const existingUser = await this.usersRepository.findById(jwtPayload.userId);

    if (!existingUser) {
      throw new NotFoundException('User not found');
    }

    const newPassword = await this.hashProvider.generateHash(input.password);

    existingUser.password = newPassword;

    await this.usersRepository.update(existingUser._id!, existingUser);
  }
}
