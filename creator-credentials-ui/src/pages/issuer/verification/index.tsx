import { GetServerSideProps } from 'next';
import { useTranslation } from '@/shared/utils/useTranslation';
import { NextPageWithLayout } from '@/shared/typings/NextPageWithLayout';
import { getI18nProps } from '@/shared/utils/i18n';
import { withAuth } from '@/components/modules/app';
import { UserRole } from '@/shared/typings/UserRole';
import { PageHeader } from '@/components/shared/PageHeader';
import { IssuerVerificationCards } from '@/components/modules/verification/IssuerVerificationCards';

const IssuerVerificationPage: NextPageWithLayout = () => {
  const { t } = useTranslation('issuer-verification');

  return (
    <>
      <PageHeader
        title={t('header.title')}
        subtitle={t('header.subtitle')}
      />
      <IssuerVerificationCards />
    </>
  );
};

export const getServerSideProps = withAuth(
  async (ctx) => {
    return {
      props: {
        ...(await getI18nProps(ctx.locale, [
          'verification-cards',
          'issuer-verification',
        ])),
      },
    };
  },
  {
    roles: [UserRole.Issuer],
  },
) satisfies GetServerSideProps;

export default IssuerVerificationPage;
