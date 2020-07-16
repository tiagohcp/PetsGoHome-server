import AppError from '@shared/errors/AppError';

import FakeHashRepository from '@shared/container/providers/HashProvider/fakes/FakeHashProvider';
import FakeNgosRepository from '../repositories/fakes/FakeNgosRepository';
import CreateNgoService from './CreateNgoService';

describe('CreateNgo', () => {
  it('should be able to create a new Ngo', async () => {
    const fakeNgosRepository = new FakeNgosRepository();
    const fakeHashRepository = new FakeHashRepository();
    const createNgo = new CreateNgoService(
      fakeNgosRepository,
      fakeHashRepository,
    );

    const ngo = await createNgo.execute({
      name: 'John Doe Pet Helper',
      email: 'johndoepethelper@example.com',
      password: '123456',
    });

    expect(ngo).toHaveProperty('id');
  });

  it('should not be able to create a new Ngo with same email from another', async () => {
    const fakeNgosRepository = new FakeNgosRepository();
    const fakeHashRepository = new FakeHashRepository();
    const createNgo = new CreateNgoService(
      fakeNgosRepository,
      fakeHashRepository,
    );

    await createNgo.execute({
      name: 'John Doe Pet Helper',
      email: 'johndoepethelper@example.com',
      password: '123456',
    });

    expect(
      createNgo.execute({
        name: 'John Doe Pet Helper',
        email: 'johndoepethelper@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
