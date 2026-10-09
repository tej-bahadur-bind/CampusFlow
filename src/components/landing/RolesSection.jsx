import { useState } from 'react';
import { ShieldCheck, UserCheck, GraduationCap, Check } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';

export default function RolesSection() {
  const [activeRole, setActiveRole] = useState('admin');

  const roles = {
    admin: {
      title: 'Administrator Access',
      icon: ShieldCheck,
      badge: 'Full System Scope',
      description:
        'Complete authority over institutional settings, user permissions, department structures, and master analytics.',
      features: [
        'Manage student & faculty master directories',
        'Configure department & course structures',
        'Override attendance and exam records',
        'Generate campus-wide compliance reports',
      ],
    },
    faculty: {
      title: 'Faculty Access',
      icon: UserCheck,
      badge: 'Academic Management',
      description:
        'Tailored workspace for professors and lecturers to manage assigned classes and student grading.',
      features: [
        'Take quick digital class attendance',
        'Enter assignment & mid-term grades',
        'View student academic profiles',
        'Post class announcements & schedules',
      ],
    },
    student: {
      title: 'Student Access',
      icon: GraduationCap,
      badge: 'Personal Dashboard',
      description:
        'A clean portal for students to track their academic health, attendance stats, and timetable.',
      features: [
        'Monitor live attendance percentages',
        'View semester grade sheets and GPA',
        'Access course timetables & exam schedules',
        'Receive immediate institutional notices',
      ],
    },
  };

  const current = roles[activeRole];
  const Icon = current.icon;

  return (
    <section id="roles" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <SectionHeading
          eyebrow="Role-Based Security"
          title="Tailored Workspaces for Every User"
          description="Ensure precise data security with dedicated interfaces for administrators, teaching faculty, and students."
        />

        {/* Role Selection Tabs */}
        <div className="flex justify-center">
          <div
            className="bg-white p-1.5 rounded-2xl border border-slate-200 inline-flex space-x-1 shadow-2xs"
            role="tablist"
            aria-label="System Roles"
          >
            {Object.keys(roles).map((key) => (
              <button
                key={key}
                role="tab"
                id={`tab-${key}`}
                aria-selected={activeRole === key}
                aria-controls={`panel-${key}`}
                onClick={() => setActiveRole(key)}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold capitalize transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                  activeRole === key
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {key}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Role Display Card */}
        <div
          id={`panel-${activeRole}`}
          role="tabpanel"
          aria-labelledby={`tab-${activeRole}`}
          className="max-w-3xl mx-auto bg-white rounded-2xl border border-slate-200 p-8 shadow-xs space-y-6"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">{current.title}</h3>
            </div>
            <span className="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-semibold rounded-full border border-indigo-100">
              {current.badge}
            </span>
          </div>

          <p className="text-slate-600 text-sm leading-relaxed">{current.description}</p>

          <div className="grid sm:grid-cols-2 gap-3 pt-2">
            {current.features.map((feat, idx) => (
              <div key={idx} className="flex items-center space-x-2.5 text-xs sm:text-sm text-slate-700">
                <div className="p-1 bg-emerald-50 text-emerald-600 rounded-md shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}