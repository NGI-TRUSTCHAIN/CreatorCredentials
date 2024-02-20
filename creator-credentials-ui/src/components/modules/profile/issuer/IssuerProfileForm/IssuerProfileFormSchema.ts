import Joi from 'joi';
import { IssuerProfileFormContextType } from './IssuerProfileFormContextType';

export const IssuerProfileFormSchema =
  Joi.object<IssuerProfileFormContextType>().keys({
    domain: Joi.string().domain({ tlds: false }).label('Web domain').required(),
    description: Joi.string().label('Description').max(30).required(),
    email: Joi.string().email({ tlds: false }).label('E-mail').required(),
    companyName: Joi.string().label('Company name').max(30).required(),
  });
