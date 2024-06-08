import React from 'react';
import '../../style/user.css';
import { IoMdCloseCircle } from "react-icons/io";

export default function User() {
  return (
    <>
      <div className="w-full max-w-4xl mx-auto">
        <div className='border-none bg-white shadow-md mb-8 p-6' style={{ marginTop: '30px' }}>
          <p className="font-roboto font-bold text-lg leading-6 text-black">Add/Edit Personal Information</p>
          <hr className="mb-4 border-black" />
          <p className="font-medium text-gray-700 mb-2">Add Photo</p>
          <div className="flex flex-wrap justify-center">
            <div className='w-[300px] h-[310px] border-[0.1px] border-black relative flex flex-col items-center justify-center' style={{marginLeft:'-70px'}}>
              <div className="relative">
                <img src="https://bit.ly/dan-abramov" alt="" className='image2' />
                <IoMdCloseCircle className='absolute top-1 right-1 text-red cursor-pointer' style={{ color: 'red' }} />
              </div>
              <button className='pro-btn mt-2'>Change Photo</button>
            </div>
            <div className="flex flex-col justify-center" style={{marginLeft: '40px'}}>
              <div className="flex mb-4">
                <div className="col-span-1 mr-2">
                  <label htmlFor="firstName" className="block mb-2">Full Name</label>
                  <input
                    id="fullName"
                    type="text"
                    className="input border border-gray-300 p-2 rounded w-full"
                    name="firstName"
                    placeholder="Enter Full Name"
                    style={{ width: '120%' }}
                  />
                </div>
                <div className="col-span-1" style={{marginLeft:'60px'}}>
                  <label htmlFor="lastName" className="block mb-2">City</label>
                  <input
                    id="city"
                    type="text"
                    className="input border border-gray-300 p-2 rounded w-full"
                    name="lastName"
                    placeholder="Enter City"
                    style={{ width: '120%' }}
                  />
                </div>
              </div>
              <div className="flex mb-4" style={{justifyContent:'space-between'}}>
                <div className="col-span-1" >
                  <label htmlFor="phone" className="block mb-2">Phone</label>
                  <input
                    id="phone"
                    type="text"
                    className="input border border-gray-300 p-2 rounded w-full"
                    name="phone"
                    placeholder="Enter Phone"
                    style={{ width: '120%' }}
                  />
                </div>
                <div className="col-span-1 mr-2" style={{marginLeft:'60px'}}>
                  <label htmlFor="email" className="block mb-2">Email</label>
                  <input
                    id="email"
                    type="text"
                    className="input border border-gray-300 p-2 rounded w-full"
                    name="email"
                    placeholder="Enter Email"
                    style={{ width: '120%' }}
                  />
                </div>
              </div>
              <div className="flex mb-4">
                <div className="col-span-1 mr-2">
                  <label htmlFor="address" className="block mb-2">State</label>
                  <input
                    id="address"
                    type="text"
                    className="input border border-gray-300 p-2 rounded w-full"
                    name="address"
                    placeholder="Entr State"
                    style={{ width: '120%' }}
                  />
                </div>
                <div className="col-span-1" style={{marginLeft:'60px'}}>
                  <label htmlFor="city" className="block mb-2">City</label>
                  <input
                    id="city"
                    type="text"
                    className="input border border-gray-300 p-2 rounded w-full"
                    name="city"
                    placeholder="Enter City"
                    style={{ width: '120%' }}
                  />
                </div>
              </div>
              <div className="flex mb-4">
                <div className="col-span-1 mr-2">
                  <label htmlFor="address" className="block mb-2">Address</label>
                  <input
                    id="address"
                    type="text"
                    className="input border border-gray-300 p-2 rounded w-full"
                    name="address"
                    placeholder="Enter Address"
                    style={{ width: '120%' }}
                  />
                </div>
                <div className="col-span-1" style={{marginLeft:'60px'}}>
                  <label htmlFor="city" className="block mb-2">City</label>
                  <input
                    id="city"
                    type="text"
                    className="input border border-gray-300 p-2 rounded w-full"
                    name="city"
                    placeholder="Enter City"
                    style={{ width: '120%' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}