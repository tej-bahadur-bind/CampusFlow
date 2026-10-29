import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, CalendarCheck, BookOpen, UserCheck, GraduationCap, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function Sidebar() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const navItems = [
    { label: 'Overview', path: '/dashboard', icon: LayoutDashboard, end: true },
    { label: 'Students', path: '/dashboard/students', icon: Users },
    { label: 'Attendance', path: '/dashboard/attendance', icon: CalendarCheck },
    { label: 'Courses', path: '/dashboard/courses', icon: BookOpen },
    { label: 'Student Portal', path: '/dashboard/my-portal', icon: UserCheck },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 min-h-screen flex flex-col justify-between p-4 border-r border-slate-800">
      <div className="space-y-6">
        <div className="flex items-center space-x-3 px-2 py-2 border-b border-slate-800 pb-4">
          <div className="p-2 bg-blue-600 text-white rounded-xl">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white tracking-tight">CampusFlow</h1>
            <p className="text-xs text-slate-400">Admin Portal</p>
          </div>
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`
                }
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      <div className="border-t border-slate-800 pt-4 space-y-3">
        <div className="px-2">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Logged in as</p>
          <p className="text-sm font-medium text-white truncate">{user?.email || 'admin@campusflow.com'}</p>
        </div>
        <button onClick={handleLogout} className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10">
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}