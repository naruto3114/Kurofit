import React, { useContext, useState, useEffect } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { motion } from 'framer-motion'

const PlaceOrder = () => {

    const [method, setMethod] = useState('cod');
    const { navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, getDeliveryFee, products, userAddresses } = useContext(ShopContext);
    
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        street: '',
        city: '',
        state: '',
        zipcode: '',
        country: '',
        phone: ''
    })

    const selectSavedAddress = (index) => {
        if (index === "" || !userAddresses) return;
        const selected = userAddresses[index];
        if (selected) {
            setFormData({
                firstName: selected.firstName || '',
                lastName: selected.lastName || '',
                email: selected.email || '',
                street: selected.street || '',
                city: selected.city || '',
                state: selected.state || '',
                zipcode: selected.zipcode || '',
                country: selected.country || '',
                phone: selected.phone || ''
            });
        }
    }

    const onChangeHandler = (event) => {
        const name = event.target.name
        const value = event.target.value
        setFormData(data => ({ ...data, [name]: value }))
    }

    const initPay = (order) => {
        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount: order.amount,
            currency: order.currency,
            name: 'Order Payment',
            description: 'Order Payment',
            order_id: order.id,
            receipt: order.receipt,
            handler: async (response) => {
                console.log(response)
                try {
                    const { data } = await axios.post(backendUrl + '/api/order/verifyRazorpay', response, { headers: { token } })
                    if (data.success) {
                        navigate('/orders')
                        setCartItems({})
                    }
                } catch (error) {
                    console.log(error)
                    toast.error(error)
                }
            }
        }
        const rzp = new window.Razorpay(options)
        rzp.open()
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault()
        try {

            let orderItems = []

            for (const items in cartItems) {
                for (const item in cartItems[items]) {
                    if (cartItems[items][item] > 0) {
                        const itemInfo = structuredClone(products.find(product => product._id === items))
                        if (itemInfo) {
                            itemInfo.size = item
                            itemInfo.quantity = cartItems[items][item]
                            orderItems.push(itemInfo)
                        }
                    }
                }
            }

            let orderData = {
                address: formData,
                items: orderItems,
                amount: getCartAmount() + getDeliveryFee()
            }

            switch (method) {

                // API Calls for COD
                case 'cod':
                    const response = await axios.post(backendUrl + '/api/order/place', orderData, { headers: { token } })
                    if (response.data.success) {
                        setCartItems({})
                        navigate('/orders')
                    } else {
                        toast.error(response.data.message)
                    }
                    break;

                    break;

                case 'razorpay':
                    const responseRazorpay = await axios.post(backendUrl + '/api/order/razorpay', orderData, { headers: { token } })
                    if (responseRazorpay.data.success) {
                        initPay(responseRazorpay.data.order)
                    }
                    break;

                default:
                    break;
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    return (
        <form onSubmit={onSubmitHandler} className='flex flex-col lg:flex-row gap-16 pt-10 pb-20 items-start border-t border-gray-100 page-entrance'>
            {/* ------------- Left Side: Delivery Information ---------------- */}
            <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className='flex flex-col gap-8 w-full lg:max-w-[600px]'
            >
                <div className='mb-4'>
                    <Title text1={'Delivery'} text2={'Information'} />
                </div>



                <div className='grid grid-cols-2 gap-4'>
                    <input required onChange={onChangeHandler} name='firstName' value={formData.firstName} className='border border-gray-200 rounded-xl py-4 px-6 w-full text-sm font-black focus:border-black transition-all outline-none' type="text" placeholder='First name' />
                    <input required onChange={onChangeHandler} name='lastName' value={formData.lastName} className='border border-gray-200 rounded-xl py-4 px-6 w-full text-sm font-black focus:border-black transition-all outline-none' type="text" placeholder='Last name' />
                </div>
                <input required onChange={onChangeHandler} name='email' value={formData.email} className='border border-gray-200 rounded-xl py-4 px-6 w-full text-sm font-black focus:border-black transition-all outline-none' type="email" placeholder='Email address' />
                <input required onChange={onChangeHandler} name='street' value={formData.street} className='border border-gray-200 rounded-xl py-4 px-6 w-full text-sm font-black focus:border-black transition-all outline-none' type="text" placeholder='Street' />
                <div className='grid grid-cols-2 gap-4'>
                    <input required onChange={onChangeHandler} name='city' value={formData.city} className='border border-gray-200 rounded-xl py-4 px-6 w-full text-sm font-black focus:border-black transition-all outline-none' type="text" placeholder='City' />
                    <input required onChange={onChangeHandler} name='state' value={formData.state} className='border border-gray-200 rounded-xl py-4 px-6 w-full text-sm font-black focus:border-black transition-all outline-none' type="text" placeholder='State' />
                </div>
                <div className='grid grid-cols-2 gap-4'>
                    <input required onChange={onChangeHandler} name='zipcode' value={formData.zipcode} className='border border-gray-200 rounded-xl py-4 px-6 w-full text-sm font-black focus:border-black transition-all outline-none' type="number" placeholder='Zipcode' />
                    <input required onChange={onChangeHandler} name='country' value={formData.country} className='border border-gray-200 rounded-xl py-4 px-6 w-full text-sm font-black focus:border-black transition-all outline-none' type="text" placeholder='Country' />
                </div>
                <input required onChange={onChangeHandler} name='phone' value={formData.phone} className='border border-gray-200 rounded-xl py-4 px-6 w-full text-sm font-black focus:border-black transition-all outline-none' type="number" placeholder='Phone' />

                {/* Saved Address Selection */}
                {userAddresses && userAddresses.length > 0 && (
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className='mt-4 p-6 bg-zinc-900 rounded-3xl border border-zinc-800 shadow-xl'
                    >
                        <div className='flex items-center gap-3 mb-4'>
                            <div className='w-2 h-2 bg-blue-500 rounded-full animate-pulse'></div>
                            <p className='text-[10px] font-black uppercase tracking-[3px] text-zinc-400'>Express Checkout</p>
                        </div>
                        <p className='text-white text-sm font-bold mb-4'>Use a saved address for faster checkout</p>
                        <select
                            onChange={(e) => selectSavedAddress(e.target.value)}
                            className='w-full bg-zinc-800 border border-zinc-700 text-white rounded-2xl py-4 px-6 text-xs font-bold outline-none focus:border-blue-500 transition-all appearance-none cursor-pointer'
                        >
                            <option value="">-- Select from your saved addresses --</option>
                            {userAddresses.map((addr, index) => (
                                <option key={index} value={index}>
                                    {addr.firstName} {addr.lastName} - {addr.street}, {addr.city}
                                </option>
                            ))}
                        </select>
                    </motion.div>
                )}
            </motion.div>

            {/* ------------- Right Side: Order Summary & Payment ---------------- */}
            <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className='w-full lg:flex-1 flex flex-col gap-12'
            >
                {/* Order Summary Card */}
                <div className='bg-white p-8 rounded-3xl border border-gray-100 shadow-2xl'>
                    <div className='mb-8'>
                        <h3 className='text-xl font-black uppercase tracking-tighter mb-4'>Order Summary</h3>
                        <div className='w-12 h-[3px] bg-black'></div>
                    </div>
                    <CartTotal />
                </div>

                {/* Payment Selection */}
                <div className='flex flex-col gap-6'>
                    <Title text1={'Payment'} text2={'Method'} />
                    <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
                        <div onClick={() => setMethod('razorpay')} className={`flex items-center gap-4 border-2 p-5 cursor-pointer rounded-xl transition-all ${method === 'razorpay' ? 'border-black bg-white shadow-lg' : 'border-gray-50 bg-gray-50 opacity-60'}`}>
                            <div className={`w-4 h-4 border-2 rounded-full flex items-center justify-center ${method === 'razorpay' ? 'border-black' : 'border-gray-300'}`}>
                                {method === 'razorpay' && <div className='w-2 h-2 bg-black rounded-full' />}
                            </div>
                            <img className='h-4' src={assets.razorpay_logo} alt="Razorpay" />
                        </div>
                        <div onClick={() => setMethod('cod')} className={`flex items-center gap-4 border-2 p-5 cursor-pointer rounded-xl transition-all ${method === 'cod' ? 'border-black bg-white shadow-lg' : 'border-gray-50 bg-gray-50 opacity-60'}`}>
                            <div className={`w-4 h-4 border-2 rounded-full flex items-center justify-center ${method === 'cod' ? 'border-black' : 'border-gray-300'}`}>
                                {method === 'cod' && <div className='w-2 h-2 bg-black rounded-full' />}
                            </div>
                            <p className='text-black text-[10px] font-black uppercase tracking-widest'>Cash on Delivery</p>
                        </div>
                    </div>

                    <div className='mt-8'>
                        <motion.button 
                            whileHover={{ scale: 1.02, backgroundColor: '#333' }}
                            whileTap={{ scale: 0.98 }}
                            type='submit' 
                            className='w-full bg-black text-white py-6 rounded-2xl text-[10px] font-black tracking-[0.4em] shadow-2xl transition-all uppercase'
                        >
                            Place Order
                        </motion.button>
                        <p className='text-[10px] text-gray-400 mt-6 text-center font-black uppercase tracking-widest'>Secure Checkout &middot; Instant Confirmation</p>
                    </div>
                </div>
            </motion.div>
        </form>
    )
}

export default PlaceOrder
