import AppError from '@shared/errors/AppError';

import FakeHashRepository from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';

describe('CreateUser', () => {
  it('should be able to create a new User', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashRepository = new FakeHashRepository();
    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashRepository,
    );

    const user = await createUser.execute({
      name: 'John Doe Pet Helper',
      email: 'johndoepethelper@example.com',
      password: '123456',
      type: 'ngo',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new User with same email from another', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashRepository = new FakeHashRepository();
    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashRepository,
    );

    await createUser.execute({
      name: 'John Doe Pet Helper',
      email: 'johndoepethelper@example.com',
      password: '123456',
      type: 'ngo',
    });

    expect(
      createUser.execute({
        name: 'John Doe Pet Helper',
        email: 'johndoepethelper@example.com',
        password: '123456',
        type: 'adopter',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
