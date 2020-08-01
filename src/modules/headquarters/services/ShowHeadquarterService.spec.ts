import AppError from '@shared/errors/AppError';

import FakeHeadquartersRepository from '../repositories/fakes/FakeHeadquartersRepository';
import ShowHeadquarterService from './ShowHeadquarterService';

let fakeHeadquartersRepository: FakeHeadquartersRepository;
let showHeadquarter: ShowHeadquarterService;

describe('ShowHeadquarter', () => {
  beforeEach(() => {
    fakeHeadquartersRepository = new FakeHeadquartersRepository();
    showHeadquarter = new ShowHeadquarterService(fakeHeadquartersRepository);
  });

  it('should be able to show the information from a Headquarter', async () => {
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

    const headquarter = await showHeadquarter.execute(createdHeadquarter.id);

    expect(headquarter.user_id).toBe('user-uuid');
    expect(headquarter.name).toBe('Casa');
    expect(headquarter.identification).toBe('82627353000180');
    expect(headquarter.zipcode).toBe('12215030');
    expect(headquarter.address).toBe('Rua Capitão Raul Fagundes');
    expect(headquarter.number).toBe('573');
    expect(headquarter.neighborhood).toBe('Monte Castelo');
    expect(headquarter.city).toBe('São José dos Campos');
    expect(headquarter.state).toBe('SP');
    expect(headquarter.whatsapp).toBe('12981005727');
    expect(headquarter.about).toBe('Ong para cuidar de gatões');
    expect(String(headquarter.latitude)).toBe('-23.1849779');
    expect(String(headquarter.longitude)).toBe('-45.8755274');
  });

  it('should not be able to show the information from non-existing HeadQuarter', async () => {
    await expect(
      showHeadquarter.execute('non-existing-user-id'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
