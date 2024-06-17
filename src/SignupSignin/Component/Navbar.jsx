import React from 'react'
import { FaSearch } from "react-icons/fa";
import '../style/Navbar.css'
// import Logo from "../assets/Logo.svg"
// import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';


const Navbar = () => {
  return (
    <div className='position-relative'>
      <div className='container d-flex py-3 align-items-center justify-content-between'>
     {/* <img src={Logo} alt="" /> */}
    <div className='d-flex gap-5 align-items-center'>
    
    <ul className='d-flex gap-3 list-unstyled'>
      <Link to='/' className="text-decoration-none text-success">
        <li>Home</li>
      </Link>
      <Link to='/Register' className="text-decoration-none text-success">
        <li>Service</li>
      </Link>
      <Link to='/' className="text-decoration-none text-success">
        <li>About</li>
      </Link>
      <Link to='/' className="text-decoration-none text-success">
        <li>Features</li>
      </Link>
    </ul>
    <input type="text" className='input'/>
    <FaSearch className='search-icon text-success'/>
    
    </div>
    
    </div>
    </div>
  )
}

export default Navbar;