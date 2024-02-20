import { FormEventHandler } from 'react';
import { IssuerProfileFormDataSection } from '../IssuerProfileFormDataSection';
import { IssuerProfileFormDescriptionSection } from '../IssuerProfileFormDescriptionSection';
import { IssuerProfileFormLegalDocumentsSection } from '../IssuerProfileFormLegalDocumentsSection';

type IssuerProfileFormProps = {
  handleSubmit?: FormEventHandler<HTMLFormElement>;
  isLoading?: boolean;
  disabled?: boolean;
};

export const IssuerProfileForm = ({
  handleSubmit,
  isLoading,
  disabled,
}: IssuerProfileFormProps) => (
  <form
    className="flex flex-1 flex-col gap-4"
    onSubmit={handleSubmit}
  >
    <div className="flex max-w-[40%] flex-col gap-4">
      <IssuerProfileFormDataSection
        isLoading={isLoading}
        disabled={disabled}
      />
      <IssuerProfileFormDescriptionSection
        isLoading={isLoading}
        disabled={disabled}
      />
      <IssuerProfileFormLegalDocumentsSection />
    </div>
  </form>
);
