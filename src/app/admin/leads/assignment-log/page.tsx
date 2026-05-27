'use client';
import { useMemo, useState } from 'react';
import { FileSearch, ChevronLeft, ChevronRight } from 'lucide-react';

type LogRow = {
  leadId: string;
  artist: string;
  city: string;
  assignedBy: string;
  date: string;
  type: 'Auto-match' | 'Manual';
};

const log: LogRow[] = Array.from({ length: 18 }, (_, i) => {
  const sample: LogRow[] = [
    { leadId: 'L-1000', artist: 'Ritu Verma', city: 'Delhi', assignedBy: 'System (auto)', date: '2026-04-10', type: 'Auto-match' },
    { leadId: 'L-1001', artist: 'Meera Singh', city: 'Jaipur', assignedBy: 'Rahul Mehta', date: '2026-05-11', type: 'Manual' },
    { leadId: 'L-1002', artist: 'Nisha Kapoor', city: 'Ahmedabad', assignedBy: 'System (auto)', date: '2026-04-12', type: 'Auto-match' },
    { leadId: 'L-1003', artist: 'Ritu Verma', city: 'Delhi', assignedBy: 'Rahul Mehta', date: '2026-05-13', type: 'Manual' },
    { leadId: 'L-1004', artist: 'Meera Singh', city: 'Jaipur', assignedBy: 'System (auto)', date: '2026-04-14', type: 'Auto-match' },
    { leadId: 'L-1005', artist: 'Nisha Kapoor', city: 'Ahmedabad', assignedBy: 'Rahul Mehta', date: '2026-05-15', type: 'Manual' },
    { leadId: 'L-1006', artist: 'Ritu Verma', city: 'Delhi', assignedBy: 'System (auto)', date: '2026-04-16', type: 'Auto-match' },
    { leadId: 'L-1007', artist: 'Meera Singh', city: 'Jaipur', assignedBy: 'Rahul Mehta', date: '2026-05-17', type: 'Manual' },
    { leadId: 'L-1008', artist: 'Nisha Kapoor', city: 'Ahmedabad', assignedBy: 'System (auto)', date: '2026-04-18', type: 'Auto-match' },
    { leadId: 'L-1009', artist: 'Ritu Verma', city: 'Delhi', assignedBy: 'Rahul Mehta', date: '2026-05-19', type: 'Manual' },
  ];
  const base = sample[i % sample.length];
  return { ...base, leadId: `L-${1000 + i}` };
});

const pageSize = 10;

export default function AssignmentLogPage() {
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(log.length / pageSize);
  const visible = useMemo(() => log.slice((page - 1) * pageSize, page * pageSize), [page]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-henna-700 flex items-center gap-2">
          <FileSearch size={22} /> Lead Assignment Log
        </h1>
        <p className="text-henna-400 text-sm">History of lead-to-artist assignments (auto-match and manual)</p>
      </div>

      <div className="bg-white rounded-2xl border border-cream-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-cream-50 text-[11px] uppercase tracking-wider text-henna-400 border-b border-cream-200">
              <tr>
                <th className="text-left py-3 px-4 font-medium">Lead ID</th>
                <th className="text-left py-3 px-4 font-medium">Artist</th>
                <th className="text-left py-3 px-4 font-medium">City</th>
                <th className="text-left py-3 px-4 font-medium">Assigned By</th>
                <th className="text-left py-3 px-4 font-medium">Date</th>
                <th className="text-left py-3 px-4 font-medium">Type</th>
              </tr>
            </thead>
            <tbody>
              {visible.map(r => (
                <tr key={r.leadId} className="border-b border-cream-100 last:border-0 hover:bg-cream-50/40">
                  <td className="py-3 px-4 font-semibold text-henna-700">{r.leadId}</td>
                  <td className="py-3 px-4 text-henna-800">{r.artist}</td>
                  <td className="py-3 px-4 text-henna-600">{r.city}</td>
                  <td className="py-3 px-4 text-henna-600">{r.assignedBy}</td>
                  <td className="py-3 px-4 text-henna-600 tabular-nums">{r.date}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${
                      r.type === 'Manual'
                        ? 'bg-gold-50 text-gold-700 border border-gold-100'
                        : 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                    }`}>
                      {r.type}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-cream-200">
          <p className="text-xs text-henna-500">Page {page} of {totalPages}</p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="w-8 h-8 rounded-lg bg-cream-100 text-henna-700 hover:bg-cream-50 border border-cream-200 flex items-center justify-center disabled:opacity-40 disabled:pointer-events-none"
            >
              <ChevronLeft size={14} />
            </button>
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="w-8 h-8 rounded-lg bg-cream-100 text-henna-700 hover:bg-cream-50 border border-cream-200 flex items-center justify-center disabled:opacity-40 disabled:pointer-events-none"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
