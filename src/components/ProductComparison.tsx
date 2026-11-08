import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, Check, Sparkles, Scale, Trash2 } from 'lucide-react';
import { Product } from '../types';

interface ProductComparisonProps {
  selectedProducts: Product[];
  onRemove: (productId: string) => void;
  onClear: () => void;
  isOpen: boolean;
  onClose: () => void;
}

export const ProductComparison: React.FC<ProductComparisonProps> = ({
  selectedProducts,
  onRemove,
  onClear,
  isOpen,
  onClose,
}) => {
  if (selectedProducts.length === 0) return null;

  return (
    <>
      {/* Floating Bottom Bar when items are selected */}
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 80, opacity: 0 }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-[95%] max-w-2xl bg-slate-900/95 backdrop-blur-xl border border-slate-700/80 rounded-2xl shadow-2xl p-3.5 sm:p-4 text-white flex items-center justify-between gap-3"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600/30 border border-blue-500/40 text-blue-400 flex items-center justify-center shrink-0">
            <Scale className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs sm:text-sm font-bold flex items-center gap-2">
              <span>Comparing {selectedProducts.length} Formulations</span>
              <span className="text-[10px] bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full font-mono">
                {selectedProducts.length}/3
              </span>
            </div>
            <div className="text-[11px] text-slate-400 hidden sm:block">
              {selectedProducts.map((p) => p.name).join(' • ')}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onClear}
            className="p-2 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-slate-800 transition-colors"
            title="Clear comparison"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-500 hover:to-sky-400 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-500/25 flex items-center gap-1.5 transition-all"
          >
            <span>{isOpen ? 'Close Matrix' : 'Open Matrix'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </motion.div>

      {/* Full Comparison Matrix Overlay */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden z-10 my-8 flex flex-col max-h-[90vh]"
            >
              {/* Header */}
              <div className="p-6 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-600/30 text-blue-400 flex items-center justify-center">
                    <Scale className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-extrabold tracking-tight">Formulation Comparison Matrix</h3>
                    <p className="text-xs text-slate-400">Side-by-side stoichiometric and pharmacopeial evaluation</p>
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

              {/* Comparison Table Grid */}
              <div className="p-6 overflow-x-auto flex-grow">
                <table className="w-full text-left border-collapse min-w-[650px]">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="py-4 px-4 text-xs font-bold uppercase tracking-wider text-slate-400 w-1/4">
                        Formulation Attribute
                      </th>
                      {selectedProducts.map((product) => (
                        <th key={product.id} className="py-4 px-4 w-1/4">
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-extrabold text-base text-slate-900">{product.name}</span>
                            <button
                              type="button"
                              onClick={() => onRemove(product.id)}
                              className="text-slate-400 hover:text-rose-500 p-1"
                              title="Remove item"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                          <span className="text-[11px] text-blue-600 font-semibold block mt-0.5">{product.category}</span>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                    {/* MRP */}
                    <tr className="bg-slate-50/50">
                      <td className="py-3.5 px-4 font-bold text-slate-700">Maximum Retail Price (MRP)</td>
                      {selectedProducts.map((p) => (
                        <td key={p.id} className="py-3.5 px-4 font-black text-slate-900 text-base">
                          {p.price.startsWith('₹') ? p.price : `₹ ${p.price}`}
                        </td>
                      ))}
                    </tr>

                    {/* Active Chemical Composition */}
                    <tr>
                      <td className="py-4 px-4 font-bold text-slate-700 align-top">Active Stoichiometry & APIs</td>
                      {selectedProducts.map((p) => (
                        <td key={p.id} className="py-4 px-4 font-mono text-xs text-slate-800 leading-relaxed bg-blue-50/20 align-top">
                          {p.composition}
                        </td>
                      ))}
                    </tr>

                    {/* Dosage Release Mechanism */}
                    <tr className="bg-slate-50/50">
                      <td className="py-3.5 px-4 font-bold text-slate-700">Release Profile</td>
                      {selectedProducts.map((p) => (
                        <td key={p.id} className="py-3.5 px-4 font-semibold text-slate-800">
                          <span className={`inline-block px-2.5 py-1 rounded-full text-xs border ${p.badgeColor}`}>
                            {p.formType}
                          </span>
                        </td>
                      ))}
                    </tr>

                    {/* Therapeutic Class */}
                    <tr>
                      <td className="py-3.5 px-4 font-bold text-slate-700">Therapeutic Segment</td>
                      {selectedProducts.map((p) => (
                        <td key={p.id} className="py-3.5 px-4 text-slate-600 font-medium">
                          {p.therapeuticArea}
                        </td>
                      ))}
                    </tr>

                    {/* Packaging */}
                    <tr className="bg-slate-50/50">
                      <td className="py-3.5 px-4 font-bold text-slate-700">Packaging Format</td>
                      {selectedProducts.map((p) => (
                        <td key={p.id} className="py-3.5 px-4 text-slate-700 font-medium">
                          {p.packagingUnit}
                        </td>
                      ))}
                    </tr>

                    {/* Pharmacopeial Compliance */}
                    <tr>
                      <td className="py-3.5 px-4 font-bold text-slate-700">Quality Standard</td>
                      {selectedProducts.map((p) => (
                        <td key={p.id} className="py-3.5 px-4 text-emerald-700 font-bold flex items-center gap-1.5">
                          <Check className="w-4 h-4 text-emerald-600" />
                          <span>IP / USPNF Compliant</span>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Matrix Footer */}
              <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
                <span>Click "Clear" to reset the matrix or select other formulations from the catalog.</span>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl"
                >
                  Return to Portfolio
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

