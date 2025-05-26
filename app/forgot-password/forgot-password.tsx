'use client';

import { cn } from '@/lib/utils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { z } from 'zod';

const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
});

const ForgotPasswordForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      // Validate email
      forgotPasswordSchema.parse({ email });

      // Check if user exists in localStorage
      const users = JSON.parse(localStorage.getItem('users') || '[]') as { email: string }[];
      const user = users.find((u) => u.email === email);
      if (!user) {
        throw new Error('Email not found');
      }

      // Redirect to reset password page with email as query parameter
      router.push(`/reset-password?email=${encodeURIComponent(email)}`);
    } catch (error) {
      console.error('Error processing forgot password:', error);
      if (error instanceof z.ZodError) {
        setError(error.errors[0].message);
      } else {
        setError(error instanceof Error ? error.message : 'An unexpected error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn('flex flex-col gap-6 items-center justify-center')}>
      <Card className="w-full max-w-md border bg-transparent border-gray-200 dark:border-gray-200 text-black dark:text-black shadow-md">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Forgot your password?</CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-600">
            Enter your email address to reset your password.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} noValidate>
            <div className="grid gap-6">
              {error && <p className="text-red-500 text-sm text-center">{error}</p>}
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  aria-invalid={!!error}
                  aria-describedby={error ? 'email-error' : undefined}
                  className="bg-transparent !text-black !border-gray-300 !placeholder-gray-500 dark:!text-black dark:!border-gray-300 dark:!placeholder-gray-500 !ring-0 !shadow-none !transition-none"
                  data-testid="email-input"
                />
              </div>
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full dark:!bg-black dark:text-white"
                aria-label="Continue"
              >
                {isLoading ? 'Processing...' : 'Continue'}
              </Button>
              <div className="text-center text-sm">
                <Link
                  href="/login"
                  className="text-sm underline-offset-4 hover:underline text-blue-600 dark:text-blue-600"
                >
                  Back to Login
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our{' '}
        <a href="#" className="text-blue-600 dark:text-blue-600">
          Terms of Service
        </a>{' '}
        and{' '}
        <a href="#" className="text-blue-600 dark:text-blue-600">
          Privacy Policy
        </a>.
      </div>
    </div>
  );
};

export default ForgotPasswordForm;