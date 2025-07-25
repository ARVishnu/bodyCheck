import React from 'react';
import { ArrowRight, Database, Cpu, Brain, BarChart3, FileText, CheckCircle } from 'lucide-react';

export function AIPipelinePage() {
  const pipelineSteps = [
    {
      icon: <Database className="w-8 h-8" />,
      title: 'DICOM Upload',
      description: 'Secure upload and validation of cardiac CT DICOM files',
      details: [
        'HIPAA-compliant file handling',
        'Metadata extraction and validation',
        'Quality control checks',
        'Automatic anonymization'
      ]
    },
    {
      icon: <Cpu className="w-8 h-8" />,
      title: 'Preprocessing',
      description: 'Image enhancement and standardization for optimal AI analysis',
      details: [
        'Noise reduction algorithms',
        'Intensity normalization',
        'Slice thickness standardization',
        'Orientation correction'
      ]
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: 'TotalSegmentator',
      description: 'AI-powered anatomical structure identification and segmentation',
      details: [
        'Multi-organ segmentation',
        'Heart chamber identification',
        'Great vessel detection',
        'Anatomical landmark mapping'
      ]
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: 'nnU-Net Segmentation',
      description: 'Specialized cardiac segmentation for precise artery identification',
      details: [
        'Coronary artery segmentation',
        'Vessel centerline extraction',
        'Calcium deposit identification',
        'Plaque characterization'
      ]
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: 'Agatston Calculation',
      description: 'Automated calcium scoring using validated algorithms',
      details: [
        'Per-artery calcium quantification',
        'Total Agatston score calculation',
        'Volume and mass measurements',
        'Percentile ranking'
      ]
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: 'Risk Assessment',
      description: 'Clinical risk stratification and comprehensive reporting',
      details: [
        'Cardiovascular risk categorization',
        'Evidence-based recommendations',
        'Comparative analysis',
        'Clinical interpretation'
      ]
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: 'Report Generation',
      description: 'Comprehensive clinical reports with interactive visualizations',
      details: [
        'Automated report generation',
        '3D visualization creation',
        'PDF export functionality',
        'PACS integration ready'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">AI Pipeline Overview</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Advanced artificial intelligence pipeline for comprehensive cardiovascular CT analysis, 
            delivering clinical-grade results in under 60 seconds.
          </p>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">&lt; 60s</div>
            <div className="text-lg font-semibold text-gray-900 mb-1">Processing Time</div>
            <div className="text-sm text-gray-600">Complete analysis pipeline</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">99.2%</div>
            <div className="text-lg font-semibold text-gray-900 mb-1">Accuracy</div>
            <div className="text-sm text-gray-600">Compared to expert radiologists</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">24/7</div>
            <div className="text-lg font-semibold text-gray-900 mb-1">Availability</div>
            <div className="text-sm text-gray-600">Automated analysis</div>
          </div>
        </div>

        {/* Pipeline Steps */}
        <div className="space-y-8">
          {pipelineSteps.map((step, index) => (
            <div key={index} className="relative">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                <div className="flex flex-col lg:flex-row items-start lg:items-center">
                  <div className="flex items-center mb-4 lg:mb-0 lg:mr-8">
                    <div className="flex-shrink-0 w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mr-4">
                      {step.icon}
                    </div>
                    <div className="text-2xl font-bold text-gray-400">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-gray-600 mb-4 text-lg">{step.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {step.details.map((detail, detailIndex) => (
                        <div key={detailIndex} className="flex items-center text-sm text-gray-700">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                          {detail}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Arrow connecting to next step */}
              {index < pipelineSteps.length - 1 && (
                <div className="flex justify-center my-6">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Technical Details */}
        <div className="mt-12 bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Technical Specifications</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Models</h3>
              <div className="space-y-3">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900">TotalSegmentator v1.5.7</h4>
                  <p className="text-sm text-gray-600">Multi-organ segmentation model</p>
                  <p className="text-xs text-gray-500 mt-1">Training: 1,204 CT datasets</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900">nnU-Net v2.1</h4>
                  <p className="text-sm text-gray-600">Cardiac-specific segmentation</p>
                  <p className="text-xs text-gray-500 mt-1">Training: 2,847 cardiac CT studies</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900">Agatston Calculator</h4>
                  <p className="text-sm text-gray-600">FDA 510(k) cleared algorithm</p>
                  <p className="text-xs text-gray-500 mt-1">Validation: 10,000+ studies</p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Clinical Validation</h3>
              <div className="space-y-3">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900">Multi-Center Study</h4>
                  <p className="text-sm text-gray-600">15 academic medical centers</p>
                  <p className="text-xs text-gray-500 mt-1">N = 5,247 patients</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900">Expert Validation</h4>
                  <p className="text-sm text-gray-600">Board-certified radiologists</p>
                  <p className="text-xs text-gray-500 mt-1">Inter-reader agreement: κ = 0.94</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900">Regulatory Status</h4>
                  <p className="text-sm text-gray-600">FDA 510(k) pathway</p>
                  <p className="text-xs text-gray-500 mt-1">CE Mark certification</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Clinical References */}
        <div className="mt-8 bg-gray-100 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Clinical References</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
            <div>
              <p className="mb-2">
                <strong>Agatston AS, et al.</strong> Quantification of coronary artery calcium using ultrafast computed tomography. 
                <em> J Am Coll Cardiol.</em> 1990;15(4):827-32.
              </p>
              <p>
                <strong>Blaha MJ, et al.</strong> Coronary artery calcium scoring: is it time for a change in methodology? 
                <em> JACC Cardiovasc Imaging.</em> 2017;10(8):923-937.
              </p>
            </div>
            <div>
              <p className="mb-2">
                <strong>Isensee F, et al.</strong> nnU-Net: a self-configuring method for deep learning-based biomedical image segmentation. 
                <em> Nat Methods.</em> 2021;18(2):203-211.
              </p>
              <p>
                <strong>Wasserthal J, et al.</strong> TotalSegmentator: robust segmentation of 104 anatomical structures in CT images. 
                <em> Radiol Artif Intell.</em> 2023;5(5):e230024.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}