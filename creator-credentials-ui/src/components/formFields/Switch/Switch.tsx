import React, { HTMLAttributes, forwardRef } from 'react';

type SwitchProps = HTMLAttributes<HTMLInputElement> & {
  value: boolean;
  name: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
};

// Temporary component to replace flowbite-react ToggleSwitch component until ref issue is fixed:
// https://github.com/themesberg/flowbite-react/issues/1078
export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  ({ value, name, onChange, onBlur, ...restProps }, ref) => (
    <label className="relative inline-flex cursor-pointer items-center">
      <input
        checked={value}
        type="checkbox"
        value={value.toString()}
        className="peer sr-only"
        name={name}
        ref={ref}
        onChange={onChange}
        onBlur={onBlur}
        {...restProps}
      />
      <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-primary"></div>
    </label>
  ),
);

Switch.displayName = 'Switch';
