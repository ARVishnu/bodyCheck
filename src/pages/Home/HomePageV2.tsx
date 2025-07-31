import React from "react";
import { Link } from "react-router-dom";
import {
  Users,
  FileText,
  Shield,
  Award,
  Activity,
  Target,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Clock,
  Stethoscope,
  UserCheck,
  FlaskConical,
  Heart,
  BarChart2,
} from "lucide-react";
import { LiveReport } from "../../shared";
import { BeforeAfter, HowItWorksV2, WhatWeDo } from "../../components";
import { useNavigate } from "react-router-dom";
import {  ThreeDHeartvideo } from "../../assets/images";
import { Realistic } from "../../assets/videos";

export const HomePageV2: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-white ">
      {/* Hero Section */}
       <section className="relative overflow-hidden h-screen flex items-center">
        {/* Background Video */}
        <video
          className="absolute inset-0 w-full h-full object-cover z-0"
          src={Realistic}
          autoPlay
          loop
          muted
          playsInline
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-cloud-burst via-bay-of-many to-bright-turquoise opacity-90" />
        <div className="absolute inset-0 bg-black opacity-30 z-0" />
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 z-10 flex flex-col justify-center h-full">
          <div>
            <div className="text-white text-center">
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                AI-Powered Insights
                <span className="text-bright-turquoise">
                  for a Healthier You
                </span>
              </h1>
              <p className="text-xl lg:text-2xl mb-8 text-blue-100 leading-relaxed">
                Advanced CT analysis to assess your heart health and body
                composition.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-center">
                <Link
                  to="/demo-dashboard"
                  className="bg-[#00B8A9] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#009B8E] transition-colors flex items-center justify-center gap-2"
                >
                  <Activity className="w-5 h-5" />
                  Explore Body Analysis
                </Link>
                <Link
                  to="/sample-report"
                  className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/20 transition-colors flex items-center justify-center gap-2"
                >
                  <FileText className="w-5 h-5" />
                  View Sample Report
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center justify-center space-x-6 text-sm text-bright-turquoise/80">
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4" />
                  <span>HIPAA Compliant</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="w-4 h-4" />
                  <span>Clinically Validated</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>Fast Turnaround</span>
                </div>
              </div>
            </div>
            {/* Accuracy - Simple, themed, smaller cards */}
            <div className="mt-16 max-w-3xl mx-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Card 1 */}
                <div className="flex-1 min-w-[120px] bg-cloud-burst/80 rounded-lg shadow p-4 mx-1 text-center border border-bay-of-many/40 hover:scale-105 transition-transform duration-200">
                  <div className="flex items-center justify-center mb-1">
                    <CheckCircle className="w-5 h-5 text-bright-turquoise mr-1" />
                    <span className="text-xs text-bright-turquoise font-medium">
                      Accuracy Rate
                    </span>
                  </div>
                  <div className="text-2xl font-extrabold text-white mb-1">
                    97%
                  </div>
                  <div className="text-xs text-blue-100">
                    Clinical validation
                  </div>
                </div>
                {/* Card 2 */}
                <div className="flex-1 min-w-[120px] bg-cloud-burst/80 rounded-lg shadow p-4 mx-1 text-center border border-bay-of-many/40 hover:scale-105 transition-transform duration-200">
                  <div className="flex items-center justify-center mb-1">
                    <Users className="w-5 h-5 text-bright-turquoise mr-1" />
                    <span className="text-xs text-bright-turquoise font-medium">
                      Patients
                    </span>
                  </div>
                  <div className="text-2xl font-extrabold text-white mb-1">
                    50K+
                  </div>
                  <div className="text-xs text-blue-100">Worldwide</div>
                </div>
                {/* Card 3 */}
                <div className="flex-1 min-w-[120px] bg-cloud-burst/80 rounded-lg shadow p-4 mx-1 text-center border border-bay-of-many/40 hover:scale-105 transition-transform duration-200">
                  <div className="flex items-center justify-center mb-1">
                    <Clock className="w-5 h-5 text-bright-turquoise mr-1" />
                    <span className="text-xs text-bright-turquoise font-medium">
                      Processing
                    </span>
                  </div>
                  <div className="text-2xl font-extrabold text-white mb-1">
                    &lt; 30s
                  </div>
                  <div className="text-xs text-blue-100">Per scan</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do - Key Offerings */}
      <WhatWeDo />

      {/* 3D Heart */}
      <section className="py-16 bg-[#F5F7FA]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold text-jacarta mb-6">
              Body Check
            </h2>
            <p className="text-xl text-gray-600">
              Advanced Image Processing for Precise Cardiovascular and Metabolic
              Health Analysis
            </p>
          </div>

          <div
            style={{ display: "flex", flexWrap: "wrap", alignItems: "center" }}
            className="gap-12"
          >
            {/* Left */}
            <div
              style={{
                flex: "1",
                background: "var(--tw-bg-opacity,1) #fff",
                paddingLeft: "20px",
              }}
              className="dark:bg-cloud-burst"
            >
              <div className="flex flex-col gap-6">
                {/* Card 1 */}
                <div className="rounded-2xl p-6 border border-[#D9E2EC] shadow-sm transition-all duration-300 hover:border-[#00B8A9]">
                  <h3 className="text-xl font-bold text-[#002F6C] mb-2">
                    Deep Learning Analysis
                  </h3>
                  <p className="text-[#6B7A90]">
                    Our proprietary AI models were developed with leading
                    experts and analyze CT images with unprecedented accuracy.
                  </p>
                </div>

                {/* Card 2 */}
                <div className="bg-gradient-to-br from-[#00B8A9] to-[#002F6C] rounded-2xl p-6 border border-[#D9E2EC] shadow-sm transition-all duration-300 hover:border-[#00B8A9]">
                  <h3 className="text-xl font-bold mb-2 text-white">
                    Real-time Processing
                  </h3>
                  <p className="opacity-90 text-white">
                    Get instant results with our optimized processing pipeline,
                    for contemporaneous or secondary review.
                  </p>
                </div>

                {/* Card 3 */}
                <div className="rounded-2xl p-6 border border-[#D9E2EC] shadow-sm transition-all duration-300 hover:border-[#00B8A9]">
                  <h3 className="text-xl font-bold text-[#002F6C] mb-2">
                    Clinical Integration
                  </h3>
                  <p className="text-[#6B7A90]">
                    Seamlessly integrate with existing PACS and EHR systems for
                    streamlined workflow.
                  </p>
                </div>

                {/* Card 4 */}
                <div className="bg-gradient-to-br from-[#00B8A9] to-[#002F6C] rounded-2xl p-6 border border-[#D9E2EC] shadow-sm transition-all duration-300 hover:border-[#00B8A9]">
                  <h3 className="text-xl font-bold mb-2 text-white">
                    Regulatory-Grade Reporting
                  </h3>
                  <p className="opacity-90 text-white">
                    Generate structured, FDA-style reports with annotated
                    visuals, quantitative metrics, and clinical insights—ready
                    for direct use in diagnostics, second opinions, or research
                    documentation.
                  </p>
                </div>
              </div>
            </div>
            {/* Right */}
            <div
              className={`
                bg-clip-padding
                p-1
                transition-all
                duration-300
                ${"bg-white hover:bg-turquoise"}
                group
              `}
              style={{
                flex: "1",
                borderRadius: "10px",
                overflow: "hidden",
                height: "800px",
              }}
            >
              <div
                style={{
                  height: "100%",
                  borderRadius: "10px",
                  backgroundImage: `url(${ThreeDHeartvideo})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
                className="border-gradient-to-br from-[#00B8A9] to-[#002F6C]"
              >
                {/* <img src={ThreeDHeartvideo} alt="3D Heart" className="w-full h-full object-cover" /> */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Choose Your Path */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
              Choose Your Path
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Tailored solutions for healthcare providers, patients, and
              researchers
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Providers */}
            <div
              className="group cursor-pointer"
              onClick={() => navigate("/providers")}
            >
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 border-2 border-transparent group-hover:border-blue-200">
                <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Stethoscope className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Providers
                </h3>
                <p className="text-gray-600 mb-6">
                  Enhance patient care with AI-powered insights, comprehensive
                  reports, and seamless integration into your workflow.
                </p>
                <div className="flex items-center text-blue-600 font-semibold group-hover:text-blue-700">
                  Learn More{" "}
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>

            {/* Patients */}
            <div
              className="group cursor-pointer"
              onClick={() => navigate("/patients")}
            >
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 border-2 border-transparent group-hover:border-green-200">
                <div className="w-16 h-16 bg-green-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <UserCheck className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Patients
                </h3>
                <p className="text-gray-600 mb-6">
                  Take control of your health with detailed insights about your
                  cardiovascular health and body composition.
                </p>
                <div className="flex items-center text-green-600 font-semibold group-hover:text-green-700">
                  Get Started{" "}
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>

            {/* Researchers */}
            <div
              className="group cursor-pointer"
              onClick={() => navigate("/researchers")}
            >
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 border-2 border-transparent group-hover:border-purple-200">
                <div className="w-16 h-16 bg-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <FlaskConical className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Researchers
                </h3>
                <p className="text-gray-600 mb-6">
                  Access powerful tools and datasets to advance cardiovascular
                  and metabolic health research.
                </p>
                <div className="flex items-center text-purple-600 font-semibold group-hover:text-purple-700">
                  Explore{" "}
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Report & Dashboard Preview */}
      <LiveReport />

      {/* How It Works */}
      <HowItWorksV2 />

      {/* Why BodyCheck */}
      <section className="py-16 bg-[#F5F7FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#002F6C] mb-4">
              Why BodyCheck ?
            </h2>
            <p className="text-xl text-[#002F6C]/80">
              The most advanced AI platform for CT analysis
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Shield className="w-8 h-8" />,
                title: "HIPAA-Compliant & Secure",
                description:
                  "Enterprise-grade security with full data encryption and compliance",
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "Built by Cardiologists & Data Scientists",
                description:
                  "Developed by medical experts and AI researchers for clinical accuracy",
              },
              {
                icon: <Award className="w-8 h-8" />,
                title: "Clinically Validated Models",
                description:
                  "Peer-reviewed algorithms validated across multiple medical centers",
              },
              {
                icon: <Clock className="w-8 h-8" />,
                title: "24-hr Turnaround",
                description:
                  "Fast processing with comprehensive reports delivered within hours",
              },
              {
                icon: <Target className="w-8 h-8" />,
                title: "Seamless Integration",
                description:
                  "Easy integration with PACS/EMR systems and existing workflows",
              },
              {
                icon: <TrendingUp className="w-8 h-8" />,
                title: "Continuous Learning",
                description:
                  "AI models continuously improve with new data and clinical feedback",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 hover:shadow-md transition-shadow border border-[#D9E2EC]"
              >
                <div className="flex items-center mb-4">
                  <div className=" p-3 bg-gradient-to-br from-teal-100 to-blue-100 rounded-xl group-hover:from-teal-200 group-hover:to-blue-200 transition-colors">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-[#002F6C] mb-2">
                  {feature.title}
                </h3>
                <p className="text-[#002F6C]/70 text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* From Silence to Action */}
      <BeforeAfter />

      {/* Testimonials */}
      {/* <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#002F6C] mb-4">
              Trusted by Healthcare Professionals
            </h2>
            <p className="text-xl text-[#002F6C]/80">
              Clinicians and researchers worldwide rely on BodyCheck.ai
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-sm border border-[#D9E2EC]">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-current"
                  />
                ))}
              </div>
              <p className="text-[#002F6C] mb-6 italic">
                "BodyCheck.ai has revolutionized our cardiac CT workflow. The AI
                analysis saves us hours of manual review time while providing
                incredibly accurate results."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-[#002F6C] rounded-full flex items-center justify-center text-white font-bold mr-4">
                  SJ
                </div>
                <div>
                  <div className="font-semibold text-[#002F6C]">
                    Dr. Sarah Johnson, MD
                  </div>
                  <div className="text-sm text-[#00B8A9]">
                    Cardiothoracic Radiologist, Mayo Clinic
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm border border-[#D9E2EC]">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-current"
                  />
                ))}
              </div>
              <p className="text-[#002F6C] mb-6 italic">
                "The body composition analysis is game-changing for our
                research. WARF-based IMAT assessment provides insights we never
                had before."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-[#00B8A9] rounded-full flex items-center justify-center text-white font-bold mr-4">
                  MC
                </div>
                <div>
                  <div className="font-semibold text-[#002F6C]">
                    Dr. Michael Chen, MD
                  </div>
                  <div className="text-sm text-[#00B8A9]">
                    Endocrinologist, Stanford Medicine
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* Get Started / Contact Section
      // <section className="py-16 bg-gradient-to-r from-[#002F6C] to-[#00B8A9] text-white">
      //   <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      //     <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
      //     <p className="text-xl text-blue-100 mb-8">
      //       Book a demo to see how BodyCheck.ai can transform your CT analysis
      //       workflow
      //     </p>

      //     <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 max-w-md mx-auto">
      //       <h3 className="text-xl font-semibold mb-6">Book a Demo</h3>
      //       <form className="space-y-4">
      //         <input
      //           type="text"
      //           placeholder="Your Name"
      //           className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
      //         />
      //         <input
      //           type="email"
      //           placeholder="Email Address"
      //           className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
      //         />
      //         <input
      //           type="text"
      //           placeholder="Medical Facility"
      //           className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
      //         />
      //         <button
      //           type="submit"
      //           className="w-full bg-white text-jacarta px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
      //         >
      //           Schedule Demo
      //         </button>
      //       </form>
      //     </div>

      //     <div className="mt-8 flex justify-center space-x-8 text-sm text-blue-200">
      //       <div className="flex items-center space-x-2">
      //         <Phone className="w-4 h-4" />
      //         <span>+1 (555) 123-4567</span>
      //       </div>
      //       <div className="flex items-center space-x-2">
      //         <Mail className="w-4 h-4" />
      //         <span>contact@bodycheck.ai</span>
      //       </div>
      //     </div>
      //   </div>
      // </section> */}
    </div>
  );
};
