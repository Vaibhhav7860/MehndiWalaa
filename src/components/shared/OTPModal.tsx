'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export function OTPModal() {
  const { isOtpModalOpen, closeOtpModal, login } = useAuth();
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [step, setStep] = useState<'phone' | 'otp' | 'success'>('phone');
  const [timer, setTimer] = useState(30);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (step === 'otp' && timer > 0) {
      const t = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(t);
    }
  }, [step, timer]);

  const handleSendOtp = () => { if (phone.length >= 10) { setStep('otp'); setTimer(30); } };
  const handleOtpChange = (i: number, v: string) => {
    if (v.length > 1) return;
    const newOtp = [...otp]; newOtp[i] = v; setOtp(newOtp);
    if (v && i < 5) inputRefs.current[i + 1]?.focus();
    if (newOtp.every(d => d !== '')) { setTimeout(() => { setStep('success'); setTimeout(() => login(phone), 1000); }, 500); }
  };
  const handleKeyDown = (i: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[i] && i > 0) inputRefs.current[i - 1]?.focus();
  };

  const reset = () => { setStep('phone'); setPhone(''); setOtp(['','','','','','']); };

  return (
    <AnimatePresence>
      {isOtpModalOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 z-[60]" onClick={() => { closeOtpModal(); reset(); }} />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md bg-white rounded-2xl shadow-2xl z-[61] p-8"
          >
            <button onClick={() => { closeOtpModal(); reset(); }} className="absolute top-4 right-4 text-henna-400 hover:text-henna-700">
              <X size={20} />
            </button>

            {step === 'phone' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-henna-700 mb-2">Welcome to MehndiWalaa</h2>
                <p className="text-henna-400 text-sm mb-6">Enter your mobile number to continue</p>
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-3 py-3 bg-cream-100 rounded-lg text-sm font-medium text-henna-700 border border-cream-300">+91</span>
                  <input type="tel" value={phone} onChange={e => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    placeholder="Enter mobile number" maxLength={10}
                    className="flex-1 px-4 py-3 border border-cream-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent text-henna-800" autoFocus />
                </div>
                <button onClick={handleSendOtp} disabled={phone.length < 10}
                  className="w-full py-3 bg-henna-700 text-cream-100 rounded-full font-semibold hover:bg-henna-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2">
                  Send OTP <ArrowRight size={16} />
                </button>
                <p className="text-xs text-henna-400 mt-4 text-center">By continuing, you agree to our Terms of Service & Privacy Policy</p>
              </motion.div>
            )}

            {step === 'otp' && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-henna-700 mb-2">Verify OTP</h2>
                <p className="text-henna-400 text-sm mb-6">Enter the 6-digit code sent to +91 {phone}</p>
                <div className="flex gap-2 mb-6 justify-center">
                  {otp.map((d, i) => (
                    <input key={i} ref={el => { inputRefs.current[i] = el; }} type="text" inputMode="numeric" value={d}
                      onChange={e => handleOtpChange(i, e.target.value)} onKeyDown={e => handleKeyDown(i, e)} maxLength={1}
                      className="w-12 h-14 text-center text-xl font-bold border-2 border-cream-300 rounded-xl focus:border-gold-500 focus:ring-2 focus:ring-gold-200 outline-none text-henna-800 transition-all" />
                  ))}
                </div>
                <p className="text-center text-sm text-henna-400">
                  {timer > 0 ? `Resend OTP in ${timer}s` : <button onClick={() => setTimer(30)} className="text-gold-600 font-medium hover:underline">Resend OTP</button>}
                </p>
              </motion.div>
            )}

            {step === 'success' && (
              <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <motion.svg initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5 }} className="w-8 h-8 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}>
                    <motion.path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                  </motion.svg>
                </div>
                <h2 className="text-xl font-bold text-henna-700 mb-1">Welcome!</h2>
                <p className="text-henna-400 text-sm">You&apos;re now logged in</p>
              </motion.div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
