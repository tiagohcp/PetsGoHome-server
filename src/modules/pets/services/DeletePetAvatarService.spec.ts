import AppError from '@shared/errors/AppError';

import FakeHeadquartersRepository from '@modules/headquarters/repositories/fakes/FakeHeadquartersRepository';
import FakeIdentificatorValidator from '@modules/headquarters/validators/IdentificatorValidator/fakes/FakeIdentificatorValidator';
import CreateHeadquarterService from '@modules/headquarters/services/CreateHeadquarterService';
import FakePetsRepository from '../repositories/fakes/FakePetsRepository';
import FakePetAvatarsRepository from '../repositories/fakes/FakePetAvatarsRepository';
import FakeCompatibilitiesRepository from '../repositories/fakes/FakeCompatibilitiesRepository';

import CreatePetService from './CreatePetService';
import CreatePetAvatarService from './CreatePetAvatarService';

import DeletePetAvatarService from './DeletePetAvatarService';

let deletePetAvatar: DeletePetAvatarService;

let fakePetAvatarsRepository: FakePetAvatarsRepository;
let createPetAvatar: CreatePetAvatarService;

let fakePetsRepository: FakePetsRepository;
let fakeHeadquartersRepository: FakeHeadquartersRepository;
let fakeCompatibilitiesRepository: FakeCompatibilitiesRepository;
let createPet: CreatePetService;

let fakeIdentificatorValidator: FakeIdentificatorValidator;
let createHeadquarter: CreateHeadquarterService;

describe('DeletePet', () => {
  beforeEach(() => {
    fakePetsRepository = new FakePetsRepository();
    fakeCompatibilitiesRepository = new FakeCompatibilitiesRepository();
    fakeHeadquartersRepository = new FakeHeadquartersRepository();
    createPet = new CreatePetService(
      fakePetsRepository,
      fakeCompatibilitiesRepository,
      fakeHeadquartersRepository,
    );

    fakePetAvatarsRepository = new FakePetAvatarsRepository();
    createPetAvatar = new CreatePetAvatarService(
      fakePetAvatarsRepository,
      fakeHeadquartersRepository,
    );

    deletePetAvatar = new DeletePetAvatarService(
      fakePetAvatarsRepository,
      fakeHeadquartersRepository,
    );

    fakeIdentificatorValidator = new FakeIdentificatorValidator();

    createHeadquarter = new CreateHeadquarterService(
      fakeHeadquartersRepository,
      fakeIdentificatorValidator,
    );
  });

  it('should be able to delete a petAvatar', async () => {
    const user_id = 'user-uuid';
    const headquarter = await createHeadquarter.execute({
      user_id,
      name: 'Casa',
      identification: '82627353000180',
      zipcode: '12215030',
      address: 'Rua Capitão Raul Fagundes',
      number: '573',
      neighborhood: 'Monte Castelo',
      city: 'São José dos Campos',
      state: 'SP',
      whatsapp: '12981005727',
      about: 'Ong para cuidar de gatões',
      latitude: -23.1849779,
      longitude: -45.8755274,
    });

    const newPet = await createPet.execute(
      {
        pet: {
          hq_id: headquarter.id,
          name: 'Gatíneo',
          type: 'cat',
          breed: 'Angorá',
          size: 'M',
          age: 1,
          gender: 'male',
          description: 'Sleep a lot',
          energy: 'low',
          active: true,
          expires_at: new Date(2020, 7, 25),
        },
        compatibilities: [
          {
            name: 'idosos',
          },
        ],
      },
      user_id,
    );

    await createPetAvatar.execute(
      {
        hq_id: headquarter.id,
        petAvatars: [
          {
            avatar: 'avatar-url-1',
            main: true,
          },
          {
            avatar: 'avatar-url-2',
            main: false,
          },
        ],
      },
      newPet.id,
      user_id,
    );

    await deletePetAvatar.execute(
      {
        hq_id: headquarter.id,
        petAvatars: [
          {
            avatar: 'avatar-url-2',
            main: false,
          },
        ],
      },
      newPet.id,
      user_id,
    );

    await expect(
      deletePetAvatar.execute(
        {
          hq_id: headquarter.id,
          petAvatars: [
            {
              avatar: 'avatar-url-2',
              main: true,
            },
          ],
        },
        newPet.id,
        user_id,
      ),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to delete a main petAvatar', async () => {
    const user_id = 'user-uuid';
    const headquarter = await createHeadquarter.execute({
      user_id,
      name: 'Casa',
      identification: '82627353000180',
      zipcode: '12215030',
      address: 'Rua Capitão Raul Fagundes',
      number: '573',
      neighborhood: 'Monte Castelo',
      city: 'São José dos Campos',
      state: 'SP',
      whatsapp: '12981005727',
      about: 'Ong para cuidar de gatões',
      latitude: -23.1849779,
      longitude: -45.8755274,
    });

    const newPet = await createPet.execute(
      {
        pet: {
          hq_id: headquarter.id,
          name: 'Gatíneo',
          type: 'cat',
          breed: 'Angorá',
          size: 'M',
          age: 1,
          gender: 'male',
          description: 'Sleep a lot',
          energy: 'low',
          active: true,
          expires_at: new Date(2020, 7, 25),
        },
        compatibilities: [
          {
            name: 'idosos',
          },
        ],
      },
      user_id,
    );

    await createPetAvatar.execute(
      {
        hq_id: headquarter.id,
        petAvatars: [
          {
            avatar: 'avatar-url-1',
            main: true,
          },
          {
            avatar: 'avatar-url-2',
            main: false,
          },
        ],
      },
      newPet.id,
      user_id,
    );

    await expect(
      deletePetAvatar.execute(
        {
          hq_id: headquarter.id,
          petAvatars: [
            {
              avatar: 'avatar-url-1',
              main: true,
            },
          ],
        },
        newPet.id,
        user_id,
      ),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to delete a non-existent petAvatar', async () => {
    const user_id = 'user-uuid';
    const headquarter = await createHeadquarter.execute({
      user_id,
      name: 'Casa',
      identification: '82627353000180',
      zipcode: '12215030',
      address: 'Rua Capitão Raul Fagundes',
      number: '573',
      neighborhood: 'Monte Castelo',
      city: 'São José dos Campos',
      state: 'SP',
      whatsapp: '12981005727',
      about: 'Ong para cuidar de gatões',
      latitude: -23.1849779,
      longitude: -45.8755274,
    });

    const newPet = await createPet.execute(
      {
        pet: {
          hq_id: headquarter.id,
          name: 'Gatíneo',
          type: 'cat',
          breed: 'Angorá',
          size: 'M',
          age: 1,
          gender: 'male',
          description: 'Sleep a lot',
          energy: 'low',
          active: true,
          expires_at: new Date(2020, 7, 25),
        },
        compatibilities: [
          {
            name: 'idosos',
          },
        ],
      },
      user_id,
    );

    await createPetAvatar.execute(
      {
        hq_id: headquarter.id,
        petAvatars: [
          {
            avatar: 'avatar-url-1',
            main: true,
          },
          {
            avatar: 'avatar-url-2',
            main: false,
          },
        ],
      },
      newPet.id,
      user_id,
    );

    await expect(
      deletePetAvatar.execute(
        {
          hq_id: headquarter.id,
          petAvatars: [
            {
              avatar: 'avatar-url-3',
              main: true,
            },
          ],
        },
        newPet.id,
        user_id,
      ),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to delete a petAvatar in a non existent headquarter', async () => {
    const user_id = 'user-uuid';
    const headquarter = await createHeadquarter.execute({
      user_id,
      name: 'Casa',
      identification: '82627353000180',
      zipcode: '12215030',
      address: 'Rua Capitão Raul Fagundes',
      number: '573',
      neighborhood: 'Monte Castelo',
      city: 'São José dos Campos',
      state: 'SP',
      whatsapp: '12981005727',
      about: 'Ong para cuidar de gatões',
      latitude: -23.1849779,
      longitude: -45.8755274,
    });

    const newPet = await createPet.execute(
      {
        pet: {
          hq_id: headquarter.id,
          name: 'Gatíneo',
          type: 'cat',
          breed: 'Angorá',
          size: 'M',
          age: 1,
          gender: 'male',
          description: 'Sleep a lot',
          energy: 'low',
          active: true,
          expires_at: new Date(2020, 7, 25),
        },
        compatibilities: [
          {
            name: 'idosos',
          },
        ],
      },
      user_id,
    );

    await expect(
      deletePetAvatar.execute(
        {
          hq_id: 'non-exixtent-hq_id',
          petAvatars: [
            {
              avatar: 'avatar-url-1',
              main: true,
            },
            {
              avatar: 'avatar-url-2',
              main: false,
            },
          ],
        },
        newPet.id,
        user_id,
      ),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to dekete a petAvatar in a pet from another user', async () => {
    const user_id = 'user-uuid';
    const headquarter = await createHeadquarter.execute({
      user_id,
      name: 'Casa',
      identification: '82627353000180',
      zipcode: '12215030',
      address: 'Rua Capitão Raul Fagundes',
      number: '573',
      neighborhood: 'Monte Castelo',
      city: 'São José dos Campos',
      state: 'SP',
      whatsapp: '12981005727',
      about: 'Ong para cuidar de gatões',
      latitude: -23.1849779,
      longitude: -45.8755274,
    });

    const newPet = await createPet.execute(
      {
        pet: {
          hq_id: headquarter.id,
          name: 'Gatíneo',
          type: 'cat',
          breed: 'Angorá',
          size: 'M',
          age: 1,
          gender: 'male',
          description: 'Sleep a lot',
          energy: 'low',
          active: true,
          expires_at: new Date(2020, 7, 25),
        },
        compatibilities: [
          {
            name: 'idosos',
          },
        ],
      },
      user_id,
    );

    await expect(
      deletePetAvatar.execute(
        {
          hq_id: headquarter.id,
          petAvatars: [
            {
              avatar: 'avatar-url-1',
              main: true,
            },
            {
              avatar: 'avatar-url-2',
              main: false,
            },
          ],
        },
        newPet.id,
        'another_uuid',
      ),
    ).rejects.toBeInstanceOf(AppError);
  });
});
