import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Filter,
  Eye,
  Users,
  AlertTriangle,
  TrendingUp,
  CheckCircle,
  Heart,
  Activity,
} from "lucide-react";
import { mockPatients, mokeBodyCompositionData } from "../data/mockData";
import { StatusPill } from "../components/StatusPill";
import { Patient } from "../types";

// Utility function for calcification risk category
function getCalcificationRiskCategory(
  score: number
): "Low" | "Medium" | "High" {
  if (score <= 100) return "Low";
  if (score <= 200) return "Medium";
  if (score <= 300) return "High";
  return "High";
}

export function DemoDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortColumn, setSortColumn] = useState<keyof Patient>("examDate");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [activeReport, setActiveReport] = useState<"cardiac" | "body">(
    "cardiac"
  );

  // Filter and sort for mockPatients (cardiac/calcification)
  const filteredAndSortedPatients = useMemo(() => {
    let filtered = mockPatients.filter((patient) => {
      const matchesSearch =
        patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.id.includes(searchTerm);
      // Fix: Match categoryFilter to risk level, not exact CACScore number
      const matchesCategory =
        categoryFilter === "all" ||
        patient.highRiskLevel === categoryFilter;
      const matchesStatus =
        statusFilter === "all" || patient.careStatus === statusFilter;

      return matchesSearch && matchesCategory && matchesStatus;
    });

    return filtered.sort((a, b) => {
      let aValue = a[sortColumn];
      let bValue = b[sortColumn];

      if (typeof aValue === "string") aValue = aValue.toLowerCase();
      if (typeof bValue === "string") bValue = bValue.toLowerCase();

      if (sortDirection === "asc") {
        return aValue && bValue && aValue < bValue
          ? -1
          : aValue && bValue && aValue > bValue
          ? 1
          : 0;
      } else {
        return aValue && bValue && aValue > bValue
          ? -1
          : aValue && bValue && aValue < bValue
          ? 1
          : 0;
      }
    });
  }, [searchTerm, categoryFilter, statusFilter, sortColumn, sortDirection]);

  // Filter and sort for bodyCompositionData (body composition)
  const filteredAndSortedBodyComposition = useMemo(() => {
    let filtered = mokeBodyCompositionData.filter((patient) => {
      const matchesSearch =
        patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.id.includes(searchTerm);
      // For body composition, categoryFilter could be used for a risk band if available, or just "all"
      // If you want to filter by a specific field, adjust here. For now, just support "all"
      const matchesCategory = categoryFilter === "all";
      const matchesStatus =
        statusFilter === "all" || patient.careStatus === statusFilter;

      return matchesSearch && matchesCategory && matchesStatus;
    });

    return filtered.sort((a, b) => {
      let aValue = a[sortColumn as keyof typeof a];
      let bValue = b[sortColumn as keyof typeof b];

      if (typeof aValue === "string") aValue = aValue.toLowerCase();
      if (typeof bValue === "string") bValue = bValue.toLowerCase();

      if (sortDirection === "asc") {
        return aValue && bValue && aValue < bValue
          ? -1
          : aValue && bValue && aValue > bValue
          ? 1
          : 0;
      } else {
        return aValue && bValue && aValue > bValue
          ? -1
          : aValue && bValue && aValue < bValue
          ? 1
          : 0;
      }
    });
  }, [mokeBodyCompositionData, searchTerm, categoryFilter, statusFilter, sortColumn, sortDirection]);

  const handleSort = (column: keyof Patient) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const stats = {
    total: mockPatients.length,
    pending: mockPatients.filter((p) => p.careStatus === "Needs Review").length,
    highRisk: mockPatients.filter(
      (p) => p.highRiskLevel === "High" || p.highRiskLevel === "Very High"
    ).length,
    completed: mockPatients.filter(
      (p) =>
        p.careStatus === "No Review Needed" ||
        p.careStatus === "Appointment Scheduled"
    ).length,
  };

  // const bodyCompositionData = mokeBodyCompositionData;
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Demo Care Coordination Dashboard
              </h1>
              <p className="text-gray-600 mt-1">
                Example cardiovascular opportunistic screening secondary review
                and care coordination dashboard.
              </p>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="text-sm text-blue-800 font-medium">
                🔓 Demo Mode - Read Only
              </p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">
                  Total Patients
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.total}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <AlertTriangle className="h-8 w-8 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">
                  Pending Review
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.pending}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <TrendingUp className="h-8 w-8 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">
                  High-Risk Patients
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.highRisk}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">
                  Cases Reviewed
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.completed}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Report Type Toggle */}
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
        {activeReport === "cardiac" ? (
          <>
            {/* Cardiac Report */}
            {/* Filters */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
              <div className="flex flex-col md:flex-row gap-4">
                {/* Search */}
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search patients by name or ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Category Filter */}
                {/* <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Categories</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select> */}

                {/* Status Filter */}
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Statuses</option>
                  <option value="Needs Review">Needs Review</option>
                  <option value="No Review Needed">No Review Needed</option>
                  <option value="PCP and Patient Notified">
                    PCP and Patient Notified
                  </option>
                  <option value="Appointment Scheduled">
                    Appointment Scheduled
                  </option>
                </select>

                <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200 transition-colors flex items-center">
                  <Filter className="w-4 h-4 mr-2" />
                  Export
                </button>
              </div>
            </div>

            {/* Patient Table */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      {[
                        { key: "id", label: "Patient ID" },
                        { key: "name", label: "Name" },
                        { key: "examDate", label: "Exam Date" },
                        // Remove Agatston Score column, keep new columns
                        {
                          key: "coronary",
                          label: "Coronary Artery Calcification",
                        },
                        { key: "abdominal", label: "Abdominal Aortic Calcifications" },
                        { key: "thoracic", label: "Thoracic Aortic Calcifications" },
                        {
                          key: "aorticAnnulus",
                          label: "Aortic Annulus Calcifications",
                        },
                        {
                          key: "mitralAnnulus",
                          label: "Mitral Annulus Calcifications",
                        },
                        {
                          key: "aorticValveLeaflets",
                          label: "Aortic Valve Calcifications",
                        },
                        {
                          key: "Cardiothoracic Ratio",
                          label: "Cardiothoracic Ratio (LINEAR)",
                        },
                        { key: "highRiskLevel", label: "High Risk" },
                        { key: "Known CVD", label: "Known CVD" },
                        { key: "careStatus", label: "Care Status" },
                      ].map((column) => (
                        <th
                          key={column.key}
                          onClick={() =>
                            handleSort(column.key as keyof Patient)
                          }
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                        >
                          <div className="flex items-center space-x-1">
                            <span>{column.label}</span>
                            {sortColumn === column.key && (
                              <span className="text-blue-600">
                                {sortDirection === "asc" ? "↑" : "↓"}
                              </span>
                            )}
                          </div>
                        </th>
                      ))}
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredAndSortedPatients.map((patient) => (
                      <tr key={patient.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {patient.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {patient.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {new Date(patient.examDate).toLocaleDateString()}
                        </td>
                        {/* For each new column, show labeled Agatston Score and Band */}
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-mono">
                          <span className="block text-xs text-gray-500">
                            Score:{" "}
                            <b className="text-black">
                              {Math.round(Number(patient.CACScore))}
                            </b>
                          </span>
                          <span className="block text-xs text-gray-500 mt-1">
                            Risk Category:{" "}
                            <StatusPill
                              status={getCalcificationRiskCategory(
                                Number(patient.CACScore)
                              )}
                              type="Risk Category"
                            />
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-mono">
                          <span className="block text-xs text-gray-500">
                            Score:{" "}
                            <b className="text-black">
                              {Math.round(Number(patient.AACScore))}
                            </b>
                          </span>
                          <span className="block text-xs text-gray-500 mt-1">
                            Risk Category:{" "}
                            <StatusPill
                              status={getCalcificationRiskCategory(
                                Number(patient.AACScore)
                              )}
                              type="Risk Category"
                            />
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-mono">
                          <span className="block text-xs text-gray-500">
                            Score:{" "}
                            <b className="text-black">
                              {Math.round(Number(patient.TACScore))}
                            </b>
                          </span>
                          <span className="block text-xs text-gray-500 mt-1">
                            Risk Category:{" "}
                            <StatusPill
                              status={getCalcificationRiskCategory(
                                Number(patient.TACScore)
                              )}
                              type="Risk Category"
                            />
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-mono">
                          <span className="block text-xs text-gray-500">
                            Score:{" "}
                            <b className="text-black">
                              {Math.round(Number(patient.AANCScore))}
                            </b>
                          </span>
                          <span className="block text-xs text-gray-500 mt-1">
                            Risk Category:{" "}
                            <StatusPill
                              status={getCalcificationRiskCategory(
                                Number(patient.AANCScore)
                              )}
                              type="Risk Category"
                            />
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-mono">
                          <span className="block text-xs text-gray-500">
                            Score:{" "}
                            <b className="text-black">
                              {Math.round(Number(patient.MACScore))}
                            </b>
                          </span>
                          <span className="block text-xs text-gray-500 mt-1">
                            Risk Category:{" "}
                            <StatusPill
                              status={getCalcificationRiskCategory(
                                Number(patient.MACScore)
                              )}
                              type="Risk Category"
                            />
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-mono">
                          <span className="block text-xs text-gray-500">
                            Score:{" "}
                            <b className="text-black">
                              {Math.round(Number(patient.AVCScore))}
                            </b>
                          </span>
                          <span className="block text-xs text-gray-500 mt-1">
                            Risk Category:{" "}
                            <StatusPill
                              status={getCalcificationRiskCategory(
                                Number(patient.AVCScore)
                              )}
                              type="Risk Category"
                            />
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-mono">
                          <span className="block text-xs text-gray-500">
                            Score:{" "}
                            <b className="text-black">
                              {patient.cardiothoracicRatio}
                            </b>
                          </span>
                          <span className="block text-xs text-gray-500 mt-1">
                            Risk Category:{" "}
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
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {/* <StatusPill status={patient.highRiskLevel} type="risk" /> */}
                          <span className="text-sm font-medium">
                            {(() => {
                              const highRiskAbbrs = [
                                getCalcificationRiskCategory(
                                  Number(patient.CACScore)
                                ) === "High" && "CAC",
                                getCalcificationRiskCategory(
                                  Number(patient.AACScore)
                                ) === "High" && "AAC",
                                getCalcificationRiskCategory(
                                  Number(patient.TACScore)
                                ) === "High" && "TAC",
                                getCalcificationRiskCategory(
                                  Number(patient.AANCScore)
                                ) === "High" && "AAnC",
                                getCalcificationRiskCategory(
                                  Number(patient.MACScore)
                                ) === "High" && "MAnC",
                                getCalcificationRiskCategory(
                                  Number(patient.AVCScore)
                                ) === "High" && "AVC",
                              ].filter(Boolean);

                              const abbrToFull = {
                                CAC: "Coronary Arteries Calcification",
                                AAC: "Abdominal Aorta Calcification",
                                TAC: "Thoracic Aorta Calcification",
                                AANC: "Aortic Annulus Calcification",
                                MAC: "Mitral Annulus Calcification",
                                AVC: "Aortic Valve Calcification",
                              };

                              if (highRiskAbbrs.length === 0) return "-";

                              return highRiskAbbrs.map((abbr, idx) => (
                                <span
                                  key={String(abbr)}
                                  className="relative group"
                                >
                                  <span className="underline decoration-dotted cursor-pointer">
                                    {abbr}
                                  </span>
                                  <span
                                    className="ml-1 text-gray-400 cursor-pointer align-super text-xs group-hover:visible group-focus:visible group-active:visible"
                                    tabIndex={0}
                                  >
                                    <span className="invisible group-hover:visible group-focus:visible group-active:visible absolute z-10 left-1/2 -translate-x-1/2 bottom-4 mt-2 w-max max-w-xs bg-gray-900 text-white text-xs rounded px-2 py-1 shadow-lg whitespace-pre-line">
                                      {abbrToFull[
                                        String(abbr) as keyof typeof abbrToFull
                                      ] || String(abbr)}
                                    </span>
                                  </span>
                                  {idx < highRiskAbbrs.length - 1 ? ", " : ""}
                                </span>
                              ));
                            })()}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span>{patient.knownCVD}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <StatusPill
                            status={patient.careStatus}
                            type="careStatus"
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-center justify-end space-x-2">
                            <Link
                              to="/sample-report"
                              className="text-blue-600 hover:text-blue-900 flex items-center"
                            >
                              <Eye className="w-4 h-4 mr-1" />
                              View Report
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Body Composition Report */}
            {/* Filters */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
              <div className="flex flex-col md:flex-row gap-4">
                {/* Search */}
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search patients by name or ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Category Filter */}
                {/* <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Categories</option>
                  <option value="Minimal">Minimal</option>
                  <option value="Mild">Mild</option>
                  <option value="Moderate">Moderate</option>
                  <option value="Severe">Severe</option>
                </select> */}

                {/* Status Filter */}
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Statuses</option>
                  <option value="Needs Review">Needs Review</option>
                  <option value="No Review Needed">No Review Needed</option>
                  <option value="PCP and Patient Notified">
                    PCP and Patient Notified
                  </option>
                  <option value="Appointment Scheduled">
                    Appointment Scheduled
                  </option>
                </select>

                <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200 transition-colors flex items-center">
                  <Filter className="w-4 h-4 mr-2" />
                  Export
                </button>
              </div>
            </div>

            {/* Patient Table */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      {[
                        { key: "id", label: "Patient ID" },
                        { key: "name", label: "Name" },
                        { key: "examDate", label: "Exam Date" },
                        // Remove Agatston Score column, keep new columns
                        {
                          key: "coronary",
                          label: "Liver Attenuation",
                        },
                        { key: "abdominal", label: "L1 Bone Attenuation" },
                        { key: "thoracic", label: "Abdominal Muscle" },
                        {
                          key: "aorticAnnulus",
                          label: "Abdominal Muscle Fat",
                        },
                        {
                          key: "mitralAnnulus",
                          label: "Abdominal Subcutaneous Fat",
                        },
                        {
                          key: "aorticValveLeaflets",
                          label: "Abdominal Circumference at L1",
                        },
                        { key: "careStatus", label: "Care Status" },
                      ].map((column) => (
                        <th
                          key={column.key}
                          onClick={() =>
                            handleSort(column.key as keyof Patient)
                          }
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                        >
                          <div className="flex items-center space-x-1">
                            <span>{column.label}</span>
                            {sortColumn === column.key && (
                              <span className="text-blue-600">
                                {sortDirection === "asc" ? "↑" : "↓"}
                              </span>
                            )}
                          </div>
                        </th>
                      ))}
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredAndSortedBodyComposition.map((patient) => (
                      <tr key={patient.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {patient.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {patient.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {new Date(patient.examDate).toLocaleDateString()}
                        </td>
                        {/* For each new column, show labeled Agatston Score and Band */}
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-mono">
                          <span className="block text-xs text-gray-500 mt-1">
                            HU:
                            <span className="inline-block text-xs font-semibold bg-blue-100 text-blue-700 rounded-full px-2 py-0.5 align-middle">
                              {patient.liverAttenuation}
                            </span>
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-mono">
                          <span className="block text-xs text-gray-500 mt-1">
                            HU:
                            <span className="inline-block text-xs font-semibold bg-blue-100 text-blue-700 rounded-full px-2 py-0.5 align-middle">
                              {patient.boneDensity}
                            </span>
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-mono">
                          <span className="block text-xs text-gray-500">
                            Area(cm²): <b className="text-black">{patient.abdominalMuscleArea}</b>
                          </span>
                          <span className="block text-xs text-gray-500 mt-1">
                            Attenuation(HU):
                            <span className="inline-block text-xs font-semibold bg-blue-100 text-blue-700 rounded-full px-2 py-0.5 align-middle">
                              {patient.abdominalMuscleQuality}
                            </span>
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-mono">
                          <span className="block text-xs text-gray-500">
                            Area(cm²): <b className="text-black">{patient.abdominalMuscleFatArea}</b>
                          </span>
                          <span className="block text-xs text-gray-500 mt-1">
                            Attenuation(HU): <span className="inline-block text-xs font-semibold bg-blue-100 text-blue-700 rounded-full px-2 py-0.5 align-middle">
                            {patient.abdominalMuscleFatQuality}
                          </span>
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-mono">
                          <span className="block text-xs text-gray-500">
                            Area(cm²): <b className="text-black">{patient.abdominalSubcutaneousFatArea}</b>
                          </span>
                          <span className="block text-xs text-gray-500 mt-1">
                            Attenuation(HU): <span className="inline-block text-xs font-semibold bg-blue-100 text-blue-700 rounded-full px-2 py-0.5 align-middle">
                            {patient.abdominalSubcutaneousFatQuality}
                          </span>
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-mono">
                          <span className="block text-xs text-gray-500">
                              Length(cm): <span className="inline-block text-xs font-semibold bg-blue-100 text-blue-700 rounded-full px-2 py-0.5 align-middle">
                            {patient.abdominalCircumferenceAtL1}
                          </span>
                          </span>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                          <StatusPill
                            status={patient.careStatus}
                            type="careStatus"
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-center justify-end space-x-2">
                            <Link
                              to="/sample-report"
                              className="text-blue-600 hover:text-blue-900 flex items-center"
                            >
                              <Eye className="w-4 h-4 mr-1" />
                              View Report
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* Demo Notice */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <Eye className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">
                Demo Environment
              </h3>
              <div className="mt-2 text-sm text-blue-700">
                <p>
                  This is a demonstration version with example data. Thresholds
                  for risk categories are configurable and established by the
                  individual practice.
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
