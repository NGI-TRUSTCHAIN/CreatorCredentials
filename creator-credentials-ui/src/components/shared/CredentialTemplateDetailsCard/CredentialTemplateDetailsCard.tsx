import React, { ElementType } from 'react';
import { DropdownItemProps } from 'flowbite-react';
import { useTranslation } from '@/shared/utils/useTranslation';
// import { CredentialType } from '@/shared/typings/CredentialType';
// import { VerifiedCredentialsUnion } from '@/shared/typings/Credentials';
// import {
//   truncateWalletAddress,
//   truncateEmailAddress,
// } from '@/shared/utils/truncateWalletAddress';
// import { useCopyToClipboard } from '@/shared/hooks/useCopyToClipboard';
import { CredentialTemplateType } from '@/shared/typings/CredentialTemplateType';
import { VerifiedCredentialsTemplate } from '@/shared/typings/Templates';
import { CardWithBadge } from '../CardWithBadge';
import { IconName } from '../Icon';

const CREDENTIAL_TEMPLATE_TYPE_TO_ICON_NAME_MAP: Record<
  CredentialTemplateType,
  IconName
> = {
  [CredentialTemplateType.Member]: 'Groups',
  [CredentialTemplateType.Student]: 'Groups',
};

type CredentialTemplateDetailsCardProps = {
  template: Omit<VerifiedCredentialsTemplate, 'id'>;
  renderFooter?:
    | ((credential: Omit<VerifiedCredentialsTemplate, 'id'>) => React.ReactNode)
    | null;
  dropdownItems?: DropdownItemProps<ElementType>[];
};

export const CredentialTemplateDetailsCard = ({
  template,
  renderFooter,
  dropdownItems,
}: CredentialTemplateDetailsCardProps) => {
  const { t } = useTranslation('cards');
  const { templateType } = template;
  // const { copy } = useCopyToClipboard();

  const name =
    templateType === CredentialTemplateType.Member ||
    templateType === CredentialTemplateType.Student
      ? template.name
      : undefined;

  // const nameClickHandler = () => {
  //   if (name) {
  //     copy(name);
  //   }
  // };

  return (
    <CardWithBadge
      badgeType="template"
      image={{
        iconName: CREDENTIAL_TEMPLATE_TYPE_TO_ICON_NAME_MAP[templateType],
      }}
      title={t(`credential.types.${templateType.toLowerCase()}.title`)}
      dropdownItems={dropdownItems}
      content={
        <>
          <p className="mb-2 text-base">
            {t(`credential.types.${templateType.toLowerCase()}.description`)}
          </p>
          {/* {type === CredentialType.Email && 'address' in data && address ? (
            <Tooltip content={address}>
              <CardWithBadge.ContentWithIcon
                iconName="Public"
                className="whitespace-pre-wrap"
                onClick={nameClickHandler}
              >
                {truncateEmailAddress(data.address)}
              </CardWithBadge.ContentWithIcon>
            </Tooltip>
          ) : null}
          {type === CredentialType.Wallet && 'address' in data && address ? (
            <Tooltip content={address}>
              <CardWithBadge.ContentWithIcon
                iconName="AccountBalanceWallet"
                className="whitespace-pre-wrap"
                onClick={addressClickHandler}
              >
                {truncateWalletAddress(data.address)}
              </CardWithBadge.ContentWithIcon>
            </Tooltip>
          ) : null}
          {type === CredentialType.Domain && 'domain' in data && (
            <CardWithBadge.ContentWithIcon
              iconName="AccountBalanceWallet"
              className="whitespace-pre-wrap"
            >
              {data.domain}
            </CardWithBadge.ContentWithIcon>
          )}
          {'companyName' in data && data.companyName && (
            <CardWithBadge.ContentWithIcon
              iconName="AssuredWorkload"
              className="whitespace-pre-wrap"
            >
              {data.companyName}
            </CardWithBadge.ContentWithIcon>
          )} */}
          {'name' in template && (
            <CardWithBadge.ContentWithIcon
              iconName="AssuredWorkload"
              className="whitespace-pre-wrap"
            >
              {name}
            </CardWithBadge.ContentWithIcon>
          )}
          {/* {'requirements' in data && (
            <CardWithBadge.ContentWithIcon
              iconName="Caption"
              className="whitespace-pre-wrap"
            >
              {data.requirements}
            </CardWithBadge.ContentWithIcon>
          )} */}
        </>
      }
      footer={renderFooter && renderFooter(template)}
    ></CardWithBadge>
  );
};
