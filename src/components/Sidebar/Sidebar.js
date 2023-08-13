// Next imports
import Image from 'next/image'
import Link from 'next/link'

// Style imports
import styles from './Sidebar.module.scss'

// Component imports
import Feedback from '../Feedback'

export default function Sidebar ({ user, path }) {
  // TODO: include Roadmap (set up a GitHub project or something first)
  if (!user || !path) return <></>
  return (
    <nav className={styles.sidebar}>
      <ul>

        <li className={styles.cue}>
          <Link href='/cue'>
            <Image
              src={path === '/cue' ? '/icons/Cue_Selected.svg' : '/icons/Cue.svg'}
              alt="Cue"
              width={55}
              height={55}
            />
          </Link>
        </li>

        <li className={styles.help}>
          <Link href='https://docs.cue.study'>
            <Image
              src="/icons/Help.svg"
              alt="Help"
              width={55}
              height={55}
            />
          </Link>
        </li>

        <li className={styles.feedback}>
          <Feedback />
        </li>

        <li className={styles.profile}>
          <Link href='/profile'>
            <Image
              src={path === '/profile' ? '/icons/Profile_Selected.svg' : '/icons/Profile.svg'}
              alt="Profile"
              width={55}
              height={55}
            />
          </Link>
        </li>

        <li className={styles.invite}>
          <Link href='#'>
            <Image
              src="/icons/Invite.svg"
              alt="Invites coming soon!"
              width={55}
              height={55}
              style={{ opacity: 0.5, cursor: 'not-allowed' }}
            />
          </Link>
        </li>
      </ul>
    </nav>
  )
}
