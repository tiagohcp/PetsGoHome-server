import AppError from '@shared/errors/AppError';

import FakeHeadquartersRepository from '../repositories/fakes/FakeHeadquartersRepository';
import UpdateHeadquarterService from './UpdateHeadquarterService';

let fakeHeadquartersRepository: FakeHeadquartersRepository;
let updateHeadquarter: UpdateHeadquarterService;

describe('UpdateHeadquarter', () => {
  beforeEach(() => {
    fakeHeadquartersRepository = new FakeHeadquartersRepository();
    updateHeadquarter = new UpdateHeadquarterService(
      fakeHeadquartersRepository,
    );
  });

  it('should be able to update the information from a Headquarter', async () => {
    const headquarter = await fakeHeadquartersRepository.create({
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

    const updatedHeadquarter = await updateHeadquarter.execute({
      id: headquarter.id,
      user_id: 'user-uuid',
      name: 'Galpão',
      identification: '82627353000180',
      zipcode: '12215030',
      address: 'Rua Capitão Raul Fagundes',
      number: '573',
      neighborhood: 'Monte Castelo',
      city: 'São José dos Campos',
      state: 'SP',
      whatsapp: '12981006969',
      about: 'Ong para cuidar de dog mal',
      latitude: -23.1849779,
      longitude: -45.8755274,
    });

    expect(updatedHeadquarter.user_id).toBe('user-uuid');
    expect(updatedHeadquarter.name).toBe('Galpão');
    expect(updatedHeadquarter.identification).toBe('82627353000180');
    expect(updatedHeadquarter.zipcode).toBe('12215030');
    expect(updatedHeadquarter.address).toBe('Rua Capitão Raul Fagundes');
    expect(updatedHeadquarter.number).toBe('573');
    expect(updatedHeadquarter.neighborhood).toBe('Monte Castelo');
    expect(updatedHeadquarter.city).toBe('São José dos Campos');
    expect(updatedHeadquarter.state).toBe('SP');
    expect(updatedHeadquarter.whatsapp).toBe('12981006969');
    expect(updatedHeadquarter.about).toBe('Ong para cuidar de dog mal');
    expect(String(updatedHeadquarter.latitude)).toBe('-23.1849779');
    expect(String(updatedHeadquarter.longitude)).toBe('-45.8755274');
  });

  it('should not be able to update the identification from a Headquarter', async () => {
    const headquarter = await fakeHeadquartersRepository.create({
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
      updateHeadquarter.execute({
        id: headquarter.id,
        user_id: 'user-uuid',
        name: 'Galpão',
        identification: 'another-identification',
        zipcode: '12215030',
        address: 'Rua Capitão Raul Fagundes',
        number: '573',
        neighborhood: 'Monte Castelo',
        city: 'São José dos Campos',
        state: 'SP',
        whatsapp: '12981006969',
        about: 'Ong para cuidar de dog mal',
        latitude: -23.1849779,
        longitude: -45.8755274,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the identification from a non existing Headquarter', async () => {
    await fakeHeadquartersRepository.create({
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
      updateHeadquarter.execute({
        id: 'non-existing-headquarter-id',
        user_id: 'user-uuid',
        name: 'Galpão',
        identification: 'another-identification',
        zipcode: '12215030',
        address: 'Rua Capitão Raul Fagundes',
        number: '573',
        neighborhood: 'Monte Castelo',
        city: 'São José dos Campos',
        state: 'SP',
        whatsapp: '12981006969',
        about: 'Ong para cuidar de dog mal',
        latitude: -23.1849779,
        longitude: -45.8755274,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
