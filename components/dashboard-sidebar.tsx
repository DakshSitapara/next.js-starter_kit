'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import {
  Calendar, Home, Inbox, Settings, LogOut
} from 'lucide-react';

import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent,
  SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem,
} from '@/components/ui/sidebar';
import {
  Popover,PopoverTrigger,PopoverContent
} from '@/components/ui/popover'
import {
  AlertDialog, AlertDialogTrigger, AlertDialogContent,
  AlertDialogHeader, AlertDialogTitle, AlertDialogFooter,
  AlertDialogCancel, AlertDialogAction,
} from '@/components/ui/alert-dialog';
import { AuthService } from '@/lib/useAuth';
import { Button } from '@/components/ui/button';
import { useUserInitial } from '@/hooks/useUserInitial';

const allItems = [
  { title: 'Home', url: '/home', icon: Home },
  { title: 'Inbox', url: '/inbox', icon: Inbox },
  { title: 'Calendar', url: '/calendar', icon: Calendar },
  { title: 'Settings', url: '/settings', icon: Settings },
];

export default function DashboardSidebar({
  activeItem,
  setActiveItem,
}: {
  activeItem: string;
  setActiveItem: (item: string) => void;
}) {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (AuthService.isAuthenticated()) {
      const userData = AuthService.getAuthUser();
      setUser(userData);
      setIsAuthenticated(true);
    } else {
      setUser(null);
      setIsAuthenticated(false);
    }
  }, []);

  const items = isAuthenticated
    ? allItems
    : allItems.filter(item => item.title !== 'About Us');
  useEffect(() => {
    const currentItem = items.find(item => item.url === pathname);
    if (currentItem && currentItem.title !== activeItem) {
      setActiveItem(currentItem.title);
    }
  }, [pathname, activeItem, setActiveItem, items]);

  const handleLogout = () => {
    AuthService.logout();
    toast.success('Logged out successfully');
    router.replace('/login');
  };

const { initial, avatarColor } = useUserInitial(user?.name, user?.email);

  if (isAuthenticated === null) return null;

  return (
    <Sidebar className="h-screen" collapsible="icon">
      <SidebarContent className="flex flex-col h-full justify-between">
        <SidebarGroup>
          <SidebarGroupLabel className="text-3xl font-semibold mb-4">Dashboard</SidebarGroupLabel>
          <SidebarGroupContent className="mt-2">
            <SidebarMenu className="space-y-1">
              {items.map((item) => {
                const isActive = activeItem === item.title;
                const Icon = item.icon;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      className="w-full justify-start hover:text-blue-600"
                    >
                      <Link
                        href={item.url}
                        onClick={() => setActiveItem(item.title)}
                        className={`
                          group flex items-center gap-3 px-4 py-2.5 rounded-lg relative
                          ${isActive ? 'bg-blue-50 font-semibold' : 'text-gray-700 hover:bg-blue-50'}
                        `}
                      >
                        {isActive && (
                          <span className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-blue-600 to-purple-600 rounded-r-full" />
                        )}
                        <Icon
                          className={`h-5 w-5 ${isActive ? 'text-blue-600' : 'text-gray-500'}`}
                        />
                        <span className="truncate">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupContent className="border-t pt-2 mt-4">
            <Popover>
              <PopoverTrigger asChild>
                <SidebarMenuButton className="flex items-center gap-3 px-4 py-6 rounded-lg hover:bg-gray-100">
                  <div className={`h-9 w-9 rounded-full flex items-center justify-center text-white text-base font-semibold ${avatarColor}`}>
                    {initial}
                  </div>
                  <span className="text-sm font-semibold truncate max-w-[120px]">
                    {user?.name || 'Guest'}
                  </span>
                </SidebarMenuButton>
              </PopoverTrigger>

              <PopoverContent className="w-64 bg-white dark:bg-gray-800 border rounded-lg shadow-xl p-4 space-y-2">
                {isAuthenticated && user ? (
                  <>
                    <div className="flex items-center gap-3">
                      <div className={`h-8 w-8 rounded-full flex items-center justify-center text-white text-sm font-semibold ${avatarColor}`}>
                        {initial}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{user.name}</p>
                        <p className="text-xs text-gray-500 truncate">{user.email}</p>
                      </div>
                    </div>

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" className="w-full text-sm flex gap-2 items-center mt-2">
                          <LogOut className="h-4 w-4" />
                          Log out
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="sm:max-w-sm">
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure you want to log out?</AlertDialogTitle>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={handleLogout}
                            className="bg-red-500 text-white hover:bg-white/90 hover:text-red-500"
                          >
                            Yes, Logout
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </>
                ) : (
                  <Button onClick={() => router.push('/login')} className="w-full text-sm">Sign In</Button>
                )}
              </PopoverContent>
            </Popover>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
