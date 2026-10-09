import WelcomeBanner from '../../components/dashboard/WelcomeBanner';
import StatCards from '../../components/dashboard/StatCards';
import QuickActions from '../../components/dashboard/QuickActions';
import ChartsSection from '../../components/dashboard/ChartsSection';
import RecentStudentsTable from '../../components/dashboard/RecentStudentsTable';
import UpcomingClasses from '../../components/dashboard/UpcomingClasses';
import RecentActivity from '../../components/dashboard/RecentActivity';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      
      {/* 1. Welcome Header Banner */}
      <WelcomeBanner />

      {/* 2. Four Key Summary Cards */}
      <StatCards />

      {/* 3. Quick Action Buttons */}
      <QuickActions />

      {/* 4. Charts Section (Enrollment & Attendance Trends) */}
      <ChartsSection />

      {/* 5. Split Section: Admissions Table + Right Sidebar Widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left 8 Cols: Recent Admissions Table */}
        <div className="lg:col-span-8">
          <RecentStudentsTable />
        </div>

        {/* Right 4 Cols: Today's Schedule & Recent Activity */}
        <div className="lg:col-span-4 space-y-6">
          <UpcomingClasses />
          <RecentActivity />
        </div>

      </div>

    </div>
  );
}