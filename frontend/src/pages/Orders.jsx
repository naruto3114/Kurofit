import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import axios from 'axios'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'

const Orders = () => {

  const { backendUrl, token, currency, addReview, navigate, requestReturn } = useContext(ShopContext);
  const [orderData, setorderData] = useState([])
  const [showReviewModal, setShowReviewModal] = useState(false)
  const [showTrackModal, setShowTrackModal] = useState(false)
  const [showReturnModal, setShowReturnModal] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')
  const [returnReason, setReturnReason] = useState('Size issue')
  const [submitting, setSubmitting] = useState(false)

  const loadOrderData = async () => {
    try {
      if (!token) {
        return null
      }

      const response = await axios.post(backendUrl + '/api/order/userorders', {}, { headers: { token } })
      if (response.data.success) {
        let allOrdersItem = []
        response.data.orders.map((order) => {
          order.items.map((item) => {
            item['status'] = order.status
            item['payment'] = order.payment
            item['paymentMethod'] = order.paymentMethod
            item['date'] = order.date
            item['address'] = order.address
            item['orderId'] = order._id
            item['deliveredDate'] = order.deliveredDate
            allOrdersItem.push(item)
          })
        })
        setorderData(allOrdersItem.reverse())
      }

    } catch (error) {
      console.log(error)
    }
  }

  const handleReviewSubmit = async () => {
    if (!comment.trim()) return;
    setSubmitting(true);
    const result = await addReview(selectedProduct._id, rating, comment);
    if (result.success) {
      setShowReviewModal(false);
      setComment('');
      setRating(5);
    }
    setSubmitting(false);
  }

  const handleReturnSubmit = async () => {
    if (!selectedProduct) return;
    setSubmitting(true);
    const result = await requestReturn(selectedProduct.orderId, returnReason);
    if (result.success) {
      setShowReturnModal(false);
      loadOrderData();
    }
    setSubmitting(false);
  }

  const handleCancelOrder = async (orderId) => {
    try {
      const response = await axios.post(backendUrl + '/api/order/cancel', { orderId }, { headers: { token } })
      if (response.data.success) {
        toast.success(response.data.message)
        loadOrderData()
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    loadOrderData()
  }, [token])

  /* Track Order Modal Component */
  const TrackOrderModal = ({ item, onClose }) => {
    const statuses = ['Pending', 'Confirmed', 'Shipped', 'Delivered', 'Returned'];
    const currentStatusIndex = statuses.indexOf(
      item.status === 'Order Placed' ? 'Pending' :
        item.status === 'Packing' ? 'Confirmed' :
          item.status
    );

    return (
      <div className='fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm' onClick={onClose}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className='bg-[#0B1221] w-full max-w-md rounded-3xl p-10 shadow-2xl relative text-white border border-gray-800'
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className='text-xl font-bold mb-6'>Track Order</h2>
          <div className='mb-8 space-y-1 text-sm text-gray-400'>
            <p className='text-white font-medium'>{item.address.firstName} {item.address.lastName}</p>
            <p>{item.address.street},</p>
            <p>{item.address.city}, - {item.address.zipcode}</p>
            <p>Phone: {item.address.phone}</p>
          </div>

          <div className='flex flex-col gap-8 relative py-4'>
            {/* Vertical Line */}
            <div className='absolute left-[7px] top-6 bottom-6 w-[2px] bg-gray-800'></div>

            {statuses.map((status, index) => (
              <div key={status} className='flex items-center gap-6 relative z-10'>
                <div className={`w-4 h-4 rounded-full border-2 transition-all duration-500 ${index <= currentStatusIndex ? 'bg-blue-500 border-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.6)]' : 'bg-[#0B1221] border-gray-700'}`}></div>
                <p className={`text-sm font-medium tracking-wide ${index <= currentStatusIndex ? 'text-white' : 'text-gray-500'}`}>{status}</p>
              </div>
            ))}
          </div>

          <div className='mt-10 flex justify-end'>
            <button
              onClick={onClose}
              className='bg-[#1F2937] hover:bg-[#374151] text-white px-10 py-3 rounded-xl text-sm font-bold transition-all active:scale-95'
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className='border-t pt-16 bg-canvas px-4 sm:px-[5vw]'
    >
      <div className='text-3xl mb-10'>
        <Title text1={'ORDER'} text2={'HISTORY'} />
      </div>

      <div className='space-y-6 mb-24'>
        <AnimatePresence mode='popLayout'>
          {
            orderData.map((item, index) => (
              <motion.div
                key={index}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className='py-8 border border-gray-100 text-gray-700 flex flex-col lg:flex-row lg:items-center gap-8 bg-white rounded-3xl px-6 sm:px-8 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-500'
              >
                <div className='flex items-center gap-6 sm:gap-8 text-sm flex-1'>
                  <div className='relative shrink-0'>
                    <img className='w-20 sm:w-32 rounded-2xl shadow-sm cursor-pointer object-cover hover:scale-105 transition-transform duration-500' onClick={() => navigate(`/product/${item._id}`)} src={item.image[0]} alt="" />
                    <div className='absolute -bottom-2 -right-2 bg-white w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shadow-sm border border-gray-50 text-[10px] font-bold'>
                      x{item.quantity}
                    </div>
                  </div>
                  <div className='flex-1 overflow-hidden'>
                    <p className='text-base sm:text-xl font-black text-black tracking-tighter leading-tight mb-2 hover:text-gray-600 transition-colors cursor-pointer truncate' onClick={() => navigate(`/product/${item._id}`)}>{item.name}</p>
                    <div className='flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-gray-400 font-medium'>
                      <p className='text-black font-bold text-sm sm:text-base'>{currency}{item.price}</p>
                      <span className='w-1 h-1 rounded-full bg-gray-200'></span>
                      <p className='uppercase tracking-widest text-[8px] sm:text-[9px] font-black py-1 px-2 bg-gray-50 rounded'>Size: {item.size}</p>
                      <span className='w-1 h-1 rounded-full bg-gray-200 hidden sm:block'></span>
                      <p className='hidden sm:block uppercase tracking-wider text-[9px]'>{new Date(item.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</p>
                    </div>
                  </div>
                </div>

                <div className='flex flex-col sm:flex-row items-center justify-between sm:justify-end gap-6 lg:w-auto mt-4 sm:mt-0'>
                  <div className='flex items-center gap-3 bg-gray-50/80 px-4 py-2 rounded-full border border-gray-100 w-fit'>
                    <p className={`w-1.5 h-1.5 rounded-full ${item.status === 'Delivered' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]' :
                      item.status === 'Shipped' ? 'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.4)]' :
                        item.status === 'Processing' || item.status === 'Packing' ? 'bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.4)]' :
                          item.status === 'Cancelled' ? 'bg-red-500' : 
                            item.status === 'Return Requested' ? 'bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.4)]' : 'bg-gray-400'
                      }`}></p>
                    <p className='text-[8px] sm:text-[9px] font-black uppercase tracking-[2px] text-gray-800'>{item.status}</p>
                  </div>
                  
                  <div className='flex items-center gap-2 w-full sm:w-auto'>
                    {
                      item.status === 'Delivered' ? (
                        <>
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => { setSelectedProduct(item); setShowReviewModal(true); }}
                            className='flex-1 sm:flex-none bg-black text-white px-6 py-3.5 text-[8px] sm:text-[9px] font-black uppercase tracking-[2px] rounded-xl transition-all shadow-lg'
                          >
                            Review
                          </motion.button>
                          {(Date.now() - (item.deliveredDate || item.date) < 7 * 24 * 60 * 60 * 1000) && (
                            <motion.button
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => { setSelectedProduct(item); setShowReturnModal(true); }}
                              className='flex-1 sm:flex-none border border-gray-200 bg-white px-6 py-3.5 text-[8px] sm:text-[9px] font-black uppercase tracking-[2px] rounded-xl transition-all'
                            >
                              Return
                            </motion.button>
                          )}
                        </>
                      ) : (
                        <div className='flex gap-2 w-full sm:w-auto'>
                          {(item.status === 'Order Placed' || item.status === 'Packing') && (
                            <motion.button
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => { if (window.confirm("Cancel this order?")) handleCancelOrder(item.orderId) } }
                              className='flex-1 sm:flex-none bg-red-50 text-red-600 border border-red-100 px-6 py-3.5 text-[8px] sm:text-[9px] font-black uppercase tracking-[2px] rounded-xl transition-all'
                            >
                              Cancel
                            </motion.button>
                          )}
                          {item.status !== 'Cancelled' && (
                            <motion.button
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => { setSelectedProduct(item); setShowTrackModal(true); }}
                              className='flex-1 sm:flex-none border border-gray-200 bg-white px-6 py-3.5 text-[8px] sm:text-[9px] font-black uppercase tracking-[2px] rounded-xl transition-all'
                            >
                              Track
                            </motion.button>
                          )}
                        </div>
                      )
                    }
                  </div>
                </div>
              </motion.div>
            ))
          }
        </AnimatePresence>
      </div>

      {/* Review Modal */}
      <AnimatePresence>
        {showReviewModal && (
          <div className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm'>
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className='bg-white w-full max-w-md rounded-3xl p-8 shadow-2xl relative'
            >
              <button onClick={() => setShowReviewModal(false)} className='absolute top-6 right-6 text-gray-400 hover:text-black transition-colors'>
                <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M6 18L18 6M6 6l12 12' /></svg>
              </button>

              <h2 className='text-2xl font-black text-black uppercase tracking-tighter mb-2'>Submit Review</h2>
              <p className='text-gray-400 text-xs font-bold uppercase tracking-widest mb-8'>{selectedProduct?.name}</p>

              <div className='space-y-8'>
                <div className='flex flex-col gap-4'>
                  <label className='text-[10px] font-black uppercase tracking-[3px] text-gray-400'>Select Rating</label>
                  <div className='flex gap-3'>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setRating(star)}
                        className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${star <= rating ? 'bg-black text-white shadow-xl' : 'bg-gray-50 text-gray-300'}`}
                      >
                        <svg className={`w-5 h-5 ${star <= rating ? 'fill-white' : ''}`} fill='none' stroke='currentColor' viewBox='0 0 24 24'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.175 0l-3.976 2.888c-.783.57-1.838-.197-1.539-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.382-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z' /></svg>
                      </button>
                    ))}
                  </div>
                </div>

                <div className='flex flex-col gap-4'>
                  <label className='text-[10px] font-black uppercase tracking-[3px] text-gray-400'>Your Experience</label>
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder='Tell us about the quality and fit...'
                    className='w-full bg-gray-50 border-none rounded-2xl p-4 text-sm focus:ring-2 focus:ring-black min-h-[120px] transition-all'
                  ></textarea>
                </div>

                <button
                  disabled={submitting}
                  onClick={handleReviewSubmit}
                  className='w-full bg-black text-white py-5 rounded-2xl text-[10px] font-black uppercase tracking-[4px] shadow-2xl hover:bg-zinc-800 transition-all disabled:bg-gray-400'
                >
                  {submitting ? 'Submitting...' : 'Post Review'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Track Order Modal */}
      <AnimatePresence>
        {showTrackModal && selectedProduct && (
          <TrackOrderModal item={selectedProduct} onClose={() => setShowTrackModal(false)} />
        )}
      </AnimatePresence>

      {/* Return Modal */}
      <AnimatePresence>
        {showReturnModal && (
          <div className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm shadow-2xl'>
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className='bg-white w-full max-w-md rounded-3xl p-8 shadow-2xl relative'
            >
              <button onClick={() => setShowReturnModal(false)} className='absolute top-6 right-6 text-gray-400 hover:text-black transition-colors'>
                <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M6 18L18 6M6 6l12 12' /></svg>
              </button>

              <h2 className='text-2xl font-black text-black uppercase tracking-tighter mb-2'>Return Request</h2>
              <p className='text-gray-400 text-xs font-bold uppercase tracking-widest mb-2'>{selectedProduct?.name}</p>
              
              <div className='bg-orange-50/50 p-4 rounded-2xl border border-orange-100/50 mb-8'>
                <p className='text-[10px] text-orange-600 font-black uppercase tracking-[2px] mb-1'>Return Window Valid Until</p>
                <p className='text-xs text-orange-800 font-bold'>
                  {new Date((selectedProduct?.deliveredDate || selectedProduct?.date) + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                </p>
              </div>

              <div className='space-y-8'>
                <div className='flex flex-col gap-4'>
                  <label className='text-[10px] font-black uppercase tracking-[3px] text-gray-400'>Reason for Return</label>
                  <select 
                    value={returnReason}
                    onChange={(e) => setReturnReason(e.target.value)}
                    className='w-full bg-gray-50 border-none rounded-2xl p-4 text-sm focus:ring-2 focus:ring-black transition-all appearance-none cursor-pointer'
                  >
                    <option value="Size issue">Size issue</option>
                    <option value="Defective product">Defective product</option>
                    <option value="Wrong item received">Wrong item received</option>
                    <option value="Did not like the quality">Did not like the quality</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className='bg-blue-50/50 p-4 rounded-2xl border border-blue-100/50'>
                  <p className='text-[10px] text-blue-600 font-medium leading-relaxed uppercase tracking-wider'>
                    Note: Our team will review your request and get back to you within 24-48 hours.
                  </p>
                </div>

                <button
                  disabled={submitting}
                  onClick={handleReturnSubmit}
                  className='w-full bg-black text-white py-5 rounded-2xl text-[10px] font-black uppercase tracking-[4px] shadow-2xl hover:bg-zinc-800 transition-all disabled:bg-gray-400'
                >
                  {submitting ? 'Submitting...' : 'Confirm Return'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default Orders

