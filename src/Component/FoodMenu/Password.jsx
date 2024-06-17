import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
     <ToastContainer position="top-center" />
      <div className='border-none bg-white shadow-md mb-8 p-6' style={{marginTop:'30px'}}>
        <div className="mb-4">
          <p className="font-roboto font-bold text-lg leading-6 text-black">Change Password</p>
        </div>
        <hr className="mb-4 border-black" />
        <div className="mb-4">
          <label className='font-roboto font-sm-bold text-small leading-6 text-black'>New Password</label>
        </div>
        <div className='flex items-center mb-4'>
          <input
            id="newPassword"
            type="password"
            className="w-[70%] h-12 border-gray-100 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm mr-4"
            placeholder="Enter your new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <button
          className={`w-[219px] h-[45px] bg-[#4DB6AC] text-white font-roboto font-normal text-base leading-[17.58px] rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={handleChangePassword}
          disabled={loading}
        >
          {loading ? 'Saving...' : 'SAVE PASSWORD'}
        </button>
      </div>
    </div>
  );
}