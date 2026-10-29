import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Play, CheckCircle2, Bell, Clock } from 'lucide-react';
import Button from '../ui/Button';
import campusStudentsImg from '../../assets/campus-students.webp';

export default function Hero() {
  const navigate = useNavigate();

  const handleScrollToHowItWorks = (e) => {
    e.preventDefault();
    const elem = document.querySelector('#how-it-works');
    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-gradient-to-b from-blue-50/40 via-slate-50/50 to-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-6 space-y-6 text-center lg:text-left"
          >
            <div className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
              <span>SMART CAMPUS MANAGEMENT</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              Every Student.{' '}
              <span className="text-blue-600 block sm:inline">Every Record.</span>{' '}
              One Connected Campus.
            </h1>

            <p className="text-slate-600 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Manage student records, attendance, academic performance, courses, and campus communication through one organized platform.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
              <Button
                onClick={() => navigate('/dashboard')}
                variant="primary"
                size="lg"
                icon={ArrowRight}
                iconPosition="right"
                className="w-full sm:w-auto"
              >
                Explore Platform
              </Button>
              <Button
                href="#how-it-works"
                onClick={handleScrollToHowItWorks}
                variant="outline"
                size="lg"
                icon={Play}
                className="w-full sm:w-auto"
              >
                See How It Works
              </Button>
            </div>

            <div className="pt-4 flex items-center justify-center lg:justify-start space-x-6 text-xs text-slate-500 font-medium">
              <div className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Web Browser Accessible</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Role-Based Permissions</span>
              </div>
            </div>
          </motion.div>

          {/* Right Visual: UI Showcase Card + Campus Context Pill */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-6"
          >
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              
              {/* Main Mini Card */}
              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-lg p-6 space-y-6">
                
                {/* Header Strip */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-sm">
                      JD
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="text-sm font-semibold text-slate-900">Jane Doe</h3>
                        <span className="text-[10px] font-semibold bg-amber-50 text-amber-700 border border-amber-200/60 px-1.5 py-0.5 rounded-md">
                          Demo Profile
                        </span>
                      </div>
                      <p className="text-xs text-slate-500">CS Dept • B.Tech Year 3</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-full text-xs font-medium">
                    Active Student
                  </span>
                </div>

                {/* Grid Overview */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-xs text-slate-500 font-medium">Attendance Rate</span>
                    <p className="text-xl font-bold text-slate-900 mt-1">94.8%</p>
                    <span className="text-[11px] text-emerald-600 font-medium">↑ 2.1% sample term</span>
                  </div>

                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-xs text-slate-500 font-medium">Current GPA</span>
                    <p className="text-xl font-bold text-slate-900 mt-1">3.82</p>
                    <span className="text-[11px] text-slate-500 font-medium">Sample grade calculation</span>
                  </div>
                </div>

                {/* Mini Schedule Item */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
                    <span>UPCOMING CLASS (DEMO)</span>
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                  </div>
                  <div className="p-3 bg-blue-50/60 border border-blue-100 rounded-xl flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold text-blue-950">Data Structures & Algorithms</p>
                      <p className="text-[11px] text-blue-700">10:30 AM • Lab Hall 4B</p>
                    </div>
                    <span className="text-xs font-semibold text-blue-600 bg-white px-2 py-1 rounded-md border border-blue-100">
                      In 20m
                    </span>
                  </div>
                </div>

                {/* Mini Visual Chart Bar */}
                <div className="space-y-2">
                  <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">
                    Weekly Attendance Trend (Demo)
                  </span>
                  <div className="flex items-end justify-between gap-2 h-16 pt-2" aria-label="Sample attendance chart">
                    {[70, 90, 85, 100, 95].map((val, idx) => (
                      <div key={idx} className="flex-1 bg-slate-100 rounded-t-md relative h-full flex items-end">
                        <div
                          className="w-full bg-blue-600 rounded-t-md transition-all duration-300"
                          style={{ height: `${val}%` }}
                        />
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Floating Notification Badge with Local Campus Photo Accent */}
              <div className="absolute -bottom-4 -left-4 bg-white border border-slate-200/90 shadow-md rounded-xl p-2.5 flex items-center space-x-3 hidden sm:flex">
                <img
                  src={campusStudentsImg}
                  alt="University students collaborating on campus grounds"
                  className="w-10 h-10 rounded-lg object-cover border border-slate-100"
                />
                <div className="pr-2">
                  <div className="flex items-center space-x-1.5">
                    <Bell className="w-3.5 h-3.5 text-blue-600" />
                    <p className="text-xs font-semibold text-slate-900">Student Community Connected</p>
                  </div>
                  <p className="text-[11px] text-slate-500">Real-time notice distribution</p>
                </div>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}