import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateHeadquarterService from '@modules/headquarters/services/CreateHeadquarterService';
import ListAllHeadquartersService from '@modules/headquarters/services/ListAllHeadquartersService';

export default class HeadquarterController {
  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const {
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

    const headquarter = await createHeadquarter.execute({
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

    return response.json(headquarter);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const listAllHeadquarters = container.resolve(ListAllHeadquartersService);

    const headquarters = await listAllHeadquarters.execute({ user_id: id });

    return response.json(headquarters);
  }
}
