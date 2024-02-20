import axios, { AxiosResponse } from '../axiosNest';

export type ConnectMetaMaskWalletPayload = {
  signedMessage: string;
};

export type ConnectMetaMaskWalletResponse = never;

export type ConnectMetaMaskWalletProps = {
  walletAddress: string;
  payload: ConnectMetaMaskWalletPayload;
};

export const connectMetaMaskWallet = ({
  walletAddress,
  payload,
}: ConnectMetaMaskWalletProps) =>
  axios.post<
    ConnectMetaMaskWalletPayload,
    AxiosResponse<ConnectMetaMaskWalletResponse, ConnectMetaMaskWalletPayload>
  >(`/v1/mocks/users/${walletAddress}`, payload);
