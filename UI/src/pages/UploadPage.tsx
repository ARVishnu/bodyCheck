import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { Upload, FileText, AlertTriangle, CheckCircle, X } from 'lucide-react';
import { LoadingSpinner } from '../components/LoadingSpinner';

export function UploadPage() {
  const { user } = useAuth();
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [hasContrast, setHasContrast] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);

  if (user?.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const newFiles = Array.from(e.dataTransfer.files);
      setFiles(prev => [...prev, ...newFiles]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles(prev => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (files.length === 0) return;
    
    setIsProcessing(true);
    
    // Simulate upload and processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setIsProcessing(false);
    setUploadComplete(true);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (uploadComplete) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Upload Successful!</h2>
            <p className="text-gray-600 mb-6">
              {files.length} file(s) uploaded and processed successfully. 
              AI analysis complete and reports generated.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => {
                  setFiles([]);
                  setUploadComplete(false);
                  setHasContrast(false);
                }}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Upload More Scans
              </button>
              <button className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                View New Reports
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">DICOM Scan Upload</h1>
          <p className="text-gray-600">Upload cardiac CT scans for AI-powered cardiovascular analysis</p>
        </div>

        {/* Security Notice */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <div className="flex items-center">
            <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
            <span className="text-sm text-green-800 font-medium">
              Secure Upload Environment - HIPAA Compliant
            </span>
          </div>
        </div>

        <div className="space-y-6">
          {/* Upload Area */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Upload Files</h3>
            
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragActive 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-300 hover:border-gray-400'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <div className="text-lg font-medium text-gray-900 mb-2">
                Drag and drop DICOM files here
              </div>
              <p className="text-gray-600 mb-4">or</p>
              <label className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer">
                Browse Files
                <input
                  type="file"
                  multiple
                  accept=".dcm,.dicom"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </label>
              <p className="text-sm text-gray-500 mt-4">
                Supports: DICOM (.dcm, .dicom) files. Maximum 500MB per file.
              </p>
            </div>
          </div>

          {/* File List */}
          {files.length > 0 && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Selected Files ({files.length})</h3>
              <div className="space-y-3">
                {files.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FileText className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{file.name}</p>
                        <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFile(index)}
                      className="text-gray-400 hover:text-red-600 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Scan Options */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Scan Parameters</h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="contrast"
                  checked={hasContrast}
                  onChange={(e) => setHasContrast(e.target.checked)}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="contrast" className="ml-2 text-sm font-medium text-gray-900">
                  Scan includes contrast enhancement
                </label>
              </div>
              
              {hasContrast && (
                <div className="ml-6 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                  <div className="flex items-start">
                    <AlertTriangle className="w-4 h-4 text-yellow-600 mr-2 mt-0.5" />
                    <div className="text-sm text-yellow-800">
                      <p className="font-medium">Contrast-Enhanced Scan Detected</p>
                      <p>AI analysis will account for contrast enhancement in calcium scoring calculations.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Upload Button */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Process Scans</h3>
                <p className="text-gray-600">Upload and analyze with AI-powered cardiovascular assessment</p>
              </div>
              <button
                onClick={handleUpload}
                disabled={files.length === 0 || isProcessing}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
              >
                {isProcessing ? (
                  <>
                    <LoadingSpinner size="sm" />
                    <span className="ml-2">Processing...</span>
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4 mr-2" />
                    Upload & Analyze
                  </>
                )}
              </button>
            </div>

            {isProcessing && (
              <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center">
                  <LoadingSpinner size="sm" />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-blue-900">AI Analysis in Progress</p>
                    <p className="text-xs text-blue-700">
                      Processing DICOM files, running segmentation models, and calculating Agatston scores...
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Info Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Processing Pipeline</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { step: '1', title: 'DICOM Validation', desc: 'File format and metadata verification' },
                { step: '2', title: 'AI Preprocessing', desc: 'Image enhancement and normalization' },
                { step: '3', title: 'Segmentation', desc: 'Heart and artery identification' },
                { step: '4', title: 'Analysis', desc: 'Calcium scoring and risk assessment' }
              ].map((item) => (
                <div key={item.step} className="text-center">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-bold">
                    {item.step}
                  </div>
                  <h4 className="font-medium text-gray-900 text-sm">{item.title}</h4>
                  <p className="text-xs text-gray-600 mt-1">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}