import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Heart,
  Zap,
  Shield,
  Users,
  ChevronRight,
  Play,
  User,
} from "lucide-react";
import { case141_original, case141_seg } from "../../assets";

export function HomePage() {
  const [activeTab, setActiveTab] = useState<'cardiac' | 'body'>('cardiac');
  // const arteryData = [
  //   {
  //     artery: "Cac",
  //     fullName: "Left Anterior Descending",
  //     score: 124,
  //     percentage: "50.6%",
  //   },
  //   {
  //     artery: "RCA",
  //     fullName: "Right Coronary Artery",
  //     score: 78,
  //     percentage: "31.8%",
  //   },
  //   {
  //     artery: "LCX",
  //     fullName: "Left Circumflex",
  //     score: 32,
  //     percentage: "13.1%",
  //   },
  //   { artery: "LM", fullName: "Left Main", score: 11, percentage: "4.5%" },
  // ];

  const calciumScores = [
    {
      name:'CAC',
      region: "Coronary Arteries Calcification",
      agatstonScore: 366.684048,
      band: 3,
    },
    {
      name:'AAC',
      region: "Abdominal Aortic Calcification",
      agatstonScore: 222.041725,
      band: 3,
    },
    {
      name:'TAC',
      region: "Thoracic Aortic Calcification",
      agatstonScore: 2410.938858,
      band: 4,
    },
    {
      name:'AAC',
      region: "Aortic Annulus Calcification",
      agatstonScore: 1036.311459,
      band: 4,
    },
    {
      name:'MAC',
      region: "Mitral Annulus Calcification",
      agatstonScore: 287.883751,
      band: 3,
    },
    {
      name:'AVLC',
      region: "Aortic Valve Leaflets Calcification",
      agatstonScore: 558.256325,
      band: 4,
    },
  ];

  // const totalData = {
  //   artery: "TOTAL",
  //   fullName: "All Coronary Arteries",
  //   score: 245,
  //   percentage: "100.0%",
  // };

  return (
    <div className="min-h-screen bg-cloud-burst">
      {/* Tabs at the top */}
      <section>
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-center">
            <div className="flex bg-jacarta rounded-full p-1">
              <button
                className={`px-6 py-2 rounded-full font-medium focus:outline-none transition-colors ${
                  activeTab === 'cardiac'
                    ? 'bg-dodger-blue text-white shadow'
                    : 'text-bright-turquoise hover:bg-bay-of-many'
                }`}
                onClick={() => setActiveTab('cardiac')}
              >
                Cardiac CT Analysis
              </button>
              <button
                className={`px-6 py-2 rounded-full font-medium focus:outline-none transition-colors ${
                  activeTab === 'body'
                    ? 'bg-dodger-blue text-white shadow'
                    : 'text-bright-turquoise hover:bg-bay-of-many'
                }`}
                onClick={() => setActiveTab('body')}
              >
                Body Composition Analysis
              </button>
            </div>
          </div>
        </div>
      </section>
      {/* Tab Content */}
      {/* {activeTab === 'cardiac' && (
        <> */}
          {/* Hero Section */}
          <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
              <div className="text-center">
                <h1 className="text-4xl md:text-6xl font-bold mb-6">
                  AI-Driven Cardiovascular CT Insight in Seconds
                </h1>
                <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
                  Advanced artificial intelligence platform for rapid, accurate
                  cardiovascular risk assessment through automated CT scan analysis.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    to="/demo-dashboard"
                    className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center"
                  >
                    Try Demo Dashboard
                    <ChevronRight className="ml-2 w-5 h-5" />
                  </Link>
                  <Link
                    to="/sample-report"
                    className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors inline-flex items-center justify-center"
                  >
                    View Sample Report
                  </Link>
                  <Link
                    to="/login"
                    className="bg-blue-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-400 transition-colors inline-flex items-center justify-center"
                  >
                    Start Assessment
                  </Link>
                </div>
                {/* Accuracy */}
                <div className="mt-12 max-w-4xl mx-auto">
                  <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="flex divide-x divide-gray-200">
                      <div className="flex-1 p-6 text-center">
                        <p className="text-lg text-gray-500">Accuracy Rate</p>
                        <p className="text-5xl font-bold text-blue-600 my-2">97%</p>
                        <p className="text-base text-gray-400">
                          Clinical validation
                        </p>
                      </div>
                      <div className="flex-1 p-6 text-center">
                        <p className="text-lg text-gray-500">Patients Analyzed</p>
                        <p className="text-5xl font-bold text-green-500 my-2">
                          50K+
                        </p>
                        <p className="text-base text-gray-400">Worldwide</p>
                      </div>
                      <div className="flex-1 p-6 text-center">
                        <p className="text-lg text-gray-500">Processing Time</p>
                        <p className="text-5xl font-bold text-blue-600 my-2">
                          &lt; 30s
                        </p>
                        <p className="text-base text-gray-400">Per scan</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 3D Heart */}
          <section className="bg-white py-20">
            <div className="container mx-auto px-4">
              <div style={{ fontSize: "3rem", textAlign: "center" }}>
                BodyCheck.ai
              </div>
              <p className="text-center mb-10">
                Advanced AI algorithms for precise cardiovascular analysis
              </p>
              <div
                style={{ display: "flex", flexWrap: "wrap", alignItems: "center" }}
                className="gap-12 "
              >
                {/* Left */}
                <div style={{ flex: "1", background: "#fff", paddingLeft: "20px" }}>
                  <div className="flex flex-col gap-6">
                    {/* Card 1 */}
                    <div className="bg-blue-100 rounded-2xl p-6">
                      <h3 className="text-xl font-bold text-blue-700 mb-2">
                        Deep Learning Analysis
                      </h3>
                      <p className="text-gray-700">
                        Our proprietary AI models analyze cardiac imaging with
                        unprecedented accuracy, detecting subtle abnormalities that
                        traditional methods might miss.
                      </p>
                    </div>
                    {/* Card 2 */}
                    <div className="bg-white rounded-2xl p-6 shadow-md">
                      <h3 className="text-xl font-bold text-blue-700 mb-2">
                        Real-time Processing
                      </h3>
                      <p className="text-gray-700">
                        Get instant results with our optimized processing pipeline,
                        reducing diagnosis time from hours to minutes.
                      </p>
                    </div>
                    {/* Card 3 */}
                    <div className="bg-blue-100 rounded-2xl p-6">
                      <h3 className="text-xl font-bold text-blue-700 mb-2">
                        Clinical Integration
                      </h3>
                      <p className="text-gray-700">
                        Seamlessly integrate with existing PACS and EHR systems for
                        streamlined workflow.
                      </p>
                    </div>
                  </div>
                </div>
                {/* Right */}
                <div
                  style={{
                    height: "500px",
                    flex: "1",
                    boxShadow:
                      "rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset",
                    borderRadius: "10px",
                    padding: "20px",
                  }}
                >
                  <iframe
                    src="/3Dheart/case141.html"
                    scrolling="no"
                    style={{ height: "100%", width: "100%", borderRadius: "10px" }}
                  ></iframe>
                </div>
              </div>
            </div>
          </section>

          {/* CT Demo Videos Section */}
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  See Our AI in Action
                </h2>
                <p className="text-lg text-gray-600">
                  Automated analysis of cardiac CT scans with real-time calcium
                  scoring
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    title: "Raw CT Scan",
                    description:
                      "Original cardiac CT slice showing coronary arteries",
                    video: case141_original,
                  },
                  {
                    title: "AI Detection",
                    description:
                      "Automated Coronary Arteries and Aortic calcium identification and segmentation",
                    video: case141_seg,
                  }
                ].map((item, index) => (
                  <div
                    key={index}
                    className="bg-gray-100 rounded-lg p-6 text-center"
                  >
                    <div
                      className="bg-gray-200 rounded-lg mb-4 flex items-center justify-center"
                      style={{ height: "27rem" }}
                    >
                      {item.video ? (
                        <video
                          src={item.video}
                          autoPlay
                          loop
                          muted
                          className="w-full h-full object-contain rounded-lg"
                        />
                      ) : (
                        <Play className="w-16 h-16 text-gray-400" />
                      )}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                ))}
                <div className="text-center">
                  <div
                    className="bg-white rounded-2xl p-6 shadow-xl flex flex-col border-t-8 border-blue-500 relative overflow-hidden"
                    style={{ height: "100%" }}
                  >
                    {/* Decorative Gradient Bar */}
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-400 via-blue-600 to-blue-400 rounded-t-2xl" />
                    <h3 className="text-lg font-extrabold text-blue-700 mb-4 text-left tracking-wide">
                      Agatston Score Breakdown by Artery
                    </h3>
                    <div className="flex-grow overflow-y-auto">
                      <table className="w-full text-left text-sm rounded-lg overflow-hidden">
                        <thead>
                          <tr className="text-xs text-blue-600 uppercase bg-blue-50">
                            <th className="py-2 px-2 font-semibold"></th>
                            <th className="py-2 px-2 font-semibold">Full Name</th>
                            <th className="py-2 px-2 font-semibold text-right">Score</th>
                            <th className="py-2 px-2 font-semibold text-right">Band</th>
                          </tr>
                        </thead>
                        <tbody>
                          {calciumScores.map((item, idx) => (
                            <tr
                              key={idx}
                              className={
                                idx % 2 === 0
                                  ? "bg-gray-50 hover:bg-blue-50 transition-colors"
                                  : "bg-white hover:bg-blue-50 transition-colors"
                              }
                            >
                              <td className="py-2 px-2 font-bold text-blue-700 flex items-center gap-2">
                                {/* <span className="inline-block w-2.5 h-2.5 rounded-full bg-blue-400" /> */}
                                {item.name}
                              </td>
                              <td className="py-2 px-2 text-gray-600">{item.region}</td>
                              <td className="py-2 px-2 text-right font-semibold text-gray-800">{item.agatstonScore.toFixed(2)}</td>
                              <td className="py-2 px-2 text-right">
                                <span className="inline-block min-w-[3.5rem] text-xs font-semibold bg-blue-100 text-blue-700 rounded-full px-2 py-0.5">
                                  {item.band}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* AI Pipeline Overview */}
          <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Advanced AI Pipeline
                </h2>
                <p className="text-lg text-gray-600">
                  State-of-the-art machine learning models for cardiovascular
                  analysis
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                  {
                    icon: <Heart className="w-8 h-8" />,
                    title: "DICOM Processing",
                    desc: "Automated CT scan preprocessing",
                  },
                  {
                    icon: <Zap className="w-8 h-8" />,
                    title: "AI Segmentation",
                    desc: "nnU-Net powered organ detection",
                  },
                  {
                    icon: <Shield className="w-8 h-8" />,
                    title: "Calcium Scoring",
                    desc: "Precise Agatston calculation",
                  },
                  {
                    icon: <Users className="w-8 h-8" />,
                    title: "Risk Assessment",
                    desc: "Clinical risk stratification",
                  },
                ].map((step, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg p-6 text-center shadow-sm border border-gray-200"
                  >
                    <div className="text-blue-600 mb-4 flex justify-center">
                      {step.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-600">{step.desc}</p>
                  </div>
                ))}
              </div>

              <div className="text-center mt-8">
                <Link
                  to="/ai-pipeline"
                  className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center"
                >
                  Learn more about our AI pipeline
                  <ChevronRight className="ml-1 w-4 h-4" />
                </Link>
              </div>
            </div>
          </section>

          {/* Features Grid */}
          <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Why Choose BodyCheck.ai?
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    title: "Sub-Second Analysis",
                    description:
                      "Complete cardiovascular risk assessment in under 1 second",
                    icon: <Zap className="w-6 h-6" />,
                  },
                  {
                    title: "Clinical Grade Accuracy",
                    description:
                      "99.2% accuracy compared to expert radiologist assessment",
                    icon: <Shield className="w-6 h-6" />,
                  },
                  {
                    title: "HIPAA Compliant",
                    description: "Enterprise-grade security and privacy protection",
                    icon: <Heart className="w-6 h-6" />,
                  },
                ].map((feature, index) => (
                  <div key={index} className="text-center">
                    <div className="text-blue-600 mb-4 flex justify-center">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Testimonials */}
          <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Trusted by Healthcare Professionals
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <p className="text-gray-600 mb-4">
                    "BodyCheck.ai has revolutionized our cardiac screening workflow.
                    The accuracy and speed of analysis allows us to provide better
                    patient care and catch cardiovascular risks earlier."
                  </p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <User className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">
                        Dr. Emily Rodriguez
                      </p>
                      <p className="text-sm text-gray-600">
                        Cardiologist, General Hospital
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <p className="text-gray-600 mb-4">
                    "The integration with our existing PACS system was seamless, and
                    the AI reports provide valuable insights that enhance our
                    diagnostic confidence."
                  </p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <User className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">
                        Dr. Michael Chang
                      </p>
                      <p className="text-sm text-gray-600">
                        Radiologist, Medical Center
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-16 bg-blue-600 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-3xl font-bold mb-4">
                Ready to Transform Your Cardiovascular Screening?
              </h2>
              <p className="text-xl text-blue-100 mb-8">
                Join leading healthcare institutions in advancing cardiac care with
                AI
              </p>
              <Link
                to="/contact"
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center"
              >
                Schedule a Demo
                <ChevronRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </section>
        {/* </>
      )} */}
      {/* {activeTab === 'body' && (
        <section className="bg-gradient-to-r from-green-200 to-green-400 min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4 text-green-900">Body Composition Analysis</h1>
            <p className="text-lg text-green-800 mb-6">This is a placeholder for the Body Composition Analysis homepage. Content coming soon!</p>
            <div className="inline-block bg-white rounded-lg shadow px-8 py-6">
              <span className="text-gray-500">[Dummy content for body analysis tab]</span>
            </div>
          </div>
        </section>
      )} */}
    </div>
  );
}
