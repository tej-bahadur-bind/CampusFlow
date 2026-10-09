import { BarChart3, TrendingUp } from 'lucide-react';

export default function ChartsSection() {
  const departmentData = [
    { name: 'Computer Sci', count: 420, max: 500, color: 'bg-blue-600' },
    { name: 'Electrical Eng', count: 310, max: 500, color: 'bg-blue-500' },
    { name: 'Mechanical', count: 240, max: 500, color: 'bg-indigo-600' },
    { name: 'Civil Eng', count: 180, max: 500, color: 'bg-indigo-500' },
    { name: 'Business Admin', count: 98, max: 500, color: 'bg-slate-700' },
  ];

  const attendanceData = [
    { month: 'Nov', rate: 88 },
    { month: 'Dec', rate: 90 },
    { month: 'Jan', rate: 86 },
    { month: 'Feb', rate: 93 },
    { month: 'Mar', rate: 91 },
    { month: 'Apr', rate: 94 },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      
      {/* Chart 1: Enrollment by Department */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
              <BarChart3 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Enrollment by Department</h3>
              <p className="text-[11px] text-slate-500">Demo student distribution</p>
            </div>
          </div>
          <span className="text-[10px] font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">
            Sample Data
          </span>
        </div>

        {/* Bar List */}
        <div className="space-y-3.5" role="region" aria-label="Department Enrollment Chart">
          {departmentData.map((dept) => {
            const percentage = Math.round((dept.count / dept.max) * 100);
            return (
              <div key={dept.name} className="space-y-1">
                <div className="flex justify-between text-xs font-medium text-slate-700">
                  <span>{dept.name}</span>
                  <span className="font-bold text-slate-900">{dept.count} students</span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${dept.color} rounded-full transition-all duration-500`}
                    style={{ width: `${percentage}%` }}
                    role="progressbar"
                    aria-valuenow={dept.count}
                    aria-valuemin="0"
                    aria-valuemax={dept.max}
                    aria-label={`${dept.name}: ${dept.count} students`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Chart 2: Monthly Attendance Trend */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Monthly Attendance Trend</h3>
              <p className="text-[11px] text-slate-500">6-month campus average</p>
            </div>
          </div>
          <span className="text-[10px] font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">
            Sample Data
          </span>
        </div>

        {/* SVG Area Line Graph */}
        <div className="space-y-4">
          <div className="h-44 w-full pt-2" role="region" aria-label="Monthly Attendance Trend Chart">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 300 100" preserveAspectRatio="none">
              {/* Grid Lines */}
              <line x1="0" y1="25" x2="300" y2="25" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="0" y1="50" x2="300" y2="50" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="0" y1="75" x2="300" y2="75" stroke="#f1f5f9" strokeWidth="1" />

              {/* Area Fill */}
              <polygon
                points="0,100 0,60 60,50 120,70 180,35 240,45 300,30 300,100"
                fill="url(#blue-gradient)"
                opacity="0.25"
              />

              {/* Line Stroke */}
              <polyline
                fill="none"
                stroke="#2563eb"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                points="0,60 60,50 120,70 180,35 240,45 300,30"
              />

              {/* Data Dots */}
              {[
                { x: 0, y: 60, val: '88%' },
                { x: 60, y: 50, val: '90%' },
                { x: 120, y: 70, val: '86%' },
                { x: 180, y: 35, val: '93%' },
                { x: 240, y: 45, val: '91%' },
                { x: 300, y: 30, val: '94%' },
              ].map((pt, i) => (
                <circle key={i} cx={pt.x} cy={pt.y} r="3.5" className="fill-blue-600 stroke-white stroke-2" />
              ))}

              <defs>
                <linearGradient id="blue-gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#ffffff" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Month Labels */}
          <div className="flex justify-between text-xs font-semibold text-slate-500 pt-1 border-t border-slate-100">
            {attendanceData.map((d) => (
              <div key={d.month} className="text-center">
                <p>{d.month}</p>
                <p className="text-[10px] text-blue-600 font-bold">{d.rate}%</p>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}