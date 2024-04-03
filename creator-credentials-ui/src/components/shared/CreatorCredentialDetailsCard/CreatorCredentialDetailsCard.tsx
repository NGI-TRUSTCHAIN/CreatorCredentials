import React, { ElementType } from 'react';
import Link from 'next/link';
import { DropdownItemProps, Tooltip } from 'flowbite-react';
import { Creator } from '@/shared/typings/Creator';
import {
  truncateEmailAddress,
  truncateWalletAddress,
} from '@/shared/utils/truncateWalletAddress';
import { BadgeType } from '@/shared/typings/BadgeType';
import { useCopyToClipboard } from '@/shared/hooks/useCopyToClipboard';
// import { CardWithBadge } from '../CardWithBadge';
import { VerifiedCredentialsUnion } from '@/shared/typings/Credentials';
// import { CredentialDetailsCard } from '../CredentialDetailsCard';
import { CardWithBadgeForCred } from '../CardWithBadgeForCred';

type CreatorCredentialDetailsCardProps = {
  creator: Creator;
  credential: VerifiedCredentialsUnion;
  subtitle?: string;
  backRoute?: string;
  additionalBadgeType?: BadgeType;
  renderFooter?: ((creator: Creator) => React.ReactNode) | null;
  dropdownItems?: DropdownItemProps<ElementType>[];
};

export const CreatorCredentialDetailsCard = ({
  creator,
  credential,
  renderFooter,
  dropdownItems,
  backRoute,
  additionalBadgeType = undefined,
}: CreatorCredentialDetailsCardProps) => {
  const { imageUrl, title, credentials } = creator;
  const { copy } = useCopyToClipboard();

  const walletAddress = credentials.walletAddress;
  const truncatedWalletAddress = walletAddress
    ? truncateWalletAddress(walletAddress)
    : null;

  const walletAddressClickHandler = () => {
    if (walletAddress) {
      copy(walletAddress);
    }
  };

  const emailAddress = credentials.email;

  const truncatedEmailAddress = emailAddress
    ? truncateEmailAddress(emailAddress)
    : null;

  const emailAddressClickHandler = () => {
    if (emailAddress) {
      copy(emailAddress);
    }
  };
  return (
    <CardWithBadgeForCred
      badgeType="creator"
      additionalBadgeType={additionalBadgeType}
      credential={credential}
      image={{
        imageUrl,
        alt: 'Creator image',
      }}
      title={truncateEmailAddress(title)}
      dropdownItems={
        dropdownItems || [
          {
            children: 'Show details',
            as: Link,
            href:
              `/issuer/creators/${creator.id}` +
              (backRoute ? `?backRoute=${encodeURIComponent(backRoute)}` : ''),
          },
        ]
      }
      content={
        <>
          {emailAddress ? (
            <Tooltip content={emailAddress}>
              <CardWithBadgeForCred.ContentWithIcon
                iconName="Mail"
                className="whitespace-pre-wrap"
                onClick={emailAddressClickHandler}
              >
                {truncatedEmailAddress}
              </CardWithBadgeForCred.ContentWithIcon>
            </Tooltip>
          ) : null}
          {walletAddress ? (
            <Tooltip content={walletAddress}>
              <CardWithBadgeForCred.ContentWithIcon
                iconName="AccountBalanceWallet"
                className="whitespace-pre-wrap"
                onClick={walletAddressClickHandler}
              >
                {truncatedWalletAddress}
              </CardWithBadgeForCred.ContentWithIcon>
            </Tooltip>
          ) : null}
          {credentials.domain && (
            <CardWithBadgeForCred.ContentWithIcon
              iconName="Public"
              className="whitespace-pre-wrap"
            >
              {credentials.domain}
            </CardWithBadgeForCred.ContentWithIcon>
          )}
        </>
      }
      footer={renderFooter && renderFooter(creator)}
    />
  );
};
