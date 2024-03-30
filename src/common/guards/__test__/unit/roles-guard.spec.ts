import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { RolesGuard } from '../../roles.guard';
import { ExecutionContextMock } from '../testing/mocks/execution-context.mock';
import { ReflectorMock } from '../testing/mocks/reflector.mock';

import { ROLES } from '@/common/enums/roles.enum';

describe('RolesGuard unit tests', () => {
  let sut: RolesGuard;
  let reflector: Reflector;

  beforeEach(() => {
    reflector = ReflectorMock as Reflector;
    sut = new RolesGuard(reflector);
  });

  it('Should return false if user has no permissions', () => {
    const getAllAndOverrideSpy = jest.spyOn(reflector, 'getAllAndOverride');
    getAllAndOverrideSpy.mockReturnValue([ROLES.ADMIN]);

    const getRequestSpy = jest.spyOn(
      ExecutionContextMock.switchToHttp(),
      'getRequest',
    );

    const request = { user: { role: ROLES.STUDENT } };

    getRequestSpy.mockReturnValue(request);

    const result = sut.canActivate(ExecutionContextMock as ExecutionContext);

    expect(result).toBeFalsy();
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
