import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MotionConfig } from 'motion/react';
import LandingPage from './pages/LandingPage';
import DashboardLayout from './components/dashboard/DashboardLayout';
import DashboardPage from './pages/dashboard/DashboardPage';
import PlaceholderPage from './pages/dashboard/PlaceholderPage';

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <BrowserRouter>
        <Routes>
          {/* Public Landing Page */}
          <Route path="/" element={<LandingPage />} />

          {/* Application Shell Routes */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="students" element={<PlaceholderPage title="Student Directory" phase="Phase 4" />} />
            <Route path="faculty" element={<PlaceholderPage title="Faculty Directory" phase="Phase 6" />} />
            <Route path="courses" element={<PlaceholderPage title="Course Management" phase="Phase 4" />} />
            <Route path="attendance" element={<PlaceholderPage title="Attendance Tracking" phase="Phase 5" />} />
            <Route path="exams" element={<PlaceholderPage title="Exams & Schedules" phase="Phase 5" />} />
            <Route path="results" element={<PlaceholderPage title="Academic Results" phase="Phase 5" />} />
            <Route path="reports" element={<PlaceholderPage title="Reports & Analytics" phase="Phase 6" />} />
            <Route path="settings" element={<PlaceholderPage title="System Settings" phase="Phase 6" />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </MotionConfig>
  );
}