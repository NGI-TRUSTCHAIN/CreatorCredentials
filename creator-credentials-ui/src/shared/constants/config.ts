import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

export const config = {
  API_URL: publicRuntimeConfig.API_URL || 'http://localhost:3000/api',
  API_MOCKING: publicRuntimeConfig.API_MOCKING || 'disabled',
  TERMS_AND_CONDITIONS_URL: 'https://creatorcredentials.com',
  NEST_API_URL: publicRuntimeConfig.NEST_API_URL || 'http://localhost:3200',
  NEST_API_SSR_URL:
    publicRuntimeConfig.NEST_API_SSR_URL || 'http://localhost:3200',
  DISABLE_I18N_TRANSLATIONS:
    publicRuntimeConfig.DISABLE_I18N_TRANSLATIONS === 'true',
};
