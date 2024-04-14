import { Injectable, UnauthorizedException } from '@nestjs/common';

import { IHashProvider } from '../providers/hash/hash-provider.interface';

import { AuthJwtPayload } from '@/common/@types/users/jwt-payloads.type';
import { IBaseUseCase } from '@/common/abstractions/usecases/base-usecase.abstraction';
import { TOKEN_TYPE } from '@/common/enums/token-type.enum';
import { IDatabaseService } from '@/modules/common/database/database-service.interface';
import { IJwtProvider } from '@/modules/common/jwt/jwt-provider.interface';

type Input = {
  email: string;
  password: string;
};

type Output = {
  token: string;
};

@Injectable()
export class LoginUserUseCase implements IBaseUseCase<Input, Output> {
  constructor(
    private databaseService: IDatabaseService,
    private hashProvider: IHashProvider,
    private jwtProvider: IJwtProvider,
  ) {}

  async execute(input: Input): Promise<Output> {
    const existingUser = await this.databaseService.users.findByEmail(
      input.email,
    );

    if (!existingUser) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isEmailVerified = existingUser.email_is_verified;

    if (!isEmailVerified) {
      throw new UnauthorizedException('Email not verified');
    }

    const isValidPassword = await this.hashProvider.compareHash(
      input.password,
      existingUser.password,
    );

    if (!isValidPassword) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const payload: AuthJwtPayload = {
      userId: existingUser.id!,
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
