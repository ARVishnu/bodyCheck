import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Upload, 
  Heart, 
  Activity, 
  FileText, 
  Shield,
  CheckCircle, 
  Download,
  MessageCircle,
  Star,
  Lock,
  UserCheck,
  Eye,
  Share2,
  MapPin,
  Clock,
  Award,
  Brain,
  ChevronRight,
  Video,
  Scale,
  Bone,
  Target,
} from 'lucide-react';
import { HowItWorks } from '../../../components';

export function PatientsPage() {
  const [activeReportTab, setActiveReportTab] = useState('pdf');
  const [activeFAQ, setActiveFAQ] = useState<string | null>(null);

  const steps = [
    {
      icon: <Upload className="w-12 h-12 text-blue-600" />,
      title: "Upload Your Scan",
      description: "Securely upload your chest or abdominal CT scan files (DICOM format)",
      detail: "HIPAA-compliant upload with guided assistance"
    },
    {
      icon: <Brain className="w-12 h-12 text-green-600" />,
      title: "AI Analysis",
      description: "Advanced AI analyzes cardiovascular health, body composition, and bone density",
      detail: "Multi-modal analysis using FDA-cleared algorithms"
    },
    {
      icon: <FileText className="w-12 h-12 text-purple-600" />,
      title: "Comprehensive Report",
      description: "Receive detailed health insights with 3D visualizations and clinical recommendations",
      detail: "Professional report ready to share with your doctor"
    }
  ];

  const reportFeatures = [
    {
      id: 'pdf',
      title: 'PDF Report',
      icon: <FileText className="w-6 h-6" />,
      description: 'Comprehensive report covering heart health, body composition, and bone density',
      preview: 'Professional medical report with clear explanations and recommendations'
    },
    {
      id: '3d',
      title: '3D Visualizations',
      icon: <Heart className="w-6 h-6" />,
      description: 'Interactive 3D models of your heart, body composition, and anatomical structures',
      preview: 'Explore your anatomy with detailed 3D visualizations'
    },
    {
      id: 'video',
      title: 'Health Insights',
      icon: <Video className="w-6 h-6" />,
      description: 'Personalized health insights with risk assessments and lifestyle recommendations',
      preview: 'Actionable health guidance based on your unique results'
    },
    {
      id: 'summary',
      title: 'Clinical Summary',
      icon: <Share2 className="w-6 h-6" />,
      description: 'Professional clinical summary optimized for healthcare provider review',
      preview: 'Share comprehensive results with your medical team'
    }
  ];

  const testimonials = [
    {
      quote: "I had a CT scan 2 years ago. BodyCheck helped me finally understand it — and take action.",
      author: "Maya R.",
      age: "47",
      location: "Bangalore",
      rating: 5,
      image: "👩‍💼"
    },
    {
      quote: "The 3D view made it real. I sent the report to my cardiologist the same day.",
      author: "Arjun M.",
      age: "59", 
      location: "Mumbai",
      rating: 5,
      image: "👨‍💻"
    },
    {
      quote: "Finally, medical reports that make sense! The explanations were so clear.",
      author: "Priya S.",
      age: "34",
      location: "Delhi",
      rating: 5,
      image: "👩‍🔬"
    }
  ];

  const pricingPlans = [
    {
      name: "Essential",
      price: "$19",
      includes: [
        "Cardiovascular risk assessment",
        "Body composition analysis",
        "Bone density screening",
        "Comprehensive PDF report",
        "Email support"
      ],
      popular: false
    },
    {
      name: "Complete",
      price: "$29",
      includes: [
        "All Essential features",
        "3D anatomical visualizations",
        "Advanced risk stratification",
        "Personalized recommendations",
        "Priority support"
      ],
      popular: true
    },
    {
      name: "Premium",
      price: "$39",
      includes: [
        "All Complete features",
        "Clinical consultation included",
        "Follow-up health tracking",
        "Direct physician review",
        "24/7 support"
      ],
      popular: false
    }
  ];

  const faqs = [
    {
      id: 'files',
      question: "What files do I need to upload?",
      answer: "You need DICOM files from your CT scan. These are usually provided on a CD or USB drive by your imaging center. If you're unsure, contact us and we'll help you identify the right files."
    },
    {
      id: 'understanding',
      question: "I don't understand medical terms — will this help?",
      answer: "Absolutely! Our reports are designed for patients, not just doctors. We use simple language, visual explanations, and color-coded results to make everything clear and actionable."
    },
    {
      id: 'sharing',
      question: "Can I share this with my doctor?",
      answer: "Yes! Every report includes a professional summary page specifically designed for healthcare providers. You can download and share it directly with your doctor."
    },
    {
      id: 'insurance',
      question: "Is it covered by insurance?",
      answer: "Currently, BodyCheck is a direct-pay service. However, many patients find the insights valuable enough to pay out-of-pocket, and some have successfully submitted receipts for HSA/FSA reimbursement."
    },
    {
      id: 'safety',
      question: "Is my medical data safe?",
      answer: "Yes, we use medical-grade encryption and are HIPAA compliant. Your data is processed securely and automatically deleted after 30 days unless you choose to keep it longer."
    }
  ];

  const safetyFeatures = [
    {
      icon: <Lock className="w-6 h-6 text-green-600" />,
      title: "HIPAA-Compliant",
      description: "Medical-grade encryption protects your data"
    },
    {
      icon: <UserCheck className="w-6 h-6 text-blue-600" />,
      title: "No Data Sharing",
      description: "Your information is never shared without consent"
    },
    {
      icon: <Clock className="w-6 h-6 text-purple-600" />,
      title: "Auto-Deletion",
      description: "Reports stored securely, auto-deleted after 30 days"
    },
    {
      icon: <MessageCircle className="w-6 h-6 text-orange-600" />,
      title: "Live Support",
      description: "Chat & email support available when you need it"
    }
  ];

  return (
    <div className="min-h-screen bg-bright-turquoise/5">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-cloud-burst via-bay-of-many to-bright-turquoise text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Understand Your Heart and Body — In Minutes, From a CT Scan You Already Have
              </h1>
              <p className="text-xl text-bright-turquoise/80 mb-8">
                Upload your scan. Get a doctor-friendly report, beautiful 3D model, and personalized insights — all powered by medical AI.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-bright-turquoise text-cloud-burst px-8 py-4 rounded-lg font-semibold hover:bg-turquoise transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                  <Upload className="w-5 h-5 mr-2" />
                  Upload My CT Scan
                </button>
                <button className="bg-white text-bay-of-many border-2 border-bright-turquoise px-8 py-4 rounded-lg font-semibold hover:bg-bright-turquoise/10 transition-all duration-300 flex items-center justify-center shadow-md hover:shadow-lg">
                  <MapPin className="w-5 h-5 mr-2" />
                  Book a BodyCheck Scan Near Me
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-xl shadow-xl p-6 border border-bright-turquoise/20">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-teal-100 rounded-full flex items-center justify-center mr-4">
                    <Heart className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-cloud-burst">Comprehensive Analysis</h3>
                    <p className="text-sm text-bay-of-many/80">Heart + Body Composition</p>
                  </div>
                </div>
                <div className="bg-bright-turquoise/5 rounded-lg h-48 flex items-center justify-center mb-4">
                  <div className="text-center">
                    <div className="flex justify-center space-x-4 mb-4">
                      <Heart className="w-12 h-12 text-red-500" />
                      <Activity className="w-12 h-12 text-blue-500" />
                      <Scale className="w-12 h-12 text-green-500" />
                    </div>
                    <p className="text-bay-of-many/80 font-medium">Multi-Modal Analysis</p>
                    <p className="text-sm text-bay-of-many/70">Heart • Muscle • Fat • Bone</p>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-bay-of-many/80">Processing time:</span>
                  <span className="bg-gradient-to-r from-green-100 to-teal-100 text-green-800 px-3 py-1 rounded-full font-medium">
                    Under 5 minutes
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <HowItWorks />

      {/* What We Analyze Section */}
      <section className="py-16 bg-bright-turquoise/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-cloud-burst mb-4">Comprehensive Health Analysis</h2>
            <p className="text-xl text-bay-of-many/80">Advanced AI analyzes multiple aspects of your health from a single CT scan</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 border border-bright-turquoise/10">
              <div className="w-12 h-12 bg-bright-turquoise/10 rounded-lg flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-bright-turquoise" />
              </div>
              <h3 className="text-lg font-semibold text-cloud-burst mb-3">Cardiovascular Health</h3>
              <ul className="text-sm text-bay-of-many/80 space-y-2">
                <li>• Coronary artery calcium scoring</li>
                <li>• Aortic Calcuim Scoring</li>
                <li>• Aortic valve assessment</li>
                <li>• Cardiovascular risk stratification</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 border border-bright-turquoise/10">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Scale className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-cloud-burst mb-3">Body Composition</h3>
              <ul className="text-sm text-bay-of-many/80 space-y-2">
                <li>• Visceral fat quantification</li>
                <li>• Subcutaneous fat distribution</li>
                <li>• Muscle mass assessment</li>
                <li>• Metabolic health indicators</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 border border-bright-turquoise/10">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Bone className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-cloud-burst mb-3">Bone Health</h3>
              <ul className="text-sm text-bay-of-many/80 space-y-2">
                <li>• Bone density measurements</li>
                <li>• Osteoporosis risk assessment</li>
                <li>• Vertebral fracture detection</li>
                <li>• Age-related bone changes</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 border border-bright-turquoise/10">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Activity className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-cloud-burst mb-3">Organ Analysis</h3>
              <ul className="text-sm text-bay-of-many/80 space-y-2">
                <li>• Liver fat quantification</li>
                <li>• Cardiomegaly Detection</li>
                <li>• Aortic aneurysm</li>
                <li>• Overall organ health</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* What You'll Receive */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-cloud-burst mb-4">Your Comprehensive Health Report</h2>
            <p className="text-xl text-bay-of-many/80">Professional-grade analysis with patient-friendly explanations</p>
          </div>

          <div className="bg-white rounded-lg shadow-lg border border-bay-of-many/10 overflow-hidden">
            {/* Tab Navigation */}
            <div className="border-b border-bay-of-many/10">
              <nav className="flex">
                {reportFeatures.map((feature) => (
                  <button
                    key={feature.id}
                    onClick={() => setActiveReportTab(feature.id)}
                    className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                      activeReportTab === feature.id
                        ? 'bg-gradient-to-r from-green-50 to-teal-50 text-teal-700 border-b-2 border-bright-turquoise'
                        : 'text-bay-of-many/80 hover:text-bay-of-many/70'
                    }`}
                  >
                    <div className="flex items-center justify-center mb-1">
                      {feature.icon}
                    </div>
                    <div className="text-sm">{feature.title}</div>
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="p-8">
              {reportFeatures.map((feature) => (
                activeReportTab === feature.id && (
                  <div key={feature.id} className="grid lg:grid-cols-2 gap-8 items-center">
                    <div>
                      <h3 className="text-2xl font-bold text-cloud-burst mb-4">{feature.title}</h3>
                      <p className="text-bay-of-many/80 mb-6 text-lg">{feature.description}</p>
                      <p className="text-bright-turquoise font-medium mb-6">{feature.preview}</p>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <button className="bg-gradient-to-r from-green-500 to-teal-600 text-white px-6 py-3 rounded-lg hover:from-green-600 hover:to-teal-700 transition-all duration-300 flex items-center justify-center shadow-md hover:shadow-lg">
                          <Eye className="w-4 h-4 mr-2" />
                          View Sample
                        </button>
                        <button className="border border-bright-turquoise text-bright-turquoise px-6 py-3 rounded-lg hover:bg-bright-turquoise/10 transition-all duration-300 flex items-center justify-center">
                          <Download className="w-4 h-4 mr-2" />
                          Download Example
                        </button>
                      </div>
                    </div>
                    <div className="bg-bright-turquoise/5 rounded-lg p-8 flex items-center justify-center h-64">
                      <div className="text-center">
                        {feature.icon}
                        <p className="text-bay-of-many/80 font-medium mt-4">{feature.title} Preview</p>
                        <p className="text-sm text-bay-of-many/70 mt-2">Interactive demonstration</p>
                      </div>
                    </div>
                  </div>
                )
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Clinical Validation */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-cloud-burst mb-4">Clinically Validated AI Technology</h2>
            <p className="text-xl text-bay-of-many/80">Trusted by healthcare professionals worldwide</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div className="text-center p-6 bg-bright-turquoise/10 rounded-lg">
              <div className="text-3xl font-bold text-bright-turquoise mb-2">91%</div>
              <div className="text-sm font-medium text-cloud-burst mb-1">AI Accuracy</div>
              <div className="text-xs text-bay-of-many/80">Compared to expert radiologists</div>
            </div>
            
            <div className="text-center p-6 bg-turquoise/10 rounded-lg">
              <div className="text-3xl font-bold text-turquoise mb-2">15,000+</div>
              <div className="text-sm font-medium text-cloud-burst mb-1">Scans Analyzed</div>
              <div className="text-xs text-bay-of-many/80">Validated across diverse populations</div>
            </div>
            
            <div className="text-center p-6 bg-purple-50 rounded-lg">
              <div className="text-3xl font-bold text-purple-600 mb-2">50+</div>
              <div className="text-sm font-medium text-cloud-burst mb-1">Medical Centers</div>
              <div className="text-xs text-bay-of-many/80">Leading institutions worldwide</div>
            </div>
            
            <div className="text-center p-6 bg-orange-50 rounded-lg">
              <div className="text-3xl font-bold text-orange-600 mb-2">FDA</div>
              <div className="text-sm font-medium text-cloud-burst mb-1">510(k) Pathway</div>
              <div className="text-xs text-bay-of-many/80">Regulatory compliance</div>
            </div>
          </div>

          <div className="bg-bright-turquoise/5 rounded-lg p-8">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <Award className="w-12 h-12 text-bright-turquoise mx-auto mb-4" />
                <h3 className="font-semibold text-cloud-burst mb-2">Medical Grade AI</h3>
                <p className="text-bay-of-many/80 text-sm">
                  Our AI models are trained on diverse datasets and validated against expert radiologist interpretations.
                </p>
              </div>
              
              <div className="text-center">
                <Shield className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="font-semibold text-cloud-burst mb-2">HIPAA Compliant</h3>
                <p className="text-bay-of-many/80 text-sm">
                  Your medical data is protected with enterprise-grade security and privacy measures.
                </p>
              </div>
              
              <div className="text-center">
                <Target className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h3 className="font-semibold text-cloud-burst mb-2">Precision Medicine</h3>
                <p className="text-bay-of-many/80 text-sm">
                  Personalized health insights based on your unique anatomy and risk factors.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Safety & Privacy */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-cloud-burst mb-4">Your Data Is Protected</h2>
            <p className="text-xl text-bay-of-many/80">We take your privacy seriously with medical-grade security</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {safetyFeatures.map((feature, index) => (
              <div key={index} className="text-center p-6 bg-bright-turquoise/5 rounded-lg">
                <div className="flex justify-center mb-4">{feature.icon}</div>
                <h3 className="font-semibold text-cloud-burst mb-2">{feature.title}</h3>
                <p className="text-bay-of-many/80 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              to="/privacy"
              className="inline-flex items-center text-bright-turquoise hover:text-turquoise font-medium"
            >
              <Shield className="w-4 h-4 mr-2" />
              Read Our Privacy Policy
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-bright-turquoise/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-cloud-burst mb-4">What Patients Say</h2>
            <p className="text-xl text-bay-of-many/80">Real stories from people who've used BodyCheck</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm border border-bay-of-many/10 p-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-bay-of-many/80 mb-4 italic">
                  "{testimonial.quote}"
                </blockquote>
                <div className="flex items-center">
                  <div className="text-2xl mr-3">{testimonial.image}</div>
                  <div>
                    <div className="font-semibold text-cloud-burst">
                      {testimonial.author}, {testimonial.age}
                    </div>
                    <div className="text-sm text-bay-of-many/80">{testimonial.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-cloud-burst mb-4">Transparent Pricing</h2>
            <p className="text-xl text-bay-of-many/80">Choose the analysis package that meets your health needs</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <div key={index} className={`bg-white rounded-lg shadow-lg border-2 p-8 relative ${
                plan.popular ? 'border-bright-turquoise' : 'border-bay-of-many/10'
              }`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-bright-turquoise text-white px-4 py-2 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-cloud-burst mb-2">{plan.name}</h3>
                  <div className="text-4xl font-bold text-bright-turquoise mb-2">{plan.price}</div>
                  <div className="text-bay-of-many/80">One-time payment</div>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.includes.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-bay-of-many/80">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
                  plan.popular
                    ? 'bg-bright-turquoise text-cloud-burst hover:bg-turquoise'
                    : 'bg-bright-turquoise/10 text-cloud-burst hover:bg-bright-turquoise/20'
                }`}>
                  Choose {plan.name}
                </button>
              </div>
            ))}
          </div>
              Complete Health Analysis — Heart, Body Composition & More
          <div className="text-center mt-8">
            <p className="text-sm text-bay-of-many/70">
              All plans include secure processing, data protection, and 24/7 customer support.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-bright-turquoise/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-cloud-burst mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-bay-of-many/80">Everything you need to know about BodyCheck</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.id} className="bg-white rounded-lg shadow-sm border border-bay-of-many/10">
                <button
                  onClick={() => setActiveFAQ(activeFAQ === faq.id ? null : faq.id)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-bay-of-many/5 transition-colors"
                >
                  <span className="font-semibold text-cloud-burst">{faq.question}</span>
                  <ChevronRight 
                    className={`w-5 h-5 text-bay-of-many/80 transition-transform ${
                      activeFAQ === faq.id ? 'rotate-90' : ''
                    }`} 
                  />
                </button>
                {activeFAQ === faq.id && (
                  <div className="px-6 pb-6 border-t border-bay-of-many/10">
                    <p className="text-bay-of-many/80 pt-4">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              to="/contact"
              className="inline-flex items-center bg-bright-turquoise text-white px-6 py-3 rounded-lg hover:bg-turquoise transition-colors"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Contact Support Team
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-gradient-to-br from-green-600 to-teal-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Transform Your Health Understanding Today
          </h2>
          <p className="text-xl mb-8 text-bright-turquoise/80">
            Get comprehensive cardiovascular and body composition analysis from your existing CT scan.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <button className="bg-white text-green-600 px-8 py-4 rounded-lg font-semibold hover:bg-green-50 transition-colors flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
              <Upload className="w-5 h-5 mr-2" />
              Start My Analysis
            </button>
            <Link
              to="/contact"
              className="bg-green-500 text-white border-2 border-green-400 px-8 py-4 rounded-lg font-semibold hover:bg-green-400 transition-colors flex items-center justify-center shadow-md hover:shadow-lg"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Speak with Health Advisor
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto opacity-80">
            <div className="text-center">
              <Heart className="w-6 h-6 mx-auto mb-1" />
              <div className="text-xs">Heart Health</div>
            </div>
            <div className="text-center">
              <Scale className="w-6 h-6 mx-auto mb-1" />
              <div className="text-xs">Body Composition</div>
            </div>
            <div className="text-center">
              <Bone className="w-6 h-6 mx-auto mb-1" />
              <div className="text-xs">Bone Density</div>
            </div>
            <div className="text-center">
              <Activity className="w-6 h-6 mx-auto mb-1" />
              <div className="text-xs">Organ Health</div>
            </div>
          </div>
          
          <p className="text-sm text-bright-turquoise/80 mt-4">
            Comprehensive health insights from a single CT scan
          </p>
        </div>
      </section>
    </div>
  );
}