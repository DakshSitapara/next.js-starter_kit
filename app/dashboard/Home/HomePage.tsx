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
const getAvatarColor = (letter: string): string => {
  const colors = [
    'bg-red-600', 'bg-blue-600', 'bg-green-600', 'bg-purple-600', 'bg-orange-600',
    'bg-indigo-600', 'bg-pink-600', 'bg-teal-600', 'bg-cyan-600', 'bg-amber-600',
    'bg-lime-600', 'bg-emerald-600', 'bg-violet-600', 'bg-fuchsia-600', 'bg-rose-600',
  ];
  const index = letter.toUpperCase().charCodeAt(0) - 65;
  return colors[index % colors.length] || 'bg-gray-600';
};

export default function DashboardPage() {
  const router = useRouter()
  const [email, setEmail] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

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

  
  const handleLogout = async () => {
    try {
      AuthService.logout()
      router.replace('/login')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const getInitial = (): string => {
    if (user) return user.name.charAt(0).toUpperCase();
    if (email) return email.charAt(0).toUpperCase();
    return 'G';
  };
 
  const initial = getInitial();
  const avatarColor = getAvatarColor(initial);
  if (isLoading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary" />
      </div>
    )
  }

return (
  <div className="flex flex-col h-screen overflow-hidden text-foreground">
    <main className="flex-1 overflow-y-auto px-6">
      <div className="max-w mx-auto">
        <h2 className="text-2xl font-semibold mb-6">Welcome, {user.name}!</h2>
        <SectionCards />
        <div className="mt-8">
          <ChartAreaInteractive />
        </div>
      </div>
    </main>
    <footer className="w-full bg-white dark:bg-zinc-900 shadow px-6 py-4 text-center text-sm text-muted-foreground *:[a]:hover:text-primary text-balance *:[a]:underline *:[a]:underline-offset-4 *:[a]:text-blue-500">
      &copy; {new Date().getFullYear()}. All rights reserved. you agree to our <a href="#">Terms of Service</a>{" "} and <a href="#">Privacy Policy</a>.
    </footer>
  </div>
)
}