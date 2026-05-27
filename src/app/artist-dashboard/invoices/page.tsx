'use client';
import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Plus, Send, Download, Link as LinkIcon, Copy, MessageSquare, X } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

const mockInvoices = [
  { id: 'INV-001', client: 'Neha Mehra', occasion: 'Wedding', date: '2026-04-15', amount: 18000, advance: 5000, status: 'final' as const },
  { id: 'INV-002', client: 'Roshni Kapoor', occasion: 'Karva Chauth', date: '2026-10-22', amount: 5000, advance: 2000, status: 'provisional' as const },
];

export default function InvoicesPage() {
  const [showCreate, setShowCreate] = useState(true);
  const [total, setTotal] = useState(8000);
  const [advance, setAdvance] = useState(2000);
  const [showUPI, setShowUPI] = useState(false);

  const summary = useMemo(() => {
    const safeTotal = Number.isFinite(total) && total >= 0 ? total : 0;
    const safeAdvance = Number.isFinite(advance) && advance >= 0 ? advance : 0;
    const commission = Math.round(safeAdvance * 0.1);
    const remaining = Math.max(0, safeTotal - safeAdvance);
    const net = safeTotal - commission;
    return { commission, remaining, net };
  }, [total, advance]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-henna-700 flex items-center gap-2">
            <FileText size={22} /> Invoice Manager
          </h1>
          <p className="text-henna-400 text-sm">Send invoices via WhatsApp, generate PDFs and UPI payment links</p>
        </div>
        <button
          onClick={() => setShowCreate(v => !v)}
          className="inline-flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-full bg-henna-700 text-cream-100 hover:bg-henna-800"
        >
          <Plus size={14} /> {showCreate ? 'Hide Form' : 'New Invoice'}
        </button>
      </div>

      {showCreate && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl border border-cream-200 p-5 sm:p-6 space-y-5">
          <p className="text-base font-bold font-[family-name:var(--font-heading)] text-henna-700">Create Invoice</p>

          <div className="grid sm:grid-cols-2 gap-3">
            <Field label="Client Name *" placeholder="Priya Sharma" />
            <Field label="Phone *" placeholder="+91 98765 43210" />
            <Field label="Service Location *" placeholder="Andheri West, Mumbai" />
            <SelectField label="Occasion *" options={['Wedding / Bridal', 'Karva Chauth', 'Party', 'Arabic Mehndi', 'Engagement']} />
            <Field label="Service Date *" type="date" />
            <Field label="Number of Persons" type="number" defaultValue="1" />
            <Field
              label="Total Amount (₹) *"
              type="number"
              value={String(total)}
              onChange={(v) => setTotal(Number(v))}
            />
            <Field
              label="Advance Received (₹)"
              type="number"
              value={String(advance)}
              onChange={(v) => setAdvance(Number(v))}
            />
            <div className="sm:col-span-2">
              <Label>Design Brief / Notes</Label>
              <textarea
                rows={2}
                placeholder="Full hands + feet bridal mehndi, Mughal design preferred..."
                className="mt-1 w-full px-3 py-2 rounded-xl border border-cream-300 text-sm focus:outline-none focus:ring-2 focus:ring-gold-300 focus:border-gold-300"
              />
            </div>
          </div>

          {/* Live summary */}
          <div className="rounded-2xl bg-cream-50 border border-cream-200 p-4">
            <p className="text-[11px] uppercase tracking-wider text-henna-400 font-bold mb-2">Live Summary</p>
            <dl className="text-sm divide-y divide-cream-100">
              <div className="flex items-center justify-between py-1.5">
                <dt className="text-henna-500">Total Amount</dt>
                <dd className="font-semibold text-henna-800 tabular-nums">{formatPrice(total)}</dd>
              </div>
              <div className="flex items-center justify-between py-1.5">
                <dt className="text-henna-500">Advance Received</dt>
                <dd className="font-semibold text-henna-800 tabular-nums">{formatPrice(advance)}</dd>
              </div>
              <div className="flex items-center justify-between py-1.5">
                <dt className="text-henna-500">Platform Commission (10%)</dt>
                <dd className="font-semibold text-rose-600 tabular-nums">- {formatPrice(summary.commission)}</dd>
              </div>
              <div className="flex items-center justify-between py-1.5">
                <dt className="text-henna-500">Remaining from Client</dt>
                <dd className="font-semibold text-henna-800 tabular-nums">{formatPrice(summary.remaining)}</dd>
              </div>
              <div className="flex items-center justify-between py-2">
                <dt className="font-semibold text-henna-800">Net Payout</dt>
                <dd className="font-bold text-emerald-600 tabular-nums text-base">{formatPrice(summary.net)}</dd>
              </div>
            </dl>
          </div>

          <div className="flex flex-wrap gap-2">
            <button className="inline-flex items-center gap-1.5 text-sm font-semibold px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white">
              <MessageSquare size={14} /> Send via WhatsApp
            </button>
            <button className="inline-flex items-center gap-1.5 text-sm font-semibold px-4 py-2.5 rounded-xl bg-cream-100 text-henna-700 border border-cream-200 hover:bg-cream-50">
              <Download size={14} /> Download PDF
            </button>
            <button
              onClick={() => setShowUPI(true)}
              className="inline-flex items-center gap-1.5 text-sm font-semibold px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white"
            >
              <LinkIcon size={14} /> Generate UPI Link
            </button>
          </div>

          {showUPI && (
            <div className="rounded-2xl bg-blue-50 border border-blue-100 p-4">
              <div className="flex items-start justify-between gap-3 mb-2">
                <p className="text-sm font-semibold text-blue-800">Payment link generated</p>
                <button onClick={() => setShowUPI(false)} className="text-blue-700 hover:text-blue-900">
                  <X size={14} />
                </button>
              </div>
              <div className="flex items-center justify-between gap-2 bg-white border border-dashed border-blue-200 rounded-xl px-3 py-2">
                <span className="text-sm text-blue-700 font-semibold truncate">mehndiwalaa.in/pay/SAP2024-001</span>
                <button className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white">
                  <Copy size={11} /> Copy
                </button>
              </div>
              <p className="text-xs text-blue-700 mt-2">Client can pay advance via UPI / card / netbanking. You will get a notification once paid.</p>
            </div>
          )}
        </motion.div>
      )}

      {/* Past invoices */}
      <div className="space-y-3">
        <p className="text-sm font-semibold text-henna-700">Past Invoices</p>
        {mockInvoices.map(inv => (
          <div key={inv.id} className="bg-white rounded-2xl border border-cream-200 p-4 flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-henna-800">#{inv.id} · {inv.client}</p>
              <p className="text-xs text-henna-400">{inv.occasion} · {inv.date}</p>
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
              <div className="text-right">
                <p className="font-bold text-henna-800 tabular-nums">{formatPrice(inv.amount)}</p>
                <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                  inv.status === 'final' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-amber-50 text-amber-700 border border-amber-100'
                }`}>
                  {inv.status === 'final' ? 'Final' : 'Provisional'}
                </span>
              </div>
              <div className="flex gap-2">
                <button className="p-2 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-lg hover:bg-emerald-100" title="Send via WhatsApp"><Send size={14} /></button>
                <button className="p-2 bg-cream-100 text-henna-700 border border-cream-200 rounded-lg hover:bg-cream-50" title="Download PDF"><Download size={14} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <label className="text-[11px] uppercase tracking-[0.18em] text-henna-400 font-semibold">{children}</label>;
}

function Field({ label, type = 'text', placeholder, defaultValue, value, onChange }: {
  label: string;
  type?: string;
  placeholder?: string;
  defaultValue?: string;
  value?: string;
  onChange?: (v: string) => void;
}) {
  return (
    <div>
      <Label>{label}</Label>
      <input
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        value={value}
        onChange={onChange ? e => onChange(e.target.value) : undefined}
        className="mt-1 w-full px-3 py-2 rounded-xl border border-cream-300 text-sm focus:outline-none focus:ring-2 focus:ring-gold-300 focus:border-gold-300"
      />
    </div>
  );
}

function SelectField({ label, options }: { label: string; options: string[] }) {
  return (
    <div>
      <Label>{label}</Label>
      <select className="mt-1 w-full px-3 py-2 rounded-xl border border-cream-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-gold-300 focus:border-gold-300">
        {options.map(o => <option key={o}>{o}</option>)}
      </select>
    </div>
  );
}
