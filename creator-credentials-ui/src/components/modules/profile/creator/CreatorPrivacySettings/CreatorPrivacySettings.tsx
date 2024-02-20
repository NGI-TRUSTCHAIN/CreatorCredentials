import React, { useEffect } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { useTranslation } from '@/shared/utils/useTranslation';
import { useToast } from '@/shared/hooks/useToast';
import { CreatorCredentialVisibilityFormContextType } from '../CreatorCredentialVisibilityForm/CreatorCredentialVisibilityForm.types';
import { CreatorCredentialVisibilityFormSchema } from '../CreatorCredentialVisibilityForm/CreatorCredentialVisibilityForm.schema';
import { creatorCredentialVisibilityFormDefaultValues } from '../CreatorCredentialVisibilityForm/CreatorCredentialVisibilityForm.constants';
import { CreatorCredentialVisibilityForm } from '../CreatorCredentialVisibilityForm';

export const CreatorPrivacySettings = () => {
  const { t } = useTranslation('creator-profile');
  const toast = useToast();

  const form = useForm<CreatorCredentialVisibilityFormContextType>({
    resolver: joiResolver(CreatorCredentialVisibilityFormSchema),
    defaultValues: creatorCredentialVisibilityFormDefaultValues,
    mode: 'onBlur',
  });

  const { handleSubmit } = form;

  const credentialVisibilityFormSubmitHandler: SubmitHandler<
    CreatorCredentialVisibilityFormContextType
  > = (data) => {
    try {
      console.info(data);
    } catch (error) {
      toast.error(t('privacy.credential-visibility.errors.save-settings'));
    }
  };

  const values = form.watch();

  useEffect(() => {
    console.info('Form values changed: ', values);
    // TODO: Implement API call to save form values
  }, [values]);

  return (
    <article className="flex flex-col gap-6">
      <h2 className="text-xl">{t('privacy.title')}</h2>
      <section className="flex max-w-[40%] flex-col gap-2">
        <h3 className="text-lg">{t('privacy.credential-visibility.title')}</h3>
        <FormProvider {...form}>
          <CreatorCredentialVisibilityForm
            handleSubmit={handleSubmit(credentialVisibilityFormSubmitHandler)}
            isLoading={false}
          />
        </FormProvider>
      </section>
    </article>
  );
};
