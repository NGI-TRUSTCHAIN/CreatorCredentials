import { GetServerSideProps } from 'next';
import { useTranslation } from '@/shared/utils/useTranslation';
import { withAuth } from '@/components/modules/app';
import { ConnectionRequestDetails } from '@/components/modules/issuers/ConnectionRequestDetails';
import { PageHeader } from '@/components/shared/PageHeader';
import { NextPageWithLayout } from '@/shared/typings/NextPageWithLayout';
import { UserRole } from '@/shared/typings/UserRole';
import { getI18nProps } from '@/shared/utils/i18n';

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
