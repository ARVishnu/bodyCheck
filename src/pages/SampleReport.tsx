import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Download,
  RotateCcw,
  Eye,
  Heart,
  Activity,
  TrendingUp,
  FileText,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { mockPatients, mockReport } from "../data/mockData";
import { StatusPill } from "../components/StatusPill";

// Utility function for calcification risk category
function getCalcificationRiskCategory(score: number): 'No CALC' | 'Low' | 'Medium' | 'High' {
  if (score === 0) return 'No CALC';
  if (score <= 100) return 'Low';
  if (score <= 200) return 'Medium';
  if (score <= 300) return 'High';
  return 'High';
}

export function SampleReport() {
  const [activeTab, setActiveTab] = useState("overview");
  const [openReference, setOpenReference] = useState(true);
  const patient = mockPatients[0]; // Use first patient as sample
  const report = mockReport;

  const tabs = [
    { id: "overview", label: "Overview", icon: <Eye className="w-4 h-4" /> },
    {
      id: "3d-model",
      label: "3D Heart Model",
      icon: <Heart className="w-4 h-4" />,
    },
    {
      id: "ct-slices",
      label: "CT Analysis",
      icon: <Activity className="w-4 h-4" />,
    },
    {
      id: "Recommendations",
      label: "Recommendations",
      icon: <TrendingUp className="w-4 h-4" />,
    },
  ];
  const calciumScores = [
    {
      biomarker: "Coronary Arteries Calcium",
      agatstonScore: patient.CACScore,
      Risk: getCalcificationRiskCategory(Number(patient.CACScore)),
    },
    {
      biomarker: "Abdominal Aortic Calcium",
      agatstonScore: patient.AACScore,
      Risk: getCalcificationRiskCategory(Number(patient.AACScore)),
    },
    {
      biomarker: "Thoracic Aortic Calcium",
      agatstonScore: patient.TACScore,
      Risk: getCalcificationRiskCategory(Number(patient.TACScore)),
    },
    {
      biomarker: "Aortic Annulus Calcium",
      agatstonScore: patient.AANCScore,
      Risk: getCalcificationRiskCategory(Number(patient.AANCScore)),
    },
    {
      biomarker: "Mitral Annulus Calcium",
      agatstonScore: patient.MACScore,
      Risk: getCalcificationRiskCategory(Number(patient.MACScore)),
    },
    {
      biomarker: "Aortic Valve Leaflets Calcium",
      agatstonScore: patient.AVLCScore,
      Risk: getCalcificationRiskCategory(Number(patient.AVLCScore)),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <Link
                to="/"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                ← Back to Home
              </Link>
              <div className="h-6 border-l border-gray-300"></div>
              <h1 className="text-3xl font-bold text-gray-900">
                Sample Cardiovascular Report
              </h1>
            </div>
            <div className="flex items-center space-x-3">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-sm text-blue-800 font-medium">
                  📋 Sample Data
                </p>
              </div>
              <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <a href="public/PDF_Report/final.html" target="_blank">
                  <div style={{ display: "flex" }}>
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF
                  </div>
                </a>
              </button>
            </div>
          </div>

          {/* Patient Info Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Remove Patient Name, Age/Gender, only show Patient ID and Scan Date */}
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">
                  Patient ID
                </h3>
                <p className="text-lg font-semibold text-gray-900">
                  {patient.id}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">
                  Patient Name
                </h3>
                <p className="text-lg font-semibold text-gray-900">
                  {patient.name}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">
                  Scan Date
                </h3>
                <p className="text-lg font-semibold text-gray-900">
                  {new Date(patient.examDate).toLocaleDateString()}
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
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
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
          {activeTab === "overview" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* AI Summary */}
              {/* <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  AI Summary
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {report.aiSummary}
                </p>
              </div> */}

              {/* Key Metrics */}
              {/* <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Key Metrics
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Agatston Score</span>
                    <span className="text-2xl font-bold text-gray-900">
                      {patient.agatstonScore}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Category</span>
                    <StatusPill status={patient.highRiskLevel} type="risk" />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Risk Level</span>
                    <StatusPill status={patient.highRiskLevel} type="risk" />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Risk Band</span>
                    <span className="text-sm font-medium text-gray-900">
                      {report.riskBand}
                    </span>
                  </div>
                </div>
              </div> */}

              {/* Agatston Breakdown */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 lg:col-span-2">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Agatston Score Breakdown by Artery
                </h3>
                <h2 className="text-lg font-semibold text-gray-900 mb-4 text-center">
                  Patient ID : {patient.id}
                </h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="border-t-2 border-gray-300">
                        <th className="py-3 text-bold text-start">Biomarker</th>
                        <th className="py-3 text-bold">Result</th>
                        <th className="py-3 text-bold">Units</th>
                        <th className="py-3 text-bold">Risk</th>
                      </tr>
                    </thead>
                    {calciumScores.map((items) => (
                      <tr className="border-t-2 border-gray-300">
                        <td className="py-3 text-bold">{items.biomarker}</td>
                        <td className="py-3 text-center">
                          {Math.round(Number(items.agatstonScore))}
                        </td>
                        <td className="py-3 text-center">Agatston Score</td>
                        <td className="py-3 text-center">
                          <StatusPill status={items.Risk} type="Risk Category" />
                        </td>
                      </tr>
                    ))}
                    <tr className="border-t-2 border-gray-300">
                      <td className="py-3 text-bold">Cardiothoracic Ratio</td>
                      <td className="py-3 text-center">
                        {patient.cardiothoracicRatio}
                      </td>
                      <td className="py-3 text-center">Ratio</td>
                      <td className="py-3 text-center">
                        <StatusPill status={patient.cardiothoracicRatio < 0.5 ? "Low" : patient.cardiothoracicRatio >= 0.5 &&
                          patient.cardiothoracicRatio < 0.56 ? "Medium" : "High"} type="Risk Category" />
                      </td>
                    </tr>
                  </table>
                </div>
              </div>
              {/* Risk Category Reference Ranges */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-0 lg:col-span-2 mb-4">
                    <button
                      onClick={() => setOpenReference((v) => !v)}
                      className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors rounded-t-lg"
                    >
                      <h3 className="text-lg font-semibold">Risk Category Reference Ranges</h3>
                      {openReference ? (
                        <ChevronDown className="w-6 h-6 text-gray-400" />
                      ) : (
                        <ChevronUp className="w-6 h-6 text-gray-400" />
                      )}
                    </button>
                    {openReference && (
                      <div className="p-6">
                        <div className="flex flex-col md:flex-row gap-20">
                          {/* Cardiothoracic Ratio */}
                          <div>
                            <h2 className="font-semibold mb-2">Cardiothoracic Ratio</h2>
                            <div className="flex flex-col gap-1">
                              <div className="flex items-center gap-2">
                                <span className="inline-block w-3 h-3 rounded-full bg-green-500"></span>
                                <span>Low: &lt; 0.5</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="inline-block w-3 h-3 rounded-full bg-yellow-400"></span>
                                <span>Intermediate: 0.5 - 0.56</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="inline-block w-3 h-3 rounded-full bg-red-500"></span>
                                <span>High: ≥ 0.56</span>
                              </div>
                            </div>
                          </div>
                          {/* Calcification Scores */}
                          <div>
                            <h2 className="font-semibold mb-2">Calcification Scores</h2>
                            <div className="flex flex-col gap-1">
                              <div className="flex items-center gap-2">
                                <span className="inline-block w-3 h-3 rounded-full bg-green-500"></span>
                                <span>Low: &lt; 100</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="inline-block w-3 h-3 rounded-full bg-yellow-400"></span>
                                <span>Intermediate: 100 - 400</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="inline-block w-3 h-3 rounded-full bg-red-500"></span>
                                <span>High: &gt; 400</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
              </div>
            </div>
          )}

          {activeTab === "3d-model" && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  3D Heart Model Viewer
                </h3>
                {/* <button className="flex items-center px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset View
                </button> */}
              </div>

              <iframe
                src="/3Dheart/case141.html"
                scrolling="no"
                style={{
                  height: "500px",
                  width: "100%",
                  borderRadius: "10px",
                  background: "white",
                }}
                className="dark:bg-cloud-burst"
              ></iframe>

              {/* <div className="bg-gray-100 rounded-lg h-96 flex items-center justify-center">
                <div className="text-center">
                  <Heart className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                  <h4 className="text-lg font-medium text-gray-900 mb-2">
                    3D Heart Model
                  </h4>
                  <p className="text-gray-600 mb-4">
                    Interactive 3D visualization with calcium deposits
                    highlighted
                  </p>
                  <div className="space-y-2">
                    <div className="text-sm text-gray-500">Controls:</div>
                    <div className="text-xs text-gray-500">
                      • Click and drag to rotate
                    </div>
                    <div className="text-xs text-gray-500">
                      • Scroll to zoom
                    </div>
                    <div className="text-xs text-gray-500">
                      • Click arteries to highlight
                    </div>
                  </div>
                </div>
              </div> */}

              {/* <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                <p className="text-sm text-yellow-800">
                  <strong>Clinical Notice:</strong> This 3D model is a visual
                  representation based on CT data. Consult the detailed report
                  and clinical interpretation for diagnostic purposes.
                </p>
              </div> */}
            </div>
          )}

          {activeTab === "ct-slices" && (
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  CT Slice Analysis
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {["Axial Slice 1", "Axial Slice 2", "Axial Slice 3"].map(
                    (slice, index) => (
                      <div key={index} className="text-center">
                        <div className="bg-gray-100 rounded-lg h-48 mb-3 flex items-center justify-center">
                          <div className="text-center">
                            <Activity className="w-12 h-12 text-blue-600 mx-auto mb-2" />
                            <div className="text-sm font-medium text-gray-900">
                              {slice}
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600">
                          {index === 0 &&
                            "Proximal LAD calcium deposits identified"}
                          {index === 1 &&
                            "RCA calcification visible in mid-vessel"}
                          {index === 2 && "LCX minimal calcium burden detected"}
                        </p>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === "Recommendations" && (
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                {/* <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Clinical Interpretation
                </h3> */}
                <div className="prose max-w-none">
                  {/* <p className="text-gray-700 leading-relaxed mb-4">
                    {report.clinicalInterpretation}
                  </p> */}

                  <h4 className="text-md font-semibold text-gray-900 mb-2">
                    Recommendations
                  </h4>
                  <ul className="text-gray-700 space-y-1">
                    <li>
                      • Continue current cardiovascular risk reduction
                      strategies
                    </li>
                    {/* <li>
                      • Follow-up cardiac CT scan in 3-5 years unless clinically
                      indicated sooner
                    </li> */}
                    <li>
                      • Consider cardiology consultation for comprehensive risk
                      assessment
                    </li>
                    <li>
                      • Lifestyle modifications: diet, exercise, smoking
                      cessation if applicable
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  AI Model Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">
                      Segmentation Model
                    </h4>
                    <p className="text-sm text-gray-600">
                      nnU-Net v2.1 - Cardiac CT Segmentation
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Accuracy: 99.2% ± 0.3%
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">
                      Calcium Scoring
                    </h4>
                    <p className="text-sm text-gray-600">
                      Agatston Algorithm with AI Enhancement
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      FDA 510(k) Cleared
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sample Notice */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">
                Sample Report
              </h3>
              <div className="mt-2 text-sm text-blue-700">
                <p>
                  {activeTab === "Recommendations"
                    ? "This is a demonstration version with example data. Thresholds for risk categories are configurable and established by the individual practice. Recommendations are customizable and established by practice, based on guidelines, and are specific to the individual patient data."
                    : "This is a demonstration version with example data. Thresholds for risk categories are configurable and established by the individual practice."}
                </p>
                <div className="mt-2">
                  <Link
                    to="/contact"
                    className="font-medium text-blue-800 hover:text-blue-900"
                  >
                    → Contact us for more information
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
