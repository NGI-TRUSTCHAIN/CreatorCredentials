import { GetServerSideProps } from 'next';
import { useTranslation } from '@/shared/utils/useTranslation';
import { withAuth } from '@/components/modules/app';
import { PageHeader } from '@/components/shared/PageHeader';
import { NextPageWithLayout } from '@/shared/typings/NextPageWithLayout';
import { UserRole } from '@/shared/typings/UserRole';
import { getI18nProps } from '@/shared/utils/i18n';
import { IssuerRequestedCredentials } from '@/components/modules/creators/IssuerRequestedCredentials';

const IssuerRequestedCreatorsPage: NextPageWithLayout = () => {
  const { t } = useTranslation('issuer-credentials');

  return (
    <>
      <PageHeader
        title={t('requested.header.title')}
        subtitle={t('requested.header.description')}
      />
      <IssuerRequestedCredentials />
    </>
  );
};

export const getServerSideProps = withAuth(
  async (ctx) => {
    return {
      props: {
        ...(await getI18nProps(ctx.locale, ['issuer-credentials'])),
      },
    };
  },
  {
    roles: [UserRole.Issuer],
  },
) satisfies GetServerSideProps;

export default IssuerRequestedCreatorsPage;
