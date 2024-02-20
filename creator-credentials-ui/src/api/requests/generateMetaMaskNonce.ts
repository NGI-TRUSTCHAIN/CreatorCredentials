import axios, { AxiosResponse } from '../axiosNest';

export type GenerateMetaMaskNoncePayload = {
  address: string;
};

export type GenerateMetaMaskNonceResponse = {
  nonce: string;
};

export const generateMetaMaskNonce = (payload: GenerateMetaMaskNoncePayload) =>
  axios.post<
    GenerateMetaMaskNoncePayload,
    AxiosResponse<GenerateMetaMaskNonceResponse, GenerateMetaMaskNoncePayload>
  >('/v1/mocks/users/nonce', payload);
