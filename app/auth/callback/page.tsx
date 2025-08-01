 // app/auth/callback/page.tsx
'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default function AuthCallback() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const supabase = createClientComponentClient()

  useEffect(() => {
    async function handleLogin() {
      const code = searchParams.get('code')
      const redirect = searchParams.get('redirect')
      if (code) {
        await supabase.auth.exchangeCodeForSession(code)
        router.replace(redirect || '/') // Go back to original destination
      }
    }

    handleLogin()
  }, [])

  return <p className="text-center mt-20">Verifying login...</p>
}
