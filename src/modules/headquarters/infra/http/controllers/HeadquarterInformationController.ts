import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ShowHeadquarterService from '@modules/headquarters/services/ShowHeadquarterService';
import ListAllHeadquartersService from '@modules/headquarters/services/ListAllHeadquartersService';
import UpdateHeadquarterService from '@modules/headquarters/services/UpdateHeadquarterService';

export default class HeadquarterInformationController {
  public async show(request: Request, response: Response): Promise<Response> {
    console.log(
      '***HeadquarterInformationController.index.request.params ',
      request.params,
    );
    const { headquarter_id } = request.params;

    const showHeadquarter = container.resolve(ShowHeadquarterService);

    const headquarter = await showHeadquarter.execute(headquarter_id);

    return response.json(headquarter);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    console.log(
      '***HeadquarterInformationController.index.request.user ',
      request.user,
    );
    const { id } = request.user;

    console.log('***HeadquarterInformationController.index.id ', id);

    const listAllHeadquarters = container.resolve(ListAllHeadquartersService);

    const headquarters = await listAllHeadquarters.execute({ user_id: id });

    return response.json(headquarters);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { headquarter_id } = request.params;
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

    const updateHeadquarter = container.resolve(UpdateHeadquarterService);

    const headquarter = await updateHeadquarter.execute({
      id: headquarter_id,
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
}
