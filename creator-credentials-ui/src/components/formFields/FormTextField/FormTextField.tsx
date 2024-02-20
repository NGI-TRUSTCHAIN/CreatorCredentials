import React, { useId } from 'react';
import { TextInput, TextInputProps } from 'flowbite-react';
import {
  FieldPath,
  FieldValues,
  UseControllerProps,
  useController,
} from 'react-hook-form';
import { ClassValue, clsxm } from '@/shared/utils/clsxm';
import { FormLabel, FormLabelProps } from '../FormLabel';

export type FormTextFieldCustomProps = {
  label?: FormLabelProps['children'];
  inputProps?: TextInputProps;
  labelProps?: Omit<FormLabelProps, 'children'>;
  className?: string | ClassValue;
};

export type FormTextFieldProps<
  T extends FieldValues,
  P extends FieldPath<T>,
> = UseControllerProps<T, P> & FormTextFieldCustomProps;

export const FormTextField = <T extends FieldValues, P extends FieldPath<T>>({
  label,
  inputProps,
  labelProps,
  disabled,
  className,
  ...controllerProps
}: FormTextFieldProps<T, P>) => {
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
    <div className={clsxm(className)}>
      {label && (
        <FormLabel
          htmlFor={fieldId}
          className="mb-2 block"
          error={Boolean(error)}
          {...labelProps}
        >
          {label}
        </FormLabel>
      )}
      <TextInput
        color={error ? 'failure' : 'primary'}
        helperText={error?.message}
        id={fieldId}
        onChange={handleChange}
        onBlur={handleBlur}
        value={fieldValue}
        disabled={disabled}
        {...inputProps}
        {...fieldProps}
      />
    </div>
  );
};
