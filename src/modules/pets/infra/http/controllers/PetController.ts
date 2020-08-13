import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreatePetService from '@modules/pets/services/CreatePetService';
import ShowPetService from '@modules/pets/services/ShowPetService';
import UpdatePetService from '@modules/pets/services/UpdatePetService';

export default class PetController {
  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const { hq_id, pet, compatibilities } = request.body;

    const createPet = container.resolve(CreatePetService);

    const newPet = await createPet.execute(
      {
        hq_id,
        pet,
        compatibilities,
      },
      user_id,
    );

    return response.json(newPet);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { pet_id } = request.params;

    const showPet = container.resolve(ShowPetService);

    const pet = await showPet.execute(pet_id);

    return response.json(pet);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const { pet_id } = request.params;

    const { hq_id, pet, compatibilities } = request.body;

    const updatePet = container.resolve(UpdatePetService);

    const updatedPet = await updatePet.execute(
      {
        hq_id,
        pet,
        compatibilities,
      },
      pet_id,
      user_id,
    );

    return response.json(updatedPet);
  }
}
