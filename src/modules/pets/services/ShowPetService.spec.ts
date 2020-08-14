import AppError from '@shared/errors/AppError';

import FakeHeadquartersRepository from '@modules/headquarters/repositories/fakes/FakeHeadquartersRepository';
import FakeIdentificatorValidator from '@modules/headquarters/validators/IdentificatorValidator/fakes/FakeIdentificatorValidator';
import CreateHeadquarterService from '@modules/headquarters/services/CreateHeadquarterService';
import FakePetsRepository from '../repositories/fakes/FakePetsRepository';
import FakeCompatibilitiesRepository from '../repositories/fakes/FakeCompatibilitiesRepository';

import CreatePetService from './CreatePetService';
import ShowPetService from './ShowPetService';

let fakePetsRepository: FakePetsRepository;
let fakeHeadquartersRepository: FakeHeadquartersRepository;
let fakeCompatibilitiesRepository: FakeCompatibilitiesRepository;
let createPet: CreatePetService;
let showPet: ShowPetService;

let fakeIdentificatorValidator: FakeIdentificatorValidator;
let createHeadquarter: CreateHeadquarterService;

describe('ShowPet', () => {
  beforeEach(() => {
    fakePetsRepository = new FakePetsRepository();
    fakeCompatibilitiesRepository = new FakeCompatibilitiesRepository();
    fakeHeadquartersRepository = new FakeHeadquartersRepository();
    createPet = new CreatePetService(
      fakePetsRepository,
      fakeCompatibilitiesRepository,
      fakeHeadquartersRepository,
    );

    showPet = new ShowPetService(fakePetsRepository);

    fakeIdentificatorValidator = new FakeIdentificatorValidator();

    createHeadquarter = new CreateHeadquarterService(
      fakeHeadquartersRepository,
      fakeIdentificatorValidator,
    );
  });

  it('should be able to create a new Pet', async () => {
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

    const petProfile = await showPet.execute(newPet.id);

    expect(petProfile.name).toBe('Gatíneo');
    expect(petProfile.active).toBe(true);
    expect(petProfile.type).toBe('cat');
  });

  it('should not be able to show a non existent Pet', async () => {
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

    await createPet.execute(
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

    await expect(showPet.execute('non-existent-uuid')).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
