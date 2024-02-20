import { ReactElement } from 'react';
import { BlankLayout } from '@/components/layouts/blankLayout/BlankLayout';
import { NextPageWithLayout } from '@/shared/typings/NextPageWithLayout';

const AuthErrorPage: NextPageWithLayout = () => (
  <div className="flex flex-1 flex-col items-center justify-center gap-[2.125rem]">
    <p className="text-2xl text-alert">
      Your code is not valid. Please try again.
    </p>
  </div>
);

AuthErrorPage.getLayout = (page: ReactElement) => {
  return <BlankLayout>{page}</BlankLayout>;
};

export default AuthErrorPage;
