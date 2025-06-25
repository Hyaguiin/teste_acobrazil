import { useState, useEffect } from 'react';
import { login, logout, register } from '../services/authService';

export default function useAuth() {
  const [user, setUser] = useState(null);

  const signIn = async (email, password) => {
    const u = await login(email, password);
    setUser(u);
  };

  const signUp = async ({ username, email, password }) => {
    const u = await register({ username, email, password });
    setUser(u);
  };

  const signOut = async () => {
    await logout();
    setUser(null);
  };

  useEffect(() => {
  }, []);

  return { user, signIn, signUp, signOut }; 
}
