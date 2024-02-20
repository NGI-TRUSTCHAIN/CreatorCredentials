import React from 'react';

type ApiErrorMessageProps = {
  message: string;
};

export const ApiErrorMessage = ({ message }: ApiErrorMessageProps) => (
  <p className="text-xl">{message}</p>
);
