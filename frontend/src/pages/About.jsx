import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const About = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className='page-entrance'
    >
      <div className='text-center pt-10 border-t border-gray-100'>
        <Title text1={'ABOUT'} text2={'KUROFIT'} />
      </div>

      <div className='my-16 flex flex-col md:flex-row gap-16 items-center'>
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className='w-full md:w-1/2 relative group'
        >
          <img className='w-full rounded-[2.5rem] shadow-2xl' src={assets.about_img} alt="About Kurofit" />
          <div className='absolute inset-0 bg-black/5 rounded-[2.5rem] group-hover:bg-transparent transition-colors duration-500'></div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className='flex flex-col justify-center gap-8 md:w-1/2 text-gray-500'
        >
          <p className='text-sm leading-relaxed'>
            <span className='text-black font-black uppercase tracking-widest block mb-2 text-xs'>Our Genesis</span>
            Kurofit was born out of a passion for innovation and a desire to revolutionize the way people shop online. Our journey began with a simple idea: to provide a platform where customers can easily discover, explore, and purchase elite performance wear from the comfort of their homes.
          </p>
          <p className='text-sm leading-relaxed'>
            <span className='text-black font-black uppercase tracking-widest block mb-2 text-xs'>The Curation</span>
            Since our inception, we've worked tirelessly to curate a diverse selection of high-quality products that cater to every taste and preference. From technical outerwear to high-performance essentials, we offer an extensive collection sourced from trusted manufacturers.
          </p>
          <div className='bg-gray-50 p-8 rounded-3xl border border-gray-100 mt-2'>
            <b className='text-black uppercase tracking-[0.2em] text-[10px] block mb-4'>Our Mission</b>
            <p className='text-sm leading-relaxed italic'>"Our mission at Kurofit is to empower customers with choice, convenience, and absolute confidence. We're dedicated to providing a seamless shopping experience that exceeds expectations."</p>
          </div>
        </motion.div>
      </div>

      <div className='pt-16 pb-8'>
        <Title text1={'WHY'} text2={'THE ELITE CHOOSE US'} />
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 mb-24 border border-gray-100 rounded-[2.5rem] overflow-hidden bg-white shadow-sm'>
        <div className='p-12 md:p-16 flex flex-col gap-6 hover:bg-gray-50 transition-colors border-b md:border-b-0 md:border-r border-gray-100'>
          <b className='text-black uppercase tracking-widest text-xs'>Quality Assurance</b>
          <p className='text-sm text-gray-500 leading-relaxed font-medium'>We meticulously select and vet each product to ensure it meets our stringent quality standards for performance and longevity.</p>
        </div>
        <div className='p-12 md:p-16 flex flex-col gap-6 hover:bg-gray-50 transition-colors border-b md:border-b-0 md:border-r border-gray-100'>
          <b className='text-black uppercase tracking-widest text-xs'>Convenience</b>
          <p className='text-sm text-gray-500 leading-relaxed font-medium'>With our user-friendly interface and hassle-free ordering process, shopping for gear has never been more seamless.</p>
        </div>
        <div className='p-12 md:p-16 flex flex-col gap-6 hover:bg-gray-50 transition-colors'>
          <b className='text-black uppercase tracking-widest text-xs'>Exceptional Service</b>
          <p className='text-sm text-gray-500 leading-relaxed font-medium'>Our team of dedicated professionals is here to assist you at every step, ensuring your peak satisfaction.</p>
        </div>
      </div>

      <NewsletterBox />
    </motion.div>
  )
}

export default About
