import { Spinner, Tabs, TabsComponent } from 'flowbite-react';
import { GetServerSideProps } from 'next';
import { useMemo } from 'react';
import { useTranslation } from '@/shared/utils/useTranslation';
import { useCreatorIssuers } from '@/api/queries/useCreatorIssuers';
import { withAuth } from '@/components/modules/app';
import { IssuersList } from '@/components/modules/issuers/IssuersList';
import { PageHeader } from '@/components/shared/PageHeader';
import { IssuerConnectionStatus } from '@/shared/typings/IssuerConnectionStatus';
import { NextPageWithLayout } from '@/shared/typings/NextPageWithLayout';
import { UserRole } from '@/shared/typings/UserRole';
import { getI18nProps } from '@/shared/utils/i18n';
import { Issuer } from '@/shared/typings/Issuer';
import { AvailableIssuers } from '@/components/modules/issuers/AvailableIssuers';

const issuersStatusFilter =
  (status: IssuerConnectionStatus) => (issuer: Issuer) =>
    issuer.status === status;

// const CREATOR_CREDENTIALS_DEFAULT_ISSUER = {
//   id: '-1',
//   name: 'Creator Credentials B.V.',
//   description: 'Based in the Netherlands',
//   imageUrl: '/images/brand.svg',
//   data: {
//     domain: 'creatorcredentials.com',
//     requirements: 'Info about requirements',
//   },
//   fees: false,
//   status: IssuerConnectionStatus.Connected,
//   vcs: [],
// };

const CreatorIssuersPage: NextPageWithLayout = () => {
  const { t } = useTranslation('creator-issuers');

  const { data: issuers, isFetching } = useCreatorIssuers({
    refetchInterval: 60000,
  });

  const { connected, pending, available } = useMemo(() => {
    const connected =
      issuers?.filter(issuersStatusFilter(IssuerConnectionStatus.Connected)) ||
      [];

    const pending =
      issuers?.filter(issuersStatusFilter(IssuerConnectionStatus.Pending)) ||
      [];

    const available =
      issuers?.filter(issuersStatusFilter(IssuerConnectionStatus.NotStarted)) ||
      [];

    return {
      connected,
      pending,
      available,
    };
  }, [issuers]);

  return (
    <>
      <PageHeader
        title={t('header.title')}
        subtitle={t('header.description')}
      />
      {isFetching ? (
        <Spinner
          size="xl"
          className="absolute inset-0 m-auto"
        />
      ) : (
        <TabsComponent style="underline">
          {connected.length && (
            <Tabs.Item
              active
              title={t('tabs.connected')}
            >
              <IssuersList issuers={connected} />
            </Tabs.Item>
          )}
          {pending.length && (
            <Tabs.Item title={t('tabs.pending')}>
              <IssuersList issuers={pending} />
            </Tabs.Item>
          )}
          {available.length && (
            <Tabs.Item title={t('tabs.available')}>
              <AvailableIssuers issuers={available} />
            </Tabs.Item>
          )}
        </TabsComponent>
      )}
    </>
  );
};

export const getServerSideProps = withAuth(
  async (ctx) => {
    return {
      props: {
        ...(await getI18nProps(ctx.locale, ['creator-issuers', 'cards'])),
      },
    };
  },
  {
    roles: [UserRole.Creator],
  },
) satisfies GetServerSideProps;

export default CreatorIssuersPage;
