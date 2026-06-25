import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try { await login(email, password); toast.success('Welcome back'); nav('/admin'); }
    catch (err) { toast.error(err.response?.data?.error || 'Login failed'); }
    finally { setLoading(false); }
  };
  return (
    <div className="min-h-screen grid place-items-center bg-warm-radial px-4">
      <motion.form onSubmit={submit} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="card w-full max-w-md p-7">
        <h1 className="h-display text-2xl font-bold">Admin Login</h1>
        <p className="text-ink-500 text-sm mt-1">Sign in to manage your portfolio.</p>
        <div className="mt-5 space-y-3">
          <input className="input" type="email" required placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input className="input" type="password" required placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button disabled={loading} className="btn-coral w-full mt-5">{loading ? 'Signing in…' : 'Sign in'}</button>
      </motion.form>
    </div>
  );
}
