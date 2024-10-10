import { useState, useEffect } from 'react';

export default function useAuth() {
  const [user, setUser] = useState<string|undefined>(undefined);

  useEffect(() => {
    // Vérifier s'il y a un token dans localStorage
    const token = localStorage.getItem('token');
    if (token) {
      setUser(token); // Vous pouvez décoder le token si besoin
    }
  }, []);

  const login = async (email: string, password: string) => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (res.ok) {
      localStorage.setItem('token', data.token);
      setUser(data.token);
    } else {
      throw new Error(data.message);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(undefined);
  };

  return { user, login, logout };
}
