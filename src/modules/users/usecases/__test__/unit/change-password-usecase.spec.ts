import { NotFoundException, UnauthorizedException } from '@nestjs/common';

import { ChangePasswordUseCase } from '../../change-password-usecase';

import { TOKEN_TYPE } from '@/common/enums/token-type.enum';
import { User } from '@/modules/users/entities/users.entity';
import { HashProviderMock } from '@/modules/users/providers/hash/__MOCKS__/hash-provider.mock';
import { IHashProvider } from '@/modules/users/providers/hash/hash-provider.interface';
import { JwtProviderMock } from '@/modules/users/providers/jwt/__MOCKS__/jwt-provider.mock';
import { IJwtProvider } from '@/modules/users/providers/jwt/jwt-provider.interface';
import { UsersInMemoryRepository } from '@/modules/users/repositories/in-memory/users-in-memory.repository';
import { IUsersRepository } from '@/modules/users/repositories/users-repository.interface';

describe('ChangePasswordUseCase unit tests', () => {
  let usersRepository: IUsersRepository;
  let jwtProvider: IJwtProvider;
  let hashProvider: IHashProvider;
  let sut: ChangePasswordUseCase;

  const input = { password: 'password', token: 'token' };

  beforeEach(() => {
    usersRepository = new UsersInMemoryRepository();
    hashProvider = new HashProviderMock();
    jwtProvider = new JwtProviderMock();

    sut = new ChangePasswordUseCase(usersRepository, jwtProvider, hashProvider);
  });

  it('Should throw UnauthorizedException if token is invalid', async () => {
    const verifyJwtSpy = jest.spyOn(jwtProvider, 'verify');
    verifyJwtSpy.mockReturnValue(null);

    await expect(() => sut.execute(input)).rejects.toBeInstanceOf(
      UnauthorizedException,
    );
    expect(verifyJwtSpy).toHaveBeenCalledWith(input.token);
  });

  it('Should throw UnauthorizedException if token_type is invalid', async () => {
    const verifyJwtSpy = jest.spyOn(jwtProvider, 'verify');
    verifyJwtSpy.mockReturnValue({ token_type: 'wrong token type' });

    await expect(() => sut.execute(input)).rejects.toBeInstanceOf(
      UnauthorizedException,
    );
    expect(verifyJwtSpy).toHaveBeenCalledWith(input.token);
  });

  it('Should throw NotFoundException if user is not found', async () => {
    const tokenPayload = {
      token_type: TOKEN_TYPE.PASSWORD_RECOVERY,
      userId: 'id',
    };

    const verifyJwtSpy = jest.spyOn(jwtProvider, 'verify');
    verifyJwtSpy.mockReturnValue(tokenPayload);
    const findByIdSpy = jest.spyOn(usersRepository, 'findById');
    findByIdSpy.mockResolvedValue(null);

    await expect(() => sut.execute(input)).rejects.toBeInstanceOf(
      NotFoundException,
    );
    expect(verifyJwtSpy).toHaveBeenCalledWith(input.token);
    expect(findByIdSpy).toHaveBeenCalledWith(tokenPayload.userId);
  });

  it('Should update user password with provided the input password', async () => {
    const tokenPayload = {
      token_type: TOKEN_TYPE.PASSWORD_RECOVERY,
      userId: 'id',
    };
    const user = { _id: 'userId', password: 'old pass' } as User;

    const verifyJwtSpy = jest.spyOn(jwtProvider, 'verify');
    verifyJwtSpy.mockReturnValue(tokenPayload);
    const findByIdSpy = jest.spyOn(usersRepository, 'findById');
    findByIdSpy.mockResolvedValue(user);
    const generateHashSpy = jest.spyOn(hashProvider, 'generateHash');
    generateHashSpy.mockResolvedValue('new hashed pass');
    const updateUserSpy = jest.spyOn(usersRepository, 'update');

    await sut.execute(input);

    const newPass = await generateHashSpy.mock.results[0].value;
    const updatedUser = { ...user, password: newPass };

    expect(verifyJwtSpy).toHaveBeenCalledWith(input.token);
    expect(findByIdSpy).toHaveBeenCalledWith(tokenPayload.userId);
    expect(generateHashSpy).toHaveBeenCalledWith(input.password);
    expect(updateUserSpy).toHaveBeenCalledWith(user._id, updatedUser);
  });
});
