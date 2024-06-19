import React, { useState } from "react";
import RegisterImage from '../../../Asset/image container.svg';
import star from '../../../Asset/star 1.svg';
import profile from '../../../Asset/BG.svg';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [state, setState] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassWord] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const bodyPassed = {
      firstname,
      lastname,
      email,
      phoneNumber,
      username,
      password,
      address: {
        country,
        zipCode,
        state,
        street,
        city,
      },
    };

    try {
      const data = await fetch(
        "https://swifdropp.onrender.com/api/v1/register-admin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bodyPassed),
        }
      );
      const response = await data.json();
      console.log(response);

      if (response.error) {
        toast.error(response.error);
      }

      if (response.errorDetails) {
        toast.error("All fields are required");
      }

      if (response.message) {
        toast.success(response.message);
        navigate("/Login");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="w-full bg-white shadow-lg rounded-lg p-5 flex flex-col md:flex-row gap-5">
        <div className="bg-green-500 text-white rounded-lg p-5 flex flex-col items-center">
          <img src={RegisterImage} alt="Register" className="bg-white rounded-lg mb-5" />
          <div className="flex space-x-2 mb-5">
            {[...Array(5)].map((_, index) => (
              <img key={index} src={star} alt="Star" />
            ))}
          </div>
          <div className="w-3/4 text-center">
            <p>"We love SwifDrop! We've been getting and managing orders seamlessly. It's definitely a restaurant's dream come true."</p>
            <div className="flex items-center mt-5">
              <img src={profile} alt="Profile" className="mr-3" />
              <div>
                <div>Fiyin Oladejo</div>
                <p className="text-sm">Founder, Tasty Natives</p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 p-5">
          <h1 className="text-3xl text-center mb-5">Become our partner</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-4">
              <div>
                <label htmlFor="firstname" className="block text-sm font-medium text-gray-700">First Name</label>
                <input
                  type="text"
                  id="firstname"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 p-2"
                  value={firstname}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="lastname" className="block text-sm font-medium text-gray-700">Last Name</label>
                <input
                  type="text"
                  id="lastname"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 p-2"
                  value={lastname}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                <input
                  type="text"
                  id="username"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 p-2"
                  value={username}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  id="email"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 p-2"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  id="password"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 p-2"
                  value={password}
                  onChange={(e) => setPassWord(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
                <input
                  type="tel"
                  id="phoneNumber"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 p-2"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
                <input
                  type="text"
                  id="country"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 p-2"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="state" className="block text-sm font-medium text-gray-700">State</label>
                <input
                  type="text"
                  id="state"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 p-2"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                <input
                  type="text"
                  id="city"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 p-2"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="street" className="block text-sm font-medium text-gray-700">Street</label>
                <input
                  type="text"
                  id="street"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 p-2"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">Zip Code</label>
                <input
                  type="text"
                  id="zipCode"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 p-2"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                />
              </div>
            </div>
            <div className="text-center">
              <button type="submit" className="px-5 py-2 bg-green-500 text-white rounded-md shadow hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">Sign Up</button>
            </div>
          </form>
          <div className="text-center mt-5">
            <div className="flex justify-center space-x-2">
              <h5>Already have an account?</h5>
              <Link to='/SuperLogin' className="text-green-500 hover:underline">Log In</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;