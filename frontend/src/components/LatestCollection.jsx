import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';
import { motion } from 'framer-motion';

const LatestCollection = () => {

    const { products } = useContext(ShopContext);
    const [latestProducts, setLatestProducts] = useState([]);

    useEffect(() => {
        const topwearItems = products.filter(item => item.category === 'topwear');
        setLatestProducts(topwearItems.slice(0, 10));
    }, [products])

    return (
        <div className='my-6'>
            <div className='text-left py-2'>
                <Title text1={'Latest'} text2={'Elite Drops'} />
                <p className='w-full lg:w-1/2 text-sm font-medium tracking-tight text-zinc-400 leading-relaxed'>
                    Engineered for performance, designed for the culture. Experience the latest high-impact drops from Kurofit Global.
                </p>
            </div>

            {/* Rendering Products */}
            <motion.div 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'
            >
                {
                    latestProducts.map((item, index) => (
                        <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} category={item.subCategory} isCollection={true} limitedDrop={item.limitedDrop} inStock={item.inStock} />
                    ))
                }
            </motion.div>
        </div>
    )
}

export default LatestCollection