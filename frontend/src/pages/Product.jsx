import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import RelatedProducts from '../components/RelatedProducts'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Star, Trash2, X } from 'lucide-react'

const Product = () => {

  const { productId } = useParams();
  const { products, currency, addToCart, wishlist, toggleWishlist, getProductReviews, deleteReview, userData } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState('')
  const [size, setSize] = useState('')
  const [reviews, setReviews] = useState([])
  const [openSection, setOpenSection] = useState('description')
  const [showSizeGuide, setShowSizeGuide] = useState(false)

  const handleDeleteReview = async (reviewId) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      const { success } = await deleteReview(reviewId);
      if (success) {
        fetchProductReviews();
        // Also refresh product data to get updated average rating
        fetchProductData();
      }
    }
  }

  const AccordionItem = ({ id, title, children }) => (
    <div className='border-b border-gray-100 last:border-none'>
      <button
        onClick={() => setOpenSection(openSection === id ? null : id)}
        className='w-full py-5 flex items-center justify-between group'
      >
        <span className='text-[11px] font-bold uppercase tracking-[2px] text-gray-900 group-hover:text-black transition-colors'>
          {title}
        </span>
        <motion.div
          animate={{ rotate: openSection === id ? 180 : 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          <ChevronDown size={14} className='text-gray-400 group-hover:text-black transition-colors' />
        </motion.div>
      </button>
      <AnimatePresence>
        {openSection === id && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className='overflow-hidden'
          >
            <div className='pb-8 text-sm text-gray-500 leading-relaxed font-medium'>
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )

  const SizeModal = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => setShowSizeGuide(false)}
      className='fixed inset-0 z-[100] flex items-start justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto sm:pt-24 pt-10'
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 10 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className='bg-white w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl overflow-y-auto max-h-[90vh]'
      >
        <div className='p-6 sm:p-10'>
          <div className='flex justify-between items-center mb-8'>
            <h2 className='text-xl sm:text-2xl font-bold text-gray-900 tracking-tight'>Size Guide</h2>
            <button 
              onClick={() => setShowSizeGuide(false)}
              className='p-2 hover:bg-gray-100 rounded-full transition-colors'
            >
              <X size={20} className='text-gray-500' />
            </button>
          </div>

          <div className='overflow-x-auto'>
            <table className='w-full text-center border-collapse'>
              <thead>
                <tr className='border-b border-gray-100'>
                  <th className='py-4 px-2 text-xs sm:text-sm font-bold text-gray-900 uppercase tracking-wider'>Size</th>
                  <th className='py-4 px-2 text-xs sm:text-sm font-bold text-gray-900 uppercase tracking-wider'>{productData.category === 'bottomwear' ? 'Waist' : 'To Fit Chest'}</th>
                  <th className='py-4 px-2 text-xs sm:text-sm font-bold text-gray-900 uppercase tracking-wider'>{productData.category === 'bottomwear' ? 'Hip' : 'Garment Chest'}</th>
                  <th className='py-4 px-2 text-xs sm:text-sm font-bold text-gray-900 uppercase tracking-wider'>Length</th>
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-50'>
                {[
                  { s: 'XXS', f: '34', g: '40', l: '27' },
                  { s: 'XS', f: '36', g: '42', l: '27.5' },
                  { s: 'S', f: '38', g: '44', l: '28' },
                  { s: 'M', f: '40', g: '46', l: '28.5', bold: true },
                  { s: 'L', f: '42', g: '48', l: '29.5' },
                  { s: 'XL', f: '44', g: '50', l: '30' },
                  { s: 'XXL', f: '46', g: '52', l: '30.5' },
                  { s: 'XXXL', f: '48', g: '54', l: '31' },
                  { s: '26', f: '26', g: '34', l: '30' },
                  { s: '28', f: '28', g: '36', l: '31' },
                  { s: '30', f: '30', g: '38', l: '32', bold: true },
                  { s: '32', f: '32', g: '40', l: '33' },
                  { s: '34', f: '34', g: '42', l: '34' },
                  { s: '36', f: '36', g: '44', l: '34' },
                  { s: '38', f: '38', g: '46', l: '34' },
                  { s: '40', f: '40', g: '48', l: '34' },
                ].filter(row => productData.sizes.includes(row.s)).map((row, idx) => (
                  <tr key={idx} className={`hover:bg-gray-50 transition-colors ${row.bold ? 'bg-gray-50/50' : ''}`}>
                    <td className={`py-4 px-2 text-xs sm:text-sm text-gray-900 ${row.bold ? 'font-bold' : 'font-medium'}`}>{row.s}</td>
                    <td className={`py-4 px-2 text-xs sm:text-sm text-gray-500 ${row.bold ? 'font-bold text-gray-900' : ''}`}>{row.f}</td>
                    <td className={`py-4 px-2 text-xs sm:text-sm text-gray-500 ${row.bold ? 'font-bold text-gray-900' : ''}`}>{row.g}</td>
                    <td className={`py-4 px-2 text-xs sm:text-sm text-gray-500 ${row.bold ? 'font-bold text-gray-900' : ''}`}>{row.l}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <p className='mt-8 text-[11px] text-gray-400 text-center uppercase tracking-widest leading-relaxed'>
            All measurements are in inches. <br/> 
            Model wears size M for a relaxed fit.
          </p>
        </div>
      </motion.div>
    </motion.div>
  )
  const [activeTab, setActiveTab] = useState('description')

  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item)
        setImage(item.image[0])
        return null;
      }
    })
  }

  const fetchProductReviews = async () => {
    const data = await getProductReviews(productId);
    setReviews(data);
  }

  useEffect(() => {
    fetchProductData();
    fetchProductReviews();
  }, [productId, products])

  return productData ? (
    <div className='pt-10 pb-20 border-t border-gray-100 page-entrance'>

      {/* ── Product Layout ── */}
      <div className='flex flex-col lg:flex-row gap-16 lg:gap-10 items-start w-full'>

        {/* ── LEFT: Images ── */}
        <div className='w-full lg:flex-1 flex flex-col-reverse gap-4 sm:flex-row lg:max-w-[650px] lg:sticky lg:top-24'>

          {/* Thumbnails */}
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-auto no-scrollbar sm:w-[18%] w-full gap-3 py-4 sm:py-0'>
            {productData.image.map((item, index) => (
              <motion.img
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setImage(item)}
                src={item}
                key={index}
                className={`w-[70px] h-[70px] sm:w-full sm:h-auto rounded-xl cursor-pointer border-2 transition-all duration-200 object-cover shrink-0 ${image === item ? 'border-black' : 'border-transparent opacity-60 hover:opacity-90'}`}
                alt=""
              />
            ))}
          </div>

          {/* Main image */}
          <div className='w-full sm:w-[82%] relative overflow-hidden rounded-[2.5rem] bg-gray-50 border border-gray-100 shadow-sm'>
            <AnimatePresence mode="wait">
              <motion.img
                key={image}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.35 }}
                className='w-full h-[480px] sm:h-[680px] object-cover object-top'
                src={image}
                alt={productData.name}
              />
            </AnimatePresence>
          </div>
        </div>

        {/* ── RIGHT: Product Info ── */}
        <div className='w-full lg:flex-1'>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className='flex flex-col gap-6'
          >

            {/* Brand label */}
            <p className='text-[11px] font-semibold tracking-[0.2em] text-gray-400 uppercase'>
              Kurofit · Performance Elite
            </p>

            {/* Product name */}
            <h1 className='text-2xl sm:text-3xl font-bold text-gray-900 leading-snug'>
              {productData.name}
            </h1>

            {/* Stars */}
            <div className='flex items-center gap-2'>
              <div className='flex items-center gap-0.5'>
                {[1, 2, 3, 4, 5].map(star => (
                  <img
                    key={star}
                    src={assets.star_icon}
                    alt=""
                    className={`w-3.5 ${star <= (productData.averageRating || 0) ? 'brightness-0' : 'opacity-20'}`}
                  />
                ))}
              </div>
              <p className='text-xs text-gray-400 font-medium'>
                ({productData.totalReviews || 0} Reviews)
              </p>
            </div>

            {/* Price */}
            <div>
              <p className='text-3xl font-bold text-gray-900 tracking-tight'>
                {currency}{productData.price.toLocaleString()}
              </p>
            </div>



            {/* Size selector */}
            <div className='flex flex-col gap-3'>
              <div className='flex justify-between items-center'>
                <p className='text-xs font-semibold uppercase tracking-widest text-gray-700'>Select Size</p>
                <p 
                  onClick={() => setShowSizeGuide(true)}
                  className='text-xs font-medium text-gray-400 cursor-pointer hover:text-black transition-colors'
                >
                  Size Guide
                </p>
              </div>
              <div className='flex gap-2 flex-wrap'>
                {productData.sizes.map((item, index) => (
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => setSize(item)}
                    className={`w-14 h-12 flex items-center justify-center rounded-xl border text-xs font-semibold transition-all duration-200 ${item === size
                      ? 'bg-black text-white border-black shadow-md'
                      : 'bg-white text-gray-700 border-gray-200 hover:border-gray-400'
                    }`}
                    key={index}
                  >
                    {item}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className='flex flex-row gap-3 pt-2'>
              <motion.button
                whileHover={productData.inStock ? { scale: 1.01 } : {}}
                whileTap={productData.inStock ? { scale: 0.99 } : {}}
                onClick={() => productData.inStock && addToCart(productData._id, size)}
                disabled={!productData.inStock}
                className={`flex-1 py-4 rounded-xl text-sm font-semibold tracking-wide shadow-sm transition-all ${productData.inStock 
                  ? 'bg-black text-white hover:bg-gray-900' 
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
              >
                {productData.inStock ? 'Add to Bag' : 'Out of Stock'}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => toggleWishlist(productData._id)}
                className={`flex-1 py-4 rounded-xl text-sm font-semibold tracking-wide border transition-all flex items-center justify-center gap-2 ${wishlist.includes(productData._id)
                  ? 'bg-white border-black text-black'
                  : 'bg-white border-gray-200 text-gray-500 hover:border-gray-400'
                }`}
              >
                <svg
                  className={`w-4 h-4 ${wishlist.includes(productData._id) ? 'fill-black' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                {wishlist.includes(productData._id) ? 'Added to Wishlist' : 'Add to Wishlist'}
              </motion.button>
            </div>

            {/* Trust badges */}
            <div className='grid grid-cols-2 gap-4 pt-2'>
              <div className='flex flex-col gap-1 p-3 bg-gray-50 rounded-xl'>
                <p className='text-xs font-semibold text-gray-800'>✓ Authentic</p>
                <p className='text-[11px] text-gray-400'>100% Verified Quality</p>
              </div>
              <div className='flex flex-col gap-1 p-3 bg-gray-50 rounded-xl'>
                <p className='text-xs font-semibold text-gray-800'>↩ Easy Returns</p>
                <p className='text-[11px] text-gray-400'>7-Day Exchange</p>
              </div>
            </div>

            {/* ── Product Accordion ── */}
            <div className='mt-10 border-t border-gray-100'>
              <AccordionItem id='description' title='Product Description'>
                <div className='space-y-4'>
                  <p>{productData.description}</p>
                  <p>Engineered for the streets, designed for the culture. This premium Kurofit piece combines high-performance technical fabrics with bold, avant-garde aesthetics.</p>
                </div>
              </AccordionItem>

              <AccordionItem id='reviews' title={`Reviews (${reviews.length})`}>
                <div className='space-y-6 pt-2'>
                  {reviews.length > 0 ? (
                    reviews.map((item, index) => (
                      <div key={index} className='pb-4 border-b border-gray-50 last:border-none'>
                        <div className='flex justify-between items-center mb-1'>
                          <p className='text-[10px] font-bold text-gray-900 uppercase'>{item.name}</p>
                          <div className='flex items-center gap-3'>
                            <div className='flex gap-0.5'>
                              {[1, 2, 3, 4, 5].map(star => (
                                <Star key={star} size={10} className={`${star <= item.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'}`} />
                              ))}
                            </div>
                            {userData && userData._id === item.userId && (
                              <button
                                onClick={() => handleDeleteReview(item._id)}
                                className='text-gray-400 hover:text-red-500 transition-colors'
                                title="Delete review"
                              >
                                <Trash2 size={12} />
                              </button>
                            )}
                          </div>
                        </div>
                        <p className='text-[12px] text-gray-500 italic'>"{item.comment}"</p>
                      </div>
                    ))
                  ) : (
                    <p className='text-xs text-gray-400 py-4'>No reviews yet. Be the first to review this product.</p>
                  )}
                </div>
              </AccordionItem>

              <AccordionItem id='shipping' title='Shipping & Returns'>
                <div className='space-y-2 text-xs'>
                  <p>• Standard delivery within 3-5 business days.</p>
                  <p>• Express shipping available at checkout.</p>
                  <p>• 7-day easy exchange/return policy for all unworn items.</p>
                </div>
              </AccordionItem>
            </div>

          </motion.div>
        </div>
      </div>

      {/* Redundant bottom section removed - moved to accordion */}

      {/* ── Related Products ── */}
      <div className='mt-20'>
        <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
      </div>

      {/* ── Size Guide Modal ── */}
      <AnimatePresence>
        {showSizeGuide && <SizeModal />}
      </AnimatePresence>

    </div>
  ) : <div className='opacity-0'></div>
}

export default Product
