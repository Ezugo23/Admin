import React from 'react';
import '../../style/user.css';
import SideMenu from '../../Component/Profile/sideMenu';
import User from '../../Component/Profile/User'
import { Link, Routes, Route } from 'react-router-dom';
export default function Profile() {
  return (
    <>
    <p className='main'>Account Settings/Personal Information</p>
    <div className="container">
    <SideMenu />
            <Routes>
            <Route path="user" element={<User />} />
            </Routes>
    </div>
    </>
  );
}