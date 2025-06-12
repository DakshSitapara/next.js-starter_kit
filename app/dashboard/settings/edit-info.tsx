'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import bcrypt from 'bcryptjs'

interface EditInfoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  setEmail: (email: string) => void;
  setUser: (user: string) => void;
}

export default function EditInfoDialog({
  open,
  onOpenChange,
  setEmail,
  setUser,
}: EditInfoDialogProps) {
  const [step, setStep] = useState<'verify' | 'edit'>('verify');
  const [password, setPassword] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newUser, setNewUser] = useState('');

  useEffect(() => {
    if (!open) {
      setStep('verify');
      setPassword('');
      setNewEmail('');
      setNewUser('');
    }
  }, [open]);

  useEffect(() => {
    if (step === 'edit') {
      const currentUser = localStorage.getItem('authUser');
      if (currentUser) {
        const user = JSON.parse(currentUser);
        setNewEmail(user.email || '');
        setNewUser(user.name || '');
      }
    }
  }, [step]);

  const handlePasswordSubmit = async () => {
    const allUsers = localStorage.getItem('users');
    const authUser = localStorage.getItem('authUser');

    if (!authUser || !allUsers) {
      toast.error('No user logged in.');
      return;
    }

    const { email } = JSON.parse(authUser);
    const users = JSON.parse(allUsers);
    const fullUser = users.find((u: any) => u.email === email);

    if (!fullUser) {
      toast.error('User not found.');
      return;
    }

    const isMatch = await bcrypt.compare(password, fullUser.passwordHash);

    if (!isMatch) {
      toast.error('Incorrect password. Please try again.');
      return;
    }

    setStep('edit');
    setPassword('');
  };

  const handleSaveChanges = () => {
    const currentUser = localStorage.getItem('authUser');
    if (!currentUser) {
      toast.error('No user logged in.');
      return;
    }

    const parsedUser = JSON.parse(currentUser);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (newEmail && !emailRegex.test(newEmail)) {
      toast.error('Invalid email format.');
      return;
    }

    if (newUser.trim().length < 3) {
      toast.error('Username must be at least 3 characters.');
      return;
    }

    const updatedUser = {
      ...parsedUser,
      email: newEmail.trim(),
      name: newUser.trim(),
    };

    localStorage.setItem('authUser', JSON.stringify(updatedUser));
    setEmail(updatedUser.email);
    setUser(updatedUser.name);
    toast.success('User info updated successfully!');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">
            {step === 'verify' ? 'Verify Password' : 'Edit Info'}
          </DialogTitle>
        </DialogHeader>

        {step === 'verify' ? (
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              handlePasswordSubmit();
            }}
          >
            <div className="grid gap-2">
              <Label htmlFor="password">Current Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
              <Button type="submit">Verify</Button>
            </DialogFooter>
          </form>
        ) : (
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              handleSaveChanges();
            }}
          >
            <div className="grid gap-2">
              <Label htmlFor="edit-username">Username</Label>
              <Input
                id="edit-username"
                value={newUser}
                onChange={(e) => setNewUser(e.target.value)}
                placeholder="New username"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-email">Email</Label>
              <Input
                id="edit-email"
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="New email"
              />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
