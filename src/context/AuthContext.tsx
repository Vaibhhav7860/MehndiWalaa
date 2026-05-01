'use client';
import { createContext, useContext, useState, ReactNode } from 'react';
import type { User } from '@/types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isOtpModalOpen: boolean;
  login: (phone: string) => void;
  logout: () => void;
  openOtpModal: () => void;
  closeOtpModal: () => void;
  role: 'customer' | 'artist' | 'admin' | 'sub-admin';
  setRole: (r: 'customer' | 'artist' | 'admin' | 'sub-admin') => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const mockUser: User = {
  id: 'u1', name: 'Neha Mehra', phone: '+91 99876 54321', city: 'Delhi',
  image: '/images/hero-mehndi.png', role: 'customer',
  shortlistedArtists: ['a1', 'a5', 'a10'],
  moodBoard: [
    { id: 'mb1', imageUrl: '/images/hero-mehndi.png', occasion: 'Wedding', notes: 'Love this bridal pattern', savedAt: '2026-04-28T10:00:00Z' },
    { id: 'mb2', imageUrl: '/images/hero-mehndi.png', occasion: 'Engagement', notes: 'Simple and elegant', savedAt: '2026-04-27T10:00:00Z' },
  ],
  bookings: [],
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const [role, setRole] = useState<'customer' | 'artist' | 'admin' | 'sub-admin'>('customer');

  const login = () => { setUser({ ...mockUser, role }); setIsOtpModalOpen(false); };
  const logout = () => setUser(null);
  const openOtpModal = () => setIsOtpModalOpen(true);
  const closeOtpModal = () => setIsOtpModalOpen(false);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isOtpModalOpen, login, logout, openOtpModal, closeOtpModal, role, setRole }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
