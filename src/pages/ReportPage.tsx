import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Download, Eye, Heart, Activity, TrendingUp, FileText } from 'lucide-react';
import { mockPatients, mockReport } from '../data/mockData';
import { StatusPill } from '../components/StatusPill';
import { HeartModelViewer } from '../components/HeartModelViewer';

export function ReportPage() {
  const { patientId } = useParams();
  const [activeTab, setActiveTab] = useState('overview');

  const patient = mockPatients.find(p => p.id === patientId) || mockPatients[0];
  const report = mockReport;

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <Eye className="w-4 h-4" /> },
    { id: '3d-model', label: '3D Heart Model', icon: <Heart className="w-4 h-4" /> },
    { id: 'ct-slices', label: 'CT Analysis', icon: <Activity className="w-4 h-4" /> },
    { id: 'clinical', label: 'Clinical Data', icon: <TrendingUp className="w-4 h-4" /> }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <Link
                to="/dashboard"
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Dashboard
              </Link>
              <div className="h-6 border-l border-gray-300"></div>
              <h1 className="text-3xl font-bold text-gray-900">Cardiovascular Report</h1>
            </div>
            <div className="flex items-center space-x-3">
              <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </button>
              <button className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                <FileText className="w-4 h-4 mr-2" />
                Print View
              </button>
            </div>
          </div>

          {/* Patient Info Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Remove Patient Name, Age/Gender, only show Patient ID and Scan Date */}
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Patient ID</h3>
                <p className="text-lg font-semibold text-gray-900">{patient.id}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Scan Date</h3>
                <p className="text-lg font-semibold text-gray-900">
                  {new Date(patient.lastScanDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* AI Summary */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Summary</h3>
                <p className="text-gray-700 leading-relaxed">{report.aiSummary}</p>
              </div>

              {/* Key Metrics */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Metrics</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Agatston Score</span>
                    <span className="text-2xl font-bold text-gray-900">{patient.agatstonScore}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Category</span>
                    <StatusPill status={patient.category} type="category" />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Risk Level</span>
                    <StatusPill status={patient.riskLevel} type="risk" />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Risk Band</span>
                    <span className="text-sm font-medium text-gray-900">{report.riskBand}</span>
                  </div>
                </div>
              </div>

              {/* Agatston Breakdown */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 lg:col-span-2">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Agatston Score Breakdown by Artery</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-2 font-medium text-gray-900">Artery</th>
                        <th className="text-left py-2 font-medium text-gray-900">Full Name</th>
                        {/* Replace with new columns and labels */}
                        <th className="text-right py-2 font-medium text-gray-900">Coronary Arteries Calcification</th>
                        <th className="text-right py-2 font-medium text-gray-900">Abdominal Aortic Calcification</th>
                        <th className="text-right py-2 font-medium text-gray-900">Thoracic Aortic Calcification</th>
                        <th className="text-right py-2 font-medium text-gray-900">Aortic Annulus Calcification</th>
                        <th className="text-right py-2 font-medium text-gray-900">Mitral Annulus Calcification</th>
                        <th className="text-right py-2 font-medium text-gray-900">Aortic Valve Leaflets Calcification</th>
                        <th className="text-right py-2 font-medium text-gray-900">Percentage</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {Object.entries(report.agatstonBreakdown).map(([artery, score]) => {
                        if (artery === 'total') return null;
                        const arteryNames = {
                          LAD: 'Left Anterior Descending',
                          RCA: 'Right Coronary Artery',
                          LCX: 'Left Circumflex',
                          LM: 'Left Main'
                        };
                        const percentage = report.agatstonBreakdown.total > 0 
                          ? ((score / report.agatstonBreakdown.total) * 100).toFixed(1)
                          : '0.0';
                        // Dummy data for new columns
                        return (
                          <tr key={artery}>
                            <td className="py-3 font-mono text-sm">{artery}</td>
                            <td className="py-3 text-gray-700">{arteryNames[artery as keyof typeof arteryNames]}</td>
                            {/* For each new column, show labeled Agatston Score and Band */}
                            <td className="py-3 text-right font-mono">
                              <span className="block text-xs text-gray-500">Score:</span>
                              <span className="font-bold">366.684048</span>
                              <span className="block text-xs text-gray-500 mt-1">Band:</span>
                              <span className="inline-block text-xs font-semibold bg-blue-100 text-blue-700 rounded-full px-2 py-0.5 align-middle">3</span>
                            </td>
                            <td className="py-3 text-right font-mono">
                              <span className="block text-xs text-gray-500">Score:</span>
                              <span className="font-bold">222.041725</span>
                              <span className="block text-xs text-gray-500 mt-1">Band:</span>
                              <span className="inline-block text-xs font-semibold bg-blue-100 text-blue-700 rounded-full px-2 py-0.5 align-middle">3</span>
                            </td>
                            <td className="py-3 text-right font-mono">
                              <span className="block text-xs text-gray-500">Score:</span>
                              <span className="font-bold">2410.938858</span>
                              <span className="block text-xs text-gray-500 mt-1">Band:</span>
                              <span className="inline-block text-xs font-semibold bg-blue-100 text-blue-700 rounded-full px-2 py-0.5 align-middle">4</span>
                            </td>
                            <td className="py-3 text-right font-mono">
                              <span className="block text-xs text-gray-500">Score:</span>
                              <span className="font-bold">1036.311459</span>
                              <span className="block text-xs text-gray-500 mt-1">Band:</span>
                              <span className="inline-block text-xs font-semibold bg-blue-100 text-blue-700 rounded-full px-2 py-0.5 align-middle">4</span>
                            </td>
                            <td className="py-3 text-right font-mono">
                              <span className="block text-xs text-gray-500">Score:</span>
                              <span className="font-bold">287.883751</span>
                              <span className="block text-xs text-gray-500 mt-1">Band:</span>
                              <span className="inline-block text-xs font-semibold bg-blue-100 text-blue-700 rounded-full px-2 py-0.5 align-middle">3</span>
                            </td>
                            <td className="py-3 text-right font-mono">
                              <span className="block text-xs text-gray-500">Score:</span>
                              <span className="font-bold">558.256325</span>
                              <span className="block text-xs text-gray-500 mt-1">Band:</span>
                              <span className="inline-block text-xs font-semibold bg-blue-100 text-blue-700 rounded-full px-2 py-0.5 align-middle">4</span>
                            </td>
                            <td className="py-3 text-right text-gray-600">{percentage}%</td>
                          </tr>
                        );
                      })}
                      <tr className="border-t-2 border-gray-300">
                        <td className="py-3 font-bold">TOTAL</td>
                        <td className="py-3 font-bold">All Coronary Arteries</td>
                        {/* For each new column, show labeled Agatston Score and Band */}
                        <td className="py-3 text-right font-bold font-mono">
                          <span className="block text-xs text-gray-500">Score:</span>
                          <span className="font-bold">366.684048</span>
                          <span className="block text-xs text-gray-500 mt-1">Band:</span>
                          <span className="inline-block text-xs font-semibold bg-blue-100 text-blue-700 rounded-full px-2 py-0.5 align-middle">3</span>
                        </td>
                        <td className="py-3 text-right font-bold font-mono">
                          <span className="block text-xs text-gray-500">Score:</span>
                          <span className="font-bold">222.041725</span>
                          <span className="block text-xs text-gray-500 mt-1">Band:</span>
                          <span className="inline-block text-xs font-semibold bg-blue-100 text-blue-700 rounded-full px-2 py-0.5 align-middle">3</span>
                        </td>
                        <td className="py-3 text-right font-bold font-mono">
                          <span className="block text-xs text-gray-500">Score:</span>
                          <span className="font-bold">2410.938858</span>
                          <span className="block text-xs text-gray-500 mt-1">Band:</span>
                          <span className="inline-block text-xs font-semibold bg-blue-100 text-blue-700 rounded-full px-2 py-0.5 align-middle">4</span>
                        </td>
                        <td className="py-3 text-right font-bold font-mono">
                          <span className="block text-xs text-gray-500">Score:</span>
                          <span className="font-bold">1036.311459</span>
                          <span className="block text-xs text-gray-500 mt-1">Band:</span>
                          <span className="inline-block text-xs font-semibold bg-blue-100 text-blue-700 rounded-full px-2 py-0.5 align-middle">4</span>
                        </td>
                        <td className="py-3 text-right font-bold font-mono">
                          <span className="block text-xs text-gray-500">Score:</span>
                          <span className="font-bold">287.883751</span>
                          <span className="block text-xs text-gray-500 mt-1">Band:</span>
                          <span className="inline-block text-xs font-semibold bg-blue-100 text-blue-700 rounded-full px-2 py-0.5 align-middle">3</span>
                        </td>
                        <td className="py-3 text-right font-bold font-mono">
                          <span className="block text-xs text-gray-500">Score:</span>
                          <span className="font-bold">558.256325</span>
                          <span className="block text-xs text-gray-500 mt-1">Band:</span>
                          <span className="inline-block text-xs font-semibold bg-blue-100 text-blue-700 rounded-full px-2 py-0.5 align-middle">4</span>
                        </td>
                        <td className="py-3 text-right font-bold">100.0%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === '3d-model' && (
            <HeartModelViewer 
              patientData={{
                agatstonScore: patient.agatstonScore,
                ladScore: report.agatstonBreakdown.LAD,
                rcaScore: report.agatstonBreakdown.RCA,
                lcxScore: report.agatstonBreakdown.LCX,
                lmScore: report.agatstonBreakdown.LM,
              }}
            />
          )}

          {activeTab === 'ct-slices' && (
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">CT Slice Analysis</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {['Axial Slice 1', 'Axial Slice 2', 'Axial Slice 3'].map((slice, index) => (
                    <div key={index} className="text-center">
                      <div className="bg-gray-100 rounded-lg h-48 mb-3 flex items-center justify-center">
                        <div className="text-center">
                          <Activity className="w-12 h-12 text-blue-600 mx-auto mb-2" />
                          <div className="text-sm font-medium text-gray-900">{slice}</div>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">
                        {index === 0 && 'Proximal LAD calcium deposits identified'}
                        {index === 1 && 'RCA calcification visible in mid-vessel'}
                        {index === 2 && 'LCX minimal calcium burden detected'}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'clinical' && (
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Clinical Interpretation</h3>
                <div className="prose max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-4">{report.clinicalInterpretation}</p>
                  
                  <h4 className="text-md font-semibold text-gray-900 mb-2">Recommendations</h4>
                  <ul className="text-gray-700 space-y-1">
                    <li>• Continue current cardiovascular risk reduction strategies</li>
                    <li>• Follow-up cardiac CT scan in 3-5 years unless clinically indicated sooner</li>
                    <li>• Consider cardiology consultation for comprehensive risk assessment</li>
                    <li>• Lifestyle modifications: diet, exercise, smoking cessation if applicable</li>
                  </ul>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Model Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Segmentation Model</h4>
                    <p className="text-sm text-gray-600">nnU-Net v2.1 - Cardiac CT Segmentation</p>
                    <p className="text-xs text-gray-500 mt-1">Accuracy: 99.2% ± 0.3%</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Calcium Scoring</h4>
                    <p className="text-sm text-gray-600">Agatston Algorithm with AI Enhancement</p>
                    <p className="text-xs text-gray-500 mt-1">FDA 510(k) Cleared</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}