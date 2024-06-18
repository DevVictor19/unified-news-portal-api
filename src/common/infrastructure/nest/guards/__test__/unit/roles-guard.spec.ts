import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { RolesGuard } from '../../roles.guard';
import { ExecutionContextMock } from '../testing/mocks/execution-context.mock';
import { ReflectorMock } from '../testing/mocks/reflector.mock';

import { ForbiddenError } from '@/common/application/errors/application-errors';
import { ROLES } from '@/common/domain/enums/roles.enum';

describe('RolesGuard unit tests', () => {
  let sut: RolesGuard;
  let reflector: Reflector;

  beforeEach(() => {
    reflector = ReflectorMock as Reflector;
    sut = new RolesGuard(reflector);
  });

  it('Should return ForbiddenError if user has no permissions', () => {
    const getAllAndOverrideSpy = jest.spyOn(reflector, 'getAllAndOverride');
    getAllAndOverrideSpy.mockReturnValue([ROLES.ADMIN]);

    const getRequestSpy = jest.spyOn(
      ExecutionContextMock.switchToHttp(),
      'getRequest',
    );

    const request = { user: { role: ROLES.STUDENT } };

    getRequestSpy.mockReturnValue(request);

    try {
      sut.canActivate(ExecutionContextMock as ExecutionContext);
    } catch (error) {
      expect(error).toBeInstanceOf(ForbiddenError);
    }
  });

  it('Should return true if user has permissions', () => {
    const getAllAndOverrideSpy = jest.spyOn(reflector, 'getAllAndOverride');
    getAllAndOverrideSpy.mockReturnValue([ROLES.ADMIN]);

    const getRequestSpy = jest.spyOn(
      ExecutionContextMock.switchToHttp(),
      'getRequest',
    );

    const request = { user: { role: ROLES.ADMIN } };

    getRequestSpy.mockReturnValue(request);

    const result = sut.canActivate(ExecutionContextMock as ExecutionContext);

    expect(result).toBeTruthy();
  });
});
