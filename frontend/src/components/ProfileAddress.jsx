import React, { useContext, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { motion } from 'framer-motion'

const ProfileAddress = () => {
    const { userAddresses, addUserAddress, removeUserAddress, updateUserAddress } = useContext(ShopContext)
    const [isAdding, setIsAdding] = useState(false)
    const [editIndex, setEditIndex] = useState(null)
    const [formData, setFormData] = useState({
        firstName: '', lastName: '', email: '', street: '', city: '', state: '', zipcode: '', country: '', phone: ''
    })

    const handleEdit = (index) => {
        setEditIndex(index)
        setFormData(userAddresses[index])
        setIsAdding(true)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        let success = false
        if (editIndex !== null) {
            success = await updateUserAddress(editIndex, formData)
        } else {
            success = await addUserAddress(formData)
        }

        if (success) {
            setIsAdding(false)
            setEditIndex(null)
            setFormData({ firstName: '', lastName: '', email: '', street: '', city: '', state: '', zipcode: '', country: '', phone: '' })
        }
    }

    return (
        <div className='flex flex-col gap-8'>
            <div className='flex justify-between items-center border-b pb-4'>
                <div>
                    <h2 className='text-2xl font-medium text-gray-800'>Saved Addresses</h2>
                    <p className='text-sm text-gray-500 mt-1'>Manage your shipping addresses for faster checkout</p>
                </div>
                {!isAdding && (
                    <button
                        onClick={() => { setIsAdding(true); setEditIndex(null); setFormData({ firstName: '', lastName: '', email: '', street: '', city: '', state: '', zipcode: '', country: '', phone: '' }) }}
                        className='bg-black text-white px-6 py-2.5 text-[10px] font-bold uppercase tracking-widest hover:bg-gray-800 transition-all active:scale-95'
                    >
                        + Add New
                    </button>
                )}
            </div>

            {isAdding ? (
                <motion.form
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    onSubmit={handleSubmit}
                    className='bg-gray-50 p-8 rounded-2xl border border-gray-100 flex flex-col gap-6'
                >
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                        <input required placeholder='First Name' className='border border-gray-200 px-4 py-3 rounded-xl outline-none focus:border-black transition-all' value={formData.firstName} onChange={e => setFormData({ ...formData, firstName: e.target.value })} />
                        <input required placeholder='Last Name' className='border border-gray-200 px-4 py-3 rounded-xl outline-none focus:border-black transition-all' value={formData.lastName} onChange={e => setFormData({ ...formData, lastName: e.target.value })} />
                    </div>
                    <input required placeholder='Email Address' type='email' className='border border-gray-200 px-4 py-3 rounded-xl outline-none focus:border-black transition-all' value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                    <input required placeholder='Street' className='border border-gray-200 px-4 py-3 rounded-xl outline-none focus:border-black transition-all' value={formData.street} onChange={e => setFormData({ ...formData, street: e.target.value })} />
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                        <input required placeholder='City' className='border border-gray-200 px-4 py-3 rounded-xl outline-none focus:border-black transition-all' value={formData.city} onChange={e => setFormData({ ...formData, city: e.target.value })} />
                        <input required placeholder='State' className='border border-gray-200 px-4 py-3 rounded-xl outline-none focus:border-black transition-all' value={formData.state} onChange={e => setFormData({ ...formData, state: e.target.value })} />
                    </div>
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                        <input required placeholder='Zipcode' className='border border-gray-200 px-4 py-3 rounded-xl outline-none focus:border-black transition-all' value={formData.zipcode} onChange={e => setFormData({ ...formData, zipcode: e.target.value })} />
                        <input required placeholder='Country' className='border border-gray-200 px-4 py-3 rounded-xl outline-none focus:border-black transition-all' value={formData.country} onChange={e => setFormData({ ...formData, country: e.target.value })} />
                    </div>
                    <input required placeholder='Phone' className='border border-gray-200 px-4 py-3 rounded-xl outline-none focus:border-black transition-all' value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />

                    <div className='flex gap-4 mt-4'>
                        <button type='submit' className='bg-black text-white px-8 py-3 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-all'>
                            {editIndex !== null ? 'Update Address' : 'Save Address'}
                        </button>
                        <button type='button' onClick={() => setIsAdding(false)} className='border border-gray-300 px-8 py-3 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-gray-50 transition-all'>
                            Cancel
                        </button>
                    </div>
                </motion.form>
            ) : (
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    {userAddresses.length === 0 ? (
                        <div className='col-span-full py-12 text-center bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200'>
                            <p className='text-gray-400 font-medium'>No saved addresses found.</p>
                        </div>
                    ) : (
                        userAddresses.map((addr, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className='p-6 bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-md transition-all group relative'
                            >
                                <div className='flex justify-between items-start mb-4'>
                                    <div className='p-2 bg-gray-50 rounded-xl group-hover:bg-black group-hover:text-white transition-colors'>
                                        <svg className='w-5 h-5' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <div className='flex gap-2'>
                                        <button onClick={() => handleEdit(index)} className='p-2 text-gray-400 hover:text-black transition-colors'>
                                            <svg className='w-4 h-4' fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                                        </button>
                                        <button onClick={() => { if (window.confirm("Delete address?")) removeUserAddress(index) }} className='p-2 text-gray-400 hover:text-red-500 transition-colors'>
                                            <svg className='w-4 h-4' fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                        </button>
                                    </div>
                                </div>
                                <p className='font-bold text-gray-800'>{addr.firstName} {addr.lastName}</p>
                                <p className='text-sm text-gray-500 mt-1'>{addr.street}, {addr.city}</p>
                                <p className='text-sm text-gray-500'>{addr.state}, {addr.zipcode}</p>
                                <p className='text-sm text-gray-500'>{addr.country}</p>
                                <p className='text-xs font-bold text-black mt-4 uppercase tracking-widest'>{addr.phone}</p>
                            </motion.div>
                        ))
                    )}
                </div>
            )}
        </div>
    )
}

export default ProfileAddress
