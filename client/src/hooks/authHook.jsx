import { useState, useEffect } from 'react';
import { login, logout, register } from '../services/authService';

export default function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const signIn = async (email, password) => {
    const u = await login(email, password);
    setUser(u);
    localStorage.setItem('user', JSON.stringify(u));
  };

  const signUp = async ({ username, email, password }) => {
    const u = await register({ username, email, password });
    setUser(u);
    localStorage.setItem('user', JSON.stringify(u));
  };

  const signOut = async () => {
    await logout();
    setUser(null);
    localStorage.removeItem('user');
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  return { user, signIn, signUp, signOut, loading };
}
