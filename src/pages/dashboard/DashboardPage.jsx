import { ShieldCheck } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      
      {/* Welcome Banner */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 bg-blue-50 text-blue-700 text-xs font-bold rounded-full border border-blue-100">
              Phase 2.1 Ready
            </span>
            <span className="text-xs text-slate-400 font-medium">Application Shell Active</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Welcome to CampusFlow Workspace
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
            The frontend application shell is successfully running with client-side routing, responsive navigation, and accessible UI frame layouts.
          </p>
        </div>
      </div>

      {/* Overview Metric Cards Grid Placeholder */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-2">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Demo Enrolled</span>
          <p className="text-2xl font-extrabold text-slate-900">1,248</p>
          <p className="text-[11px] text-slate-500 font-medium">Full metrics in Phase 2.2</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-2">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Avg Attendance</span>
          <p className="text-2xl font-extrabold text-slate-900">92.4%</p>
          <p className="text-[11px] text-slate-500 font-medium">Full metrics in Phase 2.2</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-2">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Active Courses</span>
          <p className="text-2xl font-extrabold text-slate-900">36</p>
          <p className="text-[11px] text-slate-500 font-medium">Full metrics in Phase 2.2</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-2">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">System Status</span>
          <p className="text-2xl font-extrabold text-emerald-600">Online</p>
          <p className="text-[11px] text-slate-500 font-medium">Frontend Shell</p>
        </div>
      </div>

      {/* Info Notice Box */}
      <div className="p-5 bg-blue-50/60 border border-blue-100 rounded-2xl flex items-start space-x-3.5">
        <div className="p-2 bg-blue-600 text-white rounded-xl shrink-0 mt-0.5">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <div className="space-y-1 text-xs sm:text-sm text-slate-700">
          <h3 className="font-bold text-slate-900">What comes next in Phase 2.2?</h3>
          <p className="leading-relaxed">
            In Phase 2.2, we will construct the complete Dashboard Overview page including detailed metric widgets, attendance graphs, recent student admission tables, and upcoming class schedules.
          </p>
        </div>
      </div>

    </div>
  );
}