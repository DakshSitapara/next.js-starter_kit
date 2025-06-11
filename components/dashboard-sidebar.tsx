'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import {
  Calendar, Home, Inbox, MessageCircleQuestion, Settings, LogOut
} from 'lucide-react';

import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent,
  SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem,
} from '@/components/ui/sidebar';
import {
  HoverCard, HoverCardContent, HoverCardTrigger
} from '@/components/ui/hover-card';
import {
  AlertDialog, AlertDialogTrigger, AlertDialogContent,
  AlertDialogHeader, AlertDialogTitle, AlertDialogFooter,
  AlertDialogCancel, AlertDialogAction,
} from '@/components/ui/alert-dialog';
import { AuthService } from '@/lib/useAuth';
import { Button } from '@/components/ui/button';

const allItems = [
  { title: 'Home', url: '/dashboard/Home', icon: Home },
  { title: 'Inbox', url: '/dashboard/inbox', icon: Inbox },
  { title: 'Calendar', url: '/dashboard/calendar', icon: Calendar },
  { title: 'Settings', url: '/dashboard/settings', icon: Settings },
  { title: 'About Us', url: '/dashboard/about-us', icon: MessageCircleQuestion },
];

const allowedRoutesForUnauthenticated = ['/dashboard/about-us'];

const getAvatarColor = (letter: string): string => {
  const colors = [
    'bg-red-600', 'bg-blue-600', 'bg-green-600', 'bg-purple-600', 'bg-orange-600',
    'bg-indigo-600', 'bg-pink-600', 'bg-teal-600', 'bg-cyan-600', 'bg-amber-600',
    'bg-lime-600', 'bg-emerald-600', 'bg-violet-600', 'bg-fuchsia-600', 'bg-rose-600',
  ];
  const index = letter.toUpperCase().charCodeAt(0) - 65;
  return colors[index % colors.length] || 'bg-gray-600';
};

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
    : allItems.filter(item => allowedRoutesForUnauthenticated.includes(item.url));

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

  const getInitial = (): string => {
    return user?.name?.charAt(0).toUpperCase() || 'G';
  };

  const initial = getInitial();
  const avatarColor = getAvatarColor(initial);

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
            <HoverCard openDelay={200} closeDelay={200}>
              <HoverCardTrigger asChild>
                <SidebarMenuButton className="flex items-center gap-3 px-4 py-6 rounded-lg hover:bg-gray-100">
                  <div className={`h-9 w-9 rounded-full flex items-center justify-center text-white text-base font-semibold ${avatarColor}`}>
                    {initial}
                  </div>
                  <span className="text-sm font-semibold truncate max-w-[120px]">
                    {user?.name || 'Guest'}
                  </span>
                </SidebarMenuButton>
              </HoverCardTrigger>

              <HoverCardContent className="w-64 bg-white dark:bg-gray-800 border rounded-lg shadow-xl p-4 space-y-2">
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
              </HoverCardContent>
            </HoverCard>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
