import Image from 'next/image';
import Link from 'next/link';
import styles from './Sidebar.module.scss';
import { useRouter } from 'next/router';

const Sidebar = () => {
  return (
    <nav className={styles.sidebar}>
      <ul>

        <li className={styles.cue}>
          <Link href='/'>
          {useRouter().pathname === '/' ? (
            <Image
              src="/icons/Cue_Selected.svg"
              alt="Cue"
              width={55}
              height={55}
            />
            ) : (
            <Image
              src="/icons/Cue.svg"
              alt="Cue"
              width={55}
              height={55}
            />
            )}
          </Link>
        </li>

        <li className={styles.review}>
          <Link href='/review'>
          {useRouter().pathname === '/review' ? (
            <Image
              src="/icons/Review_Selected.svg"
              alt="Review"
              width={55}
              height={55}
            />
            ) : (
            <Image
              src="/icons/Review.svg"
              alt="Review"
              width={55}
              height={55}
            />
            )}
          </Link>
        </li>

        <li className={styles.help}>
          <Link href='/help'>
          {useRouter().pathname === '/help' ? (
            <Image
              src="/icons/Help_Selected.svg"
              alt="Help"
              width={55}
              height={55}
            />
            ) : (
            <Image
              src="/icons/Help.svg"
              alt="Help"
              width={55}
              height={55}
            />
            )}
          </Link>
        </li>

        <li className={styles.feedback}>
          <Link href='/feedback'>
          {useRouter().pathname === '/feedback' ? (
            <Image
              src="/icons/Feedback_Selected.svg"
              alt="Feedback"
              width={55}
              height={55}
            />
            ) : (
            <Image
              src="/icons/Feedback.svg"
              alt="Feedback"
              width={55}
              height={55}
            />
            )}
          </Link>
        </li>

        <li className={styles.profile}>
          <Link href='/profile'>
            {useRouter().pathname === '/profile' ? (
            <Image
              src="/icons/Profile_Selected.svg"
              alt="Profile"
              width={55}
              height={55}
            />
            ) : (
            <Image
              src="/icons/Profile.svg"
              alt="Profile"
              width={55}
              height={55}
            />
            )}
          </Link>
        </li>

      </ul>
    </nav>
  );
};

export default Sidebar;
