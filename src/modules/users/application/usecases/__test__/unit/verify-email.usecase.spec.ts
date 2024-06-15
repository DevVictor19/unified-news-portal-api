import { VerifyEmailUseCase } from '../../verify-email.usecase';

import {
  BadRequestError,
  InvalidTokenError,
  InvalidTokenTypeError,
  NotFoundError,
} from '@/common/application/errors/application-errors'; // Atualizado
import { TOKEN_TYPE } from '@/common/domain/enums/token-type.enum';
import { IDatabaseService } from '@/modules/common/database/application/services/database-service.interface';
import { DatabaseServiceMock } from '@/modules/common/database/infrastructure/__MOCKS__/database-service.mock';
import { IJwtProvider } from '@/modules/common/jwt/application/providers/jwt-provider.interface';
import { JwtProviderMock } from '@/modules/common/jwt/infrastructure/__MOCKS__/jwt-provider.mock';
import { UserEntity } from '@/modules/users/domain/entities/users.entity';

describe('VerifyEmailUseCase unit tests', () => {
  let jwtProvider: IJwtProvider;
  let databaseService: IDatabaseService;
  let sut: VerifyEmailUseCase;

  beforeEach(() => {
    jwtProvider = new JwtProviderMock();
    databaseService = new DatabaseServiceMock();
    sut = new VerifyEmailUseCase(jwtProvider, databaseService);
  });

  it('Should throw InvalidTokenError when token is invalid', async () => {
    const verifyJwtSpy = jest.spyOn(jwtProvider, 'verify');
    verifyJwtSpy.mockReturnValue(null);

    await expect(() => sut.execute({ token: 'token' })).rejects.toBeInstanceOf(
      InvalidTokenError,
    );
    expect(verifyJwtSpy).toHaveBeenCalled();
  });

  it('Should throw InvalidTokenTypeError when token_type is invalid', async () => {
    const verifyJwtSpy = jest.spyOn(jwtProvider, 'verify');
    verifyJwtSpy.mockReturnValue({ token_type: 'wrong token type' });

    await expect(() => sut.execute({ token: 'token' })).rejects.toBeInstanceOf(
      InvalidTokenTypeError,
    );
    expect(verifyJwtSpy).toHaveBeenCalled();
  });

  it('Should throw NotFoundError when user not exists', async () => {
    const verifyJwtSpy = jest.spyOn(jwtProvider, 'verify');
    verifyJwtSpy.mockReturnValue({ token_type: TOKEN_TYPE.EMAIL_VERIFY });
    const findByEmailSpy = jest.spyOn(databaseService.users, 'findByEmail');
    findByEmailSpy.mockResolvedValue(null);

    await expect(() => sut.execute({ token: 'token' })).rejects.toBeInstanceOf(
      NotFoundError,
    );
    expect(verifyJwtSpy).toHaveBeenCalled();
    expect(findByEmailSpy).toHaveBeenCalled();
  });

  it('Should throw a BadRequestError if email is already verified', async () => {
    const verifyJwtSpy = jest.spyOn(jwtProvider, 'verify');
    verifyJwtSpy.mockReturnValue({ token_type: TOKEN_TYPE.EMAIL_VERIFY });
    const findByEmailSpy = jest.spyOn(databaseService.users, 'findByEmail');
    findByEmailSpy.mockResolvedValue({ email_is_verified: true } as UserEntity);
    const updateUserSpy = jest.spyOn(databaseService.users, 'update');

    await expect(() => sut.execute({ token: 'token' })).rejects.toBeInstanceOf(
      BadRequestError,
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
