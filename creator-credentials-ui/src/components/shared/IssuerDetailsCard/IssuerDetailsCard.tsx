import { Button } from 'flowbite-react';
import Link from 'next/link';
import React, { ElementType, useCallback } from 'react';
import { useTranslation } from '@/shared/utils/useTranslation';
import { IssuerConnectionStatus } from '@/shared/typings/IssuerConnectionStatus';
import { Issuer } from '@/shared/typings/Issuer';
import { CardWithBadge } from '../CardWithBadge';
import { ColoredBadge } from '../ColoredBadge';

type IssuerDetailsCardProps = {
  issuer: Issuer;
  renderFooter?: ((issuer: Issuer) => React.ReactNode) | null;
};

export const IssuerDetailsCard = ({
  issuer,
  renderFooter,
}: IssuerDetailsCardProps) => {
  const { t } = useTranslation('cards');
  const { name, description, data, fees, status, imageUrl } = issuer;

  const defaultRenderFooter = useCallback(() => {
    switch (status) {
      case IssuerConnectionStatus.Connected:
        return (
          <>
            {issuer.id === '-1' ? null : (
              <Button
                color="primary"
                fullSized
                href={`/creator/credentials/new?issuerId=${issuer.id}`}
                as={Link as ElementType}
              >
                {t('issuer.request-button')}
              </Button>
            )}
            <ColoredBadge
              badgeType="connected"
              className="self-center"
            />
          </>
        );
      case IssuerConnectionStatus.Pending:
        return (
          <ColoredBadge
            badgeType="pending"
            className="self-center"
          />
        );
      default:
        return (
          <Button
            color="primary"
            fullSized
            href={`/creator/issuers/request?issuerId=${issuer.id}`}
            as={Link as ElementType}
          >
            {t('connect', { ns: 'common' })}
          </Button>
        );
    }
  }, [issuer.id, status, t]);

  return (
    <CardWithBadge
      badgeType="issuer"
      additionalBadgeType={issuer.id === '-1' ? 'verification' : undefined}
      image={{
        imageUrl,
        alt: 'Issuer logo',
      }}
      title={name}
      content={
        <>
          {description && <p className="mb-2 text-base">{description}</p>}
          {data.domain && (
            <CardWithBadge.ContentWithIcon
              iconName="Public"
              className="whitespace-pre-wrap"
            >
              {data.domain}
            </CardWithBadge.ContentWithIcon>
          )}
          {data.requirements && (
            <CardWithBadge.ContentWithIcon
              iconName="Caption"
              className="whitespace-pre-wrap"
            >
              {data.requirements}
            </CardWithBadge.ContentWithIcon>
          )}
          {fees && (
            <CardWithBadge.ContentWithIcon
              iconName="Payments"
              className="whitespace-pre-wrap"
            >
              {t('issuer.fees')}
            </CardWithBadge.ContentWithIcon>
          )}
        </>
      }
      footer={
        renderFooter
          ? renderFooter(issuer)
          : typeof renderFooter !== 'object' && defaultRenderFooter()
      }
    ></CardWithBadge>
  );
};
