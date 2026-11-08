import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Copy, Pill, ShieldAlert, Award, FileSpreadsheet, PhoneForwarded } from 'lucide-react';
import { Product } from '../types';
import { COMPANY_CONTACT } from '../data/products';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [inquirySent, setInquirySent] = useState(false);

  if (!product) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(
      `Product: ${product.name}\nComposition: ${product.composition}\nPrice: ${product.price}\nCategory: ${product.category}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleInquiry = () => {
    setInquirySent(true);
    setTimeout(() => setInquirySent(false), 3000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          layoutId={`card-container-${product.id}`}
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden z-10 my-8"
        >
          {/* Header Accent Bar */}
          <div className={`h-2.5 w-full bg-gradient-to-r ${product.accentGradient}`} />

          <div className="p-6 sm:p-8">
            {/* Top Close Button & Category */}
            <div className="flex items-center justify-between mb-4">
              <span className={`text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full border ${product.badgeColor}`}>
                {product.category}
              </span>

              <button
                type="button"
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 flex items-center justify-center transition-colors"
                aria-label="Close details"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Product Title & Basic Info */}
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-6 border-b border-slate-100">
              <div>
                <motion.h2
                  layoutId={`title-${product.id}`}
                  className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight"
                >
                  {product.name}
                </motion.h2>
                <p className="text-sm font-semibold text-blue-600 mt-1">
                  Therapeutic Class: {product.therapeuticArea}
                </p>
              </div>

              <div className="text-left sm:text-right">
                <span className="text-xs uppercase font-bold text-slate-400 block">Maximum Retail Price</span>
                <span className="text-2xl sm:text-3xl font-black text-slate-900">
                  {product.price.startsWith('₹') ? product.price : `₹ ${product.price}`}
                </span>
              </div>
            </div>

            {/* Deep Chemical Specification Section */}
            <div className="py-6 space-y-5">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                    <Pill className="w-4 h-4 text-blue-600" />
                    Complete Active Chemical Composition
                  </h4>
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-600">Copied to clipboard</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy formulation</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 font-mono text-sm text-slate-800 leading-relaxed shadow-inner">
                  {product.composition}
                </div>
              </div>

              {/* Formulation Specifications Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="p-3 rounded-xl bg-blue-50/60 border border-blue-100">
                  <span className="text-[11px] font-bold uppercase text-blue-600 block">Dosage Form</span>
                  <span className="text-xs font-bold text-slate-800">{product.formType}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[11px] font-bold uppercase text-slate-500 block">Packaging</span>
                  <span className="text-xs font-bold text-slate-800">{product.packagingUnit}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 col-span-2 sm:col-span-1">
                  <span className="text-[11px] font-bold uppercase text-slate-500 block">Compliance</span>
                  <span className="text-xs font-bold text-slate-800">IP / USPNF Grade</span>
                </div>
              </div>

              {/* Clinical Indications Tags */}
              <div>
                <h5 className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Key Therapeutic Indications
                </h5>
                <div className="flex flex-wrap gap-2">
                  {product.indications.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-semibold px-3 py-1 rounded-lg bg-slate-100 text-slate-700 border border-slate-200/80"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Warning Notice */}
              <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-3 text-amber-900">
                <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <p className="text-xs leading-relaxed">
                  <span className="font-bold">CAUTION: </span>
                  To be sold by retail on the prescription of a Registered Medical Practitioner only. Store in a cool, dry place protected from light and moisture.
                </p>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
              <a
                href={`tel:${COMPANY_CONTACT.phones[0]}`}
                className="w-full sm:w-auto px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-700 bg-slate-100 hover:bg-slate-200 flex items-center justify-center gap-2 transition-colors"
              >
                <PhoneForwarded className="w-4 h-4 text-blue-600" />
                <span>Call Stockist Desk</span>
              </a>

              <button
                type="button"
                onClick={handleInquiry}
                className={`w-full sm:w-auto px-7 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-white shadow-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                  inquirySent
                    ? 'bg-emerald-600 shadow-emerald-500/25'
                    : 'bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-700 hover:to-sky-700 shadow-blue-500/25'
                }`}
              >
                {inquirySent ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Inquiry Registered!</span>
                  </>
                ) : (
                  <>
                    <FileSpreadsheet className="w-4 h-4" />
                    <span>Request Stockist Quotation</span>
                  </>
                )}
              </button>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

