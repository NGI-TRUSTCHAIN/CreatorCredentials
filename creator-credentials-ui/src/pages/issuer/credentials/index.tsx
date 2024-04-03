import { GetServerSideProps, NextPage } from 'next';

const IssuerCredentialsPage: NextPage = () => null;

// eslint-disable-next-line require-await
export const getServerSideProps = (async () => ({
  redirect: {
    destination: '/issuer/credentials/requested',
    permanent: false,
  },
})) satisfies GetServerSideProps;

export default IssuerCredentialsPage;
