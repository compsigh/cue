// Next imports
import { signOut } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

// Database imports
import connect from '@/functions/db-connect';
import InviteCode from '@/schemas/invite-code-schema';
import User from '@/schemas/user-schema';
import getUserSessionAndData from '@/functions/get-user-session-and-data.js';

// Style imports
import styles from '@/styles/Profile.module.scss';

// Component imports
import ProfileCard from '@/components/ProfileCard/ProfileCard';

export default function Profile({ user }) {
  // Clear invite code
  const router = useRouter();
  useEffect(() => {
    router.replace('/profile', undefined, { shallow: true });
  }, []);

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

  /**
   * If:
   * The user exists...
   *
   * Then:
   * Associate the user's session data with the user's database data and return as one object.
   */
  if (sessionData && userData)
    return {
      props: {
        user: {
          ...sessionData,
          ...userData
        },
      }
    };

  // Check for valid invite code in params
  const { query } = context;
  const inviteCode = query?.code;
  let invite = null;
  if (inviteCode) {
    await connect();
    invite = await InviteCode.findOne({ inviteCode });
  }

  /**
   * If:
   * 1) The user doesn't exist and is a student at USF; or
   * 2) The user doesn't exist and has a valid invite code...
   *
   * Then:
   * 1) Invalidate the invite code if it exists; and
   * 2) Create a new user.
   */
  if ((!userData && sessionData?.email.includes('@dons.usfca.edu')) || (!userData && invite?.valid)) {
    let invitesRemaining = 1;
    if (invite?.valid)
      for (const condition of invite.conditions) {
        if (condition === 'no-invite')
          invitesRemaining = 0;
        if (condition === 'use-once') {
          invite.valid = false;
          await invite.save();
        }
      }

    await connect();
    await User.create({
      googleId: result.id,
      cues: [],
      invitesRemaining
    });

    return {
      props: {
        user: {
          ...sessionData,
          ...userData
        },
      }
    };
  }

  // If the user doesn't have permission to access the page, redirect them to the access denied page
  if (sessionData) {
    return {
      redirect: {
        destination: '/api/auth/signin?error=accessDenied',
        permanent: false
      }
    };
  }

  // Otherwise (there is no user), redirect to the home page
  return {
    redirect: {
      destination: '/',
      permanent: false
    }
  };
}
