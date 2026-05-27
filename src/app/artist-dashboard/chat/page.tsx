'use client';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Phone, CalendarPlus, Image as ImageIcon, Send, Save } from 'lucide-react';

type Conversation = {
  id: string;
  name: string;
  initial: string;
  preview: string;
  time: string;
  unread?: number;
  online?: boolean;
  topic: string;
};

type Message = {
  id: string;
  from: 'client' | 'artist' | 'system';
  text: string;
  time: string;
  read?: boolean;
  variant?: 'text' | 'attachment' | 'note';
};

const conversations: Conversation[] = [
  { id: 'c1', name: 'Priya Sharma', initial: 'P', preview: 'Can you share design photos?', time: '10:47 AM', unread: 2, online: true, topic: 'Bridal Mehndi enquiry' },
  { id: 'c2', name: 'Anita Desai', initial: 'A', preview: 'Confirmed the advance, thanks!', time: 'Yesterday', topic: 'Karva Chauth booking' },
  { id: 'c3', name: 'Sunita Joshi', initial: 'S', preview: 'Will the design last 5 days?', time: 'Mon', unread: 1, topic: 'Party Mehndi' },
  { id: 'c4', name: 'Rekha Gupta', initial: 'R', preview: 'Loved the work — review posted!', time: '23 May', topic: 'Past booking' },
];

const initialMessages: Message[] = [
  { id: 'm1', from: 'client', text: 'Namaste! I need bridal mehndi for 15 June — full hands and feet. Budget is ₹8,000–12,000.', time: '10:32 AM', read: true },
  { id: 'm2', from: 'artist', text: "Namaste Priya! I'm available on 15 June. My bridal package for full hands + feet is ₹10,000. What design style do you have in mind?", time: '10:45 AM', read: true },
  { id: 'm3', from: 'client', text: 'A Mughal–Arabic mix. Could you share a couple of design references?', time: '10:47 AM', read: false },
  { id: 'm4', from: 'artist', variant: 'attachment', text: 'Design reference: Mughal_Arabic_Bridal.jpg', time: '10:52 AM', read: true },
  { id: 'm5', from: 'system', text: 'Lead Quality Score: HOT — Budget, date and design confirmed.', time: '', variant: 'note' },
];

const quickReplies = [
  "I'm available on that date.",
  'Please confirm ₹2,000 advance to lock the booking.',
  'Sending an invoice now.',
  'I will confirm by tomorrow.',
];

export default function ArtistChatPage() {
  const [activeId, setActiveId] = useState<string>(conversations[0].id);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [draft, setDraft] = useState('');
  const [note, setNote] = useState(
    'Loves Arabic + Mughal style. Flexible budget. Booked once before (May 2025). Punctual client.'
  );
  const messagesRef = useRef<HTMLDivElement | null>(null);

  const active = conversations.find(c => c.id === activeId) ?? conversations[0];

  useEffect(() => {
    messagesRef.current?.scrollTo({ top: messagesRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const send = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setMessages(prev => [
      ...prev,
      {
        id: `m${Date.now()}`,
        from: 'artist',
        text: trimmed,
        time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
        read: false,
      },
    ]);
    setDraft('');
  };

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-henna-700 flex items-center gap-2">
          <MessageCircle size={22} /> In-App Chat
        </h1>
        <p className="text-henna-400 text-sm">Talk to clients, send quick replies, save private notes</p>
      </div>

      <div className="bg-white rounded-2xl border border-cream-200 overflow-hidden grid grid-cols-1 md:grid-cols-[260px_1fr] min-h-[560px]">
        {/* Conversation list */}
        <aside className="border-b md:border-b-0 md:border-r border-cream-200 bg-cream-50/40 max-h-[260px] md:max-h-none overflow-y-auto">
          <div className="px-4 py-3 border-b border-cream-200 text-sm font-bold font-[family-name:var(--font-heading)] text-henna-700">Conversations</div>
          <ul>
            {conversations.map(c => {
              const isActive = c.id === activeId;
              return (
                <li key={c.id}>
                  <button
                    onClick={() => setActiveId(c.id)}
                    className={`w-full text-left px-4 py-3 flex items-center gap-3 transition-colors ${
                      isActive ? 'bg-cream-100' : 'hover:bg-cream-50'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-full bg-gold-100 text-gold-700 flex items-center justify-center font-bold text-sm flex-shrink-0">
                      {c.initial}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm font-semibold text-henna-800 truncate">{c.name}</p>
                        <span className="text-[10px] text-henna-400 shrink-0">{c.time}</span>
                      </div>
                      <p className="text-xs text-henna-500 truncate">{c.preview}</p>
                    </div>
                    {c.unread ? (
                      <span className="shrink-0 w-5 h-5 rounded-full bg-henna-700 text-cream-100 text-[10px] font-bold flex items-center justify-center">
                        {c.unread}
                      </span>
                    ) : null}
                  </button>
                </li>
              );
            })}
          </ul>
        </aside>

        {/* Chat panel */}
        <section className="flex flex-col">
          {/* Header */}
          <div className="px-4 py-3 border-b border-cream-200 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gold-100 text-gold-700 flex items-center justify-center font-bold">
              {active.initial}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-henna-800 text-sm">{active.name}</p>
              <p className="text-[11px] text-emerald-600 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Online · {active.topic}
              </p>
            </div>
            <div className="flex gap-2">
              <button className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-cream-100 text-henna-700 border border-cream-200 hover:bg-cream-50">
                <Phone size={13} /> Call
              </button>
              <button className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-henna-700 text-cream-100 hover:bg-henna-800">
                <CalendarPlus size={13} /> Book
              </button>
            </div>
          </div>

          {/* Messages */}
          <div ref={messagesRef} className="flex-1 px-4 py-4 space-y-3 overflow-y-auto bg-cream-50/30">
            {messages.map(m => {
              if (m.variant === 'note') {
                return (
                  <div key={m.id} className="mx-auto max-w-md text-center text-xs px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
                    {m.text}
                  </div>
                );
              }
              const mine = m.from === 'artist';
              return (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${mine ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[78%] sm:max-w-[60%] px-3.5 py-2.5 text-sm leading-relaxed shadow-sm ${
                      mine
                        ? 'bg-henna-700 text-cream-100 rounded-2xl rounded-br-sm'
                        : 'bg-white text-henna-800 border border-cream-200 rounded-2xl rounded-bl-sm'
                    } ${m.variant === 'attachment' ? 'border border-dashed' : ''}`}
                  >
                    {m.variant === 'attachment' ? (
                      <p className="flex items-center gap-2">
                        <ImageIcon size={14} /> {m.text}
                      </p>
                    ) : (
                      <p>{m.text}</p>
                    )}
                    <span className={`block text-[10px] mt-1 ${mine ? 'text-cream-100/70 text-right' : 'text-henna-400'}`}>
                      {m.time}
                      {mine && (m.read ? ' · ✓✓' : ' · ✓')}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Quick replies */}
          <div className="px-4 py-2 border-t border-cream-200 flex gap-2 overflow-x-auto">
            {quickReplies.map(qr => (
              <button
                key={qr}
                onClick={() => send(qr)}
                className="whitespace-nowrap text-xs font-semibold px-3 py-1.5 rounded-full bg-cream-100 text-henna-700 border border-cream-200 hover:bg-cream-50"
              >
                {qr}
              </button>
            ))}
          </div>

          {/* Composer */}
          <div className="px-3 py-3 border-t border-cream-200 flex items-center gap-2">
            <input
              value={draft}
              onChange={e => setDraft(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter') send(draft);
              }}
              placeholder="Type a message..."
              className="flex-1 text-sm px-3 py-2 rounded-xl border border-cream-300 bg-white focus:outline-none focus:ring-2 focus:ring-gold-300 focus:border-gold-300"
            />
            <button className="w-10 h-10 rounded-xl bg-cream-100 text-henna-700 border border-cream-200 hover:bg-cream-50 flex items-center justify-center">
              <ImageIcon size={16} />
            </button>
            <button
              onClick={() => send(draft)}
              className="inline-flex items-center gap-1.5 px-4 h-10 rounded-xl bg-henna-700 hover:bg-henna-800 text-cream-100 text-sm font-semibold"
            >
              Send <Send size={14} />
            </button>
          </div>
        </section>
      </div>

      {/* Client notes */}
      <div className="bg-white rounded-2xl border border-cream-200 p-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold font-[family-name:var(--font-heading)] text-henna-700">{active.name} — Client Notes</h2>
          <button className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-henna-700 text-cream-100 hover:bg-henna-800">
            <Save size={13} /> Save
          </button>
        </div>
        <textarea
          value={note}
          onChange={e => setNote(e.target.value)}
          rows={3}
          placeholder="Notes about the client — design preference, allergies, availability..."
          className="w-full text-sm px-3 py-2 rounded-xl border border-cream-300 focus:outline-none focus:ring-2 focus:ring-gold-300 focus:border-gold-300"
        />
        <p className="text-[11px] text-henna-400 mt-2">Last updated: 23 May 2026 · Auto-saved</p>
      </div>
    </div>
  );
}
