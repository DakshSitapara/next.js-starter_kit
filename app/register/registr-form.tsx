'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { z } from 'zod';
import toast from 'react-hot-toast';
import {Eye,EyeClosed} from 'lucide-react';


const simpleHash = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return hash.toString();
};

const registerSchema = z.object({
  user: z.string().min(1, 'Enter your name'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const RegisterForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({ user: '', email: '', password: '' });
  const [errors, setErrors] = useState<{ user?: string; email?: string; password?: string; general?: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    setIsLoading(true);

    try {
      registerSchema.parse(formData);

      const users = JSON.parse(localStorage.getItem('users') || '[]') as {
        user: string;
        email: string;
        password: string;
      }[];

      if (users.find((u) => u.email === formData.email)) {
        throw new Error('Email already registered');
      }

      users.push({
        user: formData.user,
        email: formData.email,
        password: simpleHash(formData.password),
      });
      localStorage.setItem('users', JSON.stringify(users));
      localStorage.setItem('currentUser', JSON.stringify({ user: formData.user, email: formData.email }));

      toast.success('Registered successfully!');
      router.push('/dashboard');
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = error.flatten().fieldErrors;
        setErrors({
          user: fieldErrors.user?.[0],
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
          <CardTitle className="text-xl">Register Here</CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-600">
            Enter your details
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} noValidate>
            <div className="grid gap-6">
              {errors.general && <p className="text-red-500 text-sm text-center">{errors.general}</p>}

              {/* Name field */}
              <div className="grid gap-3">
                <Label htmlFor="user">Name</Label>
                <Input
                  autoFocus
                  id="user"
                  type="text"
                  placeholder="Your name"
                  value={formData.user}
                  onChange={handleChange}
                  required
                  aria-invalid={!!errors.user}
                  aria-describedby={errors.user ? 'user-error' : undefined}
                  className="bg-transparent !text-black !border-gray-300 !placeholder-gray-500 dark:!text-black dark:!border-gray-300 dark:!placeholder-gray-500 !ring-0 !shadow-none !transition-none"
                />
                {errors.user && (
                  <p id="user-error" className="text-red-500 text-sm">{errors.user}</p>
                )}
              </div>

              {/* Email field */}
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
                />
                {errors.email && (
                  <p id="email-error" className="text-red-500 text-sm">{errors.email}</p>
                )}
              </div>

                {/* Password field */}
                <div className="grid gap-3 relative">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleChange}
                    required
                    aria-invalid={!!errors.password}
                    aria-describedby={errors.password ? 'password-error' : undefined}
                    className="bg-transparent !text-black !border-gray-300 !placeholder-gray-500 dark:!text-black dark:!border-gray-300 dark:!placeholder-gray-500 !ring-0 !shadow-none !transition-none pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-[37px] text-black dark:text-black"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <Eye size={18} /> : <EyeClosed size={18} />}
                  </button>
                  {errors.password && (
                    <p id="password-error" className="text-red-500 text-sm">{errors.password}</p>
                  )}
                </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w full dark:!bg-black dark:text-white"
              >
                {isLoading ? 'Registering...' : 'Register'}
              </Button>
              <div className="text-center text-sm">
                Already have an account?{' '}
                <Link
                  href="/login"
                  className="text-sm underline-offset-4 hover:underline text-blue-600 dark:text-blue-600"
                >
                  Login
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-muted-foreground text-center text-xs">
        By clicking continue, you agree to our{' '}
        <a href="#" className="text-blue-600 dark:text-blue-600">Terms of Service</a> and{' '}
        <a href="#" className="text-blue-600 dark:text-blue-600">Privacy Policy</a>.
      </div>
    </div>
  );
};

export default RegisterForm;
