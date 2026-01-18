import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'donor' | 'ngo';
  phone?: string;
  address?: string;
  profileImage?: string;
  verified: boolean;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string, role: 'donor' | 'ngo') => Promise<boolean>;
  signup: (userData: SignupData) => Promise<boolean>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => Promise<boolean>;
}

interface SignupData {
  email: string;
  password: string;
  name: string;
  role: 'donor' | 'ngo';
  phone?: string;
  address?: string;
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

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Mock users database
  const mockUsers: User[] = [
    {
      id: '1',
      email: 'donor@example.com',
      name: 'John Donor',
      role: 'donor',
      phone: '+1234567890',
      address: '123 Main St, City',
      verified: true,
      createdAt: '2024-01-01'
    },
    {
      id: '2',
      email: 'ngo@example.com',
      name: 'Hope Foundation',
      role: 'ngo',
      phone: '+0987654321',
      address: '456 NGO Street, City',
      verified: true,
      createdAt: '2024-01-01'
    }
  ];

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('medmate_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        localStorage.removeItem('medmate_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, role: 'donor' | 'ngo'): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock authentication - check if user exists
    const foundUser = mockUsers.find(u => u.email === email && u.role === role);
    
    if (foundUser && password === 'password123') {
      setUser(foundUser);
      localStorage.setItem('medmate_user', JSON.stringify(foundUser));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const signup = async (userData: SignupData): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user already exists
    const existingUser = mockUsers.find(u => u.email === userData.email);
    if (existingUser) {
      setIsLoading(false);
      return false;
    }
    
    // Create new user
    const newUser: User = {
      id: Date.now().toString(),
      email: userData.email,
      name: userData.name,
      role: userData.role,
      phone: userData.phone,
      address: userData.address,
      verified: false,
      createdAt: new Date().toISOString()
    };
    
    mockUsers.push(newUser);
    setUser(newUser);
    localStorage.setItem('medmate_user', JSON.stringify(newUser));
    setIsLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('medmate_user');
  };

  const updateProfile = async (updates: Partial<User>): Promise<boolean> => {
    if (!user) return false;
    
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem('medmate_user', JSON.stringify(updatedUser));
    
    setIsLoading(false);
    return true;
  };

  const value: AuthContextType = {
    user,
    isLoading,
    login,
    signup,
    logout,
    updateProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
