import SettingsPage from "./SettingsPage";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: 'Settings',    
  description: 'Manage your account settings and preferences.',
};
export default function Page() {
  return (
    <SettingsPage />
  );
}