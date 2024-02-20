import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { useTranslation } from '@/shared/utils/useTranslation';
import { useIssuerProfile } from '@/api/queries/useIssuerProfile';
import { ApiErrorMessage } from '@/components/shared/ApiErrorMessage';
import { Loader } from '@/components/shared/Loader';
import { IssuerProfileFormContextType } from '../IssuerProfileForm/IssuerProfileFormContextType';
import { IssuerProfileFormSchema } from '../IssuerProfileForm/IssuerProfileFormSchema';
import { IssuerProfileForm } from '../IssuerProfileForm';
import { issuerProfileFormDefaultValues } from '../IssuerProfileForm/IssuerProfileFormDefaultValues';

export const IssuerProfileFormWrapper = () => {
  const { t } = useTranslation('issuer-profile');

  const { data, status, isLoading, isFetching } = useIssuerProfile();

  const form = useForm<IssuerProfileFormContextType>({
    resolver: joiResolver(IssuerProfileFormSchema),
    defaultValues: issuerProfileFormDefaultValues,
    values: data,
    mode: 'onBlur',
  });

  if (status === 'error') {
    return <ApiErrorMessage message={t('errors.fetching-profile')} />;
  }

  if (isLoading || isFetching) {
    return <Loader />;
  }

  return (
    <FormProvider {...form}>
      <IssuerProfileForm />
    </FormProvider>
  );
};
