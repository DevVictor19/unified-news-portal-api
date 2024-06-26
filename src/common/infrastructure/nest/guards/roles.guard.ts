import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { ROLES_KEY } from '../decorators/roles.decorator';

import { ForbiddenError } from '@/common/application/errors/application-errors';
import { ROLES } from '@/common/domain/enums/roles.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<ROLES[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const request = context.switchToHttp().getRequest();

    const user = request.user;

    const isAuthorized = requiredRoles.some((role) => user.role === role);

    if (!isAuthorized) {
      throw new ForbiddenError();
    }

    return true;
  }
}
