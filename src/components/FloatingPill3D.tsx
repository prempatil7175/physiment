import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export const FloatingPill3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Interactive mouse parallax tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 100 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const tiltX = useTransform(smoothMouseY, [-300, 300], [15, -15]);
  const tiltY = useTransform(smoothMouseX, [-300, 300], [-18, 18]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      mouseX.set(e.clientX - centerX);
      mouseY.set(e.clientY - centerY);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[380px] sm:h-[460px] md:h-[540px] flex items-center justify-center pointer-events-none perspective-1000"
    >
      {/* Background radial glow */}
      <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-gradient-to-tr from-blue-400/20 via-sky-300/25 to-teal-200/20 blur-3xl -z-10 animate-pulse-subtle" />

      {/* Outer Orbital Rings */}
      <motion.div
        animate={{ rotateZ: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        className="absolute w-[320px] h-[320px] sm:w-[420px] sm:h-[420px] rounded-full border border-dashed border-sky-400/25 pointer-events-none"
      />
      <motion.div
        animate={{ rotateZ: -360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        className="absolute w-[260px] h-[260px] sm:w-[340px] sm:h-[340px] rounded-full border border-sky-300/20 pointer-events-none"
      />

      {/* Floating Nano-Molecules */}
      <motion.div
        animate={{
          y: [-12, 12, -12],
          x: [-8, 8, -8],
          scale: [1, 1.05, 1],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-12 left-10 sm:left-16 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-lg border border-sky-100 flex items-center gap-2"
      >
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
        <span className="text-xs font-bold text-slate-700">99.8% Bio-Purity</span>
      </motion.div>

      <motion.div
        animate={{
          y: [10, -14, 10],
          x: [6, -6, 6],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute bottom-16 right-8 sm:right-14 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-lg border border-blue-100 flex items-center gap-2"
      >
        <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
        <span className="text-xs font-bold text-slate-700">Sustained Release Matrix</span>
      </motion.div>

      {/* 3D Floating Pill Graphic Container with Mouse Tilt */}
      <motion.div
        style={{
          rotateX: tiltX,
          rotateY: tiltY,
          transformStyle: 'preserve-3d',
        }}
        animate={{
          y: [-16, 16, -16],
          rotateZ: [-2, 3, -2],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="relative flex items-center justify-center"
      >
        {/* Main 3D Capsule Shell */}
        <div className="relative w-44 sm:w-56 h-80 sm:h-96 rounded-full p-2 bg-gradient-to-b from-slate-200/50 via-white/40 to-slate-200/50 backdrop-blur-xl shadow-2xl border border-white/60 preserve-3d flex flex-col overflow-hidden">
          
          {/* Top Half - Clinical Royal Blue */}
          <div className="relative w-full h-1/2 rounded-t-full bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-800 flex items-center justify-center overflow-hidden shadow-inner">
            {/* Specular curved reflection highlight */}
            <div className="absolute top-4 left-6 w-10 sm:w-14 h-28 sm:h-36 bg-gradient-to-r from-white/40 to-transparent rounded-full blur-[2px] transform -rotate-12" />
            
            {/* Medical Cross Emboss */}
            <div className="relative text-white/30 flex flex-col items-center">
              <span className="text-[11px] font-black tracking-widest uppercase opacity-75">PHYSIMENT</span>
              <span className="text-xs font-semibold text-white/80">FORMULATION</span>
            </div>
          </div>

          {/* Golden/Silver Divider Ring */}
          <div className="h-2 w-full bg-gradient-to-r from-amber-200 via-white to-amber-300 shadow-md z-10 opacity-90 my-[-1px]" />

          {/* Bottom Half - Translucent Clinical Pearl Cyan / White */}
          <div className="relative w-full h-1/2 rounded-b-full bg-gradient-to-b from-sky-50 via-white to-slate-100 flex items-center justify-center overflow-hidden shadow-inner">
            {/* Internal Bio Micro-Pellets */}
            <div className="absolute inset-0 p-4 flex flex-wrap gap-2 justify-center items-center opacity-30">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
              <span className="w-3 h-3 rounded-full bg-amber-400" />
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="w-3.5 h-3.5 rounded-full bg-indigo-500" />
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
            </div>

            {/* Specular gloss streak */}
            <div className="absolute bottom-6 left-6 w-8 sm:w-12 h-24 sm:h-32 bg-gradient-to-r from-white/70 to-transparent rounded-full blur-[1px] transform -rotate-12" />

            <div className="relative z-10 text-center">
              <span className="block text-2xl font-black tracking-wider text-slate-800/80">XR</span>
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">CERTIFIED IP</span>
            </div>
          </div>

          {/* Subtle Outer Drop Shadow on Floor */}
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-48 h-8 bg-slate-900/10 rounded-full blur-md" />
        </div>

        {/* Ambient Floating Particle Dots */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-sky-400/60 shadow-glow-sm"
            style={{
              top: `${20 + i * 15}%`,
              left: `${i % 2 === 0 ? 10 + i * 12 : 75 - i * 8}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.4,
            }}
          />
        ))}
      </motion.div>
    </div>
  );
};

