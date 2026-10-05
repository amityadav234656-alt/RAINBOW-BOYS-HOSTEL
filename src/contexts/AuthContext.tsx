import React, { createContext, useContext, useEffect, useState } from 'react';
import { DEMO_USERS } from '../data/mockData';
import { UserProfile, UserRole } from '../types';

interface AuthContextType {
  user: UserProfile | null;
  role: UserRole | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (identifier: string, password?: string, roleHint?: UserRole) => Promise<boolean>;
  logout: () => void;
  switchDemoRole: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = 'rainbow_one_auth_user';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Initialize from localStorage or default to logged-out on first visit
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch {
      // Ignore JSON parse errors
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (identifier: string, _password?: string, roleHint?: UserRole): Promise<boolean> => {
    setIsLoading(true);
    // Simulate brief network delay for authentic UI feel
    await new Promise((resolve) => setTimeout(resolve, 350));

    const cleanInput = identifier.trim().toLowerCase();

    // Match by email, phone, or role hint
    let matchedUser = DEMO_USERS.find(
      (u) =>
        u.email.toLowerCase() === cleanInput ||
        u.phone === cleanInput ||
        (roleHint && u.role === roleHint)
    );

    // If still not matched, default to resident demo user
    if (!matchedUser) {
      matchedUser = DEMO_USERS.find((u) => u.role === (roleHint || 'resident')) || DEMO_USERS[0];
    }

    setUser(matchedUser);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(matchedUser));
    setIsLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  const switchDemoRole = (targetRole: UserRole) => {
    const demo = DEMO_USERS.find((u) => u.role === targetRole) || DEMO_USERS[0];
    setUser(demo);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(demo));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user ? user.role : null,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        switchDemoRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
