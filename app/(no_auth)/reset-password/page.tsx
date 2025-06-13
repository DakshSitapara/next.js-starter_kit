// import { GalleryVerticalEnd } from "lucide-react"
import { Suspense } from 'react';
import ResetPasswordPage  from "./reset-password"
import type { Metadata } from "next";

export const metadata: Metadata = {      
  title: "Reset Password",            
  description: "Reset your password to regain access to your account.",  
};

export default function RegistrPage() {
  return (
    <div className="bg-gradient-to-br from-teal-50 via-teal-100 to-teal-200 flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        {/* <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
            <GalleryVerticalEnd className="size-4" />
          </div>
          Acme Inc.
        </a> */} 
        <Suspense fallback={<div>Loading...</div>}>
          <ResetPasswordPage />
        </Suspense>
      </div>
    </div>
  )
}
