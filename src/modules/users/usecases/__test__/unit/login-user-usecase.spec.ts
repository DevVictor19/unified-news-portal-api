import { faker } from '@faker-js/faker';
import { ForbiddenException, UnauthorizedException } from '@nestjs/common';

import { LoginUserUseCase } from '../../login-user.usecase';

import { ROLES } from '@/common/enums/roles.enum';
import { TOKEN_TYPE } from '@/common/enums/token-type.enum';
import { User } from '@/modules/users/entities/users.entity';
import { HashProviderMock } from '@/modules/users/providers/hash/__MOCKS__/hash-provider.mock';
import { IHashProvider } from '@/modules/users/providers/hash/hash-provider.interface';
import { JwtProviderMock } from '@/modules/users/providers/jwt/__MOCKS__/jwt-provider.mock';
import { IJwtProvider } from '@/modules/users/providers/jwt/jwt-provider.interface';
import { UsersInMemoryRepository } from '@/modules/users/repositories/in-memory/users-in-memory.repository';
import { IUsersRepository } from '@/modules/users/repositories/users-repository.interface';

const input = {
  email: faker.internet.email(),
  password: faker.internet.password(),
};
describe('LoginUserUseCase unit tests', () => {
  let usersRepository: IUsersRepository;
  let jwtProvider: IJwtProvider;
  let hashProvider: IHashProvider;
  let sut: LoginUserUseCase;

  beforeEach(() => {
    usersRepository = new UsersInMemoryRepository();
    hashProvider = new HashProviderMock();
    jwtProvider = new JwtProviderMock();

    sut = new LoginUserUseCase(usersRepository, hashProvider, jwtProvider);
  });

  test('Throw UnauthorizedException if user not found with provided email', async () => {
    const findByEmailSpy = jest.spyOn(usersRepository, 'findByEmail');
    findByEmailSpy.mockResolvedValue(null);

    await expect(() => sut.execute(input)).rejects.toBeInstanceOf(
      UnauthorizedException,
    );
    expect(findByEmailSpy).toHaveBeenCalled();
  });

  test('Throw ForbiddenException if user email is not verified', async () => {
    const findByEmailSpy = jest.spyOn(usersRepository, 'findByEmail');
    findByEmailSpy.mockResolvedValue({ email_is_verified: false } as User);

    await expect(() => sut.execute(input)).rejects.toBeInstanceOf(
      ForbiddenException,
    );
    expect(findByEmailSpy).toHaveBeenCalled();
  });

  test('Throw UnauthorizedException if user password is wrong', async () => {
    const findByEmailSpy = jest.spyOn(usersRepository, 'findByEmail');
    findByEmailSpy.mockResolvedValue({ email_is_verified: true } as User);
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
      _id: 'id',
      email_is_verified: true,
      role: ROLES.STUDENT,
    } as User;

    const findByEmailSpy = jest.spyOn(usersRepository, 'findByEmail');
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
        userId: user._id,
        role: ROLES.STUDENT,
        token_type: TOKEN_TYPE.AUTH,
      },
    });
  });
});
