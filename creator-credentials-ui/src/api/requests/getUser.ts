import { getHeaders } from '@/shared/utils/tokenHeader';
import nestInstance, { AxiosRequestConfig } from '../axiosNest';
// eslint-disable-next-line
export enum ClerkRole {
  Issuer = 'issuer',
  Creator = 'creator',
}
export type User = {
  id: number;
  clerkId: string;
  clerkRole: ClerkRole;
  credentials: Credential[];
  publicAddress: string;
  createdAt: Date;
  updatedAt: Date;
};

export type GetUserResponse = User;

export const getUser = (token: string, config?: AxiosRequestConfig) =>
  nestInstance.get<GetUserResponse>('v1/users', {
    ...config,
    ...getHeaders(token),
  });
