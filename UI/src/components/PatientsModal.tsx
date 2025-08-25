import React from "react";
import { Patient } from "../types";

export type PatientsModalProps = {
  open: boolean;
  onClose: () => void;
  patients: Patient[];
  riskCategory: "Low" | "Medium" | "High" | null;
};

// Utility function for calcification risk category
function getCalcificationRiskCategory(score: number): "Low" | "Medium" | "High" {
  if (score <= 100) return "Low";
  if (score <= 400) return "Medium";
  return "High";
}


const SCORE_FIELDS = [
  { key: "CACScore", label: "CAC", type: "calc" },
  { key: "AACScore", label: "AAC", type: "calc" },
  { key: "TACScore", label: "TAC", type: "calc" },
  { key: "AANCScore", label: "AAnC", type: "calc" },
  { key: "MACScore", label: "MAC", type: "calc" },
  { key: "AVCScore", label: "AVC", type: "calc" },
  { key: "cardiothoracicRatio", label: "Cardiothoracic Ratio", type: "ctr" },
];

function getCtRatioCategory(ratio: number): "Low" | "Medium" | "High" {
  if (ratio < 0.5) return "Low";
  if (ratio >= 0.5 && ratio < 0.56) return "Medium";
  return "High";
}

export function PatientsModal({ open, onClose, patients, riskCategory }: PatientsModalProps) {
  if (!open) return null;

  // Filter out patients who have no value in the selected risk category
  const filteredPatients = patients.filter((p: Patient) =>
    SCORE_FIELDS.some((field) => {
      const value = (p as any)[field.key];
      if (value == null || value === "" || isNaN(Number(value))) return false;
      if (field.type === "ctr") {
        return getCtRatioCategory(Number(value)) === riskCategory;
      } else {
        return getCalcificationRiskCategory(Number(value)) === riskCategory;
      }
    })
  );

  // Always show all columns, but only show value if it matches the selected risk category, otherwise '-'
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl  relative sm:max-w-xl md:max-w-2xl lg:max-w-3xl overflow-y-auto" style={{maxHeight: '80vh'}}>
        <div className="p-4 border-b border-gray-200">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-xl font-bold  sm:text-lg md:text-xl lg:text-2xl">
          Patients with {riskCategory} Value(s)
        </h2>
        </div>
        
        <div className="overflow-x-auto " style={{maxHeight: '60vh',overflowY: 'auto'}}>
          <table className="min-w-full divide-y divide-gray-200" >
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Patient ID</th>
                {SCORE_FIELDS.map((field) => (
                  <th
                    key={field.key}
                    className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase"
                  >
                    {field.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPatients.length === 0 ? (
                <tr>
                  <td colSpan={1 + SCORE_FIELDS.length} className="text-center py-6 text-gray-500">No patients found.</td>
                </tr>
              ) : (
                filteredPatients.map((p: Patient) => (
                  <tr key={p.id}>
                    <td className="px-4 py-2 font-semibold text-sm sm:text-xs md:text-sm lg:text-base">{p.id}</td>
                    {SCORE_FIELDS.map((field) => {
                      const value = Number((p as any)[field.key]);
                      if (field.type === "ctr") {
                        // Cardiothoracic Ratio banding
                        return getCtRatioCategory(value) === riskCategory ? (
                          <td key={field.key} className="px-4 py-2 font-bold text-blue-900 text-sm sm:text-xs md:text-sm lg:text-base">
                            {value}
                          </td>
                        ) : (
                          <td key={field.key} className="px-4 py-2 text-gray-300 text-sm sm:text-xs md:text-sm lg:text-base">-</td>
                        );
                      } else {
                        return getCalcificationRiskCategory(value) === riskCategory ? (
                          <td key={field.key} className="px-4 py-2 font-bold text-blue-900 text-sm sm:text-xs md:text-sm lg:text-base">
                            {Math.round(value)}
                          </td>
                        ) : (
                          <td key={field.key} className="px-4 py-2 text-gray-300 text-sm sm:text-xs md:text-sm lg:text-base">-</td>
                        );
                      }
                    })}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
