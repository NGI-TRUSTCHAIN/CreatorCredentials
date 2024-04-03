import React from 'react';
import { useTranslation } from '@/shared/utils/useTranslation';
import { ApiErrorMessage } from '@/components/shared/ApiErrorMessage';
import { Loader } from '@/components/shared/Loader';
import { ColoredBadge } from '@/components/shared/ColoredBadge';
import { useIssuersTemplates } from '@/api/queries/useIssuersTemplates';
import { CredentialTemplateDetailsCard } from '@/components/shared/CredentialTemplateDetailsCard';

export const IssuerCredentialsTemplatesList = () => {
  const { t } = useTranslation('issuer-credentials');

  const { data, status, isFetching, isLoading } = useIssuersTemplates();

  // const credentials: EmailCredential[] = data;
  // const confirmedCredentials = useMemo(
  //   () =>
  //     // Object.values(data?.credentials || [])
  //     //   .flat()
  //     //   .filter(
  //     //     (credential) =>
  //     //       credential.status === CredentialVerificationStatus.Success,
  //     //   ),
  //     data?.email ? [data?.email] : [],
  //   [data],
  // );

  if (status === 'error') {
    return <ApiErrorMessage message={t('errors.fetching-credentials')} />;
  }

  if (isLoading || isFetching) {
    return <Loader />;
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      {data.templates.map((template) => (
        <CredentialTemplateDetailsCard
          key={template.id}
          template={template}
          dropdownItems={[]}
          renderFooter={() => (
            <ColoredBadge
              badgeType="active"
              className="self-center"
            />
          )}
        />
      ))}
    </div>
  );
};
