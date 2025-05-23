'use client';

import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";

const ForgotPasswordFrom = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Password reset link sent to:", email);
  };

  return (
<div className={cn("flex flex-col gap-6 items-center justify-center")}>
  <Card className="w-full max-w-md border bg-transparent border-gray-200 dark:border-gray-200 text-black dark:text-black shadow-md">
    <CardHeader className="text-center">
      <CardTitle className="text-xl">Forgot your password?</CardTitle>
      <CardDescription className="text-gray-600 dark:text-gray-600">
        Enter your email address and we’ll send you a link to reset your password.
      </CardDescription>
    </CardHeader>
    <CardContent>
      <form onSubmit={handleSubmit} className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className=" bg-transparent !text-black !border-gray-300 !placeholder-gray-500 dark:!text-black dark:!border-gray-300 dark:!placeholder-gray-500 !ring-0 !shadow-none !transition-none"
          />
        </div>
        <Button type="submit" className="w-full dark:!bg-black  dark:text-white">
          Send Reset Link
        </Button>
        <div className="text-center text-sm">
          <Link href="/login" className="uml-auto text-sm underline-offset-4 hover:underline text-blue-600 dark:text-blue-600">
            Back to Login
          </Link>
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

export default ForgotPasswordFrom;
