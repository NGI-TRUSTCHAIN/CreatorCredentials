import { Tooltip } from 'flowbite-react';
import { useTranslation } from '@/shared/utils/useTranslation';
import { MetamaskConnectionButton } from '@/components/shared/MetamaskConnectionButton';
import { CardWithBadge } from '@/components/shared/CardWithBadge';
import { ColoredBadge } from '@/components/shared/ColoredBadge';
import { useCopyToClipboard } from '@/shared/hooks/useCopyToClipboard';
import { truncateWalletAddress } from '@/shared/utils/truncateWalletAddress';

type MetamaskVerificationCardProps = {
  walletAddress?: string | null;
};

export const MetamaskVerificationCard = ({
  walletAddress,
}: MetamaskVerificationCardProps) => {
  const { t } = useTranslation('verification-cards');
  const { copy } = useCopyToClipboard();

  const truncatedWalletAddress = walletAddress
    ? truncateWalletAddress(walletAddress)
    : null;

  const walletAddressClickHandler = () => {
    if (walletAddress) {
      copy(walletAddress);
    }
  };

  return (
    <CardWithBadge
      badgeType="verification"
      title={t('metamask.title')}
      image={{
        iconName: 'Metamask',
      }}
      className="flex-1"
      content={
        walletAddress ? (
          <Tooltip content={walletAddress}>
            <CardWithBadge.ContentWithIcon
              iconName="AccountBalanceWallet"
              className="whitespace-pre-wrap"
              onClick={walletAddressClickHandler}
            >
              {truncatedWalletAddress}
            </CardWithBadge.ContentWithIcon>
          </Tooltip>
        ) : (
          <p>{t('metamask.description')}</p>
        )
      }
      footer={
        <>
          <MetamaskConnectionButton
            connectLabel={t('metamask.buttons.connect')}
            disconnectLabel={t('metamask.buttons.disconnect')}
            walletAddress={walletAddress}
          />
          {walletAddress && (
            <ColoredBadge
              badgeType="connected"
              className="self-center"
            />
          )}
        </>
      }
    />
  );
};
