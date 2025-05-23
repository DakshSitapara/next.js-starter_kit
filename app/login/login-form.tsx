'use client';

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from 'next/navigation';


const LoginForm = () => {
    const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("Login successful");
    router.push('/dashboard');
  };

  return (
<div className={cn("flex flex-col gap-6 items-center justify-center")}>
  <Card className="w-full max-w-md border bg-transparent border-gray-200 dark:border-gray-200 text-black dark:text-black shadow-md">
    <CardHeader className="text-center">
      <CardTitle className="text-xl">Welcome back</CardTitle>
      
    </CardHeader>
    <CardContent>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-6">
          <div className="grid gap-6">
            <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                className="bg-transparent !text-black !border-gray-300 !placeholder-gray-500  dark:!text-black dark:!border-gray-300 dark:!placeholder-gray-500 !ring-0 !shadow-none !transition-none"
              />
            </div>
            <div className="grid gap-3">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <a
                  href="/forgot_password"
                  className="ml-auto text-sm underline-offset-4 hover:underline text-blue-600 dark:text-blue-600"
                >
                  Forgot your password?
                </a>
              </div>
              <Input
                id="password"
                type="password"
                required
                className="bg-transparent !text-black !border-gray-300 !placeholder-gray-500  dark:!text-black dark:!border-gray-300 dark:!placeholder-gray-500 !ring-0 !shadow-none !transition-none"
              />
            </div>
            <Button
              type="submit"
              className="w-full dark:!bg-black dark:text-white"
            >
              Login
            </Button>
          </div>
          <div className="text-center text-sm">
            Don&apos;t have an account?{" "}
            <a
              href="/registr"
              className="ml-auto text-sm underline-offset-4 hover:underline text-blue-600 dark:text-blue-600"
            >
              Register here
            </a>
          </div>
        </div>
      </form>
    </CardContent>
  </Card>
  <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
    By clicking continue, you agree to our{" "}
    <a href="#" className="text-blue-600 dark:text-blue-600">Terms of Service</a>{" "}
    and{" "}
    <a href="#" className="text-blue-600 dark:text-blue-600">Privacy Policy</a>.
  </div>
</div>
  )
}

export default LoginForm;