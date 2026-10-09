import { useState } from 'react';
import { UserPlus, CalendarCheck, FilePlus, Send, AlertCircle } from 'lucide-react';

export default function QuickActions() {
  const [notice, setNotice] = useState('');

  const actions = [
    { label: 'Add Student', icon: UserPlus, phase: 'Phase 4' },
    { label: 'Take Attendance', icon: CalendarCheck, phase: 'Phase 5' },
    { label: 'Publish Results', icon: FilePlus, phase: 'Phase 5' },
    { label: 'Send Notice', icon: Send, phase: 'Phase 6' },
  ];

  const handleActionClick = (action) => {
    setNotice(`"${action.label}" functionality will be connected in ${action.phase}.`);
    setTimeout(() => setNotice(''), 4000);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-6 space-y-4">
      
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <h3 className="text-sm font-bold text-slate-900">Quick Actions</h3>
        <span className="text-[10px] font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">
          UI Shortcuts
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {actions.map((act, idx) => {
          const Icon = act.icon;
          return (
            <button
              key={idx}
              onClick={() => handleActionClick(act)}
              className="flex flex-col items-center justify-center p-3 bg-slate-50 hover:bg-blue-50/70 border border-slate-200/80 hover:border-blue-200 rounded-xl transition-all group focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              aria-label={`${act.label} (Scheduled for ${act.phase})`}
            >
              <div className="p-2 bg-white group-hover:bg-blue-600 text-slate-700 group-hover:text-white rounded-lg shadow-2xs transition-colors mb-1.5">
                <Icon className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-slate-800 group-hover:text-blue-900 text-center">
                {act.label}
              </span>
              <span className="text-[10px] text-slate-400 font-medium">{act.phase}</span>
            </button>
          );
        })}
      </div>

      {/* Interactive Placeholder Notification Banner */}
      {notice && (
        <div className="p-3 bg-blue-50 border border-blue-200/80 text-blue-800 rounded-xl text-xs flex items-center space-x-2 animate-fade-in">
          <AlertCircle className="w-4 h-4 text-blue-600 shrink-0" />
          <span className="font-semibold">{notice}</span>
        </div>
      )}

    </div>
  );
}