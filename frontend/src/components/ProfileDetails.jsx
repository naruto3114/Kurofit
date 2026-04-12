import React, { useContext, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const ProfileDetails = ({ userData, setUserData, loadUserProfileData }) => {

    const { backendUrl, token } = useContext(ShopContext)
    const [isEdit, setIsEdit] = useState(false)
    const [loading, setLoading] = useState(false)

    const updateUserProfileData = async () => {
        try {
            setLoading(true)

            const payload = {
                name: userData.name,
                phone: userData.phone,
                gender: userData.gender,
                dob: userData.dob
            }

            const { data } = await axios.post(
                `${backendUrl}/api/user/update-profile`,
                payload,
                { headers: { token } }
            )

            if (data.success) {
                toast.success(data.message)
                await loadUserProfileData()
                setIsEdit(false)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error("Failed to update profile")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='flex flex-col gap-6 text-gray-700 font-normal text-sm md:text-base'>

            {/* Header Section */}
            <div className='pb-4 border-b border-gray-200'>
                <h2 className='text-2xl font-medium text-gray-800'>Profile Details</h2>
                <p className='text-sm text-gray-500 mt-1'>Manage your personal information and contact details</p>
            </div>


            <div className='flex flex-col gap-6 max-w-[500px] mt-2'>

                {/* Contact Information */}
                <div>
                    <p className='text-gray-500 underline mb-4 tracking-wide text-xs font-medium uppercase'>Contact Information</p>
                    <div className='grid grid-cols-[1fr_3fr] gap-y-5 items-center'>
                        <p className='font-medium text-gray-600'>Email Address:</p>
                        <p className='text-gray-500 cursor-not-allowed'>{userData.email}</p>

                        <p className='font-medium text-gray-600'>Phone Number:</p>
                        {isEdit ? (
                            <input
                                className='bg-gray-50 border border-gray-300 text-gray-700  px-3 py-2 max-w-52 outline-none focus:border-black focus:bg-white transition-all'
                                type="text"
                                value={userData.phone}
                                onChange={e => setUserData(prev => ({ ...prev, phone: e.target.value }))}
                            />
                        ) : (
                            <p className='text-gray-500'>{userData.phone}</p>
                        )}
                    </div>
                </div>

                {/* Basic Information */}
                <div>
                    <p className='text-gray-500 underline mb-4 mt-4 tracking-wide text-xs font-medium uppercase'>Basic Information</p>
                    <div className='grid grid-cols-[1fr_3fr] gap-y-5 items-center'>
                        <p className='font-medium text-gray-600'>Gender:</p>
                        {isEdit ? (
                            <select
                                className='max-w-36 bg-gray-50 border border-gray-300 text-gray-700  px-3 py-2 outline-none focus:border-black focus:bg-white transition-all'
                                onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))}
                                value={userData.gender || "Not Selected"}
                            >
                                <option value="Not Selected">Not Selected</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        ) : (
                            <p className='text-gray-500'>{userData.gender}</p>
                        )}

                        <p className='font-medium text-gray-600'>Date of Birth:</p>
                        {isEdit ? (
                            <input
                                className='max-w-40 bg-gray-50 border border-gray-300 text-gray-700  px-3 py-2 outline-none focus:border-black focus:bg-white transition-all'
                                type="date"
                                onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))}
                                value={userData.dob}
                            />
                        ) : (
                            <p className='text-gray-500'>{userData.dob}</p>
                        )}
                    </div>
                </div>

                {/* Action Buttons */}
                <div className='mt-8 flex gap-4'>
                    {isEdit ? (
                        <>
                            <button
                                disabled={loading}
                                className="bg-black text-white px-8 py-2.5  text-sm font-medium hover:bg-gray-800 transition disabled:opacity-60"
                                onClick={updateUserProfileData}
                            >
                                {loading ? "Saving..." : "Save Changes"}
                            </button>
                            <button
                                className='border border-gray-300 text-gray-600 px-8 py-2.5  text-sm font-medium hover:bg-gray-50 transition-all active:scale-95'
                                onClick={() => setIsEdit(false)}
                            >
                                Cancel
                            </button>
                        </>
                    ) : (
                        <button
                            className='border border-black text-black px-8 py-2.5  text-sm font-medium hover:bg-black hover:text-white transition-all active:scale-95'
                            onClick={() => setIsEdit(true)}
                        >
                            Edit Details
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ProfileDetails
