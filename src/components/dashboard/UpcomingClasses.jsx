import { Clock, MapPin, User } from 'lucide-react';

export default function UpcomingClasses() {
  const classes = [
    { title: 'Data Structures & Algorithms', code: 'CS-301', time: '10:30 AM', room: 'Lab Hall 4B', faculty: 'Prof. Sharma', status: 'In Progress' },
    { title: 'Digital Signal Processing', code: 'EE-204', time: '01:15 PM', room: 'Lecture Hall 2', faculty: 'Dr. V. Rao', status: 'Next Up' },
    { title: 'Fluid Mechanics & Dynamics', code: 'ME-302', time: '03:00 PM', room: 'Mech Block 102', faculty: 'Prof. Gupta', status: 'Scheduled' },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-6 space-y-4">
      
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center space-x-2">
          <Clock className="w-4 h-4 text-blue-600" />
          <h3 className="text-sm font-bold text-slate-900">Today's Schedule</h3>
        </div>
        <span className="text-[10px] font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">
          Demo Timetable
        </span>
      </div>

      <div className="space-y-3">
        {classes.map((cls, idx) => (
          <div key={idx} className="p-3.5 bg-slate-50/80 border border-slate-200/70 rounded-xl space-y-2">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-mono font-bold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-100">
                  {cls.code}
                </span>
                <h4 className="text-xs font-bold text-slate-900 mt-1">{cls.title}</h4>
              </div>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  cls.status === 'In Progress'
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60'
                    : cls.status === 'Next Up'
                    ? 'bg-blue-50 text-blue-700 border border-blue-200/60'
                    : 'bg-slate-200/70 text-slate-600'
                }`}
              >
                {cls.status}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-500 pt-1 border-t border-slate-200/50">
              <span className="flex items-center space-x-1">
                <Clock className="w-3 h-3 text-slate-400" />
                <span>{cls.time}</span>
              </span>
              <span className="flex items-center space-x-1">
                <MapPin className="w-3 h-3 text-slate-400" />
                <span>{cls.room}</span>
              </span>
              <span className="flex items-center space-x-1">
                <User className="w-3 h-3 text-slate-400" />
                <span>{cls.faculty}</span>
              </span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}