import { useEffect, useState } from 'react';
import { CalendarCheck, AlertOctagon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function StudentPortal() {
  const { user } = useAuth();
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function fetchMyAttendance() {
      try {
        const today = new Date().toISOString().slice(0, 10);
        const res = await fetch(`http://localhost:5000/api/attendance?date=${today}`);
        const data = await res.json();
        if (res.ok && isMounted) {
          setRecords(data);
        }
      } catch (err) {
        console.error('Failed to load student attendance:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    fetchMyAttendance();
    return () => {
      isMounted = false;
    };
  }, []);

  const total = records.length;
  const presentCount = records.filter((r) => r.status === 'Present').length;
  const rate = total > 0 ? ((presentCount / total) * 100).toFixed(1) : 100;
  const isShortage = Number(rate) < 75;

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Student Personal Ledger</h1>
        <p className="text-sm text-slate-500">
          Logged in account: <span className="font-semibold text-slate-800">{user?.email}</span>
        </p>
      </div>

      {isShortage && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center space-x-3 text-red-700">
          <AlertOctagon className="w-6 h-6 shrink-0 text-red-600" />
          <div>
            <h4 className="font-bold text-sm">Low Attendance Warning (&lt;75%)</h4>
            <p className="text-xs text-red-600">
              Your current attendance rate is {rate}%. Please ensure regular attendance to maintain academic eligibility.
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
          <p className="text-xs text-slate-500 uppercase font-semibold">Attendance Rate</p>
          <p className={`text-3xl font-extrabold mt-1 ${isShortage ? 'text-red-600' : 'text-emerald-600'}`}>
            {rate}%
          </p>
        </div>
        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
          <p className="text-xs text-slate-500 uppercase font-semibold">Classes Present</p>
          <p className="text-3xl font-extrabold text-slate-900 mt-1">{presentCount}</p>
        </div>
        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
          <p className="text-xs text-slate-500 uppercase font-semibold">Total Logged Sessions</p>
          <p className="text-3xl font-extrabold text-slate-900 mt-1">{total}</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 font-bold text-slate-900 flex items-center space-x-2">
          <CalendarCheck className="w-5 h-5 text-blue-600" />
          <span>Recent Attendance History</span>
        </div>

        {loading ? (
          <p className="p-6 text-center text-slate-500">Loading ledger...</p>
        ) : records.length === 0 ? (
          <p className="p-6 text-center text-slate-500">No attendance sessions recorded today.</p>
        ) : (
          <div className="divide-y divide-slate-100 text-sm">
            {records.map((r) => (
              <div key={r.id} className="p-4 flex items-center justify-between hover:bg-slate-50">
                <div>
                  <p className="font-semibold text-slate-900">{r.name}</p>
                  <p className="text-xs text-slate-500">
                    {r.roll_number} • {r.date}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  {r.status === 'Present' && (
                    <span className="px-3 py-1 bg-emerald-50 text-emerald-700 font-semibold text-xs rounded-full">
                      Present
                    </span>
                  )}
                  {r.status === 'Absent' && (
                    <span className="px-3 py-1 bg-red-50 text-red-700 font-semibold text-xs rounded-full">
                      Absent
                    </span>
                  )}
                  {r.status === 'Late' && (
                    <span className="px-3 py-1 bg-amber-50 text-amber-700 font-semibold text-xs rounded-full">
                      Late
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}