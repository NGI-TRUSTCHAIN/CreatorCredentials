const { i18n } = require('./next-i18next.config');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    tsconfigPath: './tsconfig.build.json',
  },
  publicRuntimeConfig: {
    API_URL: process.env.API_URL || 'http://localhost:3000/api',
    API_MOCKING: process.env.API_MOCKING || 'enabled',
    NEST_API_URL: process.env.NEST_API_URL,
    NEST_API_SSR_URL: process.env.NEST_API_SSR_URL,
    DISABLE_I18N_TRANSLATIONS: process.env.DISABLE_I18N_TRANSLATIONS,
  },
  webpack(config) {
    // Fixes npm packages that depend on `fs` module
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };

    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            dimensions: false,
          },
        },
      ],
    });
    return config;
  },
  i18n,
};

module.exports = nextConfig;
