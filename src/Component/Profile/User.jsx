import React from 'react';
import '../../style/user.css';
import { IoMdCloseCircle } from "react-icons/io";

export default function User() {
  return (
    <>
<div className="bg-white relative w-[980px] h-screen">
  <div className="w-[500px] bg-white flex flex-col mt-2 rounded-md shadow-md px-4">
        <p className='edit'>Add/Edit Personal Information</p>
        <div className="border-line-bottom"></div>
        <div className='display'>
        <div className="border-box">
          <h5>Upload Image</h5>
          <div className='line'></div>
          <IoMdCloseCircle className='close-icon' />
          <img src="https://bit.ly/dan-abramov" alt="" className='image2'/>
          <button className='pro-btn'>Change Photo</button>
        </div>
        </div>
      </div>
      </div>
    </>
  );
}