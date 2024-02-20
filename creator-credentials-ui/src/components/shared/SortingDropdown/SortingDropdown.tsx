import { Dropdown } from 'flowbite-react';
import React from 'react';
import { useTranslation } from '@/shared/utils/useTranslation';
import { Icon, IconName } from '../Icon';

const SORT_ITEMS: {
  labelTkey: string;
  icon: IconName;
}[] = [
  {
    labelTkey: 'sorting.items.a-z',
    icon: 'ArchiveFilled',
  },
  {
    labelTkey: 'sorting.items.z-a',
    icon: 'UnarchiveFilled',
  },
  {
    labelTkey: 'sorting.items.last-date',
    icon: 'EventFilled',
  },
  {
    labelTkey: 'sorting.items.newest-date',
    icon: 'EventTodayFilled',
  },
];

export const SortingDropdown = () => {
  const { t } = useTranslation('common');

  return (
    <Dropdown
      label={t('sorting.label')}
      color="outline-black"
    >
      {SORT_ITEMS.map(({ icon, labelTkey }) => (
        <Dropdown.Item
          key={labelTkey}
          icon={() => (
            <Icon
              icon={icon}
              className="me-2"
            />
          )}
        >
          {t(labelTkey)}
        </Dropdown.Item>
      ))}
    </Dropdown>
  );
};
