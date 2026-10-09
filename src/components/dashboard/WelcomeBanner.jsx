import { Sparkles, Calendar, Info } from 'lucide-react';

export default function WelcomeBanner() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-2xs space-y-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Left Welcome Copy */}
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 bg-amber-50 text-amber-700 text-xs font-semibold rounded-full border border-amber-200/80">
              <Sparkles className="w-3 h-3 text-amber-500" />
              <span>Demo Mode</span>
            </span>
            <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full border border-blue-100">
              <Calendar className="w-3 h-3 text-blue-600" />
              <span>Spring Term 2026</span>
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Welcome back, Alex
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
            Here is what's happening across your campus today. All numbers and records shown below represent sample demonstration data.
          </p>
        </div>

        {/* Right Info Box */}
        <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl flex items-start space-x-2.5 max-w-xs shrink-0 text-slate-600 text-xs">
          <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
          <p className="leading-tight">
            Database persistence and live role-based data will be connected in Phase 3.
          </p>
        </div>

      </div>
    </div>
  );
}