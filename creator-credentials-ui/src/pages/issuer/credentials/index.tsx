import { GetServerSideProps } from 'next';
import { useTranslation } from '@/shared/utils/useTranslation';
import { NextPageWithLayout } from '@/shared/typings/NextPageWithLayout';
import { getI18nProps } from '@/shared/utils/i18n';
import { withAuth } from '@/components/modules/app';
import { UserRole } from '@/shared/typings/UserRole';
import { PageHeader } from '@/components/shared/PageHeader';
import { IssuerCredentialsList } from '@/components/modules/credentials/IssuerCredentialsList';

const IssuerCredentialsPage: NextPageWithLayout = () => {
  const { t } = useTranslation('issuer-credentials');

  return (
    <>
      <PageHeader
        title={t('header.title')}
        subtitle={t('header.description')}
      />
      <section>
        <IssuerCredentialsList />
      </section>
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

export default IssuerCredentialsPage;
