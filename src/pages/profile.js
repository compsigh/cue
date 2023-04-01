import { useSession, signIn, signOut } from 'next-auth/react';
import Image from 'next/image';

const Profile = () => {
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
      <button onClick={() => signIn("google")}>Sign in</button>
    </>
  );
}

export default Profile;
