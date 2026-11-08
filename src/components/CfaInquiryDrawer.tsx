import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Building2, MapPin, Phone, Mail, FileText, Send, ShieldCheck, AlertCircle } from 'lucide-react';
import { COMPANY_CONTACT, RAW_PRODUCT_PAYLOAD } from '../data/products';

interface CfaInquiryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CfaInquiryDrawer: React.FC<CfaInquiryDrawerProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    agencyName: '',
    contactPerson: '',
    phone: '',
    email: '',
    state: 'Maharashtra',
    city: 'Mumbai',
    drugLicenseNo: '',
    gstNo: '',
    selectedCategory: 'All Portfolios',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2800);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm"
          />

          {/* Slide-over Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="relative w-full max-w-xl h-full bg-white shadow-2xl border-l border-slate-200 z-10 flex flex-col overflow-y-auto"
          >
            {/* Header */}
            <div className="p-6 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600/30 text-blue-400 flex items-center justify-center font-bold">
                  CFA
                </div>
                <div>
                  <h3 className="text-lg font-extrabold tracking-tight">Stockist & CFA Territory Application</h3>
                  <p className="text-xs text-slate-400">Physiment Pharma Distribution Network</p>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Official Headquarters Notice */}
            <div className="p-4 bg-blue-50/70 border-b border-blue-100 flex items-start gap-3 text-xs text-blue-900">
              <Building2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Official Headquarters: </span>
                {COMPANY_CONTACT.address}
              </div>
            </div>

            {/* Form */}
            <div className="p-6 flex-grow">
              {submitted ? (
                <div className="p-8 text-center bg-emerald-50 rounded-2xl border border-emerald-200 my-8">
                  <div className="w-14 h-14 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900">Inquiry Dispatched Successfully</h4>
                  <p className="text-xs text-slate-600 mt-2 max-w-sm mx-auto leading-relaxed">
                    Our CFA Allocation Desk has received your details. A regional sales manager will contact you within 24 business hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                        Agency / Stockist Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.agencyName}
                        onChange={(e) => setFormData({ ...formData, agencyName: e.target.value })}
                        placeholder="e.g. Apex Pharma Agencies"
                        className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                        Key Contact Person *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.contactPerson}
                        onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                        placeholder="Name of proprietor / partner"
                        className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 font-medium"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="agency@example.com"
                        className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 font-medium"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                        Target State *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.state}
                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                        Target Territory / City *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 font-medium"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                        Drug License No (DL 20B/21B)
                      </label>
                      <input
                        type="text"
                        value={formData.drugLicenseNo}
                        onChange={(e) => setFormData({ ...formData, drugLicenseNo: e.target.value })}
                        placeholder="MH-MZ2-..."
                        className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                        GSTIN Number
                      </label>
                      <input
                        type="text"
                        value={formData.gstNo}
                        onChange={(e) => setFormData({ ...formData, gstNo: e.target.value })}
                        placeholder="27AAAAA0000A1Z5"
                        className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                      Target Product Division
                    </label>
                    <select
                      value={formData.selectedCategory}
                      onChange={(e) => setFormData({ ...formData, selectedCategory: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 font-medium"
                    >
                      <option value="All Portfolios">All Portfolios (Full Line Stockist)</option>
                      {RAW_PRODUCT_PAYLOAD.map((cat) => (
                        <option key={cat.category} value={cat.category}>
                          {cat.category} Division
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                      Territory Coverage & Past Experience
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Mention your active field reps, doctor coverage count, and existing agency lines..."
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 font-medium"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-gradient-to-r from-blue-600 via-sky-600 to-blue-700 hover:from-blue-700 hover:to-sky-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2"
                  >
                    <span>Submit Territory Application</span>
                    <Send className="w-4 h-4" />
                  </button>

                  <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 pt-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    <span>WHO-GMP Direct Supply Contracts Only</span>
                  </div>
                </form>
              )}
            </div>

            {/* Direct Dial Desk Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 text-xs text-slate-600 shrink-0">
              <span className="font-bold text-slate-900 block mb-1">Direct Stockist Helplines:</span>
              <div className="flex flex-wrap gap-4 font-mono text-[11px]">
                {COMPANY_CONTACT.phones.map((phone) => (
                  <a key={phone} href={`tel:${phone}`} className="text-blue-600 hover:underline">
                    {phone}
                  </a>
                ))}
              </div>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

