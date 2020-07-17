import { validator } from 'cpf-cnpj-validator';
import * as _joi from '@hapi/joi';

import IIdentificatorValidator from '../models/IIdentificatorValidator';

export default class IdentificatorValidator implements IIdentificatorValidator {
  public async validateIdentidicator(identification: string): Promise<boolean> {
    const Joi = _joi.extend(validator);

    const cpfSchema = Joi.document().cpf();
    const cnpjSchema = Joi.document().cnpj();

    if (cpfSchema.validate(identification).error) {
      if (cnpjSchema.validate(identification).error) {
        return false;
      }
      return true;
    }
    return true;
  }
}
