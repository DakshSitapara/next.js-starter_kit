'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { Calendar, Home, Inbox, MessageCircleQuestion, Settings } from 'lucide-react';
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
  { title: 'Home', url: '/dashboard/Home', icon: Home },
  { title: 'Inbox', url: '/dashboard/inbox', icon: Inbox },
  { title: 'Calendar', url: '/dashboard/calendar', icon: Calendar },
  { title: 'Settings', url: '/dashboard/settings', icon: Settings },
  { title: 'About Us', url: '/dashboard/about-us', icon: MessageCircleQuestion },
];

const allowedRoutesForUnauthenticated = ['/dashboard/Home', '/dashboard/about-us'];

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

  const items = isAuthenticated
    ? allItems
    : allItems.filter((item) =>
        allowedRoutesForUnauthenticated.includes(item.url)
      );

  useEffect(() => {
    const currentItem = items.find((item) => item.url === pathname);
    if (currentItem && currentItem.title !== activeItem) {
      setActiveItem(currentItem.title);
    }
  }, [pathname, activeItem, setActiveItem, items]);

  const getInitial = (): string => {
    if (user) return user.charAt(0).toUpperCase();
    if (email) return email.charAt(0).toUpperCase();
    return 'G';
  };

  const initial = getInitial();
  const avatarColor = getAvatarColor(initial);

  if (isAuthenticated === null) {
    return null;
  }

  return (
    <Sidebar collapsible="icon">
      <SidebarContent className="flex flex-col h-full justify-between">
        <SidebarGroup>
          <SidebarGroupLabel className="text-3xl font-semibold mb-4">Dashboard</SidebarGroupLabel>
          <SidebarGroupContent className="mt-2">
            <SidebarMenu className="space-y-1">
              {items.map((item, index) => {
                const isActive = activeItem === item.title;
                const Icon = item.icon;
                return (
                  <SidebarMenuItem
                    key={item.title}
                    className={`transition-opacity duration-200 delay-${index * 50} focus:outline-none `}
                  >
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      className="w-full justify-start transition-all duration-200 focus:outline-none hover:text-blue-600"
                    >
                      <Link
                        href={item.url}
                        onClick={() => setActiveItem(item.title)}
                        className={`
                          group flex items-center gap-3 px-4 py-2.5 rounded-lg relative overflow-hidden
                          ${isActive 
                            ? 'bg-blue-50  font-semibold' 
                            : 'text-gray-700 hover:bg-blue-50'
                          }`}
                        aria-current={isActive ? 'page' : undefined}
                      >
                        {isActive && (
                          <span 
                            className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-blue-600 to-purple-600 rounded-r-full" 
                            aria-hidden="true"
                          />
                        )}
                        <Icon
                          className={`
                            h-5 w-5 transition-colors duration-200
                            ${isActive ? 'text-blue-600' : 'text-gray-500 hover:text-black'}
                          `}
                          aria-hidden="true"
                        />
                        <span className="font-medium truncate">
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

        <SidebarGroup>
          <SidebarGroupContent className="border-t pt-2 mt-4">
            <HoverCard openDelay={200} closeDelay={200}>
              <HoverCardTrigger asChild>
                <SidebarMenuButton className="flex items-center gap-3 px-4 py-6 rounded-lg hover:bg-gray-100 focus:outline-none transition-all duration-300">
                  <div className={`h-9 w-9 rounded-full flex items-center justify-center text-white text-base font-semibold ${avatarColor} ring-2 ring-offset-2 ring-gray-200 dark:ring-gray-700 shadow-sm`}>
                    {initial}
                  </div>
                  <span className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate max-w-[120px]">
                    {isAuthenticated ? (user || 'User') : 'Guest'}
                  </span>
                </SidebarMenuButton>
              </HoverCardTrigger>
              <HoverCardContent className="w-64 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl p-4 space-y-2 transition-all duration-200">
                {isAuthenticated ? (
                  <>
                    <div className="flex items-center gap-3 px-2 py-1">
                      <div className={`h-8 w-8 rounded-full flex items-center justify-center text-white text-sm font-semibold ${avatarColor}`}>
                        {initial}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          {user || 'User'}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                          {email || 'No email'}
                        </p>
                      </div>
                    </div>
                    <div
                      className="cursor-pointer px-2 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors duration-200"
                      onClick={() => {
                        localStorage.removeItem('currentUser');
                        toast.success('Logged out successfully');
                        router.push('/login');
                      }}
                    >
                      Sign out
                    </div>
                  </>
                ) : (
                  <div
                    className="cursor-pointer px-2 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors duration-200"
                    onClick={() => router.push('/login')}
                  >
                    Sign in
                  </div>
                )}
              </HoverCardContent>
            </HoverCard>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}