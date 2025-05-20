'use client';

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const RegisterForm = () => {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // handle form submission logic here
    console.log("Form submitted");
  };

  return (
<div className={cn("flex flex-col gap-6 items-center justify-center")}>
  <Card className="w-full max-w-md border bg-transparent border-gray-200 dark:border-gray-200 text-black dark:text-black shadow-md">
    <CardHeader className="text-center">
      <CardTitle className="text-xl">Register Here</CardTitle>
      <CardDescription className="text-gray-600 dark:text-gray-600">
        Enter your details
      </CardDescription>
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
              <Label htmlFor="password">Password</Label>
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
              Register
            </Button>
          </div>
          <div className="text-center text-sm">
            Already have an account?{" "}
            <Link
              href="/login"
              className="underline underline-offset-4 text-blue-600 dark:text-blue-600"
            >
              Login
            </Link>
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
  );
};

export default RegisterForm;
