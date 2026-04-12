import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { Link, NavLink } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [visible, setVisible] = useState(false);
    const { getCartCount, navigate, token, setToken, setCartItems, setShowSearch, setShowLogin, wishlist } = useContext(ShopContext);

    const logout = () => {
        localStorage.removeItem('token')
        setToken('')
        setCartItems({})
        navigate('/login')
    }

    return (
        <>
        <div className='flex items-center justify-between py-4 font-medium border-b border-gray-100 bg-white sticky top-0 z-40'>

            {/* Logo */}
            <Link to='/'>
                <img src={assets.logo} className='w-36 brightness-0' alt="logo" />
            </Link>

            {/* Desktop Navigation */}
            <ul className='hidden sm:flex items-center gap-10 text-[13px] font-bold uppercase tracking-widest text-gray-700'>

                {/* Home */}
                <NavLink to='/' className='flex flex-col items-center gap-1'>
                    <p>Home</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>

                {/* Topwear Dropdown */}
                <div className='group relative'>
                    <NavLink to='/collection?category=topwear' className='flex items-center gap-1 hover:text-black transition-colors'>
                        <p className='relative group-hover:scale-105 transition-transform'>Topwear</p>
                        <svg className='w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-180' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2.5' d='M19 9l-7 7-7-7' />
                        </svg>
                    </NavLink>
                    <div className='absolute top-full pt-4 z-50 hidden group-hover:block left-0 shadow-2xl rounded-2xl'>
                        <motion.div 
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            className='flex flex-col gap-2 w-48 py-4 px-6 bg-white border border-gray-100 rounded-2xl text-[11px] font-bold uppercase tracking-widest text-gray-500'>
                            <Link to='/collection?category=topwear' className='cursor-pointer hover:text-black font-medium transition-all hover:pl-1'>All Topwear</Link>
                            <hr className='border-gray-300' />
                            <Link to='/collection?category=topwear&subcategory=tshirt' className='cursor-pointer hover:text-black transition-all hover:pl-1'>T-Shirts</Link>
                            <Link to='/collection?category=topwear&subcategory=shirt' className='cursor-pointer hover:text-black transition-all hover:pl-1'>Shirts</Link>
                            <Link to='/collection?category=topwear&subcategory=hoodie' className='cursor-pointer hover:text-black transition-all hover:pl-1'>Hoodies</Link>
                            <Link to='/collection?category=topwear&subcategory=oversized' className='cursor-pointer hover:text-black transition-all hover:pl-1'>Oversized</Link>
                            <Link to='/collection?category=topwear&subcategory=vest' className='cursor-pointer hover:text-black transition-all hover:pl-1'>Vests</Link>
                        </motion.div>
                    </div>
                </div>

                {/* Bottomwear Dropdown */}
                <div className='group relative'>
                    <NavLink to='/collection?category=bottomwear' className='flex items-center gap-1 hover:text-black transition-colors'>
                        <p className='relative group-hover:scale-105 transition-transform'>Bottomwear</p>
                        <svg className='w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-180' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2.5' d='M19 9l-7 7-7-7' />
                        </svg>
                    </NavLink>
                    <div className='absolute top-full pt-4 z-50 hidden group-hover:block left-0 shadow-2xl rounded-2xl'>
                        <motion.div 
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            className='flex flex-col gap-2 w-48 py-4 px-6 bg-white border border-gray-100 rounded-2xl text-[11px] font-bold uppercase tracking-widest text-gray-500'>
                            <Link to='/collection?category=bottomwear' className='cursor-pointer hover:text-black font-medium transition-all hover:pl-1'>All Bottomwear</Link>
                            <hr className='border-gray-300' />
                            <Link to='/collection?category=bottomwear&subcategory=jeans' className='cursor-pointer hover:text-black transition-all hover:pl-1'>Jeans</Link>
                            <Link to='/collection?category=bottomwear&subcategory=jogger' className='cursor-pointer hover:text-black transition-all hover:pl-1'>Joggers</Link>
                            <Link to='/collection?category=bottomwear&subcategory=trackpant' className='cursor-pointer hover:text-black transition-all hover:pl-1'>Trackpants</Link>
                            <Link to='/collection?category=bottomwear&subcategory=shorts' className='cursor-pointer hover:text-black transition-all hover:pl-1'>Shorts</Link>
                        </motion.div>
                </div>
            </div>

            {/* Winterwear Dropdown */}
            <div className='group relative'>
                <NavLink to='/collection?category=winterwear' className='flex items-center gap-1 hover:text-black transition-colors'>
                    <p className='relative group-hover:scale-105 transition-transform'>Winterwear</p>
                    <svg className='w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-180' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2.5' d='M19 9l-7 7-7-7' />
                    </svg>
                </NavLink>
                <div className='absolute top-full pt-4 z-50 hidden group-hover:block left-0 shadow-2xl rounded-2xl'>
                    <motion.div 
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        className='flex flex-col gap-2 w-48 py-4 px-6 bg-white border border-gray-100 rounded-2xl text-[11px] font-bold uppercase tracking-widest text-gray-500'>
                        <Link to='/collection?category=winterwear' className='cursor-pointer hover:text-black font-medium transition-all hover:pl-1'>All Winterwear</Link>
                        <hr className='border-gray-300' />
                        <Link to='/collection?category=winterwear&subcategory=jacket' className='cursor-pointer hover:text-black transition-all hover:pl-1'>Jackets</Link>
                        <Link to='/collection?category=winterwear&subcategory=sweatshirt' className='cursor-pointer hover:text-black transition-all hover:pl-1'>Sweatshirts</Link>
                    </motion.div>
                </div>
            </div>

                {/* Collection */}
                <NavLink to='/collection' className='flex flex-col items-center gap-1'>
                    <p>Collection</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>

            </ul>

            {/* Right Side Icons */}
            <div className='flex items-center gap-6'>
                <motion.img
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => { setShowSearch(true); navigate('/collection') }}
                    src={assets.search_icon}
                    className='w-5 cursor-pointer hover:brightness-50 transition-all'
                    alt="search"
                />

                {/* Profile Dropdown */}
                <div className='group relative'>
                    <motion.img
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => token ? null : setShowLogin(true)}
                        className='w-5 cursor-pointer hover:brightness-50 transition-all'
                        src={assets.profile_icon}
                        alt="profile"
                    />
                    {token && (
                        <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4 z-10'>
                            <motion.div 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className='flex flex-col gap-2 w-44 py-4 px-6 bg-white border border-gray-100 shadow-xl rounded-2xl text-sm'>
                                <p onClick={() => navigate('/my-profile')} className='cursor-pointer hover:text-black hover:pl-1 transition-all'>My Profile</p>
                                <p onClick={() => navigate('/orders')} className='cursor-pointer hover:text-black hover:pl-1 transition-all'>Orders</p>

                                <p onClick={logout} className='cursor-pointer hover:text-black text-red-400 hover:pl-1 transition-all'>Logout</p>
                            </motion.div>
                        </div>
                    )}
                </div>

                {/* Wishlist */}
                <Link to='/wishlist' className='relative'>
                    <motion.div whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }}>
                        <svg className='w-5 h-5 hover:text-red-500 transition-colors' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        {wishlist.length > 0 && (
                            <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>
                                {wishlist.length}
                            </p>
                        )}
                    </motion.div>
                </Link>

                {/* Cart */}
                <Link to='/cart' className='relative'>
                    <motion.div whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }}>
                        <img src={assets.cart_icon} className='w-5 min-w-5 brightness-0' alt="cart" />
                        <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-gray-900 text-white aspect-square rounded-full text-[8px] font-bold'>
                            {getCartCount()}
                        </p>
                    </motion.div>
                </Link>

                {/* Mobile Hamburger */}
                <motion.img
                    whileTap={{ scale: 0.8 }}
                    onClick={() => setVisible(true)}
                    src={assets.menu_icon}
                    className='w-5 cursor-pointer sm:hidden'
                    alt="menu"
                />
            </div>
        </div>

        {/* ── Mobile Sidebar ── */}
        <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all z-20 ${visible ? 'w-full' : 'w-0'}`}>
            <div className='flex flex-col text-gray-600'>
                <div onClick={() => setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
                    <img className='h-4 rotate-180' src={assets.dropdown_icon} alt="back" />
                    <p>Back</p>
                </div>
                <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/'>Home</NavLink>
                <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/collection?category=topwear'>Topwear</NavLink>
                <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/collection?category=bottomwear'>Bottomwear</NavLink>
                <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/collection'>Collection</NavLink>
                <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/wishlist'>Wishlist</NavLink>
            </div>
        </div>
        </>
    )
}

export default Navbar;