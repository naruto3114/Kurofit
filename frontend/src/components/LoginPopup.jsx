import React, { useContext, useState, useEffect } from "react"
import { ShopContext } from "../context/ShopContext"
import axios from "axios"
import { toast } from "react-toastify"
import { GoogleLogin } from "@react-oauth/google"

const LoginPopup = () => {

  const { showLogin, setShowLogin, token, setToken, backendUrl } = useContext(ShopContext)

  const [currentState, setCurrentState] = useState("Login")

  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  })

  // Close popup if user logged in
  useEffect(() => {
    if (token) {
      setShowLogin(false)
    }
  }, [token, setShowLogin])

  // Prevent background scroll
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

  if (!showLogin) return null

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })

  }

  const switchMode = () => {

    setCurrentState((prev) => prev === "Login" ? "Sign Up" : "Login")

    setFormData({
      name: "",
      email: "",
      password: ""
    })

  }

  // Google Login
  const handleGoogleSuccess = async (credentialResponse) => {

    try {

      const { data } = await axios.post(
        `${backendUrl}/api/user/google-login`,
        {
          token: credentialResponse.credential
        }
      )

      if (data.success) {

        setToken(data.token)
        localStorage.setItem("token", data.token)

        toast.success("Logged in with Google successfully")

      } else {

        toast.error(data.message)

      }

    } catch (error) {

      toast.error(
        error.response?.data?.message || "Google Login failed"
      )

    }

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

      const url =
        currentState === "Sign Up"
          ? `${backendUrl}/api/user/register`
          : `${backendUrl}/api/user/login`

      const payload =
        currentState === "Sign Up"
          ? formData
          : {
              email: formData.email,
              password: formData.password
            }

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

      toast.error(
        error.response?.data?.message || "Something went wrong"
      )

    } finally {

      setLoading(false)

    }

  }

  return (

    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">

      {/* Overlay */}
      <div
        className="absolute inset-0"
        onClick={() => setShowLogin(false)}
      ></div>

      {/* Card */}
      <div className="relative bg-white w-full max-w-md  shadow-2xl overflow-hidden">

        {/* Close button */}
        <button
          onClick={() => setShowLogin(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-black"
        >
          ✕
        </button>

        <form
          onSubmit={onSubmitHandler}
          className="p-8 sm:p-10 flex flex-col gap-4"
        >

          <div className="text-center mb-6">

            <h2 className="text-3xl font-semibold text-gray-800">
              {currentState}
            </h2>

            <p className="text-gray-500 text-sm mt-1">

              {currentState === "Login"
                ? "Welcome back to Kurofit"
                : "Join the culture today"}

            </p>

          </div>

          {currentState === "Sign Up" && (
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              type="text"
              placeholder="Name"
              className="border border-zinc-100 bg-zinc-50 px-6 py-4 rounded-2xl focus:border-black outline-none transition-all font-medium text-sm text-zinc-900 placeholder:text-zinc-400"
              required
            />
          )}

          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            type="email"
            placeholder="Email"
            className="border border-zinc-100 bg-zinc-50 px-6 py-4 rounded-2xl focus:border-black outline-none transition-all font-medium text-sm text-zinc-900 placeholder:text-zinc-400"
            required
          />

          {currentState !== "Forgot" && (
            <input
              name="password"
              value={formData.password}
              onChange={handleChange}
              type="password"
              placeholder="Password"
              minLength={6}
              className="border border-zinc-100 bg-zinc-50 px-6 py-4 rounded-2xl focus:border-black outline-none transition-all font-medium text-sm text-zinc-900 placeholder:text-zinc-400"
              required
            />
          )}

          {currentState === "Login" && (
            <p onClick={() => setCurrentState("Forgot")} className="text-[10px] text-right text-gray-400 cursor-pointer -mt-2 hover:text-black uppercase tracking-widest font-bold">
              Forgot Password?
            </p>
          )}

          <button
            disabled={loading}
            className="bg-black text-white py-4 rounded-2xl hover:bg-gray-800 transition-all font-bold text-xs uppercase tracking-[0.2em] shadow-xl hover:shadow-2xl disabled:opacity-60 mt-2"
          >

            {loading
              ? "Please wait..."
              : currentState === "Forgot"
              ? "Send Reset Link"
              : currentState === "Login"
              ? "Sign In"
              : "Sign Up"}

          </button>

          {/* Divider */}
          <div className="flex items-center gap-2 my-2">

            <hr className="flex-1 border-gray-200" />

            <span className="text-gray-400 text-[10px] uppercase tracking-wider">
              Or continue with
            </span>

            <hr className="flex-1 border-gray-200" />

          </div>

          {/* Google Login */}
          <div className="flex justify-center">

            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => toast.error("Google Login Failed")}
              theme="outline"
              size="large"
              text="continue_with"
              shape="rectangular"
            />

          </div>

          <div className="flex flex-col gap-2 mt-4">
            <p
              onClick={() => {
                if (currentState === "Forgot") {
                  setCurrentState("Login")
                } else {
                  setCurrentState(currentState === "Login" ? "Sign Up" : "Login")
                }
                setFormData({ name: "", email: "", password: "" })
              }}
              className="text-sm text-center text-gray-500 cursor-pointer hover:text-black"
            >
              {currentState === "Forgot"
                ? "Back to Login"
                : currentState === "Login"
                ? "Don't have an account? Create an account"
                : "Already have an account? Login Here"}
            </p>
          </div>

        </form>

      </div>

    </div>

  )

}

export default LoginPopup
