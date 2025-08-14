import React, { useEffect, useState } from "react";
import {
  Activity,
  Calendar,
  ChevronRight,
  Download,
  ArrowRight,
  TrendingUp,
  CheckCircle,
  BookOpen,
  Search,
  Award,
  User,
  Globe,
  Users,
  Shield,
  LineChart,
  Copy,FileText, ExternalLink,  Building,   Eye, } from "lucide-react";
import {
    apiExamples,
  benefits,
  capabilities,
  categories,
  complianceFeatures,
  features,
  metrics,
  patents,
  performanceMetrics,
  publications,
  workflowSteps,
} from "./data";
import {  ResearcherVideo } from "../../../assets";

export const ResearcherPageV3 = () => {
  const [currentKeyword, setCurrentKeyword] = useState(0);
  const [selectedMetric, setSelectedMetric] = useState("cac");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
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

  const currentMetric = metrics[selectedMetric as keyof typeof metrics];

  const filteredPublications = publications.filter((pub) => {
    const categoryMatch =
      selectedCategory === "all" || pub.category === selectedCategory;
    const searchMatch =
      searchTerm === "" ||
      pub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pub.disease.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pub.authors.toLowerCase().includes(searchTerm.toLowerCase());
    return categoryMatch && searchMatch;
  });

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "High Impact":
        return "text-emerald-700 bg-emerald-50 border-emerald-200";
      case "Medium Impact":
        return "text-amber-700 bg-amber-50 border-amber-200";
      default:
        return "text-gray-700 bg-gray-50 border-gray-200";
    }
  };
  const copyToClipboard = (code: string, title: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(title);
    setTimeout(() => setCopiedCode(null), 2000);
  };
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
              <button className="group bg-gradient-to-r from-[#002F6C] to-[#00B8A9] hover:bg-blue-700 text-white px-10 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center space-x-3 shadow-lg">
                <Calendar className="w-5 h-5" />
                <span>Book a Research Demo</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </button>

              <button className="group border-2 border-slate-200 hover:border-teal-500 bg-white/80 backdrop-blur-sm text-slate-700 hover:text-teal-700 px-10 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 flex items-center space-x-3 hover:bg-teal-50">
                <Download className="w-5 h-5" />
                <span>Download Performance Report</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </div>
        </div>
      </section>
      {/* 1st section */}
      <section className="py-24 bg-gradient-to-b from-slate-50 to-white">
        {/* Background Video */}

        <div className="max-w-7xl mx-auto px-6">
            
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 bg-teal-100 rounded-full mr-4">
                <Activity className="w-8 h-8 text-teal-600" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900">
                Validated Performance Metrics
              </h2>
            </div>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Comprehensive model validation across diverse patient cohorts with
              transparent benchmarking
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Metric Selection */}
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(metrics).map(([key, metric]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedMetric(key)}
                    className={`group p-6 rounded-2xl border-2 transition-all duration-300 text-left transform hover:scale-105 ${
                      selectedMetric === key
                        ? `border-${metric.color}-600 bg-${metric.color}-50 shadow-lg`
                        : "border-slate-200 hover:border-slate-300 bg-white hover:shadow-md"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3
                        className={`font-semibold text-lg ${
                          selectedMetric === key
                            ? `text-${metric.color}-700`
                            : "text-slate-700"
                        }`}
                      >
                        {metric.name}
                      </h3>
                      <ChevronRight
                        className={`w-5 h-5 transition-all duration-300 ${
                          selectedMetric === key
                            ? `text-${metric.color}-600 rotate-90`
                            : "text-slate-400 group-hover:translate-x-1"
                        }`}
                      />
                    </div>
                    <p className="text-sm text-slate-500 mb-3">
                      {metric.description}
                    </p>
                    <div
                      className={`text-sm font-medium ${
                        selectedMetric === key
                          ? `text-${metric.color}-700`
                          : "text-slate-700"
                      }`}
                    >
                      AUC: {metric.auc} • F1: {metric.f1}
                    </div>
                  </button>
                ))}
              </div>

              <button className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl transform hover:scale-105">
                <Download className="w-5 h-5" />
                <span>Download Full Performance Report</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Performance Visualization */}
            <div className="bg-white rounded-3xl shadow-2xl p-8 border border-slate-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-slate-900">
                  {currentMetric.name}
                </h3>
                <div
                  className={`px-4 py-2 bg-${currentMetric.color}-100 text-${currentMetric.color}-700 rounded-full text-sm font-medium`}
                >
                  Validated
                </div>
              </div>



              <div className="space-y-8">
                {/* AUC */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-slate-700 font-semibold">
                     KAPPA Cohen Score
                    </span>
                    <span className="text-3xl font-bold text-slate-900">
                      {currentMetric.auc}
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-4 overflow-hidden">
                    <div
                      className={`bg-gradient-to-r from-${currentMetric.color}-500 to-${currentMetric.color}-600 h-4 rounded-full transition-all duration-1000 shadow-sm`}
                      style={{ width: `${currentMetric.auc * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* F1 Score */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-slate-700 font-semibold">
                      F1 Score
                    </span>
                    <span className="text-3xl font-bold text-slate-900">
                      {currentMetric.f1}
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-4 overflow-hidden">
                    <div
                      className={`bg-gradient-to-r from-${currentMetric.color}-500 to-${currentMetric.color}-600 h-4 rounded-full transition-all duration-1000 shadow-sm`}
                      style={{ width: `${currentMetric.f1 * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* Accuracy */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-slate-700 font-semibold">
                      Accuracy
                    </span>
                    <span className="text-3xl font-bold text-slate-900">
                      {currentMetric.accuracy}
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-4 overflow-hidden">
                    <div
                      className={`bg-gradient-to-r from-${currentMetric.color}-500 to-${currentMetric.color}-600 h-4 rounded-full transition-all duration-1000 shadow-sm`}
                      style={{ width: `${currentMetric.accuracy * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* <div className="mt-8 p-6 bg-gradient-to-r from-slate-50 to-slate-100 rounded-2xl">
                <div className="flex items-center space-x-3 text-sm text-slate-600">
                  <TrendingUp className="w-4 h-4" />
                  <span className="font-medium">
                    Validated across 10,000+ patient studies from diverse
                    populations
                  </span>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </section>
      {/* 2nd section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Research Infrastructure for Medical AI
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

                    const icons = ["🏥", "🧠", "🔬", "📊", "👁️"];

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
                            <h4 className="font-bold text-cloud-burst text-lg mb-2 group-hover:text-bright-turquoise transition-colors">
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
                            className={`absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-16 rounded-full border-2 border-gradient-to-r ${colors[index]} animate-ping opacity-30`}
                            style={{ animationDelay: `${index * 0.4}s` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Flowing Data Particles */}
                <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-bright-turquoise via-bay-of-many to-fuchsia-400 opacity-30">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-2 h-2 bg-white rounded-full animate-pulse"
                      style={{
                        left: `${i * 25}%`,
                        top: "-3px",
                        animationDelay: `${i * 0.3}s`,
                        animationDuration: "2s",
                      }}
                    ></div>
                  ))}
                </div>
              </div>

              {/* Interactive Research Journey */}

              {/* Enhanced CTA */}
              <div className="mt-12 text-center">
                <button className="group relative bg-gradient-to-r from-cloud-burst to-bright-turquoise hover:from-bay-of-many hover:via-bright-turquoise hover:to-fuchsia-400 text-white px-12 py-5 rounded-2xl font-bold text-xl transition-all duration-500 transform hover:scale-110 shadow-2xl overflow-hidden">
                  <span className="relative z-10 flex items-center justify-center space-x-3">
                    <span>Experience the Platform</span>
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
              Our open infrastructure supports containerized algorithm
              deployment behind your firewall. Upload scans via API. Run your
              models. Review your results.
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
      {/* 4th section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          {/* Clean Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center mb-4">
              <BookOpen className="w-6 h-6 text-turquoise mr-3" />
              <h2 className="text-3xl font-bold text-gray-900">
                Research Publications
              </h2>
            </div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Peer-reviewed studies validating AI models for specific disease
              detection and management
            </p>
          </div>

          {/* Simple Search and Filter */}
          <div className="mb-8">
            <div className="bg-gray-50 rounded-xl p-6">
              {/* Search Bar */}
              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by disease, condition, or author..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-turquoise focus:border-transparent"
                  />
                </div>
              </div>

              {/* Disease Categories */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category.value}
                    onClick={() => setSelectedCategory(category.value)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                      selectedCategory === category.value
                        ? `bg-${category.color}-100 text-${category.color}-700 border-2 border-${category.color}-300`
                        : "bg-white text-gray-600 border-2 border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-6 flex items-center justify-between">
            <p className="text-gray-600">
              <span className="font-semibold text-gray-900 mr-1">
                {filteredPublications.length}
              </span>
              publications found
            </p>
            {filteredPublications.filter((p) => p.featured).length > 0 && (
              <div className="flex items-center space-x-1 px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium">
                <Award className="w-4 h-4" />
                <span>
                  {filteredPublications.filter((p) => p.featured).length}
                </span>
                <span>
                   Featured Studies
                </span>
              </div>
            )}
          </div>

          {/* Clean Publications Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {filteredPublications.map((pub, index) => (
              <div
                key={index}
                className={`group bg-white border-2 border-gray-100 rounded-xl p-6 hover:border-${
                  pub.color
                }-200 hover:shadow-lg transition-all duration-300 relative ${
                  pub.featured ? "ring-2 ring-amber-200" : ""
                }`}
              >
                {/* Featured Badge */}
                {pub.featured && (
                  <div className="absolute top-4 right-4 flex items-center space-x-1 px-2 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-medium">
                    <Award className="w-3 h-3" />
                    <span>Featured</span>
                  </div>
                )}

                {/* Disease Category */}
                <div className="mb-4">
                  <span
                    className={`inline-block px-3 py-1 bg-${pub.color}-100 text-${pub.color}-700 rounded-full text-sm font-medium`}
                  >
                    {pub.disease}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-turquoise transition-colors">
                  {pub.title}
                </h3>

                {/* Abstract */}
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {pub.abstract}
                </p>

                {/* Publication Details */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <User className="w-4 h-4 mr-2" />
                    <span className="font-medium">{pub.authors}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>
                        {pub.journal} • {pub.year}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium border ${getImpactColor(
                          pub.impact
                        )}`}
                      >
                        {pub.impact}
                      </span>
                      <span className="text-xs text-gray-400">
                        {pub.citations} citations
                      </span>
                    </div>
                  </div>
                </div>

                {/* Read More Link */}
                <div className="pt-4 border-t border-gray-100">
                  <a
                    href={pub.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-turquoise hover:text-turquoise font-medium text-sm group-hover:translate-x-1 transform transition-all duration-200"
                  >
                    <span>Read Full Publication</span>
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Simple CTA */}
          <div className="text-center">
            <div className="bg-gradient-to-br from-cloud-burst via-bay-of-many to-bright-turquoise rounded-xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-3">
                Contribute to Disease Research
              </h3>
              <p className="text-turquoise mb-6 max-w-2xl mx-auto">
                Join our research network to validate AI models for disease
                detection and advance clinical care
              </p>
              <button className="bg-white text-black hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold transition-colors">
                Start Research Collaboration
              </button>
            </div>
          </div>
        </div>
      </section>
      {/*  */}


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

{/* 5th section */}
<div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Animated Header Section */}
      <div className="relative bg-white border-b border-gray-100 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-20">
          <div className="text-center">

            <h1 className="text-5xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text">
              Patent Portfolio
            </h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Pioneering healthcare innovation through cutting-edge diagnostic technologies and opportunistic screening methodologies
            </p>

          </div>
        </div>
      </div>

      {/* Interactive Patents Grid */}
      <div className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid gap-8 lg:grid-cols-2">
          {patents.map((patent, index) => (
            <div
              key={patent.id}
              className={`group relative bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden transform transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl ${
                hoveredPatent === patent.id ? 'ring-2 ring-blue-500/20' : ''
              } ${selectedPatent === patent.id ? 'ring-2 ring-purple-500/30 shadow-2xl' : ''}`}
              onMouseEnter={() => setHoveredPatent(patent.id)}
              onMouseLeave={() => setHoveredPatent(null)}
              style={{
                animationDelay: `${index * 200}ms`,
                animation: 'fadeInUp 0.8s ease-out forwards'
              }}
            >
              {/* Animated Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity duration-500 ${
                patent.color === 'blue' ? 'from-blue-500 to-cyan-500' : 'from-purple-500 to-pink-500'
              }`}></div>

              {/* Patent Header */}
              <div className="relative p-8 pb-6">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className={`flex items-center justify-center w-14 h-14 rounded-xl transition-all duration-300 group-hover:scale-110 ${
                      patent.color === 'blue' 
                        ? 'bg-blue-50 group-hover:bg-blue-100' 
                        : 'bg-purple-50 group-hover:bg-purple-100'
                    }`}>
                      <FileText className={`w-7 h-7 ${
                        patent.color === 'blue' ? 'text-blue-600' : 'text-purple-600'
                      }`} />
                    </div>
                    <div>
                      <div className={`text-sm font-semibold mb-1 ${
                        patent.color === 'blue' ? 'text-blue-600' : 'text-purple-600'
                      }`}>
                        {patent.category}
                      </div>
                      <div className="text-lg font-bold text-gray-900">
                        {patent.id}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-200 shadow-sm">
                      {patent.status}
                    </span>
                    <button
                      onClick={() => handlePatentClick(patent.id)}
                      className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                    >
                      <ChevronRight className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${
                        selectedPatent === patent.id ? 'rotate-90' : ''
                      }`} />
                    </button>
                  </div>
                </div>

                {/* Patent Title */}
                <h3 className="text-2xl font-bold text-gray-900 mb-4 leading-tight group-hover:text-gray-800 transition-colors duration-200">
                  {patent.title}
                </h3>

                {/* Patent Description */}
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {patent.description}
                </p>

                {/* Patent Meta */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>Published {new Date(patent.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                    patent.color === 'blue' 
                      ? 'bg-blue-50 text-blue-700' 
                      : 'bg-purple-50 text-purple-700'
                  }`}>
                    {patent.impact}
                  </div>
                </div>

                {/* Expandable Details */}
                <div className={`overflow-hidden transition-all duration-500 ${
                  selectedPatent === patent.id ? 'max-h-40 opacity-100 mb-6' : 'max-h-0 opacity-0'
                }`}>
                  <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <h4 className="font-semibold text-gray-900 mb-2">Patent Impact</h4>
                    <p className="text-sm text-gray-600 mb-3">{patent.impact}</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Eye className="w-3 h-3" />
                        <span>Public Domain</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Download className="w-3 h-3" />
                        <span>PDF Available</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-4">
                  <a
                    href={patent.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center px-6 py-3 font-medium rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${
                      patent.color === 'blue'
                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                        : 'bg-purple-600 hover:bg-purple-700 text-white'
                    }`}
                  >
                    <span>View Patent</span>
                    <ExternalLink className="w-4 h-4 ml-2 transition-transform duration-200 group-hover:translate-x-1" />
                  </a>
                  <button
                    onClick={() => handlePatentClick(patent.id)}
                    className="inline-flex items-center px-4 py-3 font-medium text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all duration-200"
                  >
                    {selectedPatent === patent.id ? 'Less Info' : 'More Info'}
                  </button>
                </div>
              </div>

              {/* Decorative Bottom Border */}
              <div className={`h-1 bg-gradient-to-r transition-all duration-500 ${
                patent.color === 'blue' 
                  ? 'from-blue-500 to-cyan-500' 
                  : 'from-purple-500 to-pink-500'
              } ${hoveredPatent === patent.id ? 'h-2' : ''}`}></div>
            </div>
          ))}
        </div>

      </div>

      {/* Enhanced Footer */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="text-center">
            <h4 className="text-2xl font-bold mb-4">Ready to Collaborate?</h4>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              For licensing inquiries, technical discussions, or partnership opportunities 
              regarding our patent portfolio, we'd love to hear from you.
            </p>
            <button className="inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
              <span>Contact Our IP Team</span>
              <ChevronRight className="w-4 h-4 ml-2" />
            </button>
          </div>
        </div>
      </div>

      {/* <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style> */}
    </div>
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
