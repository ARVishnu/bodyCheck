import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePageNew';
import { LoginPage } from './pages/LoginPage';
import { Dashboard } from './pages/Dashboard';
import { DemoDashboard } from './pages/DemoDashboard';
import { ReportPage } from './pages/ReportPage';
import { UploadPage } from './pages/UploadPage';
import { AIPipelinePage } from './pages/AIPipelinePage';
import { DocumentationPage } from './pages/DocumentationPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { ProvidersPage } from './pages/ProvidersPage';
import { PatientsPage } from './pages/PatientsPage';
import { ResearchersPage } from './pages/ResearchersPage';
import { SampleReport } from './pages/SampleReport';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
}

function AppContent() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/demo-dashboard" element={<DemoDashboard />} />
          <Route path="/sample-report" element={<SampleReport />} />
          <Route path="/ai-pipeline" element={<AIPipelinePage />} />
          <Route path="/documentation" element={<DocumentationPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<PrivacyPage />} />
          <Route path="/disclaimer" element={<PrivacyPage />} />
          <Route path="/providers" element={<ProvidersPage />} />
          <Route path="/patients" element={<PatientsPage />} />
          <Route path="/researchers" element={<ResearchersPage />} />

          {/* Protected Routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/upload" element={
            <ProtectedRoute>
              <UploadPage />
            </ProtectedRoute>
          } />
          <Route path="/report/:patientId" element={
            <ProtectedRoute>
              <ReportPage />
            </ProtectedRoute>
          } />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;