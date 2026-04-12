import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { Link, NavLink } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

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
                        <div className='absolute top-full right-0 pt-4 z-50 hidden group-hover:block'>
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

        {/* ── Mobile Sidebar Overlay ── */}
        <AnimatePresence>
            {visible && (
                <div className="fixed inset-0 z-[1000] lg:hidden">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setVisible(false)}
                        className="absolute inset-0 bg-black/60 backdrop-blur-md"
                    />

                    {/* Sidebar Content */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 28, stiffness: 220 }}
                        className="absolute top-0 right-0 bottom-0 w-[85%] max-w-[380px] bg-white shadow-[0_0_50px_rgba(0,0,0,0.2)] flex flex-col h-full"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-7 border-b border-gray-100 bg-white">
                            <img src={assets.logo} className="w-32 brightness-0" alt="logo" />
                            <button
                                onClick={() => setVisible(false)}
                                className="p-3 bg-gray-50 hover:bg-gray-100 rounded-full transition-all"
                            >
                                <X size={20} className="text-gray-900" />
                            </button>
                        </div>

                        {/* Navigation Links */}
                        <div className="flex-1 overflow-y-auto py-4 px-6 no-scrollbar">
                            <div className="flex flex-col gap-1">
                                <NavLink onClick={() => setVisible(false)} to="/" className="py-4 text-xs font-black uppercase tracking-[0.2em] border-b border-gray-50 flex items-center justify-between group">
                                    Home
                                    <svg className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
                                </NavLink>

                                {/* Categories with Submenus */}
                                <MobileAccordion title="Topwear" link="/collection?category=topwear" setVisible={setVisible}>
                                    <Link to="/collection?category=topwear&subcategory=tshirt">T-Shirts</Link>
                                    <Link to="/collection?category=topwear&subcategory=shirt">Shirts</Link>
                                    <Link to="/collection?category=topwear&subcategory=hoodie">Hoodies</Link>
                                    <Link to="/collection?category=topwear&subcategory=oversized">Oversized</Link>
                                    <Link to="/collection?category=topwear&subcategory=vest">Vests</Link>
                                </MobileAccordion>

                                <MobileAccordion title="Bottomwear" link="/collection?category=bottomwear" setVisible={setVisible}>
                                    <Link to="/collection?category=bottomwear&subcategory=jeans">Jeans</Link>
                                    <Link to="/collection?category=bottomwear&subcategory=jogger">Joggers</Link>
                                    <Link to="/collection?category=bottomwear&subcategory=trackpant">Trackpants</Link>
                                    <Link to="/collection?category=bottomwear&subcategory=shorts">Shorts</Link>
                                </MobileAccordion>

                                <MobileAccordion title="Winterwear" link="/collection?category=winterwear" setVisible={setVisible}>
                                    <Link to="/collection?category=winterwear&subcategory=jacket">Jackets</Link>
                                    <Link to="/collection?category=winterwear&subcategory=sweatshirt">Sweatshirts</Link>
                                </MobileAccordion>

                                <NavLink onClick={() => setVisible(false)} to="/collection" className="py-4 text-xs font-black uppercase tracking-[0.2em] border-b border-gray-50 flex items-center justify-between group">
                                    Collection
                                    <svg className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
                                </NavLink>

                                <NavLink onClick={() => setVisible(false)} to="/wishlist" className="py-4 text-xs font-black uppercase tracking-[0.2em] border-b border-gray-50 flex items-center justify-between group">
                                    Wishlist
                                    {wishlist.length > 0 && <span className="ml-2 bg-black text-white px-2 py-0.5 rounded-full text-[8px]">{wishlist.length}</span>}
                                </NavLink>
                            </div>
                        </div>

                        {/* Footer / Profile Section */}
                        <div className="p-8 bg-gray-50 border-t border-gray-100">
                            {token ? (
                                <div className="flex flex-col gap-4">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-white font-bold text-xs">
                                            {assets.profile_icon ? <img src={assets.profile_icon} className="w-4 invert" alt="" /> : "U"}
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black uppercase tracking-widest text-black">Member</p>
                                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Premium Account</p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2">
                                        <button onClick={() => { navigate('/my-profile'); setVisible(false); }} className="py-3 px-4 bg-white border border-gray-200 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-100 transition-colors">Profile</button>
                                        <button onClick={() => { navigate('/orders'); setVisible(false); }} className="py-3 px-4 bg-white border border-gray-200 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-100 transition-colors">Orders</button>
                                    </div>
                                    <button onClick={() => { logout(); setVisible(false); }} className="w-full py-4 text-[10px] font-black uppercase tracking-widest text-red-500 border border-red-50 border-dashed rounded-xl mt-2">Log Out</button>
                                </div>
                            ) : (
                                <button 
                                    onClick={() => { setShowLogin(true); setVisible(false); }}
                                    className="w-full py-5 bg-black text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-xl"
                                >
                                    Login / Sign Up
                                </button>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
        </>
    )
}

const MobileAccordion = ({ title, children, link, setVisible }) => {
    const [isOpen, setIsOpen] = useState(false);
    const { navigate } = useContext(ShopContext);

    return (
        <div className="border-b border-gray-50">
            <div className="flex items-center justify-between py-4">
                <p 
                    onClick={() => { navigate(link); setVisible(false); }}
                    className="text-xs font-black uppercase tracking-[0.2em] text-black cursor-pointer"
                >
                    {title}
                </p>
                <button 
                    onClick={() => setIsOpen(!isOpen)}
                    className="p-2 -mr-2 text-gray-400"
                >
                    <motion.svg 
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        className="w-4 h-4" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                    </motion.svg>
                </button>
            </div>
            
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden bg-gray-50/50 rounded-xl mb-4"
                    >
                        <div className="flex flex-col gap-4 py-4 px-6 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">
                            {React.Children.map(children, child => (
                                <div onClick={() => setVisible(false)}>
                                    {child}
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Navbar;