'use client'

// Next imports
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

// Style imports
import styles from './Sidebar.module.scss'

// Component imports
import { PopupButton } from '@typeform/embed-react'

const Sidebar = () => {
  const [user, setUser] = useState(null)
  const [isLoading, setLoading] = useState(true)
  const { data: session, status } = useSession()

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true)

      try {
        const res = await fetch('/api/user')
        if (res.ok) {
          const data = await res.json()
          setUser(data)
        }
        else
          console.error('Error fetching user')
      }
      catch (error) {
        console.error(error)
      }
      setLoading(false)
    }

    if (status === 'authenticated' && session)
      fetchUser()
  }, [session, status])

  if (isLoading)
    return <p>Loading...</p>

  if (!user)
    return <p>No user</p>

  const path = usePathname()
  const showSidebar = path !== '/' && path !== '/redeem' && !path.includes('/invite')
  if (!showSidebar)
    return <></>

  return (
    <nav className={styles.sidebar}>
      <ul>

        <li className={styles.cue}>
          <Link href='/cue'>
            {path === '/cue'
              ? (<Image
                src="/icons/Cue_Selected.svg"
                alt="Cue"
                width={55}
                height={55}
              />)
              : (<Image
                src="/icons/Cue.svg"
                alt="Cue"
                width={55}
                height={55}
              />)
            }
          </Link>
        </li>

        {/* <li className={styles.review}>
          <Link href='#'>
            {path === '/review'
              ? (<Image
                src="/icons/Review_Selected.svg"
                alt="Review"
                width={55}
                height={55}
              />)
              : (<Image
                src="/icons/Review.svg"
                alt="Review"
                width={55}
                height={55}
                style={{ opacity: 0.5, cursor: 'not-allowed' }}
              />)
            }
          </Link>
        </li> */}

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
          <PopupButton
            id="kArMPVer"
            size={80}
            style={{
              border: 'none',
              background: 'none',
              padding: 0,
              margin: 0,
              cursor: 'pointer'
            }}
            autoClose={5000}
          >
            <Image
              src="/icons/Feedback.svg"
              alt="Feedback"
              width={55}
              height={55}
            />
          </PopupButton>
        </li>

        <li className={styles.profile}>
          <Link href='/profile'>
            {path === '/profile'
              ? (<Image
                src="/icons/Profile_Selected.svg"
                alt="Profile"
                width={55}
                height={55}
              />)
              : (<Image
                src="/icons/Profile.svg"
                alt="Profile"
                width={55}
                height={55}
              />)
            }
          </Link>
        </li>

        <li className={styles.invite}>
          {user.userData.invitesRemaining !== 0
            ? (<PopupButton
              id="httmb9Wo"
              size={80}
              style={{
                border: 'none',
                background: 'none',
                padding: 0,
                margin: 0,
                cursor: 'pointer'
              }}
              hidden={{
                invites: user.userData.invitesRemaining
              }}
              onSubmit={() => {
                fetch('/api/manage-user', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    id: user.id,
                    action: 'update',
                    data: {
                      invitesRemaining: user.userData.invitesRemaining - 1
                    }
                  })
                })
              }}
              autoClose={5000}
            >
              <Image
                src="/icons/Invite.svg"
                alt="Invite"
                width={55}
                height={55}
              />
            </PopupButton>)
            : (<Link href='#'>
              <Image
                src="/icons/Invite.svg"
                alt="Invite"
                width={55}
                height={55}
                style={{ opacity: 0.5, cursor: 'not-allowed' }}
              />
            </Link>)
          }
        </li>
      </ul>
    </nav>
  )
}

export default Sidebar
