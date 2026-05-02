'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, User, Heart, Bell, LogOut, ChevronDown, Palette, Settings } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { NAV_LINKS } from '@/lib/constants';
import { mockNotifications } from '@/data/mock';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState(mockNotifications);
  const { user, isAuthenticated, openOtpModal, logout } = useAuth();
  const unreadCount = notifications.filter(n => !n.isRead).length;
  const markAllRead = () => setNotifications(notifications.map(n => ({ ...n, isRead: true })));

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gold-100'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-1.5 sm:gap-2 group min-w-0">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden border-2 border-gold-500 group-hover:border-gold-400 transition-colors flex-shrink-0">
                <Image src="/images/logo.png" alt="MehndiWalaa" width={40} height={40} className="object-cover w-full h-full" />
              </div>
              <div className="min-w-0">
                <span className="text-[17px] sm:text-xl font-bold font-[family-name:var(--font-heading)] text-henna-700 whitespace-nowrap block truncate">
                  Mehndi<span className="text-gold-500">Walaa</span>
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 text-sm font-medium text-henna-800 hover:text-gold-600 transition-colors rounded-lg hover:bg-gold-50"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
              {isAuthenticated ? (
                <>
                  <Link href="/dashboard/shortlist" className="p-1 sm:p-2 text-henna-600 hover:text-gold-500 transition-colors relative flex-shrink-0">
                    <Heart size={20} className="w-5 h-5 sm:w-6 sm:h-6" />
                    <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-gold-500 text-white text-[10px] rounded-full flex items-center justify-center">3</span>
                  </Link>
                  <div className="relative flex-shrink-0">
                    <button onClick={() => { setIsNotifOpen(!isNotifOpen); setIsProfileOpen(false); }} className="p-1 sm:p-2 text-henna-600 hover:text-gold-500 transition-colors relative">
                      <Bell size={20} className="w-5 h-5 sm:w-6 sm:h-6" />
                      {unreadCount > 0 && <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-henna-600 text-white text-[10px] rounded-full flex items-center justify-center">{unreadCount}</span>}
                    </button>
                    <AnimatePresence>
                      {isNotifOpen && (
                        <motion.div initial={{ opacity: 0, y: 8, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 8, scale: 0.95 }}
                          className="absolute right-0 top-12 w-80 bg-white rounded-xl shadow-xl border border-cream-200 z-50 overflow-hidden">
                          <div className="flex items-center justify-between px-4 py-3 border-b border-cream-100">
                            <span className="font-semibold text-sm text-henna-700">Notifications</span>
                            {unreadCount > 0 && <button onClick={markAllRead} className="text-xs text-gold-600 hover:underline">Mark all read</button>}
                          </div>
                          <div className="max-h-80 overflow-y-auto">
                            {notifications.length === 0 ? (
                              <p className="p-4 text-sm text-henna-400 text-center">No notifications</p>
                            ) : notifications.map(n => (
                              <Link key={n.id} href={n.actionUrl || '#'} onClick={() => { setNotifications(notifications.map(x => x.id === n.id ? { ...x, isRead: true } : x)); setIsNotifOpen(false); }}
                                className={`block px-4 py-3 border-b border-cream-50 hover:bg-cream-50 transition-colors ${!n.isRead ? 'bg-gold-50/50' : ''}`}>
                                <p className="text-sm font-medium text-henna-800">{n.title}</p>
                                <p className="text-xs text-henna-400 mt-0.5 line-clamp-2">{n.message}</p>
                                <p className="text-[10px] text-henna-300 mt-1">{new Date(n.timestamp).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}</p>
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  <div className="relative flex-shrink-0">
                    <button onClick={() => setIsProfileOpen(!isProfileOpen)} className="flex items-center gap-1 sm:gap-2 p-1 sm:pl-2 sm:pr-3 sm:py-1.5 rounded-full bg-cream-100 hover:bg-cream-200 transition-colors">
                      <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gold-500 flex items-center justify-center text-white text-xs font-bold">
                        {user?.name?.[0]}
                      </div>
                      <span className="text-sm font-medium text-henna-800 hidden sm:block">{user?.name?.split(' ')[0]}</span>
                      <ChevronDown size={14} className="text-henna-400 hidden sm:block" />
                    </button>
                    <AnimatePresence>
                      {isProfileOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.95 }}
                          className="absolute right-0 top-12 w-56 bg-white rounded-xl shadow-xl border border-cream-200 py-2 z-50"
                        >
                          <Link href="/dashboard" className="flex items-center gap-3 px-4 py-2.5 text-sm text-henna-800 hover:bg-cream-50 transition-colors" onClick={() => setIsProfileOpen(false)}>
                            <User size={16} /> My Dashboard
                          </Link>
                          <Link href="/dashboard/shortlist" className="flex items-center gap-3 px-4 py-2.5 text-sm text-henna-800 hover:bg-cream-50 transition-colors" onClick={() => setIsProfileOpen(false)}>
                            <Heart size={16} /> My Shortlist
                          </Link>
                          <hr className="my-1 border-cream-200" />
                          <Link href="/artist-dashboard" className="flex items-center gap-3 px-4 py-2.5 text-sm text-gold-700 hover:bg-gold-50 transition-colors font-medium" onClick={() => setIsProfileOpen(false)}>
                            <Palette size={16} /> Artist Dashboard
                          </Link>
                          <Link href="/admin" className="flex items-center gap-3 px-4 py-2.5 text-sm text-henna-600 hover:bg-cream-50 transition-colors" onClick={() => setIsProfileOpen(false)}>
                            <Settings size={16} /> Admin Panel
                          </Link>
                          <hr className="my-1 border-cream-200" />
                          <button onClick={() => { logout(); setIsProfileOpen(false); }} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-henna-500 hover:bg-henna-50 transition-colors">
                            <LogOut size={16} /> Logout
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </>
              ) : (
                <button
                  onClick={openOtpModal}
                  className="px-3 py-1.5 sm:px-5 sm:py-2 bg-henna-700 text-cream-100 text-sm font-semibold rounded-full hover:bg-henna-600 transition-all hover:shadow-lg hover:shadow-henna-700/20 flex-shrink-0"
                >
                  Login
                </button>
              )}
              <button onClick={() => setIsMobileOpen(true)} className="md:hidden p-1 sm:p-2 text-henna-700 flex-shrink-0">
                <Menu size={24} className="w-6 h-6 sm:w-6 sm:h-6" />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/40 z-50" onClick={() => setIsMobileOpen(false)} />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 250 }}
              className="fixed right-0 top-0 bottom-0 w-72 bg-white z-50 shadow-2xl"
            >
              <div className="flex items-center justify-between p-4 border-b border-cream-200">
                <span className="text-lg font-bold font-[family-name:var(--font-heading)] text-henna-700">Menu</span>
                <button onClick={() => setIsMobileOpen(false)}><X size={24} className="text-henna-700" /></button>
              </div>
              <nav className="p-4 flex flex-col gap-1">
                {NAV_LINKS.map(link => (
                  <Link key={link.href} href={link.href} onClick={() => setIsMobileOpen(false)}
                    className="px-4 py-3 text-henna-800 hover:bg-cream-50 rounded-lg transition-colors font-medium">
                    {link.label}
                  </Link>
                ))}
                {!isAuthenticated && (
                  <button onClick={() => { openOtpModal(); setIsMobileOpen(false); }}
                    className="mt-4 w-full py-3 bg-henna-700 text-cream-100 rounded-full font-semibold hover:bg-henna-600 transition-colors">
                    Login with OTP
                  </button>
                )}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
