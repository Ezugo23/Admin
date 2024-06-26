import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaStar } from "react-icons/fa";

export default function Password() {
  const { id } = useParams();
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChangePassword = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        `https://swifdropp.onrender.com/api/v1/restaurant/changepassword/verifyadmin/${id}`,
        { newPassword }
      );
      setLoading(false);
      toast.success('Password changed successfully!');
      console.log('Password changed successfully:', response.data);
    } catch (error) {
      setLoading(false);
      console.error('Error changing password:', error);
      toast.error('Failed to change password. Please try again.');
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className='border-none bg-white shadow-md mb-8 p-6' style={{marginTop:'30px'}}>
        <div className="mb-4">
          <p className="font-roboto font-bold text-lg leading-6 text-black">Restaurant’s Information</p>
        </div>
        <hr className="mb-4 border-black" />
        <div className="mb-4">
          <label className='font-roboto text-black' style={{fontSize:"12px", fontWeight:'300', lineHeight:'14.08px'}}>Restaurant / Company Name</label>
        </div>
        <div className='flex items-center mb-4'>
          <input
            id="newPassword"
            type="text"
            className="w-full h-12 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm pl-12"
            placeholder="Enter Restaurant / Company Name"
          />
        </div>
        <div className="mb-4">
          <label className='font-roboto text-black'  style={{fontSize:"12px", fontWeight:'300', lineHeight:'14.08px'}}>E-mail Address</label>
        </div>
        <div className='flex items-center mb-4'>
          <input
            id="newPassword"
            type="text"
            className="w-full h-12 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm pl-12"
            placeholder="Enter E-mail"
          />
        </div>
        <div className="mb-4">
          <label className='font-roboto text-black'  style={{fontSize:"12px", fontWeight:'300', lineHeight:'14.08px'}}>Phone Number</label>
        </div>
        <div className='flex items-center mb-4'>
          <input
            id="newPassword"
            type="text"
            className="w-full h-12 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm pl-12"
            placeholder="Enter Phone Number"
          />
        </div>
        <div className="mb-4">
          <label className='font-roboto text-black'  style={{fontSize:"12px", fontWeight:'300', lineHeight:'14.08px'}}>CAC registration No.</label>
        </div>
        <div className='flex items-center mb-4'>
          <input
            id="newPassword"
            type="text"
            className="w-full h-12 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm pl-12"
            placeholder="Enter CAC registration No."
          />
        </div>
        <div className="mb-4">
          <label className='font-roboto text-black'  style={{fontSize:"12px", fontWeight:'300', lineHeight:'14.08px'}}>Location</label>
        </div>
        <div className='flex items-center mb-4'>
          <input
            id="newPassword"
            type="text"
            className="w-full h-12 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm pl-12"
            placeholder="Enter Location"
          />
        </div>
        <div className="mb-4">
  <label className="font-roboto text-black" style={{ fontSize: "12px", fontWeight: '300', lineHeight: '14.08px' }}>
    Rating
  </label>
  <div className="relative flex items-center mb-4">
    <input
      id="newPassword"
      type="text"
      className="w-full h-12 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm pl-12" // Adjust padding-left to 12
      placeholder="Enter Ratings"
    />
    <div className="absolute inset-y-0 left-0 flex items-center justify-center pointer-events-none" style={{ backgroundColor: '#F9F9F9', width: '40px', height: '100%' }}>
      <FaStar className="text-gray-400" />
    </div>
  </div>
</div>
        <div className="flex justify-end">
          <button
            className={`w-[219px] h-[45px] bg-[#4DB6AC] text-white font-roboto font-normal text-base leading-[17.58px] rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={handleChangePassword}
            disabled={loading}
          >
            {loading ? 'Saving...' : 'SAVE'}
          </button>
        </div>
      </div>
    </div>
  );
}
