import { GetServerSideProps } from 'next';
import { useTranslation } from '@/shared/utils/useTranslation';
import { NextPageWithLayout } from '@/shared/typings/NextPageWithLayout';
import { getI18nProps } from '@/shared/utils/i18n';
import { withAuth } from '@/components/modules/app';
import { UserRole } from '@/shared/typings/UserRole';
import { PageHeader } from '@/components/shared/PageHeader';
import { Icon } from '@/components/shared/Icon';
import { CreatorCredentialsTabs } from '@/components/modules/credentials/CreatorCredentialsTabs';
import { LinkButton } from '@/components/shared/LinkButton';

const CreatorCredentialsPage: NextPageWithLayout = () => {
  const { t } = useTranslation('creator-credentials');

  return (
    <>
      <PageHeader
        title={t('header.title')}
        subtitle={t('header.description')}
        buttons={
          <div className="flex gap-4">
            <LinkButton
              size="xs"
              color="primary"
              href="/creator/credentials/new"
            >
              {t('header.buttons.new-credential')}
              <Icon
                icon="Add"
                className="ms-2 h-4 w-4"
              />
            </LinkButton>
          </div>
        }
      />
      <CreatorCredentialsTabs />
    </>
  );
};

export const getServerSideProps = withAuth(
  async (ctx) => {
    return {
      props: {
        ...(await getI18nProps(ctx.locale, ['creator-credentials', 'cards'])),
      },
    };
  },
  {
    roles: [UserRole.Creator],
  },
) satisfies GetServerSideProps;

export default CreatorCredentialsPage;
