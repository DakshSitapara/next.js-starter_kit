'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { z } from 'zod';
import Link from 'next/link';

import { cn } from '@/lib/utils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
});

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      forgotPasswordSchema.parse({ email });

      const users = JSON.parse(localStorage.getItem('users') || '[]') as { email: string; password: string }[];
      const user = users.find((u) => u.email === email);
      if (!user) {
        throw new Error('Email not found');
      }

      const token = crypto.randomUUID();
      const expires = Date.now() + 3600000; // 1 hour
      const resetTokens = JSON.parse(localStorage.getItem('resetTokens') || '[]');
      localStorage.setItem('resetTokens', JSON.stringify([{ email, token, expires }, ...resetTokens]));

      toast.success('Redirecting to reset password...');
      router.push(`/reset-password?token=${token}&email=${encodeURIComponent(email)}`);
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.errors[0].message);
      } else {
        setError(err instanceof Error ? err.message : 'An unexpected error occurred');
        toast.error(err instanceof Error ? err.message : 'Failed to process request.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn('flex flex-col gap-6 items-center justify-center')}>
      <Card className="w-full max-w-md border bg-transparent border-gray-200 text-black shadow-md">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Forgot your password?</CardTitle>
          <CardDescription className="text-gray-600">We'll redirect you to reset it if your email is found.</CardDescription>
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-transparent text-black border-gray-300"
                />
              </div>
              <Button type="submit" disabled={isLoading} className="w-full dark:!bg-black dark:text-white">
                {isLoading ? 'Checking...' : 'Check Email'}
              </Button>
              <div className="text-center text-sm">
                <Link href="/login" className="text-blue-600 hover:underline">Back to Login</Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgotPassword;
