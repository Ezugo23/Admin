import React from 'react';
import '../../style/user.css';
import { IoMdCloseCircle } from "react-icons/io";

export default function User() {
  return (
    <>
      <div className="w-full max-w-4xl mx-auto">
        <div className='border-none bg-white shadow-md mb-8 p-6' style={{ marginTop: '10px' }}>
          <p className="font-roboto font-bold text-lg leading-6 text-black">Add/Edit Personal Information</p>
          <hr className="mb-4 border-black" />
          <div className="flex flex-wrap justify-center">
            <div className='w-[300px] h-[310px] border-[0.1px] border-black relative flex flex-col items-center justify-center' style={{marginLeft:'-70px'}}>
              <div className="relative">
                <img src="https://bit.ly/dan-abramov" alt="" className='image2' />
                <IoMdCloseCircle className='absolute top-1 right-1 text-red cursor-pointer' style={{ color: 'red' }} />
              </div>
              <button className='pro-btn mt-2'>Change Photo</button>
            </div>
            <div className="col-span-1 flex flex-wrap justify-center">
              <div className="col-span-1 mr-2" style={{marginLeft:'40px'}}>
                <label htmlFor="firstName" className="block mb-2">First Name</label>
                <input
                  id="firstName"
                  type="text"
                  className="input border border-gray-300 p-2 rounded w-full"
                  name="firstName"
                  placeholder="Enter First Name"
                  style={{ width: '120%' }}
                />
              </div>
              <div className="col-span-1" style={{marginLeft:'60px'}}>
                <label htmlFor="lastName" className="block mb-2">Last Name</label>
                <input
                  id="lastName"
                  type="text"
                  className="input border border-gray-300 p-2 rounded w-full"
                  name="lastName"
                  placeholder="Enter Last Name"
                  style={{ width: '120%' }}
                />
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
}