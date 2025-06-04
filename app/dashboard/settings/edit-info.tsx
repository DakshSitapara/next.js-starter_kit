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

interface EditInfoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  setEmail: (email: string) => void;
  setUser: (user: string) => void;
}

// Simple hash function (for demo only, NOT secure for production)
const simpleHash = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash.toString();
};

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
      // Reset everything when dialog is closed
      setStep('verify');
      setPassword('');
      setNewEmail('');
      setNewUser('');
    }
  }, [open]);

  useEffect(() => {
    if (step === 'edit') {
      const currentUser = localStorage.getItem('currentUser');
      if (currentUser) {
        const user = JSON.parse(currentUser);
        setNewEmail(user.email || '');
        setNewUser(user.user || '');
      }
    }
  }, [step]);

  const handlePasswordSubmit = () => {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
      toast.error('No user logged in.');
      return;
    }

    const user = JSON.parse(currentUser);
    const hashedInput = simpleHash(password);

    if (hashedInput !== user.password) {
      toast.error('Incorrect password. Please try again.');
      return;
    }

    setStep('edit');
    setPassword('');
  };

  const handleSaveChanges = () => {
    const currentUser = localStorage.getItem('currentUser');
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

    if (newUser.length < 3) {
      toast.error('Username must be at least 3 characters.');
      return;
    }

    const updatedUser = {
      ...parsedUser,
      email: newEmail,
      user: newUser,
    };

    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    setEmail(newEmail);
    setUser(newUser);
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
          <div className="space-y-4">
            <Label htmlFor="password">Current Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
            <DialogFooter>
              <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
              <Button onClick={handlePasswordSubmit}>Verify</Button>
            </DialogFooter>
          </div>
        ) : (
          <div className="space-y-4">
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
              <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
              <Button onClick={handleSaveChanges}>Save</Button>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
