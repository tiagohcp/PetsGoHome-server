import AppError from '@shared/errors/AppError';

import FakeHeadquartersRepository from '@modules/headquarters/repositories/fakes/FakeHeadquartersRepository';
import FakeIdentificatorValidator from '@modules/headquarters/validators/IdentificatorValidator/fakes/FakeIdentificatorValidator';
import CreateHeadquarterService from '@modules/headquarters/services/CreateHeadquarterService';
import FakePetsRepository from '../repositories/fakes/FakePetsRepository';
import FakeCompatibilitiesRepository from '../repositories/fakes/FakeCompatibilitiesRepository';

import CreatePetService from './CreatePetService';

let fakePetsRepository: FakePetsRepository;
let fakeHeadquartersRepository: FakeHeadquartersRepository;
let fakeCompatibilitiesRepository: FakeCompatibilitiesRepository;
let createPet: CreatePetService;

let fakeIdentificatorValidator: FakeIdentificatorValidator;
let createHeadquarter: CreateHeadquarterService;

describe('CreatePet', () => {
  beforeEach(() => {
    fakePetsRepository = new FakePetsRepository();
    fakeCompatibilitiesRepository = new FakeCompatibilitiesRepository();
    fakeHeadquartersRepository = new FakeHeadquartersRepository();
    createPet = new CreatePetService(
      fakePetsRepository,
      fakeCompatibilitiesRepository,
      fakeHeadquartersRepository,
    );

    fakeIdentificatorValidator = new FakeIdentificatorValidator();

    createHeadquarter = new CreateHeadquarterService(
      fakeHeadquartersRepository,
      fakeIdentificatorValidator,
    );
  });

  it('should be able to create a new Pet', async () => {
    const headquarter = await createHeadquarter.execute({
      user_id: 'user-uuid',
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

    const newPet = await createPet.execute({
      hq_id: headquarter.id,
      pet: {
        avatar: 'avatar_url',
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
    });

    await createPet.execute({
      hq_id: headquarter.id,
      pet: {
        avatar: 'avatar_url',
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
        {
          name: 'gatos',
        },
      ],
    });

    expect(newPet).toHaveProperty('id');
  });

  it('should not be able to create a new Pet in a non existent headquarter', async () => {
    await expect(
      createPet.execute({
        hq_id: 'hq_id',
        pet: {
          avatar: 'avatar_url',
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
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
