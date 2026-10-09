import { Activity, CheckCircle2, FileText, Bell } from 'lucide-react';

export default function RecentActivity() {
  const activities = [
    { title: 'Mid-Term Results Published', desc: 'Prof. Sharma uploaded marks for CS-301', time: '10 mins ago', icon: FileText, color: 'text-blue-600 bg-blue-50' },
    { title: 'Attendance Record Locked', desc: 'EE-204 session completed and verified', time: '45 mins ago', icon: CheckCircle2, color: 'text-emerald-600 bg-emerald-50' },
    { title: 'Campus Notice Issued', desc: 'Library extended hours during exam week', time: '2 hours ago', icon: Bell, color: 'text-amber-600 bg-amber-50' },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-6 space-y-4">
      
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center space-x-2">
          <Activity className="w-4 h-4 text-blue-600" />
          <h3 className="text-sm font-bold text-slate-900">Recent Activity</h3>
        </div>
        <span className="text-[10px] font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">
          Sample Feed
        </span>
      </div>

      <div className="space-y-3">
        {activities.map((act, idx) => {
          const Icon = act.icon;
          return (
            <div key={idx} className="flex items-start space-x-3 text-xs">
              <div className={`p-2 rounded-xl shrink-0 mt-0.5 ${act.color}`}>
                <Icon className="w-3.5 h-3.5" />
              </div>
              <div className="space-y-0.5 min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-slate-900 truncate">{act.title}</h4>
                  <span className="text-[10px] text-slate-400 shrink-0 ml-2">{act.time}</span>
                </div>
                <p className="text-[11px] text-slate-500 leading-tight">{act.desc}</p>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}