import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';

const Coupons = ({ token }) => {

    const [coupons, setCoupons] = useState([]);

    const [code, setCode] = useState("");
    const [discount, setDiscount] = useState("");
    const [expiryDate, setExpiryDate] = useState("");

    const handleApiError = (error) => {
        console.log(error);

        if (error.code === 'ERR_NETWORK' || !error.response) {
            toast.error('Backend is offline. Start the backend server and check the MongoDB connection.');
            return;
        }

        toast.error(error.response?.data?.message || error.message);
    }

    const fetchCoupons = async () => {
        try {
            const response = await axios.get(backendUrl + '/api/coupon/list', { headers: { token } });
            if (response.data.success) {
                setCoupons(response.data.coupons.reverse());
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            handleApiError(error);
        }
    };

    useEffect(() => {
        fetchCoupons();
    }, []);

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(backendUrl + '/api/coupon/generate', {
                code,
                discount: Number(discount),
                expiryDate: Number(expiryDate)
            }, { headers: { token } });

            if (response.data.success) {
                toast.success(response.data.message);
                setCode("");
                setDiscount("");
                setExpiryDate("");
                fetchCoupons();
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            handleApiError(error);
        }
    };

    const deleteCoupon = async (id) => {
        try {
            const response = await axios.post(backendUrl + '/api/coupon/delete', { id }, { headers: { token } });
            if (response.data.success) {
                 toast.success(response.data.message);
                 fetchCoupons();
            } else {
                 toast.error(response.data.message);
            }
        } catch (error) {
            handleApiError(error);
        }
    }


    return (
        <div className="flex flex-col xl:flex-row gap-8">
            <div className="w-full xl:w-1/3">
                <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>
                    <div className='w-full'>
                        <p className='mb-2 font-medium'>Coupon Code Title</p>
                        <input onChange={(e) => setCode(e.target.value)} value={code} className='w-full max-w-[500px] px-3 py-2 border ' type="text" placeholder='e.g., DROP20, WINTERSALE' required />
                    </div>

                    <div className='w-full'>
                        <p className='mb-2 font-medium'>Discount Percentage (%)</p>
                        <input onChange={(e) => setDiscount(e.target.value)} value={discount} className='w-full max-w-[500px] px-3 py-2 border ' type="number" min="1" max="100" placeholder='e.g., 20' required />
                    </div>

                    <div className='w-full'>
                        <p className='mb-2 font-medium'>Validity in Days</p>
                        <input onChange={(e) => setExpiryDate(e.target.value)} value={expiryDate} className='w-full max-w-[500px] px-3 py-2 border ' type="number" min="1" placeholder='e.g., 10' required />
                    </div>

                    <button type="submit" className='w-28 py-3 mt-4 bg-black text-white text-sm font-medium '>GENERATE</button>
                </form>
            </div>

            <div className="w-full xl:w-2/3">
                <p className='mb-4 font-medium'>Active Coupons</p>
                <div className='flex flex-col gap-2'>
                    {/* List Table Header */}
                    <div className='hidden md:grid grid-cols-[1fr_1fr_1fr_1fr_1fr] items-center py-2 px-4 border bg-gray-100 text-sm'>
                        <b>Code</b>
                        <b>Discount</b>
                        <b>Status</b>
                        <b>Expires On</b>
                        <b className='text-center'>Action</b>
                    </div>

                    {/* Coupon List */}
                    {coupons.map((item, index) => (
                        <div className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_1fr_1fr_1fr_1fr] items-center gap-2 py-2 px-4 border text-sm' key={index}>
                            <p className='font-bold'>{item.code}</p>
                            <p>{item.discount}%</p>
                            <p className={`${item.isActive ? "text-green-600" : "text-red-600"}`}>{item.isActive ? "Active" : "Disabled"}</p>
                            <p>{new Date(item.expiryDate).toLocaleDateString()}</p>
                            <div className="flex justify-center">
                                 <p onClick={() => deleteCoupon(item._id)} className='cursor-pointer text-red-500 font-bold'>X</p>
                            </div>
                        </div>
                    ))}
                    {coupons.length === 0 && <p className="text-gray-500 text-sm mt-2">No coupons available.</p>}
                </div>
            </div>
        </div>
    );
};

export default Coupons;
