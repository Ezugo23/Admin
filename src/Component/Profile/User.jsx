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
            <h5>Upload Image</h5>
            <div className='w-[343px] h-[364px] border-[0.1px] border-black relative flex flex-col items-center justify-center'>
              <IoMdCloseCircle className='absolute top-1 right-2 cursor-pointer' />
              <img src="https://bit.ly/dan-abramov" alt="" className='image2' />
              <button className='pro-btn mt-2'>Change Photo</button>
            </div>
            
          </div>
        </div>
      </>
    );
  }