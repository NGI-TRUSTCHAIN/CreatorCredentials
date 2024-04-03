import { GetServerSideProps } from 'next';
import { useTranslation } from '@/shared/utils/useTranslation';
import { withAuth } from '@/components/modules/app';
import { PageHeader } from '@/components/shared/PageHeader';
import { NextPageWithLayout } from '@/shared/typings/NextPageWithLayout';
import { UserRole } from '@/shared/typings/UserRole';
import { getI18nProps } from '@/shared/utils/i18n';
import { IssuerIssuedCredentials } from '@/components/modules/creators/IssuerIssuedCredentials';

const IssuerIssuedCredentialsPage: NextPageWithLayout = () => {
  const { t } = useTranslation('issuer-credentials');

  return (
    <>
      <PageHeader
        title={t('issued.header.title')}
        subtitle={t('issued.header.description')}
      />
      <IssuerIssuedCredentials />
    </>
  );
};

export const getServerSideProps = withAuth(
  async (ctx) => {
    return {
      props: {
        ...(await getI18nProps(ctx.locale, ['issuer-credentials', 'cards'])),
      },
    };
  },
  {
    roles: [UserRole.Issuer],
  },
) satisfies GetServerSideProps;

export default IssuerIssuedCredentialsPage;
