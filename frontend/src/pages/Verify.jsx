import React, { useContext, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { motion } from 'framer-motion'

const Verify = () => {

    const { navigate, token, setCartItems, backendUrl } = useContext(ShopContext)
    const [searchParams, setSearchParams] = useSearchParams()

    const success = searchParams.get('success')
    const orderId = searchParams.get('orderId')

    const verifyPayment = async () => {
        try {
            if (!token) {
                return null
            }

            const response = await axios.post(backendUrl + '/api/order/verifyStripe', { success, orderId }, { headers: { token } })

            if (response.data.success) {
                setCartItems({})
                navigate('/orders')
            } else {
                navigate('/cart')
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    useEffect(() => {
        verifyPayment()
    }, [token])

    return (
        <div className='min-h-[60vh] flex items-center justify-center bg-canvas'>
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className='flex flex-col items-center gap-6 p-12 bg-white/50 backdrop-blur-md rounded-2xl shadow-2xl border border-white'
            >
                <div className='w-16 h-16 border-4 border-gray-100 border-t-carbon rounded-full animate-spin'></div>
                <div className='text-center space-y-2'>
                    <h2 className='font-outfit font-black text-2xl text-carbon uppercase tracking-tighter'>Verifying Transaction</h2>
                    <p className='text-gray-400 text-sm font-light'>Please do not refresh or close this window.</p>
                </div>
            </motion.div>
        </div>
    )
}

export default Verify
