import { useEffect, useState } from "react";
import {
  Activity,
  Calendar,
  ChevronRight,
  Download,
  ArrowRight,
  CheckCircle,
  Shield,
  LineChart,
  Copy, FileText, ExternalLink, Eye,
} from "lucide-react";
import {
  apiExamples,
  capabilities,
  complianceFeatures,
  features,
  patents,
  workflowSteps,
} from "./data";
import { radiostics_logo, ResearcherVideo } from "../../../assets";
import { useNavigate } from "react-router-dom";

export const ResearcherPage = () => {
  const [currentKeyword, setCurrentKeyword] = useState(0);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [hoveredPatent, setHoveredPatent] = useState<string | null>(null);
  const [selectedPatent, setSelectedPatent] = useState<string | null>(null);
  const keywords = [
    "Cardiovascular",
    "Neurology",
    "Oncology",
    "Radiology",
    "Genomics",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentKeyword((prev) => (prev + 1) % keywords.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [keywords.length]);

  const handlePatentClick = (patentId: string) => {
    setSelectedPatent(selectedPatent === patentId ? null : patentId);
  };

  const copyToClipboard = (code: string, title: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(title);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const navigate = useNavigate();
  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white opacity-90">
        {/* Background with overlay */}
        <video
          className="absolute inset-0 w-full h-full object-cover z-0"
          src={ResearcherVideo}
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-white/90"></div>
          {/* Animated medical workflow background */}
          <div className="absolute inset-0 opacity-30">
            {/* Floating medical elements */}
            <div className="absolute top-20 left-20 w-32 h-32 border-2 border-blue-400/60 rounded-full animate-pulse">
              <div className="absolute inset-4 border border-blue-300/40 rounded-full"></div>
            </div>
            <div className="absolute top-40 right-32 w-24 h-24 border-2 border-teal-400/60 rounded-lg animate-bounce">
              <div className="absolute inset-2 bg-teal-400/20 rounded"></div>
            </div>
            <div className="absolute bottom-32 left-40 w-28 h-28 border-2 border-blue-300/60 rounded-full animate-ping"></div>
            <div className="absolute bottom-20 right-20 w-20 h-20 border-2 border-teal-300/60 rounded-lg animate-pulse"></div>

            {/* Connecting lines */}
            <svg className="absolute inset-0 w-full h-full">
              <defs>
                <linearGradient
                  id="lineGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#14B8A6" stopOpacity="0.1" />
                </linearGradient>
              </defs>
              <path
                d="M200 150 Q400 100 600 200"
                stroke="url(#lineGradient)"
                strokeWidth="2"
                fill="none"
              />
              <path
                d="M150 400 Q350 350 550 450"
                stroke="url(#lineGradient)"
                strokeWidth="2"
                fill="none"
              />
            </svg>
          </div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <div className="space-y-12">
            <div className="space-y-6">
              <h1 className="text-5xl md:text-7xl font-bold text-slate-900 leading-tight">
                Advanced Medical Imaging <br />
                <span className="bg-gradient-to-r from-[#002F6C] to-[#00B8A9] bg-clip-text text-transparent">
                  AI Research Platform
                </span>
                <span className="block text-2xl md:text-3xl font-normal text-slate-600 mt-6">
                  Accelerating Clinical Discovery Through Validated AI Models
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-slate-700 max-w-4xl mx-auto leading-relaxed font-light">
                Deploy custom algorithms, extract validated biomarkers, and
                contribute to multi-institutional research studies with
                enterprise-grade infrastructure.
              </p>
            </div>

            {/* Rotating keyword slider */}
            <div className="flex items-center justify-center space-x-6 py-2">
              <Activity className="w-6 h-6 text-blue-600" />
              <span className="text-slate-700 text-lg font-medium">
                Research focus:
              </span>
              <div className="relative h-10 w-80">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-teal-600 font-semibold text-xl animate-fade-in-out">
                    {keywords[currentKeyword]}
                  </span>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center ">
              <button onClick={() => { navigate("/contact") }} className="group bg-gradient-to-r from-[#002F6C] to-[#00B8A9] hover:bg-blue-700 text-white px-10 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center space-x-3 shadow-lg">
                <Calendar className="w-5 h-5" />
                <span>Book a Research Demo</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </button>

              {/* <button className="group border-2 border-slate-200 hover:border-teal-500 bg-white/80 backdrop-blur-sm text-slate-700 hover:text-teal-700 px-10 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 flex items-center space-x-3 hover:bg-teal-50">
                <Download className="w-5 h-5" />
                <span>Download Performance Report</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </button> */}
            </div>
          </div>
        </div>
      </section>

      {/* 2nd section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Research Infrastructure for Imaging AI
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Enterprise-grade platform designed for secure deployment and
              validation of medical AI algorithms
            </p>
          </div>

          {/* Feature Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-20">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group p-8 bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl hover:bg-white hover:shadow-2xl transition-all duration-500 cursor-pointer border border-transparent hover:border-gray-200 transform hover:-translate-y-2"
              >
                <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-10 h-10 text-turquoise" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  {feature.description}
                </p>
                <div className="space-y-2">
                  {feature.benefits.map((benefit, idx) => (
                    <div
                      key={idx}
                      className="flex items-center space-x-2 text-sm text-gray-500"
                    >
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Animated Workflow */}
          <div className="relative rounded-3xl p-12 shadow-2xl overflow-hidden">
            {/* Animated Background Elements */}

            {/* Floating Particles */}
            <div className="absolute inset-0">
              {[...Array(15)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-white rounded-full opacity-30 animate-float"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 3}s`,
                    animationDuration: `${3 + Math.random() * 2}s`,
                  }}
                ></div>
              ))}
            </div>

            <div className="relative z-10">
              <div className="text-center mb-16">
                <div className="inline-flex items-center justify-center p-4 bg-white/10 backdrop-blur-sm rounded-2xl mb-6 border border-white/20">
                  <div className="w-3 h-3 bg-gradient-to-r from-cloud-burst to-bright-turquoise rounded-full animate-pulse mr-3"></div>
                  <h3 className="text-4xl font-bold  text-black">
                    Clinical Research Workflow
                  </h3>
                  <div className="w-3 h-3 bg-gradient-to-r from-bay-of-many to-bright-turquoise rounded-full animate-pulse ml-3"></div>
                </div>
                <p className="text-xl text-bay-of-many/80 max-w-3xl mx-auto">
                  Streamlined workflow from data acquisition to research
                  insights with validated AI models
                </p>
              </div>

              {/* Interactive Workflow Visualization */}
              <div className="relative">
                {/* Horizontal Workflow Steps */}
                <div className="flex items-center justify-between space-x-8 py-12">
                  {workflowSteps.map((step, index) => {
                    const colors = [
                      "from-cloud-burst to-bright-turquoise",
                      "from-yellow-300 to-orange-400",
                      "from-bright-turquoise to-bay-of-many",
                      "from-bay-of-many to-cloud-burst",
                      "from-fuchsia-400 to-pink-400",
                    ];

                    const icons = [
                      <FileText className="w-8 h-8 text-white drop-shadow-lg" />,      // Data Collection
                      <Activity className="w-8 h-8 text-white drop-shadow-lg" />,       // Data Processing
                      <LineChart className="w-8 h-8 text-white drop-shadow-lg" />,      // Model Training
                      <CheckCircle className="w-8 h-8 text-white drop-shadow-lg" />,    // Validation
                      <Eye className="w-8 h-8 text-white drop-shadow-lg" />,            // Insights
                    ];

                    return (
                      <div key={index} className="flex-1 group cursor-pointer">
                        {/* Step Card */}
                        <div className="relative">
                          {/* Icon Circle */}
                          <div
                            className={`w-16 h-16 bg-gradient-to-br ${colors[index]} rounded-full flex items-center justify-center shadow-2xl transform transition-all duration-500 group-hover:scale-125 animate-bounce-in border-4 border-white/20 mx-auto mb-4`}
                            style={{ animationDelay: `${index * 0.15}s` }}
                          >
                            <span className="text-2xl drop-shadow-lg">
                              {icons[index]}
                            </span>

                            {/* Glow Effect */}
                            <div
                              className={`absolute inset-0 bg-gradient-to-br ${colors[index]} rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300 -z-10`}
                            ></div>
                          </div>

                          {/* Step Content */}
                          <div className="text-center">
                            <h4 className="font-bold text-cloud-burst text-lg mb-2 group-hover:text-bright-turquoise transition-colors ">
                              {step.title}
                            </h4>
                            <p className="text-bay-of-many/80 text-sm">
                              {step.description}
                            </p>
                          </div>

                          {/* Connecting Arrow */}
                          {index < workflowSteps.length - 1 && (
                            <div className="absolute top-8 -right-4 transform translate-x-full">
                              <div className="w-8 h-0.5 bg-gradient-to-r from-bright-turquoise to-bay-of-many animate-pulse"></div>
                              <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1">
                                <div className="w-0 h-0 border-l-4 border-l-bright-turquoise border-t-2 border-b-2 border-t-transparent border-b-transparent"></div>
                              </div>
                            </div>
                          )}

                          {/* Pulsing Ring */}
                          <div
                            className={`absolute top-0 le w-16 h-16 rounded-full border-2 border-gradient-to-r ${colors[index]} animate-ping opacity-30`}
                            style={{ animationDelay: `${index * 0.4}s` ,left:"50%",transform:"translateX(-50%)"}}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>

              </div>

              {/* Interactive Research Journey */}

              {/* Enhanced CTA */}
              <div className="mt-12 text-center">
                <button onClick={() => { navigate("/contact") }} className="group relative bg-gradient-to-r from-cloud-burst to-bright-turquoise hover:from-bay-of-many hover:via-bright-turquoise hover:to-fuchsia-400 text-white px-12 py-5 rounded-2xl font-bold text-xl transition-all duration-500 transform hover:scale-110 shadow-2xl overflow-hidden">
                  <span className="relative z-10 flex items-center justify-center space-x-3">
                    <span>Call to action</span>
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
                  </span>

                  {/* Animated Background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-full group-hover:translate-x-0"></div>

                  {/* Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-cloud-burst via-bright-turquoise to-bay-of-many blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300 -z-10"></div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* 3rd section */}
      <section className="py-24 ">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">
              Run Your Models Inside
              <span className="block text-bright-turquoise">
                Your Institution
              </span>
            </h2>
            <p className="text-xl text-bay-of-many/80 max-w-4xl mx-auto leading-relaxed text-slate-700">
              Our open infrastructure supports containerized algorithm deployment behind your firewall. Upload exams via a simple GUI or configure routing for automated processing. Run our models. Run your models. Review your results.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {capabilities.map((capability, index) => (
              <div
                key={index}
                className="group p-8 bg-cloud-burst/60 backdrop-blur-sm rounded-3xl hover:bg-cloud-burst/80 transition-all duration-300 transform hover:-translate-y-2 border border-bright-turquoise/20"
              >
                <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
                  <capability.icon className="w-10 h-10 text-bright-turquoise" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">
                  {capability.title}
                </h3>
                <p className="text-bay-of-many/80 leading-relaxed text-slate-700">
                  {capability.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Contribute to Disease Research */}
      <section className="bg-white py-20">
        <div className="text-center max-w-7xl mx-auto px-6">
          <div className="bg-gradient-to-br from-cloud-burst via-bay-of-many to-bright-turquoise rounded-xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-3">
              Participate in Research
            </h3>
            <p className="text-turquoise mb-2 max-w-2xl mx-auto">
              Join our research network for multiinstitutional collaboration in partnership with Radiostics.
            </p>
            <img onClick={() => { window.open("https://www.radiostics.com", "_blank") }} src={radiostics_logo} alt="Radiostics Logo" className="h-24 mx-auto mb-2 cursor-pointer" />
            <button onClick={() => { navigate("/contact") }} className="bg-white text-black hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold transition-colors">
              <span className="relative z-10 flex items-center justify-center space-x-2">
                <span>Call to action</span>
                <ArrowRight className="w-4 h-4" />
              </span>
            </button>
          </div>
        </div>
      </section>
      {/* Research-Ready Tools & APIs */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-cloud-burst mb-4">Integrate & Innovate with Our Platform</h2>
            <p className="text-xl text-bay-of-many/80">
              Comprehensive APIs and tools for seamless research integration
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {apiExamples.map((example, index) => (
              <div key={index} className="bg-gray-900 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">{example.title}</h3>
                  <button
                    onClick={() => copyToClipboard(example.code, example.title)}
                    className="flex items-center px-3 py-1 bg-gray-700 text-gray-300 rounded hover:bg-gray-600 transition-colors"
                  >
                    {copiedCode === example.title ? (
                      <CheckCircle className="w-4 h-4 mr-1" />
                    ) : (
                      <Copy className="w-4 h-4 mr-1" />
                    )}
                    {copiedCode === example.title ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                <pre className="text-sm text-gray-300 overflow-x-auto">
                  <code>{example.code}</code>
                </pre>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* 6th section */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-4">
              <Shield className="w-8 h-8 text-blue-400 mr-3" />
              <h2 className="text-4xl font-bold">
                Built for Secure, Compliant Research
              </h2>
            </div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Enterprise-grade security and compliance features designed for
              healthcare research environments
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {complianceFeatures.map((feature, index) => (
              <div
                key={index}
                className="group p-6 bg-slate-800 rounded-2xl hover:bg-slate-700 transition-all duration-300 cursor-pointer"
              >
                <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  <Shield className="w-8 h-8 text-blue-400 mr-3" />
                </div>
                <h3 className="text-lg font-semibold mb-3 text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>
    </div>
  );
};
