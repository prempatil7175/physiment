import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { Pill, Sparkles, Check, Copy, ChevronRight, Layers, FileText, ExternalLink } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onOpenModal: (product: Product) => void;
  index: number;
  isCompared?: boolean;
  onToggleCompare?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onOpenModal,
  index,
  isCompared = false,
  onToggleCompare,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [copied, setCopied] = useState(false);

  // Motion values for 3D tilt & cursor spotlight
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const mousePxX = useMotionValue(0);
  const mousePxY = useMotionValue(0);

  // Smooth springs for buttery tilt physics
  const springConfig = { damping: 18, stiffness: 220, mass: 0.6 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // 3D rotation transforms
  const rotateX = useTransform(smoothY, [0, 1], [10, -10]);
  const rotateY = useTransform(smoothX, [0, 1], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    mouseX.set(x);
    mouseY.set(y);
    mousePxX.set(e.clientX - rect.left);
    mousePxY.set(e.clientY - rect.top);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(`${product.name}: ${product.composition}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      layout
      layoutId={`card-container-${product.id}`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{
        duration: 0.5,
        delay: index * 0.04,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="relative group perspective-1000"
      data-card-hover="true"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => onOpenModal(product)}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="relative rounded-2xl bg-white border border-slate-200/90 shadow-glass overflow-hidden cursor-pointer transition-shadow duration-300 hover:shadow-2xl hover:border-transparent flex flex-col h-full"
      >
        {/* Dynamic Glowing Border Spotlight (Follows Cursor) */}
        <motion.div
          className="pointer-events-none absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
          style={{
            background: useTransform(
              [mousePxX, mousePxY],
              ([x, y]) =>
                `radial-gradient(420px circle at ${x}px ${y}px, rgba(14, 165, 233, 0.8), rgba(99, 102, 241, 0.4) 40%, transparent 80%)`
            ),
            mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            maskComposite: 'exclude',
            WebkitMaskComposite: 'xor',
            padding: '1.8px',
          }}
        />

        {/* Ambient Top Glow Bar */}
        <div className={`h-1.5 w-full bg-gradient-to-r ${product.accentGradient}`} />

        {/* Inner Card Content */}
        <div className="p-5 sm:p-6 flex flex-col flex-grow justify-between relative z-20">
          
          {/* Card Header (Category & Formulation Badge) */}
          <div className="flex items-center justify-between gap-2 mb-4">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              {product.category}
            </span>

            <div className="flex items-center gap-2">
              {onToggleCompare && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleCompare(product);
                  }}
                  className={`text-[10px] font-bold px-2 py-1 rounded-lg border transition-colors ${
                    isCompared
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-blue-400 hover:text-blue-600'
                  }`}
                  title="Compare with another formulation"
                >
                  {isCompared ? '✓ Added' : '+ Compare'}
                </button>
              )}

              <span className={`text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full border ${product.badgeColor}`}>
                {product.formType}
              </span>
            </div>
          </div>

          {/* Main Brand Section */}
          <div className="mb-4">
            <motion.h3
              layoutId={`title-${product.id}`}
              className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors"
            >
              {product.name}
            </motion.h3>

            <div className="mt-1 flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-500">Variant:</span>
              <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                {product.brandVariant}
              </span>
            </div>
          </div>

          {/* Seamless Morph Expansion: Chemical Composition & Excipients */}
          {/* Default vs Hover/Expanded state */}
          <motion.div layout className="my-2 flex-grow">
            <AnimatePresence initial={false}>
              {isHovered ? (
                <motion.div
                  key="expanded"
                  initial={{ opacity: 0, height: 0, y: 10 }}
                  animate={{ opacity: 1, height: 'auto', y: 0 }}
                  exit={{ opacity: 0, height: 0, y: 10 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="p-3.5 rounded-xl bg-slate-50/90 border border-slate-200/80 mb-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 flex items-center gap-1">
                        <FileText className="w-3.5 h-3.5" />
                        Chemical Composition
                      </span>
                      <button
                        type="button"
                        onClick={handleCopy}
                        className="text-[10px] font-semibold text-slate-500 hover:text-blue-600 flex items-center gap-1 px-1.5 py-0.5 rounded hover:bg-white transition-colors"
                        title="Copy formulation"
                      >
                        {copied ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-500" />
                            <span className="text-emerald-600">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>

                    <p className="text-xs font-medium text-slate-700 leading-relaxed font-mono bg-white/70 p-2 rounded-lg border border-slate-100">
                      {product.composition}
                    </p>

                    {/* Excipients highlight if present */}
                    {product.composition.toLowerCase().includes('excipient') ||
                    product.composition.toLowerCase().includes('colour') ? (
                      <div className="text-[11px] text-amber-700 bg-amber-50/80 px-2 py-1 rounded border border-amber-200/60 flex items-center gap-1.5">
                        <Sparkles className="w-3 h-3 shrink-0" />
                        <span>Pharmacopeial Excipients & Color Standards IP/USPNF</span>
                      </div>
                    ) : null}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="collapsed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="py-1"
                >
                  <div className="flex items-center gap-2 text-xs font-medium text-slate-400 group-hover:text-blue-500 transition-colors">
                    <span className="w-2 h-2 rounded-full bg-sky-400/40 group-hover:bg-sky-500 transition-colors" />
                    <span className="truncate">Active API: {product.composition.split(',')[0]}</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1 italic flex items-center gap-1">
                    <ChevronRight className="w-3 h-3 text-slate-400 group-hover:translate-x-1 group-hover:text-blue-500 transition-transform" />
                    <span>Hover or tap to reveal full chemical specs</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Pricing & Inspection Footer */}
          <div className="pt-4 border-t border-slate-100 mt-2 flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">
                MRP per unit
              </span>
              <span className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                {product.price.startsWith('₹') ? product.price : `₹ ${product.price}`}
              </span>
            </div>

            <motion.button
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.stopPropagation();
                onOpenModal(product);
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-sm"
            >
              <span>Specs</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </motion.button>
          </div>

        </div>
      </motion.div>
    </motion.div>
  );
};

