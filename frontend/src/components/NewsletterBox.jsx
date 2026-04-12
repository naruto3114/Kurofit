import React from 'react'
import { motion } from 'framer-motion'

const NewsletterBox = () => {

    const onSubmitHandler = (event) => {
        event.preventDefault();
    }

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className='text-center py-16 px-6 bg-white border border-gray-100 my-10 overflow-hidden relative group'
    >
      <div className='absolute inset-0 bg-gray-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-1000' />
      
      <div className='relative z-10'>
        <h2 className='text-4xl md:text-7xl font-black text-black uppercase leading-[0.9] tracking-tighter mb-8'>
          Join the <br /> <span className='text-gray-200 outline-text'>Elite</span>
        </h2>
        <p className='text-gray-500 mt-6 font-black uppercase tracking-[0.2em] text-[10px] max-w-lg mx-auto leading-loose'>
          get early access to drops & limited editions. <br /> 
          <span className='text-black underline decoration-2 underline-offset-4 cursor-pointer'>Sign up for 20% off your first order.</span>
        </p>
        
        <form onSubmit={onSubmitHandler} className='w-full max-w-xl flex flex-col sm:flex-row items-center mx-auto my-14 gap-0 border-2 border-black rounded-2xl overflow-hidden shadow-2xl'>
          <input 
            className='w-full h-20 bg-white px-10 focus:outline-none font-black text-black text-xs uppercase tracking-widest' 
            type="email" 
            placeholder='ENTER EMAIL ADDRESS' 
            required
          />
          <motion.button 
            whileHover={{ backgroundColor: '#222' }}
            whileTap={{ scale: 0.98 }}
            type='submit' 
            className='w-full sm:w-60 h-20 bg-black text-white px-12 text-[10px] font-black tracking-[0.4em] transition-all uppercase'
          >
            SUBSCRIBE
          </motion.button>
        </form>
        
        <p className='text-[10px] text-gray-400 font-black uppercase tracking-[0.3em]'>Member access &middot; Secure Checkout &middot; Instant Confirmation</p>
      </div>
    </motion.div>
  )
}

export default NewsletterBox;
