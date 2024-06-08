import React from 'react';
import { IoMdCloseCircle } from "react-icons/io";

export default function Password() {
  return (
    <>
      <div className="w-full max-w-4xl mx-auto">
        <div className='border-none bg-white shadow-md mb-8 p-6' style={{marginTop:'30px'}}>
          <div className="mb-4">
            <p className="font-roboto font-bold text-lg leading-6 text-black">Change Password</p>
          </div>
          <hr className="mb-4 border-black" />
          <div className="mb-4">
            <label className='font-roboto font-sm-bold text-small leading-6 text-black'>Add Password</label>
          </div>
          <div className='flex items-center mb-4'>
            <input
              id="password"
              type="password"
              className="w-[70%] h-12 border-gray-100 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm mr-4"
              placeholder="Enter your new password"
            />
            <button className="w-[219px] h-[45px] bg-blue-900 text-white font-roboto font-normal text-base leading-[17.58px] rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
              Strong Password Generation
            </button>
          </div>
          <button className="w-[219px] h-[45px] bg-[#4DB6AC] text-white font-roboto font-normal text-base leading-[17.58px] rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
            SAVE PASSWORD
          </button>
        </div>

        <div className='border-none bg-white shadow-md mb-8 p-6'  style={{marginTop:'30%'}}>
          <div className="mb-4">
            <p className="font-roboto font-bold text-lg leading-6 text-black">Admin Review Status</p>
          </div>
          <hr className="mb-4 border-black" />
          <div className="mb-4">
            <label className='font-roboto font-sm-bold text-small leading-6 text-black'>Review Status</label>
          </div>
          <div className='flex items-center mb-4'>
          <select
              id="options"
              className="w-[70%] h-12 border-gray-100 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm mr-4"
              defaultValue=""
            >
              <option value="" disabled>Pending</option>
              <option value="option1">Password Option 1</option>
              <option value="option2">Password Option 2</option>
              <option value="option3">Password Option 3</option>
            </select>
            <button className="w-[219px] h-[45px] bg-green-700 text-white font-roboto font-normal text-base leading-[17.58px] rounded-md shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
}