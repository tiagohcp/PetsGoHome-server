import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreatePetAvatarService from '@modules/pets/services/CreatePetAvatarService';
import ShowPetAvatarService from '@modules/pets/services/ShowPetAvatarsService';
import UpdateMainPetAvatarService from '@modules/pets/services/UpdateMainPetAvatarService';
import DeletePetAvatarService from '@modules/pets/services/DeletePetAvatarService';

export default class PetController {
  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { pet_id } = request.params;

    const { hq_id, petAvatars } = request.body;

    const createPetAvatar = container.resolve(CreatePetAvatarService);

    const newPetAvatars = await createPetAvatar.execute(
      {
        hq_id,
        petAvatars,
      },
      pet_id,
      user_id,
    );

    return response.json(newPetAvatars);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { pet_id } = request.params;

    const showPetAvatar = container.resolve(ShowPetAvatarService);

    const pet = await showPetAvatar.execute(pet_id);

    return response.json(pet);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const { pet_id } = request.params;

    const { hq_id, petAvatars } = request.body;

    const updateMainPetAvatar = container.resolve(UpdateMainPetAvatarService);

    const updatedPetAvatar = await updateMainPetAvatar.execute(
      {
        hq_id,
        petAvatars,
      },
      pet_id,
      user_id,
    );

    return response.json(updatedPetAvatar);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { pet_id } = request.params;

    const { hq_id, petAvatars } = request.body;

    const deletePetAvatar = container.resolve(DeletePetAvatarService);

    await deletePetAvatar.execute(
      {
        hq_id,
        petAvatars,
      },
      pet_id,
      user_id,
    );

    return response.status(200).json({});
  }
}
