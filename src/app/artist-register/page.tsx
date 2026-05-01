'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Upload, CheckCircle, User, Image as ImageIcon, Briefcase, FileText } from 'lucide-react';
import { DESIGN_STYLES, OCCASIONS, LANGUAGES, CITIES } from '@/lib/constants';
import Link from 'next/link';

const steps = [
  { icon: User, title: 'Basic Info' },
  { icon: ImageIcon, title: 'Portfolio' },
  { icon: Briefcase, title: 'Services & Pricing' },
  { icon: FileText, title: 'About & FAQs' },
];

export default function ArtistRegisterPage() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="pt-20 min-h-screen bg-cream-50 flex items-center justify-center">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-2xl border border-cream-200 p-10 max-w-md text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"><CheckCircle size={32} className="text-green-600" /></div>
          <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-henna-700 mb-2">Registration Submitted! 🎉</h2>
          <p className="text-sm text-henna-400 mb-4">Your profile is under review. You&apos;ll receive a WhatsApp notification once approved. You also get <strong>5 FREE leads</strong> on approval!</p>
          <Link href="/" className="inline-flex px-6 py-3 bg-henna-700 text-cream-100 rounded-full font-semibold hover:bg-henna-600">Back to Home</Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-cream-50">
      <div className="max-w-3xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold font-[family-name:var(--font-heading)] text-henna-700 text-center mb-2">Join MehndiWalaa as an Artist</h1>
        <p className="text-center text-henna-400 text-sm mb-8">Create your professional storefront and start receiving leads</p>

        {/* Step Indicator */}
        <div className="flex items-center justify-center gap-2 mb-10">
          {steps.map((s, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                i <= step ? 'bg-henna-700 text-cream-100' : 'bg-cream-200 text-henna-400'
              }`}>{i + 1}</div>
              <span className={`text-sm hidden sm:block ${i <= step ? 'text-henna-700 font-medium' : 'text-henna-400'}`}>{s.title}</span>
              {i < steps.length - 1 && <div className={`w-8 h-0.5 ${i < step ? 'bg-henna-700' : 'bg-cream-300'}`} />}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl border border-cream-200 p-6 sm:p-8">
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div key="step0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                <h2 className="text-xl font-bold text-henna-700 font-[family-name:var(--font-heading)]">Basic Information</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div><label className="text-xs font-medium text-henna-600 mb-1 block">Full Name *</label><input placeholder="Your full name" className="w-full px-4 py-2.5 border border-cream-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold-500" /></div>
                  <div><label className="text-xs font-medium text-henna-600 mb-1 block">Phone *</label><input placeholder="+91" className="w-full px-4 py-2.5 border border-cream-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold-500" /></div>
                  <div><label className="text-xs font-medium text-henna-600 mb-1 block">City *</label>
                    <select className="w-full px-4 py-2.5 border border-cream-300 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-gold-500">
                      <option value="">Select City</option>{CITIES.map(c => <option key={c.slug}>{c.name}</option>)}
                    </select>
                  </div>
                  <div><label className="text-xs font-medium text-henna-600 mb-1 block">Locality</label><input placeholder="e.g. South Delhi" className="w-full px-4 py-2.5 border border-cream-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold-500" /></div>
                  <div><label className="text-xs font-medium text-henna-600 mb-1 block">Experience (years)</label><input type="number" placeholder="5" className="w-full px-4 py-2.5 border border-cream-300 rounded-xl text-sm" /></div>
                  <div><label className="text-xs font-medium text-henna-600 mb-1 block">Team Size</label><input type="number" placeholder="1" className="w-full px-4 py-2.5 border border-cream-300 rounded-xl text-sm" /></div>
                </div>
                <div><label className="text-xs font-medium text-henna-600 mb-2 block">Languages</label>
                  <div className="flex flex-wrap gap-2">{LANGUAGES.slice(0, 6).map(l => <label key={l} className="flex items-center gap-1.5 text-sm"><input type="checkbox" className="accent-gold-500" /> {l}</label>)}</div>
                </div>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                <h2 className="text-xl font-bold text-henna-700 font-[family-name:var(--font-heading)]">Portfolio Upload</h2>
                <p className="text-sm text-henna-400">Upload at least 5 portfolio images. All images require admin approval before publishing.</p>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="aspect-square rounded-xl border-2 border-dashed border-cream-300 flex flex-col items-center justify-center text-henna-400 hover:border-gold-500 hover:text-gold-600 cursor-pointer transition-colors">
                      <Upload size={20} /><span className="text-[10px] mt-1">Upload</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-henna-400">Supported: JPG, PNG, WebP. Max 5MB per image. Images will be watermarked.</p>
                <div>
                  <label className="text-xs font-medium text-henna-600 mb-1 block">YouTube Video URLs (optional)</label>
                  <input placeholder="https://youtube.com/watch?v=..." className="w-full px-4 py-2.5 border border-cream-300 rounded-xl text-sm" />
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                <h2 className="text-xl font-bold text-henna-700 font-[family-name:var(--font-heading)]">Services & Pricing</h2>
                <div><label className="text-xs font-medium text-henna-600 mb-2 block">Design Styles *</label>
                  <div className="flex flex-wrap gap-2">{DESIGN_STYLES.map(s => <label key={s} className="flex items-center gap-1.5 text-sm"><input type="checkbox" className="accent-gold-500" /> {s}</label>)}</div>
                </div>
                <div><label className="text-xs font-medium text-henna-600 mb-2 block">Occasions</label>
                  <div className="flex flex-wrap gap-2">{OCCASIONS.map(o => <label key={o} className="flex items-center gap-1.5 text-sm"><input type="checkbox" className="accent-gold-500" /> {o}</label>)}</div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div><label className="text-xs font-medium text-henna-600 mb-1 block">Min Price (₹)</label><input type="number" placeholder="5000" className="w-full px-4 py-2.5 border border-cream-300 rounded-xl text-sm" /></div>
                  <div><label className="text-xs font-medium text-henna-600 mb-1 block">Max Price (₹)</label><input type="number" placeholder="25000" className="w-full px-4 py-2.5 border border-cream-300 rounded-xl text-sm" /></div>
                </div>
                <label className="flex items-center gap-2 text-sm"><input type="checkbox" className="accent-gold-500" /> I offer trial sessions</label>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                <h2 className="text-xl font-bold text-henna-700 font-[family-name:var(--font-heading)]">About & FAQs</h2>
                <div><label className="text-xs font-medium text-henna-600 mb-1 block">Bio / About You</label>
                  <textarea rows={4} placeholder="Tell brides about your experience, specialties, and what makes you unique..." className="w-full px-4 py-2.5 border border-cream-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold-500" /></div>
                <div><label className="text-xs font-medium text-henna-600 mb-1 block">Cancellation Policy</label>
                  <textarea rows={2} placeholder="Your cancellation terms..." className="w-full px-4 py-2.5 border border-cream-300 rounded-xl text-sm" /></div>
                <p className="text-xs text-henna-400">Your storefront will be auto-generated but hidden until admin approval. On approval, you&apos;ll receive a WhatsApp notification + 5 FREE leads.</p>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex items-center justify-between mt-8 pt-6 border-t border-cream-100">
            <button onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0}
              className="px-5 py-2.5 text-henna-600 border border-cream-300 rounded-xl text-sm font-medium flex items-center gap-1 disabled:opacity-30"><ArrowLeft size={14} /> Back</button>
            {step < 3 ? (
              <button onClick={() => setStep(step + 1)} className="px-6 py-2.5 bg-henna-700 text-cream-100 rounded-xl text-sm font-semibold flex items-center gap-1 hover:bg-henna-600">
                Next <ArrowRight size={14} />
              </button>
            ) : (
              <button onClick={() => setSubmitted(true)} className="px-6 py-2.5 bg-gold-500 text-henna-900 rounded-xl text-sm font-bold hover:bg-gold-400 flex items-center gap-1">
                <CheckCircle size={14} /> Submit for Review
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
