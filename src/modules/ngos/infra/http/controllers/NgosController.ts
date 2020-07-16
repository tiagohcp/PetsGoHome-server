import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateNgoService from '@modules/ngos/services/CreateNgoService';

export default class NgosController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createNgo = container.resolve(CreateNgoService);

    const ngo = await createNgo.execute({
      name,
      email,
      password,
    });

    delete ngo.password;

    return response.json(ngo);
  }
}
