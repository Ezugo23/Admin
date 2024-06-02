import React from 'react';
import '../../style/user.css';
import { HiDotsHorizontal } from "react-icons/hi";
import { FaUserTie } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";

export default function Profile() {
  return (
    <>
    <p className='main'>Account Settings/Personal Information</p>
    <div className="container">
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
          <p className="personal-info">Personal Information</p>
        </div>
        <div className="user-info-container">
        <RiLockPasswordFill className="user-icon" />
          <p className="personal-info">Change Password</p>
        </div>
      </div>
      <div className="background">
        {/* Your content goes here */}
      </div>
    </div>
    </>
  );
}