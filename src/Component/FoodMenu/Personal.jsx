import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../../style/user.css';

export default function Personal() {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    phoneNumber: '',
    email: '',
    image: '',
    logo: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://swifdropp.onrender.com/api/v1/restaurant/byId/${id}`);
        const fetchedRestaurant = response.data.restaurant;
        setRestaurant(fetchedRestaurant);
        setFormData({
          firstname: fetchedRestaurant.firstname,
          lastname: fetchedRestaurant.lastname,
          phoneNumber: fetchedRestaurant.phoneNumber,
          email: fetchedRestaurant.email,
          image: fetchedRestaurant.image,
          logo: fetchedRestaurant.logo
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(`https://swifdropp.onrender.com/api/v1/restaurant/${id}`, formData);
      setRestaurant(response.data.restaurant);
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    try {
      const response = await axios.patch(`https://swifdropp.onrender.com/api/v1/restaurant/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setRestaurant(response.data.restaurant);
      setFormData((prevData) => ({ ...prevData, image: response.data.restaurant.image }));
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const handleLogoUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('logo', file);
    try {
      const response = await axios.patch(`https://swifdropp.onrender.com/api/v1/restaurant/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setRestaurant(response.data.restaurant);
      setFormData((prevData) => ({ ...prevData, logo: response.data.restaurant.logo }));
    } catch (error) {
      console.error('Error uploading logo:', error);
    }
  };

  if (!restaurant) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center" style={{ marginTop: '2%', marginLeft: '20px' }}>
      <div className="w-[100%] max-w-4xl">
        <form onSubmit={handleSubmit}>
          <div className="border-none bg-white shadow-md">
            <div className="bg-white p-4 border-b border-gray-200">Restaurant Information</div>
            <div className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="flex flex-col items-start">
                  <label htmlFor="uploadImage" className="font-medium text-gray-700 mb-2">
                    Upload Image
                  </label>
                  <div className="my-10 p-10 flex flex-col items-center" style={{ marginTop: '-30px' }}>
                    <img src={restaurant.image} className="w-50 h-40 mb-4" alt="Upload" />
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" id="uploadImageInput" />
                    <button
                      type="button"
                      className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
                      onClick={() => document.getElementById('uploadImageInput').click()}
                    >
                      Change Photo
                    </button>
                  </div>
                  <div className="flex flex-col items-center" style={{ marginTop: '-40px' }}>
                    <img src={restaurant.logo} className="w-[272px] h-[114px] mb-4" alt="Upload" />
                    <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" id="uploadLogoInput" />
                    <button
                      type="button"
                      className="bg-red-500 text-white font-bold py-2 px-4 rounded"
                      onClick={() => document.getElementById('uploadLogoInput').click()}
                    >
                      Change Logo
                    </button>
                  </div>
                </div>
                <div className="col-span-1 md:col-span-1" style={{ marginTop: '-2px' }}>
                  <div className="grid grid-cols-1">
                    <div className="col-span-1">
                      <label htmlFor="firstname" className="block mb-2">First Name</label>
                      <input
                        id="firstname"
                        type="text"
                        className="input border border-gray-300 p-2 rounded"
                        name="firstname"
                        placeholder="Enter First Name"
                        value={formData.firstname}
                        onChange={handleChange}
                        style={{ width: '80%' }}
                      />
                    </div>
                    <div className="col-span-1" style={{ marginTop: '20px' }}>
                      <label htmlFor="lastname" className="block mb-2">Last Name</label>
                      <input
                        id="lastname"
                        type="text"
                        className="input border border-gray-300 p-2 rounded w-full"
                        name="lastname"
                        placeholder="Enter Last Name"
                        value={formData.lastname}
                        onChange={handleChange}
                        style={{ width: '80%' }}
                      />
                    </div>
                    <div className="col-span-1" style={{ marginTop: '20px' }}>
                      <label htmlFor="phonenumber" className="block mb-2">Phone Number</label>
                      <input
                        id="phonenumber"
                        type="number"
                        className="input border border-gray-300 p-2 rounded w-full"
                        name="phoneNumber"
                        placeholder="Enter Phone Number"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        style={{ width: '80%' }}
                      />
                    </div>
                    <div className="col-span-1" style={{ marginTop: '20px' }}>
                      <label htmlFor="email" className="block mb-2">Email</label>
                      <input
                        id="email"
                        type="text"
                        className="input border border-gray-300 p-2 rounded w-full"
                        name="email"
                        placeholder="Enter Email Address"
                        value={formData.email}
                        onChange={handleChange}
                        style={{ width: '80%' }}
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="text-white py-2 px-20 rounded"
                    style={{ marginTop: '20px', backgroundColor: '#4DB6AC', display: 'flex', marginRight: '220px' }}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}