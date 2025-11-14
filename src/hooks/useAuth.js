import React, { createContext, useContext, useState, useEffect } from 'react';
import { API_BASE_URL } from '../config/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (username, password, role) => {
    try {
      // Check API users first
      const response = await fetch(`${API_BASE_URL}/users`);
      const apiUsers = await response.json();
      
      let user = apiUsers.find(u => 
        u.username === username && 
        u.password === password && 
        u.role === role
      );
      
      // If not found in API, check localStorage users
      if (!user) {
        const localUsers = JSON.parse(localStorage.getItem('customUsers') || '[]');
        user = localUsers.find(u => 
          u.username === username && 
          u.password === password && 
          u.role === role
        );
      }
      
      if (user) {
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
        return { success: true };
      } else {
        return { success: false, error: 'Invalid credentials' };
      }
    } catch (error) {
      // Fallback to localStorage only if API fails
      const localUsers = JSON.parse(localStorage.getItem('customUsers') || '[]');
      const user = localUsers.find(u => 
        u.username === username && 
        u.password === password && 
        u.role === role
      );
      
      if (user) {
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
        return { success: true };
      }
      
      return { success: false, error: 'Network error' };
    }
  };

  const loginProduction = async (username, password, role) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, role })
      });
      
      const result = await response.json();
      
      if (result.success) {
        setUser(result.user);
        localStorage.setItem('user', JSON.stringify(result.user));
        return { success: true };
      } else {
        return { success: false, error: result.error };
      }
    } catch (error) {
      return { success: false, error: 'Network error' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const hasRole = (allowedRoles) => {
    if (!user || !allowedRoles) return true;
    return allowedRoles.includes(user.role);
  };

  const value = {
    user,
    login,
    logout,
    hasRole,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};