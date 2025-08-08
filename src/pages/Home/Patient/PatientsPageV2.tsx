import React, { useState } from 'react';
import { Heart, FileText, Brain, Users, Shield, CheckCircle, Mail, Bell } from 'lucide-react';
import { LoadingSpinner } from '../../../components/LoadingSpinner';

export function PatientsPageV2() {
  const [email, setEmail] = useState('');
  const [earlyTesting, setEarlyTesting] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const features = [
    {
      icon: <FileText className="w-8 h-8" />,
      title: "View Your AI Report",
      description: "Secure access to your heart and body composition insights"
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Understand Your Results",
      description: "Easy-to-read guides and explanations from trusted clinicians"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Share with Your Doctor",
      description: "Securely share your AI findings with your care team"
    }
  ];

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="max-w-md w-full text-center px-4">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">You're All Set!</h2>
            <p className="text-gray-600 mb-6">
              Thank you for your interest. We'll notify you as soon as the patient portal is ready.
              {earlyTesting && " You've also been added to our early testing program."}
            </p>
            <button
              onClick={() => {
                setIsSubmitted(false);
                setEmail('');
                setEarlyTesting(false);
              }}
              className="text-[#002F6C] hover:text-[#003A7A] font-medium"
            >
              ← Back to page
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Top Banner Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#F8FAFC] to-[#F1F5F9] py-20">
        <div className="absolute inset-0 bg-gradient-to-r from-[#002F6C]/5 to-[#00B8A9]/5"></div>
        
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center px-4 py-2 bg-[#00B8A9]/10 rounded-full text-[#00B8A9] text-sm font-medium mb-6">
                <Bell className="w-4 h-4 mr-2" />
                Coming Soon
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Personalized Health Insights.
                <span className="block text-[#002F6C]">Coming Soon.</span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                We're building a secure space just for patients — to view reports, 
                understand results, and take control of your heart and metabolic health.
              </p>
              
              <div className="flex items-center justify-center lg:justify-start space-x-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <Shield className="w-4 h-4 mr-2 text-[#00B8A9]" />
                  <span>HIPAA Secure</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-[#00B8A9]" />
                  <span>Clinically Validated</span>
                </div>
              </div>
            </div>

            {/* Right Visual */}
            <div className="relative">
              <div className="relative bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-xl">
                <div className="relative h-80 flex items-center justify-center">
                  {/* Animated Heart Visualization */}
                  <div className="relative">
                    <div className="w-48 h-48 relative">
                      {/* Main Heart Shape */}
                      <div className="absolute inset-0 bg-gradient-to-br from-red-100 to-pink-100 rounded-full animate-pulse flex items-center justify-center">
                        <Heart className="w-24 h-24 text-red-400" />
                      </div>
                      
                      {/* Scanning Lines Animation */}
                      <div className="absolute inset-0 border-2 border-[#00B8A9]/30 rounded-full animate-ping"></div>
                      <div className="absolute inset-4 border border-[#002F6C]/20 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
                      
                      {/* Data Points */}
                      <div className="absolute -top-4 -right-4 bg-[#002F6C] text-white text-xs px-3 py-2 rounded-lg shadow-lg">
                        Your Report
                      </div>
                      <div className="absolute -bottom-4 -left-4 bg-[#00B8A9] text-white text-xs px-3 py-2 rounded-lg shadow-lg">
                        AI Analysis
                      </div>
                      <div className="absolute top-1/2 -left-8 bg-white text-[#002F6C] text-xs px-3 py-2 rounded-lg shadow-lg border">
                        Secure Access
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Blurred Dashboard Preview */}
                <div className="absolute inset-x-4 bottom-4 h-16 bg-gradient-to-r from-[#002F6C]/10 to-[#00B8A9]/10 rounded-lg backdrop-blur-sm border border-white/30 flex items-center justify-center">
                  <div className="text-xs text-gray-500 font-medium">Patient Dashboard Preview</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Email Notification Box */}
      <section className="py-16 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-[#F8FAFC] rounded-2xl p-8 border border-gray-100">
            <div className="w-16 h-16 bg-[#002F6C] rounded-full flex items-center justify-center mx-auto mb-6">
              <Mail className="w-8 h-8 text-white" />
            </div>
            
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Be the First to Know</h2>
            <p className="text-gray-600 mb-8">
              Enter your email and we'll let you know as soon as the patient portal is live.
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="w-full px-6 py-4 text-lg border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#002F6C] focus:border-transparent"
                />
              </div>
              
              <div className="flex items-center justify-center">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={earlyTesting}
                    onChange={(e) => setEarlyTesting(e.target.checked)}
                    className="w-4 h-4 text-[#002F6C] bg-gray-100 border-gray-300 rounded focus:ring-[#002F6C] focus:ring-2"
                  />
                  <span className="ml-3 text-sm text-gray-600">
                    I'd like to participate in early testing
                  </span>
                </label>
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#002F6C] text-white py-4 px-8 rounded-xl font-semibold text-lg hover:bg-[#003A7A] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <LoadingSpinner size="sm" />
                    <span className="ml-2">Submitting...</span>
                  </>
                ) : (
                  'Notify Me'
                )}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* What to Expect Section */}
      <section className="py-16 bg-[#F8FAFC]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What to Expect</h2>
            <p className="text-xl text-gray-600">
              Your personalized health journey, powered by advanced AI
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-[#002F6C]/10 rounded-full flex items-center justify-center mx-auto mb-6 text-[#002F6C]">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-6 py-3 bg-green-50 rounded-full text-green-800 font-medium mb-6">
              <Shield className="w-5 h-5 mr-2" />
              HIPAA Compliant & Secure
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Data is Protected. Always.</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Built with enterprise-grade security and trusted by leading medical institutions worldwide.
            </p>
          </div>

          {/* Security Features */}
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-[#00B8A9]/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-[#00B8A9]" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">End-to-End Encryption</h4>
              <p className="text-sm text-gray-600">Your health data is encrypted and secure</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-[#00B8A9]/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-6 h-6 text-[#00B8A9]" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Clinically Validated</h4>
              <p className="text-sm text-gray-600">AI models validated by medical experts</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-[#00B8A9]/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-[#00B8A9]" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Doctor Approved</h4>
              <p className="text-sm text-gray-600">Trusted by healthcare professionals</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}