import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useTranslation } from '@/shared/utils/useTranslation';
import { withAuth } from '@/components/modules/app';
import { CreatorCredentialsRequestDetails } from '@/components/modules/creators/CreatorCredentialsRequestDetails';
import { PageHeader } from '@/components/shared/PageHeader';
import { NextPageWithLayout } from '@/shared/typings/NextPageWithLayout';
import { UserRole } from '@/shared/typings/UserRole';
import { getI18nProps } from '@/shared/utils/i18n';

const IssuerCreatorDetailsPage: NextPageWithLayout = ({ backRoute }) => {
  const { t } = useTranslation('issuer-creator-request-details');

  const {
    query: { id },
  } = useRouter();

  return (
    <>
      <PageHeader
        title={t('header.title')}
        closeButtonHref={backRoute || '/issuer/creators/requested'}
      />
      <CreatorCredentialsRequestDetails creatorId={id as string} />
    </>
  );
};

export const getServerSideProps = withAuth(
  async (ctx) => {
    const backRoute = ctx.query?.backRoute;

    return {
      props: {
        backRoute: backRoute ? decodeURIComponent(backRoute as string) : null,
        ...(await getI18nProps(ctx.locale, [
          'issuer-creator-request-details',
          'cards',
        ])),
      },
    };
  },
  {
    roles: [UserRole.Issuer],
  },
) satisfies GetServerSideProps;

export default IssuerCreatorDetailsPage;
