import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Play,
  ArrowRight,
  Heart,
  Microscope,
  Users,
  Shield,
  CheckCircle,
  User,
  FileText,
  Stethoscope,
  BarChart3,
  Monitor,
  Activity,
  Zap,
  Award,
  TrendingUp,
  Star,
} from "lucide-react";
import {
  bodyCheckLogoLight,
  jack,
  steven,
  yujan,
  andrew,
} from "../../assets/images";
import { useNavigate } from "react-router-dom";

export const HomePage: React.FC = () => {
  const [selectedUserType, setSelectedUserType] = useState<string | null>(null);
  const [scrollY, setScrollY] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [showBody, setShowBody] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleDemoAccess = () => {
    navigate("/login");
  };

  const navigate = useNavigate();


  const userTypes = [
    {
      id: "provider",
      title: "Healthcare Provider",
      subtitle: "Clinical Decision Support",
      description:
        "AI-powered CT analysis for cardiovascular and metabolic screening with seamless workflow integration",
      icon: <Heart className="w-8 h-8" />,
      gradient: "from-blue-500 via-blue-600 to-indigo-600",
      link: "/login",
      features: [
        "AI-powered analysis",
        "Clinical reports",
        "Care coordination",
        "PACS integration",
      ],
      stats: "99.2% Accuracy",
    },
    {
      id: "patient",
      title: "Patient",
      subtitle: "Personal Health Insights",
      description:
        "Secure access to your personalized health insights and comprehensive reports",
      icon: <Users className="w-8 h-8" />,
      gradient: "from-green-500 via-emerald-600 to-teal-600",
      link: "/patientsV2",
      features: [
        "Personal reports",
        "Health insights",
        "Secure access",
        "Easy sharing",
      ],
      stats: "Coming Soon",
    },
    {
      id: "researcher",
      title: "Researcher",
      subtitle: "Clinical Research Platform",
      description:
        "Deploy algorithms and conduct multi-center imaging studies with clinical-grade infrastructure",
      icon: <Microscope className="w-8 h-8" />,
      gradient: "from-purple-500 via-violet-600 to-purple-600",
      link: "/researchers",
      features: [
        "Algorithm deployment",
        "Multi-center studies",
        "Research tools",
        "Data analytics",
      ],
      stats: "15+ Institutions",
    },
  ];

  const capabilities = [
    {
      icon: <Heart className="w-10 h-10" />,
      title: "Cardiovascular Analysis",
      description:
        "Advanced AI for coronary artery calcium scoring and cardiac risk assessment with clinical validation",
      color: "from-red-50 to-pink-50",
      iconColor: "text-red-600",
      stats: "< 60s processing",
      features: [
        "Agatston scoring",
        "Risk stratification",
        "Clinical guidelines",
      ],
    },
    {
      icon: <BarChart3 className="w-10 h-10" />,
      title: "Metabolic Screening",
      description:
        "Comprehensive body composition analysis and metabolic health indicators from routine CT scans",
      color: "from-blue-50 to-cyan-50",
      iconColor: "text-blue-600",
      stats: "99.2% accuracy",
      features: ["Body composition", "Visceral fat", "Muscle mass"],
    },
    {
      icon: <Shield className="w-10 h-10" />,
      title: "Clinical Integration",
      description:
        "Seamless workflow integration with existing healthcare systems, PACS, and EHR platforms",
      color: "from-green-50 to-emerald-50",
      iconColor: "text-green-600",
      stats: "HIPAA compliant",
      features: ["PACS integration", "EHR connectivity", "Secure workflows"],
    },
    {
      icon: <Zap className="w-10 h-10" />,
      title: "Real-time Processing",
      description:
        "Lightning-fast AI analysis with results delivered in under 60 seconds for immediate clinical use",
      color: "from-yellow-50 to-orange-50",
      iconColor: "text-yellow-600",
      stats: "24/7 availability",
      features: ["Instant results", "Cloud processing", "Auto-scaling"],
    },
  ];

  const testimonials = [
    {
      quote:
        "BodyCheck has transformed our cardiovascular screening workflow. The AI insights help us identify at-risk patients earlier.",
      author: "Dr. Sarah Johnson",
      role: "Cardiologist, Mayo Clinic",
      avatar: "SJ",
    },
    {
      quote:
        "The integration with our PACS system was seamless. We're now screening 300% more patients for cardiovascular risk.",
      author: "Dr. Michael Chen",
      role: "Radiologist, Stanford Medicine",
      avatar: "MC",
    },
    {
      quote:
        "Research collaboration through BodyCheck has accelerated our multi-center studies significantly.",
      author: "Dr. Emily Rodriguez",
      role: "Research Director, UAB",
      avatar: "ER",
    },
  ];

  const leadership = [
    {
      name: "Andrew Smith MD PhD",
      role: "Chair of Radiology St. Jude",
      credentials: [
        "Body Radiologist",
        "Radiology AI expert",
        "5+ FDA cleared products",
        "Founded AI Metrics",
        "Cofounded Radiostics",
      ],
      avatar: andrew,
      gradient: "from-blue-500 to-teal-500",
    },
    {
      name: "Steven Rothenberg MD",
      role: "Assistant Professor UAB",
      credentials: [
        "Chest Radiologist",
        "Imaging Informaticist",
        "Radiology AI expert",
        "Founded & Exited EnovAI",
      ],
      avatar: steven,
      gradient: "from-purple-500 to-indigo-500",
    },
    {
      name: "Yujian Shrestha MD",
      role: "AI Imaging Data Scientist",
      credentials: [
        "SaMD and Regulatory Expert",
        "Architect of multiple AI solutions",
        "30+ FDA cleared products",
        "Cofounded Innolitics",
      ],
      avatar: yujan,
      gradient: "from-green-500 to-blue-500",
    },
    {
      name: "Jack Smith",
      role: "CEO of BodyCheck",
      credentials: [
        "Data aggregation & curation",
        "AI Validation & FDA clearance",
        "Cofounded Radiostics",
      ],
      avatar: jack,
      gradient: "from-orange-500 to-red-500",
    },
  ];

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Hero Section with Parallax Effect */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-cloud-burst via-bay-of-many to-bright-turquoise"
          style={{ transform: `translateY(${scrollY * 0.5}px)` }}
        >
          <div className="absolute inset-0 bg-black opacity-20"></div>

          {/* Animated Medical Visualization */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              <div className="w-96 h-96 relative">
                {/* Scanning Rings */}
                <div className="absolute inset-0 border-2 border-white/30 rounded-full animate-ping"></div>
                <div
                  className="absolute inset-8 border border-white/20 rounded-full animate-ping"
                  style={{ animationDelay: "1s" }}
                ></div>
                <div
                  className="absolute inset-16 border border-white/10 rounded-full animate-ping"
                  style={{ animationDelay: "2s" }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center text-white max-w-6xl mx-auto px-4">
          {/* BodyCheck Logo */}
          <div className="flex items-center justify-center mb-20 group">
            <img src={bodyCheckLogoLight} alt="BodyCheck Logo" />
          </div>

          {/* Enhanced Tagline */}
          <div className="mb-8">
            <p className="text-3xl lg:text-4xl mb-4 text-blue-100 font-light leading-relaxed">
              AI opportunistic screening and care coordination for
            </p>
            <div className="flex flex-wrap justify-center items-center gap-4 text-2xl lg:text-3xl font-medium">
              <span className="bg-gradient-to-r from-red-300 to-pink-300 bg-clip-text text-transparent">
                Cardiovascular
              </span>
              <span className="text-white/60">and</span>
              <span className="bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent">
                Metabolic
              </span>
              <span className="text-white/80">diseases</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white relative overflow-hidden">
        {/* CTA Button */}
        <div className="flex items-center justify-center">
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
          <div className="flex items-center">
            <Users className="w-5 h-5 text-purple-600 mr-2" />
            <span className="text-sm text-gray-600">50,000+ Scans</span>
          </div>
        </div>

      </section>

      {showBody && (
        <>
          {/* Core Capabilities Section */}
          <section className="py-24 bg-gradient-to-b from-gray-50 to-white relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-20">
                <div className="inline-flex items-center px-4 py-2 bg-[#00B8A9]/10 rounded-full text-[#00B8A9] text-sm font-medium mb-6">
                  <Award className="w-4 h-4 mr-2" />
                  Clinical-Grade AI Platform
                </div>
                <h2 className="text-5xl font-bold text-[#002F6C] mb-6 leading-tight">
                  Advanced Healthcare Intelligence
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  Comprehensive AI technology delivering actionable health
                  insights from routine medical imaging
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {capabilities.map((capability, index) => (
                  <div
                    key={index}
                    className={`group relative bg-gradient-to-br ${capability.color} rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden`}
                  >
                    {/* Background Pattern */}
                    <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
                      <div className="w-full h-full bg-gradient-to-br from-gray-900 to-transparent rounded-full transform translate-x-16 -translate-y-16"></div>
                    </div>

                    <div className="relative z-10">
                      <div
                        className={`p-4 rounded-xl w-fit mb-6 ${capability.iconColor} bg-white/80 group-hover:scale-110 transition-transform duration-300`}
                      >
                        {capability.icon}
                      </div>

                      <div className="mb-4">
                        <h3 className="text-xl font-bold text-[#002F6C] mb-2 group-hover:text-blue-600 transition-colors">
                          {capability.title}
                        </h3>
                        <div className="text-sm font-medium text-[#00B8A9] mb-3">
                          {capability.stats}
                        </div>
                      </div>

                      <p className="text-gray-700 text-sm leading-relaxed mb-6">
                        {capability.description}
                      </p>

                      <div className="space-y-2">
                        {capability.features.map((feature, idx) => (
                          <div
                            key={idx}
                            className="flex items-center text-xs text-gray-600"
                          >
                            <CheckCircle className="w-3 h-3 text-green-500 mr-2 flex-shrink-0" />
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* What We Do - Enhanced Care Workflow */}
          <section className="py-24 bg-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-20">
                <div className="inline-flex items-center px-4 py-2 bg-blue-50 rounded-full text-blue-600 text-sm font-medium mb-6">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Transforming Healthcare Workflows
                </div>
                <h2 className="text-5xl font-bold text-[#002F6C] mb-6">
                  Enhanced Care Coordination
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  See how BodyCheck transforms traditional care pathways with
                  AI-powered insights and coordinated care
                </p>
              </div>

              {/* Traditional vs Enhanced Workflow */}
              <div className="space-y-16">
                {/* Traditional Path */}
                <div className="relative">
                  <div className="text-center mb-8">
                    <span className="inline-block bg-gray-100 text-gray-700 px-6 py-3 rounded-full text-sm font-medium">
                      Traditional Care Path
                    </span>
                  </div>
                  <div className="flex flex-col lg:flex-row items-center justify-between space-y-8 lg:space-y-0 lg:space-x-6">
                    {[
                      {
                        icon: <Activity className="w-8 h-8" />,
                        title: "CT Scan",
                        desc: "Routine imaging",
                        color: "bg-gray-100 border-gray-200",
                      },
                      {
                        icon: <User className="w-8 h-8" />,
                        title: "Radiologist",
                        desc: "Manual review",
                        color: "bg-[#00B8A9]/10 border-[#00B8A9]/20",
                      },
                      {
                        icon: <FileText className="w-8 h-8" />,
                        title: "Report",
                        desc: "Standard findings",
                        color: "bg-gray-100 border-gray-200",
                      },
                      {
                        icon: <Stethoscope className="w-8 h-8" />,
                        title: "Provider",
                        desc: "Clinical decision",
                        color: "bg-[#00B8A9]/10 border-[#00B8A9]/20",
                      },
                      {
                        icon: <Users className="w-8 h-8" />,
                        title: "Patient",
                        desc: "Treatment plan",
                        color: "bg-green-100 border-green-200",
                      },
                    ].map((step, index) => (
                      <React.Fragment key={index}>
                        <div className="flex flex-col items-center text-center group">
                          <div
                            className={`w-20 h-20 rounded-xl flex items-center justify-center mb-4 border-2 ${step.color} group-hover:scale-105 transition-transform`}
                          >
                            <div className="text-gray-600">{step.icon}</div>
                          </div>
                          <h4 className="font-semibold text-[#002F6C] mb-1">
                            {step.title}
                          </h4>
                          <p className="text-sm text-gray-500">{step.desc}</p>
                        </div>
                        {index < 4 && (
                          <ArrowRight className="w-6 h-6 text-gray-400 hidden lg:block" />
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                {/* BodyCheck Enhanced Path */}
                <div className="relative bg-gradient-to-r from-blue-50 via-teal-50 to-blue-50 rounded-3xl p-12 border border-blue-100 shadow-lg">
                  <div className="text-center mb-8">
                    <span className="inline-block bg-[#00B8A9] text-white px-6 py-3 rounded-full text-sm font-medium shadow-lg">
                      BodyCheck Enhanced Care Path
                    </span>
                  </div>
                  <div className="flex flex-col lg:flex-row items-center justify-between space-y-8 lg:space-y-0 lg:space-x-6">
                    {[
                      {
                        icon: (
                          <div className="relative">
                            <CheckCircle className="w-6 h-6 text-white" />
                            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-blue-500 rounded-full"></div>
                          </div>
                        ),
                        title: "BodyCheck AI",
                        desc: "Automated analysis",
                        color: "bg-white border-[#00B8A9] shadow-lg",
                        highlight: true,
                      },
                      {
                        icon: <BarChart3 className="w-8 h-8" />,
                        title: "CTR Report",
                        desc: "AI insights",
                        color: "bg-white border-red-300 shadow-lg",
                      },
                      {
                        icon: <Monitor className="w-8 h-8" />,
                        title: "Care Coordination",
                        desc: "Smart routing",
                        color: "bg-white border-[#00B8A9] shadow-lg",
                      },
                      {
                        icon: <Heart className="w-8 h-8" />,
                        title: "Cardiology",
                        desc: "Specialist care",
                        color: "bg-[#00B8A9]/10 border-[#00B8A9]",
                      },
                      {
                        icon: <Activity className="w-8 h-8" />,
                        title: "Advanced Care",
                        desc: "Targeted treatment",
                        color: "bg-black text-white border-gray-300",
                      },
                    ].map((step, index) => (
                      <React.Fragment key={index}>
                        <div className="flex flex-col items-center text-center group">
                          <div
                            className={`w-20 h-20 rounded-xl flex items-center justify-center mb-4 border-2 ${
                              step.color
                            } group-hover:scale-110 transition-all duration-300 ${
                              step.highlight ? "animate-pulse" : ""
                            }`}
                          >
                            <div
                              className={
                                step.color.includes("text-white")
                                  ? "text-white"
                                  : "text-[#00B8A9]"
                              }
                            >
                              {step.icon}
                            </div>
                          </div>
                          <h4 className="font-semibold text-[#002F6C] mb-1">
                            {step.title}
                          </h4>
                          <p className="text-sm text-gray-600">{step.desc}</p>
                        </div>
                        {index < 4 && (
                          <ArrowRight className="w-6 h-6 text-[#00B8A9] hidden lg:block animate-pulse" />
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* User Type Selection - Enhanced */}
          <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-20">
                <div className="inline-flex items-center px-4 py-2 bg-purple-50 rounded-full text-purple-600 text-sm font-medium mb-6">
                  <Users className="w-4 h-4 mr-2" />
                  Choose Your Experience
                </div>
                <h2 className="text-5xl font-bold text-[#002F6C] mb-6">
                  Tailored for Your Role
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Select your path to access tools and insights designed
                  specifically for your needs
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {userTypes.map((userType) => (
                  <Link
                    key={userType.id}
                    to={userType.link}
                    className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 border border-gray-100 overflow-hidden"
                    onMouseEnter={() => setSelectedUserType(userType.id)}
                    onMouseLeave={() => setSelectedUserType(null)}
                  >
                    {/* Background Gradient */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${userType.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                    ></div>

                    {/* Floating Elements */}
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-4 group-hover:translate-x-0">
                      <div
                        className={`w-12 h-12 bg-gradient-to-br ${userType.gradient} rounded-full flex items-center justify-center text-white text-xs font-bold`}
                      >
                        {userType.stats.split(" ")[0]}
                      </div>
                    </div>

                    <div className="relative z-10">
                      {/* Icon */}
                      <div
                        className={`w-20 h-20 bg-gradient-to-br ${userType.gradient} rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg`}
                      >
                        {userType.icon}
                      </div>

                      {/* Content */}
                      <div className="mb-6">
                        <div className="text-sm font-medium text-gray-500 mb-2">
                          {userType.subtitle}
                        </div>
                        <h3 className="text-2xl font-bold text-[#002F6C] mb-4 group-hover:text-blue-600 transition-colors">
                          {userType.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed mb-6">
                          {userType.description}
                        </p>
                      </div>

                      {/* Features */}
                      <div className="space-y-3 mb-8">
                        {userType.features.map((feature, index) => (
                          <div
                            key={index}
                            className="flex items-center text-sm text-gray-600 transform translate-x-0 group-hover:translate-x-2 transition-transform duration-300"
                            style={{ transitionDelay: `${index * 100}ms` }}
                          >
                            <CheckCircle className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                            {feature}
                          </div>
                        ))}
                      </div>

                      {/* CTA */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-[#00B8A9] font-semibold group-hover:text-blue-600 transition-colors">
                          <span>Get Started</span>
                          <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
                        </div>
                        <div className="text-xs text-gray-500 font-medium">
                          {userType.stats}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* Social Proof - Testimonials */}
          <section className="py-24 bg-[#002F6C] text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-[#002F6C] to-[#00B8A9] opacity-90"></div>
            <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <div className="inline-flex items-center px-4 py-2 bg-white/10 rounded-full text-white/80 text-sm font-medium mb-6">
                  <Star className="w-4 h-4 mr-2" />
                  Trusted by Healthcare Leaders
                </div>
                <h2 className="text-4xl font-bold mb-6">
                  What Healthcare Professionals Say
                </h2>
              </div>

              <div className="relative">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                  <div className="text-center">
                    <div className="text-2xl mb-6 leading-relaxed">
                      "{testimonials[currentTestimonial].quote}"
                    </div>
                    <div className="flex items-center justify-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#00B8A9] to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                        {testimonials[currentTestimonial].avatar}
                      </div>
                      <div className="text-left">
                        <div className="font-semibold">
                          {testimonials[currentTestimonial].author}
                        </div>
                        <div className="text-white/80 text-sm">
                          {testimonials[currentTestimonial].role}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Testimonial Indicators */}
                <div className="flex justify-center mt-6 space-x-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentTestimonial(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentTestimonial
                          ? "bg-white"
                          : "bg-white/30"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Leadership Team - Enhanced */}
          <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-20">
                <div className="inline-flex items-center px-4 py-2 bg-blue-50 rounded-full text-blue-600 text-sm font-medium mb-6">
                  <Award className="w-4 h-4 mr-2" />
                  Expert Leadership
                </div>
                <h2 className="text-5xl font-bold text-[#002F6C] mb-6">
                  World-Class Medical AI Team
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Leading experts in radiology, AI, and healthcare innovation
                  driving the future of medical imaging
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                {leadership.map((leader, index) => (
                  <div
                    key={index}
                    className="group bg-gray-50 rounded-2xl p-6 text-center hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100"
                  >
                    <div
                      className={`w-24 h-24 bg-gradient-to-br ${leader.gradient} rounded-full mx-auto mb-6 flex items-center justify-center text-white font-bold text-lg group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                    >
                      <img
                        src={leader.avatar}
                        alt="Yujan Shrestha"
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                    <h3 className="text-xl font-bold text-[#002F6C] mb-2">
                      {leader.name}
                    </h3>
                    <div className="text-[#00B8A9] font-medium text-sm mb-4">
                      {leader.role}
                    </div>
                    <div className="space-y-2">
                      {leader.credentials.map((credential, idx) => (
                        <div
                          key={idx}
                          className="text-xs text-gray-600 flex items-center"
                        >
                          <div className="w-1 h-1 bg-[#00B8A9] rounded-full mr-2"></div>
                          {credential}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Company Stats */}
              <div className="text-center">
                <div className="inline-flex items-center space-x-12 bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-8 shadow-sm border border-gray-100">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#002F6C] mb-1">
                      2023
                    </div>
                    <div className="text-sm text-gray-600">Founded</div>
                  </div>
                  <div className="w-px h-12 bg-gray-200"></div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#002F6C] mb-1">
                      Self-Funded
                    </div>
                    <div className="text-sm text-gray-600">
                      Bootstrap Growth
                    </div>
                  </div>
                  <div className="w-px h-12 bg-gray-200"></div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#002F6C] mb-1">
                      15+
                    </div>
                    <div className="text-sm text-gray-600">
                      Partner Institutions
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Trust & Compliance - Final CTA */}
          <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <div className="mb-12">
                <div className="inline-flex items-center px-4 py-2 bg-green-50 rounded-full text-green-600 text-sm font-medium mb-6">
                  <Shield className="w-4 h-4 mr-2" />
                  Enterprise-Grade Security
                </div>
                <h2 className="text-4xl font-bold text-[#002F6C] mb-6">
                  Trusted by Healthcare Professionals Worldwide
                </h2>
                <p className="text-xl text-gray-600 mb-12">
                  Built with enterprise-grade security, clinical validation, and
                  regulatory compliance
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8 mb-12">
                {[
                  {
                    icon: <Shield className="w-10 h-10" />,
                    title: "HIPAA Compliant",
                    desc: "Enterprise-grade security and privacy protection",
                    color: "from-green-500 to-emerald-500",
                  },
                  {
                    icon: <CheckCircle className="w-10 h-10" />,
                    title: "FDA Cleared",
                    desc: "Clinically validated AI algorithms",
                    color: "from-blue-500 to-cyan-500",
                  },
                  {
                    icon: <Users className="w-10 h-10" />,
                    title: "Globally Trusted",
                    desc: "Used by leading healthcare institutions",
                    color: "from-purple-500 to-violet-500",
                  },
                ].map((item, index) => (
                  <div key={index} className="group text-center">
                    <div
                      className={`w-20 h-20 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center mx-auto mb-6 text-white group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                    >
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-[#002F6C] mb-3">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>

              <div className="bg-gradient-to-r from-[#002F6C] to-[#00B8A9] rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">
                  Ready to Transform Your Healthcare Workflow?
                </h3>
                <p className="text-blue-100 mb-6">
                  Join leading healthcare institutions using BodyCheck for
                  AI-powered patient care
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    to="/login"
                    className="bg-white text-[#002F6C] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center"
                  >
                    <Stethoscope className="w-5 h-5 mr-2" />
                    Healthcare Providers
                  </Link>
                  <Link
                    to="/researchers"
                    className="bg-white/20 backdrop-blur-sm border border-white/30 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/30 transition-colors flex items-center justify-center"
                  >
                    <Microscope className="w-5 h-5 mr-2" />
                    Researchers
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
};
