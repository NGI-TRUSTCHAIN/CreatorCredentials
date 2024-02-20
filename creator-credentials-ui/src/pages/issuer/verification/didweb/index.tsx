import { GetServerSideProps } from 'next';
import { useTranslation } from '@/shared/utils/useTranslation';
import { withAuth } from '@/components/modules/app';
import { PageHeader } from '@/components/shared/PageHeader';
import { NextPageWithLayout } from '@/shared/typings/NextPageWithLayout';
import { UserRole } from '@/shared/typings/UserRole';
import { getI18nProps } from '@/shared/utils/i18n';
import { DidWebVerificationFormWrapper } from '@/components/modules/verification/did-web/DidWebVerificationFormWrapper/DidWebVerificationFormWrapper';
import { DidWebVerificationContextProvider } from '@/components/modules/verification/did-web/DidWebVerificationContext';

const IssuerDidWebVerificationPage: NextPageWithLayout = () => {
  const { t } = useTranslation('didweb-verification');

  return (
    <>
      <PageHeader
        title={t('header.title')}
        subtitle={t('header.description')}
        closeButtonHref="/issuer/verification"
      />
      <DidWebVerificationContextProvider userRole={UserRole.Issuer}>
        <DidWebVerificationFormWrapper />
      </DidWebVerificationContextProvider>
    </>
  );
};

export const getServerSideProps = withAuth(
  async (ctx) => {
    return {
      props: {
        ...(await getI18nProps(ctx.locale, ['didweb-verification'])),
      },
    };
  },
  {
    roles: [UserRole.Issuer],
  },
) satisfies GetServerSideProps;

export default IssuerDidWebVerificationPage;
