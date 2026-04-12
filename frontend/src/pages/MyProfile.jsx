import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { motion } from 'framer-motion'
import ProfileSidebar from '../components/ProfileSidebar'
import ProfileDetails from '../components/ProfileDetails'
import ProfileAddress from '../components/ProfileAddress'

const MyProfile = () => {

    const { token, navigate, userData, getUserProfile, setUserData } = useContext(ShopContext)
    const [loading, setLoading] = useState(true)
    const [activeSection, setActiveSection] = useState('profile')

    useEffect(() => {
        if (!token) {
            navigate('/login')
            return
        }

        const fetchProfile = async () => {
            setLoading(true)
            await getUserProfile(token)
            setLoading(false)
        }

        if (!userData) {
            fetchProfile()
        } else {
            setLoading(false)
        }
    }, [token, userData])

    if (loading) {
        return (
            <div className='min-h-[60vh] flex items-center justify-center flex-col gap-4'>
                <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    className='w-10 h-10 border-4 border-gray-100 border-t-black rounded-full'
                />
                <p className='text-[10px] font-black uppercase tracking-[0.2em] text-gray-400'>Loading Profile...</p>
            </div>
        )
    }

    if (!userData) {
        return (
            <div className='min-h-[60vh] flex items-center justify-center flex-col gap-4 px-6 text-center'>
                <p className='text-[10px] font-black uppercase tracking-[0.2em] text-red-500'>Profile not found or session expired.</p>
                <button 
                    onClick={() => getUserProfile(token)}
                    className='mt-2 text-[10px] font-black uppercase tracking-[0.2em] bg-black text-white px-8 py-4 rounded-2xl shadow-lg'
                >
                    Retry Loading
                </button>
            </div>
        )
    }

    return (
        <div className='border-t border-gray-100 pt-10 sm:pt-14 pb-20 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] page-entrance'>
            <div className='flex flex-col sm:flex-row gap-10 text-sm'>
                <ProfileSidebar
                    userData={userData}
                    activeSection={activeSection}
                    setActiveSection={setActiveSection}
                />

                <div className='w-full sm:w-3/4 min-h-[400px]'>
                    {activeSection === 'profile' && (
                        <ProfileDetails
                            userData={userData}
                            setUserData={setUserData}
                            loadUserProfileData={() => getUserProfile(token)}
                        />
                    )}
                    {activeSection === 'address' && (
                        <ProfileAddress />
                    )}
                </div>
            </div>
        </div>
    )
}

export default MyProfile
