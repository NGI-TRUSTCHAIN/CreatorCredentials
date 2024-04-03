import { getHeaders } from '@/shared/utils/tokenHeader';
import axios from '../axiosNest';

export type GenerateMetaMaskNonceResponse = {
  nonce: string;
};

export const generateMetaMaskNonce = (token: string) =>
  axios.get<GenerateMetaMaskNonceResponse>(
    `/v1/users/nonce`,
    getHeaders(token),
  );
