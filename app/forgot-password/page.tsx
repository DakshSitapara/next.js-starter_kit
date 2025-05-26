
import  ForgotPasswordForm  from "@/app/forgot-password/forgot-password"

export default function ForgotPasswordPage() {
  return (
    <div className="bg-gradient-to-br from-teal-50 via-teal-100 to-teal-200 flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
   
        <ForgotPasswordForm />
        
      </div>
    </div>
  )
}
