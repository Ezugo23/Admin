
import '../../style/user.css';
import SideMenu from '../../Component/Profile/sideMenu';
import User from '../../Component/Profile/User'
import Password from '../../Component/Profile/password'
import { Link, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
export default function Profile() {
  
  const [userImage, setUserImage] = useState('');
  return (
    <>
            <Routes>
            <Route path="user" element={<User setUserImage={setUserImage} />} />
            <Route path="password" element={<Password />} />
            </Routes>
    </>
  );
}