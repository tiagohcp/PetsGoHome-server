import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListOwnedPetsService from '@modules/headquarters/services/ListOwnedPetsService';

export default class HeadquarterPetsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { headquarter_id } = request.params;

    const listOwnedPets = container.resolve(ListOwnedPetsService);

    const pets = await listOwnedPets.execute({ hq_id: headquarter_id });

    return response.json(pets);
  }
}
