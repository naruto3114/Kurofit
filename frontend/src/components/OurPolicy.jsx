import React from 'react'
import { assets } from '../assets/assets'
import { motion } from 'framer-motion'

const OurPolicy = () => {
  const policyItems = [
    {
      icon: assets.exchange_icon,
      title: 'Easy Exchange Policy',
      desc: 'Hassle-free exchange for your perfect fit'
    },
    {
      icon: assets.quality_icon,
      title: '7 Days Return Policy',
      desc: 'Shop with confidence, 7-day free returns'
    },
    {
      icon: assets.support_img,
      title: 'Best Customer Support',
      desc: 'Professional 24/7 support for all your needs'
    }
  ];

  return (
    <div className='flex flex-col sm:flex-row justify-between gap-12 text-center py-10 px-4 border border-gray-100 mt-8 bg-gray-50/20 rounded-3xl'>
      {policyItems.map((item, index) => (
        <motion.div 
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1, duration: 0.6 }}
          className='flex-1 flex flex-col items-center group cursor-default'
        >
          <div className='w-16 h-16 mb-8 bg-zinc-900 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-500 shadow-xl shadow-zinc-900/10'>
            <img src={item.icon} className='w-6 brightness-0 invert' alt={item.title} />
          </div>
          <h3 className='text-xs font-bold text-zinc-900 uppercase tracking-widest mb-3'>{item.title}</h3>
          <p className='text-sm text-zinc-500 leading-relaxed font-normal max-w-[200px]'>{item.desc}</p>
        </motion.div>
      ))}
    </div>
  )
}

export default OurPolicy;
