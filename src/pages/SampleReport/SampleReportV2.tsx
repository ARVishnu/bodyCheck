import  { useState } from "react";
import { Link } from "react-router-dom";
import { Download, Heart, Activity, FileText } from "lucide-react";

import { body1, body2, body3, body4, ctr1, ctr2 } from "../../assets/images";
import { GeorgeCardiovascularReport, GeorgeMetabolicReport } from "../../assets";
import { styles } from "./SampleReport.styles";
import {
  cardiovascularRows,
  bodyCompositionRows,
  ctrKeyLegend,
  legendOrder1,
  legendOrder2,
  simpleLegendItems,
} from "./data";
import { mockPatients } from "../../data/mockData";
export function SampleReportV2() {
  const patient = mockPatients[0]; // Use first patient as sample

  const [activeReport, setActiveReport] = useState("cardiac");

  const reportStyles = styles;
  // Reusable cardiovascularRow component with limited div tags
  const TemplateRow = ({ data, key }: { data: any; key: string }) => (
    <div className="flex items-center mb-4 gap-4">
      {/* Title */}
      <div className="flex items-center " style={reportStyles.compositionTitle}>
        <div
          style={{
            backgroundColor: data.indicatorColor,
            height: 12,
            width: 12,
            borderRadius: "50%",
            border: data.indicatorBorder || "none",
            marginRight: 8,
          }}
        />
        <span>{data.title}</span>
      </div>
      {/* Unit */}
      <div style={reportStyles.compositionValue as any}>{data.unit}</div>
      {/* Slider */}
      <div style={reportStyles.sliderTd}>
        <div style={{ position: "relative" }}>
          {/* Slider Handle */}
          <div
            style={{
              ...reportStyles.sliderHandle,
              left: data.handlePosition,
              backgroundColor: data.handleColor,
              color: data.handleTextColor,
            }}
          >
            <div style={{ position: "relative" }}>
              <div
                style={{
                  position: "absolute",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  top: "19px",
                  color: data.handleTextColor,
                }}
              >
                <span
                  style={{
                    color: "black",
                    fontSize: "17px",
                    position: "absolute",
                  }}
                >
                  &#9661;
                </span>
                <span style={{ color: data.handleColor, fontSize: "14px" }}>
                  &#9660;
                </span>
              </div>
            </div>
            {data.value}
          </div>
          {/* Slider Ranges */}
          <div style={{ display: "flex", width: "100%" }}>
            {data.ranges.map((range: any, idx: number) => (
              <div
                key={range.label}
                style={{
                  ...reportStyles.sliderBox,
                  backgroundColor: range.color,
                }}
              >
                <div style={reportStyles.sliderValue as any}>
                  <div className="flex w-full justify-between">
                    <div style={{ width: "33.33%", textAlign: "left" }}>
                      {range.value}
                    </div>
                    <div className=" text-center" style={{ width: "33.33%" }}>
                      {range.label}
                    </div>
                    <div style={{ width: "33.33%", textAlign: "right" }}>
                      {range.right}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
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
              <a
                href={activeReport == 'cardiac' ? GeorgeCardiovascularReport : GeorgeMetabolicReport}
                download={activeReport == 'cardiac' ? "George_Cardiovascular_report.pdf" :"George_Metabolic_report.pdf"}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </a>
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
                  {/* {new Date(patient.examDate).toLocaleDateString()} */}
                  {patient.examDate}
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

        {/* Inner Tabs Content */}
        <div className="space-y-6">
            {activeReport === "cardiac" && (
              <>
                {/* <!-- PDF Template --> */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 lg:col-span-2">
                <div>
                  {/* CTR */}
                  <TemplateRow data={cardiovascularRows.ctr} key="ctr" />
                  {/* Heart Length */}
                  <TemplateRow
                    data={cardiovascularRows.heartLength}
                    key="heartLength"
                  />
                  {/* Inner Chest Length */}
                  <TemplateRow
                    data={cardiovascularRows.innerChestLength}
                    key="innerChestLength"
                  />
                  {/* Structural Report Divider */}
                  <div className="my-4">
                    <div
                      style={{
                        height: 10,
                        backgroundColor: "#ddd",
                      }}
                    ></div>
                  </div>
                  {/* CAC */}
                  <TemplateRow data={cardiovascularRows.cac} key="cac" />
                  {/* TAC */}
                  <TemplateRow data={cardiovascularRows.tac} key="tac" />
                  {/* AAC */}
                  <TemplateRow data={cardiovascularRows.aac} key="aac" />
                  {/* AVC */}
                  <TemplateRow data={cardiovascularRows.avc} key="avc" />
                  {/* AAnC */}
                  <TemplateRow data={cardiovascularRows.aanc} key="aanc" />
                  {/* MAnC */}
                  <TemplateRow data={cardiovascularRows.manc} key="manc" />
                </div>
                {/* Image */}
                <div className="flex justify-center gap-6">
                  <div className="w-1/3">
                    <h3 style={{ margin: "10px 0", textAlign: "center",fontWeight:"bold" }}>
                      CTR Key Image
                    </h3>
                    <div
                      style={{
                        fontSize: "12px",
                        textAlign: "center",
                      }}
                    >
                      <div
                        style={{
                          height: "400px",
                          backgroundColor: "#000",
                        }}
                      >
                        <img
                          src={ctr1}
                          alt="key_ctr_slice_img"
                          style={{
                            maxWidth: "100%",
                            maxHeight: "100%",
                            margin: "auto",
                          }}
                        />
                      </div>

                      {simpleLegendItems.map((item, idx) => (
                        <span key={idx} style={{ marginRight: "10px" }}>
                          <span
                            style={{
                              color: item.color,
                              fontSize: "14px",
                              marginRight: "4px",
                            }}
                          >
                            &#9679;
                          </span>
                          {item.label && <b>{item.label}</b>}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="w-2/3">
                    <h3 style={{ margin: "10px 0", textAlign: "center" ,fontWeight:"bold"}}>
                    Cardiovascular 3D Image
                    </h3>
                    <div
                      style={{
                        fontSize: "12px",
                        textAlign: "center",
                      }}
                    >
                      <div
                        style={{
                          height: "400px",
                          backgroundColor: "#000",
                        }}
                      >
                        <img
                          src={ctr2}
                          alt="three_d_reconstruction_img"
                          style={{
                            maxWidth: "100%",
                            maxHeight: "100%",
                            margin: "auto",
                          }}
                        />
                      </div>
                      {/* Legend */}
                      {(() => {
                        const renderLegendRow = (order: string[]) => (
                          <div>
                            {order.map((label) => {
                              const entry = ctrKeyLegend[label];
                              return (
                                <span
                                  key={label}
                                  style={{ marginRight: "10px" }}
                                >
                                  {entry.isDiv ? (
                                    <div style={entry.customStyle}></div>
                                  ) : (
                                    <span
                                      style={{
                                        color: entry.color,
                                        fontSize: entry.fontSize,
                                        marginRight: "4px",
                                      }}
                                    >
                                      &#9679;
                                    </span>
                                  )}
                                  <b>{label}</b>
                                </span>
                              );
                            })}
                          </div>
                        );

                        return (
                          <>
                            {renderLegendRow(legendOrder1)}
                            {renderLegendRow(legendOrder2)}
                          </>
                        );
                      })()}
                    </div>
                  </div>
                </div>
              </div>
                {/* 3D Model */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 lg:col-span-2">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      3D Heart Model Viewer
                    </h3>
                  </div>

                  <iframe
                    src={"/3Dheart/case141.html"}
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
                    const cardiacLegends = [
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
                    ];
                    return (
                      <div className="flex justify-center gap-4 mt-2">
                        {cardiacLegends.map((item, idx) => (
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
                </div>
              </>
            )}
            {activeReport === "body" && (
              <>
                {/* <!-- PDF Template --> */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 lg:col-span-2">
                <div>
                  {/* Visceral Fat Area */}
                  <TemplateRow
                    data={bodyCompositionRows.visceralFatArea}
                    key="visceralFatArea"
                  />
                  {/* Subcutaneous Fat Area */}
                  <TemplateRow
                    data={bodyCompositionRows.subcutaneousFatArea}
                    key="subcutaneousFatArea"
                  />
                  <TemplateRow
                    data={bodyCompositionRows.visceralSubcutaneousRatio}
                    key="subcutaneousFatArea"
                  />
                  {/* Subcutaneous Fat Density */}
                  <TemplateRow
                    data={bodyCompositionRows.subcutaneousFatDensity}
                    key="subcutaneousFatDensity"
                  />
                  {/* Abdominal Circumference */}
                  <TemplateRow
                    data={bodyCompositionRows.abdominalCircumference}
                    key="abdominalCircumference"
                  />

                  {/* Structural Report Divider */}
                  <div className="my-4">
                    <div
                      style={{
                        height: 10,
                        backgroundColor: "#ddd",
                      }}
                    ></div>
                  </div>

                  {/* Liver Attenuation */}
                  <TemplateRow
                    data={bodyCompositionRows.liverAttenuation}
                    key="liverAttenuation"
                  />
                  {/* Bone Attenuation */}
                  <TemplateRow
                    data={bodyCompositionRows.boneAttenuation}
                    key="boneAttenuation"
                  />
                  {/* Abdominal Muscle Area */}
                  <TemplateRow
                    data={bodyCompositionRows.abdominalMuscleArea}
                    key="abdominalMuscleArea"
                  />
                  {/* Abdominal Muscle Quality */}
                  <TemplateRow
                    data={bodyCompositionRows.abdominalMuscleQuality}
                    key="abdominalMuscleQuality"
                  />
                </div>
                {/* Image */}
                <div>
                  {/* Top */}
                  <div className="flex justify-center" style={{marginBottom:"5px"}}>
                    {/* image 1 */}
                    <div style={{ width: "335px", textAlign: "center" }}>
                      <div
                        style={{
                          fontSize: "10px",
                          lineHeight: "14px",
                          marginBottom: "3px",
                        }}
                      >
                        <div style={{fontSize:"14px"}}>
                          <b>Liver Key Image</b>
                        </div>
                        <span>
                          <b>Series Name:</b> WITHOUT <b>Contrast:</b> No
                        </span>
                      </div>
                      <div
                        style={{
                          height: "264px",
                          width: "264px",
                          margin: "0 auto",
                        }}
                      >
                        <img
                          src={body1}
                          alt="visceralFatArea"
                          style={{ maxWidth: "100%", maxHeight: "100%" }}
                        />
                      </div>
                    </div>
                    {/* image 2 */}
                    <div style={{ width: "335px", textAlign: "center" }}>
                      <div
                        style={{
                          fontSize: "10px",
                          lineHeight: "14px",
                          marginBottom: "3px",
                        }}
                      >
                         <div style={{fontSize:"14px"}}>
                          <b>L1 Vertebra Key Image</b>
                        </div>
                        <span>
                          <b>Series Name:</b> WITHOUT <b>Contrast:</b> No
                        </span>
                      </div>
                      <div
                        style={{
                          height: "264px",
                          width: "264px",
                          margin: "0 auto",
                          backgroundColor: "#000",
                        }}
                      >
                        <img
                          src={body2}
                          alt="visceralFatArea"
                          style={{ maxWidth: "100%", maxHeight: "100%" }}
                        />
                      </div>
                    </div>
                  </div>
                  {/* Bottom */}
                  <div className="flex justify-center">
                    {/* image 3 */}
                    <div style={{ width: "335px", textAlign: "center" }}>
                      <div
                        style={{
                          fontSize: "10px",
                          lineHeight: "14px",
                          marginBottom: "3px",
                        }}
                      >
                         <div style={{fontSize:"14px"}}>
                          <b>L3 Abdominal Key Image</b>
                        </div>
                        <span>
                          <b>Series Name:</b> WITHOUT <b>Contrast:</b> No
                        </span>
                      </div>
                      <div
                        style={{
                          height: "264px",
                          width: "264px",
                          margin: "0 auto",
                        }}
                      >
                        <img
                          src={body3}
                          alt="visceralFatArea"
                          style={{ maxWidth: "100%", maxHeight: "100%" }}
                        />
                      </div>
                      {/* Legend */}
                      {[
                        [
                          { color: "rgb(58, 255, 28)", label: "Circumference" },
                          {
                            color: "rgb(38, 60, 252)",
                            label: "Subcutaneous Fat",
                          },
                        ],
                        [
                          { color: "rgb(255, 28, 28)", label: "Muscle" },
                          { color: "rgb(244, 255, 28)", label: "Visceral Fat" },
                        ],
                      ].map((row, i) => (
                        <div
                          key={i}
                          style={{
                            display: "flex",
                            gap: "12px",
                            fontSize: "12px",
                            justifyContent: "center",
                          }}
                        >
                          {row.map((item) => (
                            <span
                              key={item.label}
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <span
                                style={{
                                  color: item.color,
                                  fontSize: "14px",
                                  marginRight: "4px",
                                }}
                              >
                                &#9679;
                              </span>
                              <b>{item.label}</b>
                            </span>
                          ))}
                        </div>
                      ))}
                    </div>
                    {/* image 4 */}
                    <div style={{ width: "335px", textAlign: "center" }}>
                      <div
                        style={{
                          fontSize: "14px",
                          lineHeight: "14px",
                          marginBottom: "3px",
                          height:"28px"
                        }}
                      >
                        <div style={{paddingTop:"7px"}}>
                          <b>Metabolic 3D Image</b>
                        </div>
                      </div>
                      <div
                        style={{
                          height: "264px",
                          width: "264px",
                          margin: "0 auto",
                          backgroundColor: "#000",
                        }}
                      >
                        <img
                          src={body4}
                          alt="visceralFatArea"
                          style={{ maxWidth: "100%", maxHeight: "100%" }}
                        />
                      </div>
                      {/* Legend */}
                      {[
                        [{ color: "rgb(140, 0, 190)", label: "Liver" }],
                        [
                          { color: "rgb(255, 28, 28)", label: "T12" },
                          { color: "rgb(255, 172, 28)", label: "L1" },
                          { color: "rgb(244, 255, 28)", label: "L2" },
                          { color: "rgb(58, 255, 28)", label: "L3" },
                          { color: "rgb(45, 171, 250)", label: "L4" },
                          { color: "rgb(240, 28, 255)", label: "L5" },
                        ]
                      ].map((row, i) => (
                        <div
                          key={i}
                          style={{
                            display: "flex",
                            gap: "12px",
                            fontSize: "12px",
                            justifyContent: "center",
                          }}
                        >
                          {row.map((item) => (
                            <span
                              key={item.label}
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <span
                                style={{
                                  color: item.color,
                                  fontSize: "14px",
                                  marginRight: "4px",
                                }}
                              >
                                &#9679;
                              </span>
                              <b>{item.label}</b>
                            </span>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                </div>
                {/* 3D Model */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 lg:col-span-2">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      3D Body Model Viewer
                    </h3>
                  </div>
                  <iframe
                    src={"/3Dheart/case005.html"}
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
                    const bodyLegends = [
                      { color: "purple", label: "Liver" },
                      { color: "green", label: "Spleen" },
                      { color: "cyan", label: "Pancreas" },
                      { color: "yellow", label: "Visceral Fat" },
                      { color: "red", label: "Abdominal Muscle" },
                      { color: "blue", label: "Subcutaneous Fat" },
                    ];
                    return (
                      <div className="flex justify-center gap-4 mt-2">
                        {bodyLegends.map((item, idx) => (
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
                </div>
              </>
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
                  {activeReport === "body"
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
