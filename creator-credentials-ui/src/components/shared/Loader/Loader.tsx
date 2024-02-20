import { Spinner } from 'flowbite-react';
import React from 'react';

type LoaderProps = {
  isLoading?: boolean;
  children?: React.ReactNode;
};

export const Loader = ({ isLoading = true }: LoaderProps) =>
  isLoading ? (
    <Spinner
      size="xl"
      className="absolute inset-0 m-auto"
    />
  ) : null;
