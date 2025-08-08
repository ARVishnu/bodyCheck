import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { AIPipelinePage, ContactPage, DemoDashboard,  LoginPage, ReportPage, SampleReport, Dashboard, PrivacyPage, UploadPage, HomePageV2, HomePage, HomePageV3 } from '../pages'
import {  PatientsPage, PatientsPageV2, ProvidersPage, ResearcherPage, ResearcherPageV2, ResearcherPageV3 } from '../pages/Home'
import { useAuth } from '../context/AuthContext';
import { Footer, Navbar, ScrollToTop, PageTransitionLoader } from '../components';
import { SampleReportV2 } from '../pages/SampleReport';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { isAuthenticated } = useAuth();
    const location = useLocation();
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
    <Route path="/homeV3" element={<HomePage />} />
    <Route path="/homeV2" element={<HomePageV2 />} />
    <Route path="/" element={<HomePageV3 />} />
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