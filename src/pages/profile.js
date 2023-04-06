// Next imports
import { signOut } from 'next-auth/react';
import { getServerSession } from 'next-auth/next'
import { getToken } from 'next-auth/jwt';

// Database imports
import connect from '@/functions/db-connect.js';
import User from '@/schemas/user-schema.js';

// Style imports
import styles from '@/styles/Profile.module.scss';

// Component imports
import ProfileCard from '@/components/ProfileCard/ProfileCard';

export default function Profile({ user }) {
  return (
    <div className={styles.profileCard}>
      <ProfileCard user={user} signOut={signOut} />
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res);
  const sessionData = session?.user;

  if (!session)
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    };

  // Search the database for the user's ID
  await connect();
  const token = await getToken({ req: context.req });
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

  // Associate the user's session data with the user's database data and return as one object
  const userData = JSON.parse(JSON.stringify(user));
  return {
    props: {
      user: {
        ...sessionData,
        ...userData
      },
    }
  };
}
