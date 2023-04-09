import connect from '@/functions/db-connect.js';
import InviteCode from '@/schemas/invite-code-schema.js';

export default function Card({ invite }) {
  if (!invite)
    return (
      <div>
        <h1>Sorry, that invite code does not exist!</h1>
      </div>
    );

  return (
    <div>
      <h1>Invite code: {invite.code}</h1>
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
