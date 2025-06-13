'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { User, Palette, Edit, LogOut } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import CustomSwitch from '@/components/CustomSwitch';
import EditInfoDialog from './edit-info';
import { AuthService } from '@/lib/useAuth';
import {
  AlertDialog, AlertDialogTrigger, AlertDialogContent,
  AlertDialogHeader, AlertDialogTitle, AlertDialogFooter,
  AlertDialogCancel, AlertDialogAction,
} from '@/components/ui/alert-dialog';

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState('');
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  // Check if user is authenticated
  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (!AuthService.isAuthenticated()) {
          router.replace('/login');
          return;
        }

        // Try getting user from AuthService first
        const userData = AuthService.getAuthUser();
        if (userData) {
          setUser(userData.name || '');
          setEmail(userData.email || '');
          return;
        }

        // Fallback: check localStorage
        const localUser = localStorage.getItem('authUser');
        if (localUser) {
          const parsed = JSON.parse(localUser);
          setUser(parsed.name || '');
          setEmail(parsed.email || '');
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        router.replace('/login'); // Optional: redirect on unexpected error
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    toast.success(`Switched to ${newTheme} mode`);
  };

  const handleLogout = () => {
    AuthService.logout();
    toast.success('Logged out successfully');
    router.replace('/login');
  };

  const handleResetPassword = () => {
    const currentUser = localStorage.getItem('authUser');
    AuthService.logout();
    toast.success('Redirecting to Forgot Password...');
    if (!currentUser) return toast.error('No user logged in.');
    const parsedUser = JSON.parse(currentUser);
    if (!parsedUser.email) {
      return toast.error('No email associated with this account.');
    }
    router.push('/forgot-password');
  };

  if (isLoading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Customize your account and preferences.</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Account Settings
                <Button className="ml-auto" onClick={() => setIsEditDialogOpen(true)}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Info
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className='grid gap-2'>
                  <Label>Username</Label>
                  <p className="border rounded px-3 py-2">{user || 'Not set'}</p>
                </div>
                <div className='grid gap-2'>
                  <Label>Email</Label>
                  <p className="border rounded px-3 py-2">{email || 'Not set'}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Appearance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Dark Mode</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Toggle for better visibility.</p>
                </div>
                <CustomSwitch checked={theme === 'light'} onChange={toggleTheme} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap items-center gap-3">
                <Button
                  variant="outline"
                  className="flex-1 min-w-[100px] text-sm sm:text-base truncate text-center hover:bg-teal-100 hover:scale-105 hover:shadow-2xl transition-transform"
                  onClick={handleResetPassword}
                >
                  Reset Password
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button 
                      variant="destructive"
                      className="flex-1 min-w-[100px] text-sm sm:text-base truncate text-center hover:bg-white hover:text-red-500 hover:scale-105 hover:shadow-2xl hover:border-1 hover:border-red-500  transition-transform"
                    >
                      <LogOut className="h-4 w-4" /> 
                      Log out
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="sm:max-w-sm">
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure you want to log out?</AlertDialogTitle>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleLogout}
                        className="bg-red-500 text-white hover:bg-white/90 hover:text-red-500"
                      >
                        Yes, Logout
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <EditInfoDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        setEmail={setEmail}
        setUser={setUser}
      />
    </div>
  );
}
