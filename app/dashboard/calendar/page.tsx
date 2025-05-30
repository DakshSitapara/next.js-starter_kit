import CalendarPage from "./CalendarPage"
import ClientOnly from '@/components/ClientOnly'

export default function Page() {
  return (
    <ClientOnly>
      <CalendarPage />
    </ClientOnly>
  )
}