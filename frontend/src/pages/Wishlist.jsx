import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Wishlist = () => {
    const { products, wishlist } = useContext(ShopContext);
    const [wishlistProducts, setWishlistProducts] = useState([]);

    useEffect(() => {
        if (products.length > 0) {
            const desiredProducts = products.filter(item => wishlist.includes(item._id));
            setWishlistProducts(desiredProducts);
        }
    }, [products, wishlist])

  return (
    <div className='border-t border-gray-100 pt-16 pb-32 page-entrance'>
      {/* Title Section */}
      <div className='text-left mb-16'>
        <Title text1={'Personal'} text2={'Wishlist'} />
        <p className='text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mt-4 leading-relaxed'>
          Your curated selection of kurofit elite pieces. <br /> reserved for the culture.
        </p>
      </div>

      {wishlistProducts.length > 0 ? (
        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 gap-y-12'>
          {
            wishlistProducts.map((item, index) => (
              <ProductItem key={index} name={item.name} id={item._id} price={item.price} image={item.image} isCollection={true} category={item.subCategory} limitedDrop={item.limitedDrop} inStock={item.inStock} />
            ))
          }
        </div>
      ) : (
        <div className='flex flex-col items-center justify-center py-40 bg-gray-50/50 rounded-3xl border border-dashed border-gray-200'>
          <div className='w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl mb-8'>
            <svg className="w-8 h-8 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <h3 className='text-xl font-black uppercase tracking-tighter text-black mb-2'>Your list is empty</h3>
          <p className='text-[10px] font-black uppercase tracking-widest text-gray-400 mb-8'>Save pieces you love for later.</p>
          <button 
            onClick={() => navigate('/collection')}
            className='bg-black text-white px-10 py-4 text-[10px] font-black uppercase tracking-[0.3em] rounded-xl hover:bg-gray-800 transition-all'
          >
            Explore Collection
          </button>
        </div>
      )}
    </div>
  )
}

export default Wishlist;
