'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';

const STEPS = [
  { question: "Hi! 👋 I'm MehndiBot. What's the occasion?", options: ['Wedding', 'Engagement', 'Karva Chauth', 'Eid', 'Festival', 'Other'] },
  { question: "Which city are you in?", options: ['Delhi', 'Mumbai', 'Jaipur', 'Hyderabad', 'Lucknow', 'Bangalore', 'Other'] },
  { question: "What mehndi style do you prefer?", options: ['Bridal (Full)', 'Arabic', 'Rajasthani', 'Minimalist', 'Indo-Western', "Not sure"] },
];

const SUGGESTIONS: Record<string, string> = {
  'Bridal (Full)': "For bridal mehndi, I recommend our top-rated artists who specialize in intricate full-hand designs. They use premium organic henna for rich, long-lasting color.",
  'Arabic': "Arabic designs are elegant and flowing! Our verified Arabic mehndi artists create stunning patterns with bold lines and negative space.",
  'Rajasthani': "Rajasthani mehndi is known for its detailed patterns covering the entire hand. Our Jaipur-based artists are especially renowned for this style!",
  'Minimalist': "Minimalist mehndi is trending! Clean lines, geometric patterns, and subtle elegance. Perfect for modern brides and casual occasions.",
  'Indo-Western': "Indo-Western fusion designs blend traditional motifs with contemporary aesthetics. A unique choice for the modern bride!",
  "Not sure": "No worries! Based on your occasion, I'd suggest exploring our Design Inspiration gallery to find patterns you love.",
};

const PRICES: Record<string, string> = {
  'Delhi': '₹5,000 – ₹25,000', 'Mumbai': '₹6,000 – ₹35,000', 'Jaipur': '₹3,000 – ₹18,000',
  'Hyderabad': '₹4,000 – ₹22,000', 'Lucknow': '₹3,000 – ₹12,000', 'Bangalore': '₹5,000 – ₹28,000', 'Other': '₹3,000 – ₹20,000',
};

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [messages, setMessages] = useState<{ role: 'bot' | 'user'; text: string }[]>([{ role: 'bot', text: STEPS[0].question }]);

  const handleOption = (option: string) => {
    const newAnswers = [...answers, option];
    setAnswers(newAnswers);
    setMessages(prev => [...prev, { role: 'user', text: option }]);

    if (step < STEPS.length - 1) {
      setTimeout(() => {
        setMessages(prev => [...prev, { role: 'bot', text: STEPS[step + 1].question }]);
        setStep(step + 1);
      }, 500);
    } else {
      const city = newAnswers[1]; const style = option;
      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          { role: 'bot', text: `Great choice! Here's what I found:\n\n✨ ${SUGGESTIONS[style] || SUGGESTIONS["Not sure"]}\n\n💰 Average price in ${city}: ${PRICES[city] || PRICES['Other']}\n\n👉 Browse verified artists on our Find Artists page!` },
        ]);
        setStep(STEPS.length);
      }, 800);
    }
  };

  const reset = () => { setStep(0); setAnswers([]); setMessages([{ role: 'bot', text: STEPS[0].question }]); };

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-henna-700 text-cream-100 rounded-full shadow-xl flex items-center justify-center hover:bg-henna-600 transition-colors"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[380px] bg-white rounded-2xl shadow-2xl border border-cream-200 overflow-hidden"
          >
            <div className="bg-henna-700 text-cream-100 px-5 py-4 flex items-center gap-3">
              <div className="w-9 h-9 bg-gold-500 rounded-full flex items-center justify-center"><Sparkles size={18} /></div>
              <div><p className="font-semibold text-sm">MehndiBot</p><p className="text-cream-300 text-xs">AI Assistant • Online</p></div>
            </div>

            <div className="h-80 overflow-y-auto p-4 space-y-3">
              {messages.map((m, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                  className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm whitespace-pre-line ${
                    m.role === 'user' ? 'bg-henna-700 text-cream-100 rounded-br-md' : 'bg-cream-100 text-henna-800 rounded-bl-md'}`}>
                    {m.text}
                  </div>
                </motion.div>
              ))}
              {step < STEPS.length && (
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {STEPS[step].options.map(opt => (
                    <button key={opt} onClick={() => handleOption(opt)}
                      className="px-3 py-1.5 text-xs font-medium bg-gold-50 text-henna-700 rounded-full border border-gold-200 hover:bg-gold-100 transition-colors">
                      {opt}
                    </button>
                  ))}
                </div>
              )}
              {step >= STEPS.length && (
                <div className="flex gap-2 mt-2">
                  <button onClick={reset} className="px-4 py-2 text-xs font-medium bg-cream-100 text-henna-700 rounded-full border border-cream-300 hover:bg-cream-200 transition-colors">Start Over</button>
                  <a href="/artists" className="px-4 py-2 text-xs font-medium bg-henna-700 text-cream-100 rounded-full hover:bg-henna-600 transition-colors flex items-center gap-1">
                    Find Artists <Send size={12} />
                  </a>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
