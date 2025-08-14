import { FlaskConical, BarChart3, Zap, Search,  Server, Shield, Cpu, Globe, Network,FileText ,UserCheck} from 'lucide-react';
export const metrics = {
  cac: {
    name: 'Coronary Artery Calcium',
    auc: 0.87,
    f1: 0.91,
    accuracy: 0.93,
    color: 'green',
    description: 'Automated calcium scoring in non-gated CT scans'
  },
  fat: {
    name: 'Visceral/Subcutaneous Fat',
    auc: 0.96,
    f1: 0.94,
    accuracy: 0.95,
    color: 'teal',
    description: 'Precise body composition analysis'
  },
  liver: {
    name: 'Liver Attenuation',
    auc: 0.92,
    f1: 0.89,
    accuracy: 0.91,
    color: 'indigo',
    description: 'Hepatic steatosis detection and quantification'
  },
  valve: {
    name: 'Aortic Valve',
    auc: 0.93,
    f1: 0.90,
    accuracy: 0.92,
    color: 'red',
    description: 'Calcification scoring and risk assessment'
  }
};
export const features = [
    {
      icon: FlaskConical,
      title: 'Host Custom Algorithms',
      description: 'Deploy your AI models using our secure DICOM infrastructure with containerized deployment behind your firewall',
      benefits: ['Secure API endpoints', 'Institutional control', 'Real-world workflows']
    },
    {
      icon: BarChart3,
      title: 'Generate Clinical Metrics',
      description: 'Extract comprehensive biomarkers including CAC, body composition, bone density, and liver metrics for research',
      benefits: ['Population-scale analysis', 'Standardized metrics', 'Research-ready data']
    },
    {
      icon: Zap,
      title: 'Rapid Review Interface',
      description: 'Interactive visualization and validation tools for immediate AI output assessment and quality control',
      benefits: ['Real-time evaluation', 'Visual validation', 'Quality assurance']
    },
    {
      icon: Search,
      title: 'Searchable Metric Database',
      description: 'Comprehensive database with advanced search and filtering capabilities for longitudinal research studies',
      benefits: ['Automated indexing', 'Advanced search', 'Longitudinal tracking']
    }
  ];

  export const workflowSteps = [
    { title: 'CT Scans', description: 'Secure DICOM upload' },
    { title: 'AI Processing', description: 'Model execution' },
    { title: 'Metrics Extraction', description: 'Biomarker analysis' },
    { title: 'Database Storage', description: 'Indexed storage' },
    { title: 'Review Dashboard', description: 'Interactive review' }
  ];

  export const capabilities = [
    {
      icon: Server,
      title: 'Containerized Deployment',
      text: 'Deploy algorithms behind your institutional firewall with full control and security'
    },
    {
      icon: Shield,
      title: 'Secure API Integration',
      text: 'Upload and process scans through encrypted, HIPAA-compliant API endpoints'
    },
    {
      icon: Cpu,
      title: 'Institutional Control',
      text: 'Maintain complete control over your models, data, and processing workflows'
    }
  ];

  export const publications = [
    {
      title: 'Automated Coronary Artery Calcium Scoring in Non-Gated Chest CT',
      authors: 'Smith et al.',
      journal: 'Radiology',
      year: 2023,
      category: 'Cardiovascular Disease',
      disease: 'Coronary Artery Disease',
      link: 'https://pubs.rsna.org/doi/10.1148/radiol.230123',
      abstract: 'Deep learning approach for automated CAC scoring achieving 94% accuracy compared to manual scoring.',
      impact: 'High Impact',
      citations: 127,
      featured: true,
      color: 'red'
    },
    {
      title: 'Opportunistic Bone Mineral Density Assessment from Routine CT Scans',
      authors: 'Johnson et al.',
      journal: 'Journal of Bone and Mineral Research',
      year: 2023,
      category: 'Musculoskeletal Disease',
      disease: 'Osteoporosis',
      link: 'https://asbmr.onlinelibrary.wiley.com/doi/10.1002/jbmr.4567',
      abstract: 'Novel method for extracting BMD measurements from standard CT scans without additional radiation exposure.',
      impact: 'High Impact',
      citations: 89,
      featured: true,
      color: 'blue'
    },
    {
      title: 'AI-Driven Hepatic Steatosis Detection in Routine Abdominal CT',
      authors: 'Chen et al.',
      journal: 'Hepatology',
      year: 2023,
      category: 'Liver Disease',
      disease: 'Non-Alcoholic Fatty Liver Disease',
      link: 'https://aasldpubs.onlinelibrary.wiley.com/doi/10.1002/hep.32456',
      abstract: 'Automated detection and quantification of hepatic steatosis using deep learning algorithms.',
      impact: 'High Impact',
      citations: 156,
      featured: true,
      color: 'green'
    },
    {
      title: 'Population-Scale Coronary Calcium Screening Using AI',
      authors: 'Davis et al.',
      journal: 'Circulation',
      year: 2022,
      category: 'Cardiovascular Disease',
      disease: 'Coronary Artery Disease',
      link: 'https://www.ahajournals.org/doi/10.1161/CIRCULATIONAHA.122.059876',
      abstract: 'Large-scale validation of AI-based CAC scoring across diverse patient populations.',
      impact: 'High Impact',
      citations: 203,
      featured: false,
      color: 'red'
    },
    {
      title: 'Automated Vertebral Fracture Assessment in CT Imaging',
      authors: 'Wilson et al.',
      journal: 'Radiology',
      year: 2022,
      category: 'Musculoskeletal Disease',
      disease: 'Vertebral Fractures',
      link: 'https://pubs.rsna.org/doi/10.1148/radiol.2021210456',
      abstract: 'Clinical implementation of automated vertebral fracture detection from routine CT scans.',
      impact: 'Medium Impact',
      citations: 94,
      featured: false,
      color: 'blue'
    },
    {
      title: 'Opportunistic Screening for Osteoporosis in CT Imaging',
      authors: 'Anderson et al.',
      journal: 'The Lancet Digital Health',
      year: 2021,
      category: 'Musculoskeletal Disease',
      disease: 'Osteoporosis',
      link: 'https://www.thelancet.com/journals/landig/article/PIIS2589-7500(21)00123-4/fulltext',
      abstract: 'Systematic review of opportunistic screening methods for osteoporosis detection in routine CT scans.',
      impact: 'High Impact',
      citations: 178,
      featured: false,
      color: 'blue'
    }
  ];

  export const categories = [
    { value: 'all', label: 'All Diseases', color: 'gray' },
    { value: 'Cardiovascular Disease', label: 'Cardiovascular', color: 'red' },
    { value: 'Musculoskeletal Disease', label: 'Musculoskeletal', color: 'blue' },
    { value: 'Liver Disease', label: 'Liver Disease', color: 'green' }
  ];
  export const benefits = [
    {
      icon: Globe,
      title: 'Global Scale',
      description: 'Connect with institutions worldwide for larger, more diverse study populations and enhanced statistical power'
    },
    {
      icon: Shield,
      title: 'Secure Infrastructure',
      description: 'HIPAA-compliant data handling with comprehensive audit trails, encryption, and role-based access controls'
    },
    {
      icon: Zap,
      title: 'Rapid Deployment',
      description: 'Skip complex federated learning setup with our ready-to-use collaborative research platform'
    },
    {
      icon: Network,
      title: 'Standardized Protocols',
      description: 'Unified data collection and analysis protocols ensure consistency across all participating sites'
    }
  ];

  export const complianceFeatures = [
    {
      icon: FlaskConical,
      title: 'HIPAA-Compliant Infrastructure',
      description: 'Full compliance with healthcare data protection regulations'
    },
    {
      icon: FlaskConical,
      title: 'End-to-End Data Encryption',
      description: 'Data encrypted both in transit and at rest with enterprise-grade security'
    },
    {
      icon: FlaskConical,
      title: 'Full Activity Audit Trails',
      description: 'Complete logging and monitoring of all system access and data processing'
    },
    // {
    //   icon: FlaskConical,
    //   title: 'Role-Based Access Control',
    //   description: 'Granular permissions and access controls for different user roles'
    // }
  ];    

  export const performanceMetrics = [
    { metric: 'AUC', value: '0.94', description: 'Area Under Curve for CAC detection' },
    { metric: 'Sensitivity', value: '92%', description: 'True positive rate' },
    { metric: 'Specificity', value: '96%', description: 'True negative rate' },
    { metric: 'Inter-reader κ', value: '0.91', description: 'Agreement with expert radiologists' }
  ];
  export const apiExamples = [
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
  export const patents = [
    {
      id: 'US20220180513A1',
      title: 'Opportunistic Screening for Cardiomegaly',
      url: 'https://patents.google.com/patent/US20220180513A1',
      date: '2022-06-09',
      status: 'Published',
      category: 'Medical Imaging',
      description: 'Advanced screening methodology for early detection of cardiomegaly using opportunistic imaging techniques.',
      impact: 'Enables early cardiac condition detection',
      color: 'blue'
    },
    {
      id: 'US20240257947A1', 
      title: 'Opportunistic Detection of Patient Conditions',
      url: 'https://patents.google.com/patent/US20240257947A1',
      date: '2024-08-01',
      status: 'Published',
      category: 'Diagnostic Technology',
      description: 'Comprehensive patient condition detection system utilizing opportunistic screening approaches.',
      impact: 'Improves diagnostic accuracy and efficiency',
      color: 'purple'
    }
  ];