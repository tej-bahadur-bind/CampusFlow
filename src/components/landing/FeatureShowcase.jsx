import { motion } from 'motion/react';
import {
  UserCheck,
  CalendarCheck,
  TrendingUp,
  Building2,
  FileCheck2,
} from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import campusStudentsImg from '../../assets/campus-students.webp';

export default function FeatureShowcase() {
  return (
    <section id="features" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <SectionHeading
          eyebrow="Core Capabilities"
          title="Designed for Academic Precision"
          description="A complete suite of administrative and academic modules built specifically to streamline campus workflows."
        />

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Featured Card with Local Campus Photo */}
          <motion.div
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
            className="md:col-span-2 bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs grid sm:grid-cols-12"
          >
            <div className="p-8 sm:col-span-7 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-xl w-fit">
                  <UserCheck className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Student Records Management</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Maintain centralized, secure student profiles containing academic history, department enrollment, contact details, and status tracking in a clean digital format.
                </p>
              </div>
              <div className="pt-2 flex flex-wrap gap-2 text-xs font-medium text-slate-500">
                <span className="bg-slate-100 px-2.5 py-1 rounded-md">Centralized Database</span>
                <span className="bg-slate-100 px-2.5 py-1 rounded-md">Profile Histories</span>
                <span className="bg-slate-100 px-2.5 py-1 rounded-md">Quick Search</span>
              </div>
            </div>

            {/* Photo Column */}
            <div className="sm:col-span-5 relative min-h-[180px] sm:min-h-full">
              <img
                src={campusStudentsImg}
                alt="University students walking and discussing on modern campus grounds"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-white/20 via-transparent to-transparent" />
            </div>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-2xl border border-slate-200 p-8 shadow-2xs space-y-4"
          >
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl w-fit">
              <CalendarCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Attendance Tracking</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Log daily session attendance with instant percentage calculations and threshold alerts for faculty and admins.
            </p>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-2xl border border-slate-200 p-8 shadow-2xs space-y-4"
          >
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl w-fit">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Academic Performance</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Track grades, cumulative GPA trends, and term evaluations with clear visual breakdowns.
            </p>
          </motion.div>

          {/* Card 4 */}
          <motion.div
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-2xl border border-slate-200 p-8 shadow-2xs space-y-4"
          >
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl w-fit">
              <Building2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Courses & Departments</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Structure academic programs, assign faculty members, and map course prerequisites effortlessly.
            </p>
          </motion.div>

          {/* Card 5 */}
          <motion.div
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-2xl border border-slate-200 p-8 shadow-2xs space-y-4"
          >
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl w-fit">
              <FileCheck2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Examinations & Results</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Record exam scores, publish verified report cards, and minimize manual grading entry errors.
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}