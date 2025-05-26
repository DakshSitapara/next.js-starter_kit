// app/dashboard/layout.tsx
import { SidebarProvider } from "@/components/ui/sidebar"
import { SidebarInset } from "@/components/ui/sidebar"
import DashboardSidebar from "@/app/dashboard/page"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <SidebarInset>
        <header className="flex flex-fix items-center justify-between ">
          {/* Header content like breadcrumb and toggleTheme */}
        </header>
        
        <main>
          {children} {/* Dynamic page content */}
          
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
