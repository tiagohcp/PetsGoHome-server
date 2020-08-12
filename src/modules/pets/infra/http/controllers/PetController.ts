import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreatePetService from '@modules/pets/services/CreatePetService';
import ListAllPetsService from '@modules/pets/services/ListAllPetsService';

export default class PetController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { hq_id, pet, compatibilities } = request.body;

    const createPet = container.resolve(CreatePetService);

    const newPet = await createPet.execute({
      hq_id,
      pet,
      compatibilities,
    });

    return response.json(newPet);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { headquarter_id } = request.params;

    console.log('***PetController.index.headquarter_id ', headquarter_id);

    const listAllPets = container.resolve(ListAllPetsService);

    const pets = await listAllPets.execute({ hq_id: headquarter_id });

    return response.json(pets);
  }
}
