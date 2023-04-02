import Image from "next/image";
import { useRouter } from "next/router";
import styles from './ProfileCard.module.scss';

const ProfileCard = (props) => {
  const { session, signOut } = props;
  const router = useRouter();

  return (
    <div className={styles.profileCard}>
      <div className={styles.profileCardImage}>
        <Image
          src={session.user.image}
          alt="Profile Picture"
          width={110}
          height={110}
        />
      </div>
      <div className={styles.profileCardInfo}>
        <h3 className={styles.name}>{session.user.name}</h3>
        <p className={styles.email}>{session.user.email}</p>
      </div>
      <button className="profile-card-cues-button" onClick={() => {router.push('/saved');}}>View saved cues</button>
      <button className="profile-card-signout-button" onClick={() => signOut()}>Sign out</button>
    </div>
  );
}

export default ProfileCard;
