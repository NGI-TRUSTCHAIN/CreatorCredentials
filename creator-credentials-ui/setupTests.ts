import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';
// import { server } from './src/mocks/server';

vi.mock('next-i18next', () => ({
  useTranslation: () => {
    return {
      t: (str: string): string => str,
    };
  },
}));

vi.mock('next/config', () => ({
  default: () => ({
    publicRuntimeConfig: {
      API_URL: 'http://localhost:3000/api',
      MOCK_API_URL: 'disabled',
    },
  }),
}));

// beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
// afterAll(() => server.close());
// afterEach(() => server.resetHandlers());
