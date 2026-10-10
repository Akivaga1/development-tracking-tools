import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { djangoApi, AuthUser } from '@/lib/djangoApi';

export interface AppUser {
  id: string;
  email: string;
  user_metadata?: {
    full_name?: string;
  };
  full_name?: string;
}

export interface AppSession {
  user: AppUser;
  access_token: string;
}

interface AuthContextType {
  user: AppUser | null;
  session: AppSession | null;
  loading: boolean;
  signUp: (email: string, password: string, fullName?: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<AppUser | null>(null);
  const [session, setSession] = useState<AppSession | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize auth from stored Django session
    const storedUser = djangoApi.getStoredUser();
    const token = localStorage.getItem('dtt_access_token');

    if (token && storedUser) {
      const appUser: AppUser = {
        id: String(storedUser.id),
        email: storedUser.email,
        full_name: storedUser.full_name,
        user_metadata: { full_name: storedUser.full_name },
      };
      setUser(appUser);
      setSession({ user: appUser, access_token: token });

      // Silently refresh profile in background
      djangoApi.getMe()
        .then((fresh) => {
          const updated: AppUser = {
            id: String(fresh.id),
            email: fresh.email,
            full_name: fresh.full_name,
            user_metadata: { full_name: fresh.full_name },
          };
          setUser(updated);
          setSession({ user: updated, access_token: token });
        })
        .catch(() => {
          // If offline or network unreachable, retain stored user session
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const signUp = async (email: string, password: string, fullName?: string) => {
    try {
      const data = await djangoApi.register(email, password, fullName);
      const appUser: AppUser = {
        id: String(data.user.id),
        email: data.user.email,
        full_name: data.user.full_name,
        user_metadata: { full_name: data.user.full_name },
      };
      setUser(appUser);
      setSession({ user: appUser, access_token: data.access });
      return { error: null };
    } catch (err: any) {
      // In local offline mode fallback
      if (err.message?.includes('Failed to fetch') || err.message?.includes('NetworkError')) {
        const fallbackUser: AppUser = {
          id: `local-${Date.now()}`,
          email,
          full_name: fullName || email.split('@')[0],
          user_metadata: { full_name: fullName || email.split('@')[0] },
        };
        djangoApi.setTokens('offline_token', 'offline_refresh', fallbackUser as any);
        setUser(fallbackUser);
        setSession({ user: fallbackUser, access_token: 'offline_token' });
        return { error: null };
      }
      return { error: { message: err.message || 'Registration failed' } };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const data = await djangoApi.login(email, password);
      const appUser: AppUser = {
        id: String(data.user.id),
        email: data.user.email,
        full_name: data.user.full_name,
        user_metadata: { full_name: data.user.full_name },
      };
      setUser(appUser);
      setSession({ user: appUser, access_token: data.access });
      return { error: null };
    } catch (err: any) {
      // In local offline mode fallback
      if (err.message?.includes('Failed to fetch') || err.message?.includes('NetworkError')) {
        const fallbackUser: AppUser = {
          id: `local-${Date.now()}`,
          email,
          full_name: email.split('@')[0],
          user_metadata: { full_name: email.split('@')[0] },
        };
        djangoApi.setTokens('offline_token', 'offline_refresh', fallbackUser as any);
        setUser(fallbackUser);
        setSession({ user: fallbackUser, access_token: 'offline_token' });
        return { error: null };
      }
      return { error: { message: err.message || 'Invalid email or password' } };
    }
  };

  const signOut = async () => {
    await djangoApi.logout();
    setUser(null);
    setSession(null);
    window.location.href = '/auth';
  };

  const value = {
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};