import { Menu, Search, Bell, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Topbar({ onMobileMenuToggle, activeTitle = 'Overview' }) {
  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-6 py-3.5 flex items-center justify-between">
      
      {/* Left: Mobile Toggle & Page Title */}
      <div className="flex items-center space-x-3">
        <button
          onClick={onMobileMenuToggle}
          className="md:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          aria-label="Open navigation sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <h1 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight flex items-center space-x-2">
            <span>{activeTitle}</span>
          </h1>
          <p className="text-[11px] text-slate-500 hidden sm:block">
            CampusFlow Management Workspace
          </p>
        </div>
      </div>

      {/* Right: Search Placeholder, Notifications, Profile, Public Site Link */}
      <div className="flex items-center space-x-2 sm:space-x-4">
        
        {/* Search Input Placeholder */}
        <div className="relative hidden md:block">
          <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            disabled
            placeholder="Search students, courses... (UI placeholder)"
            className="pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200/90 rounded-lg text-xs w-64 text-slate-600 placeholder:text-slate-400 cursor-not-allowed focus:outline-none"
          />
        </div>

        {/* Return to Landing Page Link */}
        <Link
          to="/"
          className="hidden sm:inline-flex items-center space-x-1 text-xs font-semibold text-slate-600 hover:text-blue-600 bg-slate-100 hover:bg-slate-200/70 px-2.5 py-1.5 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          title="View Public Landing Page"
        >
          <span>Public Site</span>
          <ExternalLink className="w-3 h-3" />
        </Link>

        {/* Notification Icon Button */}
        <button
          disabled
          aria-label="Notifications placeholder"
          className="p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 relative cursor-not-allowed focus:outline-none"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-600 rounded-full" />
        </button>

        <div className="h-4 w-px bg-slate-200 hidden sm:block" />

        {/* Demo User Avatar & Role */}
        <div className="flex items-center space-x-2.5 pl-1">
          <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shadow-2xs">
            AD
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-xs font-bold text-slate-900 leading-tight">Alex Director</p>
            <p className="text-[10px] font-medium text-slate-500">Demo Administrator</p>
          </div>
        </div>

      </div>
    </header>
  );
}