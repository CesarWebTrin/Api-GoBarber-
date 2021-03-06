import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import AuthenticateUserService from './AuthenticateUserService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;
let authenticateUser: AuthenticateUserService;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);

    authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('shoud be able to create a new appointment', async () => {
    const user = await createUser.execute({
      name: 'Joe Doe',
      email: 'jhndo@example.com',
      password: '123456',
    });

    const response = await authenticateUser.execute({
      email: 'jhndo@example.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('shoud be able to authenticate with non existing user', async () => {
    await expect(
      authenticateUser.execute({
        email: 'jhndo@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('shoud be able to authenticate with wrong password', async () => {
    await createUser.execute({
      name: 'Joe Doe',
      email: 'jhndo@example.com',
      password: '123456',
    });

    await expect(
      authenticateUser.execute({
        email: 'jhndo@example.com',
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
