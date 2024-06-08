import React from 'react';
import '../../style/user.css';
import { IoMdCloseCircle } from "react-icons/io";

export default function User() {
  return (
    <>
  <div className="w-full max-w-4xl mx-auto">
        <div className='border-none bg-white shadow-md mb-8 p-6' style={{marginTop:'30px'}}>
        <p className='edit'>Add/Edit Personal Information</p>
          <h5>Upload Image</h5>
          <IoMdCloseCircle className='close-icon' />
          <img src="https://bit.ly/dan-abramov" alt="" className='image2'/>
          <button className='pro-btn'>Change Photo</button>
        
      </div>
      </div>
    </>
  );
}