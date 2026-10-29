import { useEffect, useState } from 'react';
import { Plus, Trash2, X, BookOpen, CheckCircle, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { API_BASE_URL } from '../config';

const API_URL = `${API_BASE_URL}/courses`;

export default function Courses() {
  const { user } = useAuth();
  const userRole = user?.role || 'Admin';
  const normalizedRole = userRole.toLowerCase();

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [formError, setFormError] = useState('');
  const [actionLoading, setActionLoading] = useState(null);

  const [formData, setFormData] = useState({
    course_code: '',
    title: '',
    department: 'Computer Science',
    credits: '3',
  });

  // Helper function to re-fetch data after user actions (submit / delete / enroll)
  const reloadCourses = async () => {
    try {
      const url = user?.id ? `${API_URL}?userId=${user.id}` : API_URL;
      const res = await fetch(url);
      const data = await res.json();
      if (res.ok) {
        setCourses(Array.isArray(data) ? data : []);
      }
    } catch (err) {
      console.error('Failed to fetch courses:', err);
    }
  };

  // Safe initial data fetching inside useEffect with cancellation check
  useEffect(() => {
    let ignore = false;

    async function fetchInitialData() {
      try {
        const url = user?.id ? `${API_URL}?userId=${user.id}` : API_URL;
        const res = await fetch(url);
        const data = await res.json();
        if (!ignore && res.ok) {
          setCourses(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        console.error('Failed to fetch courses:', err);
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    fetchInitialData();

    return () => {
      ignore = true;
    };
  }, [user?.id]);

  // Handler for student course enrollment/unenrollment toggle
  const handleEnrollToggle = async (courseId, currentlyEnrolled) => {
    if (!user?.id) return;
    setActionLoading(courseId);

    const endpoint = currentlyEnrolled ? `${API_URL}/unenroll` : `${API_URL}/enroll`;

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, courseId }),
      });

      if (!res.ok) throw new Error('Failed to update course selection');
      await reloadCourses();
    } catch (err) {
      alert(err.message || 'Could not update course selection');
    } finally {
      setActionLoading(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-role': userRole,
        },
        body: JSON.stringify({
          ...formData,
          credits: parseInt(formData.credits, 10),
          userRole,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to add course');

      setModalOpen(false);
      await reloadCourses();
    } catch (err) {
      setFormError(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this course offering?')) return;
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers: { 'x-user-role': userRole },
      });
      if (res.ok) await reloadCourses();
    } catch (err) {
      console.error(err);
    }
  };

  const canAddCourse = ['admin', 'teacher', 'faculty'].includes(normalizedRole);
  const canDeleteCourse = ['admin'].includes(normalizedRole);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Course & Subject Catalog</h1>
          <p className="text-sm text-slate-500">Manage academic subjects, course codes, and department credits</p>
        </div>
        {canAddCourse && (
          <button
            onClick={() => {
              setFormData({ course_code: '', title: '', department: 'Computer Science', credits: '3' });
              setFormError('');
              setModalOpen(true);
            }}
            className="inline-flex items-center space-x-2 bg-slate-900 text-white px-4 py-2.5 rounded-xl font-medium hover:bg-slate-800 transition-colors cursor-pointer text-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Course</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          <p className="col-span-full text-center py-8 text-slate-500">Loading catalog...</p>
        ) : courses.length === 0 ? (
          <p className="col-span-full text-center py-8 text-slate-500">No courses listed yet.</p>
        ) : (
          courses.map((c) => (
            <div key={c.id} className={`p-5 rounded-2xl border transition-all bg-white flex flex-col justify-between space-y-4 ${
              c.is_enrolled ? 'border-emerald-300 ring-2 ring-emerald-100' : 'border-slate-200 shadow-sm'
            }`}>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-blue-600 bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-md">
                    {c.course_code}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">{c.credits} Credits</span>
                </div>
                <h3 className="font-bold text-slate-900 text-base">{c.title}</h3>
                <p className="text-xs text-slate-500">{c.department}</p>
              </div>

              {/* Student Course Selection Toggle */}
              {normalizedRole === 'student' && (
                <button
                  type="button"
                  disabled={actionLoading === c.id}
                  onClick={() => handleEnrollToggle(c.id, c.is_enrolled)}
                  className={`w-full py-2 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    c.is_enrolled
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                      : 'bg-slate-900 text-white hover:bg-slate-800'
                  }`}
                >
                  {actionLoading === c.id ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : c.is_enrolled ? (
                    <>
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                      <span>Enrolled (Click to Unenroll)</span>
                    </>
                  ) : (
                    <>
                      <BookOpen className="w-4 h-4" />
                      <span>Choose / Enroll Course</span>
                    </>
                  )}
                </button>
              )}

              {canDeleteCourse && (
                <div className="pt-3 border-t border-slate-100 flex justify-end">
                  <button onClick={() => handleDelete(c.id)} className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors cursor-pointer">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-lg font-bold text-slate-900">Add Course</h2>
              <button onClick={() => setModalOpen(false)} className="cursor-pointer">
                <X className="w-5 h-5 text-slate-400 hover:text-slate-600" />
              </button>
            </div>
            {formError && <div className="p-3 text-xs bg-red-50 text-red-600 rounded-xl">{formError}</div>}
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">COURSE CODE</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. CS301"
                  value={formData.course_code}
                  onChange={(e) => setFormData({ ...formData, course_code: e.target.value })}
                  className="w-full p-2.5 text-sm border border-slate-200 rounded-xl outline-none focus:border-slate-900"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">COURSE TITLE</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Database Management Systems"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full p-2.5 text-sm border border-slate-200 rounded-xl outline-none focus:border-slate-900"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">DEPARTMENT</label>
                  <select
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full p-2.5 text-sm border border-slate-200 rounded-xl outline-none focus:border-slate-900 bg-white"
                  >
                    <option>Computer Science</option>
                    <option>Electronics</option>
                    <option>Mechanical</option>
                    <option>Civil</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">CREDITS</label>
                  <input
                    type="number"
                    min="1"
                    max="6"
                    value={formData.credits}
                    onChange={(e) => setFormData({ ...formData, credits: e.target.value })}
                    className="w-full p-2.5 text-sm border border-slate-200 rounded-xl outline-none focus:border-slate-900"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-3 pt-3">
                <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 text-sm text-slate-600 hover:text-slate-900 cursor-pointer">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 text-sm bg-slate-900 hover:bg-slate-800 text-white rounded-xl transition-colors cursor-pointer">
                  Save Course
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}