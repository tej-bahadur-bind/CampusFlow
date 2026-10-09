import { GraduationCap } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 text-xs py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Col */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center space-x-2">
              <div className="p-1.5 bg-blue-600 text-white rounded-lg">
                <GraduationCap className="w-4 h-4" />
              </div>
              <span className="text-base font-bold text-white tracking-tight">CampusFlow</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Unified student management solution for modern higher education institutions.
            </p>
          </div>

          {/* Nav Links */}
          <div className="space-y-2">
            <h4 className="text-white font-semibold uppercase tracking-wider text-[11px]">Platform</h4>
            <ul className="space-y-1.5">
              <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a></li>
              <li><a href="#roles" className="hover:text-white transition-colors">Role Security</a></li>
              <li><a href="#preview" className="hover:text-white transition-colors">Dashboard Preview</a></li>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="text-white font-semibold uppercase tracking-wider text-[11px]">Resources</h4>
            <ul className="space-y-1.5">
              <li><span className="text-slate-500 cursor-not-allowed">Documentation</span></li>
              <li><span className="text-slate-500 cursor-not-allowed">API Reference</span></li>
              <li><span className="text-slate-500 cursor-not-allowed">Privacy Policy</span></li>
            </ul>
          </div>

          {/* Disclaimer */}
          <div className="space-y-2">
            <h4 className="text-white font-semibold uppercase tracking-wider text-[11px]">Project Disclaimer</h4>
            <p className="text-slate-400 leading-relaxed">
              CampusFlow is an open-source academic demonstration project. All student metrics and institutional data shown are for presentation purposes only.
            </p>
          </div>

        </div>

        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500">
          <p>© {new Date().getFullYear()} CampusFlow System. All rights reserved.</p>
          <p>Built with React, Vite & Tailwind CSS</p>
        </div>

      </div>
    </footer>
  );
}