import React, { useState } from 'react';
import { Mail, CheckCircle, AlertCircle } from 'lucide-react';
import { bodyCheckLogoDark, PatientBg, Realistic } from '../../../assets';

interface FormState {
  email: string;
  isSubmitting: boolean;
  message: string;
  isSuccess: boolean;
}

const PatientPageV2: React.FC = () => {
  const [formState, setFormState] = useState<FormState>({
    email: '',
    isSubmitting: false,
    message: '',
    isSuccess: false,
  });

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formState.email.trim()) {
      setFormState(prev => ({
        ...prev,
        message: 'Please enter your email address',
        isSuccess: false,
      }));
      return;
    }

    if (!validateEmail(formState.email)) {
      setFormState(prev => ({
        ...prev,
        message: 'Please enter a valid email address',
        isSuccess: false,
      }));
      return;
    }

    setFormState(prev => ({ ...prev, isSubmitting: true, message: '' }));

    // Simulate API call
    setTimeout(() => {
      setFormState({
        email: '',
        isSubmitting: false,
        message: 'Thank you! You\'ll receive priority access when we launch.',
        // message: 'Thank you! We\'ll notify you when we launch.',
        isSuccess: true,
      });

      // Clear success message after 5 seconds
      setTimeout(() => {
        setFormState(prev => ({ ...prev, message: '', isSuccess: false }));
      }, 5000);
    }, 1500);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState(prev => ({
      ...prev,
      email: e.target.value,
      message: '',
      isSuccess: false,
    }));
  };

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Hero Section with Parallax Effect */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Video */}
        <video
          className="absolute inset-0 w-full h-full object-cover z-0"
          style={{ transform: `translateY(${scrollY * 0.5}px)` }}
          src={PatientBg}
          autoPlay
          loop
          muted
          playsInline
        />
        {/* Animated Background */}
        <div
          className="absolute inset-0 bg-white opacity-90 z-0"
          style={{ transform: `translateY(${scrollY * 0.5}px)` }}
        >
          <div className="absolute inset-0 bg-white opacity-20"></div>

          {/* Animated Medical Visualization */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              <div className="w-96 h-96 relative">
                {/* Scanning Rings */}
                <div className="absolute inset-0 border-2 border-black/30 rounded-full animate-ping"></div>
                <div
                  className="absolute inset-8 border border-black/20 rounded-full animate-ping"
                  style={{ animationDelay: "1s" }}
                ></div>
                <div
                  className="absolute inset-16 border border-black/10 rounded-full animate-ping"
                  style={{ animationDelay: "2s" }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center text-cloud-burst max-w-6xl mx-auto px-4">
          <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">
              {/* Logo/Brand */}
              <div className="mb-8 animate-fade-in">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-bright-turquoise/10 backdrop-blur-sm rounded-full border border-bright-turquoise/20 mb-6">
                  <Mail className="w-8 h-8 text-bright-turquoise" />
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-cloud-burst mb-6 leading-tight">
                  Patient
                  <span className="text-bright-turquoise">Care</span>
                </h1>
              </div>

              {/* Coming Soon */}
              <div className="mb-12 animate-slide-up">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-cloud-burst/90 mb-4">
                  Coming Soon
                </h2>
                <p className="text-lg sm:text-xl text-cloud-burst/70 max-w-2xl mx-auto leading-relaxed">
                  A new way to manage your healthcare journey. Get notified when we launch.
                </p>
              </div>

              {/* Email Form */}
              <div className="animate-slide-up animation-delay-300">
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-cloud-burst/90 mb-4">
                    Stay Updated
                  </h3>
                </div>
                
                <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                  <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <div className="flex-1">
                      <input
                        type="email"
                        value={formState.email}
                        onChange={handleEmailChange}
                        placeholder="Enter your email"
                        className="w-full px-6 py-4 bg-white/60 backdrop-blur-sm border border-bright-turquoise/20 rounded-lg text-cloud-burst placeholder-cloud-burst/50 focus:outline-none focus:ring-2 focus:ring-bright-turquoise focus:border-transparent transition-all duration-300"
                        disabled={formState.isSubmitting}
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={formState.isSubmitting}
                      className="px-8 py-4 bg-gradient-to-r from-cloud-burst to-bright-turquoise hover:from-[#003366] hover:to-[#009B8E] text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center min-w-[140px]"
                    >
                      {formState.isSubmitting ? (
                        <div className="flex items-center">
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                          Sending
                        </div>
                      ) : (
                        'Notify Me'
                      )}
                    </button>
                  </div>

                  {/* Message */}
                  {formState.message && (
                    <div className={`flex items-center justify-center p-4 rounded-lg backdrop-blur-sm transition-all duration-300 ${
                      formState.isSuccess 
                        ? 'bg-bright-turquoise/10 border border-bright-turquoise/30 text-bright-turquoise' 
                        : 'bg-red-100/30 border border-red-400/30 text-red-700'
                    }`}>
                      {formState.isSuccess ? (
                        <CheckCircle className="w-5 h-5 mr-2 text-bright-turquoise" />
                      ) : (
                        <AlertCircle className="w-5 h-5 mr-2 text-red-500" />
                      )}
                      {formState.message}
                    </div>
                  )}
                </form>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default PatientPageV2;