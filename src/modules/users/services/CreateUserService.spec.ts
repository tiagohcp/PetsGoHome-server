import AppError from '@shared/errors/AppError';

import FakeHashRepository from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashRepository: FakeHashRepository;
let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashRepository = new FakeHashRepository();
    createUser = new CreateUserService(fakeUsersRepository, fakeHashRepository);
  });
  it('should be able to create a new User', async () => {
    const user = await createUser.execute({
      name: 'John Doe Pet Helper',
      email: 'johndoepethelper@example.com',
      password: '123456',
      type: 'ngo',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new User with same email from another', async () => {
    await createUser.execute({
      name: 'John Doe Pet Helper',
      email: 'johndoepethelper@example.com',
      password: '123456',
      type: 'ngo',
    });

    await expect(
      createUser.execute({
        name: 'John Doe Pet Helper',
        email: 'johndoepethelper@example.com',
        password: '123456',
        type: 'adopter',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
