import { faker } from '@faker-js/faker';

import { IHashProvider } from '../../../providers/hash-provider.interface';
import { LoginUserUseCase } from '../../login-user.usecase';

import {
  InvalidCredentialsError,
  EmailNotVerifiedError,
} from '@/common/application/errors/application-errors';
import { ROLES } from '@/common/domain/enums/roles.enum';
import { TOKEN_TYPE } from '@/common/domain/enums/token-type.enum';
import { IDatabaseService } from '@/modules/common/database/application/services/database-service.interface';
import { DatabaseServiceMock } from '@/modules/common/database/infrastructure/__MOCKS__/database-service.mock';
import { IJwtProvider } from '@/modules/common/jwt/application/providers/jwt-provider.interface';
import { JwtProviderMock } from '@/modules/common/jwt/infrastructure/__MOCKS__/jwt-provider.mock';
import { UserEntity } from '@/modules/users/domain/entities/users.entity';
import { HashProviderMock } from '@/modules/users/infrastructure/providers/hash/__MOCKS__/hash-provider.mock';

const input = {
  email: faker.internet.email(),
  password: faker.internet.password(),
};

describe('LoginUserUseCase unit tests', () => {
  let databaseService: IDatabaseService;
  let jwtProvider: IJwtProvider;
  let hashProvider: IHashProvider;
  let sut: LoginUserUseCase;

  beforeEach(() => {
    databaseService = new DatabaseServiceMock();
    hashProvider = new HashProviderMock();
    jwtProvider = new JwtProviderMock();

    sut = new LoginUserUseCase(databaseService, hashProvider, jwtProvider);
  });

  test('Throw InvalidCredentialsError if user not found with provided email', async () => {
    const findByEmailSpy = jest.spyOn(databaseService.users, 'findByEmail');
    findByEmailSpy.mockResolvedValue(null);

    await expect(() => sut.execute(input)).rejects.toBeInstanceOf(
      InvalidCredentialsError,
    );
    expect(findByEmailSpy).toHaveBeenCalled();
  });

  test('Throw InvalidCredentialsError if user password is wrong', async () => {
    const findByEmailSpy = jest.spyOn(databaseService.users, 'findByEmail');
    findByEmailSpy.mockResolvedValue({ email_is_verified: true } as UserEntity);
    const compareHashSpy = jest.spyOn(hashProvider, 'compareHash');
    compareHashSpy.mockResolvedValue(false);

    await expect(() => sut.execute(input)).rejects.toBeInstanceOf(
      InvalidCredentialsError,
    );
    expect(findByEmailSpy).toHaveBeenCalled();
    expect(compareHashSpy).toHaveBeenCalled();
  });

  test('Throw EmailNotVerifiedError if user email is not verified', async () => {
    const findByEmailSpy = jest.spyOn(databaseService.users, 'findByEmail');
    findByEmailSpy.mockResolvedValue({
      email_is_verified: false,
    } as UserEntity);
    const compareHashSpy = jest.spyOn(hashProvider, 'compareHash');
    compareHashSpy.mockResolvedValue(true);

    await expect(() => sut.execute(input)).rejects.toBeInstanceOf(
      EmailNotVerifiedError,
    );
    expect(findByEmailSpy).toHaveBeenCalled();
  });

  it('Should create a login jwt token', async () => {
    const user = {
      id: 'id',
      email_is_verified: true,
      role: ROLES.STUDENT,
    } as UserEntity;

    const findByEmailSpy = jest.spyOn(databaseService.users, 'findByEmail');
    findByEmailSpy.mockResolvedValue(user);
    const compareHashSpy = jest.spyOn(hashProvider, 'compareHash');
    compareHashSpy.mockResolvedValue(true);
    const signJwtSpy = jest.spyOn(jwtProvider, 'sign');

    await sut.execute(input);

    expect(findByEmailSpy).toHaveBeenCalled();
    expect(compareHashSpy).toHaveBeenCalled();
    expect(signJwtSpy).toHaveBeenCalledWith({
      expiresIn: '4h',
      payload: {
        userId: user.id,
        role: ROLES.STUDENT,
        token_type: TOKEN_TYPE.AUTH,
      },
    });
  });
});
