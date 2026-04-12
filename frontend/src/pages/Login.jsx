import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";
import { GoogleLogin } from "@react-oauth/google";
import { motion, AnimatePresence } from "framer-motion";

const Login = () => {

  const { token, setToken, navigate, backendUrl } = useContext(ShopContext)

  const [currentState, setCurrentState] = useState("Login")

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const { data } = await axios.post(`${backendUrl}/api/user/google-login`, {
        token: credentialResponse.credential
      })

      if (data.success) {
        setToken(data.token)
        localStorage.setItem("token", data.token)
        toast.success("Logged in with Google successfully")
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Google Login failed")
    }
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault()

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

      let url =
        currentState === "Sign Up"
          ? `${backendUrl}/api/user/register`
          : `${backendUrl}/api/user/login`

      const payload =
        currentState === "Sign Up"
          ? formData
          : { email: formData.email, password: formData.password }

      const { data } = await axios.post(url, payload)

      if (data.success) {
        setToken(data.token)
        localStorage.setItem("token", data.token)
        toast.success(
          currentState === "Sign Up"
            ? "Account created successfully"
            : "Logged in successfully"
        )
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong")
    }
  }

  useEffect(() => {
    if (token) {
      navigate("/")
    }
  }, [token, navigate])

  const switchMode = () => {
    if (currentState === "Forgot") {
      setCurrentState("Login")
    } else {
      setCurrentState(prev => prev === "Login" ? "Sign Up" : "Login")
    }
    setFormData({ name: "", email: "", password: "" })
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center min-h-[80vh] w-full px-4 page-entrance py-12"
    >
      <motion.div 
        layout
        className="w-full max-w-md bg-white p-10 sm:p-14 rounded-[2.5rem] shadow-2xl border border-gray-100"
      >
        <form
          onSubmit={onSubmitHandler}
          className="w-full flex flex-col gap-6"
        >
          <div className="text-center mb-6">
            <motion.h2 
              key={currentState}
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-4xl font-bold text-carbon tracking-tight uppercase prata-font"
            >
              {currentState}
            </motion.h2>
            <p className="text-carbon-light text-xs mt-3 font-bold uppercase tracking-[0.2em]">
              {currentState === "Forgot" 
                ? "Recover your account access" 
                : currentState === "Login" 
                ? "Access your premium experience" 
                : "Join the exclusive circle"}
            </p>
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

          <div className="flex justify-between items-center text-[11px] text-zinc-400 font-bold uppercase tracking-widest px-1 mt-2">
             {currentState === "Login" && (
               <p onClick={() => setCurrentState("Forgot")} className="cursor-pointer hover:text-black transition-colors">Forgot password?</p>
             )}
             <p
              onClick={switchMode}
              className={`cursor-pointer hover:text-black transition-colors underline underline-offset-8 decoration-zinc-200 hover:decoration-black decoration-2 ${currentState === "Forgot" ? "w-full text-center" : ""}`}
            >
              {currentState === "Forgot"
                ? "Back to Login"
                : currentState === "Login" 
                ? "Create Account" 
                : "Login Here"}
            </p>
          </div>

          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-black text-white py-5 rounded-2xl shadow-xl hover:shadow-2xl transition-all font-bold text-xs uppercase tracking-[0.25em] mt-6"
          >
            {currentState === "Forgot" ? "Send Reset Link" : currentState === "Login" ? "Sign In" : "Register Now"}
          </motion.button>

          <div className="flex items-center gap-4 my-6">
            <hr className="flex-1 border-gray-100" />
            <span className="text-carbon-light text-[10px] font-bold uppercase tracking-[0.3em]">OR</span>
            <hr className="flex-1 border-gray-100" />
          </div>

          <div className="flex justify-center transition-all">
            <div className="w-full relative shadow-sm hover:shadow-md transition-shadow rounded-full overflow-hidden">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => toast.error("Google Login Failed")}
                theme="outline"
                size="large"
                text="continue_with"
                shape="pill"
              />
            </div>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
}

export default Login
