import { EmailCredential } from '@/shared/typings/Credentials';
import { CredentialVerificationStatus } from '@/shared/typings/CredentialVerificationStatus';
import { CredentialType } from '@/shared/typings/CredentialType';
import nestInstance, { AxiosRequestConfig } from '../axiosNest';
// eslint-disable-next-line
export type GetEmailCredentialResponse = {
  emailCredential: EmailCredential;
};

export const getEmailCredential = (
  token: string,
  config?: AxiosRequestConfig,
) =>
  nestInstance
    .get<GetEmailCredentialResponse>('v1/credentials/email', {
      ...config,
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => ({
      data: {
        emailCredential: formatEmailCredential(res.data.emailCredential),
      },
    }));

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function formatEmailCredential(credential: any): EmailCredential {
  return {
    id: credential.id,
    status: CredentialVerificationStatus.Success,
    type: CredentialType.Email,
    data: {
      address: credential.credentialSubject.email || 'wrong',
      companyName: 'Creator Credentials B.V.',
      requirements: 'Info about requirements',
      credentialObject: credential,
    },
  };
}
