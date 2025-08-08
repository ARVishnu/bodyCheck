import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Database, 
  Shield, 
  Users, 
  BarChart3, 
  FileText, 
  Download, 
  CheckCircle, 
  ArrowRight,
  Brain,
  Cpu,
  Lock,
  Globe,
  Mail,
  Building,
  TrendingUp,
  Zap,
  Target,
  Play,
  Eye,
  Upload
} from 'lucide-react';
import { LoadingSpinner } from '../../../components/LoadingSpinner';

export function ResearcherPage() {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [formData, setFormData] = useState({
    name: '',
    institution: '',
    email: '',
    researchArea: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const features = [
    {
      title: 'Host Your Own Algorithm',
      description: 'Secure deployment and execution of your trained AI models within our HIPAA-compliant infrastructure.',
      icon: <Brain className="w-8 h-8" />,
      color: 'bg-blue-50 text-blue-600'
    },
    {
      title: 'Extract Imaging Metrics at Scale',
      description: 'Body composition, calcium scoring, liver attenuation, and more — extracted automatically from CT scans.',
      icon: <Database className="w-8 h-8" />,
      color: 'bg-purple-50 text-purple-600'
    },
    {
      title: 'Rapid Review Pipelines',
      description: 'See outputs, validate results, and enable analysis workflows through our integrated viewer interface.',
      icon: <Zap className="w-8 h-8" />,
      color: 'bg-yellow-50 text-yellow-600'
    },
    {
      title: 'Multi-Center Research Tools',
      description: 'Infrastructure to support studies across institutions with standardized protocols and data handling.',
      icon: <Users className="w-8 h-8" />,
      color: 'bg-teal-50 text-teal-600'
    }
  ];

  const useCases = [
    {
      title: 'Population Health Research',
      description: 'Analyze large-scale imaging datasets to identify population-level health trends and risk factors.',
      icon: <Globe className="w-12 h-12" />,
      examples: ['Cardiovascular risk stratification', 'Metabolic syndrome prevalence', 'Age-related body composition changes']
    },
    {
      title: 'Targeted Clinical Trial Recruitment',
      description: 'Identify and stratify patients based on imaging-derived biomarkers for clinical trial enrollment.',
      icon: <Target className="w-12 h-12" />,
      examples: ['CAC-based cardiovascular trials', 'Sarcopenia intervention studies', 'Metabolic health research']
    },
    {
      title: 'Algorithm Benchmarking',
      description: 'Validate and compare AI model performance against clinical ground truth and expert annotations.',
      icon: <BarChart3 className="w-12 h-12" />,
      examples: ['Model accuracy validation', 'Cross-institutional performance', 'Clinical correlation studies']
    }
  ];

  const publications = [
    {
      title: 'Automated Coronary Artery Calcium Scoring in Non-Contrast CT: A Multi-Center Validation Study',
      authors: 'Johnson S, Chen M, Williams P, et al.',
      journal: 'Radiology: Artificial Intelligence',
      year: '2024',
      category: 'CAC',
      type: 'peer-reviewed'
    },
    {
      title: 'Opportunistic Screening for Osteoporosis Using Routine CT Scans: Population-Based Analysis',
      authors: 'Martinez R, Thompson K, Davis L, et al.',
      journal: 'Journal of Bone and Mineral Research',
      year: '2024',
      category: 'BMD',
      type: 'peer-reviewed'
    },
    {
      title: 'AI-Driven Body Composition Analysis: Validation Against DEXA in 5,000 Patients',
      authors: 'Anderson B, Lee H, Garcia M, et al.',
      journal: 'European Radiology',
      year: '2023',
      category: 'body-composition',
      type: 'peer-reviewed'
    },
    {
      title: 'Liver Attenuation as a Biomarker for Metabolic Health: Large-Scale CT Analysis',
      authors: 'Wilson J, Brown A, Taylor S, et al.',
      journal: 'Hepatology',
      year: '2023',
      category: 'opportunistic',
      type: 'peer-reviewed'
    },
    {
      title: 'Clinical Implementation Guide: AI-Powered Opportunistic Screening in Radiology',
      authors: 'BodyCheck Research Team',
      journal: 'BodyCheck Technical Report',
      year: '2024',
      category: 'implementation',
      type: 'whitepaper'
    }
  ];

  const partners = [
    { name: 'University of Alabama Birmingham', logo: 'UAB' },
    { name: 'Wisconsin Alumni Research Foundation', logo: 'WARF' },
    { name: 'Mayo Clinic', logo: 'MAYO' },
    { name: 'Stanford Medicine', logo: 'STAN' },
    { name: 'Johns Hopkins', logo: 'JHU' },
    { name: 'Mass General Brigham', logo: 'MGB' }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const filteredPublications = selectedFilter === 'all' 
    ? publications 
    : publications.filter(pub => pub.category === selectedFilter);

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
          <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Thank You!</h2>
          <p className="text-gray-600 mb-6">
            Your research collaboration inquiry has been received. Our team will contact you within 48 hours to discuss opportunities.
          </p>
          <button
            onClick={() => {
              setIsSubmitted(false);
              setFormData({ name: '', institution: '', email: '', researchArea: '' });
            }}
            className="bg-[#002F6C] text-white px-6 py-2 rounded-lg hover:bg-[#003A7A] transition-colors"
          >
            Submit Another Inquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Video Banner */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#002F6C] via-[#003A7A] to-[#00B8A9]">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Accelerate Imaging AI Research
                <span className="block text-[#00B8A9]">with Clinical-Grade Infrastructure</span>
              </h1>
              <p className="text-xl lg:text-2xl mb-8 text-blue-100 leading-relaxed">
                Secure. Scalable. Open for Collaboration.
              </p>
              <p className="text-lg mb-8 text-blue-200">
                Deploy your algorithms, extract imaging metrics, and conduct population-level studies 
                within our HIPAA-compliant research platform.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button
                  onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-[#00B8A9] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#009B8E] transition-colors flex items-center justify-center gap-2"
                >
                  <Mail className="w-5 h-5" />
                  Start Research Collaboration
                </button>
                <Link
                  to="#workflow"
                  className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/20 transition-colors flex items-center justify-center gap-2"
                >
                  <Play className="w-5 h-5" />
                  View Research Workflow
                </Link>
              </div>
            </div>

            {/* Research Workflow Visualization */}
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className="relative h-80 flex items-center justify-center">
                  <div className="relative">
                    {/* Research Pipeline Animation */}
                    <div className="flex items-center space-x-6">
                      <div className="text-center">
                        <div className="w-20 h-20 bg-white/20 rounded-lg flex items-center justify-center mb-2">
                          <Upload className="w-10 h-10 text-white" />
                        </div>
                        <div className="text-xs text-white">DICOM Upload</div>
                      </div>
                      
                      <ArrowRight className="w-6 h-6 text-white" />
                      
                      <div className="text-center">
                        <div className="w-20 h-20 bg-[#00B8A9] rounded-lg flex items-center justify-center mb-2">
                          <Brain className="w-10 h-10 text-white" />
                        </div>
                        <div className="text-xs text-white">AI Processing</div>
                      </div>
                      
                      <ArrowRight className="w-6 h-6 text-white" />
                      
                      <div className="text-center">
                        <div className="w-20 h-20 bg-white/20 rounded-lg flex items-center justify-center mb-2">
                          <BarChart3 className="w-10 h-10 text-white" />
                        </div>
                        <div className="text-xs text-white">Research Insights</div>
                      </div>
                    </div>
                    
                    {/* Floating metrics */}
                    <div className="absolute -top-4 -right-4 bg-[#00B8A9] text-white text-xs px-3 py-1 rounded-full">
                      Multi-Center
                    </div>
                    <div className="absolute -bottom-4 -left-4 bg-white text-[#002F6C] text-xs px-3 py-1 rounded-full">
                      HIPAA Secure
                    </div>
                    <div className="absolute top-1/2 -left-8 bg-white/90 text-[#002F6C] text-xs px-3 py-1 rounded-full">
                      Your Algorithm
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What You Can Do on BodyCheck */}
      <section className="py-16 bg-[#F5F7FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#002F6C] mb-4">What You Can Do on BodyCheck</h2>
            <p className="text-xl text-gray-600">Comprehensive research capabilities for imaging AI development</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-[#D9E2EC] hover:shadow-md transition-shadow">
                <div className={`p-3 rounded-lg w-fit mb-4 ${feature.color}`}>
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-[#002F6C] mb-3">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases for Researchers */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#002F6C] mb-4">Use Cases for Researchers</h2>
            <p className="text-xl text-gray-600">Enabling breakthrough research across multiple domains</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {useCases.map((useCase, index) => (
              <div key={index} className="bg-[#F5F7FA] rounded-xl p-8 border border-[#D9E2EC] text-center">
                <div className="text-[#002F6C] mb-6 flex justify-center">
                  {useCase.icon}
                </div>
                <h3 className="text-xl font-semibold text-[#002F6C] mb-4">{useCase.title}</h3>
                <p className="text-gray-600 mb-6">{useCase.description}</p>
                <div className="space-y-2">
                  {useCase.examples.map((example, idx) => (
                    <div key={idx} className="flex items-center text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-[#00B8A9] mr-2 flex-shrink-0" />
                      {example}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Publication Hub */}
      <section className="py-16 bg-[#F5F7FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#002F6C] mb-4">Publication Hub</h2>
            <p className="text-xl text-gray-600">Explore the science behind opportunistic screening and imaging AI</p>
          </div>

          {/* Filter Tabs */}
          <div className="flex justify-center mb-8">
            <div className="bg-white rounded-lg p-1 flex border border-[#D9E2EC] flex-wrap">
              {['all', 'CAC', 'BMD', 'body-composition', 'opportunistic', 'implementation'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setSelectedFilter(filter)}
                  className={`px-4 py-2 rounded-md font-semibold transition-all capitalize text-sm ${
                    selectedFilter === filter
                      ? 'bg-[#002F6C] text-white shadow-lg'
                      : 'text-[#002F6C] hover:bg-gray-50'
                  }`}
                >
                  {filter === 'all' ? 'All' : 
                   filter === 'CAC' ? 'Coronary Calcium' :
                   filter === 'BMD' ? 'Bone Density' :
                   filter === 'body-composition' ? 'Body Composition' :
                   filter === 'opportunistic' ? 'Opportunistic Screening' :
                   'Implementation'}
                </button>
              ))}
            </div>
          </div>

          {/* Publications Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {filteredPublications.map((publication, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm border border-[#D9E2EC] hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    publication.type === 'peer-reviewed' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {publication.type}
                  </span>
                  <span className="text-sm text-gray-500">{publication.year}</span>
                </div>
                <h3 className="text-lg font-semibold text-[#002F6C] mb-2 leading-tight">
                  {publication.title}
                </h3>
                <p className="text-sm text-gray-600 mb-2">{publication.authors}</p>
                <p className="text-sm font-medium text-gray-700">{publication.journal}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow Integration Diagram */}
      <section id="workflow" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#002F6C] mb-4">Research Workflow Integration</h2>
            <p className="text-xl text-gray-600">Seamless integration from data upload to research insights</p>
          </div>

          <div className="bg-[#F5F7FA] rounded-2xl p-8 border border-[#D9E2EC]">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0 md:space-x-8">
              {[
                { icon: <Upload className="w-8 h-8" />, title: 'Upload Data', desc: 'DICOM ingestion with metadata validation' },
                { icon: <Brain className="w-8 h-8" />, title: 'Run Algorithm', desc: 'Deploy your containerized AI models' },
                { icon: <BarChart3 className="w-8 h-8" />, title: 'Extract Metrics', desc: 'Automated feature extraction and analysis' },
                { icon: <Shield className="w-8 h-8" />, title: 'Store Securely', desc: 'HIPAA-compliant data management' }
              ].map((step, index) => (
                <div key={index} className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-[#002F6C] rounded-full flex items-center justify-center text-white mb-4">
                    {step.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-[#002F6C] mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-600 max-w-32">{step.desc}</p>
                  {index < 3 && (
                    <ArrowRight className="hidden md:block absolute transform translate-x-24 w-6 h-6 text-[#D9E2EC]" />
                  )}
                </div>
              ))}
            </div>
            
            <div className="text-center mt-8">
              <button className="bg-[#00B8A9] text-white px-6 py-3 rounded-lg hover:bg-[#009B8E] transition-colors">
                Integrate Your Model Into This Workflow
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Compliance and Security */}
      <section className="py-16 bg-[#F5F7FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#002F6C] mb-4">Compliance and Security</h2>
            <p className="text-xl text-gray-600">Built for clinical research with enterprise-grade security</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Shield className="w-8 h-8" />,
                title: 'HIPAA Compliant',
                description: 'Full compliance with healthcare data protection regulations and audit requirements'
              },
              {
                icon: <FileText className="w-8 h-8" />,
                title: 'Full Audit Trail',
                description: 'Complete activity logging for all data access, algorithm deployment, and research activities'
              },
              {
                icon: <Lock className="w-8 h-8" />,
                title: 'End-to-End Encryption',
                description: 'AES-256 encryption at rest and TLS 1.3 for all data in transit and processing'
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: 'Role-Based Access',
                description: 'Granular permissions and access controls for multi-institutional research collaboration'
              }
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-[#D9E2EC] text-center">
                <div className="bg-[#002F6C]/10 p-3 rounded-lg w-fit mx-auto mb-4 text-[#002F6C]">
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold text-[#002F6C] mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Collaboration & Custom Services */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#002F6C] mb-4">Collaboration & Custom Services</h2>
            <p className="text-xl text-gray-600">Need help implementing your model? We're here to support your research.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[#F5F7FA] rounded-xl p-8 border border-[#D9E2EC] text-center">
              <div className="w-16 h-16 bg-[#002F6C] rounded-full flex items-center justify-center mx-auto mb-4">
                <Cpu className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-[#002F6C] mb-3">Model Deployment Support</h3>
              <p className="text-gray-600 mb-4">
                Our team can help containerize and deploy your AI models within our secure infrastructure.
              </p>
            </div>

            <div className="bg-[#F5F7FA] rounded-xl p-8 border border-[#D9E2EC] text-center">
              <div className="w-16 h-16 bg-[#00B8A9] rounded-full flex items-center justify-center mx-auto mb-4">
                <Building className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-[#002F6C] mb-3">Multi-Center Study Design</h3>
              <p className="text-gray-600 mb-4">
                Collaborate on study protocols and data collection strategies across multiple institutions.
              </p>
            </div>

            <div className="bg-[#F5F7FA] rounded-xl p-8 border border-[#D9E2EC] text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-[#002F6C] mb-3">Statistical Analysis Support</h3>
              <p className="text-gray-600 mb-4">
                Access to biostatistical expertise for study design, power analysis, and results interpretation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="py-16 bg-[#F5F7FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#002F6C] mb-4">Trusted By Leading Institutions</h2>
            <p className="text-xl text-gray-600">Collaborating with top academic medical centers worldwide</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {partners.map((partner, index) => (
              <div key={index} className="text-center">
                <div className="w-20 h-20 bg-white rounded-lg flex items-center justify-center mx-auto mb-2 border border-[#D9E2EC] shadow-sm">
                  <span className="text-[#002F6C] font-bold text-sm">{partner.logo}</span>
                </div>
                <p className="text-xs text-gray-600">{partner.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Access Sample Report / Benchmark Results */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-[#F5F7FA] rounded-2xl p-8 border border-[#D9E2EC]">
            <h2 className="text-3xl font-bold text-[#002F6C] mb-4">Access Sample Reports & Benchmark Results</h2>
            <p className="text-xl text-gray-600 mb-8">
              Download comprehensive performance metrics and sample outputs from our validated AI models.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-lg p-6 border border-[#D9E2EC]">
                <Eye className="w-12 h-12 text-[#002F6C] mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-[#002F6C] mb-2">Sample Research Report</h3>
                <p className="text-gray-600 text-sm mb-4">
                  View example outputs from our cardiac and body composition analysis pipelines.
                </p>
                <Link
                  to="/sample-report"
                  className="text-[#00B8A9] hover:text-[#009B8E] font-medium text-sm"
                >
                  View Sample Report →
                </Link>
              </div>
              
              <div className="bg-white rounded-lg p-6 border border-[#D9E2EC]">
                <Download className="w-12 h-12 text-[#002F6C] mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-[#002F6C] mb-2">Benchmark Results</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Download detailed performance metrics and validation studies.
                </p>
                <button className="text-[#00B8A9] hover:text-[#009B8E] font-medium text-sm">
                  Download Benchmarks →
                </button>
              </div>
            </div>
            
            <button
              onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-[#002F6C] text-white px-8 py-3 rounded-lg hover:bg-[#003A7A] transition-colors"
            >
              Schedule Research Demo
            </button>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact-form" className="py-16 bg-gradient-to-r from-[#002F6C] to-[#00B8A9] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Let's Build the Future of Imaging Research Together</h2>
            <p className="text-xl text-blue-100">
              Join our research community and accelerate your imaging AI projects with clinical-grade infrastructure.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 max-w-2xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-white mb-1">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                    placeholder="Dr. Jane Smith"
                  />
                </div>
                
                <div>
                  <label htmlFor="institution" className="block text-sm font-medium text-white mb-1">
                    Institution *
                  </label>
                  <input
                    type="text"
                    id="institution"
                    name="institution"
                    required
                    value={formData.institution}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                    placeholder="University Medical Center"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                  placeholder="jane.smith@university.edu"
                />
              </div>
              
              <div>
                <label htmlFor="researchArea" className="block text-sm font-medium text-white mb-1">
                  Research Area / Proposal *
                </label>
                <textarea
                  id="researchArea"
                  name="researchArea"
                  required
                  rows={4}
                  value={formData.researchArea}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                  placeholder="Describe your research interests, collaboration goals, or specific algorithms you'd like to deploy..."
                />
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-white text-[#002F6C] py-3 px-6 rounded-lg font-semibold hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <LoadingSpinner size="sm" />
                    <span className="ml-2">Submitting...</span>
                  </>
                ) : (
                  'Start Research Collaboration'
                )}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}