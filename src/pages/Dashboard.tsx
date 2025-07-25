import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Search, Filter, Eye, Download, Users, AlertTriangle, TrendingUp, CheckCircle, Edit2, Save, X } from 'lucide-react';
import { mockPatients } from '../data/mockData';
import { StatusPill } from '../components/StatusPill';
import { Patient } from '../types';

export function Dashboard() {
  const { user } = useAuth();
  const [patients, setPatients] = useState(mockPatients);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortColumn, setSortColumn] = useState<keyof Patient>('examDate');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [editingNotes, setEditingNotes] = useState<string | null>(null);
  const [tempNotes, setTempNotes] = useState('');

  const filteredAndSortedPatients = useMemo(() => {
    let filtered = patients.filter(patient => {
      const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          patient.id.includes(searchTerm);
      const matchesCategory = categoryFilter === 'all' || patient.cardiothoracicRatio === categoryFilter;
      const matchesStatus = statusFilter === 'all' || patient.crmStatus === statusFilter;
      
      return matchesSearch && matchesCategory && matchesStatus;
    });

    return filtered.sort((a, b) => {
      let aValue = a[sortColumn];
      let bValue = b[sortColumn];
      
      if (typeof aValue === 'string') aValue = aValue.toLowerCase();
      if (typeof bValue === 'string') bValue = bValue.toLowerCase();
      
      if (sortDirection === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });
  }, [patients, searchTerm, categoryFilter, statusFilter, sortColumn, sortDirection]);

  const handleSort = (column: keyof Patient) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const handleStatusChange = (patientId: string, newStatus: Patient['crmStatus']) => {
    setPatients(prev => prev.map(patient => 
      patient.id === patientId ? { ...patient, crmStatus: newStatus } : patient
    ));
  };

  const handleNotesEdit = (patientId: string, currentNotes: string = '') => {
    setEditingNotes(patientId);
    setTempNotes(currentNotes);
  };

  const handleNotesSave = (patientId: string) => {
    setPatients(prev => prev.map(patient => 
      patient.id === patientId ? { ...patient, notes: tempNotes } : patient
    ));
    setEditingNotes(null);
    setTempNotes('');
  };

  const handleNotesCancel = () => {
    setEditingNotes(null);
    setTempNotes('');
  };

  const stats = {
    total: patients.length,
    pending: patients.filter(p => p.crmStatus === 'Needs Review').length,
    highRisk: patients.filter(p => p.highRiskLevel === 'High' || p.highRiskLevel === 'Very High').length,
    completed: patients.filter(p => p.crmStatus === 'Positive' || p.crmStatus === 'Appointment Scheduled').length
  };

  const canEdit = user?.role === 'admin' || user?.role === 'physician';

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Patient Dashboard</h1>
              <p className="text-gray-600 mt-1">Cardiovascular screening and risk management</p>
            </div>
            <div className="flex items-center space-x-3">
              {user?.role === 'admin' && (
                <Link
                  to="/upload"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Upload Scans
                </Link>
              )}
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <p className="text-sm text-green-800 font-medium">🔒 Secure Environment</p>
              </div>
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
                <p className="text-sm font-medium text-gray-500">Total Patients</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <AlertTriangle className="h-8 w-8 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Pending Review</p>
                <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <TrendingUp className="h-8 w-8 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">High-Risk Patients</p>
                <p className="text-2xl font-bold text-gray-900">{stats.highRisk}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Completed Cases</p>
                <p className="text-2xl font-bold text-gray-900">{stats.completed}</p>
              </div>
            </div>
          </div>
        </div>

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
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Categories</option>
              <option value="Minimal">Minimal</option>
              <option value="Mild">Mild</option>
              <option value="Moderate">Moderate</option>
              <option value="Severe">Severe</option>
            </select>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Statuses</option>
              <option value="Needs Review">Needs Review</option>
              <option value="Positive">Positive</option>
              <option value="Follow-up Call #1">Follow-up Call #1</option>
              <option value="Follow-up Call #2">Follow-up Call #2</option>
              <option value="Lost to Follow-up">Lost to Follow-up</option>
              <option value="Appointment Scheduled">Appointment Scheduled</option>
            </select>

            <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200 transition-colors flex items-center">
              <Download className="w-4 h-4 mr-2" />
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
                    { key: 'id', label: 'Patient ID' },
                    { key: 'examDate', label: 'Exam Date' },
                    // Remove Agatston Score column, keep new columns
                    { key: 'coronary', label: 'Coronary Arteries Calcification' },
                    { key: 'abdominal', label: 'Abdominal Aortic Calcium' },
                    { key: 'thoracic', label: 'Thoracic Aortic Calcium' },
                    { key: 'aorticAnnulus', label: 'Aortic Annulus Calcium' },
                    { key: 'mitralAnnulus', label: 'Mitral Annulus Calcium' },
                    { key: 'aorticValveLeaflets', label: 'Aortic Valve Leaflets Calcium' },
                    { key: 'cardiothoracicRatio', label: 'Cardiothoracic Ratio' },
                    { key: 'highRiskLevel', label: 'High Risk' },
                    { key: 'knownCVD', label: 'Known CVD' },
                    { key: 'crmStatus', label: 'CRM Status' }
                  ].map((column) => (
                    <th
                      key={column.key}
                      onClick={() => handleSort(column.key as keyof Patient)}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    >
                      <div className="flex items-center space-x-1">
                        <span>{column.label}</span>
                        {sortColumn === column.key && (
                          <span className="text-blue-600">
                            {sortDirection === 'asc' ? '↑' : '↓'}
                          </span>
                        )}
                      </div>
                    </th>
                  ))}
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Notes
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAndSortedPatients.map((patient) => (
                  <tr key={patient.id} className="hover:bg-gray-50">
                    {/* Only show Patient ID in the first column */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{patient.id}</td>
                    {/* Removed Age and Gender columns */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(patient.examDate).toLocaleDateString()}
                    </td>
                    {/* For each new column, show labeled Agatston Score and Band */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-mono">
                      <span className="block text-xs text-gray-500">Score:</span>
                      <span className="font-bold">366.684048</span>
                      <span className="block text-xs text-gray-500 mt-1">Band:</span>
                      <span className="inline-block text-xs font-semibold bg-blue-100 text-blue-700 rounded-full px-2 py-0.5 align-middle">3</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-mono">
                      <span className="block text-xs text-gray-500">Score:</span>
                      <span className="font-bold">222.041725</span>
                      <span className="block text-xs text-gray-500 mt-1">Band:</span>
                      <span className="inline-block text-xs font-semibold bg-blue-100 text-blue-700 rounded-full px-2 py-0.5 align-middle">3</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-mono">
                      <span className="block text-xs text-gray-500">Score:</span>
                      <span className="font-bold">2410.938858</span>
                      <span className="block text-xs text-gray-500 mt-1">Band:</span>
                      <span className="inline-block text-xs font-semibold bg-blue-100 text-blue-700 rounded-full px-2 py-0.5 align-middle">4</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-mono">
                      <span className="block text-xs text-gray-500">Score:</span>
                      <span className="font-bold">1036.311459</span>
                      <span className="block text-xs text-gray-500 mt-1">Band:</span>
                      <span className="inline-block text-xs font-semibold bg-blue-100 text-blue-700 rounded-full px-2 py-0.5 align-middle">4</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-mono">
                      <span className="block text-xs text-gray-500">Score:</span>
                      <span className="font-bold">287.883751</span>
                      <span className="block text-xs text-gray-500 mt-1">Band:</span>
                      <span className="inline-block text-xs font-semibold bg-blue-100 text-blue-700 rounded-full px-2 py-0.5 align-middle">3</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-mono">
                      <span className="block text-xs text-gray-500">Score:</span>
                      <span className="font-bold">558.256325</span>
                      <span className="block text-xs text-gray-500 mt-1">Band:</span>
                      <span className="inline-block text-xs font-semibold bg-blue-100 text-blue-700 rounded-full px-2 py-0.5 align-middle">4</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <StatusPill status={patient.cardiothoracicRatio} type="category" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusPill status={patient.highRiskLevel} type="risk" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span>{patient.knownCVD}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {canEdit ? (
                        <select 
                          value={patient.crmStatus}
                          onChange={(e) => handleStatusChange(patient.id, e.target.value as Patient['crmStatus'])}
                          className="text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="Needs Review">Needs Review</option>
                          <option value="Positive">Positive</option>
                          <option value="Follow-up Call #1">Follow-up Call #1</option>
                          <option value="Follow-up Call #2">Follow-up Call #2</option>
                          <option value="Lost to Follow-up">Lost to Follow-up</option>
                          <option value="Appointment Scheduled">Appointment Scheduled</option>
                        </select>
                      ) : (
                        <StatusPill status={patient.crmStatus} type="crm" />
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {editingNotes === patient.id ? (
                        <div className="flex items-center space-x-2">
                          <input
                            type="text"
                            value={tempNotes}
                            onChange={(e) => setTempNotes(e.target.value)}
                            className="text-xs border border-gray-300 rounded px-2 py-1 w-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Add notes..."
                          />
                          <button
                            onClick={() => handleNotesSave(patient.id)}
                            className="text-green-600 hover:text-green-800"
                          >
                            <Save className="w-4 h-4" />
                          </button>
                          <button
                            onClick={handleNotesCancel}
                            className="text-gray-600 hover:text-gray-800"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-gray-600 max-w-32 truncate">
                            {patient.notes || 'No notes'}
                          </span>
                          {canEdit && (
                            <button
                              onClick={() => handleNotesEdit(patient.id, patient.notes)}
                              className="text-blue-600 hover:text-blue-800"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <Link
                          to={`/report/${patient.id}`}
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

        {/* Pagination */}
        <div className="mt-6 flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing <span className="font-medium">{filteredAndSortedPatients.length}</span> of{' '}
            <span className="font-medium">{patients.length}</span> patients
          </div>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
              Previous
            </button>
            <span className="px-3 py-2 text-sm bg-blue-600 text-white rounded-md">1</span>
            <button className="px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}