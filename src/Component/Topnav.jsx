import '../Component/Styles/Topnav.css';
import { CiSearch } from "react-icons/ci";
import { FaBell } from "react-icons/fa";
import Avatar from '../Asset/pngtree-man-avatar-image-for-profile-png-image_13001882.png'
import Breadcrumb from './BreadCrumb'

export default function Topnav() {
  return (
    <>
      <div className="topnav-container">
        <div className="breadcrumb-container">
          <Breadcrumb />
        </div>
        <div className="search-bar">
          <input
            className="search-input"
            type="text"
            placeholder="Search"
          />
          <CiSearch size={20} className="search-icon" />
        </div>
        <FaBell className="bell-icon" />
        <img src={Avatar} alt='' className='profile-image'/>
      </div>
      <div className="border-line"></div>
    </>
  );
}