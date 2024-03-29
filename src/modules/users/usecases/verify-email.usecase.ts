import { UnauthorizedException } from '@nestjs/common';

import { IJwtProvider } from '../providers/jwt/jwt-provider.interface';
import { IUsersRepository } from '../repositories/users-repository.interface';

import { IBaseUseCase } from '@/common/abstractions/usecases/base-usecase.abstraction';
import { TOKEN_TYPE } from '@/common/enums/token-type.enum';

type Input = {
  token: string;
};

type Output = void;

export class VerifyEmailUseCase implements IBaseUseCase<Input, Output> {
  constructor(
    private jwtProvider: IJwtProvider,
    private usersRepository: IUsersRepository,
  ) {}

  async execute(input: Input): Promise<Output> {
    const token = this.jwtProvider.verify(input.token);

    if (!token || typeof token === 'string') {
      throw new UnauthorizedException(
        'Invalid token, please request another one',
      );
    }

    if (token.token_type !== TOKEN_TYPE.EMAIL_VERIFY) {
      throw new UnauthorizedException('Invalid token type');
    }

    const existingUser = await this.usersRepository.findByEmail(token.email);

    if (!existingUser) {
      throw new UnauthorizedException(
        'User not registered, please signup first',
      );
    }

    if (existingUser.email_is_verified) {
      return;
    }

    existingUser.email_is_verified = true;

    await this.usersRepository.update(existingUser._id!, existingUser);
  }
}
