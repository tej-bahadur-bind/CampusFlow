import { UserCheck, Search } from 'lucide-react';

export default function RecentStudentsTable() {
  const students = [
    { id: 'STU-2026-001', name: 'Alex Morgan', dept: 'Computer Science', year: 'Year 1', date: 'Apr 02, 2026', status: 'Active' },
    { id: 'STU-2026-002', name: 'Samantha Lee', dept: 'Electrical Eng.', year: 'Year 2', date: 'Apr 01, 2026', status: 'Active' },
    { id: 'STU-2026-003', name: 'Rahul Sharma', dept: 'Mechanical Eng.', year: 'Year 1', date: 'Mar 29, 2026', status: 'Pending Docs' },
    { id: 'STU-2026-004', name: 'Emily Chen', dept: 'Computer Science', year: 'Year 3', date: 'Mar 28, 2026', status: 'Active' },
    { id: 'STU-2026-005', name: 'David Miller', dept: 'Civil Eng.', year: 'Year 1', date: 'Mar 25, 2026', status: 'Active' },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-6 space-y-4">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div className="flex items-center space-x-2.5">
          <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
            <UserCheck className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">Recent Admissions</h3>
            <p className="text-[11px] text-slate-500">Newly registered demo students</p>
          </div>
        </div>

        {/* Search Placeholder */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            disabled
            placeholder="Filter list... (Demo)"
            className="pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs w-full sm:w-48 cursor-not-allowed text-slate-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs" aria-label="Recent Admissions Table">
          <thead>
            <tr className="border-b border-slate-200/80 text-slate-400 font-semibold uppercase text-[10px]">
              <th scope="col" className="pb-2.5 px-2">Student ID</th>
              <th scope="col" className="pb-2.5 px-2">Name</th>
              <th scope="col" className="pb-2.5 px-2">Department</th>
              <th scope="col" className="pb-2.5 px-2">Year</th>
              <th scope="col" className="pb-2.5 px-2">Admission Date</th>
              <th scope="col" className="pb-2.5 px-2">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
            {students.map((stu) => (
              <tr key={stu.id} className="hover:bg-slate-50/80 transition-colors">
                <td className="py-3 px-2 font-mono text-[11px] text-slate-500">{stu.id}</td>
                <td className="py-3 px-2 font-bold text-slate-900">{stu.name}</td>
                <td className="py-3 px-2 text-slate-600">{stu.dept}</td>
                <td className="py-3 px-2 text-slate-500">{stu.year}</td>
                <td className="py-3 px-2 text-slate-500">{stu.date}</td>
                <td className="py-3 px-2">
                  <span
                    className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-bold ${
                      stu.status === 'Active'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60'
                        : 'bg-amber-50 text-amber-700 border border-amber-200/60'
                    }`}
                  >
                    {stu.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}