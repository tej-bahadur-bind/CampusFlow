import { Clock, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PlaceholderPage({ title, phase }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-8 shadow-2xs text-center max-w-2xl mx-auto my-8 space-y-4">
      <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl w-fit mx-auto">
        <Clock className="w-8 h-8" />
      </div>

      <div className="space-y-2">
        <span className="inline-block text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100 px-3 py-1 rounded-full">
          Scheduled for {phase}
        </span>
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">{title}</h2>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-md mx-auto">
          The navigation link and page structure are established inside the application shell. Full interactive data tables and workflows for this module will be built in {phase}.
        </p>
      </div>

      <div className="pt-2">
        <Link
          to="/dashboard"
          className="inline-flex items-center space-x-2 text-xs font-bold text-blue-600 hover:text-blue-700 hover:bg-blue-50 px-4 py-2 rounded-xl transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Dashboard Overview</span>
        </Link>
      </div>
    </div>
  );
}