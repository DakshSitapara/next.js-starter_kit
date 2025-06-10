'use client';
import { getCookie } from 'cookies-next';

export function useAuth() {
  const isAuthenticated = getCookie('isAuthenticated') === 'true';
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
  return { isAuthenticated, currentUser };
}
