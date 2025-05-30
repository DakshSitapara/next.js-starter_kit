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
import { usePathname } from 'next/navigation';
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { toast } from 'react-hot-toast';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [activeItem, setActiveItem] = useState('');
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const routeMap: { [key: string]: string } = {
      '/dashboard/home': 'Home',
      '/dashboard/inbox': 'Inbox',
      '/dashboard/calendar': 'Calendar',
      '/dashboard/search': 'Search',
      '/dashboard/settings': 'Settings',
      '/dashboard/about-us': 'About Us',
    };
    const currentItem = routeMap[pathname] || 'Home';
    setActiveItem(currentItem);
  }, [pathname]);

const toggleTheme = () => {
  const newTheme = theme === 'dark' ? 'light' : 'dark';
  setTheme(newTheme);
  toast.success(`Switched to ${newTheme} mode`);
};

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
            <ScrollArea className="h-168 w-full scrollbar-hidden">
        <main className="flex flex-1 flex-col gap-4 p-4 pt-0">
          {children}
        </main>
          <ScrollBar orientation="vertical" className="hidden" />
        </ScrollArea>
      </SidebarInset>
    </SidebarProvider>
     
  );
}