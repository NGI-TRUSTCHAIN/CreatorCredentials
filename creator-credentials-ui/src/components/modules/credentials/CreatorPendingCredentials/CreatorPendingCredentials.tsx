import React, { useMemo } from 'react';
import { VerifiedCredentialsUnion } from '@/shared/typings/Credentials';
import { CredentialVerificationStatus } from '@/shared/typings/CredentialVerificationStatus';
import { CredentialDetailsCard } from '@/components/shared/CredentialDetailsCard';
import { ColoredBadge } from '@/components/shared/ColoredBadge';

type CreatorPendingCredentialsProps = {
  credentials: VerifiedCredentialsUnion[];
};

export const CreatorPendingCredentials = ({
  credentials,
}: CreatorPendingCredentialsProps) => {
  const pendingCredentials = useMemo(
    () =>
      credentials.filter(
        (credential) =>
          credential.status &&
          credential.status === CredentialVerificationStatus.Pending,
      ),
    [credentials],
  );

  return (
    <section className="grid grid-cols-3 gap-4">
      {pendingCredentials.map((credential) => (
        <CredentialDetailsCard
          key={credential.id}
          dropdownItems={[]}
          credential={credential}
          renderFooter={() => (
            <ColoredBadge
              badgeType="pending"
              className="self-center"
            />
          )}
        />
      ))}
    </section>
  );
};
