'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { LifeBuoy, MessageSquare, Phone, Mail, ChevronDown, Send } from 'lucide-react';

const channels = [
  { icon: MessageSquare, name: 'WhatsApp Support', meta: 'Fastest replies · 9 AM – 9 PM', tone: 'emerald' as const },
  { icon: Phone, name: 'Call Support', meta: '1800-XXX-XXXX · Mon–Sat', tone: 'gold' as const },
  { icon: Mail, name: 'Email Support', meta: 'support@mehndiwalaa.com', tone: 'cream' as const },
];

const channelTone: Record<'emerald' | 'gold' | 'cream', string> = {
  emerald: 'bg-emerald-50 text-emerald-700 border border-emerald-100',
  gold: 'bg-gold-50 text-gold-700 border border-gold-100',
  cream: 'bg-cream-100 text-henna-700 border border-cream-200',
};

const faqs = [
  {
    q: 'How do I report a fake lead?',
    a: 'Open the lead, tap "Report as Fake", choose a reason. Your wallet credit will be returned within 4 hours after review.',
  },
  {
    q: 'How is commission calculated?',
    a: 'Commission only applies to advances received through the platform. Direct payments outside the platform are not charged.',
  },
  {
    q: 'How quickly does Boost activate?',
    a: 'Boost activates within 5 minutes of payment and runs for the duration you selected. You can pause anytime.',
  },
  {
    q: 'How long does profile approval take?',
    a: 'Verified profiles are usually approved within 24 hours of submitting all required documents.',
  },
];

export default function SupportPage() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-henna-700 flex items-center gap-2">
          <LifeBuoy size={22} /> Support
        </h1>
        <p className="text-henna-400 text-sm">Reach our team or browse the most common questions</p>
      </div>

      {/* Channels */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {channels.map((c, i) => (
          <motion.button
            key={c.name}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-white rounded-2xl border border-cream-200 p-5 text-center hover:bg-cream-50 transition-colors"
          >
            <div className={`mx-auto w-12 h-12 rounded-2xl flex items-center justify-center ${channelTone[c.tone]}`}>
              <c.icon size={20} />
            </div>
            <p className="mt-3 font-semibold text-henna-800">{c.name}</p>
            <p className="text-xs text-henna-400 mt-1">{c.meta}</p>
          </motion.button>
        ))}
      </div>

      {/* FAQs */}
      <div className="bg-white rounded-2xl border border-cream-200 p-5">
        <h2 className="text-base font-bold font-[family-name:var(--font-heading)] text-henna-700 mb-3">Frequently Asked Questions</h2>
        <div className="divide-y divide-cream-100">
          {faqs.map((f, i) => {
            const open = openIdx === i;
            return (
              <div key={f.q} className="py-2">
                <button
                  onClick={() => setOpenIdx(open ? null : i)}
                  className="w-full flex items-center justify-between gap-3 py-2 text-left"
                >
                  <span className="font-semibold text-henna-800 text-sm">{f.q}</span>
                  <ChevronDown
                    size={16}
                    className={`shrink-0 text-henna-400 transition-transform ${open ? 'rotate-180' : ''}`}
                  />
                </button>
                {open && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-henna-600 pb-3 pl-1 leading-relaxed"
                  >
                    {f.a}
                  </motion.p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Raise a ticket */}
      <div className="bg-white rounded-2xl border border-cream-200 p-5">
        <h2 className="text-base font-bold font-[family-name:var(--font-heading)] text-henna-700 mb-3">Raise a ticket</h2>
        <div className="space-y-3">
          <input
            value={subject}
            onChange={e => setSubject(e.target.value)}
            placeholder="What is the issue?"
            className="w-full text-sm px-3 py-2.5 rounded-xl border border-cream-300 focus:outline-none focus:ring-2 focus:ring-gold-300 focus:border-gold-300"
          />
          <textarea
            value={message}
            onChange={e => setMessage(e.target.value)}
            rows={4}
            placeholder="Add as many details as you can..."
            className="w-full text-sm px-3 py-2.5 rounded-xl border border-cream-300 focus:outline-none focus:ring-2 focus:ring-gold-300 focus:border-gold-300"
          />
          <button className="inline-flex items-center justify-center gap-2 text-sm font-semibold px-4 py-2.5 rounded-xl bg-henna-700 hover:bg-henna-800 text-cream-100">
            <Send size={14} /> Submit Ticket
          </button>
        </div>
      </div>
    </div>
  );
}
