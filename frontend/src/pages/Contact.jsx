import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const Contact = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className='page-entrance'
    >
      <div className='text-center pt-10 border-t border-gray-100'>
        <Title text1={'CONTACT'} text2={'THE TEAM'} />
      </div>

      <div className='my-16 flex flex-col justify-center items-center md:flex-row gap-20 mb-32'>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className='w-full md:w-1/2'
        >
          <img className='w-full rounded-[2.5rem] shadow-2xl overflow-hidden' src={assets.contact_img} alt="Contact Kurofit" />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className='flex flex-col justify-center items-start gap-10 md:w-1/2'
        >
          <div>
            <p className='text-black font-black uppercase tracking-[0.2em] text-xs mb-4'>Flagship Store</p>
            <p className='text-gray-500 text-sm leading-relaxed'>54709 Williams Station <br /> Suite 350, Washington, USA</p>
          </div>

          <div>
            <p className='text-black font-black uppercase tracking-[0.2em] text-xs mb-4'>Direct Lines</p>
            <p className='text-gray-500 text-sm leading-relaxed'>Tel: (415) 555-0132 <br /> Email: performance@kurofit.com</p>
          </div>

          <div>
            <p className='text-black font-black uppercase tracking-[0.2em] text-xs mb-4'>Join the Culture</p>
            <p className='text-gray-500 text-sm leading-relaxed mb-6'>Learn more about our teams and elite job openings.</p>
            <button className='bg-black text-white px-10 py-5 text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-zinc-800 transition-all shadow-xl'>Explore Careers</button>
          </div>
        </motion.div>
      </div>

      <NewsletterBox />
    </motion.div>
  )
}

export default Contact
