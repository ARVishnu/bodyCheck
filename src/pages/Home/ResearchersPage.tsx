import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Download, 
  Database, 
  BookOpen, 
  Users, 
  BarChart3, 
  Code, 
  Shield, 
  Star,
  ExternalLink,
  Filter,
  Search,
  Play,
  Copy,
  CheckCircle,
  TrendingUp,
  Microscope,
  Brain,
  Heart,
  Activity,
  FileText,
  Globe,
  Lock,
  Award,
  Zap,
  Target,
  Eye,
  Settings,
  Calendar,
  Mail,
  Phone,
  Building2,
  GitBranch,
  Layers,
  PieChart,
  LineChart,
  BarChart,
  Cpu,
  CloudDownload,
  ArrowRight,
  ChevronRight,
  Info
} from 'lucide-react';

export function ResearchersPage() {
  const [selectedDataset, setSelectedDataset] = useState<string | null>(null);
  const [filterOrgan, setFilterOrgan] = useState('all');
  const [filterAnnotation, setFilterAnnotation] = useState('all');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const datasets = [
    {
      id: 'cardiac-cac',
      name: 'Cardiac CAC Dataset',
      modality: 'Cardiac CT',
      scans: 5247,
      annotations: 'Agatston scores, vessel segmentation',
      population: 'Adults 40-80, multi-ethnic',
      organ: 'heart',
      annotationType: 'cac',
      irbStatus: 'Approved',
      description: 'Comprehensive coronary artery calcium scoring dataset with expert radiologist annotations'
    },
    {
      id: 'body-comp',
      name: 'Body Composition Dataset',
      modality: 'Abdominal CT',
      scans: 3891,
      annotations: 'Visceral fat, muscle, bone density',
      population: 'Adults 18-85, BMI 18-45',
      organ: 'abdomen',
      annotationType: 'bodycomp',
      irbStatus: 'Approved',
      description: 'Multi-organ segmentation for body composition analysis and sarcopenia assessment'
    },
    {
      id: 'valve-analysis',
      name: 'Cardiac Valve Dataset',
      modality: 'Cardiac CT',
      scans: 2156,
      annotations: 'Mitral valve, aortic measurements',
      population: 'Adults 50+, structural heart disease',
      organ: 'heart',
      annotationType: 'valve',
      irbStatus: 'Approved',
      description: 'Structural heart analysis with detailed valve morphology and function annotations'
    },
    {
      id: 'lung-screening',
      name: 'Lung Screening Dataset',
      modality: 'Chest CT',
      scans: 4523,
      annotations: 'Nodule detection, emphysema scoring',
      population: 'Smokers 55-80, screening cohort',
      organ: 'lung',
      annotationType: 'screening',
      irbStatus: 'Approved',
      description: 'Lung cancer screening dataset with comprehensive pulmonary pathology annotations'
    }
  ];

  const publications = [
    {
      id: 1,
      title: 'Deep Learning for Automated Coronary Artery Calcium Scoring: A Multi-Center Validation Study',
      journal: 'Radiology',
      year: 2024,
      metrics: { auc: 0.94, sensitivity: 0.92, specificity: 0.96, n: 5247 },
      doi: '10.1148/radiol.2024231456',
      status: 'published'
    },
    {
      id: 2,
      title: 'AI-Powered Body Composition Analysis: Validation Against DXA in 3,891 Patients',
      journal: 'Journal of Medical Imaging',
      year: 2024,
      metrics: { auc: 0.91, sensitivity: 0.89, specificity: 0.93, n: 3891 },
      doi: '10.1117/1.JMI.11.2.024501',
      status: 'published'
    },
    {
      id: 3,
      title: 'Federated Learning for Cardiovascular Risk Assessment: A Privacy-Preserving Approach',
      journal: 'Nature Digital Medicine',
      year: 2024,
      metrics: { auc: 0.88, sensitivity: 0.85, specificity: 0.91, n: 12450 },
      doi: '10.1038/s41746-024-01234-5',
      status: 'in-review'
    }
  ];

  const collaborationOpportunities = [
    {
      icon: <GitBranch className="w-8 h-8 text-blue-600" />,
      title: 'Federated Learning Consortium',
      description: 'Join our privacy-preserving multi-institutional learning network',
      details: 'Contribute data without sharing, improve models collectively',
      cta: 'Join Consortium'
    },
    {
      icon: <BookOpen className="w-8 h-8 text-green-600" />,
      title: 'Co-Author Publications',
      description: 'Collaborate on high-impact research publications',
      details: 'Access to datasets, computational resources, and co-authorship opportunities',
      cta: 'Propose Study'
    },
    {
      icon: <Target className="w-8 h-8 text-purple-600" />,
      title: 'Clinical Trial Protocols',
      description: 'Sponsor-ready protocols for AI validation studies',
      details: 'IRB-approved protocols, statistical analysis plans, regulatory guidance',
      cta: 'Download Protocols'
    }
  ];

  const apiExamples = [
    {
      title: 'Batch Inference API',
      language: 'python',
      code: `import requests
import json

# Batch process multiple DICOM files
response = requests.post(
    'https://api.bodycheck.ai/v1/analyze/batch',
    headers={'Authorization': 'Bearer YOUR_API_KEY'},
    json={
        'scans': ['scan1.dcm', 'scan2.dcm'],
        'analysis_type': 'cardiac_cac'
    }
)

results = response.json()
print(f"Processed {len(results)} scans")`
    },
    {
      title: 'Segmentation Export',
      language: 'python',
      code: `# Export segmentation masks in NIfTI format
import nibabel as nib

mask_response = requests.get(
    f'https://api.bodycheck.ai/v1/segmentation/{scan_id}',
    headers={'Authorization': 'Bearer YOUR_API_KEY'},
    params={'format': 'nifti'}
)

# Save segmentation mask
with open('segmentation.nii.gz', 'wb') as f:
    f.write(mask_response.content)`
    }
  ];

  const performanceMetrics = [
    { metric: 'AUC', value: '0.94', description: 'Area Under Curve for CAC detection' },
    { metric: 'Sensitivity', value: '92%', description: 'True positive rate' },
    { metric: 'Specificity', value: '96%', description: 'True negative rate' },
    { metric: 'Inter-reader κ', value: '0.91', description: 'Agreement with expert radiologists' }
  ];

  const institutionalPartners = [
    { name: 'Stanford Medicine', logo: '🏥', type: 'Academic Medical Center' },
    { name: 'Mayo Clinic', logo: '🏥', type: 'Healthcare System' },
    { name: 'Johns Hopkins', logo: '🎓', type: 'Research University' },
    { name: 'Mass General Brigham', logo: '🏥', type: 'Academic Medical Center' },
    { name: 'UCSF', logo: '🎓', type: 'Research University' },
    { name: 'Cleveland Clinic', logo: '🏥', type: 'Healthcare System' }
  ];

  const filteredDatasets = datasets.filter(dataset => {
    const organMatch = filterOrgan === 'all' || dataset.organ === filterOrgan;
    const annotationMatch = filterAnnotation === 'all' || dataset.annotationType === filterAnnotation;
    return organMatch && annotationMatch;
  });

  const copyToClipboard = (code: string, title: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(title);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="min-h-screen bg-bright-turquoise/5">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-cloud-burst via-bay-of-many to-bright-turquoise text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Accelerate Cardiovascular Discovery with Explainable AI
              </h1>
              <p className="text-xl mb-8 text-bright-turquoise/80">
                Join a global network of investigators harnessing our CT-based AI to validate biomarkers, 
                refine risk models, and publish breakthrough findings.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-white text-cloud-burst px-8 py-4 rounded-lg font-semibold hover:bg-bright-turquoise/10 transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                  <Database className="w-5 h-5 mr-2" />
                  Request Dataset Access
                </button>
                <button className="bg-gradient-to-r from-jacarta to-bay-of-many text-white border-2 border-bright-turquoise px-8 py-4 rounded-lg font-semibold hover:from-bay-of-many hover:to-jacarta transition-all duration-300 flex items-center justify-center shadow-md hover:shadow-lg">
                  <BookOpen className="w-5 h-5 mr-2" />
                  View Validation Studies
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="flex items-center mb-4">
                  <Microscope className="w-6 h-6 mr-2" />
                  <span className="font-semibold">Research Platform Overview</span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="bg-white/20 rounded-lg p-3 text-center hover:bg-white/25 transition-all duration-300">
                    <div className="text-2xl font-bold">15,000+</div>
                    <div className="text-white/80">Annotated Scans</div>
                  </div>
                  <div className="bg-white/20 rounded-lg p-3 text-center hover:bg-white/25 transition-all duration-300">
                    <div className="text-2xl font-bold">50+</div>
                    <div className="text-white/80">Research Partners</div>
                  </div>
                  <div className="bg-white/20 rounded-lg p-3 text-center hover:bg-white/25 transition-all duration-300">
                    <div className="text-2xl font-bold">25</div>
                    <div className="text-white/80">Publications</div>
                  </div>
                  <div className="bg-white/20 rounded-lg p-3 text-center hover:bg-white/25 transition-all duration-300">
                    <div className="text-2xl font-bold">0.91</div>
                    <div className="text-white/80">Dice</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* De-identified Research Datasets */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-cloud-burst mb-4">De-identified Research Datasets</h2>
            <p className="text-xl text-bay-of-many/80">
              Access curated, IRB-approved datasets for your cardiovascular AI research
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 mb-8">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Filters:</span>
            </div>
            <select
              value={filterOrgan}
              onChange={(e) => setFilterOrgan(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Organs</option>
              <option value="heart">Heart</option>
              <option value="abdomen">Abdomen</option>
              <option value="lung">Lung</option>
            </select>
            <select
              value={filterAnnotation}
              onChange={(e) => setFilterAnnotation(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Annotations</option>
              <option value="cac">CAC Scoring</option>
              <option value="bodycomp">Body Composition</option>
              <option value="valve">Valve Analysis</option>
              <option value="screening">Screening</option>
            </select>
          </div>

          {/* Dataset Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {filteredDatasets.map((dataset) => (
              <div
                key={dataset.id}
                className={`bg-white rounded-xl shadow-sm border-2 transition-all duration-300 cursor-pointer hover:shadow-lg transform hover:-translate-y-1 ${
                  selectedDataset === dataset.id ? 'border-bright-turquoise bg-bright-turquoise/10' : 'border-bay-of-many/10'
                }`}
                onClick={() => setSelectedDataset(selectedDataset === dataset.id ? null : dataset.id)}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-cloud-burst">{dataset.name}</h3>
                    <span className="bg-bright-turquoise/10 text-bright-turquoise text-xs font-medium px-2 py-1 rounded-full">
                      {dataset.irbStatus}
                    </span>
                  </div>
                  
                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <div className="flex justify-between">
                      <span>Modality:</span>
                      <span className="font-medium">{dataset.modality}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Scans:</span>
                      <span className="font-medium">{dataset.scans.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Population:</span>
                      <span className="font-medium text-xs">{dataset.population}</span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-700 mb-4">{dataset.description}</p>
                  
                  <div className="flex space-x-2">
                    <button className="flex-1 bg-gradient-to-r from-jacarta to-bay-of-many text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-bay-of-many hover:to-jacarta transition-all duration-300 shadow-md hover:shadow-lg">
                      Request Access
                    </button>
                    <button className="px-4 py-2 border border-bright-turquoise text-bright-turquoise rounded-lg text-sm font-medium hover:bg-bright-turquoise/10 transition-colors">
                      Sample
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Publications & Validation Timeline */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-cloud-burst mb-4">Publications & Validation Studies</h2>
            <p className="text-xl text-bay-of-many/80">
              Peer-reviewed research demonstrating clinical validity and performance
            </p>
          </div>

          <div className="space-y-6">
            {publications.map((pub, index) => (
              <div key={pub.id} className="bg-white rounded-lg shadow-sm border border-bay-of-many/10 p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex-1 mb-4 lg:mb-0">
                    <div className="flex items-center mb-2">
                      <h3 className="text-lg font-semibold text-cloud-burst mr-3">{pub.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        pub.status === 'published' 
                          ? 'bg-bright-turquoise/10 text-bright-turquoise' 
                          : 'bg-turquoise/10 text-turquoise'
                      }`}>
                        {pub.status === 'published' ? 'Published' : 'In Review'}
                      </span>
                    </div>
                    <p className="text-bay-of-many/80 mb-3">
                      <span className="font-medium">{pub.journal}</span> • {pub.year}
                    </p>
                    <div className="flex flex-wrap gap-4 text-sm">
                      <div className="flex items-center">
                        <BarChart3 className="w-4 h-4 text-blue-600 mr-1" />
                        <span>AUC: {pub.metrics.auc}</span>
                      </div>
                      <div className="flex items-center">
                        <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                        <span>Sensitivity: {pub.metrics.sensitivity}</span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-4 h-4 text-purple-600 mr-1" />
                        <span>Specificity: {pub.metrics.specificity}</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 text-orange-600 mr-1" />
                        <span>n = {pub.metrics.n.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    <button className="flex items-center px-4 py-2 bg-gradient-to-r from-jacarta to-bay-of-many text-white rounded-lg hover:from-bay-of-many hover:to-jacarta transition-all duration-300 shadow-md hover:shadow-lg">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Read Full Text
                    </button>
                    <button className="flex items-center px-4 py-2 border border-bright-turquoise text-bright-turquoise rounded-lg hover:bg-bright-turquoise/10 transition-colors">
                      <Download className="w-4 h-4 mr-2" />
                      Download PDF
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Collaboration Opportunities */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-cloud-burst mb-4">Partner in Multi-Center Research</h2>
            <p className="text-xl text-bay-of-many/80">
              Join collaborative research initiatives and advance cardiovascular AI together
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {collaborationOpportunities.map((opportunity, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm border border-bay-of-many/10 p-8 text-center hover:shadow-md transition-shadow">
                <div className="flex justify-center mb-6">{opportunity.icon}</div>
                <h3 className="text-xl font-semibold text-cloud-burst mb-4">{opportunity.title}</h3>
                <p className="text-bay-of-many/80 mb-4">{opportunity.description}</p>
                <p className="text-sm text-bay-of-many/70 mb-6">{opportunity.details}</p>
                <button className="bg-gradient-to-r from-jacarta to-bay-of-many text-white px-6 py-3 rounded-lg font-semibold hover:from-bay-of-many hover:to-jacarta transition-all duration-300 w-full shadow-md hover:shadow-lg">
                  {opportunity.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Model Performance & Benchmarks */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-cloud-burst mb-4">Model Performance & Benchmarks</h2>
            <p className="text-xl text-bay-of-many/80">
              Rigorous validation against expert radiologists and clinical standards
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Performance Metrics */}
            <div className="bg-white rounded-lg shadow-sm border border-bay-of-many/10 p-8">
              <h3 className="text-xl font-semibold text-cloud-burst mb-6">Key Performance Metrics</h3>
              <div className="space-y-6">
                {performanceMetrics.map((metric, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-cloud-burst">{metric.metric}</div>
                      <div className="text-sm text-bay-of-many/80">{metric.description}</div>
                    </div>
                    <div className="text-2xl font-bold text-bright-turquoise">{metric.value}</div>
                  </div>
                ))}
              </div>
              <button className="mt-6 w-full bg-gradient-to-r from-jacarta to-bay-of-many text-white px-6 py-3 rounded-lg font-semibold hover:from-bay-of-many hover:to-jacarta transition-all duration-300 flex items-center justify-center shadow-md hover:shadow-lg">
                <Download className="w-4 h-4 mr-2" />
                Download Full Report
              </button>
            </div>

            {/* Visualization Placeholder */}
            <div className="bg-white rounded-lg shadow-sm border border-bay-of-many/10 p-8">
              <h3 className="text-xl font-semibold text-cloud-burst mb-6">ROC Curve Analysis</h3>
              <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center mb-6">
                <div className="text-center">
                  <LineChart className="w-16 h-16 text-purple-600 mx-auto mb-4" />
                  <p className="text-bay-of-many/80">Interactive ROC Curves</p>
                  <p className="text-sm text-bay-of-many/70">CAC Detection vs. Expert Radiologists</p>
                </div>
              </div>
              <div className="flex justify-between text-sm text-bay-of-many/80">
                <span>False Positive Rate</span>
                <span>True Positive Rate</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Research-Ready Tools & APIs */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-cloud-burst mb-4">Integrate & Innovate with Our Open Platform</h2>
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

          <div className="mt-12 grid md:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-purple-50 rounded-lg hover:bg-purple-100 transition-all duration-300">
              <Code className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h4 className="font-semibold text-gray-900 mb-2">REST API</h4>
              <p className="text-bay-of-many/80 text-sm">Batch inference and analysis</p>
            </div>
            <div className="text-center p-6 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-all duration-300">
              <Layers className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
              <h4 className="font-semibold text-gray-900 mb-2">Jupyter Sandbox</h4>
              <p className="text-bay-of-many/80 text-sm">Interactive development environment</p>
            </div>
            <div className="text-center p-6 bg-purple-50 rounded-lg">
              <CloudDownload className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h4 className="font-semibold text-gray-900 mb-2">DICOM/NIfTI Export</h4>
              <p className="text-bay-of-many/80 text-sm">Segmentation mask downloads</p>
            </div>
            <div className="text-center p-6 bg-orange-50 rounded-lg">
              <Settings className="w-12 h-12 text-orange-600 mx-auto mb-4" />
              <h4 className="font-semibold text-gray-900 mb-2">Annotation UI</h4>
              <p className="text-bay-of-many/80 text-sm">Refinement and validation tools</p>
            </div>
          </div>
        </div>
      </section>

      {/* Ethics, Privacy & Compliance */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-cloud-burst mb-4">Ethics, Privacy & Compliance</h2>
            <p className="text-xl text-bay-of-many/80">
              Research-grade security and compliance for sensitive medical data
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-white rounded-lg shadow-sm border border-bay-of-many/10">
              <Shield className="w-12 h-12 text-bright-turquoise mx-auto mb-4" />
              <h3 className="font-semibold text-cloud-burst mb-2">HIPAA Compliant</h3>
              <p className="text-bay-of-many/80 text-sm">De-identification and secure processing</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-sm border border-bay-of-many/10">
              <Globe className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="font-semibold text-cloud-burst mb-2">GDPR Ready</h3>
              <p className="text-bay-of-many/80 text-sm">European data governance compliance</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-sm border border-bay-of-many/10">
              <Award className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="font-semibold text-cloud-burst mb-2">ISO 27001</h3>
              <p className="text-bay-of-many/80 text-sm">Information security management</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-sm border border-bay-of-many/10">
              <FileText className="w-12 h-12 text-orange-600 mx-auto mb-4" />
              <h3 className="font-semibold text-cloud-burst mb-2">Full Audit Trail</h3>
              <p className="text-bay-of-many/80 text-sm">Complete usage logs and tracking</p>
            </div>
          </div>
        </div>
      </section>

      {/* Institutional Partners */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-cloud-burst mb-4">Trusted by Leading Institutions</h2>
            <p className="text-xl text-bay-of-many/80">
              Collaborating with top academic medical centers and research universities
            </p>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-8">
            {institutionalPartners.map((partner, index) => (
              <div key={index} className="text-center p-4 bg-bright-turquoise/5 rounded-lg hover:bg-bright-turquoise/10 transition-colors">
                <div className="text-4xl mb-2">{partner.logo}</div>
                <h4 className="font-semibold text-cloud-burst text-sm mb-1">{partner.name}</h4>
                <p className="text-xs text-bay-of-many/80">{partner.type}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-8 text-center">
            <h3 className="text-lg font-semibold text-blue-900 mb-4">Join Our Research Network</h3>
            <p className="text-blue-800 mb-6">
              "BodyCheck.ai has accelerated our cardiovascular research by 3x. The quality of annotations 
              and ease of integration made it possible to publish 5 papers in the last year alone."
            </p>
            <div className="text-sm text-blue-700">
              <strong>Dr. Sarah Chen, MD, PhD</strong><br />
              Director of Cardiovascular Imaging Research, Stanford Medicine
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 bg-gradient-to-br from-cloud-burst to-bay-of-many text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Advance Your Research with BodyCheck.ai
          </h2>
          <p className="text-xl mb-8 text-bright-turquoise/80">
            Get started with a free dataset, API key, or joint study proposal.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <button className="bg-white text-cloud-burst px-8 py-4 rounded-lg font-semibold hover:bg-bright-turquoise/10 transition-colors flex items-center justify-center">
              <Download className="w-5 h-5 mr-2" />
              Download Research Kit
            </button>
            <button className="bg-bright-turquoise text-white border-2 border-bay-of-many px-8 py-4 rounded-lg font-semibold hover:bg-turquoise transition-colors flex items-center justify-center">
              <Mail className="w-5 h-5 mr-2" />
              Contact Our Science Team
            </button>
          </div>
          
          <div className="flex justify-center items-center space-x-8 opacity-80 text-sm">
            <div className="flex items-center">
              <Database className="w-4 h-4 mr-2" />
              <span>15,000+ Annotated Scans</span>
            </div>
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-2" />
              <span>50+ Research Partners</span>
            </div>
            <div className="flex items-center">
              <BookOpen className="w-4 h-4 mr-2" />
              <span>25 Publications</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}