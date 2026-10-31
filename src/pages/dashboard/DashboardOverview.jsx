import { useEffect, useState } from 'react';
import { Users, CheckCircle, Clock, AlertTriangle, ArrowRight, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../../config';

export default function DashboardOverview() {
  const [summary, setSummary] = useState({
    totalStudents: 0,
    attendanceRate: 0,
    present: 0,
    absent: 0,
    late: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function fetchSummary() {
      try {
        const res = await fetch(`${API_BASE_URL}/attendance/summary`);
        if (res.ok && isMounted) {
          const data = await res.json();
          setSummary({
            totalStudents: data.totalStudents || data.totalEnrolled || 0,
            attendanceRate: data.attendanceRate || 0,
            present: data.present || 0,
            absent: data.absent || 0,
            late: data.late || 0,
          });
        }
      } catch (err) {
        console.error('Failed to load dashboard summary:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    fetchSummary();
    return () => { isMounted = false; };
  }, []);

  const weeklyTrend = [65, 82, 78, 91, 88, 94];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Campus Analytics Overview</h1>
        <p className="text-sm text-slate-500">Real-time metrics across student enrollment and daily attendance</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold uppercase">Total Enrolled</span>
            <Users className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-3xl font-extrabold text-slate-900">{loading ? '...' : summary.totalStudents}</p>
          <p className="text-xs text-slate-400">Active campus records</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold uppercase">Today's Attendance</span>
            <CheckCircle className="w-5 h-5 text-emerald-600" />
          </div>
          <p className="text-3xl font-extrabold text-slate-900">{loading ? '...' : `${summary.attendanceRate}%`}</p>
          <p className="text-xs text-emerald-600 font-medium">{summary.present} present today</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold uppercase">Absent Today</span>
            <AlertTriangle className="w-5 h-5 text-red-500" />
          </div>
          <p className="text-3xl font-extrabold text-slate-900">{loading ? '...' : summary.absent}</p>
          <p className="text-xs text-red-500 font-medium">Requires follow-up</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold uppercase">Late Arrivals</span>
            <Clock className="w-5 h-5 text-amber-500" />
          </div>
          <p className="text-3xl font-extrabold text-slate-900">{loading ? '...' : summary.late}</p>
          <p className="text-xs text-amber-600 font-medium">Logged today</p>
        </div>
      </div>

      {/* Visual Chart Card */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-bold text-slate-900">Attendance Trend Analytics</h2>
          </div>
          <span className="text-xs text-slate-400 font-medium">Last 6 Class Days</span>
        </div>

        <div className="flex items-end gap-3 h-32 pt-4">
          {weeklyTrend.map((val, idx) => (
            <div key={idx} className="flex-1 bg-slate-100 rounded-t-lg h-full flex items-end relative group">
              <div
                className="w-full bg-blue-600 rounded-t-lg transition-all duration-500 group-hover:bg-blue-500"
                style={{ height: `${val}%` }}
              />
              <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity">
                {val}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Action Navigation */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-6 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl text-white space-y-4 shadow-md">
          <h2 className="text-xl font-bold">Manage Students</h2>
          <p className="text-blue-100 text-sm">Add, edit, or remove student profiles and department information.</p>
          <Link to="/dashboard/students" className="inline-flex items-center space-x-2 bg-white text-blue-700 px-4 py-2 rounded-xl text-sm font-bold">
            <span>Open Directory</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="p-6 bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl text-white space-y-4 shadow-md">
          <h2 className="text-xl font-bold">Daily Attendance</h2>
          <p className="text-slate-300 text-sm">Mark daily present, absent, or late statuses for campus classes.</p>
          <Link to="/dashboard/attendance" className="inline-flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-bold">
            <span>Mark Attendance</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}