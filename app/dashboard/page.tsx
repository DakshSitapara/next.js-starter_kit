'use client'

import * as React from "react"
import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import Link from "next/link"
import {
  Calendar,
  Home,
  Inbox,
  MessageCircleQuestion,
  Moon,
  Search,
  Settings,
  Sun,
  User2,
} from "lucide-react"

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
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
} from "@/components/ui/breadcrumb"

import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

import { Button } from "@/components/ui/button"

const items = [
  { title: "Home", url: "/dashboard/Home", icon: Home },
  { title: "Inbox", url: "/dashboard/Inbox", icon: Inbox },
  { title: "Calendar", url: "/dashboard/Calendar", icon: Calendar },
  { title: "Search", url: "/dashboard/Search", icon: Search },
  { title: "Settings", url: "/dashboard/Settings", icon: Settings },
  { title: "About Us", url: "/dashboard/About_Us", icon: MessageCircleQuestion },
]
// const items = [
//   { title: "Home", url: "#", icon: Home },
//   { title: "Inbox", url: "#", icon: Inbox },
//   { title: "Calendar", url: "#", icon: Calendar },
//   // { title: "Search", url: "#", icon: Search },
//   { title: "Settings", url: "#", icon: Settings },
//   { title: "About Us", url: "#", icon: MessageCircleQuestion },
// ]

function DashboardSidebar({
  activeItem,
  setActiveItem,
}: {
  activeItem: string
  setActiveItem: (item: string) => void
}) {
  const [email, setEmail] = useState<string | null>(null)
  const router = useRouter()

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
          <SidebarGroupLabel className="text-2xl mb-2">Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                        href={item.url}
                        onClick={() => setActiveItem(item.title)}
                        className={`flex items-center gap-2 ${
                          activeItem === item.title ? "text-primary font-semibold" : ""
                        }`}
                      >
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}

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
                      toast.success("Logout successfully!")
                      router.push("/login")
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

export default function Page() {
  const { theme, setTheme } = useTheme()
  const [activeItem, setActiveItem] = useState("Home")

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <SidebarProvider>
      <DashboardSidebar activeItem={activeItem} setActiveItem={setActiveItem} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between px-4 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
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

          {/* Search */}
          {/* <div className="relative hidden sm:block">
          <Search className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search items..."
            className="w-64 pl-10 pr-4 py-2 rounded-md border border-gray-300 bg-white text-black placeholder-gray-500 
                      dark:bg-zinc-900 dark:text-white dark:placeholder-gray-400 
                      focus:outline-none focus:ring-2 focus:ring-gray-300"
          />
          </div> */}

          {/* Theme toggle */}
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
          </Button>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="bg-muted/50 aspect-video rounded-xl" />
            <div className="bg-muted/50 aspect-video rounded-xl" />
            <div className="bg-muted/50 aspect-video rounded-xl" />
          </div>
          <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
