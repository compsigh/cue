import Image from "next/image";
import { useRouter } from "next/router";

const ProfileCard = (props) => {
  const { session, signOut } = props;
  const router = useRouter();

  return (
    <div className="profile-card">
      <div className="profile-card-image">
        <Image
          src={session.user.image}
          alt="Profile Picture"
          width={110}
          height={110}
        />
      </div>
      <div className="profile-card-info">
        <h3>{session.user.name}</h3>
        <p>{session.user.email}</p>
      </div>
      <button className="profile-card-cues-button" onClick={() => {router.push('/saved');}}>View saved cues</button>
      <button className="profile-card-signout-button" onClick={() => signOut()}>Sign out</button>
    </div>
  );
}

export default ProfileCard;
