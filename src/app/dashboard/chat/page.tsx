'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Send, Phone, Image as ImageIcon, Paperclip, Smile, ChevronDown } from 'lucide-react';
import { mockChatThreads } from '@/data/mock';

const mockMessages = [
  { id:'1', sender:'user', text:'Hi! I\'m interested in bridal mehndi for my wedding on June 10th.', time:'10:00 AM', type:'text' as const },
  { id:'2', sender:'artist', text:'Hello! Thank you for reaching out. I\'d love to help with your bridal mehndi. Could you share your preferred design style?', time:'10:05 AM', type:'text' as const },
  { id:'3', sender:'user', text:'I prefer Rajasthani style with some modern elements. Full hands and feet.', time:'10:08 AM', type:'text' as const },
  { id:'4', sender:'artist', text:'Sure! I can do a traditional Rajasthani design with modern elements. Let me share some options from my portfolio.', time:'10:30 AM', type:'text' as const },
  { id:'5', sender:'artist', text:'', time:'10:32 AM', type:'image' as const, imageUrl:'/images/hero-mehndi.png', caption:'Rajasthani bridal design — peacock motif' },
  { id:'6', sender:'artist', text:'', time:'10:33 AM', type:'image' as const, imageUrl:'/images/hero-mehndi.png', caption:'Modern Rajasthani with jaal work' },
  { id:'7', sender:'user', text:'These are gorgeous! I love the first one. What would be the pricing for full hands and feet?', time:'10:40 AM', type:'text' as const },
  { id:'8', sender:'artist', text:'For full bridal mehndi (both hands till elbow + feet), it would be ₹18,000. This includes a trial session worth ₹1,500. Would you like to book a trial first?', time:'10:45 AM', type:'text' as const },
];

const quickReplies = [
  'What is your availability?',
  'Can I book a trial session?',
  'Do you travel to the venue?',
  'Can you share more designs?',
  'What is the pricing?',
];

export default function ChatPage() {
  const [activeChat, setActiveChat] = useState(mockChatThreads[0]?.id || '');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState(mockMessages);
  const [showQuickReplies, setShowQuickReplies] = useState(false);
  const [showAttachMenu, setShowAttachMenu] = useState(false);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    setMessages([...messages, { id: `new-${Date.now()}`, sender: 'user', text, time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }), type: 'text' }]);
    setMessage('');
    setShowQuickReplies(false);
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-henna-700">Messages</h1>
      <div className="bg-white rounded-2xl border border-cream-200 overflow-hidden h-[600px] flex">
        {/* Chat List */}
        <div className="w-72 border-r border-cream-200 flex-shrink-0 overflow-y-auto hidden sm:block">
          {mockChatThreads.map(t => (
            <button key={t.id} onClick={() => setActiveChat(t.id)}
              className={`w-full p-4 flex items-center gap-3 text-left hover:bg-cream-50 transition-colors ${activeChat === t.id ? 'bg-cream-50 border-l-3 border-gold-500' : ''}`}>
              <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                <Image src={t.artistImage} alt={t.artistName} width={40} height={40} className="object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between"><span className="font-semibold text-sm text-henna-800">{t.artistName}</span>
                  {t.unreadCount > 0 && <span className="w-5 h-5 bg-henna-700 text-cream-100 text-[10px] rounded-full flex items-center justify-center">{t.unreadCount}</span>}
                </div>
                <p className="text-xs text-henna-400 truncate">{t.lastMessage.text}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Chat Window */}
        <div className="flex-1 flex flex-col">
          <div className="p-4 border-b border-cream-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gold-100 flex items-center justify-center text-gold-700 font-bold text-sm">P</div>
              <div><p className="font-semibold text-sm text-henna-800">Priya Sharma</p><p className="text-xs text-green-500">Online</p></div>
            </div>
            <button className="p-2 text-henna-400 hover:text-blue-500 rounded-lg hover:bg-blue-50"><Phone size={18} /></button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map(m => (
              <motion.div key={m.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[75%] rounded-2xl text-sm ${
                  m.sender === 'user' ? 'bg-henna-700 text-cream-100 rounded-br-md' : 'bg-cream-100 text-henna-800 rounded-bl-md'}`}>
                  {m.type === 'image' ? (
                    <div>
                      <div className="relative h-40 w-56 rounded-t-2xl overflow-hidden">
                        <Image src={m.imageUrl!} alt={m.caption || ''} fill className="object-cover" />
                      </div>
                      {m.caption && <p className={`px-3 py-1.5 text-xs ${m.sender === 'user' ? 'text-cream-300' : 'text-henna-500'}`}>{m.caption}</p>}
                      <p className={`px-3 pb-2 text-[10px] ${m.sender === 'user' ? 'text-cream-400' : 'text-henna-400'}`}>{m.time}</p>
                    </div>
                  ) : (
                    <div className="px-4 py-2.5">
                      {m.text}
                      <p className={`text-[10px] mt-1 ${m.sender === 'user' ? 'text-cream-400' : 'text-henna-400'}`}>{m.time}</p>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Quick Replies */}
          {showQuickReplies && (
            <div className="px-3 pb-2 flex gap-2 overflow-x-auto">
              {quickReplies.map(q => (
                <button key={q} onClick={() => sendMessage(q)}
                  className="px-3 py-1.5 bg-gold-50 text-henna-700 text-xs rounded-full border border-gold-200 whitespace-nowrap hover:bg-gold-100 transition-colors">
                  {q}
                </button>
              ))}
            </div>
          )}

          <div className="p-3 border-t border-cream-200">
            <div className="flex gap-2 relative">
              <div className="relative">
                <button onClick={() => setShowAttachMenu(!showAttachMenu)} className="p-2.5 text-henna-400 hover:text-gold-500 rounded-xl hover:bg-cream-50">
                  <Paperclip size={20} />
                </button>
                {showAttachMenu && (
                  <div className="absolute bottom-12 left-0 bg-white rounded-xl shadow-lg border border-cream-200 py-2 w-40 z-10">
                    <button className="flex items-center gap-2 px-4 py-2 text-sm text-henna-600 hover:bg-cream-50 w-full"><ImageIcon size={14} /> Photo</button>
                    <button className="flex items-center gap-2 px-4 py-2 text-sm text-henna-600 hover:bg-cream-50 w-full"><Paperclip size={14} /> Portfolio</button>
                  </div>
                )}
              </div>
              <button onClick={() => setShowQuickReplies(!showQuickReplies)} className="p-2.5 text-henna-400 hover:text-gold-500 rounded-xl hover:bg-cream-50">
                <Smile size={20} />
              </button>
              <input value={message} onChange={e => setMessage(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendMessage(message)}
                placeholder="Type a message..."
                className="flex-1 px-4 py-2.5 bg-cream-50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold-500" />
              <button onClick={() => sendMessage(message)} className="p-2.5 bg-henna-700 text-cream-100 rounded-xl hover:bg-henna-600"><Send size={18} /></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
