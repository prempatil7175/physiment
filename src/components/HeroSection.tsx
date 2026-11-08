import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, Sparkles, ShieldCheck, Activity, Award } from 'lucide-react';
import { FloatingPill3D } from './FloatingPill3D';

const HEADLINE = "ACCELERATING ACCESS TO QUALITY MEDICINES FOR PEOPLE EVERYWHERE";

export const HeroSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll-linked animation binding
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Fade and scale down as user scrolls down
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.8], [1, 0.92]);
  const y = useTransform(scrollYProgress, [0, 0.8], [0, 100]);

  // Split headline for word-by-word reveal
  const words = HEADLINE.split(" ");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.2,
      },
    },
  };

  const wordVariants = {
    hidden: {
      opacity: 0,
      y: 35,
      rotateX: 45,
      filter: 'blur(8px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      filter: 'blur(0px)',
      transition: {
        type: 'spring',
        damping: 18,
        stiffness: 120,
      },
    },
  };

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-slate-50 bg-grid-pattern"
    >
      {/* Dynamic Background Light Bleeds */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-gradient-to-tr from-sky-400/20 via-blue-500/15 to-emerald-300/10 rounded-full blur-[110px] pointer-events-none -z-10" />

      {/* Main Hero Content linked to scroll transformation */}
      <motion.div
        style={{ opacity, scale, y }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[calc(100vh-8rem)]">
          
          {/* Left Column: Headline and Call to Actions */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            
            {/* Super Header Tag */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 shadow-sm w-fit mb-6"
            >
              <Sparkles className="w-4 h-4 text-blue-600 animate-spin" style={{ animationDuration: '6s' }} />
              <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
                Pioneering Precision Formulations
              </span>
            </motion.div>

            {/* Word-by-word Reveal Headline */}
            <motion.h1
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.12] mb-6"
            >
              {words.map((word, idx) => {
                const isHighlight =
                  word === "QUALITY" || word === "MEDICINES" || word === "EVERYWHERE";
                return (
                  <span key={idx} className="inline-block overflow-hidden mr-[0.28em] last:mr-0">
                    <motion.span
                      variants={wordVariants}
                      className={`inline-block ${
                        isHighlight
                          ? "bg-gradient-to-r from-blue-600 via-sky-600 to-teal-500 bg-clip-text text-transparent"
                          : "text-slate-900"
                      }`}
                    >
                      {word}
                    </motion.span>
                  </span>
                );
              })}
            </motion.h1>

            {/* Body Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.8 }}
              className="text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl leading-relaxed mb-8"
            >
              Physiment Pharma combines rigorous pharmaceutical science with modern clinical efficacy.
              Explore our specialized portfolio spanning advanced cardiology, anti-diabetic therapies,
              and bio-optimized wellness essentials.
            </motion.p>

            {/* Interactive CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1 }}
              className="flex flex-wrap items-center gap-4 mb-10"
            >
              <a
                href="#products"
                className="group px-7 py-3.5 rounded-xl font-bold text-sm sm:text-base text-white bg-gradient-to-r from-blue-600 via-sky-600 to-blue-700 hover:from-blue-700 hover:to-sky-700 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2"
              >
                <span>Browse Products</span>
                <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
              </a>

              <a
                href="#cfa"
                className="px-6 py-3.5 rounded-xl font-bold text-sm sm:text-base text-slate-700 bg-white hover:bg-slate-50 border border-slate-200/90 shadow-sm hover:border-blue-300 hover:text-blue-700 hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2"
              >
                <span>CFA & Distribution</span>
              </a>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-200/70 max-w-xl"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">WHO-GMP</div>
                  <div className="text-[11px] text-slate-500">Certified Facility</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <Activity className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">99.8% Purity</div>
                  <div className="text-[11px] text-slate-500">API Assay Index</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Schedule M</div>
                  <div className="text-[11px] text-slate-500">Compliant QA</div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: 3D Floating Pill Graphic with Parallax & Motion */}
          <div className="lg:col-span-5 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="w-full"
            >
              <FloatingPill3D />
            </motion.div>
          </div>

        </div>
      </motion.div>

      {/* Bottom Scroll Prompt */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-slate-400 hover:text-blue-600 cursor-pointer pointer-events-auto"
        onClick={() => {
          document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        <span className="text-[11px] uppercase tracking-widest font-bold">Scroll To Explore</span>
        <ArrowDown className="w-4 h-4 text-blue-500" />
      </motion.div>
    </section>
  );
};

