import { getUser } from '@/functions/user-management'
import checkAuth from '@/functions/check-auth'
import { redirect } from 'next/navigation'
import CueWrapper from '@/components/CueWrapper/CueWrapper'
import Sidebar from '@/components/Sidebar/Sidebar'

export default async function Cue () {
  const user = await getUser()
  const authed = await checkAuth({ user })

  if (!authed)
    return redirect('/')

  return (
    <>
    <Sidebar user={user} path={'/cue'} />
    <CueWrapper />
    </>
  )
}
