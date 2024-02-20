import { TextInput } from 'flowbite-react';
import React from 'react';
import { useTranslation } from '@/shared/utils/useTranslation';
import { Icon } from '@/components/shared/Icon';
import { SortingDropdown } from '@/components/shared/SortingDropdown';

export const CreatorsFilters = () => {
  const { t } = useTranslation('issuer-creators');

  return (
    <div className="mb-8 flex justify-between gap-4">
      <div className="flex gap-4">
        <TextInput
          sizing="lg"
          color="primary"
          icon={() => <Icon icon="Search" />}
          placeholder={t('filters.search.placeholder')}
          className="min-w-[25rem]"
        />
      </div>
      <SortingDropdown />
    </div>
  );
};
