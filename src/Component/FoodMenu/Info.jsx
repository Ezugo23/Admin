import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FaStar } from "react-icons/fa";

export default function RestaurantDetails() {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const response = await axios.get(`https://delivery-chimelu-new.onrender.com/api/v1/restaurant/byId/${id}`);
        setRestaurant(response.data.restaurant);
      } catch (error) {
        if (error.response) {
          console.error('Response error:', error.response.data);
        } else if (error.request) {
          console.error('Request error:', error.request);
        } else {
          console.error('Error', error.message);
        }
        console.error('Error config:', error.config);
      } finally {
        setLoading(false);
      }
    };
  
    fetchRestaurant();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!restaurant) {
    return <div>Restaurant not found</div>;
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className='border-none bg-white shadow-md mb-8 p-6' style={{marginTop:'30px'}}>
        <div className="mb-4">
          <p className="font-roboto font-bold text-lg leading-6 text-black">Restaurant’s Information</p>
        </div>
        <hr className="mb-4 border-black" />
        <div className="mb-4">
          <label className='font-roboto text-black' style={{fontSize:"12px", fontWeight:'300', lineHeight:'14.08px'}}>Restaurant / Company Name</label>
          <input
            type="text"
            className="w-full h-12 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm pl-12"
            placeholder="Enter Restaurant / Company Name"
            value={restaurant.restaurantName}
            readOnly
          />
        </div>
        <div className="mb-4">
          <label className='font-roboto text-black' style={{fontSize:"12px", fontWeight:'300', lineHeight:'14.08px'}}>E-mail Address</label>
          <input
            type="text"
            className="w-full h-12 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm pl-12"
            placeholder="Enter E-mail"
            value={restaurant.email}
            readOnly
          />
        </div>
        <div className="mb-4">
          <label className='font-roboto text-black' style={{fontSize:"12px", fontWeight:'300', lineHeight:'14.08px'}}>Phone Number</label>
          <input
            type="text"
            className="w-full h-12 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm pl-12"
            placeholder="Enter Phone Number"
            value={restaurant.phoneNumber}
            readOnly
          />
        </div>
        <div className="mb-4">
          <label className='font-roboto text-black' style={{fontSize:"12px", fontWeight:'300', lineHeight:'14.08px'}}>CAC registration No.</label>
          <input
            type="text"
            className="w-full h-12 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm pl-12"
            placeholder="Enter CAC registration No."
            value={restaurant.code}
            readOnly
          />
        </div>
        <div className="mb-4">
          <label className='font-roboto text-black' style={{fontSize:"12px", fontWeight:'300', lineHeight:'14.08px'}}>Location</label>
          <input
            type="text"
            className="w-full h-12 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm pl-12"
            placeholder="Enter Location"
            value={restaurant.address}
            readOnly
          />
        </div>
        <div className="mb-4">
          <label className="font-roboto text-black" style={{ fontSize: "12px", fontWeight: '300', lineHeight: '14.08px' }}>
            Rating
          </label>
          <div className="relative flex items-center mb-4">
            <input
              type="text"
              className="w-full h-12 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm pl-12"
              placeholder="Enter Ratings"
              value={restaurant.averageRating}
              readOnly
            />
            <div className="absolute inset-y-0 left-0 flex items-center justify-center pointer-events-none" style={{ backgroundColor: '#F9F9F9', width: '40px', height: '100%' }}>
              <FaStar className="text-gray-400" />
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <button
            className="w-[219px] h-[45px] bg-[#4DB6AC] text-white font-roboto font-normal text-base leading-[17.58px] rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 cursor-not-allowed"
            disabled
          >
            SAVE
          </button>
        </div>
      </div>
    </div>
  );
}