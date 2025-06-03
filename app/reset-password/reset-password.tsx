'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { z } from 'zod';
import { toast } from 'react-hot-toast';
import { cn } from '@/lib/utils';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

// Optional simple hash for demo (not secure)
const simpleHash = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return hash.toString();
};

const schema = z.object({
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export default function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  const token = searchParams.get('token');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isValidToken, setIsValidToken] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const tokens = JSON.parse(localStorage.getItem('resetTokens') || '[]') as {
      email: string;
      token: string;
      expires: number;
    }[];

    const found = tokens.find(
      (t) => t.token === token && t.email === email && t.expires > Date.now()
    );

    if (found) {
      setIsValidToken(true);
    } else {
      toast.error('Invalid or expired reset link.');
      setIsValidToken(false);
    }
  }, [token, email]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsLoading(true);

    try {
      if (!email || !token) throw new Error('Invalid reset request');
      if (password !== confirmPassword) throw new Error('Passwords do not match');
      schema.parse({ password });

      const users = JSON.parse(localStorage.getItem('users') || '[]') as {
        email: string;
        password: string;
      }[];

      const userIndex = users.findIndex((u) => u.email === email);
      if (userIndex === -1) throw new Error('User not found');

      // Check if new password matches the current password
      const currentHashedPassword = users[userIndex].password;
      const newHashedPassword = simpleHash(password);
      if (newHashedPassword === currentHashedPassword) {
        throw new Error('New password cannot be the same as the current password');
      }

      users[userIndex].password = newHashedPassword;
      localStorage.setItem('users', JSON.stringify(users));

      const tokens = JSON.parse(localStorage.getItem('resetTokens') || '[]') as {
        email: string;
        token: string;
        expires: number;
      }[];
      localStorage.setItem(
        'resetTokens',
        JSON.stringify(tokens.filter((t) => t.token !== token))
      );

      setSuccess('Password reset successfully. Redirecting...');
      toast.success('Password reset successfully');
      setTimeout(() => router.push('/login'), 2000);
    } catch (err) {
      console.error(err);
      if (err instanceof z.ZodError) {
        setError(err.errors[0].message);
      } else {
        setError(err instanceof Error ? err.message : 'An error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (!isValidToken) {
    return (
      <Card className="w-full max-w-md border bg-transparent border-gray-200 dark:border-gray-200 text-black dark:text-black shadow-md">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Invalid Link</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-center text-gray-700 dark:text-gray-700">
            The reset link is invalid or has expired. Please request a new one.
          </p>
          <Button
            onClick={() => router.push('/forgot-password')}
            className="w-full dark:!bg-black dark:text-white"
          >
            Request New Link
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md border bg-transparent border-gray-200 dark:border-gray-200 text-black dark:text-black shadow-md">
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Reset Password</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-6">
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          {success && <p className="text-green-500 text-sm text-center">{success}</p>}

          <div className="grid gap-3">
            <Label htmlFor="password">New Password</Label>
            <Input
              autoFocus
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-transparent !text-black !border-gray-300 !placeholder-gray-500 dark:!text-black dark:!border-gray-300 dark:!placeholder-gray-500 !ring-0 !shadow-none !transition-none"
            />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="bg-transparent !text-black !border-gray-300 !placeholder-gray-500 dark:!text-black dark:!border-gray-300 dark:!placeholder-gray-500 !ring-0 !shadow-none !transition-none"
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full dark:!bg-black dark:text-white"
          >
            {isLoading ? 'Resetting...' : 'Reset Password'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}