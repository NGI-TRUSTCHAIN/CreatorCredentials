import React, { ElementType } from 'react';
import { DropdownItemProps } from 'flowbite-react';
import { useTranslation } from '@/shared/utils/useTranslation';
import { CredentialType } from '@/shared/typings/CredentialType';
import { VerifiedCredentialsUnion } from '@/shared/typings/Credentials';
import { truncateWalletAddress } from '@/shared/utils/truncateWalletAddress';
import { CardWithBadge } from '../CardWithBadge';
import { IconName } from '../Icon';

const CREDENTIAL_TYPE_TO_ICON_NAME_MAP: Record<CredentialType, IconName> = {
  [CredentialType.Email]: 'Mail',
  [CredentialType.Wallet]: 'AccountBalanceWallet',
  [CredentialType.Member]: 'Groups',
  [CredentialType.Domain]: 'Public',
  [CredentialType.DidWeb]: 'Web',
};

type CredentialDetailsCardProps = {
  credential: Omit<VerifiedCredentialsUnion, 'id'>;
  renderFooter?:
    | ((credential: Omit<VerifiedCredentialsUnion, 'id'>) => React.ReactNode)
    | null;
  dropdownItems?: DropdownItemProps<ElementType>[];
};

export const CredentialDetailsCard = ({
  credential,
  renderFooter,
  dropdownItems,
}: CredentialDetailsCardProps) => {
  const { t } = useTranslation('cards');
  const { data, type } = credential;

  return (
    <CardWithBadge
      badgeType="credential"
      image={{
        iconName: CREDENTIAL_TYPE_TO_ICON_NAME_MAP[type],
      }}
      title={t(`credential.types.${type.toLowerCase()}.title`)}
      dropdownItems={dropdownItems}
      content={
        <>
          <p className="mb-2 text-base">
            {t(`credential.types.${type.toLowerCase()}.description`)}
          </p>
          {type === CredentialType.Email && 'address' in data && (
            <CardWithBadge.ContentWithIcon
              iconName="Public"
              className="whitespace-pre-wrap"
            >
              {data.address}
            </CardWithBadge.ContentWithIcon>
          )}
          {type === CredentialType.Wallet && 'address' in data && (
            <CardWithBadge.ContentWithIcon
              iconName="AccountBalanceWallet"
              className="whitespace-pre-wrap"
            >
              {truncateWalletAddress(data.address)}
            </CardWithBadge.ContentWithIcon>
          )}
          {'companyName' in data && data.companyName && (
            <CardWithBadge.ContentWithIcon
              iconName="AssuredWorkload"
              className="whitespace-pre-wrap"
            >
              {data.companyName}
            </CardWithBadge.ContentWithIcon>
          )}
          {'validity' in data && (
            <CardWithBadge.ContentWithIcon
              iconName="CalendarMonth"
              className="whitespace-pre-wrap"
            >
              {data.validity}
            </CardWithBadge.ContentWithIcon>
          )}
          {'requirements' in data && (
            <CardWithBadge.ContentWithIcon
              iconName="Caption"
              className="whitespace-pre-wrap"
            >
              {data.requirements}
            </CardWithBadge.ContentWithIcon>
          )}
        </>
      }
      footer={renderFooter && renderFooter(credential)}
    ></CardWithBadge>
  );
};
