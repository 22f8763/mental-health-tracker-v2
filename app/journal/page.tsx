 // app/journal/page.tsx
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import JournalClient from './JournalClient'

export const dynamic = 'force-dynamic'

export default async function JournalPage() {
  const supabase = createServerComponentClient({ cookies })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect('/login') // Redirect if not logged in
  }

  return <JournalClient />
}
