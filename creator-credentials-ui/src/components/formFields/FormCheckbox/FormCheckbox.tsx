import React, { useId } from 'react';
import { Checkbox, CheckboxProps } from 'flowbite-react';
import {
  FieldPath,
  FieldValues,
  UseControllerProps,
  useController,
} from 'react-hook-form';
import { FormLabel, FormLabelProps } from '../FormLabel';

export type FormCheckboxCustomProps = {
  label?: FormLabelProps['children'];
  inputProps?: Omit<CheckboxProps, 'type' | 'ref' | 'disabled'>;
  ref?: React.Ref<HTMLInputElement>;
  labelProps?: Omit<FormLabelProps, 'children'>;
};

export type FormCheckboxProps<
  T extends FieldValues,
  P extends FieldPath<T>,
> = FormCheckboxCustomProps & UseControllerProps<T, P>;

export const FormCheckbox = <T extends FieldValues, P extends FieldPath<T>>({
  label,
  inputProps,
  labelProps,
  disabled,
  ...controllerProps
}: FormCheckboxProps<T, P>) => {
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
      <Checkbox
        checked={fieldValue}
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
