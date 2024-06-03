import React from 'react';
import '../../style/user.css';
import { IoMdCloseCircle } from "react-icons/io";

export default function User() {
  return (
    <>
      <div className="background">
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
   
    </>
  );
}