import axios, { AxiosResponse } from '../axiosNest';

export type DisconnectMetaMaskWalletPayload = never;

export type DisconnectMetaMaskWalletResponse = never;

export const disconnectMetaMaskWallet = (walletAddress: string) =>
  axios.post<
    DisconnectMetaMaskWalletPayload,
    AxiosResponse<
      DisconnectMetaMaskWalletResponse,
      DisconnectMetaMaskWalletPayload
    >
  >(`/v1/mocks/users/${walletAddress}`);
