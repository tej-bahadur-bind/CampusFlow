import { useEffect, useState } from 'react';
import { CalendarDays, CheckCircle2, Save, Users, ShieldAlert, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { API_BASE_URL } from '../config';

const STATUS_OPTIONS = [
  { value: 'Present', selected: 'bg-emerald-600 text-white', idle: 'border-emerald-200 text-emerald-700 hover:bg-emerald-50' },
  { value: 'Absent', selected: 'bg-red-600 text-white', idle: 'border-red-200 text-red-700 hover:bg-red-50' },
  { value: 'Late', selected: 'bg-amber-500 text-white', idle: 'border-amber-200 text-amber-800 hover:bg-amber-50' },
];

function getLocalDate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export default function Attendance() {
  const { user } = useAuth();
  
  // Default strictly to 'student' to avoid granting temporary admin rights on initial render
  const rawRole = user?.role || 'student';
  const normalizedRole = rawRole.toLowerCase();

  const isManagementRole = ['admin', 'teacher', 'faculty'].includes(normalizedRole);

  const [date, setDate] = useState(getLocalDate);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    async function fetchAttendanceData() {
      try {
        const [studentsResponse, attendanceResponse] = await Promise.all([
          fetch(`${API_BASE_URL}/students`, { signal: controller.signal }),
          fetch(`${API_BASE_URL}/attendance?date=${date}`, { signal: controller.signal }),
        ]);

        if (!studentsResponse.ok || !attendanceResponse.ok) {
          throw new Error('Could not load students or attendance data.');
        }

        const studentData = await studentsResponse.json();
        const attendanceData = await attendanceResponse.json();

        const attendanceByStudent = new Map(
          attendanceData.map((record) => [
            String(record.student_id),
            record,
          ])
        );

        setStudents(
          studentData.map((student) => {
            const record = attendanceByStudent.get(String(student.id));

            return {
              id: student.id,
              name: student.name,
              roll_number: student.roll_number ?? '',
              status: record?.status ?? '',
              remarks: record?.remarks ?? '',
            };
          })
        );
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(
            err.message === 'Failed to fetch'
              ? 'Cannot connect to backend server. Render may be spinning up.'
              : err.message || 'Failed to load attendance.'
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchAttendanceData();

    return () => controller.abort();
  }, [date]);

  function handleDateChange(newEventDate) {
    setDate(newEventDate);
    setLoading(true);
    setError('');
    setMessage('');
  }

  function updateStudent(studentId, changes) {
    if (!isManagementRole) return;

    setStudents((current) =>
      current.map((student) =>
        student.id === studentId
          ? { ...student, ...changes }
          : student
      )
    );

    setMessage('');
  }

  async function saveAttendance() {
    if (!isManagementRole) {
      setError('Access Denied: Only Teachers and Admins can record attendance.');
      return;
    }

    if (students.length === 0) {
      setError('There are no students to save.');
      return;
    }

    const unmarked = students.filter((student) => !student.status);

    if (unmarked.length > 0) {
      setError(`Please mark attendance for all students. ${unmarked.length} remain unmarked.`);
      return;
    }

    setSaving(true);
    setError('');
    setMessage('');

    try {
      const response = await fetch(`${API_BASE_URL}/attendance`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-role': rawRole,
        },
        body: JSON.stringify({
          date,
          userRole: rawRole,
          records: students.map((student) => ({
            student_id: student.id,
            status: student.status,
            remarks: student.remarks ? student.remarks.trim() : null,
          })),
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Could not save attendance.');
      }

      setMessage(`Attendance saved successfully for ${result.saved || students.length} students.`);
    } catch (err) {
      setError(err.message || 'Failed to save attendance.');
    } finally {
      setSaving(false);
    }
  }

  const counts = students.reduce(
    (total, student) => {
      if (student.status) total[student.status] += 1;
      else total.Unmarked += 1;
      return total;
    },
    { Present: 0, Absent: 0, Late: 0, Unmarked: 0 }
  );

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              CampusFlow
            </p>
            <h1 className="mt-1 text-3xl font-bold text-slate-900">
              Attendance Management
            </h1>
            <p className="mt-2 text-slate-500">
              Record and review daily student attendance.
            </p>
          </div>

          <label className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
            <CalendarDays className="h-5 w-5 text-blue-600" />
            <span className="text-sm font-medium text-slate-700">Date</span>
            <input
              type="date"
              value={date}
              onChange={(event) => handleDateChange(event.target.value)}
              className="min-w-0 rounded-lg border border-slate-200 p-2 text-sm"
            />
          </label>
        </header>

        {/* Read-Only Warning Banner for Student Accounts */}
        {!isManagementRole && (
          <div className="flex items-center gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm font-medium text-amber-900 shadow-xs">
            <ShieldAlert className="h-5 w-5 shrink-0 text-amber-600" />
            <span>
              <strong>Read-Only Access:</strong> You are logged in as a Student. Only Teachers and Administrators can record or modify attendance.
            </span>
          </div>
        )}

        <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { label: 'Total students', value: students.length, color: 'text-slate-900' },
            { label: 'Present', value: counts.Present, color: 'text-emerald-700' },
            { label: 'Absent', value: counts.Absent, color: 'text-red-700' },
            { label: 'Late', value: counts.Late, color: 'text-amber-700' },
          ].map((item) => (
            <div key={item.label} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <p className="text-sm text-slate-500">{item.label}</p>
              <p className={`mt-2 text-2xl font-bold ${item.color}`}>{item.value}</p>
            </div>
          ))}
        </section>

        {error && (
          <div role="alert" className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {message && (
          <div role="status" className="rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700">
            {message}
          </div>
        )}

        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col gap-2 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-600" />
              <h2 className="text-lg font-semibold text-slate-900">
                Student Checklist
              </h2>
            </div>
            <p className="text-sm text-slate-500">
              {counts.Unmarked} unmarked
            </p>
          </div>

          {loading ? (
            <p className="p-8 text-center text-slate-500">Loading attendance...</p>
          ) : students.length === 0 ? (
            <p className="p-8 text-center text-slate-500">
              No students found. Add students before recording attendance.
            </p>
          ) : (
            <div className="divide-y divide-slate-100">
              {students.map((student) => (
                <article key={student.id} className="space-y-3 p-4 sm:p-5">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="font-semibold text-slate-900">{student.name}</p>
                      <p className="mt-1 text-sm text-slate-500">
                        Roll number: {student.roll_number || 'Not provided'}
                      </p>
                    </div>

                    {/* Interactive buttons for Admins/Teachers OR Read-Only Badges for Students */}
                    <div className="flex flex-wrap gap-2">
                      {isManagementRole ? (
                        STATUS_OPTIONS.map((option) => (
                          <button
                            key={option.value}
                            type="button"
                            aria-pressed={student.status === option.value}
                            onClick={() =>
                              updateStudent(student.id, { status: option.value })
                            }
                            className={`rounded-lg border px-3 py-2 text-sm font-semibold transition cursor-pointer ${
                              student.status === option.value
                                ? `${option.selected} border-transparent`
                                : `bg-white ${option.idle}`
                            }`}
                          >
                            {option.value}
                          </button>
                        ))
                      ) : (
                        <div className="flex items-center gap-2">
                          {student.status ? (
                            <span
                              className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider ${
                                student.status === 'Present'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : student.status === 'Absent'
                                  ? 'bg-red-100 text-red-800'
                                  : 'bg-amber-100 text-amber-800'
                              }`}
                            >
                              {student.status}
                            </span>
                          ) : (
                            <span className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 text-slate-500">
                              Unmarked
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Editable remarks for Staff vs Read-only text for Students */}
                  {isManagementRole ? (
                    <input
                      type="text"
                      value={student.remarks}
                      onChange={(event) =>
                        updateStudent(student.id, { remarks: event.target.value })
                      }
                      maxLength={2000}
                      placeholder="Optional remarks..."
                      aria-label={`Remarks for ${student.name}`}
                      className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                  ) : (
                    student.remarks && (
                      <p className="text-xs italic text-slate-500 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                        Remarks: {student.remarks}
                      </p>
                    )
                  )}
                </article>
              ))}
            </div>
          )}

          <div className="flex flex-col gap-3 border-t border-slate-100 bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
            <p className="text-sm text-slate-500">
              {isManagementRole
                ? 'Select a status for each student before saving.'
                : 'Attendance records are read-only for students.'}
            </p>

            {/* Save button ONLY rendered for management roles */}
            {isManagementRole ? (
              <button
                type="button"
                onClick={saveAttendance}
                disabled={loading || saving || students.length === 0}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
              >
                {saving ? (
                  'Saving...'
                ) : (
                  <>
                    <Save className="h-5 w-5" />
                    Save Attendance
                    <CheckCircle2 className="h-5 w-5" />
                  </>
                )}
              </button>
            ) : (
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 bg-slate-200/60 px-4 py-2.5 rounded-xl">
                <Lock className="w-3.5 h-3.5" />
                <span>Editing Disabled</span>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}