import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateHeadquarterService from '@modules/headquarters/services/CreateHeadquarterService';

export default class HeadquarterController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      user_id,
      name,
      identification,
      zipcode,
      address,
      number,
      neighborhood,
      city,
      state,
      whatsapp,
      about,
      latitude,
      longitude,
    } = request.body;

    const createHeadquarter = container.resolve(CreateHeadquarterService);

    const appointment = await createHeadquarter.execute({
      user_id,
      name,
      identification,
      zipcode,
      address,
      number,
      neighborhood,
      city,
      state,
      whatsapp,
      about,
      latitude,
      longitude,
    });

    return response.json(appointment);
  }
}
