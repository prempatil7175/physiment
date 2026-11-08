import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Sparkles, FileText, ExternalLink } from 'lucide-react';
import { Product } from '../types';

interface MobileCarouselProps {
  products: Product[];
  onOpenModal: (product: Product) => void;
}

export const MobileCarousel: React.FC<MobileCarouselProps> = ({ products, onOpenModal }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (products.length === 0) return null;

  const currentProduct = products[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % products.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  return (
    <div className="w-full relative px-2 py-4">
      {/* Mobile Header indicator */}
      <div className="flex items-center justify-between mb-3 px-2">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          Swipe Carousel ({currentIndex + 1} / {products.length})
        </span>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={handlePrev}
            className="w-8 h-8 rounded-full bg-white border border-slate-200 text-slate-700 flex items-center justify-center shadow-sm active:scale-95"
            aria-label="Previous card"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleNext}
            className="w-8 h-8 rounded-full bg-white border border-slate-200 text-slate-700 flex items-center justify-center shadow-sm active:scale-95"
            aria-label="Next card"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Swipeable Animated Card Container */}
      <div className="relative overflow-hidden min-h-[380px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentProduct.id}
            initial={{ opacity: 0, x: 50, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -50, scale: 0.95 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.4}
            onDragEnd={(_, info) => {
              if (info.offset.x < -40) handleNext();
              else if (info.offset.x > 40) handlePrev();
            }}
            onClick={() => onOpenModal(currentProduct)}
            className="w-full bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden cursor-pointer"
          >
            {/* Accent gradient bar */}
            <div className={`h-2 w-full bg-gradient-to-r ${currentProduct.accentGradient}`} />

            <div className="p-6 flex flex-col justify-between">
              {/* Category & Badge */}
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  {currentProduct.category}
                </span>
                <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-full border ${currentProduct.badgeColor}`}>
                  {currentProduct.formType}
                </span>
              </div>

              {/* Title & Brand */}
              <div className="mb-4">
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                  {currentProduct.name}
                </h3>
                <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded inline-block mt-1">
                  Variant: {currentProduct.brandVariant}
                </span>
              </div>

              {/* Chemical specs */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 mb-5 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-blue-600 uppercase tracking-wider">
                  <FileText className="w-3.5 h-3.5" />
                  <span>Chemical Composition</span>
                </div>
                <p className="text-xs font-medium text-slate-700 leading-relaxed font-mono bg-white p-2.5 rounded-xl border border-slate-100">
                  {currentProduct.composition}
                </p>
              </div>

              {/* Bottom Price & Action */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">
                    MRP per unit
                  </span>
                  <span className="text-2xl font-black text-slate-900">
                    {currentProduct.price.startsWith('₹') ? currentProduct.price : `₹ ${currentProduct.price}`}
                  </span>
                </div>

                <button
                  type="button"
                  className="px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 flex items-center gap-1.5 shadow-md shadow-blue-500/25"
                >
                  <span>View Details</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Pagination Dots */}
      <div className="flex items-center justify-center gap-1.5 mt-4">
        {products.map((p, idx) => (
          <button
            key={p.id}
            type="button"
            onClick={() => setCurrentIndex(idx)}
            className={`h-2 rounded-full transition-all duration-300 ${
              idx === currentIndex ? 'w-6 bg-blue-600' : 'w-2 bg-slate-300'
            }`}
            aria-label={`Go to product ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

