'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import * as EmailJS from '@emailjs/browser';
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
      // Validate email
      forgotPasswordSchema.parse({ email });

      // Check if user exists
      const users = JSON.parse(localStorage.getItem('users') || '[]') as { email: string; password: string }[];
      const user = users.find((u) => u.email === email);
      if (!user) {
        throw new Error('Email not found');
      }

      // Generate reset token
      const token = crypto.randomUUID();
      const expires = Date.now() + 3600000; // 1 hour
      const resetTokens = JSON.parse(localStorage.getItem('resetTokens') || '[]');
      localStorage.setItem(
        'resetTokens',
        JSON.stringify([{ email, token, expires }, ...resetTokens])
      );

      // Send email with reset link
      const resetLink = `${window.location.origin}/reset-password?token=${token}&email=${encodeURIComponent(email)}`;
      const templateParams = {
        user_name: email.split('@')[0],
        reset_link: resetLink,
        to_email: email,
      };

      await EmailJS.send(
        'service_vcqch3g',
        'template_4wrepi6',
        templateParams,
        'EJvNEd7USjV7sgMNH'
      );

      toast.success('Reset link sent to your email.');
      router.push('/login');
    } catch (err) {
      console.error('Forgot password error:', err);
      if (err instanceof z.ZodError) {
        setError(err.errors[0].message);
      } else {
        setError(err instanceof Error ? err.message : 'An unexpected error occurred');
        toast.error(err instanceof Error ? err.message : 'Failed to send reset link.');
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
            Enter your email address to receive a reset link.
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
              >
                {isLoading ? 'Sending...' : 'Send Reset Link'}
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

export default ForgotPassword;
