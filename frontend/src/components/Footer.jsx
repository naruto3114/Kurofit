import React from 'react';
import { Link } from 'react-router-dom';
import { assets } from '../assets/assets';

const Footer = () => {
    
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="bg-black text-[#c9d4d3] relative overflow-hidden font-sans border-t border-zinc-900">
            <div className="px-6 md:px-[7vw] lg:px-[9vw] pt-16 pb-12 md:pt-20 md:pb-16 lg:pt-24 lg:pb-16 relative z-10 w-full">
                <div className="flex flex-col md:flex-row justify-between gap-16 md:gap-8">
                    
                    {/* Left Section: Brand & Info */}
                    <div className="flex-1 space-y-8 max-w-sm">
                        {/* Logo */}
                        <div className="flex items-center mb-6">
                            <img 
                                src={assets.logo} 
                                className="w-36 brightness-0 invert" 
                                alt="Site logo" 
                            />
                        </div>
                        
                        <p className="text-[14px] leading-relaxed text-zinc-400">
                            Premium anime outerwear engineered for those who live the culture. 
                            Designed for performance, identity, and everyday dominance.
                        </p>

                        {/* Social Links */}
                        <div className="flex gap-6 items-center pt-2 text-white">
                            {/* Instagram */}
                            <a href="#" className="hover:text-zinc-400 transition-colors">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" >
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                                </svg>
                            </a>
                            {/* Twitter / X */}
                            <a href="#" className="hover:text-zinc-400 transition-colors">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                                </svg>
                            </a>
                            {/* Discord */}
                            <a href="#" className="hover:text-zinc-400 transition-colors">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"/>
                                </svg>
                            </a>
                        </div>

                        {/* Back to Top */}
                        <div className="pt-8">
                            <button 
                                onClick={scrollToTop}
                                className="border border-zinc-700 hover:bg-white hover:text-black hover:border-white transition-colors py-2 px-5 text-[11px] font-bold tracking-widest flex items-center gap-2 uppercase text-zinc-300 rounded-sm"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7"/>
                                </svg>
                                Back To Top
                            </button>
                        </div>
                    </div>

                    {/* Right Section: Links */}
                    <div className="flex flex-col sm:flex-row gap-16 md:gap-24 lg:gap-32 md:mr-[4vw] lg:mr-[6vw]">
                        {/* Catalogue */}
                        <div className="space-y-6">
                            <h3 className="font-bold text-white text-[15px]">Catalogue</h3>
                            <ul className="flex flex-col gap-4 text-[14px] text-zinc-400">
                                <li><Link to="/collection" className="hover:text-zinc-200 transition-colors pb-0.5">All Products</Link></li>
                                <li><Link to="/collection" className="hover:text-zinc-200 transition-colors">New Arrivals</Link></li>
                                <li><Link to="/collection" className="hover:text-zinc-200 transition-colors">Best Sellers</Link></li>
                                <li><Link to="/collection" className="hover:text-zinc-200 transition-colors">Coming Soon</Link></li>
                            </ul>
                        </div>

                        {/* Assistance */}
                        <div className="space-y-6">
                            <h3 className="font-bold text-white text-[15px]">Assistance</h3>
                            <ul className="flex flex-col gap-4 text-[14px] text-zinc-400">
                                <li><Link to="/about" className="hover:text-zinc-200 transition-colors">About Us</Link></li>
                                <li><Link to="/contact" className="hover:text-zinc-200 transition-colors">Contact Us</Link></li>
                                <li><Link to="/shipping" className="hover:text-zinc-200 transition-colors">Shipping & Delivery</Link></li>
                                <li><Link to="/returns" className="hover:text-zinc-200 transition-colors">Return Policy</Link></li>
                                <li><Link to="/terms" className="hover:text-zinc-200 transition-colors">Privacy Terms</Link></li>
                            </ul>
                        </div>
                    </div>

                </div>
            </div>

            {/* Footer Bottom Bar - Moved Inside */}
            <div className="border-t border-zinc-900 mx-6 md:mx-[7vw] lg:mx-[9vw]"></div>
            
            <div className="py-6 text-center text-zinc-500 text-[11px] font-bold tracking-widest uppercase">
                &copy; {new Date().getFullYear()} KURO OFFICE. ALL RIGHTS RESERVED.
            </div>
        </footer>
    );
};

export default Footer;
