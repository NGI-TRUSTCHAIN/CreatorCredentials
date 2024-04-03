import { getHeaders } from '@/shared/utils/tokenHeader';
import nestInstance from '../axiosNest';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type deleteMemberCredentialResponse = any;
export type DeleteMemberCredentialPayload = {
  credentialId: string;
};

export const deleteMemberCredential = (credentialId: string, token: string) =>
  nestInstance.delete<deleteMemberCredentialResponse>(
    `v1/credentials/${credentialId}`,
    getHeaders(token),
  );
