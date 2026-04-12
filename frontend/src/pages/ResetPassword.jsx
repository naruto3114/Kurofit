import React, { useContext, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { motion } from 'framer-motion'

const ResetPassword = () => {
    const { token } = useParams()
    const { backendUrl, setShowLogin } = useContext(ShopContext)
    const navigate = useNavigate()

    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const onSubmitHandler = async (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            return toast.error("Passwords do not match")
        }

        setLoading(true)
        try {
            const { data } = await axios.post(`${backendUrl}/api/user/reset-password/${token}`, { password })
            if (data.success) {
                toast.success(data.message)
                setShowLogin(true)
                navigate('/')
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='min-h-[80vh] flex items-center justify-center px-4 py-20'>
            <motion.form 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                onSubmit={onSubmitHandler} 
                className='flex flex-col gap-6 w-full max-w-md bg-white p-10 border border-gray-100 shadow-2xl rounded-3xl'
            >
                <div className='text-center mb-4'>
                    <h2 className='text-3xl font-black uppercase tracking-tighter'>Reset Password</h2>
                    <p className='text-gray-400 text-[10px] font-bold uppercase tracking-widest mt-2'>Set your new secure password</p>
                </div>

                <div className='flex flex-col gap-4'>
                    <input 
                        required 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        className='w-full px-6 py-4 border border-gray-200 rounded-2xl outline-none focus:border-black transition-all font-bold text-sm' 
                        type="password" 
                        placeholder='New Password' 
                        minLength={8}
                    />
                    <input 
                        required 
                        value={confirmPassword} 
                        onChange={(e) => setConfirmPassword(e.target.value)} 
                        className='w-full px-6 py-4 border border-gray-200 rounded-2xl outline-none focus:border-black transition-all font-bold text-sm' 
                        type="password" 
                        placeholder='Confirm New Password' 
                        minLength={8}
                    />
                </div>

                <button 
                    disabled={loading} 
                    className='w-full bg-black text-white py-5 rounded-2xl text-[10px] font-black tracking-[0.3em] shadow-xl hover:bg-zinc-800 transition-all uppercase'
                >
                    {loading ? "Updating..." : "Reset Password"}
                </button>
            </motion.form>
        </div>
    )
}

export default ResetPassword
