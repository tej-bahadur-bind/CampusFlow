import { Users, UserCheck, BookOpen, Eye } from 'lucide-react';

export default function DemoStats() {
  const stats = [
    { icon: Users, value: '1,200+', label: 'Demo Students' },
    { icon: UserCheck, value: '50+', label: 'Demo Faculty' },
    { icon: BookOpen, value: '30+', label: 'Demo Courses' },
    { icon: Eye, value: '99%', label: 'Sample Visibility' },
  ];

  return (
    <section className="py-10 bg-white border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
            Demo Platform Metrics • Sample Data
          </span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="flex flex-col items-center text-center space-y-1.5 p-2">
                <div className="p-2 bg-slate-50 text-blue-600 rounded-lg border border-slate-100 mb-1">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  {stat.value}
                </span>
                <span className="text-xs sm:text-sm font-medium text-slate-500">
                  {stat.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}