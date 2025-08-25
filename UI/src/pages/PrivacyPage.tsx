import { useState } from 'react';
import { Shield, Lock, Eye, FileText, AlertCircle, CheckCircle } from 'lucide-react';

export function PrivacyPage() {
  const [activeSection, setActiveSection] = useState('privacy');

  const sections = [
    { id: 'privacy', title: 'Privacy Policy', icon: <Shield className="w-4 h-4" /> },
    { id: 'terms', title: 'Terms of Use', icon: <FileText className="w-4 h-4" /> },
    // { id: 'disclaimer', title: 'AI Disclaimer', icon: <AlertCircle className="w-4 h-4" /> },
    // { id: 'hipaa', title: 'HIPAA Compliance', icon: <Lock className="w-4 h-4" /> }
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
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${activeSection === section.id
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
                  <p className="text-sm text-gray-500 mb-6">Last updated: 8/22/2025</p>

                  <div className="space-y-6">
                    <section>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">1. Information We Collect</h3>
                      <h4 className="font-semibold text-gray-900 mb-2">Information you provide:</h4>
                      <ul className="space-y-2 text-gray-700">
                        <li>• Contact details (e.g., name, email, phone) submitted via forms (e.g., “Contact Us,” demo requests, newsletter sign-ups).</li>
                      </ul>
                      <h4 className="font-semibold text-gray-900 my-2">Information collected automatically:</h4>
                      <ul className="space-y-2 text-gray-700">
                        <li>• Technical and usage data such as IP address, device and browser type, pages viewed, referring/exit pages, and timestamps.</li>
                        <li>• Cookies and similar technologies to help operate and improve the Website and understand usage.</li>
                      </ul>
                      <p className="text-gray-700 mt-2">We do not intend for the Website to collect Protected Health Information (PHI). Any PHI processed through Body Check’s software platform (not the Website) is governed by a BAA and related agreements.</p>
                    </section>

                    <section>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">2. How We Use Your Information</h3>
                      <h4 className="font-semibold text-gray-900 mb-2">We use information to:</h4>
                      <ul className="space-y-2 text-gray-700">
                        <li>• Provide, operate, analyze, and improve the Website;</li>
                        <li>• Respond to your inquiries and communicate with you;</li>
                        <li>• Send updates or marketing communications where permitted by law (you may opt out at any time);</li>
                        <li>• Detect, prevent, and address technical or security issues;</li>
                        <li>• Comply with legal obligations.</li>
                      </ul>
                    </section>

                    <section>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">3. Cookies and Analytics</h3>
                      <p className="text-gray-700 mt-2">We may use cookies, pixels, and analytics services to measure Website usage and performance. You can control cookies through your browser settings; disabling cookies may affect Website functionality.</p>
                    </section>

                    <section>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">4. Sharing of Information</h3>
                      <h4 className="font-semibold text-gray-900 mb-2">We do not sell or rent your personal information. We may share information with:</h4>
                      <ul className="space-y-2 text-gray-700">
                        <li>• Service providers that perform services on our behalf (e.g., hosting, analytics, communications);</li>
                        <li>• Legal and safety recipients when required to comply with law, regulation, or legal process, or to protect rights, property, or safety;</li>
                        <li>• Send updates or marketing communications where permitted by law (you may opt out at any time);</li>
                        <li>• Business transfers, in connection with a merger, acquisition, financing, or sale of all or part of our business.</li>
                      </ul>
                    </section>

                    <section>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">5. Data Security</h3>
                      <p className="text-gray-700 mt-2">We implement reasonable administrative, technical, and physical safeguards designed to protect information we process via the Website. However, no method of transmission over the Internet or method of electronic storage is completely secure.</p>
                    </section>

                    <section>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">6. Data Retention</h3>
                      <p className="text-gray-700 mt-2">We retain information for as long as necessary for the purposes described in this Policy, unless a longer retention period is required or permitted by law.</p>
                    </section>
                    
                    <section>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">7. Children’s Privacy</h3>
                      <p className="text-gray-700 mt-2">The Website is not directed to individuals under 18, and we do not knowingly collect personal information from them.</p>
                    </section>
                    
                    <section>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">8. International Users</h3>
                      <p className="text-gray-700 mt-2">If you access the Website from outside the United States, you understand that your information may be processed in the United States, where data protection laws may differ from those in your jurisdiction.</p>
                    </section>
                    
                   <section>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">9. Your Choices</h3>
                      <ul className="space-y-2 text-gray-700">
                        <li>• Marketing communications: You can opt out by following the unsubscribe instructions in our emails or by contacting us.</li>
                        <li>• Cookies: Use your browser settings to manage cookies.</li>
                      </ul>
                    </section>

                     <section>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">10. Third-Party Sites</h3>
                      <p className="text-gray-700 mt-2">The Website may contain links to third-party websites. We are not responsible for the privacy practices of those sites.</p>
                    </section>
                    
                     <section>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">11. Changes to This Policy</h3>
                      <p className="text-gray-700 mt-2">We may update this Privacy Policy from time to time. Updates will be posted on this page with a revised “Last updated” date. Your continued use of the Website after an update signifies your acceptance of the changes.</p>
                    </section>
                    
                     <section>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">12. Contact</h3>
                      <p className="text-gray-700 mt-2">Questions about this Privacy Policy? Contact us at: <b>support@bodycheck.ai</b></p>
                    </section>
                    
                  </div>
                </div>
              )}

              {activeSection === 'terms' && (
                <div className="prose max-w-none">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Terms of Use  </h2>
                  <p className="text-sm text-gray-500 mb-6">Last updated: 8/22/2025</p>
                  <p className="text-gray-700 mb-4">Welcome to bodycheck.ai, operated by Body Check LLC (“Body Check,” “we,” “us,” or “our”). These Terms of Use (“Terms”) govern your use of our public website located at https://bodycheck.ai (the “Website”). Please read them carefully. By accessing or using the Website, you agree to be bound by these Terms. If you do not agree, do not use the Website.</p>
                  <div className="space-y-6">
                    <section>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">1. Scope</h3>
                      <p className="text-gray-700 mt-2">These Terms apply only to use of the Website. Access to or use of Body Check’s software platform, applications, or related services is governed by separate agreements including, but not limited to, our Business Associate Agreement (BAA), End User License Agreement (EULA), and services contract.</p>
                    </section>

                    <section>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">2. Eligibility</h3>
                      <p className="text-gray-700 mt-2">You must be at least 18 years old to use this Website. By using the Website, you represent that you meet this requirement.</p>
                    </section>

                    <section>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">3. Permitted Use</h3>
                      <p className="text-gray-700 mb-2">You may use the Website solely for lawful purposes and in accordance with these Terms. You agree not to:</p>
                      <ul className="space-y-2 text-gray-700">
                        <li>• Use the Website in any way that violates applicable law or regulation.</li>
                        <li>• Attempt to gain unauthorized access to the Website or interfere with its operation.</li>
                        <li>• Use any automated means to access or collect data from the Website.</li>
                      </ul>
                    </section>

                    <section>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">4. Intellectual Property</h3>
                      <p className="text-gray-700 mt-2">All content, text, graphics, logos, and other materials available on the Website are the property of Body Check or its licensors and are protected by intellectual property laws. You may not copy, reproduce, distribute, or create derivative works without our prior written permission.</p>
                    </section>


                    <section>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">5. Links to Third-Party Websites</h3>
                      <p className="text-gray-700 mt-2">The Website may contain links to third-party websites. We do not control and are not responsible for the content, security, or practices of any third-party sites. Accessing such sites is at your own risk.</p>
                    </section>

                    <section>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">6. Disclaimer of Warranties</h3>
                      <p className="text-gray-700 mt-2">The website and all content are provided “as is” and “as available,” without warranties of any kind, express or implied, including implied warranties of merchantability, fitness for a particular purpose, title, and non-infringement. We do not warrant that the website will be uninterrupted, error-free, or secure. </p>
                    </section>
                    
                    <section>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">7. Limitation of Liability</h3>
                      <p className="text-gray-700 mt-2">To the fullest extent permitted by law, body check shall not be liable for any indirect, incidental, consequential, special, exemplary, or punitive damages, or any loss of profits, revenue, data, or use, arising out of or relating to your use of (or inability to use) the website, even if advised of the possibility of such damages. Our total liability for any claims arising from or relating to the website shall not exceed one hundred u. S. Dollars (us $100). </p>
                    </section>
                    
                    <section>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">8. Indemnification</h3>
                      <p className="text-gray-700 mt-2">You agree to indemnify, defend, and hold harmless Body Check and its affiliates and licensors, and each of their respective officers, directors, employees, and agents, from and against any and all claims, liabilities, damages, losses, costs, and expenses (including reasonable attorneys’ fees) arising out of or related to: (a) your access to or use of the Website; (b) your violation of these Terms; or (c) your violation of any law or the rights of any third party.</p>
                    </section>
                    
                   <section>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">9. Governing Law</h3>
                       <p className="text-gray-700 mt-2">These Terms are governed by the laws of the State of Delaware, without regard to its conflict of laws principles. You agree to the exclusive jurisdiction and venue of the state and federal courts located in Delaware for any dispute arising out of or relating to these Terms or the Website.</p>
                    </section>

                     <section>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">10. Changes to Terms</h3>
                      <p className="text-gray-700 mt-2">We may modify or discontinue the Website (in whole or in part) at any time without notice. We may also update these Terms from time to time. Changes will be posted on this page with a revised “Last updated” date. Your continued use of the Website after any change constitutes your acceptance of the updated Terms.</p>
                    </section>
                    
                     <section>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">11. No Medical Advice</h3>
                      <p className="text-gray-700 mt-2">The content on the Website is provided for general informational purposes only and is not intended as medical advice, diagnosis, or treatment. The Website does not create a doctor-patient relationship between you and Body Check or any of its affiliates. You should not rely on the Website as a substitute for professional medical advice. Always seek the guidance of a qualified healthcare provider with any questions you may have regarding a medical condition or treatment.</p>
                    </section>
                    
                     <section>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">12. Contact</h3>
                      <p className="text-gray-700 mt-2">Questions about these Terms? Contact us at: <b>support@bodycheck.ai</b></p>
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
                          BodyCheck is a diagnostic assistance tool and is NOT intended for primary diagnosis.
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
                          BodyCheck is designed to meet or exceed HIPAA requirements for protected
                          health information (PHI) handling and security.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <section>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Business Associate Agreement</h3>
                      <p className="text-gray-700 mb-3">
                        BodyCheck operates under Business Associate Agreements (BAAs) with covered entities,
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
                          Email: compliance@bodycheck<br />
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