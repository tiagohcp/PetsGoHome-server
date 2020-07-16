import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateAdopterService from '@modules/adopters/services/CreateAdopterService';

export default class AdoptersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createAdopter = container.resolve(CreateAdopterService);

    const adopter = await createAdopter.execute({
      name,
      email,
      password,
    });

    delete adopter.password;

    return response.json(adopter);
  }
}
