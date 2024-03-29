import { ForbiddenException, UnauthorizedException } from '@nestjs/common';

import { IHashProvider } from '../providers/hash/hash-provider.interface';
import { IJwtProvider } from '../providers/jwt/jwt-provider.interface';
import { IUsersRepository } from '../repositories/users-repository.interface';

import { AuthJwtPayload } from '@/common/@types/users/jwt-payloads.type';
import { IBaseUseCase } from '@/common/abstractions/usecases/base-usecase.abstraction';
import { TOKEN_TYPE } from '@/common/enums/token-type.enum';

type Input = {
  email: string;
  password: string;
};

type Output = {
  token: string;
};

export class LoginUserUseCase implements IBaseUseCase<Input, Output> {
  constructor(
    private usersRepository: IUsersRepository,
    private hashProvider: IHashProvider,
    private jwtProvider: IJwtProvider,
  ) {}

  async execute(input: Input): Promise<Output> {
    const existingUser = await this.usersRepository.findByEmail(input.email);

    if (!existingUser) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isEmailVerified = existingUser.email_is_verified;

    if (!isEmailVerified) {
      throw new ForbiddenException('Email not verified');
    }

    const isValidPassword = await this.hashProvider.compareHash(
      input.password,
      existingUser.password,
    );

    if (!isValidPassword) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const payload: AuthJwtPayload = {
      userId: existingUser._id!,
      role: existingUser.role,
      token_type: TOKEN_TYPE.AUTH,
    };

    const token = this.jwtProvider.sign({
      payload,
      expiresIn: '4h',
    });

    return { token };
  }
}
