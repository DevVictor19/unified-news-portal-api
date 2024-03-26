import { UnauthorizedException } from '@nestjs/common';

import { VerifyEmailUseCase } from '../../verify-email.usecase';

import { User } from '@/modules/users/entities/users.entity';
import { JwtProviderMock } from '@/modules/users/providers/jwt/__MOCKS__/jwt-provider.mock';
import { IJwtProvider } from '@/modules/users/providers/jwt/jwt-provider.interface';
import { UsersInMemoryRepository } from '@/modules/users/repositories/in-memory/users-in-memory.repository';
import { IUsersRepository } from '@/modules/users/repositories/users-repository.interface';

describe('VerifyEmailUseCase unit tests', () => {
  let jwtProvider: IJwtProvider;
  let usersRepository: IUsersRepository;
  let sut: VerifyEmailUseCase;

  beforeEach(() => {
    jwtProvider = new JwtProviderMock();
    usersRepository = new UsersInMemoryRepository();
    sut = new VerifyEmailUseCase(jwtProvider, usersRepository);
  });

  it('Should throw UnauthorizedException when token is invalid', async () => {
    const verifyJwtSpy = jest.spyOn(jwtProvider, 'verify');
    verifyJwtSpy.mockReturnValue(null);

    await expect(() => sut.execute({ token: 'token' })).rejects.toBeInstanceOf(
      UnauthorizedException,
    );
  });

  it('Should throw UnauthorizedException when user not exists', async () => {
    const verifyJwtSpy = jest.spyOn(jwtProvider, 'verify');
    verifyJwtSpy.mockReturnValue({});
    const findByEmailSpy = jest.spyOn(usersRepository, 'findByEmail');
    findByEmailSpy.mockResolvedValue(null);

    await expect(() => sut.execute({ token: 'token' })).rejects.toBeInstanceOf(
      UnauthorizedException,
    );
  });

  it('Should not call update method when user email is already verified', async () => {
    const verifyJwtSpy = jest.spyOn(jwtProvider, 'verify');
    verifyJwtSpy.mockReturnValue({});
    const findByEmailSpy = jest.spyOn(usersRepository, 'findByEmail');
    findByEmailSpy.mockResolvedValue({ email_is_verified: true } as User);
    const updateUserSpy = jest.spyOn(usersRepository, 'update');

    await sut.execute({ token: 'token' });

    expect(updateUserSpy).not.toHaveBeenCalled();
  });

  it('Should update user as email verified', async () => {
    const token = 'token';
    const tokenPayload = { email: 'email' };
    const user = { _id: 'id', email_is_verified: false } as User;

    const verifyJwtSpy = jest.spyOn(jwtProvider, 'verify');
    verifyJwtSpy.mockReturnValue(tokenPayload);
    const findByEmailSpy = jest.spyOn(usersRepository, 'findByEmail');
    findByEmailSpy.mockResolvedValue(user);
    const updateUserSpy = jest.spyOn(usersRepository, 'update');

    await sut.execute({ token });

    expect(verifyJwtSpy).toHaveBeenCalledWith(token);
    expect(findByEmailSpy).toHaveBeenCalledWith(tokenPayload.email);
    expect(updateUserSpy).toHaveBeenCalledWith(user._id, {
      ...user,
      email_is_verified: true,
    });
  });
});
