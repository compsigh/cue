import { auth } from 'auth'
import { checkAuth } from '@/functions/check-auth'
import { redirect } from 'next/navigation'
import { Sidebar } from '@/components/Sidebar/Sidebar'
import { ImportCard } from '@/components/ImportCard/ImportCard'

export default async function Import () {
  const session = await auth()
  const authed = await checkAuth(session)

  if (!authed)
    return redirect('/')

  return (
    <>
    <Sidebar user={session.user} path={'/import'} />
    <ImportCard />
    </>
  )
}
