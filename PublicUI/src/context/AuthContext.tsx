import { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '../types';
import { ApiUrl } from '../services/ApiUrl';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: User['role']) => Promise<void>;
  signup: (name: string, email: string, password: string, role: User['role']) => Promise<{ success: boolean; requiresVerification?: boolean }>;
  completeSignupAfterVerification: () => Promise<void>;
  hasPendingSignup: () => boolean;
  getPendingSignupEmail: () => string | null;
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
      if (!raw) return null;
      const parsed: any = JSON.parse(raw);
      if (parsed && (typeof parsed.name !== 'string' || !parsed.name)) {
        const n = parsed.name;
        const candidates = [n?.full_name, n?.fullName, n?.name, n?.['Full Name']];
        const pick = candidates.find((v) => typeof v === 'string' && String(v).trim());
        parsed.name = pick ? String(pick).trim() : (parsed.email ? String(parsed.email).split('@')[0] : '');
      }
      return parsed as User;
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
    // Check if user has a pending unverified signup
    try {
      const pendingSignup = localStorage.getItem('pending_signup');
      if (pendingSignup) {
        const signupData = JSON.parse(pendingSignup);
        if (signupData.email === email) {
          throw new Error('EMAIL_NOT_VERIFIED');
        }
      }
    } catch {}
    
    // Check with backend API if user exists
    try {
      const response = await fetch(`${ApiUrl.baseUrl}/login`, {
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
        name: userData.full_name, 
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
      if (err.message === 'EMAIL_NOT_VERIFIED') {
        throw new Error('EMAIL_NOT_VERIFIED');
      }
      throw new Error('Network error while checking user');
    }
  };

  const signup = async (name: string, email: string, inputPassword: string, role: User['role']) => {
    // Only allow public self-signup for basic 'user' role
    if (role !== 'user') {
      throw new Error('Sign up is available only for User accounts. Please contact us for Provider/Nurse/Admin access.');
    }
    
    const allUsers = getAllUsers();
    const exists = allUsers.some(u => u.email === email && u.role === role);
    if (exists) {
      throw new Error('Account already exists for this email and role');
    }

    // First, send signup data to backend API
    try {
      const response = await fetch(`${ApiUrl.baseUrl}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({full_name :name, email, password: inputPassword }),
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Failed to save user to server');
      }

      // Always require email verification for security
      // Store signup data temporarily for verification
      try {
        localStorage.setItem('pending_signup', JSON.stringify({
          name,
          email,
          password: inputPassword,
          role,
          timestamp: Date.now()
        }));
      } catch {}
      
      return { success: true, requiresVerification: true };
      
    } catch (err: any) {
      throw new Error('Network error while saving user');
    }
  };

  const completeSignupAfterVerification = async () => {
    try {
      const pendingSignup = localStorage.getItem('pending_signup');
      if (!pendingSignup) {
        throw new Error('No pending signup found');
      }

      const signupData = JSON.parse(pendingSignup);
      const { name, email, password, role } = signupData;

      // Create the user in local storage
      const newUser: StoredUser = {
        id: String(Date.now()),
        name: name || email.split('@')[0],
        email,
        role,
        password,
      };
      
      try {
        const rawDynamic = localStorage.getItem('auth_users_dynamic');
        const dynamicUsers: StoredUser[] = rawDynamic ? JSON.parse(rawDynamic) : [];
        dynamicUsers.push(newUser);
        localStorage.setItem('auth_users_dynamic', JSON.stringify(dynamicUsers));
      } catch {}
      
      // Auto-login after verification
      const publicUser: User = { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role };
      setUser(publicUser);
      try {
        localStorage.setItem('auth_user', JSON.stringify(publicUser));
        localStorage.removeItem('pending_signup'); // Clean up
      } catch {}
      
    } catch (err: any) {
      throw new Error('Failed to complete signup after verification');
    }
  };

  const hasPendingSignup = (): boolean => {
    try {
      const pendingSignup = localStorage.getItem('pending_signup');
      if (!pendingSignup) return false;
      
      const signupData = JSON.parse(pendingSignup);
      const timestamp = signupData.timestamp || 0;
      const now = Date.now();
      
      // Check if pending signup is not expired (24 hours)
      if (now - timestamp > 24 * 60 * 60 * 1000) {
        localStorage.removeItem('pending_signup');
        return false;
      }
      
      return true;
    } catch {
      return false;
    }
  };

  const getPendingSignupEmail = (): string | null => {
    try {
      const pendingSignup = localStorage.getItem('pending_signup');
      if (!pendingSignup) return null;
      
      const signupData = JSON.parse(pendingSignup);
      return signupData.email || null;
    } catch {
      return null;
    }
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
      completeSignupAfterVerification,
      hasPendingSignup,
      getPendingSignupEmail,
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