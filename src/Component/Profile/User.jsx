import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Image,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Forgot from './Forgot';
import Modal from './Modal'
import { useNavigate } from 'react-router-dom';

export default function User() {
  const [showModal, setShowModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [adminData, setAdminData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdminData = async () => {
      const adminId = localStorage.getItem('adminId');
      if (!adminId) {
        navigate('/Login');
        return;
      }
  
      try {
        const response = await axios.get(`https://swifdropp.onrender.com/api/v1/admin/${adminId}`);
        setAdminData(response.data.admin);
      } catch (error) {
        console.error('Error fetching admin data:', error);
        console.log('Error response data:', error.response.data); // Log detailed error response
        setShowErrorModal(true); // Optionally show an error modal
      }
    };
  
    fetchAdminData();
  }, [navigate]);
  if (!adminData) {
    return <div>Loading...</div>; // Optional: show loading indicator while fetching data
  }


  const handleClickSettings = () => {
    setShowForgotModal(true); // Set showForgotModal state to true when Settings link is clicked
  };

  const handleCloseForgotModal = () => {
    setShowForgotModal(false); // Set showForgotModal state to false to close the modal
  };

  const handleCloseModal = () => {
    setShowModal(false); // Set showModal state to false to close the modal
  };

  return (
    <>
      <h2
        className="text-base font-semibold leading-7 text-gray-900"
        style={{
          fontFamily: 'Inter',
          fontWeight: '700',
          fontSize: '36px',
          lineHeight: '48px',
          letterSpacing: '-2.2%',
          marginTop: '20px',
          marginLeft: '70px',
        }}
      >
        Personal Information
      </h2>
      {showModal && (
        <Modal onClose={handleCloseModal} showModal={showModal} success />
      )}
      {showErrorModal && (
        <Modal
          onClose={() => setShowErrorModal(false)}
          showModal={showErrorModal}
        />
      )}
      {showForgotModal && <Forgot onClose={handleCloseForgotModal} />}
      <div className="flex justify-center">
        <form className="w-400">
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <Box position="relative" width="100px" height="100px" margin="auto">
                <FormControl style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Image src="" alt="profile Image" width="100%" height="100%" />
                  <Image src="/edit.png" alt="Edit" bg="#4CAF50" position="absolute" bottom="1px" right="5px" cursor="pointer" w="30px" borderRadius="20px" />
                </FormControl>
              </Box>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                    First name
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="first-name"
                      id="first-name"
                      autoComplete="given-name"
                      className="block w-full rounded-md border-0 py-1.5 px-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      value={adminData ? adminData.firstname : ''}
                      readOnly
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                    Last Name
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="last-name"
                      id="last-name"
                      autoComplete="family-name"
                      className="block w-full rounded-md border-0 py-1.5 px-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      value={adminData ? adminData.lastname : ''}
                      readOnly
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="phone-number" className="block text-sm font-medium leading-6 text-gray-900">
                    Phone Number
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="phone-number"
                      id="phone-number"
                      autoComplete="tel"
                      className="block w-full rounded-md border-0 py-1.5 px-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      value={adminData ? adminData.phoneNumber : ''}
                      readOnly
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                    Email
                  </label>
                  <div className="mt-2">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      autoComplete="email"
                      className="block w-full rounded-md border-0 py-1.5 px-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      value={adminData ? adminData.email : ''}
                      readOnly
                    />
                  </div>
                </div>
                  
                    <div className="sm:col-span-3">
                  <label htmlFor="userType" className="block text-sm font-medium leading-6 text-gray-900">
                    Address
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="userType"
                      id="userType"
                      autoComplete="off"
                      className="block w-full rounded-md border-0 py-1.5 px-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      value={adminData ? adminData.address : ''}
                      readOnly
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="userType" className="block text-sm font-medium leading-6 text-gray-900">
                    User Type
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="userType"
                      id="userType"
                      autoComplete="off"
                      className="block w-full rounded-md border-0 py-1.5 px-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      value={adminData ? adminData.userType : ''}
                      readOnly
                    />
                  </div>
                </div>


                <Link
                  className="font-inter font-normal text-base text-green-600 underline"
                  onClick={handleClickSettings}
                >
                  <p>Change Password?</p>
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-center items-center gap-x-6">
            <button
              type="submit"
              className="rounded-md w-40 mb-4 h-12 bg-green-600 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus:outline-none focus:ring focus:ring-indigo-600"
              style={{
                top: '10px',
                borderRadius: '40px',
                background: '#4CAF50',
                fontFamily: 'Inter',
                fontWeight: '700',
                fontSize: '20px',
                lineHeight: '24px',
                textAlign: 'center',
              }}
            >
              Edit Profile
            </button>
          </div>
        </form>
      </div>
    </>
  );
}