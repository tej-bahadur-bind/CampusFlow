import { useEffect, useState } from 'react';
import { Award, Plus, Search, CheckCircle2, AlertCircle, FileSpreadsheet, Download } from 'lucide-react';
import { API_BASE_URL } from '../../config';

export default function ResultsManagement() {
  const [results, setResults] = useState([]);
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [statusMsg, setStatusMsg] = useState({ type: '', text: '' });

  const [formData, setFormData] = useState({
    userId: '',
    courseId: '',
    examName: 'Mid-Semester Exam',
    marksObtained: '',
    totalMarks: '100',
    grade: 'A',
  });

  // Reusable refetch function for after form submission
  const loadResults = async () => {
    try {
      const [resultsRes, studentsRes, coursesRes] = await Promise.all([
        fetch(`${API_BASE_URL}/results`),
        fetch(`${API_BASE_URL}/students`),
        fetch(`${API_BASE_URL}/courses`),
      ]);

      if (resultsRes.ok) setResults(await resultsRes.json());
      if (studentsRes.ok) setStudents(await studentsRes.json());
      if (coursesRes.ok) setCourses(await coursesRes.json());
    } catch (err) {
      console.error('Failed to fetch results data:', err);
    }
  };

  // Initial load inside useEffect with cleanup flag to satisfy ESLint
  useEffect(() => {
    let ignore = false;

    async function initFetch() {
      try {
        const [resultsRes, studentsRes, coursesRes] = await Promise.all([
          fetch(`${API_BASE_URL}/results`),
          fetch(`${API_BASE_URL}/students`),
          fetch(`${API_BASE_URL}/courses`),
        ]);

        const resultsData = resultsRes.ok ? await resultsRes.json() : [];
        const studentsData = studentsRes.ok ? await studentsRes.json() : [];
        const coursesData = coursesRes.ok ? await coursesRes.json() : [];

        if (!ignore) {
          setResults(Array.isArray(resultsData) ? resultsData : []);
          setStudents(Array.isArray(studentsData) ? studentsData : []);
          setCourses(Array.isArray(coursesData) ? coursesData : []);
          setLoading(false);
        }
      } catch (err) {
        console.error('Failed to load results dashboard:', err);
        if (!ignore) setLoading(false);
      }
    }

    initFetch();

    return () => {
      ignore = true;
    };
  }, []);

  // Calculate grade automatically from percentage score
  const computeGrade = (obtained, total) => {
    const mark = parseFloat(obtained);
    const max = parseFloat(total);
    if (isNaN(mark) || isNaN(max) || max <= 0) return 'A';
    const pct = (mark / max) * 100;
    if (pct >= 90) return 'A+';
    if (pct >= 80) return 'A';
    if (pct >= 70) return 'B+';
    if (pct >= 60) return 'B';
    if (pct >= 50) return 'C';
    return 'F';
  };

  const handleMarksChange = (field, value) => {
    const updated = { ...formData, [field]: value };
    const autoGrade = computeGrade(
      field === 'marksObtained' ? value : formData.marksObtained,
      field === 'totalMarks' ? value : formData.totalMarks
    );
    updated.grade = autoGrade;
    setFormData(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMsg({ type: '', text: '' });

    try {
      const res = await fetch(`${API_BASE_URL}/results`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-role': 'Admin',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to publish grade');

      setStatusMsg({ type: 'success', text: 'Grade record published successfully!' });
      setShowModal(false);
      setFormData({
        userId: '',
        courseId: '',
        examName: 'Mid-Semester Exam',
        marksObtained: '',
        totalMarks: '100',
        grade: 'A',
      });
      loadResults();
    } catch (err) {
      setStatusMsg({ type: 'error', text: err.message });
    }
  };

  const exportToCSV = () => {
    if (filteredResults.length === 0) return;
    const headers = ['Student Name', 'Course Code', 'Course Title', 'Exam Name', 'Marks Obtained', 'Total Marks', 'Grade'];
    const rows = filteredResults.map((r) => [
      `"${r.student_name || r.user_id}"`,
      `"${r.course_code}"`,
      `"${r.course_title}"`,
      `"${r.exam_name}"`,
      r.marks_obtained,
      r.total_marks,
      `"${r.grade}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `CampusFlow_Results_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredResults = results.filter(
    (r) =>
      r.student_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.course_code?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.course_title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getGradeBadgeStyle = (grade) => {
    const g = (grade || '').toUpperCase();
    if (['A+', 'A'].includes(g)) return 'bg-emerald-100 text-emerald-800 border-emerald-200';
    if (['B+', 'B'].includes(g)) return 'bg-blue-100 text-blue-800 border-blue-200';
    if (g === 'C') return 'bg-amber-100 text-amber-800 border-amber-200';
    return 'bg-red-100 text-red-800 border-red-200';
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Academic Results Management</h1>
          <p className="text-sm text-slate-500">Publish and manage student examination marks, grades, and transcripts.</p>
        </div>
        <div className="flex items-center gap-2">
          {filteredResults.length > 0 && (
            <button
              onClick={exportToCSV}
              className="inline-flex items-center gap-2 bg-slate-100 text-slate-700 border border-slate-200 px-4 py-2.5 rounded-xl text-xs font-bold hover:bg-slate-200 transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Export CSV</span>
            </button>
          )}
          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-xl text-xs font-bold hover:bg-blue-700 transition-colors cursor-pointer shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Publish New Grade</span>
          </button>
        </div>
      </div>

      {statusMsg.text && (
        <div
          className={`p-4 rounded-xl border flex items-center gap-2 text-xs font-semibold ${
            statusMsg.type === 'success' ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-red-50 border-red-200 text-red-700'
          }`}
        >
          {statusMsg.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
          <span>{statusMsg.text}</span>
        </div>
      )}

      {/* Filter / Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-3">
        <Search className="w-4 h-4 text-slate-400 shrink-0" />
        <input
          type="text"
          placeholder="Search by student name or course code..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full text-xs outline-none bg-transparent"
        />
      </div>

      {/* Results Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-blue-600" />
            <h2 className="font-bold text-slate-900">Published Academic Grades ({filteredResults.length})</h2>
          </div>
        </div>

        {loading ? (
          <p className="p-8 text-center text-slate-500 text-xs">Loading published results...</p>
        ) : filteredResults.length === 0 ? (
          <div className="p-8 text-center space-y-2">
            <FileSpreadsheet className="w-8 h-8 text-slate-300 mx-auto" />
            <p className="text-sm font-semibold text-slate-700">No academic results found</p>
            <p className="text-xs text-slate-400">Click "Publish New Grade" to add student performance records.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 text-xs font-semibold text-slate-500 uppercase border-b border-slate-100">
                <tr>
                  <th className="p-4">Student</th>
                  <th className="p-4">Course</th>
                  <th className="p-4">Exam Name</th>
                  <th className="p-4">Marks</th>
                  <th className="p-4">Grade</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredResults.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50/50">
                    <td className="p-4 font-semibold text-slate-900">{r.student_name || `Student ID: ${r.user_id}`}</td>
                    <td className="p-4">
                      <span className="font-bold text-blue-600 mr-2">{r.course_code}</span>
                      <span className="text-xs text-slate-500">{r.course_title}</span>
                    </td>
                    <td className="p-4 text-xs text-slate-500">{r.exam_name}</td>
                    <td className="p-4 font-bold text-slate-900">
                      {r.marks_obtained} <span className="text-xs font-normal text-slate-400">/ {r.total_marks}</span>
                    </td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-md text-xs font-bold border ${getGradeBadgeStyle(r.grade)}`}>
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

      {/* Modal for Adding Grades */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <h2 className="text-lg font-bold text-slate-900">Record Student Grade</h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1 uppercase">Select Student</label>
                <select
                  required
                  value={formData.userId}
                  onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
                  className="w-full p-2.5 text-xs border border-slate-200 rounded-xl outline-none bg-white"
                >
                  <option value="">-- Select Student --</option>
                  {students.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} ({s.email})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1 uppercase">Select Course</label>
                <select
                  required
                  value={formData.courseId}
                  onChange={(e) => setFormData({ ...formData, courseId: e.target.value })}
                  className="w-full p-2.5 text-xs border border-slate-200 rounded-xl outline-none bg-white"
                >
                  <option value="">-- Select Course --</option>
                  {courses.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.course_code} - {c.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1 uppercase">Exam Name</label>
                <input
                  type="text"
                  required
                  placeholder="Final Examination"
                  value={formData.examName}
                  onChange={(e) => setFormData({ ...formData, examName: e.target.value })}
                  className="w-full p-2.5 text-xs border border-slate-200 rounded-xl outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1 uppercase">Marks Obtained</label>
                  <input
                    type="number"
                    required
                    placeholder="85"
                    value={formData.marksObtained}
                    onChange={(e) => handleMarksChange('marksObtained', e.target.value)}
                    className="w-full p-2.5 text-xs border border-slate-200 rounded-xl outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1 uppercase">Total Marks</label>
                  <input
                    type="number"
                    required
                    value={formData.totalMarks}
                    onChange={(e) => handleMarksChange('totalMarks', e.target.value)}
                    className="w-full p-2.5 text-xs border border-slate-200 rounded-xl outline-none"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-xs font-semibold text-slate-600 uppercase">Grade</label>
                  <span className="text-[10px] text-blue-600 font-semibold">(Auto-calculated)</span>
                </div>
                <select
                  value={formData.grade}
                  onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                  className="w-full p-2.5 text-xs border border-slate-200 rounded-xl outline-none bg-white font-bold text-slate-800"
                >
                  <option value="A+">A+ (90%+)</option>
                  <option value="A">A (80%+)</option>
                  <option value="B+">B+ (70%+)</option>
                  <option value="B">B (60%+)</option>
                  <option value="C">C (50%+)</option>
                  <option value="F">F (&lt;50%)</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 cursor-pointer"
                >
                  Publish Grade
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}