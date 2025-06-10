'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { AuthService } from '@/lib/useAuth'
import { SectionCards } from '@/components/section-cards'
import { ChartAreaInteractive } from '@/app/dashboard/Home/chart-area-interactive'

interface User {
  name: string
  email: string
}

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [dateTime, setDateTime] = useState<string>(() => {
    const now = new Date()
    return formatDateTime(now)
  })

  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (!AuthService.isAuthenticated()) {
          router.replace('/login')
        } else {
          const userData = AuthService.getAuthUser()
          setUser(userData)
        }
      } finally {
        setIsLoading(false)
      }
    }
    checkAuth()
  }, [router])

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(formatDateTime(new Date()))
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  function formatDateTime(date: Date) {
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    const seconds = String(date.getSeconds()).padStart(2, '0')
    return ` ${hours}:${minutes}:${seconds}`
  }

  if (isLoading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary" />
      </div>
    )
  }

  return (
    <div className="flex flex-col overflow-hidden text-foreground">
      <main className="flex-1 overflow-y-auto px-6">
        <div className="max-w mx-auto">
          <div className="flex items-center justify-between mb-2 mt-1">
            <h2 className="text-3xl font-semibold">Welcome, {user.name}!</h2>
              <span className="text-1xl font-medium text-gray-600 dark:text-gray-300 whitespace-pre-line">
                {dateTime}
              </span>
          </div>
          <SectionCards />
          <div className="mt-8">
            <ChartAreaInteractive />
          </div>
        </div>
      </main>
      <footer className="w-full bg-white dark:bg-zinc-900 shadow px-6 py-4 text-center text-sm text-muted-foreground *:[a]:hover:text-primary text-balance *:[a]:underline *:[a]:underline-offset-4 *:[a]:text-blue-500">
        &copy; {`${new Date().getDate()}-${new Date().getMonth() + 1}-${new Date().getFullYear()}`}. All rights reserved. you agree to our <a href="#">Terms of Service</a>{" "} and <a href="#">Privacy Policy</a>.
      </footer>
    </div>
  )
}