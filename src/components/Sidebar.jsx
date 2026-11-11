import { LayoutDashboard, Users, Calendar, BookOpen, GraduationCap, Award } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const navItems = [
  { name: 'Overview', path: '/dashboard', icon: LayoutDashboard },
  { name: 'Students', path: '/dashboard/students', icon: Users },
  { name: 'Attendance', path: '/dashboard/attendance', icon: Calendar },
  { name: 'Courses', path: '/dashboard/courses', icon: BookOpen },
  { name: 'Results', path: '/dashboard/results', icon: Award },
  { name: 'Student Portal', path: '/dashboard/my-portal', icon: GraduationCap },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen p-4 flex flex-col justify-between">
      <div className="space-y-6">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="p-2 bg-blue-600 rounded-xl">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="font-bold text-lg leading-none">CampusFlow</h2>
            <p className="text-[11px] text-slate-400">Admin Portal</p>
          </div>
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/dashboard'}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`
                }
              >
                <Icon className="w-4 h-4" />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}