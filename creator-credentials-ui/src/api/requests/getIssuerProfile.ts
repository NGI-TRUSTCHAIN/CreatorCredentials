import { IssuerProfile } from '@/shared/typings/IssuerProfile';
import axios from '../axiosNest';

export type GetIssuerProfileResponse = IssuerProfile;

export const getIssuerProfile = () =>
  axios.get<GetIssuerProfileResponse>('/v1/mocks/issuer/profile');
