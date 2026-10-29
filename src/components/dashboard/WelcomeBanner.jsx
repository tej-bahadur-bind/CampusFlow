import { useAuth } from '../../context/AuthContext';
import { Sparkles, Calendar } from 'lucide-react';

export default function WelcomeBanner() {
  const { user } = useAuth();

  return (
    <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm relative overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-full border border-emerald-200">
            <Sparkles size={13} /> Live Session
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 text-slate-700 text-xs font-medium rounded-full">
            <Calendar size={13} /> Spring Term 2026
          </span>
        </div>
      </div>

      <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
        Welcome back, {user?.name || 'User'}
      </h1>
      <p className="text-slate-500 text-sm mt-1">
        Here is what's happening across your campus today.
      </p>
    </div>
  );
}