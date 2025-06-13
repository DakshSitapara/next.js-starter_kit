'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation' // ✅ use this instead of `next/router` in App Router
import { AuthService } from '@/lib/useAuth'

type User = {
  name: string
  email: string
}

export function useAuthUser() {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = () => {
      if (AuthService.isAuthenticated()) {
        const userData = AuthService.getAuthUser()
        setUser(userData)
        setIsAuthenticated(true)
      } else {
        setUser(null)
        setIsAuthenticated(false)
      }
      setLoading(false)
    }
    checkAuth()
  }, [router])

  return { user, isAuthenticated, loading }
}
