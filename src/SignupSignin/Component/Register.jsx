import React, { useEffect, useState } from "react";
import RegisterImage from '../../../Asset/image container.svg';
import star from '../../../Asset/star 1.svg';
import profile from '../../../Asset/BG.svg';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [state, setState] = useState("");
  const [ address, setAddress] = useState("");
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
      password,
      address,
    };

    try {
      const data = await fetch(
        "https://delivery-chimelu-new.onrender.com/api/v1/register-admin",
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
    <div className="w-full flex flex-col items-center justify-center bg-gray-100 text-black">
      <div className="flex flex-col md:flex-row justify-between items-center gap-5 w-full p-5 bg-white shadow-lg rounded-lg">
        <div className="flex flex-col items-center bg-green-500 text-white p-5 rounded-lg">
          <img src={RegisterImage} alt="Register" className="bg-white rounded-lg mb-5" />
          <div className="flex space-x-2 mb-5">
            <img src={star} alt="Star" />
            <img src={star} alt="Star" />
            <img src={star} alt="Star" />
            <img src={star} alt="Star" />
            <img src={star} alt="Star" />
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
          <h1 className="text-2xl md:text-3xl text-center mb-5">Become our partner</h1>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-wrap -mx-2">
              <div className="w-full md:w-1/2 px-2 mb-4">
                <label htmlFor="firstname" className="block text-sm font-medium text-gray-700">FirstName</label>
                <input
                  type="text"
                  id="firstname"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 p-2"
                  value={firstname}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="w-full md:w-1/2 px-2 mb-4">
                <label htmlFor="lastname" className="block text-sm font-medium text-gray-700">LastName</label>
                <input
                  type="text"
                  id="lastname"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 p-2"
                  value={lastname}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div className="w-full md:w-1/2 px-2 mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  id="email"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 p-2"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="w-full md:w-1/2 px-2 mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  id="password"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 p-2"
                  value={password}
                  onChange={(e) => setPassWord(e.target.value)}
                />
              </div>
              <div className="w-full md:w-1/2 px-2 mb-4">
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
                <input
                  type="tel"
                  id="phoneNumber"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 p-2"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
              <div className="w-full md:w-1/2 px-2 mb-4">
                <label htmlFor="city" className="block text-sm font-medium text-gray-700">Address</label>
                <input
                  type="text"
                  id="address"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 p-2"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
            </div>
            <div className="text-center">
              <button type="submit" className="px-28 py-2 bg-green-500 text-white rounded-md shadow hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500" style={{marginTop:'25px', marginLeft:'40px'}}>SignUp</button>
            </div>
          </form>
          <div className="text-center mt-5">
            <div className="flex justify-center space-x-2">
              <h5>Already have an account?</h5>
              <Link to='/Login' className="text-green-500 hover:underline">LogIn</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;