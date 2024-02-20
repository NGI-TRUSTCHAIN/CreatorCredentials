import { GetServerSideProps } from 'next';
import { useTranslation } from '@/shared/utils/useTranslation';
import { NextPageWithLayout } from '@/shared/typings/NextPageWithLayout';
import { getI18nProps } from '@/shared/utils/i18n';
import { withAuth } from '@/components/modules/app';
import { UserRole } from '@/shared/typings/UserRole';
import { PageHeader } from '@/components/shared/PageHeader';
import { IssuerProfileFormWrapper } from '@/components/modules/profile/issuer/IssuerProfileFormWrapper';

const IssuerProfilePage: NextPageWithLayout = () => {
  const { t } = useTranslation('issuer-profile');

  return (
    <>
      <PageHeader
        title={t('header.title')}
        subtitle={t('header.description')}
      />
      <section className="flex flex-col gap-10">
        <IssuerProfileFormWrapper />
      </section>
    </>
  );
};

export const getServerSideProps = withAuth(
  async (ctx) => {
    return {
      props: {
        ...(await getI18nProps(ctx.locale, [
          'issuer-profile',
          'terms-and-conditions',
        ])),
      },
    };
  },
  {
    roles: [UserRole.Issuer],
  },
) satisfies GetServerSideProps;

export default IssuerProfilePage;
