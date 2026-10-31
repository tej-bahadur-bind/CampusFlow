import { useEffect, useState } from 'react';
import { Award, BookOpen, Calendar, CheckCircle2, FileText, GraduationCap, TrendingUp } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { API_BASE_URL } from '../config';

export default function StudentPortal() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'results' | 'courses'
  const [attendance, setAttendance] = useState([]);
  const [courses, setCourses] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    async function fetchPortalData() {
      if (!user?.id) return;

      try {
        const today = new Date().toISOString().slice(0, 10);

        const [attendanceRes, coursesRes, resultsRes] = await Promise.all([
          fetch(`${API_BASE_URL}/attendance?date=${today}`),
          fetch(`${API_BASE_URL}/courses?userId=${user.id}`),
          fetch(`${API_BASE_URL}/results?userId=${user.id}`),
        ]);

        const attendanceData = attendanceRes.ok ? await attendanceRes.json() : [];
        const coursesData = coursesRes.ok ? await coursesRes.json() : [];
        const resultsData = resultsRes.ok ? await resultsRes.json() : [];

        if (!ignore) {
          setAttendance(Array.isArray(attendanceData) ? attendanceData : []);
          setCourses(Array.isArray(coursesData) ? coursesData.filter((c) => c.is_enrolled) : []);
          setResults(Array.isArray(resultsData) ? resultsData : []);
        }
      } catch (err) {
        console.error('Failed to load student portal data:', err);
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    fetchPortalData();

    return () => {
      ignore = true;
    };
  }, [user?.id]);

  // Calculate Academic Summary Metrics
  const totalMarksObtained = results.reduce((acc, r) => acc + Number(r.marks_obtained || 0), 0);
  const totalMaxMarks = results.reduce((acc, r) => acc + Number(r.total_marks || 100), 0);
  const aggregatePercentage = totalMaxMarks > 0 ? ((totalMarksObtained / totalMaxMarks) * 100).toFixed(1) : 0;

  const getGradeBadge = (grade) => {
    const g = (grade || '').toUpperCase();
    if (['A+', 'A', 'O'].includes(g)) return 'bg-emerald-100 text-emerald-800 border-emerald-200';
    if (['B+', 'B'].includes(g)) return 'bg-blue-100 text-blue-800 border-blue-200';
    if (['C', 'P'].includes(g)) return 'bg-amber-100 text-amber-800 border-amber-200';
    return 'bg-red-100 text-red-800 border-red-200';
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Student Personal Portal</h1>
          <p className="text-sm text-slate-500">
            Academic transcript, course ledger, and personal attendance history for <strong>{user?.email}</strong>
          </p>
        </div>

        {/* Navigation Switcher */}
        <div className="flex bg-slate-200/60 p-1 rounded-2xl self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              activeTab === 'overview' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Attendance
          </button>
          <button
            onClick={() => setActiveTab('results')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              activeTab === 'results' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Academic Results
          </button>
          <button
            onClick={() => setActiveTab('courses')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              activeTab === 'courses' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            My Courses ({courses.length})
          </button>
        </div>
      </div>

      {/* Overview / Attendance View */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <p className="text-xs font-semibold text-slate-400 uppercase">Attendance Rate</p>
              <p className="text-3xl font-extrabold text-emerald-600 mt-1">100.0%</p>
              <p className="text-xs text-slate-400 mt-1">Active status</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <p className="text-xs font-semibold text-slate-400 uppercase">Classes Present</p>
              <p className="text-3xl font-extrabold text-slate-900 mt-1">{attendance.filter((a) => a.status === 'Present').length}</p>
              <p className="text-xs text-slate-400 mt-1">Total recorded</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <p className="text-xs font-semibold text-slate-400 uppercase">Total Logged Sessions</p>
              <p className="text-3xl font-extrabold text-slate-900 mt-1">{attendance.length}</p>
              <p className="text-xs text-slate-400 mt-1">Semester ledger</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              <h2 className="font-bold text-slate-900">Recent Attendance History</h2>
            </div>
            {loading ? (
              <p className="p-8 text-center text-slate-500">Loading attendance data...</p>
            ) : attendance.length === 0 ? (
              <p className="p-8 text-center text-slate-500 text-sm">No attendance sessions recorded today.</p>
            ) : (
              <div className="divide-y divide-slate-100">
                {attendance.map((item) => (
                  <div key={item.id} className="p-4 flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-sm text-slate-900">{item.name}</p>
                      <p className="text-xs text-slate-400">{item.date}</p>
                    </div>
                    <span className="px-3 py-1 rounded-md text-xs font-bold bg-emerald-100 text-emerald-800">
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Academic Results View */}
      {activeTab === 'results' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase">Aggregate Percentage</p>
                <p className="text-3xl font-extrabold text-blue-600 mt-1">{loading ? '...' : `${aggregatePercentage}%`}</p>
                <p className="text-xs text-slate-400 mt-1">Overall performance</p>
              </div>
              <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                <TrendingUp className="w-6 h-6" />
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase">Total Score</p>
                <p className="text-3xl font-extrabold text-slate-900 mt-1">
                  {loading ? '...' : `${totalMarksObtained} / ${totalMaxMarks}`}
                </p>
                <p className="text-xs text-slate-400 mt-1">Evaluated marks</p>
              </div>
              <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
                <Award className="w-6 h-6" />
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase">Evaluated Subjects</p>
                <p className="text-3xl font-extrabold text-slate-900 mt-1">{loading ? '...' : results.length}</p>
                <p className="text-xs text-slate-400 mt-1">Exams recorded</p>
              </div>
              <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
                <FileText className="w-6 h-6" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-blue-600" />
              <h2 className="font-bold text-slate-900">Academic Scorecard & Transcript</h2>
            </div>

            {loading ? (
              <p className="p-8 text-center text-slate-500">Loading academic results...</p>
            ) : results.length === 0 ? (
              <div className="p-8 text-center space-y-2">
                <FileText className="w-8 h-8 text-slate-300 mx-auto" />
                <p className="text-sm font-semibold text-slate-700">No examination results published yet</p>
                <p className="text-xs text-slate-400">Faculty grade submissions will automatically appear here.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-600">
                  <thead className="bg-slate-50 text-xs font-semibold text-slate-500 uppercase border-b border-slate-100">
                    <tr>
                      <th className="p-4">Course Code</th>
                      <th className="p-4">Subject Title</th>
                      <th className="p-4">Examination</th>
                      <th className="p-4">Marks Obtained</th>
                      <th className="p-4">Grade</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {results.map((r) => (
                      <tr key={r.id} className="hover:bg-slate-50/50">
                        <td className="p-4 font-bold text-blue-600">{r.course_code}</td>
                        <td className="p-4 font-semibold text-slate-900">{r.course_title}</td>
                        <td className="p-4 text-xs text-slate-500">{r.exam_name}</td>
                        <td className="p-4 font-bold text-slate-900">
                          {r.marks_obtained} <span className="text-xs font-normal text-slate-400">/ {r.total_marks}</span>
                        </td>
                        <td className="p-4">
                          <span className={`px-2.5 py-1 rounded-md text-xs font-bold border ${getGradeBadge(r.grade)}`}>
                            {r.grade}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Enrolled Courses View */}
      {activeTab === 'courses' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses.length === 0 ? (
            <div className="col-span-full bg-white p-8 rounded-2xl border border-slate-200 text-center space-y-2">
              <BookOpen className="w-8 h-8 text-slate-300 mx-auto" />
              <p className="text-sm font-semibold text-slate-700">No active course enrollments</p>
              <p className="text-xs text-slate-400">Visit the Courses catalog to enroll in active academic subjects.</p>
            </div>
          ) : (
            courses.map((c) => (
              <div key={c.id} className="bg-white p-5 rounded-2xl border border-emerald-300 ring-2 ring-emerald-50 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-blue-600 bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-md">
                    {c.course_code}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">{c.credits} Credits</span>
                </div>
                <h3 className="font-bold text-slate-900 text-base">{c.title}</h3>
                <p className="text-xs text-slate-500">{c.department}</p>
                <div className="pt-2 flex items-center gap-1.5 text-xs text-emerald-700 font-semibold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Enrolled & Active</span>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}