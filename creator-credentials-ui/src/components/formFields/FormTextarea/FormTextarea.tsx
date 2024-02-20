import { Textarea, TextareaProps } from 'flowbite-react';
import React, { useId } from 'react';
import {
  FieldPath,
  FieldValues,
  UseControllerProps,
  useController,
} from 'react-hook-form';
import { ClassValue, clsxm } from '@/shared/utils/clsxm';
import { FormLabel, FormLabelProps } from '../FormLabel';

export type FormTextareaCustomProps = {
  label?: FormLabelProps['children'];
  inputProps?: TextareaProps;
  labelProps?: Omit<FormLabelProps, 'children'>;
  className?: string | ClassValue;
};

export type FormTextareaProps<
  T extends FieldValues,
  P extends FieldPath<T>,
> = UseControllerProps<T, P> & FormTextareaCustomProps;

export const FormTextarea = <T extends FieldValues, P extends FieldPath<T>>({
  label,
  inputProps: { className: inputClassName, ...inputProps } = {},
  labelProps,
  disabled,
  className,
  ...controllerProps
}: FormTextareaProps<T, P>) => {
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

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    fieldOnChange(event);
    inputProps?.onChange?.(event);
  };

  const handleBlur = (event: React.FocusEvent<HTMLTextAreaElement>) => {
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
      <Textarea
        color={error ? 'failure' : 'gray'}
        helperText={error?.message}
        id={fieldId}
        onChange={handleChange}
        onBlur={handleBlur}
        value={fieldValue}
        disabled={disabled}
        rows={5}
        className={clsxm('scrollbar', inputClassName)}
        {...inputProps}
        {...fieldProps}
      />
    </div>
  );
};
