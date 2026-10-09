import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  GraduationCap,
  LayoutDashboard,
  Users,
  UserCheck,
  BookOpen,
  CalendarCheck,
  FileCheck2,
  Award,
  BarChart3,
  Settings,
  X,
  Clock,
} from 'lucide-react';

export default function Sidebar({ mobileOpen, setMobileOpen }) {
  const mainNavItems = [
    { name: 'Overview', path: '/dashboard', icon: LayoutDashboard, exact: true },
    { name: 'Students', path: '/dashboard/students', icon: Users, badge: 'Phase 4' },
    { name: 'Faculty', path: '/dashboard/faculty', icon: UserCheck, badge: 'Phase 6' },
    { name: 'Courses', path: '/dashboard/courses', icon: BookOpen, badge: 'Phase 4' },
    { name: 'Attendance', path: '/dashboard/attendance', icon: CalendarCheck, badge: 'Phase 5' },
    { name: 'Exams', path: '/dashboard/exams', icon: FileCheck2, badge: 'Phase 5' },
    { name: 'Results', path: '/dashboard/results', icon: Award, badge: 'Phase 5' },
    { name: 'Reports', path: '/dashboard/reports', icon: BarChart3, badge: 'Phase 6' },
  ];

  const sidebarContent = (
    <div className="h-full flex flex-col justify-between bg-white border-r border-slate-200/80 w-64 p-4 text-slate-800">
      {/* Top Header / Logo */}
      <div className="space-y-6">
        <div className="flex items-center justify-between px-2 pt-1">
          <NavLink
            to="/"
            className="flex items-center space-x-2.5 rounded-lg p-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <div className="p-2 bg-blue-600 text-white rounded-xl shadow-xs">
              <GraduationCap className="w-5 h-5" />
            </div>
            <span className="text-lg font-bold text-slate-900 tracking-tight">
              Campus<span className="text-blue-600">Flow</span>
            </span>
          </NavLink>

          {/* Close button for Mobile */}
          <button
            onClick={() => setMobileOpen(false)}
            className="md:hidden p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Main Navigation */}
        <nav className="space-y-1" aria-label="Dashboard Navigation">
          <div className="px-2 text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
            Main Menu
          </div>
          {mainNavItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.path}
                end={item.exact}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 font-bold'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`
                }
              >
                <div className="flex items-center space-x-3">
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.name}</span>
                </div>
                {item.badge && (
                  <span className="text-[10px] font-medium bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded-md border border-slate-200/60">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Bottom Area: Settings & System Status */}
      <div className="space-y-3 pt-4 border-t border-slate-100">
        <NavLink
          to="/dashboard/settings"
          onClick={() => setMobileOpen(false)}
          className={({ isActive }) =>
            `flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
              isActive
                ? 'bg-blue-50 text-blue-700 font-bold'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`
          }
        >
          <div className="flex items-center space-x-3">
            <Settings className="w-4 h-4 shrink-0" />
            <span>Settings</span>
          </div>
          <span className="text-[10px] font-medium bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded-md border border-slate-200/60">
            Phase 6
          </span>
        </NavLink>

        {/* Demo Indicator Box */}
        <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl space-y-1">
          <div className="flex items-center space-x-1.5 text-slate-700 font-semibold text-[11px]">
            <Clock className="w-3.5 h-3.5 text-blue-600" />
            <span>Phase 2.1 Demo</span>
          </div>
          <p className="text-[10px] text-slate-500 leading-tight">
            Frontend App Shell Active. Backend features coming in later phases.
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden md:block shrink-0 h-screen sticky top-0">
        {sidebarContent}
      </aside>

      {/* Mobile Slide-Over Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <div className="fixed inset-0 z-50 md:hidden flex">
            {/* Dark Overlay Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs"
              aria-hidden="true"
            />

            {/* Sliding Sidebar Panel */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative z-10 h-full"
            >
              {sidebarContent}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}