import  { useState } from 'react';
import { Shield, Lock, Eye, FileText, AlertCircle, CheckCircle } from 'lucide-react';

export function PrivacyPage() {
  const [activeSection, setActiveSection] = useState('privacy');

  const sections = [
    { id: 'privacy', title: 'Privacy Policy', icon: <Shield className="w-4 h-4" /> },
    { id: 'terms', title: 'Terms of Use', icon: <FileText className="w-4 h-4" /> },
    { id: 'disclaimer', title: 'AI Disclaimer', icon: <AlertCircle className="w-4 h-4" /> },
    { id: 'hipaa', title: 'HIPAA Compliance', icon: <Lock className="w-4 h-4" /> }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Legal & Privacy</h1>
          <p className="text-xl text-gray-600">
            Your privacy and security are our top priorities in healthcare AI
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sticky top-24">
              <h3 className="font-semibold text-gray-900 mb-4">Legal Documents</h3>
              <nav className="space-y-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      activeSection === section.id
                        ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-600'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {section.icon}
                    <span className="text-sm font-medium">{section.title}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
              {activeSection === 'privacy' && (
                <div className="prose max-w-none">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Privacy Policy</h2>
                  <p className="text-sm text-gray-500 mb-6">Last updated: January 2024</p>

                  <div className="space-y-6">
                    <section>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Information We Collect</h3>
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                        <div className="flex items-start">
                          <Eye className="w-5 h-5 text-blue-600 mr-2 mt-0.5" />
                          <div>
                            <h4 className="font-medium text-blue-900">Medical Data</h4>
                            <p className="text-sm text-blue-800">
                              We process DICOM CT scans and associated medical data solely for AI analysis and reporting purposes.
                            </p>
                          </div>
                        </div>
                      </div>
                      <ul className="space-y-2 text-gray-700">
                        <li>• DICOM medical imaging files (CT scans)</li>
                        <li>• Patient demographic information (age, gender)</li>
                        <li>• Clinical metadata and scan parameters</li>
                        <li>• User authentication and access logs</li>
                        <li>• AI analysis results and generated reports</li>
                      </ul>
                    </section>

                    <section>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">How We Use Your Information</h3>
                      <ul className="space-y-2 text-gray-700">
                        <li>• Generate AI-powered cardiovascular risk assessments</li>
                        <li>• Provide secure access to medical reports and visualizations</li>
                        <li>• Maintain audit trails for regulatory compliance</li>
                        <li>• Improve AI model accuracy through anonymized data analysis</li>
                        <li>• Ensure platform security and prevent unauthorized access</li>
                      </ul>
                    </section>

                    <section>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Data Security</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="border border-gray-200 rounded-lg p-4">
                          <h4 className="font-medium text-gray-900 mb-2">Encryption</h4>
                          <p className="text-sm text-gray-600">
                            All data is encrypted in transit (TLS 1.3) and at rest (AES-256).
                          </p>
                        </div>
                        <div className="border border-gray-200 rounded-lg p-4">
                          <h4 className="font-medium text-gray-900 mb-2">Access Control</h4>
                          <p className="text-sm text-gray-600">
                            Role-based access with multi-factor authentication required.
                          </p>
                        </div>
                        <div className="border border-gray-200 rounded-lg p-4">
                          <h4 className="font-medium text-gray-900 mb-2">Data Centers</h4>
                          <p className="text-sm text-gray-600">
                            SOC 2 Type II certified facilities with 24/7 monitoring.
                          </p>
                        </div>
                        <div className="border border-gray-200 rounded-lg p-4">
                          <h4 className="font-medium text-gray-900 mb-2">Audit Logging</h4>
                          <p className="text-sm text-gray-600">
                            Comprehensive logging of all data access and processing activities.
                          </p>
                        </div>
                      </div>
                    </section>

                    <section>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Data Retention</h3>
                      <p className="text-gray-700 mb-3">
                        Medical data is retained according to applicable healthcare regulations:
                      </p>
                      <ul className="space-y-2 text-gray-700">
                        <li>• DICOM files: Retained for duration specified in your service agreement</li>
                        <li>• AI analysis results: 7 years minimum or per institutional policy</li>
                        <li>• User access logs: 6 years for compliance purposes</li>
                        <li>• Anonymized research data: May be retained indefinitely for AI model improvement</li>
                      </ul>
                    </section>
                  </div>
                </div>
              )}

              {activeSection === 'terms' && (
                <div className="prose max-w-none">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Terms of Use</h2>
                  <p className="text-sm text-gray-500 mb-6">Last updated: January 2024</p>

                  <div className="space-y-6">
                    <section>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Acceptance of Terms</h3>
                      <p className="text-gray-700">
                        By accessing BodyCheck.ai, you agree to these Terms of Use and acknowledge that 
                        you are a qualified healthcare professional authorized to view medical imaging data.
                      </p>
                    </section>

                    <section>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Authorized Use</h3>
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                        <div className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5" />
                          <div>
                            <h4 className="font-medium text-green-900">Healthcare Professionals Only</h4>
                            <p className="text-sm text-green-800">
                              This platform is intended exclusively for licensed healthcare professionals.
                            </p>
                          </div>
                        </div>
                      </div>
                      <ul className="space-y-2 text-gray-700">
                        <li>• Licensed physicians, radiologists, and cardiologists</li>
                        <li>• Qualified medical technologists and nurses</li>
                        <li>• Authorized healthcare administrators</li>
                        <li>• Medical researchers with appropriate institutional approval</li>
                      </ul>
                    </section>

                    <section>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Prohibited Activities</h3>
                      <ul className="space-y-2 text-gray-700">
                        <li>• Uploading non-medical or synthetic data for testing purposes</li>
                        <li>• Sharing login credentials or unauthorized access delegation</li>
                        <li>• Attempting to reverse engineer AI algorithms or models</li>
                        <li>• Using the platform for non-medical commercial purposes</li>
                        <li>• Downloading or storing reports without proper authorization</li>
                      </ul>
                    </section>

                    <section>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Intellectual Property</h3>
                      <p className="text-gray-700">
                        All AI models, algorithms, software, and generated reports remain the intellectual 
                        property of BodyCheck.ai. Users retain ownership of their original medical data.
                      </p>
                    </section>
                  </div>
                </div>
              )}

              {activeSection === 'disclaimer' && (
                <div className="prose max-w-none">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">AI Medical Disclaimer</h2>
                  
                  <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
                    <div className="flex items-start">
                      <AlertCircle className="w-6 h-6 text-red-600 mr-3 mt-1" />
                      <div>
                        <h3 className="font-bold text-red-900 mb-2">CRITICAL MEDICAL NOTICE</h3>
                        <p className="text-red-800 font-medium">
                          BodyCheck.ai is a diagnostic assistance tool and is NOT intended for primary diagnosis. 
                          All AI-generated results must be reviewed and interpreted by qualified healthcare professionals.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <section>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Intended Use</h3>
                      <ul className="space-y-2 text-gray-700">
                        <li>• Computer-aided detection and analysis of coronary artery calcium</li>
                        <li>• Automated Agatston score calculation for risk assessment</li>
                        <li>• Secondary screening tool to assist radiologist interpretation</li>
                        <li>• Educational and research purposes in qualified institutions</li>
                      </ul>
                    </section>

                    <section>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Clinical Limitations</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="border border-gray-200 rounded-lg p-4">
                          <h4 className="font-medium text-gray-900 mb-2">AI Model Constraints</h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• Trained on specific CT protocols and populations</li>
                            <li>• May not generalize to all imaging conditions</li>
                            <li>• Performance varies with scan quality and parameters</li>
                          </ul>
                        </div>
                        <div className="border border-gray-200 rounded-lg p-4">
                          <h4 className="font-medium text-gray-900 mb-2">Clinical Context Required</h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• Must consider patient history and symptoms</li>
                            <li>• Results should correlate with clinical presentation</li>
                            <li>• Not suitable for emergency diagnostic decisions</li>
                          </ul>
                        </div>
                      </div>
                    </section>

                    <section>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Professional Responsibility</h3>
                      <p className="text-gray-700 mb-3">
                        Healthcare professionals using this platform acknowledge:
                      </p>
                      <ul className="space-y-2 text-gray-700">
                        <li>• Final diagnostic decisions remain their professional responsibility</li>
                        <li>• AI results should be validated against clinical guidelines</li>
                        <li>• Patient care decisions should integrate multiple data sources</li>
                        <li>• Continuing education on AI limitations is essential</li>
                      </ul>
                    </section>

                    <section>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Regulatory Status</h3>
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <p className="text-blue-800">
                          <strong>FDA Status:</strong> This device is FDA 510(k) cleared for computer-aided 
                          detection of coronary artery calcium. Clinical decision-making should follow 
                          established medical guidelines and institutional protocols.
                        </p>
                      </div>
                    </section>
                  </div>
                </div>
              )}

              {activeSection === 'hipaa' && (
                <div className="prose max-w-none">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">HIPAA Compliance</h2>
                  
                  <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
                    <div className="flex items-start">
                      <Lock className="w-6 h-6 text-green-600 mr-3 mt-1" />
                      <div>
                        <h3 className="font-bold text-green-900 mb-2">HIPAA COMPLIANT PLATFORM</h3>
                        <p className="text-green-800">
                          BodyCheck.ai is designed to meet or exceed HIPAA requirements for protected 
                          health information (PHI) handling and security.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <section>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Business Associate Agreement</h3>
                      <p className="text-gray-700 mb-3">
                        BodyCheck.ai operates under Business Associate Agreements (BAAs) with covered entities, 
                        ensuring proper handling of PHI according to HIPAA regulations.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="border border-gray-200 rounded-lg p-4">
                          <h4 className="font-medium text-gray-900 mb-2">Covered Entities</h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• Hospitals and health systems</li>
                            <li>• Imaging centers and clinics</li>
                            <li>• Healthcare providers and physicians</li>
                          </ul>
                        </div>
                        <div className="border border-gray-200 rounded-lg p-4">
                          <h4 className="font-medium text-gray-900 mb-2">PHI Safeguards</h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• Administrative safeguards and policies</li>
                            <li>• Physical security controls</li>
                            <li>• Technical safeguards and encryption</li>
                          </ul>
                        </div>
                      </div>
                    </section>

                    <section>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Technical Safeguards</h3>
                      <ul className="space-y-3 text-gray-700">
                        <li className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-1" />
                          <div>
                            <strong>Access Control:</strong> Role-based access with unique user identification 
                            and automatic logoff procedures
                          </div>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-1" />
                          <div>
                            <strong>Audit Controls:</strong> Comprehensive logging and monitoring of PHI 
                            access and processing activities
                          </div>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-1" />
                          <div>
                            <strong>Integrity Controls:</strong> Validation and verification of PHI 
                            accuracy and completeness
                          </div>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-1" />
                          <div>
                            <strong>Transmission Security:</strong> End-to-end encryption for all 
                            PHI communications and data transfers
                          </div>
                        </li>
                      </ul>
                    </section>

                    <section>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Breach Notification</h3>
                      <p className="text-gray-700 mb-3">
                        In the unlikely event of a security incident involving PHI:
                      </p>
                      <ul className="space-y-2 text-gray-700">
                        <li>• Immediate containment and risk assessment procedures</li>
                        <li>• Notification to affected covered entities within 24 hours</li>
                        <li>• Detailed incident documentation and remediation steps</li>
                        <li>• Cooperation with regulatory authorities as required</li>
                      </ul>
                    </section>

                    <section>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Contact Information</h3>
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                        <p className="text-gray-700">
                          <strong>HIPAA Compliance Officer:</strong><br />
                          Email: compliance@bodycheck.ai<br />
                          Phone: +1 (555) 123-4567<br />
                          Address: 123 Medical Center Drive, San Francisco, CA 94110
                        </p>
                      </div>
                    </section>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}