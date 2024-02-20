import { GetServerSideProps } from 'next';
import { ReactElement } from 'react';
import { joiResolver } from '@hookform/resolvers/joi';
import { useRouter } from 'next/router';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from '@/shared/utils/useTranslation';
import { IssuerSignupDetailsForm } from '@/components/modules/authorization/issuer/IssuerSignUpDetailsForm';
import { IssuerSignupDetailsFormSchema } from '@/components/modules/authorization/issuer/IssuerSignUpDetailsForm/IssuerSignupDetailsForm.schema';
import { IssuerSignupDetailsFormContextType } from '@/components/modules/authorization/issuer/IssuerSignUpDetailsForm/IssuerSignupDetailsForm.types';
import { useIssuerSignupContext } from '@/components/modules/authorization/issuer/IssuerSignupContext/IssuerSignupContext';
import { IssuerSignupFormStep } from '@/components/modules/authorization/issuer/IssuerSignupContext/IssuerSignupContext.types';
import { BaseAuthFormCard } from '@/components/modules/authorization/BaseAuthFormCard';
import { IssuerSignupContextProvider } from '@/components/modules/authorization/issuer/IssuerSignupContext/IssuerSignupContext';
import { NextPageWithLayout } from '@/shared/typings/NextPageWithLayout';
import { getI18nProps } from '@/shared/utils/i18n';
import { WelcomeHeader } from '@/components/modules/welcome/WelcomeHeader/WelcomeHeader';
import { BlankLayout } from '@/components/layouts/blankLayout/BlankLayout';

const FORM_STEP: IssuerSignupFormStep = 'details';

const IssuerSignupDetailsPage: NextPageWithLayout = () => {
  const { t } = useTranslation('issuer-signup');
  const router = useRouter();

  const { formSteps, updateStep } = useIssuerSignupContext();

  const form = useForm<IssuerSignupDetailsFormContextType>({
    resolver: joiResolver(IssuerSignupDetailsFormSchema),
    defaultValues: formSteps[FORM_STEP],
    mode: 'onBlur',
  });

  const { handleSubmit } = form;

  const signupDetailsFormSubmitHandler: SubmitHandler<
    IssuerSignupDetailsFormContextType
  > = (data) => {
    updateStep('details', data);
    router.push('/auth/signup/issuer/email');
  };

  return (
    <>
      <WelcomeHeader
        title={t('header.title')}
        subtitle={t('header.subtitle')}
      />

      <section className="flex flex-col gap-5">
        <BaseAuthFormCard
          title={t('card.title')}
          subtitle={t('steps.details.subtitle')}
        >
          <FormProvider {...form}>
            <IssuerSignupDetailsForm
              handleSubmit={handleSubmit(signupDetailsFormSubmitHandler)}
              className="px-[6.5rem]"
            />
          </FormProvider>
        </BaseAuthFormCard>
      </section>
    </>
  );
};

IssuerSignupDetailsPage.getLayout = (page: ReactElement) => {
  return (
    <IssuerSignupContextProvider>
      <BlankLayout>{page}</BlankLayout>
    </IssuerSignupContextProvider>
  );
};

export const getServerSideProps = (async (ctx) => {
  return {
    props: {
      ...(await getI18nProps(ctx.locale, ['issuer-signup'])),
    },
  };
}) satisfies GetServerSideProps;

export default IssuerSignupDetailsPage;
