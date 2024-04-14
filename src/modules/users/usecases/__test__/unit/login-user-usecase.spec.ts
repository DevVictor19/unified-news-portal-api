import { faker } from '@faker-js/faker';
import { UnauthorizedException } from '@nestjs/common';

import { LoginUserUseCase } from '../../login-user.usecase';

import { ROLES } from '@/common/enums/roles.enum';
import { TOKEN_TYPE } from '@/common/enums/token-type.enum';
import { DatabaseServiceMock } from '@/modules/common/database/__MOCKS__/database-service.mock';
import { IDatabaseService } from '@/modules/common/database/database-service.interface';
import { JwtProviderMock } from '@/modules/common/jwt/__MOCKS__/jwt-provider.mock';
import { IJwtProvider } from '@/modules/common/jwt/jwt-provider.interface';
import { UserEntity } from '@/modules/users/entities/users.entity';
import { HashProviderMock } from '@/modules/users/providers/hash/__MOCKS__/hash-provider.mock';
import { IHashProvider } from '@/modules/users/providers/hash/hash-provider.interface';

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

  test('Throw UnauthorizedException if user not found with provided email', async () => {
    const findByEmailSpy = jest.spyOn(databaseService.users, 'findByEmail');
    findByEmailSpy.mockResolvedValue(null);

    await expect(() => sut.execute(input)).rejects.toBeInstanceOf(
      UnauthorizedException,
    );
    expect(findByEmailSpy).toHaveBeenCalled();
  });

  test('Throw UnauthorizedException if user email is not verified', async () => {
    const findByEmailSpy = jest.spyOn(databaseService.users, 'findByEmail');
    findByEmailSpy.mockResolvedValue({
      email_is_verified: false,
    } as UserEntity);

    await expect(() => sut.execute(input)).rejects.toBeInstanceOf(
      UnauthorizedException,
    );
    expect(findByEmailSpy).toHaveBeenCalled();
  });

  test('Throw UnauthorizedException if user password is wrong', async () => {
    const findByEmailSpy = jest.spyOn(databaseService.users, 'findByEmail');
    findByEmailSpy.mockResolvedValue({ email_is_verified: true } as UserEntity);
    const compareHashSpy = jest.spyOn(hashProvider, 'compareHash');
    compareHashSpy.mockResolvedValue(false);

    await expect(() => sut.execute(input)).rejects.toBeInstanceOf(
      UnauthorizedException,
    );
    expect(findByEmailSpy).toHaveBeenCalled();
    expect(compareHashSpy).toHaveBeenCalled();
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
