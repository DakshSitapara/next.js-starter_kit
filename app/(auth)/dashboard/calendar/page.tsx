import CalendarPage from "./CalendarPage"
import ClientOnly from '@/components/ClientOnly'
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Calendar',
  description: 'Manage your events and schedules with our calendar feature.',
};

export default function Page() {
  return (
    <ClientOnly>
      <CalendarPage />
    </ClientOnly>
  )
}