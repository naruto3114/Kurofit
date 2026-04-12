import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CartSizeSelector = ({ currentSize, availableSizes, onSizeChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className='relative' ref={dropdownRef}>
      {/* Header Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-between gap-4 min-w-[100px] px-4 py-2 border rounded-xl transition-all duration-300 ${
          isOpen ? 'border-black bg-black text-white' : 'border-gray-100 bg-gray-50/50 text-gray-900 hover:border-gray-300'
        }`}
      >
        <span className='text-[10px] font-bold uppercase tracking-widest'>Size: {currentSize}</span>
        <ChevronDown size={14} className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className='absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 rounded-xl shadow-2xl overflow-hidden z-50'
          >
            <div className='flex flex-col'>
              {availableSizes.map((size) => (
                <button
                  key={size}
                  disabled={size === currentSize}
                  onClick={() => {
                    onSizeChange(size);
                    setIsOpen(false);
                  }}
                  className={`px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-left transition-colors border-b border-gray-50 last:border-none ${
                    size === currentSize
                      ? 'bg-gray-50 text-gray-300 cursor-default'
                      : 'text-gray-600 hover:bg-gray-900 hover:text-white'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CartSizeSelector;
