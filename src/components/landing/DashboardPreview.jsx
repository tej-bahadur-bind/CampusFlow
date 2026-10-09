import {
  LayoutDashboard,
  Users,
  BookOpen,
  Calendar,
  Award,
  Bell,
  Search,
} from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';

export default function DashboardPreview() {
  return (
    <section id="preview" className="py-20 bg-white border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <SectionHeading
          eyebrow="Interactive Interface"
          title="A Clean, Modern Workspace"
          description="An intuitive administrative dashboard designed to reduce operational friction and present critical insights at a glance."
        />

        {/* Mock Application Container */}
        <div className="bg-slate-900 rounded-2xl p-2 sm:p-3 shadow-xl border border-slate-800">
          
          {/* Top Bar Controls Mock */}
          <div className="flex items-center justify-between px-3 py-2">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-rose-500/80" />
              <div className="w-3 h-3 rounded-full bg-amber-500/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <span className="text-xs text-slate-400 font-mono ml-4 hidden sm:inline">campusflow-app.internal/dashboard</span>
            </div>
            <span className="text-[10px] font-semibold bg-blue-500/20 text-blue-300 border border-blue-400/30 px-2 py-0.5 rounded-full">
              Interactive Demo Preview
            </span>
          </div>

          {/* App Window */}
          <div className="bg-slate-50 rounded-xl overflow-hidden border border-slate-200 text-slate-800 grid md:grid-cols-12 min-h-[500px]">
            
            {/* Mock Sidebar */}
            <div className="hidden md:block md:col-span-3 lg:col-span-2 bg-slate-900 text-slate-300 p-4 space-y-6">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500">Navigation</div>
              <nav className="space-y-1 text-xs" aria-label="Mock Sidebar">
                <div className="flex items-center space-x-2 bg-blue-600 text-white px-3 py-2 rounded-lg font-medium">
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Overview</span>
                </div>
                <div className="flex items-center space-x-2 text-slate-400 hover:text-white px-3 py-2 rounded-lg font-medium">
                  <Users className="w-4 h-4" />
                  <span>Students</span>
                </div>
                <div className="flex items-center space-x-2 text-slate-400 hover:text-white px-3 py-2 rounded-lg font-medium">
                  <BookOpen className="w-4 h-4" />
                  <span>Courses</span>
                </div>
                <div className="flex items-center space-x-2 text-slate-400 hover:text-white px-3 py-2 rounded-lg font-medium">
                  <Calendar className="w-4 h-4" />
                  <span>Attendance</span>
                </div>
                <div className="flex items-center space-x-2 text-slate-400 hover:text-white px-3 py-2 rounded-lg font-medium">
                  <Award className="w-4 h-4" />
                  <span>Results</span>
                </div>
              </nav>
            </div>

            {/* Mock Main Dashboard Content */}
            <div className="md:col-span-9 lg:col-span-10 p-6 space-y-6">
              
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="text-base font-bold text-slate-900">Campus Overview</h3>
                    <span className="text-[10px] bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded font-medium">Sample Data</span>
                  </div>
                  <p className="text-xs text-slate-500">Academic Term 2026 • Spring</p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="relative hidden sm:block">
                    <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
                    <input
                      disabled
                      aria-label="Search demo students"
                      placeholder="Search demo students..."
                      className="pl-8 pr-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs w-48 focus:outline-none"
                    />
                  </div>
                  <div className="p-1.5 bg-white border border-slate-200 rounded-lg text-slate-600">
                    <Bell className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* 4 Summary Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-1">
                  <span className="text-xs text-slate-500 font-medium">Demo Students</span>
                  <p className="text-lg font-bold text-slate-900">1,248</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-1">
                  <span className="text-xs text-slate-500 font-medium">Sample Attendance</span>
                  <p className="text-lg font-bold text-slate-900">92.4%</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-1">
                  <span className="text-xs text-slate-500 font-medium">Demo Courses</span>
                  <p className="text-lg font-bold text-slate-900">36</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-1">
                  <span className="text-xs text-slate-500 font-medium">Pending Marks</span>
                  <p className="text-lg font-bold text-amber-600">4 Classes</p>
                </div>
              </div>

              {/* Mock Recent Students Table */}
              <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">Recent Demo Admissions</span>
                  <span className="text-[11px] text-blue-600 font-medium">Sample List</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-100 text-slate-400 uppercase text-[10px]">
                        <th className="pb-2">Name</th>
                        <th className="pb-2">Department</th>
                        <th className="pb-2">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      <tr>
                        <td className="py-2 font-medium text-slate-800">Alex Morgan (Demo)</td>
                        <td className="py-2 text-slate-500">Computer Science</td>
                        <td className="py-2">
                          <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-md text-[10px] font-medium">Active</span>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2 font-medium text-slate-800">Samantha Lee (Demo)</td>
                        <td className="py-2 text-slate-500">Electrical Eng.</td>
                        <td className="py-2">
                          <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-md text-[10px] font-medium">Active</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
