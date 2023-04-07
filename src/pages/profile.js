// Next imports
import { signOut } from 'next-auth/react';

// Database imports
import getUserSessionAndData from '@/functions/get-user-session-and-data.js';

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
  if (!userData)
    fetch('/api/manage-user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: result.id,
        action: 'create'
      })
    });

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
