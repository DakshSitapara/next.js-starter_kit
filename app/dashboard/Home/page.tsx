import Dashboard01 from "./HomePage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Home',
  description: 'Welcome to your dashboard! Here you can manage your account, view statistics, and access various features.',
};

export default function Page() {
  return (
   <Dashboard01 />
  );
}
