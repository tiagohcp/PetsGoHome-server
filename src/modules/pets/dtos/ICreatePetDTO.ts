import Headquarter from '@modules/headquarters/infra/typeorm/entities/Headquarter';

interface ICompatibility {
  compatibility_id: string;
  name: string;
}

interface IPet {
  hq_id: string;
  name: string;
  type: 'dog' | 'cat';
  breed: string;
  size: 'PP' | 'P' | 'M' | 'G' | 'GG';
  age: number;
  gender: 'male' | 'female';
  description: string;
  energy: 'low' | 'average' | 'high';
  active: boolean;
  expires_at: Date;
}

export default interface ICreatePetDTO {
  headquarter: Headquarter;
  pet: IPet;
  compatibilities: ICompatibility[];
}
