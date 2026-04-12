import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom';

const ProductItem = ({ id, image, name, price, category, isCollection = true, limitedDrop, inStock = true }) => {
    const { currency, wishlist, toggleWishlist, addToCart } = useContext(ShopContext);
    const isWishlisted = wishlist.includes(id);

    return (
        <div className={`group transition-all duration-300 border border-gray-100 p-2 rounded-xl hover:border-gray-300 hover:shadow-sm bg-white ${isCollection ? '' : 'overflow-hidden'}`}>

            {/* Image Section */}
            <div className={`relative overflow-hidden ${isCollection ? 'rounded-xs bg-gray-50 border border-gray-100' : 'bg-gray-50'}`}>
                <Link onClick={() => window.scrollTo(0, 0)} to={`/product/${id}`}>
                    <img
                        className='w-full aspect-[3/4] object-cover object-center group-hover:scale-105 transition-transform duration-500'
                        src={image[0]}
                        alt={name}
                    />
                </Link>

                {/* Sold Out Overlay */}
                {!inStock && (
                    <div className='absolute inset-0 bg-white/40 backdrop-blur-[1px] z-20 flex items-center justify-center pointer-events-none'>
                        <div className='bg-black text-white px-4 py-1.5 rounded-full shadow-2xl'>
                            <p className='text-[9px] font-black tracking-[0.2em] uppercase'>Sold Out</p>
                        </div>
                    </div>
                )}
                
                {/* Limited Drop Badge */}
                {(limitedDrop === true || limitedDrop === "true") && (
                    <div className='absolute top-3 left-3 bg-[#A855F7] text-white text-[8px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full shadow-lg z-10'>
                        Limited Drop
                    </div>
                )}

                {/* Wishlist Heart Button - Enhanced visibility with backdrop blur */}
                <button
                    onClick={(e) => { e.preventDefault(); toggleWishlist(id); }}
                    className="absolute top-3 right-3 h-8 w-8 rounded-full bg-white/80 backdrop-blur-md border border-white/50 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 shadow-sm z-10"
                >
                    <svg
                        className={`transition-colors w-4 h-4 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-zinc-400 fill-none'}`}
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                    >
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' />
                    </svg>
                </button>

            </div>

            {/* Info Section */}
            <div className={`${isCollection ? 'py-4 px-1 space-y-1' : 'p-4 space-y-3'}`}>
                <div className="flex flex-col">
                    <Link onClick={() => window.scrollTo(0, 0)} to={`/product/${id}`}>
                        <h3 className={`font-bold text-gray-900 transition-colors uppercase tracking-tighter leading-tight ${isCollection ? 'text-sm' : 'text-sm truncate hover:text-black'}`}>{name}</h3>
                    </Link>
                    <div className="flex items-center justify-between mt-1">
                        <p className='text-[10px] text-gray-400 font-bold uppercase tracking-widest'>{category || 'Elite Product'}</p>
                        <span className={`font-black text-gray-900 ${isCollection ? 'text-sm' : 'text-base'}`}>{currency}{price.toLocaleString()}</span>
                    </div>
                </div>

                {!isCollection && (
                    <button
                        onClick={() => addToCart && addToCart(id)}
                        className='w-full mt-3 flex items-center justify-center gap-1.5 text-[10px] font-bold uppercase tracking-widest bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-all duration-300'
                    >
                        <svg className='w-3.5 h-3.5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z' />
                        </svg>
                        Add to Cart
                    </button>
                )}
            </div>

        </div>
    )
}

export default ProductItem;
