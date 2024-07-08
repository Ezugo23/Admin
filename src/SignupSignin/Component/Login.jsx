import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from 'react-bootstrap/Spinner';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [companyPassword, setCompanyPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password) => {
    return password.length >= 8;
  };

  const validateCompanyPassword = (companyPassword) => {
    return companyPassword.trim() !== '';
  };

  async function login(e) {
    e.preventDefault();

    if (!validateEmail(email)) {
      toast.error("Invalid email format");
      return;
    }
    if (!validatePassword(password)) {
      toast.error("Password must be at least 8 characters");
      return;
    }
    if (!validateCompanyPassword(companyPassword)) {
      toast.error("Invalid company password");
      return;
    }

    const regData = {
      email,
      password,
      companyPassword
    };

    try {
      setLoading(true);
      const response = await fetch("https://delivery-chimelu-new.onrender.com/api/v1/login-admin", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(regData),
      });
      const responseData = await response.json();
      console.log(responseData);

      if (responseData.token) {
        localStorage.setItem('token', responseData.token);
        localStorage.setItem('adminId', responseData.id);
        navigate('/Dashboard');
      } else if (responseData.error) {
        if (responseData.error === "Invalid credentials") {
          toast.error("Wrong password. Please try again.");
        } else {
          toast.error(responseData.error);
        }
      } else if (responseData.errorDetails) {
        toast.error("All fields are required");
      } else if (responseData.message) {
        toast.success(responseData.message);
      }

    } catch (error) {
      console.log(error);
      toast.error("Failed to login. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-gray-100 text-black'>
      <div className='w-full max-w-md p-8 bg-white shadow-lg rounded-lg'>
        <h3 className='text-2xl md:text-3xl text-center mb-5'>Welcome Back</h3>
        {loading && <Spinner animation="border" variant="success" className="mx-auto my-5" />}
        <form onSubmit={login}>
          <ToastContainer position="top-center" />
          <div className='mb-4'>
            <label htmlFor="email" className='block text-sm font-medium text-gray-700'>Email:</label>
            <input type="email" id="email" className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 p-2' value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className='mb-4'>
            <label htmlFor="password" className='block text-sm font-medium text-gray-700'>Password:</label>
            <input type="password" id="password" className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 p-2' value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className='mb-4'>
            <label htmlFor="companyPassword" className='block text-sm font-medium text-gray-700'>Company Password:</label>
            <input type="password" id="companyPassword" className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 p-2' value={companyPassword} onChange={(e) => setCompanyPassword(e.target.value)} />
          </div>
          <div className='flex justify-between items-center mb-4'>
            <div className='flex items-center'>
              <input type="checkbox" id="remember" className='h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500' />
              <label htmlFor="remember" className='ml-2 block text-sm text-gray-900'>Remember me</label>
            </div>
            <Link to='/forgotpassword' className='text-sm text-green-500 hover:underline'>Forgot Password?</Link>
          </div>
          <div className='text-center'>
            <button type="submit" className="bg-green-500 text-white w-full py-2 rounded-md shadow hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">Log In</button>
          </div>
        </form>
        <div className="text-center mt-5">
          <div className="flex justify-center space-x-2">
            <h5>Don't have an account?</h5>
            <Link to='/Register' className="text-green-500 hover:underline">Create free account</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
