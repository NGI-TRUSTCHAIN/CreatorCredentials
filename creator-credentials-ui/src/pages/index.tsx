import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import { getAuth } from '@clerk/nextjs/server';
import { clerkClient } from '@clerk/nextjs';
import { withAuth } from '@/components/modules/app';
import { UserRole } from '@/shared/typings/UserRole';

const HomePage: NextPage = () => null;

export const getServerSideProps = withAuth(
  async (ctx: GetServerSidePropsContext) => {
    const { userId } = getAuth(ctx.req);

    if (!userId) {
      return {
        redirect: {
          destination: '/welcome',
          permanent: false,
        },
      };
    }
    const user = await clerkClient.users.getUser(userId);

    return {
      redirect: {
        destination: user
          ? user.publicMetadata.role === UserRole.Issuer
            ? '/issuer'
            : '/creator'
          : '/welcome',
        permanent: false,
      },
    };
  },
) satisfies GetServerSideProps;

export default HomePage;
