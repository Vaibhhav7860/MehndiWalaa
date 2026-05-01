'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

export function FirstVisitPopup() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem('mw_popup_dismissed');
    if (!dismissed) {
      const timer = setTimeout(() => setShow(true), 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  const dismiss = () => {
    setShow(false);
    localStorage.setItem('mw_popup_dismissed', Date.now().toString());
  };

  return (
    <AnimatePresence>
      {show && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/40 z-[70]" onClick={dismiss} />
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.85 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-lg bg-white rounded-2xl shadow-2xl z-[71] overflow-hidden"
          >
            <div className="bg-gradient-to-r from-henna-700 to-henna-800 px-8 py-6 text-cream-100">
              <button onClick={dismiss} className="absolute top-4 right-4 text-cream-300 hover:text-white"><X size={20} /></button>
              <Sparkles className="text-gold-500 mb-3" size={28} />
              <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-1">Welcome to MehndiWalaa! ✨</h2>
              <p className="text-cream-300 text-sm">India&apos;s #1 platform to find verified mehndi artists</p>
            </div>
            <div className="px-8 py-6">
              <div className="space-y-3 mb-6">
                {['100% Verified Artist Portfolios', 'Transparent Pricing — No Hidden Fees', 'Book Trial Sessions Before Your Big Day'].map((t, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-gold-100 flex items-center justify-center text-gold-600 text-xs font-bold">{i + 1}</div>
                    <span className="text-sm text-henna-800">{t}</span>
                  </div>
                ))}
              </div>
              <Link href="/artists" onClick={dismiss}
                className="w-full py-3 bg-henna-700 text-cream-100 rounded-full font-semibold hover:bg-henna-600 transition-all flex items-center justify-center gap-2">
                Find Artists Near You <ArrowRight size={16} />
              </Link>
              <button onClick={dismiss} className="w-full mt-3 text-sm text-henna-400 hover:text-henna-600 transition-colors">
                Maybe later
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
