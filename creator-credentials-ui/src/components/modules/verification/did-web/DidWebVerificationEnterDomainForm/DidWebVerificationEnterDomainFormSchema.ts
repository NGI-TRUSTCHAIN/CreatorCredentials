import Joi from 'joi';
import { DidWebVerificationEnterDomainFormContextType } from './DidWebVerificationEnterDomainFormContextType';

export const DidWebVerificationEnterDomainFormSchema =
  Joi.object<DidWebVerificationEnterDomainFormContextType>().keys({
    domain: Joi.string().domain({ tlds: false }).label('Web domain').required(),
  });
