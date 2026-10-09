import { Users, UserCheck, BookOpen, CalendarCheck, TrendingUp } from 'lucide-react';

export default function StatCards() {
  const stats = [
    {
      title: 'Total Students',
      value: '1,248',
      change: '+4.2% vs last term',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Active Faculty',
      value: '84',
      change: '100% assigned',
      icon: UserCheck,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
    },
    {
      title: 'Total Courses',
      value: '36',
      change: '6 departments',
      icon: BookOpen,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Avg Attendance',
      value: '92.4%',
      change: '+1.8% this month',
      icon: CalendarCheck,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <div
            key={idx}
            className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs hover:border-slate-300 transition-all space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 tracking-wide uppercase">
                {stat.title}
              </span>
              <div className={`p-2 rounded-xl ${stat.bgColor} ${stat.color}`}>
                <Icon className="w-4 h-4" />
              </div>
            </div>

            <div>
              <div className="flex items-baseline space-x-2">
                <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  {stat.value}
                </p>
                <span className="text-[10px] font-semibold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                  Demo
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1 flex items-center space-x-1">
                <TrendingUp className="w-3 h-3 text-emerald-600 inline shrink-0" />
                <span>{stat.change}</span>
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}