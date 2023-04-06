// Next imports
import { useSession, signIn, signOut } from 'next-auth/react';
import { getServerSession } from 'next-auth/next'
import { getToken } from 'next-auth/jwt';

// Database imports
import connect from '@/functions/db-connect.js';
import User from '@/schemas/user-schema.js';

// Style imports
import styles from '@/styles/Profile.module.scss';

// Component imports
import ProfileCard from '@/components/ProfileCard/ProfileCard';

export default function Profile() {
  const { data: session, status } = useSession();

  if (status === 'loading')
    return <p>Loading...</p>;

  if (status === 'authenticated')
    return (
      <div className={styles.profileCard}>
        <ProfileCard session={session} signOut={signOut} />
      </div>
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
  const token = await getToken({ req: context.req });

  if (!session)
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    };

  // Search the database for the user's ID
  await connect();
  const user = await User.findOne({ googleId: token.sub });

  // If the user doesn't exist, create a new user
  if (!user) {
    const newUser = new User({
      googleId: token.sub,
      cues: [],
      // TODO: figure out invitesRemaining based on whether the user was invited or not
    });
    await newUser.save();
  }

  return {
    props: {
      session
    }
  };
}
