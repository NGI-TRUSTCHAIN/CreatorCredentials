import { GetServerSideProps } from 'next';
import { UserProfile } from '@clerk/nextjs';
import { useTranslation } from '@/shared/utils/useTranslation';
import { NextPageWithLayout } from '@/shared/typings/NextPageWithLayout';
import { getI18nProps } from '@/shared/utils/i18n';
import { withAuth } from '@/components/modules/app';
import { UserRole } from '@/shared/typings/UserRole';
import { PageHeader } from '@/components/shared/PageHeader';
import { CreatorPersonalData } from '@/components/modules/profile/creator/CreatorPersonalData';
import { CreatorLegalDocuments } from '@/components/modules/profile/creator/CreatorLegalDocuments';
import { CreatorPrivacySettings } from '@/components/modules/profile/creator/CreatorPrivacySettings';

const CreatorProfilePage: NextPageWithLayout = () => {
  const { t } = useTranslation('creator-profile');

  return (
    <>
      <PageHeader title={t('header.title')} />
      <section className="flex flex-col gap-10">
        <CreatorPersonalData email="kamil@liccium.com" />
        <UserProfile />
        <CreatorLegalDocuments />
        <CreatorPrivacySettings />
      </section>
    </>
  );
};

export const getServerSideProps = withAuth(
  async (ctx) => {
    return {
      props: {
        ...(await getI18nProps(ctx.locale, [
          'creator-profile',
          'terms-and-conditions',
        ])),
      },
    };
  },
  {
    roles: [UserRole.Creator],
  },
) satisfies GetServerSideProps;

export default CreatorProfilePage;
