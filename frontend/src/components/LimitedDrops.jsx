import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { motion } from 'framer-motion'
import ProductItem from './ProductItem';
import Title from './Title';

const LimitedDrops = () => {
    const { products } = useContext(ShopContext);
    const [latestProducts, setLatestProducts] = useState([]);

    useEffect(() => {
        // Robust filter for limited drops (handles boolean and string types)
        const limitedProduct = products.filter((item) => item.limitedDrop === true || item.limitedDrop === "true");
        setLatestProducts(limitedProduct.reverse().slice(0, 5));
        
        if (products.length > 0 && limitedProduct.length === 0) {
            console.warn("LimitedDrops: No products with 'limitedDrop: true' found in the products list.");
        }
    }, [products])

    if (latestProducts.length === 0) return null;

    return (
        <div className='my-6'>
            <div className='text-left py-2'>
                <Title text1={'Limited'} text2={'Drops'} />
                <p className='w-full lg:w-1/2 text-sm font-medium tracking-tight text-zinc-400 leading-relaxed'>
                    Elite performance gear. Exclusive seasonal releases designed for the culture.
                </p>
            </div>

            {/* Products Grid */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 gap-y-12'
            >
                {
                    latestProducts.map((item, index) => (
                        <ProductItem
                            key={index}
                            id={item._id}
                            image={item.image}
                            name={item.name}
                            price={item.price}
                            category={item.subCategory}
                            isCollection={true}
                            limitedDrop={item.limitedDrop}
                            inStock={item.inStock}
                        />
                    ))
                }
            </motion.div>
        </div>
    )
}

export default LimitedDrops;
