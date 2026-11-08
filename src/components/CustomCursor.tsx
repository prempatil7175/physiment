import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [hoverText, setHoverText] = useState<string | null>(null);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth spring physics for fluid trailing feel
  const springConfig = { damping: 28, stiffness: 350, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Only activate custom cursor on devices that support fine hover
    if (typeof window === 'undefined' || window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    document.body.classList.add('custom-cursor-active');

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    // Dynamic hover detection for interactive elements
    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest('button, a, input, [role="button"], .interactive-hover');
      const card = target.closest('[data-card-hover]');

      if (card) {
        setIsHovered(true);
        setHoverText('INSPECT');
      } else if (interactive) {
        setIsHovered(true);
        setHoverText(null);
      } else {
        setIsHovered(false);
        setHoverText(null);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleElementHover, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleElementHover);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible, mouseX, mouseY]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Outer Spring Glow Ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-sky-400/80 bg-sky-400/10 backdrop-blur-[1px] flex items-center justify-center pointer-events-none"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isHovered ? (hoverText ? 72 : 56) : 34,
          height: isHovered ? (hoverText ? 72 : 56) : 34,
          scale: isClicking ? 0.8 : 1,
          borderColor: isHovered ? 'rgba(14, 165, 233, 0.95)' : 'rgba(14, 165, 233, 0.45)',
          backgroundColor: isHovered ? 'rgba(14, 165, 233, 0.12)' : 'rgba(14, 165, 233, 0.05)',
          boxShadow: isHovered 
            ? '0 0 25px 2px rgba(14, 165, 233, 0.4)' 
            : '0 0 10px 0px rgba(14, 165, 233, 0.15)',
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 400 }}
      >
        {hoverText && (
          <span className="text-[10px] font-bold tracking-widest text-sky-600 dark:text-sky-300 uppercase">
            {hoverText}
          </span>
        )}
      </motion.div>

      {/* Center High-precision Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-sky-500 shadow-glow-sm pointer-events-none"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isClicking ? 1.8 : isHovered ? 0.4 : 1,
          backgroundColor: isHovered ? '#0284C7' : '#0EA5E9',
        }}
        transition={{ duration: 0.15 }}
      />
    </div>
  );
};

