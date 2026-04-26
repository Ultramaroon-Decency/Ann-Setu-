import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';
import { LanguageProvider } from '@/context/LanguageContext';
import { Toaster } from '@/hooks/use-toast';
import ProtectedRoute from '@/components/ProtectedRoute';
import AIChatbot from '@/components/AIChatbot';
import Index from '@/pages/Index';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import DonorDashboard from '@/pages/DonorDashboard';
import ReceiverDashboard from '@/pages/ReceiverDashboard';
import VolunteerDashboard from '@/pages/VolunteerDashboard';
import Concerns from '@/pages/Concerns';
import Language from '@/pages/Language';
import RequestTracking from '@/pages/RequestTracking';
import ConfirmationPage from '@/pages/ConfirmationPage';
import DonorProfile from '@/pages/DonorProfile';
import Settings from '@/pages/Settings';

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login/:role" element={<Login />} />
          <Route path="/register/:role" element={<Register />} />
          <Route path="/dashboard/donor" element={
            <ProtectedRoute allowedRoles={['donor']}><DonorDashboard /></ProtectedRoute>
          } />
          <Route path="/dashboard/receiver" element={
            <ProtectedRoute allowedRoles={['receiver']}><ReceiverDashboard /></ProtectedRoute>
          } />
          <Route path="/dashboard/volunteer" element={
            <ProtectedRoute allowedRoles={['volunteer']}><VolunteerDashboard /></ProtectedRoute>
          } />
          <Route path="/concerns" element={
            <ProtectedRoute><Concerns /></ProtectedRoute>
          } />
          <Route path="/language" element={
            <ProtectedRoute><Language /></ProtectedRoute>
          } />
          <Route path="/request-tracking" element={
            <ProtectedRoute allowedRoles={['receiver']}><RequestTracking /></ProtectedRoute>
          } />
          <Route path="/confirmation" element={
            <ProtectedRoute><ConfirmationPage /></ProtectedRoute>
          } />
          <Route path="/donor-profile/:id" element={
            <ProtectedRoute allowedRoles={['receiver']}><DonorProfile /></ProtectedRoute>
          } />
          <Route path="/settings" element={
            <ProtectedRoute><Settings /></ProtectedRoute>
          } />
        </Routes>
        <AIChatbot />
        <Toaster />
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
