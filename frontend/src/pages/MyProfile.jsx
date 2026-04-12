import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import ProfileSidebar from '../components/ProfileSidebar'
import ProfileDetails from '../components/ProfileDetails'
import ProfileAddress from '../components/ProfileAddress'

const MyProfile = () => {

    const { token, backendUrl, navigate } = useContext(ShopContext)

    const [userData, setUserData] = useState(null)
    const [activeSection, setActiveSection] = useState('profile') // 'profile' or 'address'

    const loadUserProfileData = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/user/profile', { headers: { token } })
            if (data.success) {
                setUserData(data.userData)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    useEffect(() => {
        if (token) {
            loadUserProfileData()
        } else {
            navigate('/login')
        }
    }, [token])

    return userData ? (
        <div className='border-t pt-14 pb-20 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
            <div className='flex flex-col sm:flex-row gap-8 text-sm'>
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
                            loadUserProfileData={loadUserProfileData}
                        />
                    )}
                    {activeSection === 'address' && (
                        <ProfileAddress />
                    )}
                </div>
            </div>
        </div>
    ) : null
}

export default MyProfile
