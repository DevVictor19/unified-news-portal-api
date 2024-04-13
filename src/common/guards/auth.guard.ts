import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { AuthJwtParsed } from '../@types/users/jwt-payloads.type';
import { TOKEN_TYPE } from '../enums/token-type.enum';

import { IJwtProvider } from '@/modules/common/jwt/jwt-provider.interface';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtProvider: IJwtProvider) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new BadRequestException('Missing bearer token');
    }

    const payload = this.jwtProvider.verify<AuthJwtParsed>(token);

    if (!payload || typeof payload === 'string') {
      throw new UnauthorizedException('Invalid jwt, please signin again');
    }

    if (payload.token_type !== TOKEN_TYPE.AUTH) {
      throw new UnauthorizedException('Invalid token type');
    }

    request.user = payload;

    return true;
  }

  private extractTokenFromHeader(request: any): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
