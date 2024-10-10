'use client'
import { useState } from 'react';
import useAuth from '@/hooks/use-auth';

export default async function Home() {
	return <Login />
}

async function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const handleSubmit = async () => {
	await login(email, password);
	alert('Connexion réussie !');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Connexion</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Se connecter</button>
    </form>
  );
}
