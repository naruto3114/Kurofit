import React, { useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../constants'
import { toast } from 'react-toastify'
import { Loader2 } from 'lucide-react'

const Login = ({ setToken }) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const onSubmitHandler = async (e) => {
        try {
            e.preventDefault();
            setLoading(true);
            const response = await axios.post(backendUrl + '/api/admin/login', { email, password })
            if (response.data.success) {
                setToken(response.data.token)
                toast.success('Welcome back, Admin!')
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='min-h-screen flex items-center justify-center w-full bg-white font-sans'>
            
            <div className='w-full max-w-md px-8 py-12 rounded-[3.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] bg-white border border-gray-100'>
                
                {/* Header */}
                <div className='text-center mb-12'>
                    <h1 className='text-4xl font-black text-[#0f172a] tracking-tight mb-2'>LOGIN</h1>
                    <p className='text-[10px] font-bold text-gray-400 tracking-[0.2em] uppercase'>
                        Admin Login
                    </p>
                </div>

                <form onSubmit={onSubmitHandler} className='space-y-4'>
                    
                    {/* Email Field */}
                    <div>
                        <input 
                            onChange={(e) => setEmail(e.target.value)} 
                            value={email} 
                            className='w-full bg-[#f0f4ff] border-none text-gray-800 px-6 py-5 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-100 transition-all placeholder:text-gray-400 font-medium' 
                            type="email" 
                            placeholder='admin@forever.com' 
                            required 
                        />
                    </div>

                    {/* Password Field */}
                    <div>
                        <input 
                            onChange={(e) => setPassword(e.target.value)} 
                            value={password} 
                            className='w-full bg-[#f0f4ff] border-none text-gray-800 px-6 py-5 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-100 transition-all placeholder:text-gray-400 font-medium' 
                            type="password" 
                            placeholder='••••••••' 
                            required 
                        />
                    </div>

                    {/* Action Button */}
                    <div className='pt-6'>
                        <button 
                            disabled={loading}
                            className='w-full py-5 px-6 text-white bg-black hover:opacity-90 active:scale-[0.98] disabled:opacity-70 rounded-[1.5rem] font-black text-sm tracking-[0.15em] uppercase shadow-xl transition-all flex items-center justify-center gap-3'
                            type="submit"
                        >
                            {loading ? (
                                <Loader2 className='animate-spin' size={20} />
                            ) : (
                                'Sign In'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
