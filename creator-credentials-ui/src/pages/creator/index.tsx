import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next';
import { useTranslation } from '@/shared/utils/useTranslation';
import { withAuth } from '@/components/modules/app';
import { NextPageWithLayout } from '@/shared/typings/NextPageWithLayout';
import { getI18nProps } from '@/shared/utils/i18n';
import { SelectIssuerCard } from '@/components/modules/home/creator/SelectIssuerCard';
import { AddNewCredentialCard } from '@/components/modules/home/creator/AddNewCredentialCard';
import { VerifyWalletCard } from '@/components/modules/home/creator/VerifyWalletCard';
import { UserRole } from '@/shared/typings/UserRole';
import { PageHeader } from '@/components/shared/PageHeader';
import { CreatorWelcomeCard } from '@/components/modules/home/creator/CreatorWelcomeCard';

const CreatorHomePage: NextPageWithLayout<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = () => {
  const { t } = useTranslation('home-creator');

  return (
    <>
      <PageHeader title={t('header.title')} />
      <section className="flex flex-col gap-4">
        <CreatorWelcomeCard />
        <SelectIssuerCard />
        <div className="flex gap-4">
          <AddNewCredentialCard className="flex-1 self-start" />
          <VerifyWalletCard className="flex-1 self-start" />
        </div>
      </section>
    </>
  );
};

export const getServerSideProps = withAuth(
  async (ctx: GetServerSidePropsContext) => {
    return {
      props: {
        ...(await getI18nProps(ctx.locale, ['home-creator'])),
      },
    };
  },
  {
    roles: UserRole.Creator,
  },
) satisfies GetServerSideProps;

export default CreatorHomePage;
