// import { joiResolver } from '@hookform/resolvers/joi';
// import { useState } from 'react';
// import { SubmitHandler, useForm } from 'react-hook-form';
// import { FormProvider } from 'react-hook-form';
// import { useLogIn } from '@/api/mutations/useLogIn';
// import { LoginForm } from '@/components/modules/authorization/LoginForm';
// import { loginFormDefaultValues } from '@/components/modules/authorization/LoginForm/LoginForm.constants';
// import { LoginFormSchema } from '@/components/modules/authorization/LoginForm/LoginForm.schema';
// import { LoginFormContextType } from '@/components/modules/authorization/LoginForm/LoginForm.types';
// import { useToast } from '@/shared/hooks/useToast';
// import { AuthVerificationCard } from '../AuthVerificationCard/AuthVerificationCard';
import { SignIn } from '@clerk/nextjs';
import { useTranslation } from '@/shared/utils/useTranslation';
import { BaseAuthFormCard } from '@/components/modules/authorization/BaseAuthFormCard';
import { UserRole } from '@/shared/typings/UserRole';
import { WelcomeHeader } from '../../welcome/WelcomeHeader/WelcomeHeader';

type LoginPageContainerProps = {
  userRole: UserRole;
};

export const LoginPageContainer = ({ userRole }: LoginPageContainerProps) => {
  const { t } = useTranslation('login');
  // const toast = useToast();
  // const [emailSent, setEmailSent] = useState(false);

  // const form = useForm<LoginFormContextType>({
  //   resolver: joiResolver(LoginFormSchema),
  //   defaultValues: loginFormDefaultValues,
  //   mode: 'onBlur',
  // });

  // const { mutateAsync, reset: resetSignupMutation, isLoading } = useLogIn();

  // const { handleSubmit } = form;

  // const signupSubmitHandler: SubmitHandler<LoginFormContextType> = async (
  //   data,
  // ) => {
  //   try {
  //     await mutateAsync({ ...data, userRole });
  //     setEmailSent(true);
  //   } catch (error) {
  //     toast.error(t('error.send-email'));
  //   }
  // };

  // const resendVerificationEmailHandler = async () => {
  //   try {
  //     await mutateAsync({ ...form.getValues(), userRole });
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
        title={t('header.title')}
        subtitle={t('header.subtitle')}
      />
      <BaseAuthFormCard
        title={t(`card.titles.${userRole.toLowerCase()}`)}
        subtitle={t('card.description')}
      >
        <SignIn
          redirectUrl={userRole === UserRole.Creator ? 'creator' : 'issuer'}
          signUpUrl={`auth/signup/${
            userRole === UserRole.Creator ? 'creator' : 'issuer'
          }`}
        />
      </BaseAuthFormCard>

      {/* {emailSent ? (
        <AuthVerificationCard
          title={t('verification.title')}
          subtitle={t('verification.description')}
          isLoading={isLoading}
          userRole={userRole}
          resendVerificationEmailHandler={resendVerificationEmailHandler}
          goBackHandler={goBackHandler}
        />
      ) : (
        <BaseAuthFormCard
          title={t(`card.titles.${userRole.toLowerCase()}`)}
          subtitle={t('card.description')}
        >
          <FormProvider {...form}>
            <div className="flex-1 px-[6.75rem]">
              <LoginForm
                handleSubmit={handleSubmit(signupSubmitHandler)}
                isLoading={isLoading}
              />
            </div>
          </FormProvider>
        </BaseAuthFormCard>
      )} */}
    </>
  );
};
