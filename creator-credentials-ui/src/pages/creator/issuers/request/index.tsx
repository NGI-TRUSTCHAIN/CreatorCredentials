import { GetServerSideProps } from 'next';
import { getAuth } from '@clerk/nextjs/server';
import { useTranslation } from '@/shared/utils/useTranslation';
import { withAuth } from '@/components/modules/app';
import { ConnectionRequestDetails } from '@/components/modules/issuers/ConnectionRequestDetails';
import { PageHeader } from '@/components/shared/PageHeader';
import { NextPageWithLayout } from '@/shared/typings/NextPageWithLayout';
import { UserRole } from '@/shared/typings/UserRole';
import { getI18nProps } from '@/shared/utils/i18n';
import { getHeaders } from '@/shared/utils/tokenHeader';
import axiosSSRNest from '@/api/axiosSSRNest';
import { IssuerConnectionStatus } from '@/shared/typings/IssuerConnectionStatus';
import { Issuer } from '@/shared/typings/Issuer';

type CreatorIssuersRequestPageProps = {
  issuerId: string;
};

const CreatorIssuersRequestPage: NextPageWithLayout<
  CreatorIssuersRequestPageProps
> = ({ issuerId }) => {
  const { t } = useTranslation('creator-issuers-request');

  return (
    <>
      <PageHeader
        title={t('header.title')}
        closeButtonHref="/creator/issuers"
      />
      <section>
        <ConnectionRequestDetails issuerId={issuerId} />
      </section>
    </>
  );
};

export const getServerSideProps = withAuth(
  async (ctx) => {
    const issuerId = ctx.query.issuerId;

    if (!issuerId) {
      return {
        redirect: {
          destination: '/creator',
          permanent: false,
        },
      };
    }

    const auth = getAuth(ctx.req);
    const token = await auth.getToken();
    if (!token) {
      return {
        redirect: {
          destination: '/welcome',
          permanent: false,
        },
      };
    }
    const { data }: { data: { issuer: Issuer } } = await axiosSSRNest.get(
      `v1/users/issuers/${issuerId}`,
      {
        ...getHeaders(token),
      },
    );

    if (data.issuer.status !== IssuerConnectionStatus.NotStarted) {
      return {
        redirect: {
          destination: '/creator/issuers',
          permanent: false,
        },
      };
    }

    return {
      props: {
        ...(await getI18nProps(ctx.locale, [
          'creator-issuers-request',
          'credentials-request-success-card',
          'cards',
        ])),
        issuerId,
      },
    };
  },
  {
    roles: [UserRole.Creator],
  },
) satisfies GetServerSideProps;

export default CreatorIssuersRequestPage;
