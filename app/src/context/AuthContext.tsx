import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'donor' | 'receiver' | 'volunteer';
  phone?: string;
  organization?: string;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (data: RegisterData) => Promise<{ success: boolean; error?: string }>;
  updateProfile: (data: Partial<User>) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: 'donor' | 'receiver' | 'volunteer';
  phone?: string;
  organization?: string;
}

interface StoredUser extends User {
  password: string;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  login: async () => ({ success: false }),
  register: async () => ({ success: false }),
  logout: () => {},
});

const USERS_KEY = 'annsetu_users';
const SESSION_KEY = 'annsetu_session';

function getStoredUsers(): StoredUser[] {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
  } catch {
    return [];
  }
}

function saveStoredUsers(users: StoredUser[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function getSession(): User | null {
  try {
    const session = localStorage.getItem(SESSION_KEY);
    return session ? JSON.parse(session) : null;
  } catch {
    return null;
  }
}

function saveSession(user: User | null) {
  if (user) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(SESSION_KEY);
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Restore session on mount
    const session = getSession();
    if (session) {
      setUser(session);
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    // Simulate network delay
    await new Promise((r) => setTimeout(r, 500));

    const users = getStoredUsers();
    const found = users.find((u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password);

    if (!found) {
      return { success: false, error: 'Invalid email or password' };
    }

    const { password: _, ...userData } = found;
    setUser(userData);
    saveSession(userData);
    return { success: true };
  };

  const register = async (data: RegisterData): Promise<{ success: boolean; error?: string }> => {
    await new Promise((r) => setTimeout(r, 500));

    const users = getStoredUsers();
    const exists = users.find((u) => u.email.toLowerCase() === data.email.toLowerCase());

    if (exists) {
      return { success: false, error: 'An account with this email already exists' };
    }

    const newUser: StoredUser = {
      id: crypto.randomUUID(),
      name: data.name,
      email: data.email,
      password: data.password,
      role: data.role,
      phone: data.phone,
      organization: data.organization,
      createdAt: new Date().toISOString(),
    };

    saveStoredUsers([...users, newUser]);

    const { password: _, ...userData } = newUser;
    setUser(userData);
    saveSession(userData);
    return { success: true };
  };

  const updateProfile = async (data: Partial<User>): Promise<{ success: boolean; error?: string }> => {
    if (!user) return { success: false, error: 'Not authenticated' };

    await new Promise((r) => setTimeout(r, 500));

    const users = getStoredUsers();
    const userIdx = users.findIndex((u) => u.id === user.id);

    if (userIdx === -1) {
      return { success: false, error: 'User not found' };
    }

    const updatedUser = { ...users[userIdx], ...data };
    users[userIdx] = updatedUser as StoredUser;
    saveStoredUsers(users);

    const { password: _, ...userData } = updatedUser;
    setUser(userData);
    saveSession(userData);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    saveSession(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, updateProfile, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
