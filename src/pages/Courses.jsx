import { useEffect, useState } from 'react';
import { Plus, Trash2, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const API_URL = 'http://localhost:5000/api/courses';

export default function Courses() {
  const { user } = useAuth();
  const userRole = user?.role || 'Admin';

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [formError, setFormError] = useState('');

  const [formData, setFormData] = useState({
    course_code: '',
    title: '',
    department: 'Computer Science',
    credits: '3',
  });

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      if (res.ok) setCourses(data);
    } catch (err) {
      console.error('Failed to fetch courses:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        if (res.ok && isMounted) setCourses(data);
      } catch (err) {
        console.error(err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadData();
    return () => {
      isMounted = false;
    };
  }, []);

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
        body: JSON.stringify({ ...formData, credits: parseInt(formData.credits, 10), userRole }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to add course');

      setModalOpen(false);
      fetchCourses();
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
      if (res.ok) fetchCourses();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Course & Subject Catalog</h1>
          <p className="text-sm text-slate-500">Manage academic subjects, course codes, and department credits</p>
        </div>
        {['Admin', 'Teacher'].includes(userRole) && (
          <button
            onClick={() => {
              setFormData({ course_code: '', title: '', department: 'Computer Science', credits: '3' });
              setFormError('');
              setModalOpen(true);
            }}
            className="inline-flex items-center space-x-2 bg-slate-900 text-white px-4 py-2.5 rounded-xl font-medium hover:bg-slate-800"
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
            <div key={c.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between space-y-4">
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

              {userRole === 'Admin' && (
                <div className="pt-3 border-t border-slate-100 flex justify-end">
                  <button onClick={() => handleDelete(c.id)} className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-lg font-bold text-slate-900">Add Course</h2>
              <button onClick={() => setModalOpen(false)}>
                <X className="w-5 h-5 text-slate-400" />
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
                  className="w-full p-2.5 text-sm border border-slate-200 rounded-xl outline-none focus:border-blue-500"
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
                  className="w-full p-2.5 text-sm border border-slate-200 rounded-xl outline-none focus:border-blue-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">DEPARTMENT</label>
                  <select
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full p-2.5 text-sm border border-slate-200 rounded-xl outline-none focus:border-blue-500"
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
                    className="w-full p-2.5 text-sm border border-slate-200 rounded-xl outline-none focus:border-blue-500"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-3 pt-3">
                <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 text-sm text-slate-600">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 text-sm bg-slate-900 text-white rounded-xl">
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