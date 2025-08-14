import React, { useState } from 'react';
import { ChevronRight, ChevronDown, Book, Heart, Brain, AlertTriangle } from 'lucide-react';

export function DocumentationPage() {
  const [expandedSections, setExpandedSections] = useState<string[]>(['glossary']);

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const sections = [
    {
      id: 'glossary',
      title: 'Clinical Glossary',
      icon: <Book className="w-5 h-5" />,
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">Agatston Score</h4>
                <p className="text-sm text-gray-700">
                  Quantitative measurement of coronary artery calcium (CAC) burden. 
                  Calculated using CT attenuation and lesion area, providing standardized 
                  assessment of atherosclerotic plaque burden.
                </p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">CAC (Coronary Artery Calcium)</h4>
                <p className="text-sm text-gray-700">
                  Calcium deposits in the coronary arteries, indicating presence of 
                  atherosclerotic plaque. Strong predictor of future cardiovascular events.
                </p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">LAD (Left Anterior Descending)</h4>
                <p className="text-sm text-gray-700">
                  Major coronary artery supplying the anterior wall of the left ventricle. 
                  Often called the "widow maker" due to its critical supply territory.
                </p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">RCA (Right Coronary Artery)</h4>
                <p className="text-sm text-gray-700">
                  Major coronary vessel supplying the right ventricle and inferior 
                  wall of the left ventricle in most patients (right-dominant circulation).
                </p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">LCX (Left Circumflex)</h4>
                <p className="text-sm text-gray-700">
                  Coronary artery supplying the lateral and posterior walls of the 
                  left ventricle. Part of the left main coronary system.
                </p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">DICOM</h4>
                <p className="text-sm text-gray-700">
                  Digital Imaging and Communications in Medicine - standard format 
                  for medical imaging data including CT scans.
                </p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'ai-guide',
      title: 'AI Usage Guide',
      icon: <Brain className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-3">How AI Reports Are Generated</h4>
            <div className="prose max-w-none">
              <ol className="space-y-3">
                <li className="flex items-start">
                  <span className="font-semibold text-blue-600 mr-3">1.</span>
                  <div>
                    <strong>Image Preprocessing:</strong> CT DICOM files are automatically processed 
                    to enhance image quality, standardize intensity values, and prepare for AI analysis.
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="font-semibold text-blue-600 mr-3">2.</span>
                  <div>
                    <strong>Anatomical Segmentation:</strong> TotalSegmentator identifies and segments 
                    major anatomical structures including the heart, great vessels, and surrounding organs.
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="font-semibold text-blue-600 mr-3">3.</span>
                  <div>
                    <strong>Cardiac Segmentation:</strong> nnU-Net performs detailed segmentation of 
                    coronary arteries and identifies areas of calcium deposition with sub-millimeter precision.
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="font-semibold text-blue-600 mr-3">4.</span>
                  <div>
                    <strong>Calcium Quantification:</strong> Automated Agatston scoring calculates 
                    calcium burden for each coronary vessel using validated clinical algorithms.
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="font-semibold text-blue-600 mr-3">5.</span>
                  <div>
                    <strong>Risk Assessment:</strong> Clinical risk stratification based on established 
                    guidelines and peer-reviewed literature for cardiovascular event prediction.
                  </div>
                </li>
              </ol>
            </div>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-900 mb-2">AI Confidence Metrics</h4>
            <p className="text-sm text-blue-800">
              Each AI analysis includes confidence scores and quality metrics. Reports with low confidence 
              scores are automatically flagged for manual review by a qualified radiologist.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'risk-bands',
      title: 'Clinical Risk Bands',
      icon: <Heart className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Agatston Score Risk Categories</h4>
            <div className="space-y-3">
              <div className="flex items-center p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="w-4 h-4 bg-green-500 rounded-full mr-4"></div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-900">Minimal (0 Agatston Units)</div>
                  <div className="text-sm text-gray-600">
                    Very low cardiovascular risk. Excellent prognosis with standard preventive care.
                  </div>
                </div>
              </div>
              
              <div className="flex items-center p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="w-4 h-4 bg-yellow-500 rounded-full mr-4"></div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-900">Mild (1-99 Agatston Units)</div>
                  <div className="text-sm text-gray-600">
                    Low to moderate risk. Consider lifestyle modifications and cardiovascular risk factor optimization.
                  </div>
                </div>
              </div>
              
              <div className="flex items-center p-4 bg-orange-50 border border-orange-200 rounded-lg">
                <div className="w-4 h-4 bg-orange-500 rounded-full mr-4"></div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-900">Moderate (100-399 Agatston Units)</div>
                  <div className="text-sm text-gray-600">
                    Moderate risk. Consider statin therapy and aggressive risk factor modification.
                  </div>
                </div>
              </div>
              
              <div className="flex items-center p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="w-4 h-4 bg-red-500 rounded-full mr-4"></div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-900">Severe (≥400 Agatston Units)</div>
                  <div className="text-sm text-gray-600">
                    High to very high risk. Intensive medical therapy and possible cardiology consultation indicated.
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-2">Clinical Context</h4>
            <p className="text-sm text-gray-700">
              Risk categories are based on the 2018 AHA/ACC Cholesterol Guidelines and the 
              Multi-Ethnic Study of Atherosclerosis (MESA) risk calculator. Individual patient 
              risk should always be assessed in clinical context with other cardiovascular risk factors.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'sample-explanation',
      title: 'Sample Report Explanation',
      icon: <AlertTriangle className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Understanding Your Report</h4>
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <h5 className="font-semibold text-gray-900 mb-2">Patient Information</h5>
                <p className="text-sm text-gray-700">
                  Basic demographic information and scan parameters. Verify all details are correct 
                  before clinical interpretation.
                </p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <h5 className="font-semibold text-gray-900 mb-2">AI Summary</h5>
                <p className="text-sm text-gray-700">
                  Computer-generated summary of key findings. Highlights significant calcium deposits 
                  and provides initial clinical context for further evaluation.
                </p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <h5 className="font-semibold text-gray-900 mb-2">Agatston Breakdown</h5>
                <p className="text-sm text-gray-700">
                  Detailed calcium scoring for each major coronary vessel. LAD, RCA, LCX, and LM 
                  scores are calculated separately and summed for total calcium burden.
                </p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <h5 className="font-semibold text-gray-900 mb-2">3D Visualization</h5>
                <p className="text-sm text-gray-700">
                  Interactive 3D model of the heart with calcium deposits highlighted. 
                  For educational and visualization purposes - not for quantitative analysis.
                </p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <h5 className="font-semibold text-gray-900 mb-2">Clinical Interpretation</h5>
                <p className="text-sm text-gray-700">
                  Evidence-based clinical recommendations based on current guidelines. 
                  Should be considered alongside patient history and other clinical factors.
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-start">
              <AlertTriangle className="w-5 h-5 text-red-600 mr-2 mt-0.5" />
              <div>
                <h4 className="font-semibold text-red-900 mb-1">Important Clinical Notice</h4>
                <p className="text-sm text-red-800">
                  AI-generated reports are intended to assist healthcare professionals and should not 
                  replace clinical judgment. All findings require interpretation by a qualified physician 
                  in the context of the patient's clinical presentation and medical history.
                </p>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Documentation</h1>
          <p className="text-xl text-gray-600">
            Comprehensive guide to cardiovascular AI analysis and clinical interpretation
          </p>
        </div>

        {/* Table of Contents */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Table of Contents</h2>
          <div className="space-y-2">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => toggleSection(section.id)}
                className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50 rounded-lg transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="text-blue-600">{section.icon}</div>
                  <span className="font-medium text-gray-900">{section.title}</span>
                </div>
                {expandedSections.includes(section.id) ? (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Section Content */}
        <div className="space-y-8">
          {sections.map((section) => (
            <div key={section.id} className="bg-white rounded-lg shadow-sm border border-gray-200">
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="text-blue-600">{section.icon}</div>
                  <h2 className="text-2xl font-bold text-gray-900">{section.title}</h2>
                </div>
                {expandedSections.includes(section.id) ? (
                  <ChevronDown className="w-6 h-6 text-gray-400" />
                ) : (
                  <ChevronRight className="w-6 h-6 text-gray-400" />
                )}
              </button>
              
              {expandedSections.includes(section.id) && (
                <div className="px-6 pb-6 border-t border-gray-100">
                  <div className="pt-6">
                    {section.content}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Additional Resources */}
        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">Additional Resources</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-blue-900 mb-2">Training Materials</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Video tutorials for platform navigation</li>
                <li>• Clinical case studies and examples</li>
                <li>• Best practices for CT scan acquisition</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-blue-900 mb-2">Support</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Technical support documentation</li>
                <li>• Clinical consultation services</li>
                <li>• Integration and PACS connectivity guides</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}