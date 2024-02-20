import { useCallback, useState } from 'react';

export type UseSelectProps<T extends object> = {
  defaultSelection?: T[];
  singleSelection?: boolean;
};

export type UseSelectReturnType<T extends object> = {
  isSelected: (item: T) => boolean;
  toggleSelection: (item: T) => void;
  selectedItems: T[];
  totalSelected: number;
};

export const useSelect = <T extends object>({
  defaultSelection = [],
  singleSelection,
}: UseSelectProps<T> = {}): UseSelectReturnType<T> => {
  const [selectedItems, setSelectedItems] = useState<T[]>(defaultSelection);

  const isSelected = useCallback(
    (item: T) =>
      Boolean(
        selectedItems.find((i) => JSON.stringify(i) === JSON.stringify(item)),
      ),
    [selectedItems],
  );

  const toggleSelection = useCallback(
    (item: T) => {
      setSelectedItems((items) => {
        if (singleSelection) {
          return [item];
        }

        if (isSelected(item)) {
          return items.filter(
            (i) => JSON.stringify(i) !== JSON.stringify(item),
          );
        }

        return [...items, item];
      });
    },
    [isSelected, singleSelection],
  );

  return {
    isSelected,
    toggleSelection,
    selectedItems,
    totalSelected: selectedItems.length,
  };
};
