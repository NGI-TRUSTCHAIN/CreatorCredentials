import { IssuerCredentials } from '@/shared/typings/Credentials';
import axios from '../axiosNest';

export type GetIssuerCredentialsResponse = {
  credentials: IssuerCredentials;
};

export const getIssuerCredentials = () =>
  axios.get<GetIssuerCredentialsResponse>('/v1/mocks/issuer/credentials');
