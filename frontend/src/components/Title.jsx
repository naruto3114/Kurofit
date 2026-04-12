import React from 'react'
import { motion } from 'framer-motion'

const Title = ({ text1, text2 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className='inline-flex gap-3 items-center mb-4 overflow-hidden'
    >
      <h2 className='text-carbon-muted font-light text-2xl sm:text-4xl uppercase tracking-[0.15em]'>
        {text1} <span className='text-carbon font-bold'>{text2}</span>
      </h2>
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: '3rem' }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className='h-[2px] bg-accent'
      />
    </motion.div>
  )
}

export default Title;
