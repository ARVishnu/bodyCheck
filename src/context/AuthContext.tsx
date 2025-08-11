import { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: User['role']) => Promise<void>;
  signup: (name: string, email: string, password: string, role: User['role']) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Local type for stored users (adds password for demo purposes)
type StoredUser = User & { password: string };

// Mock users for demo (with demo password)
const mockStoredUsers: StoredUser[] = [
  { id: '1', name: 'Dr. Sarah Johnson', email: 'admin@bodycheck', role: 'admin', password: 'demo' },
  { id: '2', name: 'Dr. Michael Chen', email: 'provider@bodycheck', role: 'provider', password: 'demo' },
  { id: '3', name: 'Nurse Patricia Williams', email: 'nurse@bodycheck', role: 'nurse', password: 'demo' },
  { id: '4', name: 'John Doe', email: 'user@bodycheck', role: 'user', password: 'demo' },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  // Initialize from localStorage to persist sessions across reloads
  const [user, setUser] = useState<User | null>(() => {
    try {
      const raw = localStorage.getItem('auth_user');
      return raw ? (JSON.parse(raw) as User) : null;
    } catch {
      return null;
    }
  });

  const getAllUsers = (): StoredUser[] => {
    try {
      const rawDynamic = localStorage.getItem('auth_users_dynamic');
      const dynamicUsers: Array<Partial<StoredUser>> = rawDynamic ? JSON.parse(rawDynamic) : [];
      // Coerce to StoredUser shape (password may be missing from legacy entries)
      const coercedDynamic: StoredUser[] = dynamicUsers.map((u, idx) => ({
        id: String(u.id ?? `dyn-${idx}`),
        name: String(u.name ?? ''),
        email: String(u.email ?? ''),
        role: (u.role as StoredUser['role']) ?? 'user',
        password: String(u.password ?? ''),
      }));
      return [...mockStoredUsers, ...coercedDynamic];
    } catch {
      return [...mockStoredUsers];
    }
  };

  const login = async (email: string, inputPassword: string, role: User['role']) => {
    // Check with backend API if user exists
    try {
      const response = await fetch('https://7d7a7540cce7.ngrok-free.app/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: inputPassword }),
      });
      
      if (response.status === 404) {
        throw new Error('USER_NOT_FOUND');
      }
      
      if (!response.ok) {
        throw new Error('Failed to verify user with server');
      }
      
      // If user exists, create a user object and set it
      const userData = await response.json();
      const publicUser: User = { 
        id: userData.id || String(Date.now()), 
        name: userData.name || email.split('@')[0], 
        email, 
        role: userData.role || role 
      };
      setUser(publicUser);
      try {
        localStorage.setItem('auth_user', JSON.stringify(publicUser));
      } catch {}
    } catch (err: any) {
      if (err.message === 'USER_NOT_FOUND') {
        throw new Error('USER_NOT_FOUND');
      }
      throw new Error('Network error while checking user');
    }
  };

  const signup = async (name: string, email: string, inputPassword: string, role: User['role']) => {
    // First, send signup data to backend API
    try {
      const response = await fetch('https://7d7a7540cce7.ngrok-free.app/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({full_name :name, email, password: inputPassword }),
      });
      if (!response.ok) {
        throw new Error('Failed to save user to server');
      }
    } catch (err: any) {
      throw new Error('Network error while saving user');
    }
    // Only allow public self-signup for basic 'user' role
    if (role !== 'user') {
      throw new Error('Sign up is available only for User accounts. Please contact us for Provider/Nurse/Admin access.');
    }
    const allUsers = getAllUsers();
    const exists = allUsers.some(u => u.email === email && u.role === role);
    if (exists) {
      throw new Error('Account already exists for this email and role');
    }
    const newUser: StoredUser = {
      id: String(Date.now()),
      name: name || email.split('@')[0],
      email,
      role,
      password: inputPassword,
    };
    try {
      const rawDynamic = localStorage.getItem('auth_users_dynamic');
      const dynamicUsers: StoredUser[] = rawDynamic ? JSON.parse(rawDynamic) : [];
      dynamicUsers.push(newUser);
      localStorage.setItem('auth_users_dynamic', JSON.stringify(dynamicUsers));
    } catch {}
    // Auto-login after signup
    const publicUser: User = { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role };
    setUser(publicUser);
    try {
      localStorage.setItem('auth_user', JSON.stringify(publicUser));
    } catch {}
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem('auth_user');
      localStorage.removeItem('auth_email');
      localStorage.removeItem('auth_password');
      localStorage.removeItem('auth_role');
      localStorage.removeItem('auth_isAuthenticated');
      localStorage.removeItem('email');
    } catch {}
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      signup,
      logout,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}