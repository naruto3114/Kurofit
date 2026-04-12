import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Title from './Title'

const ShopByCategory = () => {
  const categories = [
    { title: 'T-Shirts', image: assets.topwear, link: '/collection?subcategory=tshirt' },
    { title: 'Joggers', image: assets.bottemwear, link: '/collection?subcategory=jogger' },
    { title: 'Hoodies', image: assets.hoodie, link: '/collection?subcategory=hoodie' },
    { title: 'Oversized', image: assets.oversize, link: '/collection?subcategory=oversized' },
  ];

  return (
    <div className='my-6'>
      <div className='text-left py-2'>
        <Title text1={'Shop By'} text2={'Category'} />
        <p className='w-full lg:w-1/2 text-sm font-medium tracking-tight text-zinc-400 leading-relaxed'>
          Explore our curated selections. Crafted for performance, styled for your unique identity.
        </p>
      </div>

      <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
        {categories.map((cat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className='relative group overflow-hidden rounded-2xl aspect-[4/5] bg-gray-100'
          >
            <Link to={cat.link}>
              <img 
                src={cat.image} 
                className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-700' 
                alt={cat.title} 
              />
              <div className='absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500' />
              <div className='absolute inset-0 flex items-center justify-center'>
                <h3 className='prata-regular text-white text-2xl md:text-3xl font-medium uppercase tracking-widest group-hover:scale-110 transition-transform duration-500'>
                  {cat.title}
                </h3>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default ShopByCategory
