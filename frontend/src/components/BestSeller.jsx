import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';
import { motion } from 'framer-motion';

const BestSeller = () => {

    const { products } = useContext(ShopContext);
    const [bestSeller, setBestSeller] = useState([]);

    useEffect(() => {
        // Sort products by totalReviews descending to show most reviewed products as best sellers
        const mostReviewed = [...products].sort((a, b) => (b.totalReviews || 0) - (a.totalReviews || 0));
        setBestSeller(mostReviewed.slice(0, 5));
    }, [products])

    if (products.length > 0 && bestSeller.length === 0) {
        // Fallback: if no bestsellers are marked, show latest 5 as a courtesy 
        // to avoid a blank section, although usually we want explicit bestsellers.
        // For now, let's just log and see.
    }

    return (
        <div className='my-6'>
            <div className='text-left py-2'>
                <Title text1={'Best'} text2={'Sellers'} />
                <p className='w-full lg:w-1/2 text-sm font-medium tracking-tight text-zinc-400 leading-relaxed'>
                    Our community's most wanted pieces. Engineered for performance, trusted by elite athletes.
                </p>
            </div>

            <motion.div 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 gap-y-10'
            >
                {
                    bestSeller.map((item, index) => (
                        <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} category={item.subCategory} isCollection={true} limitedDrop={item.limitedDrop} inStock={item.inStock} />
                    ))
                }
            </motion.div>
        </div>
    )
}

export default BestSeller;
