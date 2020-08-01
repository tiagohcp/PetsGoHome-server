import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import UpdateTypeService from '@modules/users/services/UpdateTypeService';
import AppError from '@shared/errors/AppError';

export default class TypeController {
  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const user_type = request.body.type;

    const updateType = container.resolve(UpdateTypeService);

    if (user_type !== 'adopter' && user_type !== 'ngo') {
      throw new AppError('Tipo de usuário invalido!');
    }

    const user = await updateType.execute({
      user_id,
      user_type,
    });

    return response.json(classToClass(user));
  }
}
