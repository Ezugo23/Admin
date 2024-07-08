import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!firstname || !lastname || !email || !phoneNumber || !password || !address) {
      toast.error("All fields are required");
      return;
    }

    if (!validatePassword(password)) {
      toast.error("Password must be at least 8 characters long and contain at least one uppercase letter and one special character");
      return;
    }

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
      } else if (response.message === "User already exists") {
        toast.error("User already exists");
      } else if (response.message) {
        toast.success(response.message);
        navigate("/Login");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to register. Please try again.");
    }
  };

  const validatePassword = (password) => {
    const re = /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9a-zA-Z]).{8,}$/;
    return re.test(password);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center bg-gray-100 text-black py-10">
      <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6">Register as Admin</h1>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                onChange={(e) => setPassword(e.target.value)}
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
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
              <input
                type="text"
                id="address"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 p-2"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
          </div>
          <div className="text-center mt-6">
            <button type="submit" className="px-6 py-2 bg-green-500 text-white rounded-md shadow hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">Sign Up</button>
          </div>
        </form>
        <div className="text-center mt-6">
          <div className="flex justify-center space-x-2">
            <span>Already have an account?</span>
            <Link to='/Login' className="text-green-500 hover:underline">Log In</Link>
          </div>
        </div>
        <ToastContainer position="top-center" />
      </div>
    </div>
  );
};

export default Register;
