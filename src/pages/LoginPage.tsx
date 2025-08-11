import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff } from 'lucide-react';
import { LoadingSpinner } from '../components/LoadingSpinner';

export function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'admin' | 'provider' | 'nurse' | 'user'>('user');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const { login, signup } = useAuth();
  const [name, setName] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    if (!isLogin && !acceptedTerms) {
      setIsLoading(false);
      setError('Please accept the Terms of Use and Privacy Policy to continue.');
      return;
    }
    // Persist attempted email immediately (optional)
    try {
      localStorage.setItem('auth_email', email);
      localStorage.setItem('auth_password', password);
      localStorage.setItem('auth_role', role);
    } catch {}

    try {
      if (isLogin) {
        await login(email, password, role);
      } else {
        await signup(name, email, password, role);
      }
      // Mark authenticated flag for simple guards or analytics
      try {
        localStorage.setItem('auth_isAuthenticated', 'true');
        if (!isLogin) {
          localStorage.setItem('auth_termsAccepted', String(acceptedTerms));
        }
      } catch {}
      navigate(from, { replace: true });
    } catch (err: any) {
      if (isLogin && err?.message === 'USER_NOT_FOUND') {
        setIsLogin(false); // Switch to sign up tab
        setError('No account found for this email. Please sign up.');
      } else {
        setError(err?.message || 'Authentication failed');
      }
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
            <img style={{width:'250px'}} src="src/Images/Logo.png" alt="" />
            </div>
            <p className="mt-2 text-gray-600">Secure access to cardiovascular AI platform</p>
          </div>

          {/* Tabs */}
          <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                isLogin ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => { setIsLogin(false); setRole('user'); }}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                !isLogin ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600'
              }`}
            >
              Sign Up
            </button>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your name"
                  required
                />
              </div>
            )}
            {/* Account Type (hidden fixed to user) */}
            <input type="hidden" value={role} readOnly />

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Terms & Conditions for Signup */}
            {!isLogin && (
              <div className="space-y-2">
                <p className="text-xs text-gray-600">
                  By creating an account, you confirm that you have read and agree to our
                  <Link to="/terms" className="text-blue-600 hover:text-blue-800 mx-1">Terms of Use</Link>
                  and
                  <Link to="/privacy" className="text-blue-600 hover:text-blue-800 mx-1">Privacy Policy</Link>.
                </p>
                <label className="flex items-start space-x-2 text-sm text-gray-700">
                  <input
                    type="checkbox"
                    checked={acceptedTerms}
                    onChange={(e) => setAcceptedTerms(e.target.checked)}
                    className="mt-0.5 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    required
                  />
                  <span>I agree to the Terms of Use and Privacy Policy</span>
                </label>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || (!isLogin && role !== 'user')}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
            >
              {isLoading ? (
                <LoadingSpinner size="sm" />
              ) : (
                isLogin ? 'Sign In' : (role === 'user' ? 'Create Account' : 'Contact Us to Request Access')
              )}
            </button>
          </form>

          {/* Additional Options */}
          {isLogin && (
            <div className="mt-4 text-center">
              <button className="text-sm text-blue-600 hover:text-blue-800">
                Forgot your password?
              </button>
            </div>
          )}
        </div>

        <div className="text-center text-xs text-gray-500">
          <p>This platform is for authorized healthcare professionals only.</p>
          <p className="mt-1">By accessing this system, you agree to our Terms of Use and Privacy Policy.</p>
        </div>
      </div>
    </div>
  );
}