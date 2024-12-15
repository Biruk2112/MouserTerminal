import React, { useState } from 'react';
import { Github, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../stores/authStore';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would make an API call here
    await login({ email, password });
    navigate('/dashboard');
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 p-8 bg-[#0d1829] rounded-lg border border-cyan-900">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight">Access Terminal</h2>
          <p className="mt-2 text-sm text-cyan-600">Initialize authentication sequence</p>
        </div>

        <div className="flex border-b border-cyan-900">
          <button
            className={`flex-1 pb-2 ${isLogin ? 'border-b-2 border-cyan-400' : ''}`}
            onClick={() => setIsLogin(true)}
          >
            Sign In
          </button>
          <button
            className={`flex-1 pb-2 ${!isLogin ? 'border-b-2 border-cyan-400' : ''}`}
            onClick={() => setIsLogin(false)}
          >
            Register
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 bg-[#0a0f1c] border border-cyan-900 rounded-md focus:outline-none focus:ring-1 focus:ring-cyan-400"
              placeholder="NAME@EXAMPLE.COM"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 bg-[#0a0f1c] border border-cyan-900 rounded-md focus:outline-none focus:ring-1 focus:ring-cyan-400"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-cyan-900 hover:bg-cyan-800 rounded-md transition-colors"
          >
            INITIALIZE {isLogin ? 'LOGIN' : 'REGISTRATION'} →
          </button>
        </form>

        <div className="space-y-4">
          <p className="text-center text-sm">External Access Points</p>
          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 py-2 px-4 bg-[#0a0f1c] border border-cyan-900 rounded-md hover:bg-cyan-900/20">
              <Github size={20} /> GITHUB
            </button>
            <button className="flex items-center justify-center gap-2 py-2 px-4 bg-[#0a0f1c] border border-cyan-900 rounded-md hover:bg-cyan-900/20">
              <Globe size={20} /> GOOGLE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;