// Function imports
import connect from '@/functions/db-connect.js';
import InviteCode from '@/schemas/invite-code-schema.js';
import { signIn } from 'next-auth/react';

// Component imports
import Button from '@/components/Button/Button';

export default function Card({ invite }) {
  if (!invite)
    return (
      <div>
        <h1>Sorry, that invite code does not exist!</h1>
      </div>
    );

  if (!invite?.valid)
    return (
      <div>
        <h1>Sorry, that invite code is no longer valid!</h1>
      </div>
    );

  const conditionExplanations = {
    'no-invite': `you won't be able to invite others to use Cue just yet.`,
    'expires': `this invite code will expire on January 1st, 2024. (It's very likely we'll release Cue well before this date.)`,
    'use-once': `this invite code is valid only once — please make sure you're signing up with the Google account you'd like to use with Cue.`
  };

  return (
    <div>
      <h1>Welcome to Cue</h1>
      <h2>Invite code <code>{invite.code}</code></h2>
      <h3>To redeem, you can either:</h3>
      <ul>
        <li>Sign in below to accept and associate your Google account with the invite; or</li>
        <li>If you'd like to redeem on a different device, head to the Redeem page (https://app.cue.study/redeem) and enter code <code>{invite.code}</code>.</li>
      </ul>

      {invite.conditions && invite.conditions.length > 0 && (
        <div>
          <h3>Please note the following about your invite:</h3>
          <ul>
            {invite.conditions.map((condition, index) => (
              <li key={index}><code>{condition}</code>: {conditionExplanations[condition]}</li>
            ))}
          </ul>
        </div>
      )}

      <Button
        text='Sign in'
        onClick={() => signIn('google', { callbackUrl: `/profile?code=${invite.code}` })}
        type='primary'
      />

    </div>
  );
}

export async function getServerSideProps(context) {
  const { inviteCode } = context.params;
  await connect();
  const invite = await InviteCode.findOne({ code: inviteCode });
  const inviteJSON = JSON.parse(JSON.stringify(invite));

  return {
    props: {
      invite: inviteJSON
    }
  };
}
