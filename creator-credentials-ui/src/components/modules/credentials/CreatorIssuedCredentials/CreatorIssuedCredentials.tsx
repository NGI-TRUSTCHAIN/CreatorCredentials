import React, { useMemo } from 'react';
import { Button } from 'flowbite-react';
import { useTranslation } from '@/shared/utils/useTranslation';
// import { useAuth } from '@clerk/nextjs';
// import { useRouter } from 'next/router';
import { VerifiedCredentialsUnion } from '@/shared/typings/Credentials';
import { CredentialVerificationStatus } from '@/shared/typings/CredentialVerificationStatus';
import { CredentialDetailsCard } from '@/components/shared/CredentialDetailsCard';
import { Icon } from '@/components/shared/Icon';
import { downloadJson } from '@/shared/utils/downloadJson';
import { CredentialType } from '@/shared/typings/CredentialType';
// import axiosNest from '@/api/axiosNest';

type CreatorIssuedCredentialsProps = {
  credentials: VerifiedCredentialsUnion[];
};

export const CreatorIssuedCredentials = ({
  credentials,
}: CreatorIssuedCredentialsProps) => {
  const { t } = useTranslation('cards');
  // const router = useRouter();
  // const auth = useAuth();
  const issuedCredentials = useMemo(
    () =>
      credentials.filter(
        (credential) =>
          credential.status &&
          credential.status === CredentialVerificationStatus.Success,
      ),
    [credentials],
  );

  return (
    <section className="grid grid-cols-3 gap-4">
      {issuedCredentials.map((credential) => (
        <CredentialDetailsCard
          key={credential.id}
          credential={credential}
          dropdownItems={
            [
              //   {
              //     onClick: async () => {
              //       const token = await auth.getToken();
              //       await axiosNest.delete(`v1/credentials`, {
              //         ...getHeaders(token),
              //       });
              //       router.reload();
              //     },
              //     children: 'Delete credential',
              //   },
            ]
          }
          renderFooter={() => (
            <Button
              color="outline"
              className="self-stretch"
              onClick={() => {
                const name =
                  credential.type === CredentialType.Domain
                    ? credential.data.domain
                    : credential.type === CredentialType.Email
                    ? credential.data.address
                    : credential.type === CredentialType.Wallet
                    ? credential.data.address
                    : credential.type === CredentialType.DidWeb
                    ? credential.data.domain
                    : credential.type === CredentialType.Member
                    ? credential.data.companyName
                    : undefined;
                downloadJson(
                  `${name} ${credential.data.credentialObject.validFrom}`,
                  credential.data.credentialObject,
                );
              }}
            >
              {t('download', { ns: 'common' })}
              <Icon
                icon="Download"
                className="ms-2"
              />
            </Button>
          )}
        />
      ))}
    </section>
  );
};
