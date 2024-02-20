import { GetServerSideProps, NextPage } from 'next';

const NotFoundPage: NextPage = () => null;

// eslint-disable-next-line require-await
export const getServerSideProps = (async () => ({
  redirect: {
    destination: '/',
    permanent: false,
  },
})) satisfies GetServerSideProps;

export default NotFoundPage;
