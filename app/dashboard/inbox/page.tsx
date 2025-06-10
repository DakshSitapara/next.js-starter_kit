import InboxPage from "./inbox";
import ClientOnly from '@/components/ClientOnly'
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Inbox',
  description: 'Manage your messages and stay updated.',
};

export default function Page() {
  return (
    <ClientOnly>
      <InboxPage />
    </ClientOnly>
  )
}