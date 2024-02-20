const path = require('path');

module.exports = {
  debug:
    process.env.NODE_ENV === 'development' &&
    process.env.DEBUG_I18N === 'enabled',
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
    // localePath MUST be passed, otherwise getServerSideProps pages (SSR)
    // whould not translate labels correctly
    localePath: path.resolve('./public/locales'),
  },
  fallbackLng: {
    default: ['en'],
  },
  localePath:
    typeof window === 'undefined'
      ? require('path').resolve('./public/locales')
      : './public/locales',
  ns: [
    'common',
    'cards',
    'creator-credentials-request',
    'creator-credentials',
    'creator-issuers-request',
    'creator-issuers',
    'creator-profile',
    'creator-signup',
    'creator-verification',
    'credentials-request-success-card',
    'didweb-verification',
    'domain-verification',
    'home-creator',
    'home-issuer',
    'issuer-creator-request-details',
    'issuer-creators',
    'issuer-credentials',
    'issuer-profile',
    'issuer-signup',
    'issuer-verification',
    'login',
    'metamask',
    'terms-and-conditions',
    'verification-cards',
    'welcome',
  ],
  reloadOnPrerender: process.env.NODE_ENV === 'development',
};
