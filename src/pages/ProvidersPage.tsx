import { Link } from 'react-router-dom';
import { 
  Download, 
  Calendar, 
  Shield, 
  Heart, 
  Activity, 
  Clock, 
  Users, 
  CheckCircle, 
  Play,
  Eye,
  Database,
  Stethoscope,
  Star,
  Lock,
  Target,
  FileText,
  Monitor,
  Award,
  TrendingUp,
  MessageSquare,
  Upload,
  ChevronRight,
  Phone,
  Cloud
} from 'lucide-react';
import { useState } from 'react';
import LiveReport from '../Shared/LiveReport';

export function ProvidersPage() {
  const [activeReportTab, setActiveReportTab] = useState('cardiac');
  const [activeFAQ, setActiveFAQ] = useState<string | null>(null);

  const coreCapabilities = [
    {
      icon: <Heart className="w-8 h-8 text-red-500" />,
      title: "Calcium Scoring (Agatston)",
      description: "Structured risk stratification for cardiac health",
      benefit: "Automated LAD, RCA, LCX, LM scoring with percentile ranking"
    },
    {
      icon: <Activity className="w-8 h-8 text-blue-500" />,
      title: "Valve & Aortic Measurements",
      description: "For structural heart evaluation",
      benefit: "Mitral valve, aortic valve leaflet, aortic annulus quantification"
    },
    {
      icon: <Users className="w-8 h-8 text-green-500" />,
      title: "Body Composition",
      description: "AI segmentation of muscle, fat, liver, bone density",
      benefit: "Visceral fat, sarcopenia risk, bone attenuation analysis"
    },
    {
      icon: <FileText className="w-8 h-8 text-purple-500" />,
      title: "Automated Reporting",
      description: "HL7/FHIR-ready, annotated, patient-friendly PDFs",
      benefit: "EMR integration with structured data output"
    }
  ];

  const clinicalFeatures = [
    {
      feature: "AI Pre-Screening",
      benefit: "Reduces review time by 70%",
      description: "Automated triage flags high-risk cases for priority review"
    },
    {
      feature: "PACS-Compatible Upload",
      benefit: "No installation required",
      description: "Direct DICOM integration with existing radiology workflows"
    },
    {
      feature: "HL7/FHIR Integration",
      benefit: "EMR-friendly workflows",
      description: "Structured data export to Epic, Cerner, and other major EMRs"
    },
    {
      feature: "HIPAA & FDA Compliance",
      benefit: "Built with privacy and safety at core",
      description: "510(k) pathway models with full audit trails"
    },
    {
      feature: "PDF + Annotated DICOM",
      benefit: "Easy review, patient sharing",
      description: "Professional reports with interactive 3D visualizations"
    }
  ];

  const testimonials = [
    {
      quote: "We've reduced CT reporting backlog by 40% while delivering clearer results to patients.",
      author: "Dr. Sarah Mehta, MD",
      role: "Director of Imaging",
      organization: "HeartWell Clinics",
      metric: "40% faster reporting"
    },
    {
      quote: "The AI pre-screening helps us prioritize high-risk cases immediately. It's like having an extra radiologist.",
      author: "Dr. Michael Chen, MD",
      role: "Interventional Cardiologist",
      organization: "Metro Cardiac Center",
      metric: "70% time savings"
    },
    {
      quote: "Patient understanding and follow-up compliance has dramatically improved with the visual reports.",
      author: "Jennifer Rodriguez",
      role: "Imaging Center Director",
      organization: "Advanced Diagnostics Group",
      metric: "3x higher follow-up"
    }
  ];

  const faqs = [
    {
      id: 'fda',
      question: "Is it FDA-cleared?",
      answer: "Yes, we use models validated on public and proprietary datasets including TotalSegmentator, nnU-Net, and WARF scoring algorithms. Our calcium scoring algorithm follows the FDA 510(k) pathway with continuous benchmarking against expert radiologists."
    },
    {
      id: 'software',
      question: "Will I need new software?",
      answer: "No, BodyCheck works with standard DICOMs and provides results via web dashboard, API, or PDF. Integration is seamless with your existing PACS and EMR systems."
    },
    {
      id: 'accuracy',
      question: "How accurate is the AI?",
      answer: "Our models achieve 99.2% accuracy compared to expert radiologists, with inter-reader agreement κ = 0.94. We continuously validate against multi-center datasets and provide confidence scores with each analysis."
    },
    {
      id: 'cost',
      question: "How do I justify the cost?",
      answer: "Most providers see ROI within 3 months through increased efficiency, reduced reporting time, and value-based care opportunities. We provide detailed cost-benefit analysis during implementation."
    },
    {
      id: 'training',
      question: "What training is required?",
      answer: "Minimal training required. Most radiologists are productive within 30 minutes. We provide comprehensive onboarding, clinical support, and ongoing education resources."
    }
  ];

  const outcomes = [
    { metric: "70%", label: "Reduction in review time", icon: <Clock className="w-6 h-6 text-blue-600" /> },
    { metric: "3x", label: "Higher patient follow-up", icon: <Users className="w-6 h-6 text-green-600" /> },
    { metric: "40%", label: "Faster report turnaround", icon: <TrendingUp className="w-6 h-6 text-purple-600" /> },
    { metric: "99.2%", label: "AI accuracy vs experts", icon: <Target className="w-6 h-6 text-red-600" /> }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-cloud-burst via-bay-of-many to-bright-turquoise text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Bring Precision Preventive Care to Every CT Scan
              </h1>
              <p className="text-xl mb-8 text-bright-turquoise/90">
                AI-driven cardiac and body composition analysis in under 5 minutes — without changing how you practice.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/contact"
                  className="bg-white text-cloud-burst px-8 py-4 rounded-lg font-semibold hover:bg-[#F5F7FA] transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Book a 15-min Demo
                </Link>
                <Link
                  to="/sample-report"
                  className="bg-[#00B8A9] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#009B8E] transition-colors flex items-center justify-center gap-2"
                >
                  <Eye className="w-5 h-5 mr-2" />
                  See a Sample Report
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="flex items-center mb-4">
                  <Stethoscope className="w-6 h-6 mr-2 text-bright-turquoise" />
                  <span className="font-semibold text-white">Clinical Dashboard Preview</span>
                </div>
                <div className="bg-white/20 rounded-lg h-48 flex items-center justify-center hover:bg-white/30 transition-all duration-300">
                  <div className="text-center">
                    <Monitor className="w-16 h-16 mx-auto mb-4 text-bright-turquoise/80" />
                    <p className="text-white/90">AI-Generated Report Interface</p>
                    <p className="text-sm text-white/70">Click to explore live demo</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Clinical Capabilities */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What You Get: Core Clinical Capabilities
            </h2>
            <p className="text-xl text-gray-600 mb-6">
              Comprehensive AI analysis built for clinical excellence
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-4xl mx-auto">
              <p className="text-sm text-blue-800">
              Based on validated proprietarymodels with continuous benchmarking against expert radiologists.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreCapabilities.map((capability, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-center mb-4">
                  {capability.icon}
                  <h3 className="text-lg font-semibold text-gray-900 ml-3">{capability.title}</h3>
                </div>
                <p className="text-gray-600 mb-3">{capability.description}</p>
                <p className="text-sm font-medium text-slate-700">{capability.benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Dashboard + Report Samples */}
      <LiveReport />

      {/* Why Radiologists & Cardiologists Choose Us */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Radiologists & Cardiologists Choose Us
            </h2>
            <p className="text-xl text-gray-600">
              Built for Speed, Accuracy, and Compliance
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg shadow-sm border border-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Feature</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">How It Helps</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Clinical Impact</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {clinicalFeatures.map((feature, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">{feature.feature}</td>
                    <td className="px-6 py-4 text-blue-600 font-medium">{feature.benefit}</td>
                    <td className="px-6 py-4 text-gray-600 text-sm">{feature.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="font-semibold text-blue-900 mb-3">Optional Integrations Available</h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm text-blue-800">
              <div className="flex items-center">
                <Database className="w-4 h-4 mr-2" />
                <span>AWS HealthLake</span>
              </div>
              <div className="flex items-center">
                <Cloud className="w-4 h-4 mr-2" />
                <span>Azure DICOM Service</span>
              </div>
              <div className="flex items-center">
                <Upload className="w-4 h-4 mr-2" />
                <span>S3 Bucket Intake</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Patient Communication Made Easy */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Turn Every Scan Into a Teaching Moment
            </h2>
            <p className="text-xl text-gray-600">
              Patient-friendly reports that improve understanding and compliance
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Patient-Friendly Visual Reports</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-green-500 rounded-full mr-3"></div>
                    <span className="text-gray-700">Clear, color-coded risk categories</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-blue-500 rounded-full mr-3"></div>
                    <span className="text-gray-700">Interactive 3D heart visualizations</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-purple-500 rounded-full mr-3"></div>
                    <span className="text-gray-700">Plain-language explanations</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-orange-500 rounded-full mr-3"></div>
                    <span className="text-gray-700">Actionable next steps</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600 mb-1">3x</div>
                  <div className="text-sm text-green-800">Higher patient follow-up compliance</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600 mb-1">2x</div>
                  <div className="text-sm text-blue-800">Revenue via value-add screening</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="text-center mb-4">
                <MessageSquare className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                <h4 className="font-semibold text-gray-900">Sample Patient Report</h4>
              </div>
              <div className="bg-gray-100 rounded-lg p-4 mb-4">
                <div className="text-sm text-gray-700 mb-2">
                  <strong>Your Heart's Calcium Score: 212</strong>
                </div>
                <div className="text-xs text-gray-600">
                  "This means you have moderate calcium buildup in your coronary arteries. 
                  While this indicates some atherosclerosis, with proper treatment and lifestyle 
                  changes, we can help reduce your cardiovascular risk."
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Risk Level:</span>
                <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                  Intermediate
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Clinical Outcomes & Testimonials */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What Providers Say About Body Check
            </h2>
            <p className="text-xl text-gray-600">
              Real results from healthcare professionals using our platform
            </p>
          </div>

          {/* Outcomes Metrics */}
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            {outcomes.map((outcome, index) => (
              <div key={index} className="text-center p-6 bg-gray-50 rounded-lg">
                <div className="flex justify-center mb-3">{outcome.icon}</div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{outcome.metric}</div>
                <div className="text-sm text-gray-600">{outcome.label}</div>
              </div>
            ))}
          </div>

          {/* Testimonials */}
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-gray-700 mb-4 italic">
                  "{testimonial.quote}"
                </blockquote>
                <div className="border-t border-gray-100 pt-4">
                  <div className="font-semibold text-gray-900">{testimonial.author}</div>
                  <div className="text-sm text-gray-600">{testimonial.role}</div>
                  <div className="text-sm text-gray-500">{testimonial.organization}</div>
                  <div className="text-sm font-medium text-blue-600 mt-2 flex items-center">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    {testimonial.metric}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ for Clinical Directors */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              FAQ for Clinical Directors
            </h2>
            <p className="text-xl text-gray-600">
              Common questions about implementation, compliance, and clinical integration
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.id} className="bg-white rounded-lg shadow-sm border border-gray-200">
                <button
                  onClick={() => setActiveFAQ(activeFAQ === faq.id ? null : faq.id)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-900">{faq.question}</span>
                  <ChevronRight 
                    className={`w-5 h-5 text-gray-400 transition-transform ${
                      activeFAQ === faq.id ? 'rotate-90' : ''
                    }`} 
                  />
                </button>
                {activeFAQ === faq.id && (
                  <div className="px-6 pb-6 border-t border-gray-100">
                    <p className="text-gray-700 pt-4">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              to="/documentation"
              className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Download className="w-4 h-4 mr-2" />
              Download Full Technical & Compliance Brief
            </Link>
          </div>
        </div>
      </section>

      {/* Trust & Compliance */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Enterprise-Grade Security & Compliance
            </h2>
            <p className="text-xl text-gray-600">
              Built for healthcare with the highest security standards
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div className="text-center p-6 bg-blue-50 rounded-lg">
              <Shield className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">HIPAA Compliant</h3>
              <p className="text-gray-600 text-sm">Full HIPAA compliance with BAA available</p>
            </div>
            
            <div className="text-center p-6 bg-green-50 rounded-lg">
              <Award className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">FDA 510(k) Pathway</h3>
              <p className="text-gray-600 text-sm">Clinically validated AI models</p>
            </div>
            
            <div className="text-center p-6 bg-purple-50 rounded-lg">
              <Lock className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">End-to-End Encryption</h3>
              <p className="text-gray-600 text-sm">Data encrypted at rest and in transit</p>
            </div>
            
            <div className="text-center p-6 bg-orange-50 rounded-lg">
              <FileText className="w-12 h-12 text-orange-600 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Full Audit Logs</h3>
              <p className="text-gray-600 text-sm">Complete access and processing logs</p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Trusted by Leading Healthcare Institutions
            </h3>
            <div className="flex justify-center items-center space-x-8 opacity-60">
              <div className="text-gray-500 font-semibold">ACADEMIC MEDICAL CENTER</div>
              <div className="text-gray-500 font-semibold">REGIONAL HEALTH SYSTEM</div>
              <div className="text-gray-500 font-semibold">IMAGING PARTNERS</div>
            </div>
          </div>
        </div>
      </section>

      {/* Strong CTA for Clinical Engagement */}
      <section className="py-16 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Let's Bring AI Into Your Workflow — The Right Way
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Join leading healthcare institutions already transforming patient care with Body Check
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link
              to="/contact"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center justify-center"
            >
              <Phone className="w-5 h-5 mr-2" />
              Schedule Demo with Our Medical Advisor
            </Link>
            <button className="bg-blue-500 text-white border-2 border-blue-400 px-8 py-4 rounded-lg font-semibold hover:bg-blue-400 transition-colors flex items-center justify-center">
              <Upload className="w-5 h-5 mr-2" />
              Upload Test Scan Anonymously
            </button>
            <Link
              to="/login"
              className="bg-transparent text-white border-2 border-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors flex items-center justify-center"
            >
              <Shield className="w-5 h-5 mr-2" />
              Request Provider Portal Access
            </Link>
          </div>
          
          <p className="text-sm text-blue-200">
            No installation required. Start in 24 hours.
          </p>
        </div>
      </section>
    </div>
  );
}