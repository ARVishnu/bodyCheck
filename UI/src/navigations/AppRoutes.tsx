import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { AIPipelinePage, ContactPage, DemoDashboard,  LoginPage, ReportPage, SampleReport, Dashboard, PrivacyPage, UploadPage, HomePage } from '../pages'
import {  PatientsPage, ProvidersPage, ResearcherPage, ResearcherPageV2, ResearcherPageV3 } from '../pages/Home'
import { useAuth } from '../context/AuthContext';
import { Footer, Navbar, ScrollToTop, PageTransitionLoader } from '../components';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { isAuthenticated } = useAuth();
    const location = useLocation();

    // Persist the intended path so it survives tab switches or reloads
    useEffect(() => {
      if (!isAuthenticated) {
        try {
          const redirectTo = `${location.pathname}${location.search}${location.hash}`;
          sessionStorage.setItem('auth_redirect_to', redirectTo);
        } catch {}
      }
    }, [isAuthenticated, location]);

    return isAuthenticated ? (
      <>{children}</>
    ) : (
      <Navigate to="/login" replace state={{ from: location }} />
    );
}

export const AppRoutes = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
    <ScrollToTop />
    <PageTransitionLoader />
    <Navbar />
    <main className="flex-1">
    <Routes>
    {/* Public Routes */}
    <Route path="/" element={<HomePage />} />
    <Route path="/login" element={<LoginPage />} />
    {/* Protected: Demo and Sample Reports now require login */}
    <Route
      path="/demo-dashboard"
      element={
        <ProtectedRoute>
          <DemoDashboard />
        </ProtectedRoute>
      }
    />
    <Route
      path="/sample-report"
      element={
        <ProtectedRoute>
          <SampleReport />
        </ProtectedRoute>
      }
    />
    <Route
      path="/ai-pipeline"
      element={
        <ProtectedRoute>
          <AIPipelinePage />
        </ProtectedRoute>
      }
    />
    {/* <Route path="/documentation" element={<DocumentationPage />} /> */}
    <Route path="/contact" element={<ContactPage />} />
    <Route path="/privacy" element={<PrivacyPage />} />
    <Route path="/terms" element={<PrivacyPage />} />
    <Route path="/disclaimer" element={<PrivacyPage />} />
    <Route path="/providers" element={<ProvidersPage />} />
    <Route path="/patients" element={<PatientsPage />} />
    <Route path="/researchers" element={<ResearcherPage />} />
    <Route path="/researchersV3" element={<ResearcherPageV3 />} />
    <Route path="/researchersV2" element={<ResearcherPageV2 />} />
    {/* Protected Routes */}
    <Route
      path="/dashboard"
      element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      }
    />
    <Route
      path="/upload"
      element={
        <ProtectedRoute>
          <UploadPage />
        </ProtectedRoute>
      }
    />
    <Route
      path="/report/:patientId"
      element={
        <ProtectedRoute>
          <ReportPage />
        </ProtectedRoute>
      }
    />
  </Routes>
  </main>
      <Footer />
    </div>
  )
}