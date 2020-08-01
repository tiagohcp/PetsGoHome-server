import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateTypeService from './UpdateTypeService';

let fakeUsersRepository: FakeUsersRepository;

let updateType: UpdateTypeService;

describe('UpdateType', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    updateType = new UpdateTypeService(fakeUsersRepository);
  });

  it('should be able to update the type', async () => {
    const userCreated = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      type: 'ngo',
    });

    const { user } = await updateType.execute({
      user_id: userCreated.id,
      user_type: 'adopter',
    });

    expect(user.type).toBe('adopter');
  });

  it('should not be able to update the profile from non-existing user', async () => {
    await expect(
      updateType.execute({
        user_id: 'non-existing-user-id',
        user_type: 'adopter',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
