import React, { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  CheckCircle,
  MessageSquare,
  Users,
  Globe,
  Shield,
  Heart,
} from "lucide-react";
import { LoadingSpinner } from "../components/LoadingSpinner";

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    organization: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#002F6C]/5 via-[#00B8A9]/5 to-[#2cf4b4]/5 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-gray-100 p-8 text-center">
          <div className="w-20 h-20 bg-[#00B8A9]/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-[#00B8A9]" />
          </div>
          <h2 className="text-3xl font-bold text-[#002F6C] mb-4">
            Message Sent!
          </h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Thank you for reaching out. Our team will review your message and
            get back to you within 24 hours.
          </p>
          <button
            onClick={() => {
              setIsSubmitted(false);
              setFormData({
                name: "",
                email: "",
                role: "",
                organization: "",
                message: "",
              });
            }}
            className="bg-gradient-to-r from-[#002F6C] to-[#00B8A9] text-white px-8 py-3 rounded-xl hover:from-[#002F6C]/90 hover:to-[#00B8A9]/90 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Send Another Message
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-[#002F6C]/5 to-[#00B8A9]/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-[#00B8A9]/10 rounded-full text-[#00B8A9] text-sm font-medium mb-6">
            <MessageSquare className="w-4 h-4 mr-2" />
            Get in Touch
          </div>
          <h1 className="text-5xl font-bold text-[#002F6C] mb-6 leading-tight">
            Let's Transform Healthcare Together
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Ready to revolutionize your cardiovascular screening workflow? Our
            team is here to help you get started with BodyCheck.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-16">
          {/* Contact Information */}
          <div className="space-y-8">
            {/* <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-[#002F6C] to-[#00B8A9] rounded-xl flex items-center justify-center mr-4">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-[#002F6C]">Get in Touch</h2>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-[#002F6C]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-[#002F6C]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#002F6C] mb-1">Address</h3>
                    <p className="text-gray-600 leading-relaxed">
                      123 Medical Center Drive<br />
                      San Francisco, CA 94110<br />
                      United States
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-[#00B8A9]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-[#00B8A9]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#002F6C] mb-1">Phone</h3>
                    <p className="text-gray-600 font-medium">+1 (555) 123-4567</p>
                    <p className="text-sm text-gray-500">24/7 Technical Support Available</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-[#336cf3]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-[#336cf3]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#002F6C] mb-1">Email</h3>
                    <p className="text-gray-600 font-medium">contact@bodycheck</p>
                    <p className="text-sm text-gray-500">Response within 24 hours</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-[#2cf4b4]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-[#2cf4b4]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#002F6C] mb-1">Business Hours</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Monday - Friday: 8:00 AM - 6:00 PM PST<br />
                      Weekend: Emergency support only
                    </p>
                  </div>
                </div>
              </div>
            </div> */}
            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-[#00B8A9] to-[#2cf4b4] rounded-xl flex items-center justify-center mr-4">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-[#002F6C]">
                  Send us a Message
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-[#002F6C] mb-1"
                    >
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00B8A9] focus:border-transparent transition-all duration-200"
                      placeholder="Dr. John Smith"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-[#002F6C] mb-1"
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00B8A9] focus:border-transparent transition-all duration-200"
                      placeholder="john.smith@hospital.org"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="role"
                      className="block text-sm font-medium text-[#002F6C] mb-1"
                    >
                      Professional Role *
                    </label>
                    <select
                      id="role"
                      name="role"
                      required
                      value={formData.role}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00B8A9] focus:border-transparent transition-all duration-200"
                    >
                      <option value="">Select your role</option>
                      <option value="physician">Physician</option>
                      <option value="radiologist">Radiologist</option>
                      <option value="cardiologist">Cardiologist</option>
                      <option value="administrator">
                        Hospital Administrator
                      </option>
                      <option value="it">IT Director</option>
                      <option value="researcher">Researcher</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="organization"
                      className="block text-sm font-medium text-[#002F6C] mb-1"
                    >
                      Organization
                    </label>
                    <input
                      type="text"
                      id="organization"
                      name="organization"
                      value={formData.organization}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00B8A9] focus:border-transparent transition-all duration-200"
                      placeholder="General Hospital"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-[#002F6C] mb-1"
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00B8A9] focus:border-transparent transition-all duration-200"
                    placeholder="Tell us about your interest in BodyCheck and how we can help your institution..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-[#002F6C] to-[#00B8A9] text-white py-4 px-6 rounded-xl hover:from-[#002F6C]/90 hover:to-[#00B8A9]/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <LoadingSpinner size="sm" />
                      <span className="ml-2">Sending...</span>
                    </>
                  ) : (
                    "Send Message"
                  )}
                </button>
              </form>

              <div className="mt-8 text-center text-sm text-gray-500">
                By submitting this form, you agree to our{" "}
                <a
                  href="/privacy"
                  className="text-[#00B8A9] hover:text-[#002F6C]"
                >
                  Privacy Policy
                </a>{" "}
                and{" "}
                <a
                  href="/terms"
                  className="text-[#00B8A9] hover:text-[#002F6C]"
                >
                  Terms of Service
                </a>
                .
              </div>
            </div>
            {/* Demo Scheduling */}
            <div className="bg-gradient-to-br from-[#002F6C]/5 to-[#00B8A9]/5 border border-[#00B8A9]/20 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-[#002F6C] to-[#00B8A9] rounded-xl flex items-center justify-center mr-4">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[#002F6C]">
                  Schedule a Demo
                </h3>
              </div>
              <p className="text-[#002F6C] mb-6 leading-relaxed">
                Experience BodyCheck firsthand with a personalized demonstration
                tailored to your institution's specific needs and workflow.
              </p>
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="text-center">
                  <div className="text-2xl mb-3">📅</div>
                  <p className="text-sm text-gray-600 mb-6">
                    Book a 30-minute demo session with our clinical team
                  </p>
                  <button className="bg-gradient-to-r from-[#002F6C] to-[#00B8A9] text-white px-8 py-3 rounded-xl hover:from-[#002F6C]/90 hover:to-[#00B8A9]/90 transition-all duration-300 transform hover:scale-105 shadow-lg">
                    Schedule Demo
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-16 bg-white rounded-2xl shadow-xl border border-gray-100 p-10">
          <div className="text-center mb-10">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-[#002F6C]/10 to-[#00B8A9]/10 rounded-full text-[#002F6C] text-sm font-medium mb-4">
              <Globe className="w-4 h-4 mr-2" />
              How We Can Help
            </div>
            <h2 className="text-3xl font-bold text-[#002F6C] mb-4">
              Comprehensive Support for Every Need
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From initial consultation to ongoing support, we're here to ensure
              your success with BodyCheck.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[#002F6C] to-[#00B8A9] rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#002F6C] mb-3">
                Sales Inquiries
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Interested in implementing BodyCheck at your institution?
                Contact our sales team for pricing and deployment options.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[#00B8A9] to-[#2cf4b4] rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#002F6C] mb-3">
                Technical Support
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Need help with integration, PACS connectivity, or technical
                issues? Our support team is available 24/7 for existing
                customers.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[#336cf3] to-[#00B8A9] rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#002F6C] mb-3">
                Research Partnerships
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Interested in collaborative research or clinical validation
                studies? We work with leading academic medical centers
                worldwide.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
