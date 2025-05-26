'use client'

import { Calendar, Home, icons, Inbox, Search, Settings, User2,MessageCircleQuestion } from "lucide-react"
import { useState, useEffect } from "react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar"

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import toast from "react-hot-toast"

const items = [
  { title: "Home", url: "/dashboard/Home", icon: Home },
  { title: "About Us", url:"/dashboard/About Us", icon: MessageCircleQuestion },
//   { title: "Inbox", url: "#", icon: Inbox },
//   { title: "Calendar", url: "#", icon: Calendar },
//   { title: "Search", url: "#", icon: Search },
//   { title: "Settings", url: "#", icon: Settings },

]

// const data = {
//   "navMain": [
//     { "title": "Home", "url": "#" },
//     {
//       "title": "Getting Started",
//       "url": "#",
//       "items": [
//         { "title": "Installation", "url": "#" },
//         { "title": "Project Structure", "url": "#" }
//       ]
//     },
//     {
//       "title": "Building Your Application",
//       "url": "#",
//       "items": [
//         { "title": "Routing", "url": "#" },
//         { "title": "Data Fetching", "url": "#" },
//         { "title": "Rendering", "url": "#" },
//         { "title": "Caching", "url": "#" },
//         { "title": "Styling", "url": "#" },
//         { "title": "Optimizing", "url": "#" },
//         { "title": "Configuring", "url": "#" },
//         { "title": "Testing", "url": "#" },
//         { "title": "Authentication", "url": "#" },
//         { "title": "Deploying", "url": "#" },
//         { "title": "Upgrading", "url": "#" },
//         { "title": "Examples", "url": "#" }
//       ]
//     },
//     {
//       "title": "API Reference",
//       "url": "#",
//       "items": [
//         { "title": "Components", "url": "#" },
//         { "title": "File Conventions", "url": "#" },
//         { "title": "Functions", "url": "#" },
//         { "title": "next.config.js Options", "url": "#" },
//         { "title": "CLI", "url": "#" },
//         { "title": "Edge Runtime", "url": "#" }
//       ]
//     },
//     {
//       "title": "Architecture",
//       "url": "#",
//       "items": [
//         { "title": "Accessibility", "url": "#" },
//         { "title": "Fast Refresh", "url": "#" },
//         { "title": "Next.js Compiler", "url": "#" },
//         { "title": "Supported Browsers", "url": "#" },
//         { "title": "Turbopack", "url": "#" }
//       ]
//     },
//     {
//       "title": "Community",
//       "url": "#",
//       "items": [
//         { "title": "Contribution Guide", "url": "#" }
//       ]
//     }
//   ]
// }

export function DashboardSidebar() {
  const [email, setEmail] = useState<string | null>(null)

  useEffect(() => {
    const user = localStorage.getItem("currentUser")
    if (user) {
      const parsed = JSON.parse(user)
      setEmail(parsed.email)
    }
  }, [])

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-2xl">Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
                {/* <SidebarMenu>
            {data.navMain.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <a href={item.url} className="font-medium">
                    {item.title}
                  </a>
                </SidebarMenuButton>
                {item.items?.length ? (
                  <SidebarMenuSub>
                    {item.items.map((item) => (
                      <SidebarMenuSubItem key={item.title}>
                        <SidebarMenuSubButton asChild>
                          <a href={item.url}>{item.title}</a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                ) : null}
              </SidebarMenuItem>
            ))} */}

              <HoverCard>
                <HoverCardTrigger asChild>
                  <SidebarMenuButton>
                    <User2 className="mr-2" />
                    {email || "User"}
                  </SidebarMenuButton>
                </HoverCardTrigger>
                <HoverCardContent className="bg-white dark:bg-zinc-900 p-4 rounded-md shadow-md space-y-1 w-50">
                  <div className="cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800 px-3 py-2 rounded-md">
                    Account
                  </div>
                  <div
                    className="cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800 px-3 py-2 rounded-md"
                    onClick={() => {
                      localStorage.removeItem("currentUser")
                      window.location.href = "/login"
                        toast.success('Logout successfully!');

                    }}
                  >
                    Logout
                  </div>
                </HoverCardContent>
              </HoverCard>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
