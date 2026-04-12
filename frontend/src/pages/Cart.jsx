import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';
import { motion, AnimatePresence } from 'framer-motion';
import CartSizeSelector from '../components/CartSizeSelector';

const Cart = () => {

  const { products, currency, cartItems, updateQuantity, updateSize, navigate } = useContext(ShopContext);

  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            tempData.push({
              _id: items,
              size: item,
              quantity: cartItems[items][item]
            })
          }
        }
      }
      setCartData(tempData);
    }
  }, [cartItems, products])

  return (
    <div className='pt-14 pb-20 border-t border-gray-100 page-entrance'>

      <div className='mb-10'>
        <Title text1={'Your'} text2={'Cart'} />
      </div>

      <div className='flex flex-col lg:grid lg:grid-cols-3 gap-12 items-start'>
        {/* Cart Items List */}
        <div className='lg:col-span-2 w-full flex flex-col gap-6'>
          {cartData.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className='flex flex-col items-center justify-center py-32 bg-gray-50 rounded-2xl border border-dashed border-gray-200'
            >
              <p className='text-gray-400 mb-8 font-bold tracking-widest text-[10px] uppercase'>Your bag is empty</p>
              <button 
                onClick={() => navigate('/collection')}
                className='bg-gray-900 text-white px-10 py-4 rounded-xl text-[10px] font-bold tracking-widest hover:bg-gray-800 transition-all shadow-xl'
              >
                EXPLORE COLLECTION
              </button>
            </motion.div>
          ) : (
            <AnimatePresence>
              {cartData.map((item, index) => {
                const productData = products.find((product) => product._id === item._id);
                if (!productData) return null;

                return (
                  <motion.div 
                    key={`${item._id}-${item.size}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className='py-6 px-6 border border-gray-100 bg-white rounded-2xl grid grid-cols-[auto_1fr_auto] items-center gap-6 group'
                  >
                    <div className='w-20 sm:w-28 aspect-[3/4] rounded-xl overflow-hidden bg-gray-50'>
                      <img className='w-full h-full object-cover group-hover:scale-110 transition-all duration-1000' src={productData.image[0]} alt={productData.name} />
                    </div>
                    
                    <div className='flex flex-col gap-1'>
                      <p className='text-sm sm:text-lg font-bold text-gray-900 uppercase tracking-tight'>{productData.name}</p>
                      <div className='flex flex-wrap items-center gap-2 mt-2'>
                        <p className='text-sm font-bold text-gray-900'>{currency}{productData.price.toLocaleString()}</p>
                        <div className='hidden sm:block h-4 w-[1px] bg-gray-200 mx-2'></div>
                        
                        {/* Size Selector */}
                        <CartSizeSelector
                          currentSize={item.size}
                          availableSizes={productData.sizes}
                          onSizeChange={(newSize) => updateSize(item._id, item.size, newSize)}
                        />
                      </div>
                    </div>

                    <div className='flex flex-col sm:flex-row items-center gap-6 sm:gap-10'>
                      <div className='flex items-center border border-gray-100 rounded-full bg-white px-2 overflow-hidden shadow-sm'>
                        <button 
                          onClick={() => updateQuantity(item._id, item.size, Math.max(0, item.quantity - 1))}
                          className='w-10 h-10 flex items-center justify-center text-black hover:bg-gray-50 font-black'
                        >
                          -
                        </button>
                        <input 
                          onChange={(e) => {
                            const val = e.target.value;
                            if (val === '' || val === '0') return;
                            updateQuantity(item._id, item.size, Number(val));
                          }} 
                          className='w-10 text-center bg-transparent text-xs font-black text-black' 
                          type="number" 
                          min={1} 
                          value={item.quantity} 
                        />
                        <button 
                          onClick={() => updateQuantity(item._id, item.size, item.quantity + 1)}
                          className='w-10 h-10 flex items-center justify-center text-black hover:bg-gray-50 font-black'
                        >
                          +
                        </button>
                      </div>
                      <motion.div 
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        onClick={() => updateQuantity(item._id, item.size, 0)}
                        className='cursor-pointer p-3 rounded-full hover:bg-red-50 text-gray-300 hover:text-red-500 transition-all'
                      >
                        <img className='w-4 sm:w-5 brightness-0 opacity-40 group-hover:opacity-100' src={assets.bin_icon} alt="remove" />
                      </motion.div>
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          )}
        </div>

        {/* Order Summary on the Right */}
        {cartData.length > 0 && (
          <div className='w-full lg:sticky lg:top-32 bg-white border border-gray-100 p-8 rounded-3xl shadow-xl'>
            <div className='mb-8'>
               <h3 className='text-xl font-bold uppercase tracking-widest text-gray-900'>Order Summary</h3>
               <div className='w-12 h-[3px] bg-gray-900 mt-2'></div>
            </div>
            <CartTotal />
            <div className='mt-10'>
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate('/place-order')} 
                  className='w-full bg-gray-900 text-white py-5 rounded-2xl text-[10px] font-bold tracking-[0.3em] shadow-2xl hover:bg-gray-800 transition-all uppercase'
                >
                  Proceed to Checkout
                </motion.button>
            </div>
          </div>
        )}
      </div>

    </div>
  )
}

export default Cart
