'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { User, Bell, Palette } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [notifications, setNotifications] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState('');
  const router = useRouter();
  

useEffect(() => {
  const savedNotifications = localStorage.getItem('notifications');
  if (savedNotifications !== null) {
    setNotifications(JSON.parse(savedNotifications));
  }

  const currentUser = localStorage.getItem('currentUser');
  if (currentUser) {
    const user = JSON.parse(currentUser);
    setEmail(user.email || '');
    setPassword(user.password || '');
    setUser(user.user || '');
  }
}, []);

  useEffect(() => {
    localStorage.setItem('notifications', JSON.stringify(notifications));
  }, [notifications]);

  const handleSaveChanges = () => {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      const user = JSON.parse(currentUser);
      const updatedUser = {
        ...user,
        email: email || user.email,
        ...(password && { password }),
      };
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      toast.success('Settings updated successfully!');
    } else {
      toast.error('No user logged in.');
    }
  };

const toggleTheme = () => {
  const newTheme = theme === 'dark' ? 'light' : 'dark';
  setTheme(newTheme);
  toast.success(`Switched to ${newTheme} mode`);
};

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Customize your account and preferences.
          </p>
        </div>
        <Button onClick={handleSaveChanges}>Save Changes</Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Account Settings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid gap-2">
                  <Label htmlFor="name">User</Label>
                   <p className="border rounded px-3 py-2 ">
                    {user}
                  </p>
                </div>
                {/* <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="dakshsitapara6@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div> */}
                <div className="grid gap-2">
                  <Label htmlFor='email'>Email</Label>
                  <p className="border rounded px-3 py-2 ">
                    {email}
                  </p>
                </div>

                {/* <div className="grid gap-2">
                  <Label htmlFor="password">New Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div> */}
                {/* <div className="grid gap-2">
                  <Label>Password</Label>
                  <p className="border rounded px-3 py-2 bg-gray-100 dark:bg-gray-800 text-sm text-gray-800 dark:text-gray-200">
                      ••••••••                 
                  </p>
                </div> */}

              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    Email Notifications
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Receive alerts for new messages and updates.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    id="notifications"
                    checked={notifications}
                    onCheckedChange={setNotifications}
                  />
                  <span className="sr-only">Toggle notifications</span>
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
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    Dark Mode
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Toggle dark theme for better visibility.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    id="dark-mode"
                    checked={theme === 'dark'}
                    onCheckedChange={toggleTheme}
                  />
                  <span className="sr-only">Toggle theme</span>

                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  Reset Password
                </Button>
                <Button variant="outline" className="w-full justify-start"
                  onClick={() => {
                  localStorage.removeItem('currentUser');
                  toast.success('Logout successfully!');
                  router.push('/login');
                }}
                >
                  Log Out
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}