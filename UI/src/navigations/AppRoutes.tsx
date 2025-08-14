import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { AIPipelinePage, ContactPage, DemoDashboard,  LoginPage, ReportPage, SampleReport, Dashboard, PrivacyPage, UploadPage, HomePageV2, HomePage, HomePageV3 } from '../pages'
import {  PatientsPage, PatientsPageV2, PatientsPageV3, ProvidersPage, ResearcherPage, ResearcherPageV2, ResearcherPageV3 } from '../pages/Home'
import { useAuth } from '../context/AuthContext';
import { Footer, Navbar, ScrollToTop, PageTransitionLoader } from '../components';
import { SampleReportV2 } from '../pages/SampleReport';

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
  const isProd = import.meta.env.PROD;
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
    <ScrollToTop />
    <PageTransitionLoader />
    <Navbar />
    <main className="flex-1">
    <Routes>
    {/* Public Routes */}
    {isProd ? (
      <>
        <Route path="/" element={<HomePageV3 />} />
        {/* Redirect legacy home routes to final home in production */}
        <Route path="/homeV3" element={<Navigate to="/" replace />} />
        <Route path="/homeV2" element={<Navigate to="/" replace />} />
      </>
    ) : (
      <>
        <Route path="/homeV3" element={<HomePage />} />
        <Route path="/homeV2" element={<HomePageV2 />} />
        <Route path="/" element={<HomePageV3 />} />
      </>
    )}
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
      path="/sample-reportV2"
      element={
        <ProtectedRoute>
          <SampleReportV2 />
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
    <Route path="/patientsV3" element={<PatientsPageV3 />} />
    <Route path="/patientsV2" element={<PatientsPageV2 />} />
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