import React, { createContext, useContext, useState, useEffect } from 'react';

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
      const response = await fetch('http://localhost:3004/auth/login', {
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