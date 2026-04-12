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


            <div className='flex flex-col gap-10 w-full mt-2'>

                {/* Contact Information */}
                <div className="bg-white p-6 sm:p-0 rounded-3xl sm:rounded-none border sm:border-none border-gray-100 shadow-sm sm:shadow-none">
                    <p className='text-gray-400 mb-6 sm:mb-4 tracking-[0.2em] text-[10px] font-black uppercase'>Contact Information</p>
                    <div className='flex flex-col sm:grid sm:grid-cols-[1fr_2fr] gap-6 sm:gap-y-6 items-start sm:items-center'>
                        <div className="flex flex-col sm:contents">
                            <p className='font-bold text-gray-400 text-xs sm:text-sm uppercase tracking-wider sm:normal-case sm:tracking-normal'>Email Address</p>
                            <p className='text-gray-900 font-bold bg-gray-50/50 px-4 py-3 sm:p-0 rounded-xl w-full sm:w-auto truncate'>{userData.email}</p>
                        </div>

                        <div className="flex flex-col sm:contents gap-2 w-full">
                            <p className='font-bold text-gray-400 text-xs sm:text-sm uppercase tracking-wider sm:normal-case sm:tracking-normal'>Phone Number</p>
                            {isEdit ? (
                                <input
                                    className='bg-gray-50 border border-gray-200 text-gray-900 font-bold px-6 py-4 rounded-2xl w-full sm:max-w-xs outline-none focus:border-black focus:bg-white transition-all shadow-sm'
                                    type="text"
                                    value={userData.phone}
                                    onChange={e => setUserData(prev => ({ ...prev, phone: e.target.value }))}
                                />
                            ) : (
                                <p className='text-gray-900 font-bold bg-gray-50/50 px-4 py-3 sm:p-0 rounded-xl w-full sm:w-auto'>{userData.phone}</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Basic Information */}
                <div className="bg-white p-6 sm:p-0 rounded-3xl sm:rounded-none border sm:border-none border-gray-100 shadow-sm sm:shadow-none">
                    <p className='text-gray-400 mb-6 sm:mb-4 tracking-[0.2em] text-[10px] font-black uppercase'>Basic Information</p>
                    <div className='flex flex-col sm:grid sm:grid-cols-[1fr_2fr] gap-6 sm:gap-y-6 items-start sm:items-center'>
                        <div className="flex flex-col sm:contents gap-2 w-full">
                            <p className='font-bold text-gray-400 text-xs sm:text-sm uppercase tracking-wider sm:normal-case sm:tracking-normal'>Gender</p>
                            {isEdit ? (
                                <select
                                    className='bg-gray-50 border border-gray-200 text-gray-900 font-bold px-6 py-4 rounded-2xl w-full sm:max-w-[180px] outline-none focus:border-black focus:bg-white transition-all shadow-sm appearance-none'
                                    onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))}
                                    value={userData.gender || "Not Selected"}
                                >
                                    <option value="Not Selected">Not Selected</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            ) : (
                                <p className='text-gray-900 font-bold bg-gray-50/50 px-4 py-3 sm:p-0 rounded-xl w-full sm:w-auto'>{userData.gender}</p>
                            )}
                        </div>

                        <div className="flex flex-col sm:contents gap-2 w-full">
                            <p className='font-bold text-gray-400 text-xs sm:text-sm uppercase tracking-wider sm:normal-case sm:tracking-normal'>Date of Birth</p>
                            {isEdit ? (
                                <input
                                    className='bg-gray-50 border border-gray-200 text-gray-900 font-bold px-6 py-4 rounded-2xl w-full sm:max-w-[200px] outline-none focus:border-black focus:bg-white transition-all shadow-sm'
                                    type="date"
                                    onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))}
                                    value={userData.dob}
                                />
                            ) : (
                                <p className='text-gray-900 font-bold bg-gray-50/50 px-4 py-3 sm:p-0 rounded-xl w-full sm:w-auto'>{userData.dob}</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className='mt-4 flex flex-col sm:flex-row gap-4'>
                    {isEdit ? (
                        <>
                            <button
                                disabled={loading}
                                className="w-full sm:w-auto bg-black text-white px-10 py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-xl hover:bg-zinc-800 transition disabled:opacity-60"
                                onClick={updateUserProfileData}
                            >
                                {loading ? "Saving..." : "Save Changes"}
                            </button>
                            <button
                                className='w-full sm:w-auto border border-gray-200 text-gray-400 px-10 py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-gray-50 transition-all'
                                onClick={() => setIsEdit(false)}
                            >
                                Cancel
                            </button>
                        </>
                    ) : (
                        <button
                            className='w-full sm:w-auto bg-white border-2 border-black text-black px-12 py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-all shadow-xl active:scale-95'
                            onClick={() => setIsEdit(true)}
                        >
                            Edit Profile
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ProfileDetails
