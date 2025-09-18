import React, { useEffect, useRef, useState } from 'react';
import { X, Clock, Mail, KeyRound, ShieldCheck, CheckCircle2, ArrowLeft, RefreshCw } from 'lucide-react';
import { LoadingSpinner } from './LoadingSpinner';
import { ApiUrl } from '../services/ApiUrl';

export interface VerificationConfig {
  title: string;
  emailLabel: string;
  emailPlaceholder: string;
  emailDescription?: string;
  otpLabel: string;
  otpDescription?: string;
  passwordLabel?: string;
  passwordPlaceholder?: string;
  confirmPasswordLabel?: string;
  confirmPasswordPlaceholder?: string;
  submitEmailText: string;
  submitOtpText: string;
  submitPasswordText?: string;
  successTitle: string;
  successMessage: string;
  successButtonText: string;
  backButtonText?: string;
  showPasswordStep?: boolean;
  showStepIndicator?: boolean;
  emailCheckEndpoint?: string;
  sendOtpEndpoint: string;
  verifyOtpEndpoint?: string;
  resetPasswordEndpoint?: string;
  verifySignupEndpoint?: string;
  completeSignupEndpoint?: string;
}

interface VerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: VerificationConfig;
  initialEmail?: string;
  initialName?: string;
  initialPassword?: string;
  onSuccess?: (data?: any) => void;
  baseUrl?: string;
}

export function VerificationModal({ 
  isOpen, 
  onClose, 
  config, 
  initialEmail = '', 
  initialName = '',
  initialPassword = '',
  onSuccess,
  baseUrl = '/api'
}: VerificationModalProps) {
  const [step, setStep] = useState<'email' | 'otp' | 'password' | 'success'>('email');
  const [email, setEmail] = useState(initialEmail);
  const [name, setName] = useState(initialName);
  const [formPassword, setFormPassword] = useState(initialPassword);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpDigits, setOtpDigits] = useState<string[]>(['', '', '', '', '', '']);
  const otpInputsRef = useRef<Array<HTMLInputElement | null>>([]);
  const [otpExpiresAt, setOtpExpiresAt] = useState<number | null>(null);
  const [nowTs, setNowTs] = useState<number>(Date.now());
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const remainingSeconds = otpExpiresAt ? Math.max(0, Math.floor((otpExpiresAt - nowTs) / 1000)) : 0;
  const remainingMinStr = `${Math.floor(remainingSeconds / 60)}`.padStart(2, '0');
  const remainingSecStr = `${remainingSeconds % 60}`.padStart(2, '0');

  // Modal loading effect when opening
  useEffect(() => {
    if (isOpen) {
      setModalLoading(true);
      const timer = setTimeout(() => {
        setModalLoading(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Update email, name, and password when props change
  useEffect(() => {
    if (initialEmail) {
      setEmail(initialEmail);
    }
    if (initialName) {
      setName(initialName);
    }
    if (initialPassword) {
      setFormPassword(initialPassword);
    }
  }, [initialEmail, initialName, initialPassword]);

  // Timer for OTP countdown
  useEffect(() => {
    if (!isOpen || step !== 'otp') return;
    const id = setInterval(() => setNowTs(Date.now()), 1000);
    return () => clearInterval(id);
  }, [isOpen, step]);

  // Keep otp string in sync with segmented inputs
  useEffect(() => {
    if (step !== 'otp') return;
    setOtp(otpDigits.join(''));
  }, [otpDigits, step]);

  // Focus first OTP input when entering OTP step
  useEffect(() => {
    if (step === 'otp') {
      const t = setTimeout(() => otpInputsRef.current[0]?.focus(), 0);
      return () => clearTimeout(t);
    }
  }, [step]);

  const resetState = () => {
    setStep('email');
    setEmail(initialEmail);
    setError('');
    setOtp('');
    setOtpDigits(['', '', '', '', '', '']);
    setPassword('');
    setConfirmPassword('');
    setOtpExpiresAt(null);
    setModalLoading(false);
    setFormPassword(initialPassword);
  };

  const handleClose = () => {
    resetState();
    onClose();
  };

  const handleOtpChange = (index: number, value: string) => {
    const sanitized = value.replace(/\D/g, '').slice(0, 1);
    const next = [...otpDigits];
    next[index] = sanitized;
    setOtpDigits(next);
    if (sanitized && index < otpInputsRef.current.length - 1) {
      otpInputsRef.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      const prevIndex = index - 1;
      otpInputsRef.current[prevIndex]?.focus();
      const next = [...otpDigits];
      next[prevIndex] = '';
      setOtpDigits(next);
      e.preventDefault();
    }
    if (e.key === 'ArrowLeft' && index > 0) {
      otpInputsRef.current[index - 1]?.focus();
      e.preventDefault();
    }
    if (e.key === 'ArrowRight' && index < otpInputsRef.current.length - 1) {
      otpInputsRef.current[index + 1]?.focus();
      e.preventDefault();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (!pasted) return;
    const next = pasted.split('');
    while (next.length < 6) next.push('');
    setOtpDigits(next);
    const lastIndex = Math.min(pasted.length, 5);
    otpInputsRef.current[lastIndex]?.focus();
    e.preventDefault();
  };

  // Password strength helpers
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

  const checkEmailExists = async (targetEmail: string) => {
    if (!config.emailCheckEndpoint) return true; // Skip check if no endpoint provided
    
    try {
      const resp = await fetch(`${ApiUrl.baseUrl}${config.emailCheckEndpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: targetEmail, password: '__CHECK__' }),
      });
      if (resp.status === 404) return false;
      return true;
    } catch (e) {
      throw new Error('Network error while checking email');
    }
  };

  const submitEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      // For signup verification, we need to create the account first
      if (config.sendOtpEndpoint === '/signup') {
        // This is a signup flow - create account with actual name and password
        const resp = await fetch(`${ApiUrl.baseUrl}${config.sendOtpEndpoint}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            full_name: name || 'Temporary User', // Use actual name if provided
            email, 
            password: formPassword || 'temp_password_123' // Use actual password if provided
          }),
        });

        if (!resp.ok) {
          const errorText = await resp.text();
          throw new Error(errorText || 'Failed to create account. Please try again.');
        }
      } else {
        // This is a forgot password flow - check if email exists first
        const exists = await checkEmailExists(email);
        if (!exists) {
          setError('No account found for this email.');
          return;
        }

        const resp = await fetch(`${ApiUrl.baseUrl}${config.sendOtpEndpoint}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        });

        if (!resp.ok) {
          throw new Error('Failed to send OTP. Please try again.');
        }
      }

      setOtpExpiresAt(Date.now() + 15 * 60 * 1000);
      setStep('otp');
    } catch (err: any) {
      setError(err?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (otp.trim().length < 4) {
      setError('Please enter the OTP sent to your email.');
      return;
    }
    
    if (otpExpiresAt && Date.now() > otpExpiresAt) {
      setError('OTP has expired. Please request a new one.');
      return;
    }

    if (config.showPasswordStep) {
      setStep('password');
    } else {
      // For signup verification, verify OTP directly
      await verifyOtpWithBackend();
    }
  };

  const verifyOtpWithBackend = async () => {
    setLoading(true);
    try {
      const endpoint = config.verifySignupEndpoint || config.verifyOtpEndpoint;
      if (!endpoint) {
        throw new Error('No verification endpoint configured');
      }

      const resp = await fetch(`${ApiUrl.baseUrl}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });

      if (!resp.ok) {
        throw new Error('OTP is not valid');
      }

      setStep('success');
      onSuccess?.();
    } catch (err: any) {
      setError(err?.message || 'OTP is not valid');
    } finally {
      setLoading(false);
    }
  };

  const submitPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      // Check if this is a signup completion or password reset
      if (config.completeSignupEndpoint) {
        // This is a signup completion
        const resp = await fetch(`${ApiUrl.baseUrl}${config.completeSignupEndpoint}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, otp, password }),
        });

        if (!resp.ok) {
          const text = await resp.text();
          throw new Error(text || 'Failed to complete signup');
        }
      } else if (config.resetPasswordEndpoint) {
        // This is a password reset
        const resp = await fetch(`${ApiUrl.baseUrl}${config.resetPasswordEndpoint}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, otp, new_password: password }),
        });

        if (!resp.ok) {
          const text = await resp.text();
          throw new Error(text || 'Failed to reset password');
        }
      } else {
        throw new Error('No endpoint configured for password submission');
      }

      setStep('success');
      onSuccess?.();
    } catch (err: any) {
      setError(err?.message || 'Failed to complete the process');
    } finally {
      setLoading(false);
    }
  };

  const resendOtp = async () => {
    if (!email) return;
    setError('');
    setLoading(true);
    
    try {
      const resp = await fetch(`${ApiUrl.baseUrl}${config.sendOtpEndpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!resp.ok) {
        throw new Error('Unable to resend OTP');
      }

      setOtp('');
      setOtpDigits(['', '', '', '', '', '']);
      setOtpExpiresAt(Date.now() + 15 * 60 * 1000);
    } catch (err: any) {
      setError(err?.message || 'Unable to resend OTP');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40 " onClick={handleClose} />
      <div className="relative z-10 w-full max-w-md bg-white rounded-lg shadow-xl mx-5">
        {modalLoading && (
          <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center rounded-lg z-20">
            <div className="flex flex-col items-center gap-3">
              <LoadingSpinner size="lg" />
              <p className="text-sm text-gray-600">Loading...</p>
            </div>
          </div>
        )}
        <div className="flex items-center justify-between align-start px-5 py-4 border-b">
          <div className="flex-1">
            <h3 className="text-lg font-semibold">
              {step === 'email' && config.title}
              {step === 'otp' && config.otpLabel}
              {step === 'password' && config.passwordLabel}
              {step === 'success' && config.successTitle}
            </h3>
            {config.showStepIndicator && (
              <div className="mt-2 flex items-center gap-2">
                {['email', 'otp', 'password'].map((s, idx) => (
                  <div key={s} className="flex items-center gap-2">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium border ${
                      (step === s || (step === 'otp' && idx <= 1) || (step === 'password' && idx <= 2) || (step === 'success' && idx <= 2))
                        ? 'bg-blue-600 text-white border-blue-600' : 'bg-gray-100 text-gray-500 border-gray-300'
                    }`}>
                      {idx + 1}
                    </div>
                    {idx < 2 && <div className={`h-0.5 w-8 ${
                      (step === 'otp' && idx >= 0) || (step === 'password' && idx >= 0) || (step === 'success' && idx >= 0)
                        ? 'bg-blue-600' : 'bg-gray-200'
                    }`} />}
                  </div>
                ))}
              </div>
            )}
          </div>
          <button onClick={handleClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-4">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md text-sm text-red-700">
              {error}
            </div>
          )}

          {step === 'email' && (
            <form onSubmit={submitEmail} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {config.emailLabel}
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className={`w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      initialEmail 
                        ? 'border-gray-200 bg-gray-50 text-gray-600 cursor-not-allowed' 
                        : 'border-gray-300 bg-white text-gray-900'
                    }`}
                    placeholder={config.emailPlaceholder}
                    readOnly={!!initialEmail}
                  />
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
                {email && config.emailDescription && (
                  <p className="text-xs text-gray-500 mt-1">
                    {config.emailDescription.replace('{email}', email.replace(/(^.).+(@.*$)/, '$1***$2'))}
                  </p>
                )}
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 flex items-center justify-center"
              >
                {loading ? <LoadingSpinner size="sm" /> : config.submitEmailText}
              </button>
            </form>
          )}

          {step === 'otp' && (
            <form onSubmit={verifyOtp} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {config.otpLabel}
                </label>
                <div className="flex items-center justify-between gap-2" onPaste={handleOtpPaste}>
                  {otpDigits.map((d, i) => (
                    <input
                      key={i}
                      ref={(el) => (otpInputsRef.current[i] = el)}
                      type="text"
                      inputMode="numeric"
                      value={d}
                      onChange={(e) => handleOtpChange(i, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(i, e)}
                      className="w-12 h-12 text-center text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      maxLength={1}
                      required
                    />
                  ))}
                </div>
                {config.otpDescription && (
                  <p className="text-xs text-gray-500 mt-2">
                    {config.otpDescription.replace('{email}', email.replace(/(^.).+(@.*$)/, '$1***$2'))}
                  </p>
                )}
              </div>
              <div className="flex items-center justify-between text-xs text-gray-600">
                <div className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Expires in {remainingMinStr}:{remainingSecStr}</span>
                </div>
                <button type="button" onClick={resendOtp} className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800">
                  <RefreshCw className="w-3.5 h-3.5" /> Resend code
                </button>
              </div>
              <button
                type="submit"
                disabled={loading || remainingSeconds === 0}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 flex items-center justify-center"
              >
                {loading ? <LoadingSpinner size="sm" /> : config.submitOtpText}
              </button>
            </form>
          )}

          {step === 'password' && (
            <form onSubmit={submitPassword} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {config.passwordLabel}
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder={config.passwordPlaceholder}
                    required
                  />
                  <KeyRound className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
                <div className="mt-2">
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
                        <ShieldCheck className={`w-3.5 h-3.5 ${item.ok ? '' : 'opacity-50'}`} /> {item.label}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {config.confirmPasswordLabel}
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={config.confirmPasswordPlaceholder}
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 flex items-center justify-center"
              >
                {loading ? <LoadingSpinner size="sm" /> : config.submitPasswordText}
              </button>
              {config.backButtonText && (
                <button
                  type="button"
                  onClick={() => setStep('otp')}
                  className="w-full mt-2 text-blue-600 hover:text-blue-800 inline-flex items-center justify-center gap-1 text-sm"
                >
                  <ArrowLeft className="w-4 h-4" /> {config.backButtonText}
                </button>
              )}
            </form>
          )}

          {step === 'success' && (
            <div className="space-y-4">
              <div className="flex items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
              </div>
              <p className="text-sm text-gray-700 text-center">
                {config.successMessage}
              </p>
              <button
                onClick={handleClose}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {config.successButtonText}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
