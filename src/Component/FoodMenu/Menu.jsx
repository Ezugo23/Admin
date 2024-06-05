import React from 'react';
import '../../style/user.css';
import { HiDotsHorizontal } from "react-icons/hi";
import { FaUserTie } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { IoMdCloseCircle } from "react-icons/io";

export default function Menu() {
  return (
    <>
      <div className="white-background-2">
        <div className='next'>
          <img src='https://bit.ly/dan-abramov' className="image-style" alt="profile" />
          <div className="text-container">
            <p className="text">Food City</p>
            <p className="texts">Restaurant</p>
          </div>
          <div className="icon-container">
            <HiDotsHorizontal />
          </div>
        </div>
        <div className="border-line"></div>
        <div className="user-info-container">
          <FaUserTie className="user-icon" />
          <a href="personal" className="personal-info-link">Personal Information</a>
        </div>
        <div className="user-info-container">
          <RiLockPasswordFill className="user-icon" />
          <a href="password" className="personal-info-link">Change Password</a>
        </div>
        <div className="user-info-container">
          <RiLockPasswordFill className="user-icon" />
          <a href="/change-password" className="personal-info-link">Change Password</a>
        </div>
        <div className="border-line-3"></div> {/* Add this line */}
        <div style={{marginTop:'50px'}}>
        <div className="user-info-container">
          <RiLockPasswordFill className="user-icon" />
          <a href="/change-password" className="personal-info-link">Change Password</a>
        </div>
        <div className="user-info-container">
          <RiLockPasswordFill className="user-icon" />
          <a href="/change-password" className="personal-info-link">Change Password</a>
        </div>
        <div className="user-info-container">
          <RiLockPasswordFill className="user-icon" />
          <a href="/change-password" className="personal-info-link">Change Password</a>
        </div>
      </div>
      <div className="border-line-4"></div> 
      <div style={{marginTop:'80px'}}>
        <div className="user-info-container">
          <RiLockPasswordFill className="user-icon" />
          <a href="/change-password" className="personal-info-link">Change Password</a>
        </div>
        <div className="user-info-container">
          <RiLockPasswordFill className="user-icon" />
          <a href="/change-password" className="personal-info-link">Change Password</a>
        </div>
        <div className="user-info-container">
          <RiLockPasswordFill className="user-icon" />
          <a href="/change-password" className="personal-info-link">Change Password</a>
        </div>
        <div className="user-info-container">
          <RiLockPasswordFill className="user-icon" />
          <a href="/change-password" className="personal-info-link">Change Password</a>
        </div>
      </div>
      </div>
    </>
  );
}