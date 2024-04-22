import { faker } from '@faker-js/faker';
import {
  BadRequestException,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

import { AuthGuard } from '../../auth.guard';
import { ExecutionContextMock } from '../testing/mocks/execution-context.mock';

import { ROLES } from '@/common/domain/enums/roles.enum';
import { TOKEN_TYPE } from '@/common/domain/enums/token-type.enum';
import { AuthJwtParsed } from '@/modules/common/jwt/application/@types/jwt';
import { IJwtProvider } from '@/modules/common/jwt/application/providers/jwt-provider.interface';
import { JwtProviderMock } from '@/modules/common/jwt/infrastructure/__MOCKS__/jwt-provider.mock';

describe('AuthGuard unit tests', () => {
  let jwtProvider: IJwtProvider;
  let sut: AuthGuard;

  beforeEach(() => {
    jwtProvider = new JwtProviderMock();
    sut = new AuthGuard(jwtProvider);
  });

  it('Should throw BadRequestException if Bearer token is missing', async () => {
    const getRequestSpy = jest.spyOn(
      ExecutionContextMock.switchToHttp(),
      'getRequest',
    );

    getRequestSpy.mockReturnValue({ headers: {} });

    await expect(
      sut.canActivate(ExecutionContextMock as ExecutionContext),
    ).rejects.toBeInstanceOf(BadRequestException);
    expect(getRequestSpy).toHaveBeenCalled();
  });

  it('Should throw UnauthorizedException if token is invalid', async () => {
    const getRequestSpy = jest.spyOn(
      ExecutionContextMock.switchToHttp(),
      'getRequest',
    );
    getRequestSpy.mockReturnValue({
      headers: { authorization: 'Bearer token' },
    });
    const verifyJwtSpy = jest.spyOn(jwtProvider, 'verify');
    verifyJwtSpy.mockReturnValue(null);

    await expect(
      sut.canActivate(ExecutionContextMock as ExecutionContext),
    ).rejects.toBeInstanceOf(UnauthorizedException);
    expect(getRequestSpy).toHaveBeenCalled();
    expect(verifyJwtSpy).toHaveBeenCalled();
  });

  it('Should throw UnauthorizedException if token_type is invalid', async () => {
    const getRequestSpy = jest.spyOn(
      ExecutionContextMock.switchToHttp(),
      'getRequest',
    );
    getRequestSpy.mockReturnValue({
      headers: { authorization: 'Bearer token' },
    });

    const jwtPayload = {
      role: 'any role',
      token_type: 'wrong type',
      userId: 'user id',
    };

    const verifyJwtSpy = jest.spyOn(jwtProvider, 'verify');
    verifyJwtSpy.mockReturnValue(jwtPayload);

    await expect(
      sut.canActivate(ExecutionContextMock as ExecutionContext),
    ).rejects.toBeInstanceOf(UnauthorizedException);
    expect(getRequestSpy).toHaveBeenCalled();
    expect(verifyJwtSpy).toHaveBeenCalled();
  });

  it('Should insert jwtPayload into request context if user authenticates', async () => {
    const getRequestSpy = jest.spyOn(
      ExecutionContextMock.switchToHttp(),
      'getRequest',
    );

    const request: any = {
      headers: { authorization: 'Bearer token' },
    };

    getRequestSpy.mockReturnValue(request);

    const jwtPayload: AuthJwtParsed = {
      role: ROLES.STUDENT,
      token_type: TOKEN_TYPE.AUTH,
      userId: faker.database.mongodbObjectId(),
    };

    const verifyJwtSpy = jest.spyOn(jwtProvider, 'verify');
    verifyJwtSpy.mockReturnValue(jwtPayload);

    await sut.canActivate(ExecutionContextMock as ExecutionContext);
    expect(request.user).toBe(jwtPayload);
    expect(getRequestSpy).toHaveBeenCalled();
    expect(verifyJwtSpy).toHaveBeenCalled();
  });
});
