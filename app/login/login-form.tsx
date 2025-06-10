'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useCallback } from 'react';
import { z } from 'zod';
import toast from 'react-hot-toast';
import Link from 'next/link';
import {Eye,EyeClosed} from 'lucide-react';
import { setCookie } from 'cookies-next' 

const simpleHash = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return hash.toString();
};

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const LoginForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get('redirect') || '/dashboard/Home';  
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    setIsLoading(true);

    try {
      loginSchema.parse(formData);

      const users = JSON.parse(localStorage.getItem('users') || '[]') as {
        email: string;
        password: string;
      }[];

      const user = users.find((u) => u.email === formData.email);

      if (!user) {
        throw new Error('Email not found');
      }

      if (user.password !== simpleHash(formData.password)) {
        throw new Error('Invalid password');
      }

      setCookie('isAuthenticated', 'true', { path: '/', maxAge: 60 * 60 * 24 * 7 }); // 7 days
      localStorage.setItem('currentUser', JSON.stringify(user))
      toast.success('Login successful')
      router.push(redirectPath);

    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = error.flatten().fieldErrors;
        setErrors({
          email: fieldErrors.email?.[0],
          password: fieldErrors.password?.[0],
        });
      } else {
        const message = error instanceof Error ? error.message : 'An unexpected error occurred';
        setErrors({ general: message });
        toast.error(message);
      }
    } finally {
      setIsLoading(false);
    }
  }, [formData, router]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }, [formData]);

  
  return (
    <div className={cn('flex flex-col gap-6 items-center justify-center')}>
      <Card className="w-full max-w-md border bg-transparent border-gray-200 dark:border-gray-200 text-black dark:text-black shadow-md">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} noValidate>
            <div className="grid gap-6">
              {errors.general && (
                <p className="text-red-500 text-sm text-center">{errors.general}</p>
              )}

              {/* Email Field */}
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  autoFocus
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  autoComplete="email"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  className="bg-transparent !text-black !border-gray-300 !placeholder-gray-500 dark:!text-black dark:!border-gray-300 dark:!placeholder-gray-500 !ring-0 !shadow-none !transition-none"
                  data-testid="email-input"
                />
                {errors.email && (
                  <p id="email-error" className="text-red-500 text-sm">{errors.email}</p>
                )}
              </div>

              {/* Password Field */}
              <div className="grid gap-3 relative">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="/forgot-password"
                    className="ml-auto text-sm underline-offset-4 hover:underline text-blue-600 dark:text-blue-600"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleChange}
                  required
                  autoComplete="current-password"
                  aria-invalid={!!errors.password}
                  aria-describedby={errors.password ? 'password-error' : undefined}
                  className="bg-transparent !text-black !border-gray-300 !placeholder-gray-500 dark:!text-black dark:!border-gray-300 dark:!placeholder-gray-500 !ring-0 !shadow-none !transition-none pr-14"
                  data-testid="password-input"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-10.5 text-black hover:underline"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <Eye size={18} /> : <EyeClosed size={18} />}
                </button>
                {errors.password && (
                  <p id="password-error" className="text-red-500 text-sm">{errors.password}</p>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full dark:!bg-black dark:text-white"
                aria-label="Login"
              >
                {isLoading ? 'Logging in...' : 'Login'}
              </Button>
            </div>

            {/* Register Redirect */}
            <div className="text-center text-sm mt-4">
              Don&apos;t have an account?{' '}
              <Link
                href="/register"
                className="text-sm underline-offset-4 hover:underline text-blue-600 dark:text-blue-600"
              >
                Register here
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Terms Notice */}
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
