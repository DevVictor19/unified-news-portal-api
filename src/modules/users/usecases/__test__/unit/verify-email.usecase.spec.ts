import { BadRequestException, UnauthorizedException } from '@nestjs/common';

import { VerifyEmailUseCase } from '../../verify-email.usecase';

import { TOKEN_TYPE } from '@/common/enums/token-type.enum';
import { DatabaseServiceMock } from '@/modules/common/database/__MOCKS__/database-service.mock';
import { IDatabaseService } from '@/modules/common/database/database-service.interface';
import { JwtProviderMock } from '@/modules/common/jwt/__MOCKS__/jwt-provider.mock';
import { IJwtProvider } from '@/modules/common/jwt/jwt-provider.interface';
import { UserEntity } from '@/modules/users/entities/users.entity';

describe('VerifyEmailUseCase unit tests', () => {
  let jwtProvider: IJwtProvider;
  let databaseService: IDatabaseService;
  let sut: VerifyEmailUseCase;

  beforeEach(() => {
    jwtProvider = new JwtProviderMock();
    databaseService = new DatabaseServiceMock();
    sut = new VerifyEmailUseCase(jwtProvider, databaseService);
  });

  it('Should throw UnauthorizedException when token is invalid', async () => {
    const verifyJwtSpy = jest.spyOn(jwtProvider, 'verify');
    verifyJwtSpy.mockReturnValue(null);

    await expect(() => sut.execute({ token: 'token' })).rejects.toBeInstanceOf(
      UnauthorizedException,
    );
    expect(verifyJwtSpy).toHaveBeenCalled();
  });

  it('Should throw UnauthorizedException when token_type is invalid', async () => {
    const verifyJwtSpy = jest.spyOn(jwtProvider, 'verify');
    verifyJwtSpy.mockReturnValue({ token_type: 'wrong token type' });

    await expect(() => sut.execute({ token: 'token' })).rejects.toBeInstanceOf(
      UnauthorizedException,
    );
    expect(verifyJwtSpy).toHaveBeenCalled();
  });

  it('Should throw UnauthorizedException when user not exists', async () => {
    const verifyJwtSpy = jest.spyOn(jwtProvider, 'verify');
    verifyJwtSpy.mockReturnValue({ token_type: TOKEN_TYPE.EMAIL_VERIFY });
    const findByEmailSpy = jest.spyOn(databaseService.users, 'findByEmail');
    findByEmailSpy.mockResolvedValue(null);

    await expect(() => sut.execute({ token: 'token' })).rejects.toBeInstanceOf(
      UnauthorizedException,
    );
    expect(verifyJwtSpy).toHaveBeenCalled();
    expect(findByEmailSpy).toHaveBeenCalled();
  });

  it('Should throw a BadRequestException if email is already verified', async () => {
    const verifyJwtSpy = jest.spyOn(jwtProvider, 'verify');
    verifyJwtSpy.mockReturnValue({ token_type: TOKEN_TYPE.EMAIL_VERIFY });
    const findByEmailSpy = jest.spyOn(databaseService.users, 'findByEmail');
    findByEmailSpy.mockResolvedValue({ email_is_verified: true } as UserEntity);
    const updateUserSpy = jest.spyOn(databaseService.users, 'update');

    await expect(() => sut.execute({ token: 'token' })).rejects.toBeInstanceOf(
      BadRequestException,
    );
    expect(verifyJwtSpy).toHaveBeenCalled();
    expect(findByEmailSpy).toHaveBeenCalled();
    expect(updateUserSpy).not.toHaveBeenCalled();
  });

  it('Should update user as email verified', async () => {
    const token = 'token';
    const tokenPayload = {
      email: 'email',
      token_type: TOKEN_TYPE.EMAIL_VERIFY,
    };
    const user = { id: 'id', email_is_verified: false } as UserEntity;

    const verifyJwtSpy = jest.spyOn(jwtProvider, 'verify');
    verifyJwtSpy.mockReturnValue(tokenPayload);
    const findByEmailSpy = jest.spyOn(databaseService.users, 'findByEmail');
    findByEmailSpy.mockResolvedValue(user);
    const updateUserSpy = jest.spyOn(databaseService.users, 'update');

    await sut.execute({ token });

    expect(verifyJwtSpy).toHaveBeenCalledWith(token);
    expect(findByEmailSpy).toHaveBeenCalledWith(tokenPayload.email);
    expect(updateUserSpy).toHaveBeenCalledWith(user.id, {
      ...user,
      email_is_verified: true,
    });
  });
});
