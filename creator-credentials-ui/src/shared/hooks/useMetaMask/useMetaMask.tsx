import MetaMaskSDK from '@metamask/sdk';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useTranslation } from '@/shared/utils/useTranslation';
import { useToast } from '@/shared/hooks/useToast';
import { useConnectMetaMaskWallet } from '@/api/mutations/useConnectMetaMaskWallet';
import { useDisconnectMetaMaskWallet } from '@/api/mutations/useDisconnectMetaMaskWallet';
import { useGenerateMetaMaskNonce } from '@/api/queries/useGenerateMetaMaskNonce';
import { QueryKeys } from '@/api/queryKeys';
import { ProviderRpcError } from '@/shared/typings/ProviderRpcError';
import { config } from '@/shared/constants/config';

type UseMetaMaskProps = {
  optimisticUpdate?: boolean;
};

export const useMetaMask = ({} // optimisticUpdate = true,
: UseMetaMaskProps = {}) => {
  const { t } = useTranslation('metamask');
  const queryClient = useQueryClient();
  const toast = useToast();

  const [isConnecting, setIsConnecting] = useState(false);
  // const [account, setAccount] = useState<string>('');
  const [sdk, setSDK] = useState<MetaMaskSDK>();

  const {
    mutateAsync: mutateConnectWallet,
    isLoading: isConnectingMutationRunning,
  } = useConnectMetaMaskWallet({
    onSuccess: () => {
      queryClient.invalidateQueries([QueryKeys.creatorVerifiedCredentials]);
    },
  });

  const { mutateAsync: mutateDisconnectWallet, isLoading: isDisconnecting } =
    useDisconnectMetaMaskWallet({
      onSuccess: () => {
        queryClient.invalidateQueries([QueryKeys.creatorVerifiedCredentials]);
      },
    });

  const { data, isLoading: isLoadingNonce } = useGenerateMetaMaskNonce();
  const nonce = data?.nonce;

  const connect = async () => {
    try {
      setIsConnecting(true);
      if (!sdk) {
        throw new Error('SDK not ready');
      }

      const accounts = (await sdk.connect()) as string[] | undefined;

      if (!accounts?.[0]) {
        throw new Error('No connection with wallet');
      }

      const from = (accounts as string[])[0];
      // setAccount(from);

      const provider = await sdk.getProvider();

      if (!provider) {
        throw new Error('No provider');
      }

      if (!nonce) {
        throw new Error('No nonce');
      }

      const message = t('sign-message', {
        nonce,
        walletAddress: from,
        termsAndConditionsUrl: config.TERMS_AND_CONDITIONS_URL,
      });
      const signature = await provider?.request<string>({
        method: 'personal_sign',
        params: [message, from],
      });

      if (!signature) {
        throw new Error('No signature');
      }

      await mutateConnectWallet({
        payload: {
          publicAddress: from,
          signedMessage: signature,
        },
      });
    } catch (err) {
      if ((err as ProviderRpcError).code) {
        // Code 4001 - User closed the MetaMask Browser extension while connecting
        // Code -32603 - User rejected the signature request
        if (![4001, -32603].includes((err as ProviderRpcError).code)) {
          toast.error(t('errors.connection-failed'));
          return;
        }
        return;
      }
      toast.error(t('errors.connection-failed'));
    } finally {
      setIsConnecting(false);
    }
  };

  useEffect(() => {
    const doAsync = async () => {
      const clientSDK = new MetaMaskSDK({
        checkInstallationImmediately: false,
        dappMetadata: {
          name: 'Creator Credentials',
          url: window.location.host,
        },
        extensionOnly: true,
        preferDesktop: true,
      });
      await clientSDK.init();
      setSDK(clientSDK);
    };
    doAsync();
  }, []);

  const disconnect = async (walletAddress: string) => {
    try {
      await sdk?.terminate();
      await mutateDisconnectWallet(walletAddress);
    } catch (err) {
      toast.error(t('errors.disconnection-failed'));
    }
  };

  const isProcessing =
    isConnecting ||
    !sdk ||
    isLoadingNonce ||
    isDisconnecting ||
    isConnectingMutationRunning;

  return {
    connect,
    disconnect,
    isProcessing,
  };
};
