import { GetServerSideProps } from 'next';
import { useTranslation } from '@/shared/utils/useTranslation';
import { withAuth } from '@/components/modules/app';
import { DomainVerificationContextProvider } from '@/components/modules/verification/domain/DomainVerificationContext';
import { DomainVerificationFormWrapper } from '@/components/modules/verification/domain/DomainVerificationFormWrapper';
import { PageHeader } from '@/components/shared/PageHeader';
import { NextPageWithLayout } from '@/shared/typings/NextPageWithLayout';
import { UserRole } from '@/shared/typings/UserRole';
import { getI18nProps } from '@/shared/utils/i18n';

const CreatorDomainVerificationPage: NextPageWithLayout = () => {
  const { t } = useTranslation('domain-verification');

  return (
    <>
      <PageHeader
        title={t('header.title')}
        subtitle={t('header.description')}
        closeButtonHref="/creator/verification"
      />
      <DomainVerificationContextProvider userRole={UserRole.Creator}>
        <DomainVerificationFormWrapper />
      </DomainVerificationContextProvider>
    </>
  );
};

export const getServerSideProps = withAuth(
  async (ctx) => {
    return {
      props: {
        ...(await getI18nProps(ctx.locale, ['domain-verification'])),
      },
    };
  },
  {
    roles: [UserRole.Creator],
  },
) satisfies GetServerSideProps;

export default CreatorDomainVerificationPage;
