import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { getAuth } from '@clerk/nextjs/server';
import { clerkClient } from '@clerk/nextjs';
import {
  clerkClient as clerkClientBackend,
  User as ClerkUser,
} from '@clerk/nextjs/server';
import { UserRole } from '@/shared/typings/UserRole';
import axiosSSRNest from '@/api/axiosSSRNest';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
export function withAuth<
  P extends { [key: string]: unknown } = { [key: string]: unknown },
>(
  handler: (
    context: GetServerSidePropsContext,
  ) => GetServerSidePropsResult<P> | Promise<GetServerSidePropsResult<P>>,
  options?: {
    redirect?: string;
    roles?: UserRole | UserRole[];
  },
) {
  return async function withAuthUserTokenSSR(
    context: GetServerSidePropsContext,
  ) {
    const auth = getAuth(context.req);

    const { userId } = auth;
    if (!userId) {
      return {
        redirect: {
          destination: options?.redirect || '/welcome',
          statusCode: 302,
        },
      } as GetServerSidePropsResult<P>;
    }

    try {
      const user: ClerkUser = await clerkClient.users.getUser(userId);

      const userRoleFromMetadata = user.publicMetadata.role;

      if (
        userRoleFromMetadata !== UserRole.Creator &&
        userRoleFromMetadata !== UserRole.Issuer
      ) {
        const route = context.req.url;
        let newRole = null;
        if (route?.includes('issuer')) newRole = UserRole.Issuer;
        if (route?.includes('creator')) newRole = UserRole.Creator;

        if (newRole) {
          await clerkClientBackend.users.updateUserMetadata(userId, {
            publicMetadata: {
              role: newRole,
            },
          });
        }
      }

      const token = await auth.getToken();
      let userFromBackend;
      try {
        const result = await axiosSSRNest.get(`v1/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        userFromBackend = result.data;

        if (!userFromBackend) {
          userFromBackend = await axiosSSRNest.post(
            `v1/users/register`,
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );
        }
      } catch (error) {
        // eslint-disable-next-line
        console.log(error);
      }

      if (
        user.publicMetadata.role &&
        options?.roles &&
        !isUserRoleEligible(user.publicMetadata.role as UserRole, options.roles)
      ) {
        return {
          redirect: {
            destination:
              options?.redirect ||
              (user.publicMetadata.role === UserRole.Creator
                ? '/creator'
                : '/issuer'),
            statusCode: 302,
          },
        } as GetServerSidePropsResult<P>;
      }

      return handler(context);
    } catch (error) {
      return {
        redirect: {
          destination: options?.redirect || '/welcome',
          statusCode: 302,
        },
      } as GetServerSidePropsResult<P>;
    }
  };
}

const isUserRoleEligible = (
  userRole: UserRole,
  eligibleRoles: UserRole | UserRole[],
) => {
  if (Array.isArray(eligibleRoles)) {
    return eligibleRoles.includes(userRole);
  }
  return userRole === eligibleRoles;
};
