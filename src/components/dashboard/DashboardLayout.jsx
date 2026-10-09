import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

export default function DashboardLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  // Map route paths to friendly Topbar titles
  const getPageTitle = (pathname) => {
    switch (pathname) {
      case '/dashboard':
        return 'Overview';
      case '/dashboard/students':
        return 'Student Directory';
      case '/dashboard/faculty':
        return 'Faculty Roster';
      case '/dashboard/courses':
        return 'Course Management';
      case '/dashboard/attendance':
        return 'Attendance Tracking';
      case '/dashboard/exams':
        return 'Exams & Schedules';
      case '/dashboard/results':
        return 'Academic Results';
      case '/dashboard/reports':
        return 'Reports & Analytics';
      case '/dashboard/settings':
        return 'System Settings';
      default:
        return 'Dashboard';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex font-sans antialiased">
      {/* Sidebar */}
      <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        <Topbar
          onMobileMenuToggle={() => setMobileOpen(!mobileOpen)}
          activeTitle={getPageTitle(location.pathname)}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}