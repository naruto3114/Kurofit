import React from 'react'
import { assets } from '../assets/assets'

const ProfileSidebar = ({ userData, activeSection, setActiveSection }) => {

    const defaultAvatar = userData.gender === 'Male'
        ? assets.men
        : userData.gender === 'Female'
            ? assets.women
            : assets.pic; 

    return (
        <div className='w-full sm:w-1/4 flex flex-col gap-6'>
            {/* User Info */}
            <div className='flex items-center gap-4 p-6 border border-gray-100 bg-white rounded-3xl shadow-sm'>
                <div className="relative">
                    <img className='w-14 h-14 rounded-full object-cover border-2 border-gray-100 shadow-inner' src={userData.image ? userData.image : defaultAvatar} alt="" />
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-4 border-white rounded-full"></div>
                </div>
                <div className="overflow-hidden">
                    <p className='text-[10px] text-gray-400 font-black uppercase tracking-widest'>Member</p>
                    <p className='font-black text-lg text-black tracking-tight truncate'>{userData?.name ? userData.name.split(' ')[0] : 'User'}</p>
                </div>
            </div>

            {/* Sidebar Navigation - Horizontal on Mobile */}
            <div className='flex flex-row sm:flex-col gap-2 overflow-x-auto no-scrollbar pb-2 sm:pb-0'>
                <div
                    onClick={() => setActiveSection('profile')}
                    className={`flex-1 sm:flex-none flex items-center justify-center sm:justify-start gap-3 border px-6 py-4 cursor-pointer transition-all rounded-2xl whitespace-nowrap ${activeSection === 'profile' ? 'bg-black text-white border-black shadow-lg shadow-black/10' : 'bg-white border-gray-100 text-gray-400 hover:border-gray-300'}`}
                >
                    <img className='w-4 h-4' src={assets.profile_icon} alt="" style={{ filter: activeSection === 'profile' ? 'invert(1)' : 'none' }} />
                    <p className='text-[10px] font-black uppercase tracking-[0.2em]'>Profile</p>
                </div>
                <div
                    onClick={() => setActiveSection('address')}
                    className={`flex-1 sm:flex-none flex items-center justify-center sm:justify-start gap-3 border px-6 py-4 cursor-pointer transition-all rounded-2xl whitespace-nowrap ${activeSection === 'address' ? 'bg-black text-white border-black shadow-lg shadow-black/10' : 'bg-white border-gray-100 text-gray-400 hover:border-gray-300'}`}
                >
                    <svg className={`w-4 h-4 ${activeSection === 'address' ? 'text-white' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <p className='text-[10px] font-black uppercase tracking-[0.2em]'>Addresses</p>
                </div>
            </div>
        </div>
    )
}

export default ProfileSidebar;
