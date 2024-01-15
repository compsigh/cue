// import { getUser } from '@/functions/user-management'
import { checkAuth } from '@/functions/check-auth'
import { redirect } from 'next/navigation'
import CueWrapper from '@/components/CueWrapper/CueWrapper'
import { Sidebar } from '@/components/Sidebar/Sidebar'
import { auth } from 'auth'

export default async function Cue () {
  // const user = await getUser()
  const session = await auth()
  const authed = await checkAuth(session)

  if (!authed)
    return redirect('/')

  return (
    <>
    <Sidebar user={session.user} path={'/cue'} />
    <CueWrapper />
    </>
  )
}
