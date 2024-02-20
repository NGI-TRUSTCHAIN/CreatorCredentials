import { Checkbox } from 'flowbite-react';
import { useId } from 'react';
import { FormLabel } from '@/components/formFields/FormLabel';
import { TermsAndConditionsTrans } from '@/components/shared/TermsAndConditionsTrans';

export const TermsAndConditionsField = () => {
  const fieldId = useId();

  return (
    <div className="flex items-center gap-2">
      <Checkbox
        id={fieldId}
        checked
        readOnly
        disabled
      />
      <FormLabel htmlFor={fieldId}>
        <TermsAndConditionsTrans agreed />
      </FormLabel>
    </div>
  );
};
