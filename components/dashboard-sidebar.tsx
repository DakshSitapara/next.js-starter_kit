'use client';

import * as React from 'react';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import toast from 'react-hot-toast';
import Link from 'next/link';
import {
  Calendar,
  Home,
  Inbox,
  MessageCircleQuestion,
  Settings,
  User2,
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';

const allItems = [
  { title: 'Home', url: '/dashboard/home', icon: Home },
  { title: 'Inbox', url: '/dashboard/inbox', icon: Inbox },
  { title: 'Calendar', url: '/dashboard/calendar', icon: Calendar },
  { title: 'Settings', url: '/dashboard/settings', icon: Settings },
  { title: 'About Us', url: '/dashboard/about-us', icon: MessageCircleQuestion },
];

// Define allowed routes for unauthenticated users
const allowedRoutesForUnauthenticated = ['/dashboard/home', '/dashboard/about-us'];

export default function DashboardSidebar({
  activeItem,
  setActiveItem,
}: {
  activeItem: string;
  setActiveItem: (item: string) => void;
}) {
  const [email, setEmail] = useState<string | null>(null);
  const [user, setUser] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      const parsed = JSON.parse(currentUser);
      setIsAuthenticated(true);
      setEmail(parsed.email);
      setUser(parsed.user);
    } else {
      setIsAuthenticated(false);
      setEmail(null);
      setUser(null);
    }
  }, []);

  // Filter sidebar items based on authentication status
  const items = isAuthenticated
    ? allItems
    : allItems.filter((item) =>
        allowedRoutesForUnauthenticated.includes(item.url)
      );

  // Update active item based on pathname
  useEffect(() => {
    const currentItem = items.find((item) => item.url === pathname);
    if (currentItem && currentItem.title !== activeItem) {
      setActiveItem(currentItem.title);
    }
  }, [pathname, activeItem, setActiveItem, items]);

  if (isAuthenticated === null) {
    return null;
  }

  return (
    <Sidebar collapsible="icon">
      <SidebarContent className="flex flex-col h-full justify-between">
        <div>
          <SidebarGroup>
            <SidebarGroupLabel className="text-2xl mb-2">Dashboard</SidebarGroupLabel>
            <SidebarGroupContent className="mt-2">
              <SidebarMenu className="space-y-1">
                {items.map((item, index) => {
                  const isActive = activeItem === item.title;
                  const Icon = item.icon;

                  return (
                    <SidebarMenuItem
                      key={item.title}
                      className={`animate-stagger-${Math.min(index + 1, 3)}`}
                    >
                      <SidebarMenuButton
                        asChild
                        isActive={isActive}
                        className="w-full justify-start transition-all duration-200"
                      >
                        <Link
                          href={item.url}
                          onClick={() => setActiveItem(item.title)}
                          className={`group flex items-center gap-3 px-3 py-3 rounded-lg relative overflow-hidden
                            ${isActive ? 'bg-blue-50' : 'hover:bg-blue-50'}`}
                        >
                          {isActive && (
                            <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-blue-600 to-purple-600 rounded-r-full" />
                          )}
                          <Icon
                            className={`h-5 w-5 transition-colors duration-200 
                              ${isActive ? 'text-blue-600' : 'text-gray-500 '}`}
                          />
                          <span
                            className={`font-medium transition-colors duration-200 
                              ${isActive ? 'text-blue-600' : 'text-gray-700 '}`}
                          >
                            {item.title}
                          </span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </div>

        <SidebarGroupContent className="mt-4 border-t pt-4 items-center">
          <HoverCard>
            <HoverCardTrigger asChild>
              <SidebarMenuButton className="flex items-center gap-2 px-3 rounded-lg transition-all group hover:bg-gray-100">
                <div className="h-10 w-10 rounded-full flex items-center justify-center shadow-md">
                  <User2 className="h-5 w-5 text-gray-700 transition-colors duration-200 " />
                </div>
                <span className="text-sm font-medium transition-colors duration-200 ">
                  {isAuthenticated ? (email || 'User') : 'Guest'}
                </span>
              </SidebarMenuButton>
            </HoverCardTrigger>
            <HoverCardContent className="bg-white dark:bg-zinc-900 p-4 rounded-md shadow-md space-y-1 w-56">
              {isAuthenticated ? (
                <>
                  <div className="px-3 py-2 text-gray-700 dark:text-gray-300">
                    {user || 'User'}
                  </div>
                  <div
                    className="cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800 px-3 py-2 rounded-md"
                    onClick={() => {
                      localStorage.removeItem('currentUser');
                      toast.success('Logout successfully!');
                      router.push('/login');
                    }}
                  >
                    Logout
                  </div>
                </>
              ) : (
                <div
                  className="cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800 px-3 py-2 rounded-md"
                  onClick={() => router.push('/login')}
                >
                  Login
                </div>
              )}
            </HoverCardContent>
          </HoverCard>
        </SidebarGroupContent>
      </SidebarContent>
    </Sidebar>
  );
}