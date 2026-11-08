import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Pill, ShieldCheck, ArrowUpRight, PhoneCall } from 'lucide-react';
import { NAV_LINKS, COMPANY_CONTACT } from '../data/products';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('Our Product');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -90, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'glass-panel shadow-sm py-3.5 border-b border-slate-200/80'
            : 'bg-white/80 backdrop-blur-md py-5 border-b border-slate-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            
            {/* Brand Logo */}
            <a href="#home" className="flex items-center gap-3 group">
              <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-blue-600 to-sky-500 text-white shadow-md shadow-blue-500/25 group-hover:scale-105 transition-transform duration-300">
                <Pill className="w-6 h-6 rotate-45 transform group-hover:rotate-90 transition-transform duration-500" />
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-400 border-2 border-white rounded-full"></span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-extrabold tracking-tight text-slate-900 group-hover:text-blue-700 transition-colors">
                  PHYSIMENT<span className="text-blue-600">.</span>
                </span>
                <span className="text-[10px] uppercase tracking-widest font-bold text-slate-400 -mt-1">
                  PHARMACEUTICALS
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden xl:flex items-center space-x-1 lg:space-x-2">
              {NAV_LINKS.map((link) => {
                const isActive = activeLink === link.label;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setActiveLink(link.label)}
                    className={`relative px-3.5 py-2 text-sm font-semibold rounded-lg transition-colors ${
                      isActive
                        ? 'text-blue-700 font-bold'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <motion.div
                        layoutId="activeNavPill"
                        className="absolute bottom-0 left-2 right-2 h-0.5 bg-blue-600 rounded-full"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                  </a>
                );
              })}
            </nav>

            {/* Quick Actions & Contact Badge */}
            <div className="hidden md:flex items-center gap-3">
              <a
                href={`tel:${COMPANY_CONTACT.phones[0]}`}
                className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200/80 rounded-lg transition-colors"
              >
                <PhoneCall className="w-3.5 h-3.5 text-blue-600" />
                <span>{COMPANY_CONTACT.phones[0]}</span>
              </a>

              <a
                href="#cfa"
                className="group relative inline-flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-700 hover:to-sky-700 rounded-lg shadow-md shadow-blue-500/20 hover:shadow-blue-500/35 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Stockist Inquiry</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>

            {/* Mobile Menu Toggle Button */}
            <div className="flex xl:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-slate-700 hover:text-blue-600 hover:bg-slate-100 focus:outline-none"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="xl:hidden bg-white/95 backdrop-blur-xl border-b border-slate-200 px-4 pt-3 pb-6 shadow-xl"
            >
              <div className="flex flex-col space-y-1.5">
                {NAV_LINKS.map((link, idx) => (
                  <motion.a
                    key={link.label}
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.04 }}
                    href={link.href}
                    onClick={() => {
                      setActiveLink(link.label);
                      setMobileMenuOpen(false);
                    }}
                    className={`px-3 py-2.5 rounded-lg text-sm font-semibold flex items-center justify-between ${
                      activeLink === link.label
                        ? 'bg-blue-50 text-blue-700 font-bold'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span>{link.label}</span>
                    {activeLink === link.label && (
                      <span className="w-2 h-2 rounded-full bg-blue-600" />
                    )}
                  </motion.a>
                ))}

                <div className="pt-4 border-t border-slate-100 mt-2 flex flex-col gap-2">
                  <a
                    href="#cfa"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full text-center py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-blue-600 rounded-lg shadow-sm"
                  >
                    Stockist & CFA Inquiry
                  </a>
                  <div className="flex items-center justify-center gap-2 text-xs text-slate-500 py-1">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    <span>WHO-GMP Certified Formulations</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
};

