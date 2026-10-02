import React from 'react';
import { GraduationCap, ShieldCheck, Layers, Sparkles } from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen bg-[var(--color-surface-bg)] text-[var(--color-text-main)] flex flex-col items-center justify-center p-6">
      <main className="w-full max-w-2xl bg-[var(--color-surface-card)] border border-[var(--color-surface-border)] rounded-2xl shadow-sm p-8 space-y-6">
        
        {/* Header / Brand Badge */}
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">CampusFlow</h1>
            <p className="text-sm text-slate-500">Design Foundation & Token Preview</p>
          </div>
        </div>

        {/* Info Box */}
        <p className="text-slate-600 text-sm leading-relaxed">
          Tailwind CSS configured with Vite integration. The palette uses restrained blue primary tones and indigo accents on a clean neutral canvas.
        </p>

        {/* Color Palette Samples */}
        <div className="space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Color System</span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 bg-blue-600 text-white rounded-lg text-center text-xs font-medium">Brand Primary</div>
            <div className="p-3 bg-indigo-600 text-white rounded-lg text-center text-xs font-medium">Accent Indigo</div>
            <div className="p-3 bg-slate-100 text-slate-800 rounded-lg text-center text-xs font-medium border border-slate-200">Neutral Light</div>
            <div className="p-3 bg-slate-900 text-white rounded-lg text-center text-xs font-medium">Neutral Dark</div>
          </div>
        </div>

        {/* Button & Element Samples */}
        <div className="space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">UI Controls</span>
          <div className="flex flex-wrap gap-3">
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-lg transition-colors shadow-xs">
              Primary Action
            </button>
            <button className="px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-medium text-sm rounded-lg transition-colors">
              Secondary Accent
            </button>
            <button className="px-4 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium text-sm rounded-lg transition-colors">
              Outline Control
            </button>
          </div>
        </div>

        {/* Feature Badges */}
        <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-4 text-xs text-slate-500">
          <div className="flex items-center space-x-1.5">
            <ShieldCheck className="w-4 h-4 text-blue-500" />
            <span>Accessible Contrast</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <Layers className="w-4 h-4 text-indigo-500" />
            <span>Modular Tokens</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Motion Friendly</span>
          </div>
        </div>

      </main>
    </div>
  );
}