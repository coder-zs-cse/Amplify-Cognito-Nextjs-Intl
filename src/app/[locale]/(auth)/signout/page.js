'use client'
import { useEffect } from 'react'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function SignOut() {
  const router = useRouter()

  useEffect(() => {
    const signOutUser = async () => {
      await signOut({ redirect: false })
      router.push('/') // Redirect to home page after signout
    }

    signOutUser()
  }, [router])

  return <div>Signing out...</div>
}