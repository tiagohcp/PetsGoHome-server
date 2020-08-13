import AppError from '@shared/errors/AppError';

import FakeHeadquartersRepository from '@modules/headquarters/repositories/fakes/FakeHeadquartersRepository';
import FakeIdentificatorValidator from '@modules/headquarters/validators/IdentificatorValidator/fakes/FakeIdentificatorValidator';
import CreateHeadquarterService from '@modules/headquarters/services/CreateHeadquarterService';
import FakePetsRepository from '../repositories/fakes/FakePetsRepository';
import FakeCompatibilitiesRepository from '../repositories/fakes/FakeCompatibilitiesRepository';

import CreatePetService from './CreatePetService';
import UpdatePetService from './UpdatePetService';

let fakePetsRepository: FakePetsRepository;
let fakeHeadquartersRepository: FakeHeadquartersRepository;
let fakeCompatibilitiesRepository: FakeCompatibilitiesRepository;
let createPet: CreatePetService;
let updatePet: UpdatePetService;

let fakeIdentificatorValidator: FakeIdentificatorValidator;
let createHeadquarter: CreateHeadquarterService;

describe('UpdatePet', () => {
  beforeEach(() => {
    fakePetsRepository = new FakePetsRepository();
    fakeCompatibilitiesRepository = new FakeCompatibilitiesRepository();
    fakeHeadquartersRepository = new FakeHeadquartersRepository();
    createPet = new CreatePetService(
      fakePetsRepository,
      fakeCompatibilitiesRepository,
      fakeHeadquartersRepository,
    );

    updatePet = new UpdatePetService(
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

  it('should be able to update a Pet', async () => {
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
      },
      user_id,
    );

    const updatedPet = await updatePet.execute(
      {
        hq_id: headquarter.id,
        pet: {
          avatar: 'avatar_url',
          name: 'Gatíneo Fofíneo',
          type: 'cat',
          breed: 'Angorá',
          size: 'M',
          age: 2,
          gender: 'male',
          description: 'Sleep a lot',
          energy: 'average',
          active: true,
          expires_at: new Date(2020, 7, 25),
        },
        compatibilities: [
          {
            name: 'gatos',
          },
        ],
      },
      newPet.id,
      user_id,
    );

    await updatePet.execute(
      {
        hq_id: headquarter.id,
        pet: {
          avatar: 'avatar_url',
          name: 'Gatíneo Fofíneo',
          type: 'cat',
          breed: 'Angorá',
          size: 'M',
          age: 2,
          gender: 'male',
          description: 'Sleep a lot',
          energy: 'average',
          active: true,
          expires_at: new Date(2020, 7, 25),
        },
        compatibilities: [
          {
            name: 'gatos',
          },
          {
            name: 'idosos',
          },
        ],
      },
      newPet.id,
      user_id,
    );

    expect(updatedPet.name).toBe('Gatíneo Fofíneo');
    expect(updatedPet.age).toBe(2);
    expect(updatedPet.energy).toBe('average');
  });

  it('should not be able to update a non-existent Pet', async () => {
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
      },
      user_id,
    );

    await expect(
      updatePet.execute(
        {
          hq_id: headquarter.id,
          pet: {
            avatar: 'avatar_url',
            name: 'Gatíneo Fofíneo',
            type: 'cat',
            breed: 'Angorá',
            size: 'M',
            age: 2,
            gender: 'male',
            description: 'Sleep a lot',
            energy: 'average',
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
        },
        'non-existent-id',
        user_id,
      ),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update a Pet in a non exitent Headquarter', async () => {
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
      },
      user_id,
    );

    await expect(
      updatePet.execute(
        {
          hq_id: 'non-existent-hq-id',
          pet: {
            avatar: 'avatar_url',
            name: 'Gatíneo Fofíneo',
            type: 'cat',
            breed: 'Angorá',
            size: 'M',
            age: 2,
            gender: 'male',
            description: 'Sleep a lot',
            energy: 'average',
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
        },
        newPet.id,
        user_id,
      ),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update a Pet from another user', async () => {
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
      },
      user_id,
    );

    await expect(
      updatePet.execute(
        {
          hq_id: headquarter.id,
          pet: {
            avatar: 'avatar_url',
            name: 'Gatíneo Fofíneo',
            type: 'cat',
            breed: 'Angorá',
            size: 'M',
            age: 2,
            gender: 'male',
            description: 'Sleep a lot',
            energy: 'average',
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
        },
        newPet.id,
        'wrong-user-id',
      ),
    ).rejects.toBeInstanceOf(AppError);
  });
});
