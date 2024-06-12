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
import { useNavigate } from 'react-router-dom';
export default function Settings() {
  const [showModal, setShowModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [userData, setUserData] = useState(null);
  const [restaurantId, setRestaurantId] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    const storedRestaurantId = localStorage.getItem('userId');
    if (storedRestaurantId) {
      setRestaurantId(storedRestaurantId);
    }
    // Fetch user data from the API
    axios
      .get(
        `https://swifdropp.onrender.com/api/v1/restaurant/byId/${storedRestaurantId}`
      )
      .then((response) => {
        setUserData(response.data.restaurant);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  const handleClickSettings = () => {
    setShowForgotModal(true); // Set showModal state to true when Settings link is clicked
  };

  const handleCloseForgotModal = () => {
    setShowForgotModal(false); // Set showModal state to false to close the modal
  };

  const handleCloseModal = () => {
    setShowModal(false); // Set showModal state to false to close the modal
  };

  const handleFormSubmit = (event) => {
    const storedRestaurantId = localStorage.getItem('userId');
    if (storedRestaurantId) {
      setRestaurantId(storedRestaurantId);
    }
    event.preventDefault();
    axios
      .patch(
        `https://swifdropp.onrender.com/api/v1/restaurant/${storedRestaurantId}`,
        userData
      )
      .then((response) => {
        console.log('Restaurant details updated successfully:', response.data);
        setShowModal(true); // Show modal on successful form submission
        setSaveSuccess(true); // Set save success to true
        setTimeout(() => {
          setSaveSuccess(false); // Reset save success after 3 seconds
        }, 3000);
      })
      .catch((error) => {
        console.error('Error updating restaurant details:', error);
        setShowErrorModal(true); // Show error modal on form submission error
      });
  };

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      // If token doesn't exist, redirect to the sign-in page
      navigate('/signin');
    }
  }, [navigate]);

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
        <form className="w-400" onSubmit={handleFormSubmit}>
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <Box
                position="relative"
                width="100px"
                height="100px"
                margin="auto"
              >
                <FormControl
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Image
                    src={userData?.logo || ""}
                    alt="Restaurant Logo"
                    width="100%"
                    height="100%"
                    // borderRadius="100%"
                  />

                  <Image
                    src="/edit.png"
                    alt="Edit"
                    bg="#4CAF50"
                    position="absolute"
                    bottom="1px"
                    right="5px"
                    cursor="pointer"
                    w="30px"
                    borderRadius="20px"
                  />

                  {/* File input */}
                  <input
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                  />
                </FormControl>
              </Box>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                    style={{
                      fontSize: '16px',
                      lineHeight: '24px',
                      fontWeight: '500',
                    }}
                  >
                    First name
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="first-name"
                      id="first-name"
                      autoComplete="given-name"
                      value={userData?.firstname || ''}
                      onChange={(e) =>
                        setUserData({ ...userData, firstname: e.target.value })
                      }
                      className="block w-full rounded-md border-0 py-1.5 px-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                    style={{
                      fontSize: '16px',
                      lineHeight: '24px',
                      fontWeight: '500',
                    }}
                  >
                    Resturant's Name
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="first-name"
                      id="first-name"
                      autoComplete="given-name"
                      value={userData?.restaurantName || ''}
                      onChange={(e) =>
                        setUserData({
                          ...userData,
                          restaurantName: e.target.value,
                        })
                      }
                      className="block w-full rounded-md border-0 py-1.5 px-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                    style={{
                      fontSize: '16px',
                      lineHeight: '24px',
                      fontWeight: '500',
                    }}
                  >
                    Phone Number
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="first-name"
                      id="first-name"
                      autoComplete="given-name"
                      value={userData?.phoneNumber || ''}
                      onChange={(e) =>
                        setUserData({
                          ...userData,
                          phoneNumber: e.target.value,
                        })
                      }
                      className="block w-full rounded-md border-0 py-1.5 px-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="cac-registration"
                    className="block text-sm font-medium leading-6 text-gray-900"
                    style={{
                      fontSize: '16px',
                      lineHeight: '24px',
                      fontWeight: '500',
                    }}
                  >
                    CAC Registration
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="cac-registration"
                      id="cac-registration"
                      autoComplete="off" // Disable autocomplete to prevent browser autofill from overriding the masked value
                      value={
                        userData?.businessLicense
                          ? `************${userData.businessLicense.slice(-2)}`
                          : ''
                      }
                      readOnly // Make the input field non-editable
                      className="block w-full rounded-md border-0 py-1.5 px-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                    style={{
                      fontSize: '16px',
                      lineHeight: '24px',
                      fontWeight: '500',
                    }}
                  >
                    Last name
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="last-name"
                      id="last-name"
                      autoComplete="family-name"
                      value={userData?.lastname || ''}
                      onChange={(e) =>
                        setUserData({ ...userData, lastname: e.target.value })
                      }
                      className="block w-full rounded-md border-0 py-1.5 px-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                    style={{
                      fontSize: '16px',
                      lineHeight: '24px',
                      fontWeight: '500',
                    }}
                  >
                    Email
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="last-name"
                      id="last-name"
                      autoComplete="family-name"
                      defaultValue={userData?.email}
                      className="block w-full rounded-md border-0 py-1.5 px-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                    style={{
                      fontSize: '16px',
                      lineHeight: '24px',
                      fontWeight: '500',
                    }}
                  >
                    Enter Location
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="last-name"
                      id="last-name"
                      autoComplete="off"
                      defaultValue={userData?.address}
                      readOnly
                      className="block w-full rounded-md border-0 py-1.5 px-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <FormControl>
                    <FormLabel>Restaurant image</FormLabel>
                    <InputGroup>
                      <Input
                        readOnly
                        _focus={{ borderColor: '#4CAF50' }}
                        placeholder="Upload Image"
                        border={'2px solid lightgrey'}
                        focusBorderColor="transparent"
                        name="file"
                        py="1.1rem"
                        px="1rem"
                        w="100%"
                        sx={{
                          '::placeholder': {
                            fontSize: '1rem',
                            textAlign: 'center',
                            fontWeight: '700',
                            color: '#4CAF50',
                          },
                        }}
                      />
                      <InputLeftElement
                        pointerEvents="none"
                        top="0.154rem"
                        fontSize="20px"
                        marginLeft="0.2rem"
                        h="2.9rem"
                        bg="white"
                        // children={<Icon as={BiCloudUpload} color="#4CAF50" />}
                        children={<Image src="/cloud.png" alt="cloud" w={7} />}
                      />
                    </InputGroup>
                    <input
                      type="file"
                      accept="image/*"
                      style={{ display: 'none' }}
                    />
                  </FormControl>
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
                top: '884px',
                left: '760px',
                fontFamily: 'Inter',
                fontWeight: '600',
                fontSize: '20px',
                lineHeight: '28px',
                letterSpacing: '-0.2px',
                textAlign: 'center',
              }}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
