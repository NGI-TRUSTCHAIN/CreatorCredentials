import { GetServerSideProps } from 'next';
import { ReactElement } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from '@/shared/utils/useTranslation';
import { BlankLayout } from '@/components/layouts/blankLayout/BlankLayout';
import { NextPageWithLayout } from '@/shared/typings/NextPageWithLayout';
import { getI18nProps } from '@/shared/utils/i18n';
import {
  IssuerSignupContextProvider,
  useIssuerSignupContext,
} from '@/components/modules/authorization/issuer/IssuerSignupContext/IssuerSignupContext';
import { AuthVerificationCard } from '@/components/modules/authorization/AuthVerificationCard/AuthVerificationCard';
import { useToast } from '@/shared/hooks/useToast';
import { WelcomeHeader } from '@/components/modules/welcome/WelcomeHeader/WelcomeHeader';
import { UserRole } from '@/shared/typings/UserRole';

const IssuerSignupVerificationPage: NextPageWithLayout = () => {
  const { t } = useTranslation('issuer-signup');
  const router = useRouter();
  const toast = useToast();

  const { formSteps } = useIssuerSignupContext();

  const goBackHandler = () => {
    router.push('/auth/signup/issuer/email');
  };

  const resendVerificationEmailHandler = () => {
    try {
    } catch (err) {
      toast.error(t('errors.send-email'));
    }
  };

  const signUpEmail = formSteps.email.address;
  return (
    <>
      <WelcomeHeader
        title={t('header.title')}
        subtitle={t('header.subtitle')}
      />
      <AuthVerificationCard
        title={t('steps.verification.title')}
        subtitle={t('steps.verification.subtitle')}
        userRole={UserRole.Issuer}
        goBackHandler={goBackHandler}
        resendVerificationEmailHandler={resendVerificationEmailHandler}
        isLoading={false}
        signUpEmail={signUpEmail}
      />
    </>
  );
};

IssuerSignupVerificationPage.getLayout = (page: ReactElement) => {
  return (
    <IssuerSignupContextProvider>
      <BlankLayout>{page}</BlankLayout>
    </IssuerSignupContextProvider>
  );
};

export const getServerSideProps = (async (ctx) => {
  // TODO: After removing MSW, replace the condition below with code below - it will prevent users from accessing this page directly or by refreshing the page.
  // if (!ctx.req.headers.referer?.includes('/auth/signup/issuer/email')) {
  // eslint-disable-next-line
  // console.log(
  //   'getServerSideProps IssuerSignupVerificationPage: ',
  //   ctx.req.headers,
  // );

  // if (!ctx.req.headers.referer) {
  //   return {
  //     redirect: {
  //       destination: '/auth/signup/issuer',
  //       permanent: false,
  //     },
  //   };
  // }

  return {
    props: {
      ...(await getI18nProps(ctx.locale, ['signup', 'issuer-signup'])),
    },
  };
}) satisfies GetServerSideProps;

export default IssuerSignupVerificationPage;
