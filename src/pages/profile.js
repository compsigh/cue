// Next imports
import { signOut } from 'next-auth/react';
import getUserSessionAndData from '@/functions/get-user-session-and-data.js';

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
  const result = await getUserSessionAndData(context.req, context.res);
  const sessionData = result?.sessionData;
  const userData = result?.userData;

  if (!sessionData)
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    };

  // If the user doesn't exist, create a new user
  if (!userData) {
    await connect();
    const newUser = new User({
      googleId: result.id,
      cues: [],
      // TODO: figure out invitesRemaining based on whether the user was invited or not
    });
    await newUser.save();
  }

  // Associate the user's session data with the user's database data and return as one object
  return {
    props: {
      user: {
        ...sessionData,
        ...userData
      },
    }
  };
}
