import { useTranslation as i18nUseTranslation } from 'next-i18next';
import * as cards from '@/public/locales/en/cards.json';
import * as common from '@/public/locales/en/common.json';
import * as creatorCredentialsRequest from '@/public/locales/en/creator-credentials-request.json';
import * as creatorCredentials from '@/public/locales/en/creator-credentials.json';
import * as creatorIssuersRequest from '@/public/locales/en/creator-issuers-request.json';
import * as creatorIssuers from '@/public/locales/en/creator-issuers.json';
import * as creatorProfile from '@/public/locales/en/creator-profile.json';
import * as creatorSignup from '@/public/locales/en/creator-signup.json';
import * as creatorVerification from '@/public/locales/en/creator-verification.json';
import * as credentialsRequestSuccessCard from '@/public/locales/en/credentials-request-success-card.json';
import * as didwebVerification from '@/public/locales/en/didweb-verification.json';
import * as domainVerification from '@/public/locales/en/domain-verification.json';
import * as homeCreator from '@/public/locales/en/home-creator.json';
import * as homeIssuer from '@/public/locales/en/home-issuer.json';
import * as issuerCreatorRequestDetails from '@/public/locales/en/issuer-creator-request-details.json';
import * as issuerCreators from '@/public/locales/en/issuer-creators.json';
import * as issuerCredentials from '@/public/locales/en/issuer-credentials.json';
import * as issuerProfile from '@/public/locales/en/issuer-profile.json';
import * as issuerSignup from '@/public/locales/en/issuer-signup.json';
import * as issuerVerification from '@/public/locales/en/issuer-verification.json';
import * as login from '@/public/locales/en/login.json';
import * as metamask from '@/public/locales/en/metamask.json';
import * as termsAndConditions from '@/public/locales/en/terms-and-conditions.json';
import * as verificationCards from '@/public/locales/en/verification-cards.json';
import * as welcome from '@/public/locales/en/welcome.json';
import { config } from '../constants/config';

const translateObject = {
  cards: cards,
  common: common,
  'creator-credentials-request': creatorCredentialsRequest,
  'creator-credentials': creatorCredentials,
  'creator-issuers-request': creatorIssuersRequest,
  'creator-issuers': creatorIssuers,
  'creator-profile': creatorProfile,
  'creator-signup': creatorSignup,
  'creator-verification': creatorVerification,
  'credentials-request-success-card': credentialsRequestSuccessCard,
  'didweb-verification': didwebVerification,
  'domain-verification': domainVerification,
  'home-creator': homeCreator,
  'home-issuer': homeIssuer,
  'issuer-creator-request-details': issuerCreatorRequestDetails,
  'issuer-creators': issuerCreators,
  'issuer-credentials': issuerCredentials,
  'issuer-profile': issuerProfile,
  'issuer-signup': issuerSignup,
  'issuer-verification': issuerVerification,
  login: login,
  metamask: metamask,
  'terms-and-conditions': termsAndConditions,
  'verification-cards': verificationCards,
  welcome: welcome,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getDescendantProp(obj: any, desc: string) {
  if (!obj) return desc;

  const arr = desc.split('.');
  while (arr.length && (obj = obj[arr.shift() as string]));
  return obj || desc;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any

function disabledUseTranslation(
  namespace: string = 'common',
  option?: { useSuspense?: boolean },
) {
  if (option) {
  }
  return {
    t: (key: string, options?: { [x: string]: string }) => {
      const { ns, ...variables } = options || {};
      let ns_to_apply = namespace;

      if (ns) {
        ns_to_apply = ns;
      }

      const result = getDescendantProp(
        translateObject[ns_to_apply as keyof typeof translateObject],
        key,
      );
      const variablesKeys = Object.keys(variables);

      return variablesKeys.reduce(
        (acc, key) => acc.replace(`{{${key}}}`, variables[key]),
        result,
      );
    },
  };
}
// eslint-disable-next-line
console.log(
  'config.DISABLE_I18N_TRANSLATIONS: ',
  config.DISABLE_I18N_TRANSLATIONS,
);

export const useTranslation = config.DISABLE_I18N_TRANSLATIONS
  ? disabledUseTranslation
  : i18nUseTranslation;
