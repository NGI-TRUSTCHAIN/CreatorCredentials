import { GetServerSideProps } from 'next';
import { useTranslation } from '@/shared/utils/useTranslation';
import { withAuth } from '@/components/modules/app';
import { PageHeader } from '@/components/shared/PageHeader';
import { NextPageWithLayout } from '@/shared/typings/NextPageWithLayout';
import { UserRole } from '@/shared/typings/UserRole';
import { getI18nProps } from '@/shared/utils/i18n';
import { CreatorVerificationCards } from '@/components/modules/verification/CreatorVerificationCards';

const CreatorVerificationPage: NextPageWithLayout = () => {
  const { t } = useTranslation('creator-verification');

  return (
    <>
      <PageHeader
        title={t('header.title')}
        subtitle={t('header.subtitle')}
      />
      <CreatorVerificationCards />
    </>
  );
};

export const getServerSideProps = withAuth(
  async (ctx) => {
    return {
      props: {
        ...(await getI18nProps(ctx.locale, [
          'verification-cards',
          'creator-verification',
          'metamask',
        ])),
      },
    };
  },
  {
    roles: [UserRole.Creator],
  },
) satisfies GetServerSideProps;

export default CreatorVerificationPage;
