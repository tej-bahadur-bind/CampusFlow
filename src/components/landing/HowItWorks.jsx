import React from 'react';
import SectionHeading from '../ui/SectionHeading';

export default function HowItWorks() {
  const steps = [
    {
      step: '01',
      title: 'Register Institution',
      description: 'Set up your campus profile, departments, and administrative preferences.',
    },
    {
      step: '02',
      title: 'Organize Structure',
      description: 'Import student lists, configure course catalogs, and assign faculty roles.',
    },
    {
      step: '03',
      title: 'Track Operations',
      description: 'Record daily attendance, post assignments, and record exam marks continuously.',
    },
    {
      step: '04',
      title: 'Analyze Insights',
      description: 'Generate institutional reports on attendance, grades, and overall student progress.',
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        <SectionHeading
          eyebrow="Simple Implementation"
          title="How CampusFlow Operates"
          description="A straightforward four-step process to transition your campus operations into a modern digital workflow."
        />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          
          {/* Connecting Line on Desktop */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-slate-100 -translate-y-6 z-0" />

          {steps.map((s, idx) => (
            <div key={idx} className="relative z-10 flex flex-col items-center md:items-start text-center md:text-left space-y-3 bg-white p-2">
              <span className="w-12 h-12 rounded-2xl bg-blue-600 text-white font-bold flex items-center justify-center text-sm shadow-xs">
                {s.step}
              </span>
              <h3 className="text-base font-bold text-slate-900 pt-1">{s.title}</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-xs">
                {s.description}
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}