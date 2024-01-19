import { auth } from 'auth'
import { checkAuth } from '@/functions/check-auth'
import { redirect } from 'next/navigation'
import { Sidebar } from '@/components/Sidebar/Sidebar'
import { TextCard } from '@/components/TextCard/TextCard'

export default async function TextImport () {
  const session = await auth()
  const authed = await checkAuth(session)

  if (!authed)
    return redirect('/')

  return (
    <>
      <Sidebar user={session.user} path={'/import'} />
      <TextCard />
    </>
  )
}
