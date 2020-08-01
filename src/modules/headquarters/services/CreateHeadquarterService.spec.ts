import AppError from '@shared/errors/AppError';

import FakeIdentificatorValidator from '@modules/headquarters/validators/IdentificatorValidator/fakes/FakeIdentificatorValidator';
import FakeHeadquartersRepository from '../repositories/fakes/FakeHeadquartersRepository';
import CreateHeadquarterService from './CreateHeadquarterService';

let fakeHeadquartersRepository: FakeHeadquartersRepository;
let fakeIdentificatorValidator: FakeIdentificatorValidator;
let createHeadquarter: CreateHeadquarterService;

describe('CreateHeadquarter', () => {
  beforeEach(() => {
    fakeHeadquartersRepository = new FakeHeadquartersRepository();
    fakeIdentificatorValidator = new FakeIdentificatorValidator();
    createHeadquarter = new CreateHeadquarterService(
      fakeHeadquartersRepository,
      fakeIdentificatorValidator,
    );
  });

  it('should be able to create a new Headquarter', async () => {
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

    expect(headquarter).toHaveProperty('id');
  });

  it('should not be able to create a new Headquarter with an invalid identificator', async () => {
    await expect(
      createHeadquarter.execute({
        user_id: 'user-uuid',
        name: 'Casa',
        identification: 'afafaff',
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
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new Headquarter with same identificator from another', async () => {
    await createHeadquarter.execute({
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

    await expect(
      createHeadquarter.execute({
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
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
