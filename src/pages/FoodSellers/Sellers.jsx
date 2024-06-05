import React from 'react';
import '../../style/user.css';
import Menu from '../../Component/FoodMenu/Menu'
import Personal from '../../Component/FoodMenu/Personal'
import Password from '../../Component/FoodMenu/Password'
import { Link, Routes, Route } from 'react-router-dom';
export default function Sellers() {
  return (
    <>
    <p className='main'>Resturant's Profile</p>
    <div className="container">
    <Menu />
            <Routes>
            <Route path="personal" element={<Personal />} />
            <Route path="password" element={<Password />} />
            </Routes>
    </div>
    </>
  );
}