'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import DashboardSidebar from '@/components/dashboard-sidebar';
import { Separator } from '@/components/ui/separator';
import { Breadcrumb, BreadcrumbItem, BreadcrumbList } from '@/components/ui/breadcrumb';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';
import { MessageCircleQuestion, Sun, Moon } from 'lucide-react';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { toast } from 'react-hot-toast';
import Link from "next/link";

const routeMap: { [key: string]: string } = {
  '/home': 'Home',
  '/inbox': 'Inbox',
  '/calendar': 'Calendar',
  '/settings': 'Settings',
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [activeItem, setActiveItem] = useState('');
  const { theme, setTheme } = useTheme();
  const [isReady, setIsReady] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const user = localStorage.getItem('authUser');
    if (!user) {
      router.replace('/login');
    } else {
      setIsAuthenticated(true);
    }
    setIsReady(true);
  }, [router]);

  useEffect(() => {
    const currentItem = routeMap[pathname] || 'Home';
    setActiveItem(currentItem);
  }, [pathname]);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    toast.success(`Switched to ${newTheme} mode`);
  };

  if (!isReady || isAuthenticated === null) {
    return (
      <div className="flex items-center justify-center h-screen bg-background">
        <div className="animate-spin h-8 w-8 border-t-2 border-b-2 border-primary rounded-full" />
      </div>
    );
  }

  return (
    <SidebarProvider>
      <DashboardSidebar activeItem={activeItem} setActiveItem={setActiveItem} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between px-4 bg-zinc-100 dark:bg-neutral-900">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">{activeItem}</BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/about-us">
                <Button aria-label="About Us" size="icon" variant="ghost">
                  <MessageCircleQuestion className="h-6 w-6" />
                </Button>
            </Link>
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </div>
        </header>

        <ScrollArea className="h-[calc(100vh-4rem)] w-full">
          <main className="flex flex-1 flex-col gap-4 p-4 pt-0">
            {children}
          </main>
          <ScrollBar orientation="vertical" className="hidden" />
        </ScrollArea>
      </SidebarInset>
    </SidebarProvider>
  );
}
