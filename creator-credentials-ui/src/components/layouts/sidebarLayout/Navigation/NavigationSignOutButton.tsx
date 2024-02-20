import { Sidebar } from 'flowbite-react';
import React from 'react';
import { SignOutButton } from '@clerk/nextjs';
import { useTranslation } from '@/shared/utils/useTranslation';
// import { signOut } from 'next-auth/react';
import { Icon } from '@/components/shared/Icon';
// import { useRouter } from 'next/navigation';

export const NavigationSignOutButton = () => {
  const { t } = useTranslation('common');
  // const router = useRouter();
  // const signOutHandler = async () => {
  //   try {
  //     await signOut(
  //       () => {
  //         router.push('/welcome');
  //       },
  //       { afterSignOutUrl },
  //     );
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  return (
    <Sidebar.Item
      // onClick={signOutHandler}
      as="button"
      className="w-full text-start"
      icon={() => (
        <Icon
          icon="ArrowLeftToBracket"
          className="text-grey-4"
        />
      )}
    >
      <SignOutButton>
        <p>{t('navigation.signout')}</p>
      </SignOutButton>
    </Sidebar.Item>
  );
};
