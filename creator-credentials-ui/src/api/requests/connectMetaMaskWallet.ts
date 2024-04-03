import { getHeaders } from '@/shared/utils/tokenHeader';
import axios, { AxiosResponse } from '../axiosNest';

export type ConnectMetaMaskWalletPayload = {
  signedMessage: string;
  publicAddress: string;
};

export type ConnectMetaMaskWalletResponse = never;

export type ConnectMetaMaskWalletProps = {
  payload: ConnectMetaMaskWalletPayload;
};

export const connectMetaMaskWallet = (
  token: string,
  { payload }: ConnectMetaMaskWalletProps,
) =>
  axios.post<
    ConnectMetaMaskWalletPayload,
    AxiosResponse<ConnectMetaMaskWalletResponse, ConnectMetaMaskWalletPayload>
  >(`/v1/users/address/connect`, payload, getHeaders(token));
