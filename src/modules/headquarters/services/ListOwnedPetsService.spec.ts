import AppError from '@shared/errors/AppError';

import FakePetsRepository from '@modules/pets/repositories/fakes/FakePetsRepository';
import FakeHeadquartersRepository from '../repositories/fakes/FakeHeadquartersRepository';

import ListOwnedPetsService from './ListOwnedPetsService';

let fakePetsRepository: FakePetsRepository;
let fakeHeadquartersRepository: FakeHeadquartersRepository;
let listOwnedPets: ListOwnedPetsService;

describe('ListOwnedPets', () => {
  beforeEach(() => {
    fakeHeadquartersRepository = new FakeHeadquartersRepository();
    fakePetsRepository = new FakePetsRepository();
    listOwnedPets = new ListOwnedPetsService(fakeHeadquartersRepository);
  });

  it('should be able to show all pets from a Headquarter', async () => {
    const createdHeadquarter = await fakeHeadquartersRepository.create({
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

    const newPet = await fakePetsRepository.create({
      headquarter: createdHeadquarter,
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
          compatibility_id: 'compa_id',
          name: 'idosos',
        },
      ],
    });

    console.log('***ListOwnedPets.newPet ', newPet);

    const headquarter = await listOwnedPets.execute({
      hq_id: createdHeadquarter.id,
    });

    console.log('***ListOwnedPets.headquarter ', headquarter);

    expect(headquarter).toContain([newPet]);
  });

  it('should not be able to show the information from non-existing HeadQuarter', async () => {
    await expect(
      listOwnedPets.execute({
        hq_id: 'non-existing-user-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
