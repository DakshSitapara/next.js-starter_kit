'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { User, Palette, Edit } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import CustomSwitch from '@/components/CustomSwitch';
import EditInfoDialog from './edit-info';

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const router = useRouter();

  const [notifications, setNotifications] = useState(true);
  const [email, setEmail] = useState('');
  const [user, setUser] = useState('');
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  useEffect(() => {
    const savedNotifications = localStorage.getItem('notifications');
    if (savedNotifications) {
      setNotifications(JSON.parse(savedNotifications));
    }

    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      const user = JSON.parse(currentUser);
      setEmail(user.email || '');
      setUser(user.user || '');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('notifications', JSON.stringify(notifications));
  }, [notifications]);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    toast.success(`Switched to ${newTheme} mode`);
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    toast.success('Logged out successfully!');
    router.push('/login');
  };

  const handleResetPassword = () => {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) return toast.error('No user logged in.');
    const parsedUser = JSON.parse(currentUser);
    if (!parsedUser.email) {
      return toast.error('No email associated with this account.');
    }
    router.push('/forgot-password');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Customize your account and preferences.</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Account Section */}
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

        {/* Appearance + Quick Actions */}
        <div className="space-y-6">
          {/* Theme toggle */}
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

          {/* Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="w-1/2 hover:bg-teal-100 hover:scale-105 hover:shadow-2xl transition-transform"
                  onClick={handleResetPassword}
                >
                  Reset Password
                </Button>
                <Button
                  variant="outline"
                  className="w-1/2 hover:bg-red-600 hover:text-white hover:scale-105 hover:shadow-2xl transition-transform"
                  onClick={handleLogout}
                >
                  Log Out
                </Button>
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
