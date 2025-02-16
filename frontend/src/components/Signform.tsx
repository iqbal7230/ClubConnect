// client/src/components/Auth/LoginForm.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Label } from '../ui/Label';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include'
      });

      if (response.ok) {
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="max-w-md w-full mx-auto p-6 rounded-2xl bg-white shadow-lg">
      <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-500 bg-clip-text text-transparent">
        Welcome Back
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <Label className="block text-sm font-medium">Email</Label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="space-y-4">
          <Label className="block text-sm font-medium">Password</Label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <Button
          type="submit"
          className="w-full py-2 px-4 bg-gradient-to-r from-blue-600 to-purple-500 text-white rounded-lg hover:opacity-90 transition-opacity"
        >
          Sign In
        </Button>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or continue with</span>
          </div>
        </div>

        <Button
          type="button"
          onClick={() => window.location.href = '/api/auth/google'}
          className="w-full py-2 px-4 bg-white text-gray-700 rounded-lg border hover:bg-gray-50 flex items-center justify-center gap-2"
        >
          <GoogleIcon className="w-5 h-5" />
          Sign in with Google
        </Button>
      </form>
    </div>
  );
};

const GoogleIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 48 48">
    {/* Google SVG paths from previous example */}
  </svg>
);