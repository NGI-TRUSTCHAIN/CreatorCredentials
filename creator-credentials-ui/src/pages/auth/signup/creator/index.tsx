// import { joiResolver } from '@hookform/resolvers/joi';
// import { useState } from 'react';
// import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
// import { useSignupCreator } from '@/api/mutations/useSignupCreator';
// import { CreatorSignupFormContextType } from '@/components/modules/authorization/creator/CreatorSignupForm/CreatorSignupFormContextType';
// import { creatorSignupFormDefaultValues } from '@/components/modules/authorization/creator/CreatorSignupForm/creatorSignupFormDefaultValues';
// import { CreatorSignupFormSchema } from '@/components/modules/authorization/creator/CreatorSignupForm/creatorSignupFormSchema';
// import { useToast } from '@/shared/hooks/useToast';
// import { AuthVerificationCard } from '@/components/modules/authorization/AuthVerificationCard/AuthVerificationCard';
// import { CreatorSignupForm } from '@/components/modules/authorization/creator/CreatorSignupForm/CreatorSignupForm';
// import { UserRole } from '@/shared/typings/UserRole';
import { SignUp } from '@clerk/nextjs';
import { GetServerSideProps } from 'next';
import { ReactElement } from 'react';
import { useTranslation } from '@/shared/utils/useTranslation';
import { BaseAuthFormCard } from '@/components/modules/authorization/BaseAuthFormCard';
import { WelcomeHeader } from '@/components/modules/welcome/WelcomeHeader/WelcomeHeader';
import { NextPageWithLayout } from '@/shared/typings/NextPageWithLayout';
import { getI18nProps } from '@/shared/utils/i18n';
import { BlankLayout } from '@/components/layouts/blankLayout/BlankLayout';

const CreatorSignupPage: NextPageWithLayout = () => {
  const { t } = useTranslation('creator-signup');
  // const toast = useToast();
  // const [emailSent, setEmailSent] = useState(false);

  // const form = useForm<CreatorSignupFormContextType>({
  //   resolver: joiResolver(CreatorSignupFormSchema),
  //   defaultValues: creatorSignupFormDefaultValues,
  //   mode: 'onBlur',
  // });

  // const {
  //   mutateAsync,
  //   reset: resetSignupMutation,
  //   isLoading,
  // } = useSignupCreator();

  // const { handleSubmit } = form;

  // const signupSubmitHandler: SubmitHandler<
  //   CreatorSignupFormContextType
  // > = async (data) => {
  //   try {
  //     await mutateAsync(data);
  //     setEmailSent(true);
  //   } catch (error) {
  //     toast.error(t('error.send-email'));
  //   }
  // };

  // const resendVerificationEmailHandler = async () => {
  //   try {
  //     await mutateAsync(form.getValues());
  //   } catch (error) {
  //     toast.error(t('error.send-email'));
  //   }
  // };

  // const goBackHandler = () => {
  //   resetSignupMutation();
  //   setEmailSent(false);
  // };

  return (
    <>
      <WelcomeHeader
        title={t('title')}
        subtitle={t('subtitle')}
      />
      <BaseAuthFormCard
        title={t('title')}
        subtitle={t('card.description')}
      >
        <SignUp
          redirectUrl={'/creator'}
          signInUrl={'auth/login/creator'}
        />
      </BaseAuthFormCard>
      {/* <section className="flex flex-1 flex-col items-center">
        {emailSent ? (
          <AuthVerificationCard
            title={t('verification.title')}
            subtitle={t('verification.subtitle')}
            isLoading={isLoading}
            userRole={UserRole.Creator}
            resendVerificationEmailHandler={resendVerificationEmailHandler}
            goBackHandler={goBackHandler}
          />
        ) : (
          <BaseAuthFormCard
            title={t('title')}
            subtitle={t('card.description')}
          >
            <FormProvider {...form}>
              <div className="flex-1 px-[6.53rem]">
                <CreatorSignupForm
                  handleSubmit={handleSubmit(signupSubmitHandler)}
                  isLoading={isLoading}
                />
              </div>
            </FormProvider>
          </BaseAuthFormCard>
        )}
      </section> */}
    </>
  );
};

CreatorSignupPage.getLayout = (page: ReactElement) => {
  return <BlankLayout>{page}</BlankLayout>;
};

export const getServerSideProps = (async (ctx) => {
  return {
    props: {
      ...(await getI18nProps(ctx.locale, [
        'creator-signup',
        'terms-and-conditions',
      ])),
    },
  };
}) satisfies GetServerSideProps;

export default CreatorSignupPage;
