import React, { HTMLAttributes, useId } from 'react';
import {
  FieldPath,
  FieldValues,
  UseControllerProps,
  useController,
} from 'react-hook-form';
import { FormLabel, FormLabelProps } from '../FormLabel';
import { Switch } from '../Switch/Switch';

export type FormSwitchCustomProps = {
  label?: FormLabelProps['children'];
  inputProps?: Omit<
    HTMLAttributes<HTMLInputElement>,
    'type' | 'ref' | 'disabled'
  >;
  ref?: React.Ref<HTMLInputElement>;
  labelProps?: Omit<FormLabelProps, 'children'>;
};

export type FormSwitchProps<
  T extends FieldValues,
  P extends FieldPath<T>,
> = FormSwitchCustomProps & UseControllerProps<T, P>;

export const FormSwitch = <T extends FieldValues, P extends FieldPath<T>>({
  label,
  inputProps,
  labelProps,
  disabled,
  ...controllerProps
}: FormSwitchProps<T, P>) => {
  const fieldId = useId();

  const {
    field: {
      onChange: fieldOnChange,
      onBlur: fieldOnBlur,
      value: fieldValue,
      ...fieldProps
    },
    fieldState: { error },
  } = useController(controllerProps);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    fieldOnChange(event);
    inputProps?.onChange?.(event);
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    fieldOnBlur();
    inputProps?.onBlur?.(event);
  };

  return (
    <div className="flex w-full items-center gap-2">
      <Switch
        id={fieldId}
        onChange={handleChange}
        onBlur={handleBlur}
        value={fieldValue}
        disabled={disabled}
        {...inputProps}
        {...fieldProps}
      />
      {label && (
        <FormLabel
          htmlFor={fieldId}
          disabled={disabled}
          {...labelProps}
          error={Boolean(error)}
        >
          {label}
        </FormLabel>
      )}
    </div>
  );
};
