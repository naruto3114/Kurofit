'use client';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

export function Spotlight({ className, size = 64, springOptions = { bounce: 0, duration: 0.1 } }) {
  const containerRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, springOptions);
  const springY = useSpring(mouseY, springOptions);

  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const parent = containerRef.current?.parentElement;
    if (!parent) return;

    // Spotlight typically needs absolute positioning relative to the wrapper element
    const style = window.getComputedStyle(parent);
    if (style.position === 'static') {
      parent.style.position = 'relative';
    }

    const handleMouseMove = (e) => {
      const rect = parent.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    };

    parent.addEventListener('mousemove', handleMouseMove);
    parent.addEventListener('mouseenter', () => setIsHovered(true));
    parent.addEventListener('mouseleave', () => setIsHovered(false));

    return () => {
      parent.removeEventListener('mousemove', handleMouseMove);
      parent.removeEventListener('mouseenter', () => setIsHovered(true));
      parent.removeEventListener('mouseleave', () => setIsHovered(false));
    };
  }, [mouseX, mouseY]);

  return (
    <div ref={containerRef} className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-[inherit]">
      <motion.div
        className={`absolute rounded-full pointer-events-none ${className}`}
        style={{
          width: size,
          height: size,
          left: springX,
          top: springY,
          x: '-50%',
          y: '-50%',
          opacity: isHovered ? 1 : 0,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      />
    </div>
  );
}
