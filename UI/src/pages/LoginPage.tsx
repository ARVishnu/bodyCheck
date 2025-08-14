import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { VerificationModal, VerificationConfig } from '../components/VerificationModal';

export function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'admin' | 'provider' | 'nurse' | 'user'>('user');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const { login, signup, completeSignupAfterVerification, hasPendingSignup, getPendingSignupEmail } = useAuth();
  const [name, setName] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Check URL parameters for initial screen
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const screen = searchParams.get('screen');
    if (screen === 'signup') {
      setIsLogin(false);
    } else if (screen === 'login') {
      setIsLogin(true);
    }
  }, [location.search]);

  // Determine redirect target: prefer router state, fallback to sessionStorage
  const fromState = location.state?.from?.pathname;
  const fromStorage = (() => {
    try { return sessionStorage.getItem('auth_redirect_to') || undefined; } catch { return undefined; }
  })();
  const from = fromState || fromStorage || '/';
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    // Persist attempted email immediately (optional)
    try {
      localStorage.setItem('auth_email', email);
      localStorage.setItem('auth_password', password);
      localStorage.setItem('auth_role', role);
    } catch {}
    
    try {
      await login(email, password, role);
      // Mark authenticated flag for simple guards or analytics
      try {
        localStorage.setItem('auth_isAuthenticated', 'true');
      } catch {}
      navigate(from, { replace: true });
      try { sessionStorage.removeItem('auth_redirect_to'); } catch {}
    } catch (err: any) {
      if (err?.message === 'USER_NOT_FOUND') {
        setIsLogin(false); // Switch to sign up tab
        setError('No account found for this email. Please sign up.');
      } else if (err?.message === 'EMAIL_NOT_VERIFIED') {
        // User exists but email not verified, open verification modal
        setVerificationType('signup');
        setIsVerificationOpen(true);
        setError(''); // Clear any errors
      } else {
        setError(err?.message || 'Authentication failed');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Verification modal state
  const [isVerificationOpen, setIsVerificationOpen] = useState(false);
  const [verificationType, setVerificationType] = useState<'forgot' | 'signup'>('forgot');
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [showSuccessOverlay, setShowSuccessOverlay] = useState(false);

  // Password strength helpers (match forgot-password rules UI)
  const passwordChecks = (pwd: string) => {
    return {
      length: pwd.length >= 8,
      lower: /[a-z]/.test(pwd),
      upper: /[A-Z]/.test(pwd),
      number: /[0-9]/.test(pwd),
      special: /[^A-Za-z0-9]/.test(pwd),
    };
  };

  const strengthScore = (pwd: string) => {
    const c = passwordChecks(pwd);
    return [c.length, c.lower, c.upper, c.number, c.special].filter(Boolean).length;
  };

  const strengthLabel = (score: number) => {
    if (score <= 1) return 'Very weak';
    if (score === 2) return 'Weak';
    if (score === 3) return 'Fair';
    if (score === 4) return 'Strong';
    return 'Very strong';
  };

  // Configuration for different verification flows
  const forgotPasswordConfig: VerificationConfig = {
    title: 'Forgot password',
    emailLabel: 'Email Address',
    emailPlaceholder: 'Enter your account email',
    emailDescription: 'We\'ll send a 6-digit code to {email}',
    otpLabel: 'Enter OTP',
    otpDescription: 'Sent to {email}',
    passwordLabel: 'New password',
    passwordPlaceholder: 'Enter new password',
    confirmPasswordLabel: 'Confirm password',
    confirmPasswordPlaceholder: 'Re-enter new password',
    submitEmailText: 'Send OTP',
    submitOtpText: 'Verify OTP',
    submitPasswordText: 'Reset password',
    successTitle: 'Password reset',
    successMessage: 'Your password has been reset successfully. You can now sign in with your new password.',
    successButtonText: 'Back to sign in',
    backButtonText: 'Back',
    showPasswordStep: true,
    showStepIndicator: true,
    emailCheckEndpoint: '/login',
    sendOtpEndpoint: '/forgot-password',
    resetPasswordEndpoint: '/reset-password',
  };

  const signupVerificationConfig: VerificationConfig = {
    title: 'Verify your email',
    emailLabel: 'Email Address',
    emailPlaceholder: 'Enter your email address',
    emailDescription: 'We\'ll send a 6-digit verification code to {email}',
    otpLabel: 'Enter verification code',
    otpDescription: 'Sent to {email}',
    submitEmailText: 'Send verification code',
    submitOtpText: 'Verify email',
    successTitle: 'Email verified!',
    successMessage: 'Your email has been verified successfully. You can now complete your signup.',
    successButtonText: 'Continue',
    backButtonText: 'Back',
    showPasswordStep: false,
    showStepIndicator: true,
    sendOtpEndpoint: '/signup',
    verifySignupEndpoint: '/signup-verify',
  };

  const openForgotPassword = () => {
    setVerificationType('forgot');
    setIsVerificationOpen(true);
  };

  const openSignupVerification = () => {
    setVerificationType('signup');
    setIsVerificationOpen(true);
    // Auto-fill email in verification modal
    setEmail(email);
  };

  // Pass name and email to verification modal for signup
  const handleVerifyEmailClick = () => {
    if (!name || !email || !password || !acceptedTerms) {
      setError('Please fill in all fields and accept the terms.');
      return;
    }
    // Enforce stronger password similar to forgot password UI
    const checks = passwordChecks(password);
    const strongEnough = checks.length && (checks.lower || checks.upper) && (checks.number || checks.special);
    if (!strongEnough) {
      setError('Password must be at least 8 characters and include letters plus a number or special character.');
      return;
    }
    setVerificationType('signup');
    setIsVerificationOpen(true);
    setError('');
  };

  // Check for pending signups on component mount
  useEffect(() => {
    if (hasPendingSignup()) {
      const pendingEmail = getPendingSignupEmail();
      if (pendingEmail) {
        setEmail(pendingEmail);
        setVerificationType('signup');
        setIsVerificationOpen(true);
        setError('Please complete your email verification to activate your account.');
      }
    }
  }, [hasPendingSignup, getPendingSignupEmail]);

  const handleVerificationSuccess = async () => {
    if (verificationType === 'forgot') {
      setIsLogin(true);
      setPassword('');
    } else if (verificationType === 'signup') {
      try {
        // Email verification successful - mark as verified
        setIsEmailVerified(true);
        setError(''); // Clear any errors
        // Close verification modal
        setIsVerificationOpen(false);

        // Show success overlay for 2 seconds, then auto-sign in and redirect
        setShowSuccessOverlay(true);
        setTimeout(async () => {
          try {
            await login(email, password, role);
            try {
              localStorage.setItem('auth_isAuthenticated', 'true');
              localStorage.setItem('auth_termsAccepted', String(acceptedTerms));
            } catch {}
          } catch {}
          navigate(from, { replace: true });
          try { sessionStorage.removeItem('auth_redirect_to'); } catch {}
          setShowSuccessOverlay(false);
        }, 2000);
      } catch (err: any) {
        setError(err?.message || 'Failed to complete signup');
      }
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
              onClick={() => {
                setIsLogin(true);
                // Preserve original redirect state when toggling tabs
                navigate('/login?screen=login', { replace: true, state: location.state });
              }}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                isLogin ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => { 
                setIsLogin(false); 
                setRole('user');
                // Preserve original redirect state when toggling tabs
                navigate('/login?screen=signup', { replace: true, state: location.state });
              }}
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
              <>
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
                  <label htmlFor="signup-password" className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="signup-password"
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
                  {/* Password strength meter and checklist with animation */}
                  <div
                    className={`mt-2 transition-all duration-800 ease-out overflow-hidden transform ${
                      password ? 'max-h-64 opacity-100 translate-y-0' : 'max-h-0 opacity-0 -translate-y-1'
                    }`}
                  >
                    <div className="h-1.5 bg-gray-200 rounded">
                      <div
                        className={`${['w-1/5','w-2/5','w-3/5','w-4/5','w-full'][Math.min(4, strengthScore(password)-1)] || 'w-0'} h-1.5 rounded ${
                          strengthScore(password) <= 2 ? 'bg-red-400' : strengthScore(password) === 3 ? 'bg-yellow-400' : 'bg-green-500'
                        }`}
                      />
                    </div>
                    <div className="text-xs text-gray-600 mt-1">
                      {password ? strengthLabel(strengthScore(password)) : 'Password strength'}
                    </div>
                    <ul className="mt-2 grid grid-cols-2 gap-1 text-xs">
                      {[
                        { ok: passwordChecks(password).length, label: 'At least 8 characters' },
                        { ok: passwordChecks(password).lower, label: 'Lowercase letter' },
                        { ok: passwordChecks(password).upper, label: 'Uppercase letter' },
                        { ok: passwordChecks(password).number, label: 'Number' },
                        { ok: passwordChecks(password).special, label: 'Special character' },
                      ].map((item, idx) => (
                        <li key={idx} className={`flex items-center gap-1 ${item.ok ? 'text-green-600' : 'text-gray-500'}`}>
                          <span className={`inline-block w-1.5 h-1.5 rounded-full ${item.ok ? 'bg-green-600' : 'bg-gray-400'}`} /> {item.label}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Terms & Conditions for Signup */}
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

                {/* Verify Email Button */}
                <button
                  type="button"
                  onClick={handleVerifyEmailClick}
                  disabled={!name || !email || !password || !acceptedTerms}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                >
                  Verify Email
                </button>
              </>
            )}

            {isLogin && (
              <>
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
                    'Sign In'
                  )}
                </button>
              </>
            )}
          </form>

          {/* Additional Options */}
          {isLogin && (
            <div className="mt-4 text-center">
              <button onClick={openForgotPassword} className="text-sm text-blue-600 hover:text-blue-800">
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

      {/* Verification Modal */}
      <VerificationModal
        isOpen={isVerificationOpen}
        onClose={() => setIsVerificationOpen(false)}
        config={verificationType === 'forgot' ? forgotPasswordConfig : signupVerificationConfig}
        initialEmail={email}
        initialName={verificationType === 'signup' ? name : undefined}
        initialPassword={verificationType === 'signup' ? password : undefined}
        onSuccess={handleVerificationSuccess}
      />

      {showSuccessOverlay && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative z-10 bg-white rounded-2xl shadow-2xl p-10 w-full max-w-lg flex flex-col items-center justify-center text-center">
            <div className="mx-auto mb-6 w-20 h-20 rounded-full bg-green-200 flex items-center justify-center shadow-lg">
              <CheckCircle2 className="w-12 h-12 text-green-600" />
            </div>
            <h2 className="text-3xl font-extrabold text-green-700 mb-3 flex items-center justify-center gap-2">
              Signup Successful
              <CheckCircle2 className="w-8 h-8 text-green-600" />
            </h2>
            <p className="text-lg text-gray-700 mt-2 font-medium">
              Redirecting to your destination...
            </p>
          </div>
        </div>
      )}
    </div>
  );
}