import {
  Box,
  FormControl,
  Input,
  Image,
} from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Forgot from './Forgot';
import Modal from './Modal';
import { useNavigate } from 'react-router-dom';

export default function User() {
  const [showModal, setShowModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [adminData, setAdminData] = useState(null);
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    phoneNumber: '',
    email: '',
    address: '',
    userType: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdminData = async () => {
      const adminId = localStorage.getItem('adminId');
      if (!adminId) {
        navigate('/Login');
        return;
      }

      try {
        const response = await axios.get(`https://delivery-chimelu-new.onrender.com/api/v1/admin/${adminId}`);
        setAdminData(response.data.admin);
        setFormData({
          firstname: response.data.admin.firstname,
          lastname: response.data.admin.lastname,
          phoneNumber: response.data.admin.phoneNumber,
          email: response.data.admin.email,
          address: response.data.admin.address,
          roles: response.data.admin.roles,
        });
        setImagePreviewUrl(response.data.admin.image);
      } catch (error) {
        console.error('Error fetching admin data:', error);
        setShowErrorModal(true);
      }
    };

    fetchAdminData();
  }, [navigate]);

  if (!adminData) {
    return <div>Loading...</div>;
  }

  const handleClickSettings = () => {
    setShowForgotModal(true);
  };

  const handleCloseForgotModal = () => {
    setShowForgotModal(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleEditProfile = async (e) => {
    e.preventDefault();
    const adminId = localStorage.getItem('adminId');
    const url = `https://delivery-chimelu-new.onrender.com/api/v1/admin/${adminId}`;
  
    const data = new FormData();
    for (const key in formData) {
      if (key !== 'roles') { // Exclude roles
        data.append(key, formData[key]);
      }
    }
    if (imageFile) {
      data.append('image', imageFile);
    }
  
    try {
      await axios.patch(url, data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setShowModal(true);
    } catch (error) {
      console.error('Error updating admin data:', error);
      setShowErrorModal(true);
    }
  };
  
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      const file = files[0];
      setImageFile(file);
      setImagePreviewUrl(URL.createObjectURL(file));
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  }

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
        <form className="w-400" onSubmit={handleEditProfile}>
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <Box position="relative" width="150px" height="150px" margin="auto">
                <FormControl style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Box
                    width="150px"
                    height="150px"
                    borderRadius="50%"
                    overflow="hidden"
                    position="relative"
                    border="3px solid #4CAF50"
                  >
                    <Image
                      src={imagePreviewUrl || '/placeholder-image.png'}
                      alt="profile Image"
                      width="100%"
                      height="100%"
                      objectFit="cover"
                    />
                    <label htmlFor="profileImage" style={{ cursor: 'pointer', position: 'absolute', bottom: '5px', right: '5px' }}>
                      <Image src="/edit.png" alt="Edit" bg="#4CAF50" w="30px" borderRadius="50%" />
                    </label>
                  </Box>
                  <Input type="file" id="profileImage" name="image" onChange={handleChange} style={{ display: 'none' }} />
                </FormControl>
              </Box>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label htmlFor="firstname" className="block text-sm font-medium leading-6 text-gray-900">
                    First name
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="firstname"
                      id="firstname"
                      autoComplete="given-name"
                      className="block w-full rounded-md border-0 py-1.5 px-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      value={formData.firstname}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="lastname" className="block text-sm font-medium leading-6 text-gray-900">
                    Last Name
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="lastname"
                      id="lastname"
                      autoComplete="family-name"
                      className="block w-full rounded-md border-0 py-1.5 px-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      value={formData.lastname}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="phoneNumber" className="block text-sm font-medium leading-6 text-gray-900">
                    Phone Number
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="phoneNumber"
                      id="phoneNumber"
                      autoComplete="tel"
                      className="block w-full rounded-md border-0 py-1.5 px-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      value={formData.phoneNumber}
                      onChange={handleChange}
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
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                
                <div className="sm:col-span-3">
                  <label htmlFor="address" className="block text-sm font-medium leading-6 text-gray-900">
                    Address
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="address"
                      id="address"
                      autoComplete="off"
                      className="block w-full rounded-md border-0 py-1.5 px-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      value={formData.address}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
  <label htmlFor="roles" className="block text-sm font-medium leading-6 text-gray-900">
    Admin Role
  </label>
  <div className="mt-2">
    <input
      type="text"
      name="roles"
      id="roles"
      autoComplete="off"
      className="block w-full rounded-md border-0 py-1.5 px-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      value={formData.roles}
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
