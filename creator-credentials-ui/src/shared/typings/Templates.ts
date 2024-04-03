import { CredentialTemplateType } from './CredentialTemplateType';

export type VerifiedCredentialsTemplate = {
  id: string;
  templateType: CredentialTemplateType;
  name: string;
};
