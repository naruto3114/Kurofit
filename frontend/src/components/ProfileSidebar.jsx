import React from 'react'
import { assets } from '../assets/assets'

const ProfileSidebar = ({ userData, activeSection, setActiveSection }) => {

    const defaultAvatar = userData.gender === 'Male'
        ? assets.men
        : userData.gender === 'Female'
            ? assets.women
            : assets.pic; 

    return (
        <div className='w-full sm:w-1/4 flex flex-col gap-4'>

            {/* User Info */}
            <div className='flex items-center gap-4 p-4 border border-gray-200'>
                <img className='w-12 h-12 object-cover' src={userData.image ? userData.image : defaultAvatar} alt="" />
                <div>
                    <p className='text-xs text-gray-500 uppercase tracking-widest'>Hello,</p>
                    <p className='font-bold text-base text-black'>{userData.name}</p>
                </div>
            </div>

            {/* Sidebar Navigation */}
            <div className='flex flex-col gap-2 pt-4 text-sm'>
                <div
                    onClick={() => setActiveSection('profile')}
                    className={`flex items-center gap-3 border border-gray-200 px-4 py-3 cursor-pointer transition-all ${activeSection === 'profile' ? 'bg-black text-white' : 'hover:bg-gray-50 text-gray-700'}`}
                >
                    <img className='w-4 h-4' src={assets.profile_icon} alt="" style={{ filter: activeSection === 'profile' ? 'invert(1)' : 'none' }} />
                    <p className='text-[10px] font-bold uppercase tracking-[0.2em]'>Profile Information</p>
                </div>
                <div
                    onClick={() => setActiveSection('address')}
                    className={`flex items-center gap-3 border border-gray-200 px-4 py-3 cursor-pointer transition-all ${activeSection === 'address' ? 'bg-black text-white' : 'hover:bg-gray-50 text-gray-700'}`}
                >
                    <svg className={`w-4 h-4 ${activeSection === 'address' ? 'text-white' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <p className='text-[10px] font-bold uppercase tracking-[0.2em]'>Saved Addresses</p>
                </div>
            </div>
        </div>
    )
}

export default ProfileSidebar;
