import { Spinner } from 'flowbite-react';
import { GetServerSideProps } from 'next';
import { getCsrfToken } from 'next-auth/react';
// import { useSearchParams } from 'next/navigation';
// import { useRouter } from 'next/router';
import { ReactElement } from 'react';
import { NextPageWithLayout } from '@/shared/typings/NextPageWithLayout';
import { BlankLayout } from '@/components/layouts/blankLayout/BlankLayout';

type EmailLoginPageProps = {
  // csrfToken: string;
};

const EmailLoginPage: NextPageWithLayout<EmailLoginPageProps> = (
  {
    // csrfToken,
  },
) => {
  // const router = useRouter();
  // const searchParams = useSearchParams();
  // const signInRan = useRef(false);

  // const code = searchParams.get('code');

  // const signInCallback = useCallback(async () => {
  //   try {
  //     const response = await signIn('email', {
  //       code,
  //       csrfToken,
  //       redirect: false,
  //     });

  //     if (!response?.ok) {
  //       throw new Error('Coud not sign in');
  //     }

  //     router.replace('/');
  //   } catch (err) {
  //     router.replace('/auth/error');
  //   }
  // }, [csrfToken, router, code]);

  // useEffect(() => {
  //   if (signInRan.current === false) {
  //     signInCallback();
  //   }

  //   return () => {
  //     signInRan.current = true;
  //   };
  // }, [signInCallback]);

  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <Spinner
        size="xl"
        aria-label="Signing in..."
      />
    </div>
  );
};

EmailLoginPage.getLayout = (page: ReactElement) => {
  return <BlankLayout>{page}</BlankLayout>;
};

export const getServerSideProps = (async (ctx) => {
  return {
    props: {
      csrfToken: (await getCsrfToken(ctx)) || null,
    },
  };
}) satisfies GetServerSideProps;

export default EmailLoginPage;
