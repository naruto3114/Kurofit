import React, { useContext, useState, useEffect } from "react"
import { ShopContext } from "../context/ShopContext"
import axios from "axios"
import { toast } from "react-toastify"
import { useGoogleLogin } from "@react-oauth/google"
import { motion, AnimatePresence } from "framer-motion"

const LoginPopup = () => {
    const { showLogin, setShowLogin, token, setToken, backendUrl } = useContext(ShopContext)
    const [currentState, setCurrentState] = useState("Login")
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    })

    useEffect(() => {
        if (token) {
            setShowLogin(false)
        }
    }, [token, setShowLogin])

    useEffect(() => {
        if (showLogin) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "auto"
        }
        return () => {
            document.body.style.overflow = "auto"
        }
    }, [showLogin])

    const handleGoogleSuccess = async (tokenResponse) => {
        try {
            setLoading(true)
            const { data } = await axios.post(
                `${backendUrl}/api/user/google-login`,
                { token: tokenResponse.access_token, is_access_token: true }
            )
            if (data.success) {
                setToken(data.token)
                localStorage.setItem("token", data.token)
                toast.success("Logged in with Google successfully")
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Google Login failed")
        } finally {
            setLoading(false)
        }
    }

    const loginWithGoogle = useGoogleLogin({
        onSuccess: handleGoogleSuccess,
        onError: () => toast.error("Google Login Failed")
    })

    if (!showLogin) return null

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }



    const onSubmitHandler = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            if (currentState === "Forgot") {
                const { data } = await axios.post(`${backendUrl}/api/user/forgot-password`, { email: formData.email })
                if (data.success) {
                    toast.success("Reset link sent to your email")
                    setCurrentState("Login")
                } else {
                    toast.error(data.message)
                }
                return
            }

            const url = currentState === "Sign Up" ? `${backendUrl}/api/user/register` : `${backendUrl}/api/user/login`
            const payload = currentState === "Sign Up" ? formData : { email: formData.email, password: formData.password }

            const { data } = await axios.post(url, payload)
            if (data.success) {
                setToken(data.token)
                localStorage.setItem("token", data.token)
                toast.success(currentState === "Sign Up" ? "Account created successfully" : "Logged in successfully")
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
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md px-4">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0"
                onClick={() => setShowLogin(false)}
            />

            <motion.div 
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                className="relative bg-white w-full max-w-md rounded-[2.5rem] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] overflow-hidden"
            >
                <button
                    onClick={() => setShowLogin(false)}
                    className="absolute top-8 right-8 text-zinc-400 hover:text-black transition-colors z-20"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <form onSubmit={onSubmitHandler} className="p-10 sm:p-14 flex flex-col gap-6">
                    <div className="text-center mb-4">
                        <h2 className="text-3xl font-bold text-zinc-900 tracking-tight uppercase prata-font">
                            {currentState}
                        </h2>
                        <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.2em] mt-3">
                            {currentState === "Login" ? "Access your premium experience" : "Join the exclusive circle"}
                        </p>
                    </div>

                    {/* Auth Toggle */}
                    <div className="flex bg-zinc-100 p-1 rounded-2xl mb-2 relative">
                        <motion.div
                            animate={{ x: (currentState === "Login" || currentState === "Forgot") ? 0 : "100%" }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="absolute top-1 left-1 bottom-1 w-[calc(50%-4px)] bg-white shadow-sm rounded-xl"
                        />
                        <button
                            type="button"
                            onClick={() => { setCurrentState("Login"); setFormData({ name: "", email: "", password: "" }) }}
                            className={`relative z-10 flex-1 py-3 text-[10px] font-black uppercase tracking-[0.2em] transition-colors ${(currentState === "Login" || currentState === "Forgot") ? "text-black" : "text-zinc-400 hover:text-zinc-600"}`}
                        >
                            Sign In
                        </button>
                        <button
                            type="button"
                            onClick={() => { setCurrentState("Sign Up"); setFormData({ name: "", email: "", password: "" }) }}
                            className={`relative z-10 flex-1 py-3 text-[10px] font-black uppercase tracking-[0.2em] transition-colors ${currentState === "Sign Up" ? "text-black" : "text-zinc-400 hover:text-zinc-600"}`}
                        >
                            Sign Up
                        </button>
                    </div>

                    <div className="space-y-4">
                        <AnimatePresence mode='wait'>
                            {currentState === "Sign Up" && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                >
                                    <input
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        type="text"
                                        placeholder="Full Name"
                                        className="w-full border border-zinc-100 bg-zinc-50 px-6 py-4 rounded-2xl focus:border-black focus:bg-white outline-none transition-all font-medium text-sm text-zinc-900 placeholder:text-zinc-400 shadow-sm"
                                        required
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <input
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            type="email"
                            placeholder="Email Address"
                            className="w-full border border-zinc-100 bg-zinc-50 px-6 py-4 rounded-2xl focus:border-black focus:bg-white outline-none transition-all font-medium text-sm text-zinc-900 placeholder:text-zinc-400 shadow-sm"
                            required
                        />

                        {currentState !== "Forgot" && (
                            <input
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                type="password"
                                placeholder="Password"
                                className="w-full border border-zinc-100 bg-zinc-50 px-6 py-4 rounded-2xl focus:border-black focus:bg-white outline-none transition-all font-medium text-sm text-zinc-900 placeholder:text-zinc-400 shadow-sm"
                                required
                            />
                        )}
                    </div>

                    {currentState === "Login" && (
                        <div className="flex justify-end px-1 -mt-2">
                            <p onClick={() => setCurrentState("Forgot")} className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest cursor-pointer hover:text-black transition-colors">
                                Forgot password?
                            </p>
                        </div>
                    )}

                    <motion.button 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={loading}
                        className="w-full bg-black text-white py-5 rounded-2xl shadow-xl hover:shadow-2xl transition-all font-bold text-xs uppercase tracking-[0.25em] disabled:opacity-60 mt-2"
                    >
                        {loading ? "Processing..." : currentState === "Forgot" ? "Send Reset Link" : currentState === "Login" ? "Sign In" : "Register Now"}
                    </motion.button>

                    <div className="flex items-center gap-4 my-2">
                        <hr className="flex-1 border-zinc-100" />
                        <span className="text-zinc-400 text-[10px] font-bold uppercase tracking-[0.3em]">OR</span>
                        <hr className="flex-1 border-zinc-100" />
                    </div>

                    {/* Custom Google Button */}
                    <motion.button
                        type="button"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={loading}
                        onClick={() => loginWithGoogle()}
                        className="w-full bg-white border border-zinc-100 px-6 py-4 rounded-2xl shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-4 group"
                    >
                        <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-900 group-hover:text-black">
                            Continue with Google
                        </span>
                    </motion.button>
                </form>
            </motion.div>
        </div>
    )
}

export default LoginPopup
