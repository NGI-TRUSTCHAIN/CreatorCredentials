import { useTranslation } from '@/shared/utils/useTranslation';
import { TermsAndConditionsField } from '../../TermsAndConditionsField';

export const CreatorLegalDocuments = () => {
  const { t } = useTranslation('creator-profile');

  return (
    <article className="flex flex-col gap-6">
      <h2 className="text-xl">{t('legal-documents.title')}</h2>
      <TermsAndConditionsField />
    </article>
  );
};
