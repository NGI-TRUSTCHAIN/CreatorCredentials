import 'globals.css';
import { Hydrate, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Flowbite } from 'flowbite-react';
import { appWithTranslation } from 'next-i18next';
import { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import { useState } from 'react';
import i18n from 'i18next';
// eslint-disable-next-line no-restricted-imports
import { initReactI18next } from 'react-i18next';
// eslint-disable-next-line no-restricted-imports
import { Toaster } from 'react-hot-toast';
import { ClerkProvider } from '@clerk/nextjs';
import { createQueryClient } from '@/shared/utils/queryClient';
import { clsxm } from '@/shared/utils/clsxm';
import { NextPageWithLayout } from '@/shared/typings/NextPageWithLayout';
import { flowbiteTheme } from '@/components/flowbite.theme';
import { SidebarLayout } from '@/components/layouts/sidebarLayout/SidebarLayout';
import { AppMetadata } from '@/components/modules/app';

i18n.use(initReactI18next).init({
  load: 'all',
  preload: ['en'],
  lng: 'en',
  fallbackLng: 'en',
});

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const inter = Inter({ subsets: ['latin'] });

function CreatorCredentialsApp({ Component, pageProps }: AppPropsWithLayout) {
  const [queryClient] = useState(() => createQueryClient());

  const getLayout =
    Component.getLayout || ((page) => <SidebarLayout>{page}</SidebarLayout>);

  return (
    <>
      <ClerkProvider {...pageProps}>
        <AppMetadata />
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <Flowbite theme={{ theme: flowbiteTheme }}>
              <div className={clsxm(inter.className, 'contents')}>
                {getLayout(<Component {...pageProps} />)}
              </div>
              <Toaster position="top-right" />
            </Flowbite>
            <ReactQueryDevtools
              initialIsOpen={false}
              position="bottom-right"
            />
          </Hydrate>
        </QueryClientProvider>
      </ClerkProvider>
    </>
  );
}
export default appWithTranslation(CreatorCredentialsApp);
