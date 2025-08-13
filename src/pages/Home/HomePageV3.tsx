import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Users, Shield, Award } from "lucide-react";
import { bodyCheckLogoDark } from "../../assets/images";
import { Realistic } from "../../assets/videos";

export const HomePageV3: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDemoAccess = () => {
    navigate("/demo-dashboard");
  };

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Hero Section with Parallax Effect */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Video */}
        <video
          className="absolute inset-0 w-full h-full object-cover z-0"
          src={Realistic}
          autoPlay
          loop
          muted
          playsInline
        />
        {/* Animated Background */}
        <div
          className="absolute inset-0 bg-white opacity-95 z-0"
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
        <div className="relative z-10 text-center text-white max-w-6xl mx-auto px-4">
          {/* BodyCheck Logo */}
          <div className="flex items-center justify-center mb-10 group">
            <img src={bodyCheckLogoDark} alt="BodyCheck Logo" />
          </div>

          {/* Enhanced Tagline */}
          <div className="mb-8">
            <p className="text-3xl lg:text-4xl mb-4 text-black font-light leading-relaxed">
              AI opportunistic screening and care coordination for
            </p>
            <div className="flex flex-wrap justify-center items-center gap-4 text-2xl lg:text-3xl font-medium">
              <span className="bg-gradient-to-r from-[#002F6C] to-[#00B8A9] bg-clip-text text-transparent">
                Cardiovascular
              </span>
              <span className="text-black/60">and</span>
              <span className="bg-gradient-to-r from-cloud-burst to-bright-turquoise bg-clip-text text-transparent">
                Metabolic
              </span>
              <span className="text-black/80">diseases</span>
            </div>
          </div>
          {/* CTA Button */}
          <div className="flex items-center justify-center mt-20">
            <button
              onClick={handleDemoAccess}
              className="bg-gradient-to-r from-[#002F6C] to-[#00B8A9] text-white px-20 py-4 rounded-full text-xl font-semibold hover:from-[#003366] hover:to-[#009B8E] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 min-w-[320px]"
            >
              Access Demo Dashboard
            </button>
          </div>
          {/* Trust Indicators */}
          <div className="mt-16 flex items-center justify-center space-x-8 opacity-60">
            <div className="flex items-center">
              <Shield className="w-5 h-5 text-green-600 mr-2" />
              <span className="text-sm text-gray-600">HIPAA Secure</span>
            </div>
            <div className="flex items-center">
              <Award className="w-5 h-5 text-blue-600 mr-2" />
              <span className="text-sm text-gray-600">FDA Cleared</span>
            </div>
            {/* <div className="flex items-center">
              <Users className="w-5 h-5 text-purple-600 mr-2" />
              <span className="text-sm text-gray-600">50,000+ Scans</span>
            </div> */}
          </div>
        </div>
      </section>
    </div>
  );
};
