import React from 'react';
import { Link } from 'react-router-dom';
import '../../style/user.css';
import { HiDotsHorizontal } from "react-icons/hi";
import { FaUserTie } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { HiMenu } from 'react-icons/hi';
import { IoMdCloseCircle } from "react-icons/io";

export default function sideMenu() {
  return (
    <>
      <div className="bg-white shadow-md rounded-lg mb-4 p-4 w-[30%] h-[40%] mt-[30px]">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <img src="https://bit.ly/dan-abramov" alt="Profile Logo"   className="w-12 h-15 top-48 left-11"/>
            <div className="ml-4 text-sm">
              <span className="font-bold">Chicken Ban</span> <br /> <span>Restaurant</span>
            </div>
          </div>
          <div className="cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path fillRule="evenodd" clipRule="evenodd" d="M4.5 10.5C3.675 10.5 3 11.175 3 12C3 12.825 3.675 13.5 4.5 13.5C5.325 13.5 6 12.825 6 12C6 11.175 5.325 10.5 4.5 10.5ZM19.5 10.5C18.675 10.5 18 11.175 18 12C18 12.825 18.675 13.5 19.5 13.5C20.325 13.5 21 12.825 21 12C21 11.175 20.325 10.5 19.5 10.5ZM10.5 12C10.5 11.175 11.175 10.5 12 10.5C12.825 10.5 13.5 11.175 13.5 12C13.5 12.825 12.825 13.5 12 13.5C11.175 13.5 10.5 12.825 10.5 12Z" fill="black" />
            </svg>
          </div>
        </div>
        <hr className="mb-4 border-black" />
        <div className="p-0 m-0">
          <ul className="flex flex-col m-0 p-0">
            <li className="my-2">
              <Link to={`personal`} className="flex items-center p-2 rounded hover:bg-blue-200">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="15" viewBox="0 0 14 15" fill="none">
                  <path fillRule="evenodd" clipRule="evenodd" d="M7.00004 8.08333C5.74961 8.08333 4.59417 7.41623 3.96895 6.33333C3.34374 5.25042 3.34374 3.91623 3.96895 2.83333C4.59417 1.75042 5.74961 1.08333 7.00004 1.08333C8.93304 1.08333 10.5 2.65033 10.5 4.58333C10.5 6.51632 8.93304 8.08333 7.00004 8.08333ZM11.6667 13.3333H10.5V12.1667C10.5 11.2002 9.71654 10.4167 8.75004 10.4167H5.25004C4.28354 10.4167 3.50004 11.2002 3.50004 12.1667V13.3333H2.33337V12.1667C2.33337 10.5558 3.63921 9.25 5.25004 9.25H8.75004C10.3609 9.25 11.6667 10.5558 11.6667 12.1667V13.3333ZM9.33337 4.58333C9.33337 5.87199 8.2887 6.91666 7.00004 6.91666C5.71138 6.91666 4.66671 5.87199 4.66671 4.58333C4.66671 3.29466 5.71138 2.24999 7.00004 2.24999C8.2887 2.24999 9.33337 3.29466 9.33337 4.58333Z" fill="black" />
                </svg>
                <span className="pl-2">Personal Information</span>
              </Link>
            </li>
            <li className="my-2">
              <Link to="password" className="flex items-center p-2 rounded hover:bg-blue-200">
          <RiLockPasswordFill />
                <span className="pl-2">Change Password</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
  
    </>
  );
}