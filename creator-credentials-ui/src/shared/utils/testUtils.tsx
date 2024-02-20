import { QueryClientProvider } from '@tanstack/react-query';
import { render, type RenderOptions } from '@testing-library/react';
import React from 'react';
import { createQueryClient } from './queryClient';

export type ProviderOptions = RenderOptions;

type ProvidersProps = {
  children: React.ReactNode;
} & ProviderOptions;

const client = createQueryClient();

const Providers = ({ children }: ProvidersProps) => {
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};

const renderWithProviders = (
  ui: React.ReactElement,
  options: ProviderOptions = {},
) => {
  const { ...rest } = options;

  const rtl = render(ui, {
    wrapper: ({ children }) => <Providers>{children}</Providers>,
    ...rest,
  });

  return {
    ...rtl,
    rerender: (
      rerenderUi: React.ReactElement,
      rerenderOptions?: ProviderOptions,
    ) =>
      renderWithProviders(rerenderUi, {
        container: rtl.container,
        ...options,
        ...rerenderOptions,
      }),
  };
};

export { renderWithProviders as render };
