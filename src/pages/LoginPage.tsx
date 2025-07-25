import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Heart, Eye, EyeOff, Shield, Stethoscope, UserCog } from 'lucide-react';
import { LoadingSpinner } from '../components/LoadingSpinner';

export function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'admin' | 'physician' | 'nurse'>('admin');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/dashboard';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await login(email, password, role);
      navigate(from, { replace: true });
    } catch (err) {
      setError('Invalid credentials. Try: admin@bodycheck.ai, physician@bodycheck.ai, or nurse@bodycheck.ai');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async (demoRole: 'admin' | 'physician' | 'nurse') => {
    setIsLoading(true);
    setError('');
    
    const demoCredentials = {
      admin: 'admin@bodycheck.ai',
      physician: 'physician@bodycheck.ai',
      nurse: 'nurse@bodycheck.ai'
    };

    try {
      await login(demoCredentials[demoRole], 'demo', demoRole);
      navigate(from, { replace: true });
    } catch (err) {
      setError('Demo login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const getRoleInfo = (roleType: string) => {
    switch (roleType) {
      case 'admin':
        return { icon: <Shield className="w-5 h-5" />, label: 'Administrator', desc: 'Full system access' };
      case 'physician':
        return { icon: <Stethoscope className="w-5 h-5" />, label: 'Physician', desc: 'Clinical dashboard access' };
      case 'nurse':
        return { icon: <UserCog className="w-5 h-5" />, label: 'Nurse', desc: 'Patient monitoring access' };
      default:
        return { icon: <UserCog className="w-5 h-5" />, label: 'User', desc: 'Standard access' };
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
              onClick={() => setIsLogin(false)}
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
            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
              <div className="grid grid-cols-1 gap-2">
                {(['admin', 'physician', 'nurse'] as const).map((roleType) => {
                  const roleInfo = getRoleInfo(roleType);
                  return (
                    <button
                      key={roleType}
                      type="button"
                      onClick={() => setRole(roleType)}
                      className={`flex items-center space-x-3 p-3 rounded-lg border transition-colors ${
                        role === roleType
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <div className={role === roleType ? 'text-blue-600' : 'text-gray-400'}>
                        {roleInfo.icon}
                      </div>
                      <div className="text-left">
                        <div className="font-medium">{roleInfo.label}</div>
                        <div className="text-xs text-gray-500">{roleInfo.desc}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

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

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
            >
              {isLoading ? (
                <LoadingSpinner size="sm" />
              ) : (
                isLogin ? 'Sign In' : 'Create Account'
              )}
            </button>
          </form>

          {/* Demo Logins */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600 text-center mb-3">Quick Demo Access:</p>
            <div className="space-y-2">
              {(['admin', 'physician', 'nurse'] as const).map((demoRole) => {
                const roleInfo = getRoleInfo(demoRole);
                return (
                  <button
                    key={demoRole}
                    onClick={() => handleDemoLogin(demoRole)}
                    disabled={isLoading}
                    className="w-full flex items-center justify-center space-x-2 py-2 px-4 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50 transition-colors"
                  >
                    {roleInfo.icon}
                    <span>Demo {roleInfo.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

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