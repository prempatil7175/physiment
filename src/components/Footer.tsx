import React from 'react';
import { motion } from 'framer-motion';
import {
  MapPin,
  Mail,
  Phone,
  Pill,
  ArrowUpRight,
  ShieldCheck,
  Heart,
  Send,
  Building2,
} from 'lucide-react';
import { COMPANY_CONTACT, NAV_LINKS } from '../data/products';

export const Footer: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 18,
        stiffness: 180,
      },
    },
  };

  return (
    <footer id="contact" className="relative bg-slate-950 text-slate-300 pt-20 pb-12 overflow-hidden border-t border-slate-800">
      {/* Background Accent Gradients */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-sky-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Grid: Brand & Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-16 border-b border-slate-800/80">
          
          {/* Col 1: Brand & Mission */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-sky-500 text-white shadow-lg shadow-blue-500/30">
                <Pill className="w-6 h-6 rotate-45" />
              </div>
              <div>
                <span className="text-2xl font-black text-white tracking-tight">
                  PHYSIMENT<span className="text-blue-500">.</span>
                </span>
                <span className="block text-[10px] uppercase font-bold tracking-widest text-slate-400">
                  PHARMACEUTICALS PVT. LTD.
                </span>
              </div>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed max-w-md">
              Accelerating access to quality medicines for people everywhere. Committed to delivering
              therapeutically bioequivalent and affordable prescription therapies across global healthcare standards.
            </p>

            {/* Newsletter / Stockist Quick Connect */}
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300 block">
                Stay Updated on Stockist Allotments
              </span>
              <div className="flex items-center max-w-md">
                <input
                  type="email"
                  placeholder="Enter your professional email..."
                  className="w-full px-4 py-2.5 text-xs bg-slate-900 border border-slate-800 rounded-l-xl focus:outline-none focus:border-blue-500 text-white placeholder:text-slate-500"
                />
                <button
                  type="button"
                  className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-r-xl transition-colors flex items-center gap-1.5"
                >
                  <span>Connect</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white">
              Navigation & Portfolios
            </h4>
            <ul className="space-y-2.5 text-sm">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-slate-400 hover:text-white transition-colors flex items-center justify-between group"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-blue-400" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Official Registered Office & Contact Details */}
          <div className="lg:col-span-4 space-y-4" id="cfa">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white">
              Corporate Headquarters & Stockist Desk
            </h4>
            
            <div className="space-y-3.5 text-xs sm:text-sm">
              <div className="flex items-start gap-3 text-slate-300">
                <MapPin className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  {COMPANY_CONTACT.address}
                </span>
              </div>

              <div className="flex items-center gap-3 text-slate-300">
                <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                <a
                  href={`mailto:${COMPANY_CONTACT.emails[0]}`}
                  className="hover:text-blue-400 transition-colors underline-offset-4 hover:underline"
                >
                  {COMPANY_CONTACT.emails[0]}
                </a>
              </div>

              <div className="flex flex-col gap-2 pt-1">
                {COMPANY_CONTACT.phones.map((phone) => (
                  <div key={phone} className="flex items-center gap-3 text-slate-300">
                    <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                    <a
                      href={`tel:${phone}`}
                      className="hover:text-emerald-400 transition-colors font-mono font-medium"
                    >
                      {phone}
                    </a>
                  </div>
                ))}
              </div>

              <div className="pt-2 flex items-center gap-2 text-xs text-slate-400">
                <Building2 className="w-4 h-4 text-slate-500" />
                <span>CIN / Registration: Registered Pharmaceutical Entity (MH)</span>
              </div>
            </div>
          </div>

        </div>

        {/* Hover-staggered Social Links Animation Section */}
        <div className="py-10 border-b border-slate-800/80">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <span className="text-xs uppercase tracking-widest font-bold text-slate-400 block mb-1">
                Connect Across Channels
              </span>
              <p className="text-xs text-slate-500">
                Join our clinical scientific network and distribution channels.
              </p>
            </div>

            {/* Staggered Social Links with Hover Physics */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-wrap items-center gap-2.5 sm:gap-3"
            >
              {COMPANY_CONTACT.socials.map((social) => (
                <motion.a
                  key={social.name}
                  variants={itemVariants}
                  whileHover={{
                    scale: 1.08,
                    y: -3,
                    transition: { type: 'spring', stiffness: 400, damping: 15 },
                  }}
                  whileTap={{ scale: 0.95 }}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`px-4 py-2 rounded-xl text-xs font-bold text-slate-300 bg-slate-900 border border-slate-800 transition-all duration-200 shadow-sm ${social.color}`}
                >
                  {social.name}
                </motion.a>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Bottom Legal, Disclaimer & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-blue-500" />
            <span>
              © {new Date().getFullYear()} Physiment Pharma Pvt. Ltd. All rights reserved.
            </span>
          </div>

          <p className="text-[11px] text-slate-500 max-w-xl text-center md:text-right">
            Disclaimer: Information provided is intended solely for registered healthcare practitioners and certified stockists.
            Medicines depicted require valid Schedule H prescriptions.
          </p>
        </div>

      </div>
    </footer>
  );
};

