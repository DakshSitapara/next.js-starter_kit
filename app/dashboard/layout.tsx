'use client';

import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import DashboardSidebar from '@/components/dashboard-sidebar';
import { Separator } from '@/components/ui/separator';
import { useState, useEffect } from 'react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbList } from '@/components/ui/breadcrumb';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { toast } from 'react-hot-toast';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [activeItem, setActiveItem] = useState('');
  const { theme, setTheme } = useTheme();
  const [isReady, setIsReady] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  // const [showAccessDenied, setShowAccessDenied] = useState(false);
  // const [restrictedPageName, setRestrictedPageName] = useState('');
  // const [remainingSeconds, setRemainingSeconds] = useState(2);

  // Define allowed routes for unauthenticated users
  const allowedRoutesForUnauthenticated = ['/dashboard/home', '/dashboard/about-us'];

  // Route to page name mapping
  const routeMap: { [key: string]: string } = {
    '/dashboard/Home': 'Home',
    '/dashboard/inbox': 'Inbox',
    '/dashboard/calendar': 'Calendar',
    '/dashboard/settings': 'Settings',
    '/dashboard/about-us': 'About Us',
  };

  // Check authentication status and client readiness
  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
    setIsReady(true);
  }, []);

  // Set active item based on pathname
  useEffect(() => {
    const currentItem = routeMap[pathname] || 'Home';
    setActiveItem(currentItem);
  }, [pathname]);

  // Handle access restriction for unauthenticated users
  // useEffect(() => {
  //   if (isReady && isAuthenticated === false && !allowedRoutesForUnauthenticated.includes(pathname)) {
  //     setRestrictedPageName(routeMap[pathname] || 'Page');
  //     setShowAccessDenied(true);
  //     setRemainingSeconds(0); // Reset countdown

  //     const interval = setInterval(() => {
  //       setRemainingSeconds((prev) => {
  //         if (prev <= 1) {
  //           clearInterval(interval);
  //           setShowAccessDenied(false);
  //           router.push('/dashboard/Home');
  //           return 0;
  //         }
  //         return prev - 1;
  //       });
  //     }, 1);

  //     return () => clearInterval(interval);
  //   }
  // }, [isReady, isAuthenticated, pathname, router]);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    toast.success(`Switched to ${newTheme} mode`);
  };

  if (!isReady || isAuthenticated === null) {
    return <div className="h-screen bg-background animate-pulse" />;
  }

  // if (showAccessDenied) {
  //   return (
  //     <div className="h-screen flex items-center justify-center bg-background">
  //       <div className="text-center p-6 rounded-lg bg-white dark:bg-neutral-900 shadow-md">
  //         <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
  //           Access Denied
  //         </h2>
  //         <p className="text-gray-600 dark:text-gray-400">
  //           Login to access this page ({restrictedPageName}).
  //         </p>
  //         <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
  //           Redirecting to Home in {remainingSeconds} second{remainingSeconds !== 1 ? 's' : ''}...
  //         </p>
  //       </div>
  //     </div>
  //   );
  // }
  
  return (
    <SidebarProvider>
      <DashboardSidebar activeItem={activeItem} setActiveItem={setActiveItem} />
      <SidebarInset>
        <header className="flex flex-fixed top-0 h-16 shrink-0 items-center justify-between px-4 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 bg-zinc-100 dark:bg-neutral-900">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">{activeItem}</BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </div>
        </header>
        <ScrollArea className="h-[calc(100vh-4rem)] w-full scrollbar-hidden">
          <main className="flex flex-1 flex-col gap-4 p-4 pt-0">
            {children}
          </main>
          <ScrollBar orientation="vertical" className="hidden" />
        </ScrollArea>
      </SidebarInset>
    </SidebarProvider>
  );
}