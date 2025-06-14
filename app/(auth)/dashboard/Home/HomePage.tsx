'use client'

// import { useRouter } from 'next/navigation'
// import { useEffect, useState } from 'react'
import { AuthService } from '@/lib/useAuth'
import { SectionCards } from '@/components/section-cards'
import { Button } from '@/components/ui/button'
import { Watch } from 'lucide-react'
import { ChartAreaInteractive } from './chart-area-interactive'
import { useCurrentTime } from '@/hooks/useCurrentTime'
import { useAuthUser } from '@/hooks/useAuthUser'

export default function DashboardPage() {
  const dateTime = useCurrentTime()
  const { user, loading } = useAuthUser();

  if (loading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary" />
      </div>
    )
  }

  return (
    <div className="flex flex-col overflow-hidden text-foreground">
      <main className="flex-1 overflow-y-auto">
        <div className="max-w mx-auto">
          <div className="flex items-center justify-between mb-2 mt-1">
          <div className="flex flex-col">
            <h2 className="text-3xl font-bold">Welcome, {user.name}!</h2>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                  Here's what's happening with your account today.  
              </p>
          </div>
          <div className="flex items-center gap-2 space-x-2 px-2">
            <Button className="relative flex items-center gap-2 group hover:bg-primary transition-all duration-200 ease-in-out px-3 py-2 rounded-md">
              <span className="flex items-center gap-2  group-hover:hidden transition-opacity duration-200 px-1">
                <Watch className="h-4 w-4" />
                Time
              </span>
              <span className="hidden group-hover:inline transition-opacity duration-200 px-1">
                {dateTime}
              </span>
            </Button>
          </div>       
          </div>
          <SectionCards />
          <div className="mt-8">
            <ChartAreaInteractive />
          </div>
        </div>
      </main>
      <footer className=" w-full bg-white dark:bg-zinc-900 shadow px-6 py-4 text-center text-sm text-muted-foreground *:[a]:hover:text-primary text-balance *:[a]:underline *:[a]:underline-offset-4 *:[a]:text-blue-500">
        &copy; {`${new Date().getDate()}-${new Date().getMonth() + 1}-${new Date().getFullYear()}`}. All rights reserved. you agree to our <a href="#">Terms of Service</a>{" "} and <a href="#">Privacy Policy</a>.
      </footer>
    </div>
  )
}