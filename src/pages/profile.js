import { useSession, signIn, signOut } from 'next-auth/react';
import { getServerSession } from 'next-auth/next'
import Image from 'next/image';

export default function Profile() {
  const { data: session, status } = useSession();
  const userEmail = session?.user?.email || null;

  if (status === 'loading')
    return <p>Loading...</p>;

  if (status === 'authenticated')
    return (
      <>
        <Image
          src={session.user.image}
          alt="Profile Picture"
          width={55}
          height={55}
        />
        <p>Signed in as {userEmail}</p>
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );

  return (
    <>
      <p>Not signed in</p>
      <button onClick={() => signIn('google')}>Sign in</button>
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res);

  if (!session)
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    };

  return {
    props: {
      session
    }
  };
}
