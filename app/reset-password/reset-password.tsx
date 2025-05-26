'use client';

import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { z } from 'zod';

// Simple hash function (from your existing setup)
const simpleHash = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return hash.toString();
};

const resetPasswordSchema = z.object({
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const ResetPasswordForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsLoading(true);

    try {
      // Validate password
      resetPasswordSchema.parse({ password });

      // Check if email is provided and exists in localStorage
      if (!email) {
        throw new Error('Invalid or missing email');
      }

      const users = JSON.parse(localStorage.getItem('users') || '[]') as { email: string; password: string }[];
      const userIndex = users.findIndex((u) => u.email === email);
      if (userIndex === -1) {
        throw new Error('User not found');
      }

      // Update password in localStorage
      users[userIndex].password = simpleHash(password);
      localStorage.setItem('users', JSON.stringify(users));

      setSuccess('Password reset successfully. Redirecting to login...');
      setTimeout(() => router.push('/login'), 2000);
    } catch (error) {
      console.error('Error resetting password:', error);
      if (error instanceof z.ZodError) {
        setError(error.errors[0].message);
      } else {
        setError(error instanceof Error ? error.message : 'An unexpected error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (!email) {
    return <p className="text-red-500 text-center">Invalid or missing email.</p>;
  }

  return (
    <div className={cn('flex flex-col gap-6 items-center justify-center')}>
      <Card className="w-full max-w-md border bg-transparent border-gray-200 dark:border-gray-200 text-black dark:text-black shadow-md">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Reset Password</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} noValidate>
            <div className="grid gap-6">
              {error && <p className="text-red-500 text-sm text-center">{error}</p>}
              {success && <p className="text-green-500 text-sm text-center">{success}</p>}
              <div className="grid gap-3">
                <Label htmlFor="password">New Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  aria-invalid={!!error}
                  aria-describedby={error ? 'password-error' : undefined}
                  className="bg-transparent !text-black !border-gray-300 !placeholder-gray-500 dark:!text-black dark:!border-gray-300 dark:!placeholder-gray-500 !ring-0 !shadow-none !transition-none"
                  data-testid="password-input"
                />
                {error && <p id="password-error" className="text-red-500 text-sm">{error}</p>}
              </div>
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full dark:!bg-black dark:text-white"
                aria-label="Reset Password"
              >
                {isLoading ? 'Resetting...' : 'Reset Password'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResetPasswordForm;