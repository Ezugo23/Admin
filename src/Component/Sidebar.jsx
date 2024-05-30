import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../Component/Styles/Sidebar.css';
import Logo from '../Asset/Logo.svg';
import { RxDashboard } from "react-icons/rx";
import { CgProfile } from "react-icons/cg";
import { RiProfileFill } from "react-icons/ri";
import { GiFoodTruck } from "react-icons/gi";
import { FaMotorcycle } from "react-icons/fa6";
import { MdWorkHistory } from "react-icons/md";
import { FaQuestionCircle } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import { MdOutlineArrowDropUp, MdArrowDropDown } from "react-icons/md";
import { FaFacebookF } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";

const Sidebar = () => {
  const [dropdowns, setDropdowns] = useState({});
  const location = useLocation();

  const toggleDropdown = (menu) => {
    setDropdowns((prevDropdowns) => ({
      ...prevDropdowns,
      [menu]: !prevDropdowns[menu]
    }));
  };

  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <img src={Logo} alt="Company" style={{ width: '48px', height: '48px' }} />
        <h1 className="logo-text">SWIFDROP</h1>
      </div>
      <div className="sidebar-content">
        <ul className="nav">
          <li className={`nav-item ${location.pathname === '/MainDashboard' ? 'active' : ''}`}>
            <Link to="/MainDashboard" className="nav-link">
              <RxDashboard className='nav-icon'/>
              <span>Dashboard</span>
            </Link>
          </li>
          <li className={`nav-item ${location.pathname === '/profile' ? 'active' : ''}`}>
            <Link to="/profile" className="nav-link">
              <RiProfileFill className='nav-icon'/>
              <span>Profile</span>
            </Link>
          </li>
          <li className={`nav-item ${location.pathname === '/User' ? 'active' : ''}`}>
            <div className="nav-link-wrapper" onClick={() => toggleDropdown('user')}>
              <CgProfile className='nav-icon'/>
              <span className="nav-link" style={{marginLeft:'10px'}}>User</span>
              {dropdowns.user ? <MdOutlineArrowDropUp className="nav-arrow" size={20} /> : <MdArrowDropDown className="nav-arrow" size={20} />}
            </div>
            {dropdowns.user && (
  <ul className="dropdown-menu">
    <li className="dropdown-item" onClick={() => setDropdowns({ ...dropdowns, user: false })}><Link to="/User/Profile">Profile</Link></li>
    <li className="dropdown-item" onClick={() => setDropdowns({ ...dropdowns, user: false })}><Link to="/User/Settings">Settings</Link></li>
  </ul>
)}
          </li>
          <li className={`nav-item ${location.pathname === '/Food' ? 'active' : ''}`}>
            <div className="nav-link-wrapper" onClick={() => toggleDropdown('food')}>
              <GiFoodTruck className='nav-icon'/>
              <span className="nav-link" style={{marginLeft:'10px'}}>Food Sellers</span>
              {dropdowns.food ? <MdOutlineArrowDropUp className="nav-arrow" size={20} /> : <MdArrowDropDown className="nav-arrow" size={20} />}
            </div>
            {dropdowns.food && (
              <ul className="dropdown-menu">
              <li className="dropdown-item" onClick={() => setDropdowns({ ...dropdowns, food: false })}><Link to="/User/Profile">Profile</Link></li>
              <li className="dropdown-item" onClick={() => setDropdowns({ ...dropdowns, food: false })}><Link to="/User/Settings">Settings</Link></li>
            </ul>
            )}
          </li>
          <li className={`nav-item ${location.pathname === '/Driver' ? 'active' : ''}`}>
            <div className="nav-link-wrapper" onClick={() => toggleDropdown('driver')}>
              <FaMotorcycle className='nav-icon'/>
              <span className="nav-link" style={{marginLeft:'10px'}}>Drivers</span>
              {dropdowns.driver ? <MdOutlineArrowDropUp className="nav-arrow" size={20} /> : <MdArrowDropDown className="nav-arrow" size={20} />}
            </div>
            {dropdowns.driver && (
              <ul className="dropdown-menu">
              <li className="dropdown-item" onClick={() => setDropdowns({ ...dropdowns, driver: false })}><Link to="/User/Profile">Profile</Link></li>
              <li className="dropdown-item" onClick={() => setDropdowns({ ...dropdowns, driver: false })}><Link to="/User/Settings">Settings</Link></li>
            </ul>
            )}
          </li>
          <li className={`nav-item ${location.pathname === '/Order' ? 'active' : ''}`}>
            <Link to="/Order" className="nav-link">
              <MdWorkHistory className='nav-icon'/>
              <span>Order History</span>
            </Link>
          </li>
          <li className={`nav-item ${location.pathname === '/Faq' ? 'active' : ''}`}>
            <Link to="/Faq" className="nav-link">
              <FaQuestionCircle className='nav-icon'/>
              <span>Faq</span>
            </Link>
          </li>
          <li className={`nav-item ${location.pathname === '/Admin' ? 'active' : ''}`}>
            <Link to="/Admin" className="nav-link">
              <IoSettingsSharp className='nav-icon'/>
              <span>General Settings</span>
            </Link>
          </li>
        </ul>
      </div>
      <div className="border-lineSide"></div>
      <div className='footer'>
      <FaFacebookF size={18}/>
      <FaTwitter size={18}/>
      <FaGoogle size={18}/>
      </div>
      <p className='word'>SWIFDROP @ ALL RIGHT RESERVED</p>
    </div>
  );
};

export default Sidebar;
