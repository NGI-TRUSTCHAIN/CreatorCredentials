import { GetServerSideProps } from 'next';
import { useSearchParams } from 'next/navigation';
import { withAuth } from '@/components/modules/app';
import { CredentialsRequestContextProvider } from '@/components/modules/credentials/CredentialsRequestContext';
import { CredentialsRequestMultiStep } from '@/components/modules/credentials/CredentialsRequestMultiStep';
import { NextPageWithLayout } from '@/shared/typings/NextPageWithLayout';
import { UserRole } from '@/shared/typings/UserRole';
import { getI18nProps } from '@/shared/utils/i18n';

const CreatorNewCredentialRequestPage: NextPageWithLayout = () => {
  const params = useSearchParams();
  const preSelectedIssuerId = params.get('issuerId');

  return (
    <>
      <CredentialsRequestContextProvider
        preSelectedIssuerId={preSelectedIssuerId}
      >
        <CredentialsRequestMultiStep />
      </CredentialsRequestContextProvider>
    </>
  );
};

export const getServerSideProps = withAuth(
  async (ctx) => {
    return {
      props: {
        ...(await getI18nProps(ctx.locale, [
          'creator-credentials-request',
          'credentials-request-success-card',
          'cards',
        ])),
      },
    };
  },
  {
    roles: [UserRole.Creator],
  },
) satisfies GetServerSideProps;

export default CreatorNewCredentialRequestPage;
