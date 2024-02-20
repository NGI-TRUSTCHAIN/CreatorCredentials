import { GetServerSideProps } from 'next';
import { ReactElement } from 'react';
import { BlankLayout } from '@/components/layouts/blankLayout/BlankLayout';
import { LoginPageContainer } from '@/components/modules/authorization/LoginPageContainer';
import { NextPageWithLayout } from '@/shared/typings/NextPageWithLayout';
import { getI18nProps } from '@/shared/utils/i18n';
import { UserRole } from '@/shared/typings/UserRole';

const IssuerLoginPage: NextPageWithLayout = () => (
  <LoginPageContainer userRole={UserRole.Issuer} />
);

IssuerLoginPage.getLayout = (page: ReactElement) => {
  return <BlankLayout>{page}</BlankLayout>;
};

export const getServerSideProps = (async (ctx) => {
  return {
    props: {
      ...(await getI18nProps(ctx.locale, ['login'])),
    },
  };
}) satisfies GetServerSideProps;

export default IssuerLoginPage;
