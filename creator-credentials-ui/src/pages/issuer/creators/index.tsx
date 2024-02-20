import { GetServerSideProps, NextPage } from 'next';

const IssuerCreatorsPage: NextPage = () => null;

// eslint-disable-next-line require-await
export const getServerSideProps = (async () => ({
  redirect: {
    destination: '/issuer/creators/requested',
    permanent: false,
  },
})) satisfies GetServerSideProps;

export default IssuerCreatorsPage;
