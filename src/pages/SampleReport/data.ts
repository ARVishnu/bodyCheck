import { mockPatients, mokeBodyCompositionData } from "../../data/mockData";

// Utility functions for risk categorization
export function getCardiovascularRiskCategory(
  score: number
): "Low" | "Medium" | "High" {
  if (score < 100) return "Low";
  if (score < 400) return "Medium";
  if (score >= 400) return "High";
  return "High";
}

export function getBodyCompositionRiskCategory(
  score: number
): "Low" | "Medium" | "High" {
  if (score < 50) return "Low";
  if (score < 75) return "Medium";
  if (score >= 75) return "High";
  return "High";
}

export function getBodyCompositionArea(score: number): "Low" | "Medium" | "High" {
  if (score < 100) return "Low";
  if (score < 250) return "Medium";
  if (score >= 250) return "High";
  return "High";
}

// Dictionary of all measurement rows
export const cardiovascularRows = {
  ctr: {
    title: "Cardiothoracic Ratio (CTR)",
    unit: "Ratio",
    value: 0.510,
    handlePosition: "38%",
    handleColor: "#ff8c00",
    handleTextColor: "#fff",
    indicatorColor: "#fff",
    indicatorBorder: "2px solid #000",
    sliderType: "ratio",
    ranges: [
      { color: "#118a0f", label: "Normal", value: "0.300", right: "" },
      { color: "#ff8c00", label: "Borderline", value: "0.500", right: "" },
      { color: "#ff0000", label: "High", value: "0.560", right: "0.800" },
    ],
  },
  heartLength: {
    title: "Heart Length",
    unit: "cm",
    value: 10.6,
    handlePosition: "25%",
    handleColor: "#2E86E7",
    handleTextColor: "#fff",
    indicatorColor: "#ff0000",
    sliderType: "linear",
    ranges: [
      { color: "#2e86e7", label: "", value: "5 cm", right: "" },
      { color: "#2e86e7", label: "", value: "10 cm", right: "" },
      { color: "#2e86e7", label: "", value: "15 cm", right: "" },
      { color: "#2e86e7", label: "", value: "20 cm", right: "" },
      { color: "#2e86e7", label: "", value: "25 cm", right: "30 cm" },
    ],
  },
  innerChestLength: {
    title: "Inner Chest Length",
    unit: "cm",
    value: 20.8,
    handlePosition: "26%",
    handleColor: "#2E86E7",
    handleTextColor: "#fff",
    indicatorColor: "#00d0ff",
    sliderType: "linear",
    ranges: [
      { color: "#2e86e7", label: "", value: "15 cm", right: "" },
      { color: "#2e86e7", label: "", value: "20 cm", right: "" },
      { color: "#2e86e7", label: "", value: "25 cm", right: "" },
      { color: "#2e86e7", label: "", value: "30 cm", right: "" },
      { color: "#2e86e7", label: "", value: "35 cm", right: "40 cm" },
    ],
  },
  cac: {
    title: "Coronary Artery Calcifications (CAC)",
    unit: "Agatston score",
    value: 553,
    handlePosition: "80%",
    handleColor: "#ff0000",
    handleTextColor: "#fff",
    indicatorColor: "rgb(255, 252, 102)",
    sliderType: "agatston",
    ranges: [
      { color: "#118a0f", label: "None", value: "0", right: "" },
      { color: "#f9db24", label: "Low", value: "1", right: "" },
      { color: "#ff8c00", label: "Intermediate", value: "100", right: "" },
      { color: "#ff0000", label: "High", value: "400", right: "1000" },
    ],
  },
  tac: {
    title: "Thoracic Aortic Calcifications (TAC)",
    unit: "Agatston score",
    value: 532,
    handlePosition: "62%",
    handleColor: "#ff8c00",
    handleTextColor: "#fff",
    indicatorColor: "rgb(113, 252, 71)",
    sliderType: "agatston",
    ranges: [
      { color: "#118a0f", label: "None", value: "0", right: "" },
      { color: "#f9db24", label: "Low", value: "1", right: "" },
      { color: "#ff8c00", label: "Intermediate", value: "100", right: "" },
      { color: "#ff0000", label: "High", value: "1000", right: "10000" },
    ],
  },
  aac: {
    title: "Abdominal Aortic Calcifications (AAC)",
    unit: "Agatston score",
    value: 7170,
    handlePosition: "92%",
    handleColor: "#ff0000",
    handleTextColor: "#fff",
    indicatorColor: "rgb(71, 252, 119)",
    sliderType: "agatston",
    ranges: [
      { color: "#118a0f", label: "None", value: "0", right: "" },
      { color: "#f9db24", label: "Low", value: "1", right: "" },
      { color: "#ff8c00", label: "Intermediate", value: "100", right: "" },
      { color: "#ff0000", label: "High", value: "1000", right: "10000" },
    ],
  },
  avc: {
    title: "Aortic Valve Calcifications (AVC)",
    unit: "Agatston score",
    value: 0,
    handlePosition: "0%",
    handleColor: "#118a0f",
    handleTextColor: "#fff",
    indicatorColor: "rgb(255, 255, 255)",
    indicatorBorder: "2px solid #000",
    sliderType: "agatston",
    ranges: [
      { color: "#118a0f", label: "None", value: "0", right: "" },
      { color: "#f9db24", label: "Low", value: "1", right: "" },
      { color: "#ff8c00", label: "Intermediate", value: "100", right: "" },
      { color: "#ff0000", label: "High", value: "1000", right: "10000" },
    ],
  },
  aanc: {
    title: "Aortic Annulus Calcifications (AAnC)",
    unit: "Agatston score",
    value: 46,
    handlePosition: "36.5%",
    handleColor: "#f9db24",
    handleTextColor: "#000",
    indicatorColor: "rgb(0, 191, 255)",
    sliderType: "agatston",
    ranges: [
      { color: "#118a0f", label: "None", value: "0", right: "" },
      { color: "#f9db24", label: "Low", value: "1", right: "" },
      { color: "#ff8c00", label: "Intermediate", value: "100", right: "" },
      { color: "#ff0000", label: "High", value: "1000", right: "10000" },
    ],
  },
  manc: {
    title: "Mitral Annulus Calcifications (MAnC)",
    unit: "Agatston score",
    value: 0,
    handlePosition: "0%",
    handleColor: "#118a0f",
    handleTextColor: "#fff",
    indicatorColor: "rgb(255, 0, 191)",
    sliderType: "agatston",
    ranges: [
      { color: "#118a0f", label: "None", value: "0", right: "" },
      { color: "#f9db24", label: "Low", value: "1", right: "" },
      { color: "#ff8c00", label: "Intermediate", value: "100", right: "" },
      { color: "#ff0000", label: "High", value: "1000", right: "10000" },
    ],
  },
};

// Body Composition Rows based on the image
export const bodyCompositionRows = {
  visceralFatArea: {
    title: "Visceral Fat Area at L3",
    unit: "cm²",
    value: 186.3,
    handlePosition: "70%",
    handleColor: "#ff0000",
    handleTextColor: "#fff",
    indicatorColor: "rgb(244, 255, 28)",
    sliderType: "linear",
    ranges: [
      { color: "#118a0f", label: "", value: "0", right: "" },
      { color: "#ffd700", label: "", value: "100", right: "" },
      { color: "#ff0000", label: "", value: "160", right: "400" },
    ],
  },
  subcutaneousFatArea: {
    title: "Abdominal Subcutaneous Fat Area at L3",
    unit: "cm²",
    value: 290.0,
    handlePosition: "68%",
    handleColor: "#ff0000",
    handleTextColor: "#fff",
    indicatorColor: "rgb(38, 60, 252)",
    sliderType: "linear",
    ranges: [
      { color: "#118a0f", label: "", value: "0", right: "" },
      { color: "#ffd700", label: "", value: "100", right: "" },
      { color: "#ff0000", label: "", value: "250", right: "800" },
    ],
  },
  subcutaneousFatDensity: {
    title: "Abdominal Subcutaneous Fat Density at L3",
    unit: "HU",
    value: -99.3,
    handlePosition: "56%",
    handleColor: "#ffd700",
    handleTextColor: "#000",
    indicatorColor: "rgb(38, 60, 252)",
    sliderType: "linear",
    ranges: [
      { color: "#118a0f", label: "", value: "-190", right: "" },
      { color: "#ffd700", label: "", value: "-115", right: "" },
      { color: "#ff0000", label: "", value: "-90", right: "0" },
    ],
  },
  abdominalCircumference: {
    title: "Abdominal Circumference at L3",
    unit: "cm",
    value: 114.9,
    handlePosition: "73%",
    handleColor: "#ff0000",
    handleTextColor: "#fff",
    indicatorColor: "rgb(58, 255, 28)",
    sliderType: "linear",
    ranges: [
      { color: "#118a0f", label: "", value: "50", right: "" },
      { color: "#ffd700", label: "", value: "80", right: "" },
      { color: "#ff0000", label: "", value: "100", right: "160" },
    ],
  },
  liverAttenuation: {
    title: "Liver Attenuation",
    unit: "HU",
    value: 70.8,
    handlePosition: "63.5%",
    handleColor: "#118a0f",
    handleTextColor: "#fff",
    indicatorColor: "rgb(140, 0, 190)",
    sliderType: "linear",
    ranges: [
      { color: "#ff0000", label: "", value: "-30", right: "" },
      { color: "#118a0f", label: "", value: "40", right: "" },
      { color: "#ff0000", label: "", value: "75", right: "110" },
    ],
  },
  boneAttenuation: {
    title: "Bone Attenuation at L1",
    unit: "HU",
    value: 109.1,
    handlePosition: "33%",
    handleColor: "#ff0000",
    handleTextColor: "#fff",
    indicatorColor: "rgb(255, 172, 28)",
    sliderType: "linear",
    ranges: [
      { color: "#ff0000", label: "", value: "0", right: "" },
      { color: "#ffd700", label: "", value: "110", right: "" },
      { color: "#118a0f", label: "", value: "135", right: "300" },
    ],
  },
  abdominalMuscleArea: {
    title: "Abdominal Muscle Area at L3",
    unit: "cm²",
    value: 143.8,
    handlePosition: "63.5%",
    handleColor: "#ffd700",
    handleTextColor: "#000",
    indicatorColor: "#ff0000",
    sliderType: "linear",
    ranges: [
      { color: "#ff0000", label: "", value: "25", right: "" },
      { color: "#ffd700", label: "", value: "100", right: "" },
      { color: "#118a0f", label: "", value: "150", right: "300" },
    ],
  },
  abdominalMuscleQuality: {
    title: "Abdominal Muscle Quality at L3",
    unit: "HU",
    value: 23.9,
    handlePosition: "27%",
    handleColor: "#ff0000",
    handleTextColor: "#fff",
    indicatorColor: "#ff0000",
    sliderType: "linear",
    ranges: [
      { color: "#ff0000", label: "", value: "0", right: "" },
      { color: "#ffd700", label: "", value: "30", right: "" },
      { color: "#118a0f", label: "", value: "35", right: "60" },
    ],
  },
};

// Reference ranges array structure
export const referenceRanges = {
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

// CTR Key Legend dictionary
export const ctrKeyLegend: {
  [label: string]: {
    color?: string;
    fontSize?: string;
    customStyle?: React.CSSProperties;
    isDiv?: boolean;
  };
} = {
  Heart: { color: "rgb(255, 0, 0)", fontSize: "14px" },
  Aorta: { color: "rgb(255, 128, 0)", fontSize: "14px" },
  CAC: { color: "rgb(255, 252, 102)", fontSize: "14px" },
  TAC: { color: "rgb(113, 252, 71)", fontSize: "14px" },
  AAC: { color: "rgb(71, 252, 119)", fontSize: "14px" },
  AVC: {
    isDiv: true,
    customStyle: {
      backgroundColor: "rgb(255, 255, 255)",
      height: "12px",
      width: "12px",
      borderRadius: "50%",
      display: "inline-block",
      border: "2px solid #000",
      marginRight: "2px",
    },
  },
  AAnC: { color: "rgb(0, 191, 255)", fontSize: "14px" },
  MAnC: { color: "rgb(255, 0, 191)", fontSize: "14px" },
};

// Legend order arrays
export const legendOrder1 = ["Heart", "Aorta"];
export const legendOrder2 = ["CAC","TAC", "AAC", "AVC", "AAnC", "MAnC"];

// Simple legend items for CTR Key Image
export const simpleLegendItems = [
  {
    label: "Heart",
    color: "#ff0000",
  },
  {
    label: "Inner Chest",
    color: "#00d0ff",
  },
  {
    label: "",
    color: "#fff",
  },
];
const patient = mockPatients[0]; // Use first patient as sample
const bodyCompositionData = mokeBodyCompositionData[0];
export const cardiovascularReport = [
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
export const bodyCompositionReport = [
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