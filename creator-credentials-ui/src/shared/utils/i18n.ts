import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export const getI18nProps = async (
  locale: string | undefined,
  ns: string[] = [],
) => {
  const result = await serverSideTranslations(locale || 'en', [
    'common',
    ...ns,
  ]);

  return {
    ...result,
  };
};
