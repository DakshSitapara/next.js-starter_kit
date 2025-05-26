'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { z } from 'zod';
import toast from 'react-hot-toast';

// Simple hash function for client-side (not secure for production)
const simpleHash = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash.toString();
};

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const LoginForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    setIsLoading(true);

    try {
      // Validate form data
      loginSchema.parse(formData);

      // Get users from localStorage
      const users = JSON.parse(localStorage.getItem('users') || '[]') as { email: string; password: string }[];
      const user = users.find((u) => u.email === formData.email);

      if (!user) {
        throw new Error('Email not found');
      }

      // Check password
      if (user.password !== simpleHash(formData.password)) {
        throw new Error('Invalid password');
      }

      // Store logged-in user
      localStorage.setItem('currentUser', JSON.stringify({ email: formData.email }));
      console.log('Login successful');
      router.push('/dashboard');
      toast.success('Login successfully');

    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = error.flatten().fieldErrors;
        setErrors({
          email: fieldErrors.email?.[0],
          password: fieldErrors.password?.[0],
        });
      } else {
        setErrors({ general: error instanceof Error ? error.message : 'An unexpected error occurred' });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  return (
    <div className={cn('flex flex-col gap-6 items-center justify-center')}>
      <Card className="w-full max-w-md border bg-transparent border-gray-200 dark:border-gray-200 text-black dark:text-black shadow-md">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} noValidate>
            <div className="grid gap-6">
              {errors.general && <p className="text-red-500 text-sm text-center">{errors.general}</p>}
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  className="bg-transparent !text-black !border-gray-300 !placeholder-gray-500 dark:!text-black dark:!border-gray-300 dark:!placeholder-gray-500 !ring-0 !shadow-none !transition-none"
                  data-testid="email-input"
                />
                {errors.email && (
                  <p id="email-error" className="text-red-500 text-sm">{errors.email}</p>
                )}
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="/forgot-password"
                    className="ml-auto text-sm underline-offset-4 hover:underline text-blue-600 dark:text-blue-600"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  aria-invalid={!!errors.password}
                  aria-describedby={errors.password ? 'password-error' : undefined}
                  className="bg-transparent !text-black !border-gray-300 !placeholder-gray-500 dark:!text-black dark:!border-gray-300 dark:!placeholder-gray-500 !ring-0 !shadow-none !transition-none"
                  data-testid="password-input"
                />
                {errors.password && (
                  <p id="password-error" className="text-red-500 text-sm">{errors.password}</p>
                )}
              </div>
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full dark:!bg-black dark:text-white"
                aria-label="Login"
              >
                {isLoading ? 'Logging in...' : 'Login'}
              </Button>
            </div>
            <div className="text-center text-sm mt-4">
              Don&apos;t have an account?{' '}
              <a
                href="/registr"
                className="text-sm underline-offset-4 hover:underline text-blue-600 dark:text-blue-600"
              >
                Register here
              </a>
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

export default LoginForm;