// import AppError from '@shared/errors/AppError';

import FakeHeadquartersRepository from '../repositories/fakes/FakeHeadquartersRepository';
import ListAllHeadquartersService from './ListAllHeadquartersService';

let fakeHeadquartersRepository: FakeHeadquartersRepository;
let listAllHeadquarter: ListAllHeadquartersService;

describe('ListAllHeadquarters', () => {
  beforeEach(() => {
    fakeHeadquartersRepository = new FakeHeadquartersRepository();
    listAllHeadquarter = new ListAllHeadquartersService(
      fakeHeadquartersRepository,
    );
  });

  it('should be able to list all headquarters owned by an user', async () => {
    const headquarter1 = await fakeHeadquartersRepository.create({
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

    const headquarter2 = await fakeHeadquartersRepository.create({
      user_id: 'user-uuid',
      name: 'Galpão',
      identification: '36153216854',
      zipcode: '12215030',
      address: 'Rua Capitão Raul Fagundes',
      number: '563',
      neighborhood: 'Monte Castelo',
      city: 'São José dos Campos',
      state: 'SP',
      whatsapp: '12981006969',
      about: 'Ong para cuidar de dog mal',
      latitude: -23.1849779,
      longitude: -45.8755274,
    });

    await fakeHeadquartersRepository.create({
      user_id: 'user2-uuid',
      name: 'Sítio',
      identification: '03615316800',
      zipcode: '12215030',
      address: 'Rua Capitão Raul Fagundes',
      number: '169',
      neighborhood: 'Monte Castelo',
      city: 'São José dos Campos',
      state: 'SP',
      whatsapp: '12969000169',
      about: 'Ong para cuidar de gatas saradas',
      latitude: -23.1849779,
      longitude: -45.8755274,
    });

    const headquarters = await listAllHeadquarter.execute({
      user_id: 'user-uuid',
    });

    expect(headquarters).toEqual([headquarter1, headquarter2]);
  });
});
