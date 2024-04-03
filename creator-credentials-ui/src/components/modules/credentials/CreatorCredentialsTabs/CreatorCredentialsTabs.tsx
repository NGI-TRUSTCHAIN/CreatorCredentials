import React, { useMemo } from 'react';
import { Tabs, TabsComponent } from 'flowbite-react';
import { useTranslation } from '@/shared/utils/useTranslation';
import { Loader } from '@/components/shared/Loader';
import { ApiErrorMessage } from '@/components/shared/ApiErrorMessage';
import { VerifiedCredentialsUnion } from '@/shared/typings/Credentials';
import { useCreatorCredentials } from '@/api/queries/useCreatorCredentials';
import { CreatorIssuedCredentials } from '../CreatorIssuedCredentials';
import { CreatorPendingCredentials } from '../CreatorPendingCredentials';

export const CreatorCredentialsTabs = () => {
  const { t } = useTranslation('creator-credentials');

  const { isLoading, isFetching, status, data } = useCreatorCredentials();

  const credentialsArray = useMemo(
    () =>
      Object.values(data || [])
        .flat()
        .filter(Boolean) as VerifiedCredentialsUnion[],
    [data],
  );

  if (status === 'error') {
    return <ApiErrorMessage message={t('errors.fetching-credentials')} />;
  }

  if (isLoading || isFetching) {
    return <Loader />;
  }

  return (
    <TabsComponent style="underline">
      <Tabs.Item
        active
        title={t('tabs.issued')}
      >
        <CreatorIssuedCredentials credentials={credentialsArray} />
      </Tabs.Item>
      <Tabs.Item title={t('tabs.pending')}>
        <CreatorPendingCredentials credentials={credentialsArray} />
      </Tabs.Item>
    </TabsComponent>
  );
};
