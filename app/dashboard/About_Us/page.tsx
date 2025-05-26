"use client"

import { Separator } from "@/components/ui/separator"

export default function AboutUsPage() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold">About Us</h1>
      <Separator className="my-4" />
      <p className="text-muted-foreground">
        This app was built to demonstrate a modern dashboard interface using Next.js,
        React, and Tailwind CSS. It includes a collapsible sidebar, theming options,
        and modular components.
      </p>
    </div>
  )
}
