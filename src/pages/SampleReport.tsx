import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Download,
  Eye,
  Heart,
  Activity,
  TrendingUp,
  FileText,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { mockPatients, mokeBodyCompositionData } from "../data/mockData";
import { StatusPill } from "../components/StatusPill";
import {
  abdominal_region,
  ctr,
  ctr2,
  elliptical_trabecular_region,
  liver_roi,
} from "../assets/images";

// Utility function for calcification risk category
function getCardiovascularRiskCategory(
  score: number
): "Low" | "Medium" | "High" {
  if (score < 100) return "Low";
  if (score < 400) return "Medium";
  if (score >= 400) return "High";
  return "High";
}
// Utility function for calcification risk category
function getBodyCompositionRiskCategory(
  score: number
): "Low" | "Medium" | "High" {
  if (score < 50) return "Low";
  if (score < 75) return "Medium";
  if (score >= 75) return "High";
  return "High";
}
function getBodyCompositionArea(score: number): "Low" | "Medium" | "High" {
  if (score < 100) return "Low";
  if (score < 250) return "Medium";
  if (score >= 250) return "High";
  return "High";
}

export function SampleReport() {
  const [activeTab, setActiveTab] = useState("overview");
  const [openReference, setOpenReference] = useState(true);
  const patient = mockPatients[0]; // Use first patient as sample
  const bodyCompositionData = mokeBodyCompositionData[0];
  const [activeReport, setActiveReport] = useState("cardiac");

  // Reference ranges array structure
  const referenceRanges = {
    cardiac: [
      {
        title: "Cardiothoracic Ratio",
        ranges: [
          { label: "Normal", range: "< 0.521", color: "bg-green-500" },
          {
            label: "Borderline",
            range: "0.521 - 0.561",
            color: "bg-yellow-400",
          },
          { label: "High", range: "≥ 0.561", color: "bg-red-500" },
        ],
      },
      {
        title: "Calcification Scores",
        ranges: [
          { label: "Low", range: "< 100", color: "bg-green-500" },
          { label: "Medium", range: "100 - 400", color: "bg-yellow-400" },
          { label: "High", range: "> 400", color: "bg-red-500" },
        ],
      },
    ],
    body: [
      {
        title: "Liver Attenuation",
        ranges: [
          { label: "Low", range: "< 40", color: "bg-red-500" },
          { label: "Medium", range: "40 - 49", color: "bg-yellow-400" },
          { label: "High", range: "≥ 50", color: "bg-green-500" },
        ],
      },
      {
        title: "L1 Bone Attenuation",
        ranges: [
          { label: "Low", range: "< 120", color: "bg-red-500" },
          { label: "Medium", range: "120 - 160", color: "bg-yellow-400" },
          { label: "High", range: "≥ 160", color: "bg-green-500" },
        ],
      },
      {
        title: "Abdominal Muscle Area",
        ranges: [
          { label: "Low", range: "< 100", color: "bg-red-500" },
          { label: "Medium", range: "100 - 150", color: "bg-yellow-400" },
          { label: "High", range: "> 150", color: "bg-green-500" },
        ],
      },
      {
        title: "Abdominal Muscle Attenuation",
        ranges: [
          { label: "Low", range: "< 30", color: "bg-red-500" },
          { label: "Medium", range: "30 - 40", color: "bg-yellow-400" },
          { label: "High", range: "≥ 40", color: "bg-green-500" },
        ],
      },
      {
        title: "Abdominal Muscle Fat Area",
        ranges: [
          { label: "High", range: "> 45", color: "bg-red-500" },
          { label: "Medium", range: "25 - 45", color: "bg-yellow-400" },
          { label: "Low", range: "< 45", color: "bg-green-500" },
        ],
      },
      {
        title: "Abdominal Muscle Fat Attenuation",
        ranges: [
          { label: "Low", range: "< -100", color: "bg-red-500" },
          { label: "Medium", range: "-100 - -50", color: "bg-yellow-400" },
          { label: "High", range: "≥ -50", color: "bg-green-500" },
        ],
      },
      {
        title: "Abdominal Subcutaneous Fat Area",
        ranges: [
          { label: "Low", range: "< 100", color: "bg-red-500" },
          { label: "Medium", range: "100 - 200", color: "bg-yellow-400" },
          { label: "High", range: "> 200", color: "bg-green-500" },
        ],
      },
      {
        title: "Abdominal Subcutaneous Fat Attenuation",
        ranges: [
          { label: "Low", range: "< -110", color: "bg-green-500" },
          { label: "Medium", range: "-100 - -90", color: "bg-yellow-400" },
          { label: "High", range: "≥ -90", color: "bg-red-500" },
        ],
      },
      {
        title: "Abdominal Circumference at L1",
        ranges: [
          { label: "Low", range: "< 85", color: "bg-green-500" },
          { label: "Medium", range: "85 - 95", color: "bg-yellow-400" },
          { label: "High", range: "> 95", color: "bg-red-500" },
        ],
      },
    ],
  };

  const tabs = [
    { id: "overview", label: "Overview", icon: <Eye className="w-4 h-4" /> },
    {
      id: "3d-model",
      label: activeReport === "cardiac" ? "3D Heart Model" : "3D Body Model",
      icon: <Heart className="w-4 h-4" />,
    },
    {
      id: "ct-slices",
      label: "CT Analysis",
      icon: <Activity className="w-4 h-4" />,
    },
    // {
    //   id: "Recommendations",
    //   label: "Recommendations",
    //   icon: <TrendingUp className="w-4 h-4" />,
    // },
  ];
  const cardiovascularReport = [
    {
      biomarker: "Coronary Arteries Calcifications",
      agatstonScore: patient.CACScore,
      Risk: getCardiovascularRiskCategory(Number(patient.CACScore)),
    },
    {
      biomarker: "Abdominal Aortic Calcifications",
      agatstonScore: patient.AACScore,
      Risk: getCardiovascularRiskCategory(Number(patient.AACScore)),
    },
    {
      biomarker: "Thoracic Aortic Calcifications",
      agatstonScore: patient.TACScore,
      Risk: getCardiovascularRiskCategory(Number(patient.TACScore)),
    },
    {
      biomarker: "Aortic Annulus Calcifications",
      agatstonScore: patient.AANCScore,
      Risk: getCardiovascularRiskCategory(Number(patient.AANCScore)),
    },
    {
      biomarker: "Mitral Annulus Calcifications",
      agatstonScore: patient.MACScore,
      Risk: getCardiovascularRiskCategory(Number(patient.MACScore)),
    },
    {
      biomarker: "Aortic Valve Calcifications",
      agatstonScore: patient.AVCScore,
      Risk: getCardiovascularRiskCategory(Number(patient.AVCScore)),
    },
  ];
  const bodyCompositionReport = [
    {
      biomarker: "Liver Attenuation",
      agatstonScore: bodyCompositionData.liverAttenuation,
      Risk: getBodyCompositionArea(
        Number(bodyCompositionData.liverAttenuation)
      ),
      units: "HU",
    },
    {
      biomarker: "L1 Bone Attenuation",
      agatstonScore: bodyCompositionData.boneDensity,
      Risk: getBodyCompositionArea(Number(bodyCompositionData.boneDensity)),
      units: "HU",
    },
    {
      biomarker: "Abdominal Muscle Area",
      agatstonScore: bodyCompositionData.abdominalMuscleArea,
      Risk: getBodyCompositionArea(
        Number(bodyCompositionData.abdominalMuscleArea)
      ),
      units: "cm²",
    },
    {
      biomarker: "Abdominal Muscle Attenuation",
      agatstonScore: bodyCompositionData.abdominalMuscleQuality,
      Risk: getBodyCompositionRiskCategory(
        Number(bodyCompositionData.abdominalMuscleQuality)
      ),
      units: "HU",
    },
    {
      biomarker: "Abdominal Muscle Fat Area",
      agatstonScore: bodyCompositionData.abdominalMuscleFatArea,
      Risk: getBodyCompositionArea(
        Number(bodyCompositionData.abdominalMuscleFatArea)
      ),
      units: "cm²",
    },
    {
      biomarker: "Abdominal Muscle Fat Attenuation",
      agatstonScore: bodyCompositionData.abdominalMuscleFatQuality,
      Risk: getBodyCompositionRiskCategory(
        Number(bodyCompositionData.abdominalMuscleFatQuality)
      ),
      units: "HU",
    },
    {
      biomarker: "Abdominal Subcutaneous Fat Area",
      agatstonScore: bodyCompositionData.abdominalSubcutaneousFatArea,
      Risk: getBodyCompositionArea(
        Number(bodyCompositionData.abdominalSubcutaneousFatArea)
      ),
      units: "cm²",
    },
    {
      biomarker: "Abdominal Subcutaneous Fat Attenuation",
      agatstonScore: bodyCompositionData.abdominalSubcutaneousFatQuality,
      Risk: getBodyCompositionRiskCategory(
        Number(bodyCompositionData.abdominalSubcutaneousFatQuality)
      ),
      units: "HU",
    },
    {
      biomarker: "Abdominal Circumference at L1",
      agatstonScore: bodyCompositionData.abdominalCircumferenceAtL1,
      Risk:
        bodyCompositionData.abdominalCircumferenceAtL1 < 94
          ? "Low"
          : bodyCompositionData.abdominalCircumferenceAtL1 < 110
          ? "Medium"
          : "High",
      units: "cm",
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
                {activeReport === "cardiac"
                  ? "Sample Cardiovascular Report"
                  : "Sample Body Composition Report"}
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
        <div className="flex justify-center my-10">
          <div className="bg-white rounded-lg p-1 flex border border-turquoise flex-1">
            <button
              style={{ width: "100%" }}
              onClick={() => setActiveReport("cardiac")}
              className={`px-6 py-3 rounded-md font-semibold transition-all ${
                activeReport === "cardiac"
                  ? "bg-[#002F6C] text-white shadow-lg"
                  : "text-jacarta hover:bg-white/50"
              }`}
            >
              <Heart className="w-5 h-5 inline mr-2" />
              Cardiovascular Report
            </button>
            <button
              style={{ width: "100%" }}
              onClick={() => setActiveReport("body")}
              className={`px-6 py-3 rounded-md font-semibold transition-all ${
                activeReport === "body"
                  ? "bg-[#002F6C] text-white shadow-lg"
                  : "text-jacarta hover:bg-white/50"
              }`}
            >
              <Activity className="w-5 h-5 inline mr-2" />
              Body Composition Report
            </button>
          </div>
        </div>

        {/* Inner Tabs */}
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
        {/* Inner Tabs Content */}
        <div className="space-y-6">
          {activeTab === "overview" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Agatston Breakdown */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 lg:col-span-2">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {activeReport === "cardiac"
                    ? "Agatston Score Breakdown"
                    : "Body Composition Breakdown"}
                </h3>
                <div className="overflow-x-auto">
                  {activeReport === "cardiac" ? (
                    <>
                      {/* Cardiac table */}
                      <table className="min-w-full">
                        <thead>
                          <tr className="border-t-2 border-gray-300">
                            <th className="py-3 text-bold text-start">
                              Biomarker
                            </th>
                            <th className="py-3 text-bold">Result</th>
                            <th className="py-3 text-bold">Units</th>
                            <th className="py-3 text-bold">Risk</th>
                          </tr>
                        </thead>
                        {cardiovascularReport.map((items) => (
                          <tr className="border-t-2 border-gray-300">
                            <td className="py-3 text-bold">
                              {items.biomarker}
                            </td>
                            <td className="py-3 text-center">
                              {Math.round(Number(items.agatstonScore))}
                            </td>
                            <td className="py-3 text-center">Agatston Score</td>
                            <td className="py-3 text-center">
                              <StatusPill
                                status={items.Risk}
                                type="Risk Category"
                              />
                            </td>
                          </tr>
                        ))}
                        <tr className="border-t-2 border-gray-300">
                          <td className="py-3 text-bold">
                            Cardiothoracic Ratio
                          </td>
                          <td className="py-3 text-center">
                            {patient.cardiothoracicRatio}
                          </td>
                          <td className="py-3 text-center">Ratio</td>
                          <td className="py-3 text-center">
                            <StatusPill
                              status={
                                patient.cardiothoracicRatio < 0.5
                                  ? "Normal"
                                  : patient.cardiothoracicRatio >= 0.5 &&
                                    patient.cardiothoracicRatio < 0.56
                                  ? "Borderline"
                                  : "High"
                              }
                              type="ct_ratio"
                            />
                          </td>
                        </tr>
                      </table>
                    </>
                  ) : (
                    <>
                      {/* Body table */}
                      <table className="min-w-full">
                        <thead>
                          <tr className="border-t-2 border-gray-300">
                            <th className="py-3 text-bold text-start">
                              Metrices
                            </th>
                            <th className="py-3 text-bold">Result</th>
                            <th className="py-3 text-bold">Units</th>
                            <th className="py-3 text-bold">Risk</th>
                          </tr>
                        </thead>
                        {bodyCompositionReport.map((items) => (
                          <tr className="border-t-2 border-gray-300">
                            <td className="py-3 text-bold">
                              {items.biomarker}
                            </td>
                            <td className="py-3 text-center">
                              {Math.round(Number(items.agatstonScore))}
                            </td>
                            <td className="py-3 text-center">{items.units}</td>
                            <td className="py-3 text-center">
                              <StatusPill
                                status={items.Risk}
                                type="Risk Category"
                              />
                            </td>
                          </tr>
                        ))}
                      </table>
                    </>
                  )}
                </div>
              </div>
              {/* Risk Category Reference Ranges */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-0 lg:col-span-2 mb-4">
                <button
                  onClick={() => setOpenReference((v) => !v)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors rounded-t-lg"
                >
                  <h3 className="text-lg font-semibold">
                    Risk Category Reference Ranges
                  </h3>
                  {openReference ? (
                    <ChevronDown className="w-6 h-6 text-gray-400" />
                  ) : (
                    <ChevronUp className="w-6 h-6 text-gray-400" />
                  )}
                </button>
                {openReference && (
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      {referenceRanges[
                        activeReport as keyof typeof referenceRanges
                      ].map((section, index) => (
                        <div key={index}>
                          <h2 className="font-semibold mb-2">
                            {section.title}
                          </h2>
                          <div className="flex flex-col gap-1">
                            {section.ranges.map((range, rangeIndex) => (
                              <div
                                key={rangeIndex}
                                className="flex items-center gap-2"
                              >
                                <span
                                  className={`inline-block w-3 h-3 rounded-full ${range.color}`}
                                ></span>
                                <span>
                                  {range.label}: {range.range}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === "3d-model" && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 ">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  3D Heart Model Viewer
                </h3>
              </div>

              <iframe
                src={
                  activeReport === "cardiac"
                    ? "/3Dheart/case141.html"
                    : "/3Dheart/case005.html"
                }
                scrolling="no"
                style={{
                  height: "500px",
                  width: "100%",
                  borderRadius: "10px",
                  background: "white",
                }}
                className="dark:bg-cloud-burst"
              ></iframe>
                {(() => {
                  // Define legend arrays for each report type
                  const legends = {
                    body: [
                      { color: "purple", label: "Liver" },
                      { color: "green", label: "Spleen" },
                      { color: "cyan", label: "Pancreas" },
                      { color: "yellow", label: "Visceral Fat" },
                      { color: "red", label: "Abdominal Muscle" },
                      { color: "blue", label: "Subcutaneous Fat" },
                    ],
                    cardiac: [
                      { color: "#AC5353", label: "Heart" }, 
                      { color: "#b3d1ff", label: "Pulmonary Artery" }, 
                      { color: "#d1b3ff", label: "Aortic Root" }, 
                      { color: "red", label: "RCA" }, 
                      { color: "#0080ff", label: "LAD" }, 
                      { color: "#00ff00", label: "LCX" }, 
                      { color: "#ffff00", label: "LM" },  
                      { color: "#8000ff", label: "AA" },  
                      { color: "#ff8000", label: "AVC" }, 
                      { color: "#00ffff", label: "MA" },  
                    ],
                  };
                  const currentLegend =
                    activeReport === "body"
                      ? legends.body
                      : legends.cardiac;
                  return (
                    <div className="flex justify-center gap-4 mt-2" >
                      {currentLegend.map((item, idx) => (
                        <div key={idx} className="flex items-center">
                          <span
                            style={{
                              color: item.color,
                              fontSize: "20px",
                              marginRight: "5px",
                            }}
                          >
                            &#9679;
                          </span>
                          <b>{item.label}</b>
                        </div>
                      ))}
                    </div>
                  );
                })()}
            </div>
          )}

          {activeTab === "ct-slices" && (
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  CT Slice Analysis
                </h3>
                <div
                  className={`grid grid-cols-1 ${
                    activeReport === "cardiac"
                      ? "md:grid-cols-2"
                      : "md:grid-cols-3"
                  } gap-6`}
                >
                  {activeReport === "cardiac" ? (
                    <>
                      {[
                        { cardioImg: ctr },
                        { cardioImg: ctr2 },
                        // { cardioImg: ctr3 },
                      ].map((images, index) => (
                        <div key={index} className="text-center">
                          <div
                            className=" rounded-lg mb-3 flex items-center justify-center"
                            style={{ height: "24rem" }}
                          >
                            <img
                              src={images.cardioImg}
                              alt=""
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "contain",
                              }}
                            />
                          </div>
                          <p className="text-sm text-gray-600">
                            {index === 0 && "3D Reconstruction"}
                            {index === 1 && "Key CTR Slice"}
                          </p>
                        </div>
                      ))}
                    </>
                  ) : (
                    <>
                      {[
                        { bodyImg: liver_roi },
                        { bodyImg: elliptical_trabecular_region },
                        { bodyImg: abdominal_region },
                      ].map((images, index) => (
                        <div key={index} className="text-center">
                          <div
                            className=" rounded-lg mb-3 flex items-center justify-center"
                            style={{ height: "24rem" }}
                          >
                            <img
                              src={images.bodyImg}
                              alt=""
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "contain",
                                borderRadius: "10px",
                              }}
                            />
                          </div>
                          <p className="text-sm text-gray-600">
                            {index === 0 &&
                              "Axial slice and the three ROIs (violet circles) selected to calculate the liver attenuation."}
                            {index === 1 &&
                              "Axial slice used to calculate the Bone Attenuation at L1."}
                            {index === 2 &&
                              "Axial slice used to calculate the fat and muscle metrics."}
                          </p>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* {activeTab === "Recommendations" && (
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="prose max-w-none">
                  <h4 className="text-md font-semibold text-gray-900 mb-2">
                    Recommendations
                  </h4>
                  <ul className="text-gray-700 space-y-1">
                    <li>
                      Continue current cardiovascular risk reduction strategies
                    </li>
                    <li>
                      Consider cardiology consultation for comprehensive risk
                      assessment
                    </li>
                    <li>
                      Lifestyle modifications: diet, exercise, smoking cessation
                      if applicable
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
          )} */}
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
