import Image from "next/image";
import Button from "@/components/Button/Button";
import { useRouter } from "next/router";
import styles from './ProfileCard.module.scss';

const ProfileCard = ({ user, signOut }) => {
  const router = useRouter();

  return (
    <div className={styles.profileCard}>
      <div className={styles.profileCardImage}>
        <Image
          src={user.image}
          alt="Profile Picture"
          width={110}
          height={110}
        />
      </div>
      <div className={styles.profileCardInfo}>
        <h3 className={styles.name}>{user.name}</h3>
        <p className={styles.email}>{user.email}</p>
        <p className={styles.invitesRemaining}>{user.invitesRemaining} invites remaining</p>
      </div>

      <div className={styles.actions}>
        <Button
          type={'primary'}
          onClick={() => {router.push('/saved');}}
          text="View saved cues"
        />
        <Button
          type={'secondary'}
          onClick={() => signOut()}
          text="Sign out"
        />
      </div>
    </div>
  );
}

export default ProfileCard;
