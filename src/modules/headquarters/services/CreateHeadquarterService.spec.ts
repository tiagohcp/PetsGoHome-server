import AppError from '@shared/errors/AppError';

import FakeIdentificatorValidator from '@modules/headquarters/validators/IdentificatorValidator/fakes/FakeIdentificatorValidator';
import FakeHeadquartersRepository from '../repositories/fakes/FakeHeadquartersRepository';
import CreateHeadquarterService from './CreateHeadquarterService';

describe('CreateHeadquarter', () => {
  it('should be able to create a new Headquarter', async () => {
    const fakeHeadquartersRepository = new FakeHeadquartersRepository();
    const fakeIdentificatorValidator = new FakeIdentificatorValidator();
    const createHeadquarter = new CreateHeadquarterService(
      fakeHeadquartersRepository,
      fakeIdentificatorValidator,
    );

    const user = await createHeadquarter.execute({
      user_id: 'bdd9ea3a-d6fd-49b6-a111-e40c3e32ac61',
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

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new Headquarter with an invalid identificator', async () => {
    const fakeHeadquartersRepository = new FakeHeadquartersRepository();
    const fakeIdentificatorValidator = new FakeIdentificatorValidator();
    const createHeadquarter = new CreateHeadquarterService(
      fakeHeadquartersRepository,
      fakeIdentificatorValidator,
    );

    expect(
      createHeadquarter.execute({
        user_id: 'bdd9ea3a-d6fd-49b6-a111-e40c3e32ac61',
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
    const fakeHeadquartersRepository = new FakeHeadquartersRepository();
    const fakeIdentificatorValidator = new FakeIdentificatorValidator();
    const createHeadquarter = new CreateHeadquarterService(
      fakeHeadquartersRepository,
      fakeIdentificatorValidator,
    );

    await createHeadquarter.execute({
      user_id: 'bdd9ea3a-d6fd-49b6-a111-e40c3e32ac61',
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

    expect(
      createHeadquarter.execute({
        user_id: 'bdd9ea3a-d6fd-49b6-a111-e40c3e32ac61',
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
