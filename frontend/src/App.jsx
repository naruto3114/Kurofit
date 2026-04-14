import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Collection from './pages/Collection'
import About from './pages/About'
import Contact from './pages/Contact'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Login from './pages/Login'
import PlaceOrder from './pages/PlaceOrder'
import Orders from './pages/Orders'
import Wishlist from './pages/Wishlist'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MyProfile from './pages/MyProfile';
import SearchBar from './components/SearchBar';
import LoginPopup from './components/LoginPopup';
import ResetPassword from './pages/ResetPassword';

const App = () => {
  const location = useLocation();
  const hideHeaderFooter = location.pathname === '/login' || location.pathname.startsWith('/reset-password');

  return (
    <div className='w-full'>
      <div className={hideHeaderFooter ? '' : 'px-4 sm:px-8 md:px-12 lg:px-16'}>
        <ToastContainer />
        <LoginPopup />
        {!hideHeaderFooter && <Navbar />}
        {!hideHeaderFooter && <SearchBar />}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/collection' element={<Collection />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/product/:productId' element={<Product />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/login' element={<Login />} />
          <Route path='/place-order' element={<PlaceOrder />} />
          <Route path='/orders' element={<Orders />} />
          <Route path='/wishlist' element={<Wishlist />} />
          <Route path='/my-profile' element={<MyProfile />} />
          <Route path='/reset-password/:token' element={<ResetPassword />} />
        </Routes>
      </div>
      {!hideHeaderFooter && <Footer />}
    </div>
  )
}

export default App
