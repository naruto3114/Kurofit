import React from 'react'

const Navbar = () => {
    return (
        <div className='flex items-center py-4 px-8 justify-between bg-white border-b border-gray-100'>
            <h2 className='text-sm font-medium text-gray-500 uppercase tracking-widest'>Admin Panel</h2>
            <div className='flex items-center gap-4'>
                <div className='w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-600 border border-gray-200'>
                    AD
                </div>
            </div>
        </div>
    )
}

export default Navbar
