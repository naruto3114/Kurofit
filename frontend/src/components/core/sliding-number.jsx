'use client';

import { motion, useSpring, useTransform } from 'framer-motion';
import { useEffect } from 'react';

// Renders a single rolling digit
function Digit({ value, place }) {
  // We use spring animation for the rolling effect
  let animatedValue = useSpring(value, {
    stiffness: 280,
    damping: 120,
    mass: 1,
  });

  useEffect(() => {
    animatedValue.set(value);
  }, [animatedValue, value]);

  // A column of digits 0-9
  return (
    <div className="relative inline-block w-[1ch] overflow-hidden leading-none tabular-nums" style={{ height: "1em" }}>
      <motion.div
        className="absolute inset-0 flex flex-col pointer-events-none"
        style={{
          y: useTransform(animatedValue, (v) => `${-(v % 10) * 100}%`),
        }}
      >
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <span key={num} className="flex h-[1em] items-center justify-center">
            {num}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

// Converts value to an array of rolling digits
export function SlidingNumber({ value }) {
  // Format the number or just use primitive string conversion
  const strValue = value.toString();
  const digits = strValue.split('');

  return (
    <span className="inline-flex">
      {digits.map((char, index) => {
        if (!(/[0-9]/.test(char))) {
          return <span key={`char-${index}`} className="tabular-nums opacity-80">{char}</span>;
        }
        return <Digit key={`digit-${digits.length - index}`} value={parseInt(char, 10)} place={digits.length - index} />;
      })}
    </span>
  );
}
