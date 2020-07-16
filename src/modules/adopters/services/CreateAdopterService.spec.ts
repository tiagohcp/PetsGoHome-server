import AppError from '@shared/errors/AppError';

import FakeHashRepository from '@shared/container/providers/HashProvider/fakes/FakeHashProvider';
import FakeAdoptersRepository from '../repositories/fakes/FakeAdoptersRepository';
import CreateAdopterService from './CreateAdopterService';

describe('CreateAdopter', () => {
  it('should be able to create a new Adopter', async () => {
    const fakeAdoptersRepository = new FakeAdoptersRepository();
    const fakeHashRepository = new FakeHashRepository();
    const createAdopter = new CreateAdopterService(
      fakeAdoptersRepository,
      fakeHashRepository,
    );

    const adopter = await createAdopter.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    expect(adopter).toHaveProperty('id');
  });

  it('should not be able to create a new Adopter with same email from another', async () => {
    const fakeAdoptersRepository = new FakeAdoptersRepository();
    const fakeHashRepository = new FakeHashRepository();
    const createAdopter = new CreateAdopterService(
      fakeAdoptersRepository,
      fakeHashRepository,
    );

    await createAdopter.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    expect(
      createAdopter.execute({
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
