import { Request, Response, NextFunction } from 'express';

import accessConfig from '@config/access';
import AppError from '@shared/errors/AppError';

export default function ensureAccess(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const rules = accessConfig;
  const { baseUrl, method } = request;
  const user_type = request.user.type;

  if (!user_type) {
    throw new AppError('User type is not informed', 401);
  }

  if (user_type === 'ngo') return next();

  const urlIndex = rules.adopter.findIndex(
    url => Object.keys(url)[0] === baseUrl,
  );

  if (urlIndex === -1) throw new AppError('Premission denied url', 401);

  const permissions = Object.values(rules.adopter[urlIndex])[0];

  let methodPermited = null;
  if (permissions) {
    methodPermited = permissions.find(values => values === method);
  }

  if (methodPermited) return next();

  throw new AppError('Premission denied method', 401);
}
