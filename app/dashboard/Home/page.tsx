"use client"

import { Separator } from "@/components/ui/separator"

export default function HomePage() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold">Welcome to the Dashboard</h1>
      <Separator className="my-4" />
      <p className="text-muted-foreground">
        This is the Home page. Here you can view an overview or analytics of your system.
      </p>
    </div>
  )
}
