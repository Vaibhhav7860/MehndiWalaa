'use client';
import { useState } from 'react';
import { FileText, Plus, Send, Download } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

const mockInvoices = [
  { id: 'INV-001', client: 'Neha Mehra', occasion: 'Wedding', date: '2026-04-15', amount: 18000, advance: 5000, status: 'final' as const },
  { id: 'INV-002', client: 'Roshni Kapoor', occasion: 'Karva Chauth', date: '2026-10-22', amount: 5000, advance: 2000, status: 'provisional' as const },
];

export default function InvoicesPage() {
  const [showCreate, setShowCreate] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-henna-700 flex items-center gap-2"><FileText size={24} /> Invoice Manager</h1>
        <button onClick={() => setShowCreate(!showCreate)} className="px-4 py-2 bg-henna-700 text-cream-100 rounded-full text-sm font-semibold flex items-center gap-1 hover:bg-henna-600"><Plus size={14} /> Create Invoice</button>
      </div>

      {showCreate && (
        <div className="bg-white rounded-2xl border border-cream-200 p-6 space-y-4">
          <h3 className="font-semibold text-henna-700">New Invoice</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div><label className="text-xs text-henna-600 mb-1 block">Client Name</label><input className="w-full px-3 py-2 border border-cream-300 rounded-lg text-sm" placeholder="Enter client name" /></div>
            <div><label className="text-xs text-henna-600 mb-1 block">Phone</label><input className="w-full px-3 py-2 border border-cream-300 rounded-lg text-sm" placeholder="+91" /></div>
            <div><label className="text-xs text-henna-600 mb-1 block">Occasion</label><select className="w-full px-3 py-2 border border-cream-300 rounded-lg text-sm bg-white"><option>Wedding</option><option>Engagement</option><option>Karva Chauth</option><option>Eid</option></select></div>
            <div><label className="text-xs text-henna-600 mb-1 block">Service Date</label><input type="date" className="w-full px-3 py-2 border border-cream-300 rounded-lg text-sm" /></div>
            <div><label className="text-xs text-henna-600 mb-1 block">Total Amount</label><input type="number" className="w-full px-3 py-2 border border-cream-300 rounded-lg text-sm" placeholder="₹" /></div>
            <div><label className="text-xs text-henna-600 mb-1 block">Advance Received</label><input type="number" className="w-full px-3 py-2 border border-cream-300 rounded-lg text-sm" placeholder="₹" /></div>
          </div>
          <div className="flex gap-2">
            <button className="px-5 py-2 bg-henna-700 text-cream-100 rounded-xl text-sm font-semibold hover:bg-henna-600">Create Invoice</button>
            <button onClick={() => setShowCreate(false)} className="px-5 py-2 text-henna-600 border border-cream-300 rounded-xl text-sm">Cancel</button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {mockInvoices.map(inv => (
          <div key={inv.id} className="bg-white rounded-2xl border border-cream-200 p-5 flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-henna-800">{inv.id} · {inv.client}</p>
              <p className="text-sm text-henna-400">{inv.occasion} · {inv.date}</p>
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
              <div className="text-right">
                <p className="font-bold text-henna-800">{formatPrice(inv.amount)}</p>
                <span className={`text-xs px-2 py-0.5 rounded-full ${inv.status === 'final' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{inv.status}</span>
              </div>
              <div className="flex gap-2">
                <button className="p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100" title="Send via WhatsApp"><Send size={16} /></button>
                <button className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100" title="Download PDF"><Download size={16} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
