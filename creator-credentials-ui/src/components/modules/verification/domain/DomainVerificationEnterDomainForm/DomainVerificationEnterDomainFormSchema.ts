import Joi from 'joi';
import { DomainVerificationEnterDomainFormContextType } from './DomainVerificationEnterDomainFormContextType';

export const DomainVerificationEnterDomainFormSchema =
  Joi.object<DomainVerificationEnterDomainFormContextType>().keys({
    domain: Joi.string().domain({ tlds: false }).label('Web domain').required(),
  });
