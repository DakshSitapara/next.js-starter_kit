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

export default function EditInfoDialog({
  open,
  onOpenChange,
  setEmail,
  setUser,
}: EditInfoDialogProps) {
  const [password, setPassword] = useState('');
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(true);
  const [newEmail, setNewEmail] = useState('');
  const [newUser, setNewUser] = useState('');

  useEffect(() => {
    if (!open) {
      setIsPasswordDialogOpen(true);
      setPassword('');
      setNewEmail('');
      setNewUser('');
    }
  }, [open]);

  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser && !isPasswordDialogOpen) {
      const user = JSON.parse(currentUser);
      setNewEmail(user.email || '');
      setNewUser(user.user || '');
    }
  }, [isPasswordDialogOpen]);

  const handlePasswordSubmit = () => {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
      toast.error('No user logged in.');
      return;
    }

    const user = JSON.parse(currentUser);
    if (password !== user.password) {
      toast.error('Incorrect password. Please try again.');
      return;
    }

    setIsPasswordDialogOpen(false);
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
    <>
      {/* Password Dialog */}
      <Dialog open={open && isPasswordDialogOpen} onOpenChange={setIsPasswordDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className='text-center text-2xl'>Verify Password</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
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
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handlePasswordSubmit}>Verify</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Info Dialog */}
      <Dialog open={open && !isPasswordDialogOpen} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className='text-center text-2xl'>Edit Info</DialogTitle>
          </DialogHeader>
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
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveChanges}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
