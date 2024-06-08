import React from 'react';
import '../../style/user.css';
import { HiDotsHorizontal } from "react-icons/hi";
import { FaUserTie } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { IoMdCloseCircle } from "react-icons/io";

export default function sideMenu() {
  return (
    <>
      <div className="white-background">
        <div className='next'>
          <img src='https://bit.ly/dan-abramov' className="image-style" alt="profile" />
          <div className="text-container">
            <p className="text">George Smith</p>
            <p className="texts">General Manager</p>
          </div>
          <div className="icon-container">
            <HiDotsHorizontal />
          </div>
        </div>
        <div className="border-line"></div>
        <div className="user-info-container">
          <FaUserTie className="user-icon" />
          <a href="user" className="personal-info-link">Personal Information</a>
        </div>
        <div className="user-info-container">
          <RiLockPasswordFill className="user-icon" />
          <a href="password" className="personal-info-link">Change Password</a>
        </div>
      </div>
  
    </>
  );
}