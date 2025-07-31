import { Navigate, Route, Routes } from 'react-router-dom'
import { AIPipelinePage, ContactPage, DemoDashboard, DocumentationPage, HomePageNew, LoginPage, ReportPage, SampleReport, Dashboard, PrivacyPage, UploadPage, HomePageV2 } from '../pages'
import { PatientsPage, ProvidersPage, ResearchersPage } from '../pages/Home'
import { useAuth } from '../context/AuthContext';
import { Footer, Navbar } from '../components';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
  }

export const AppRoutes = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
    <Navbar />
    <main className="flex-1">
    <Routes>
    {/* Public Routes */}
    {/* <Route path="/" element={<HomePage />} /> */}
    <Route path="/" element={<HomePageNew />} />
    <Route path="/homeV2" element={<HomePageV2 />} />
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