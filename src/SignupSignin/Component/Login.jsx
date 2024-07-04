import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from 'react-bootstrap/Spinner';
import RegisterImage from '../../../Asset/image container.svg';
import star from '../../../Asset/star 1.svg';
import profile from '../../../Asset/BG.svg';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [companyPassword, setCompanyPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const validateEmail = (email) => {
    // Simple email validation regex
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password) => {
    // Example password validation (minimum 8 characters)
    return password.length >= 8;
  };

  const validateCompanyPassword = (companyPassword) => {
    // Company password should not be empty
    return companyPassword.trim() !== '';
  };

  async function login(e) {
    e.preventDefault();

    // Check if email, password, or company password is invalid
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
        localStorage.setItem('adminId', responseData.id); // Store adminId in localStorage
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
      <div className='flex flex-col md:flex-row justify-between items-center gap-5 w-full p-5 bg-white shadow-lg rounded-lg'>
        <div className='flex flex-col items-center bg-green-500 text-white p-5 rounded-lg'>
          <img src={RegisterImage} alt="Register" className="bg-white rounded-lg mb-5" />
          <div className='flex space-x-2 mb-5'>
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
        <div className='w-full md:w-1/2 p-5'>
          <h3 className='text-2xl md:text-3xl text-center mb-5'>Welcome Back</h3>
          <p className='text-center w-3/4 mx-auto mb-5'>SwifDrop gives you the blocks and components you need to take your sales to the next level.</p>
          {loading && <Spinner animation="border" variant="success" className="mx-auto my-5" />}
          <div className='mt-5'>
            <form onSubmit={login}>
              <ToastContainer position="top-center" />
              <label htmlFor="email" className='block my-2'>Email:</label>
              <input type="email" id="email" className='w-full rounded p-3 mb-3 border' value={email} onChange={(e) => setEmail(e.target.value)} />
              <label htmlFor="password" className='block my-2'>Password:</label>
              <input type="password" id="password" className='w-full rounded p-3 mb-3 border' value={password} onChange={(e) => setPassword(e.target.value)} />
              <label htmlFor="companyPassword" className='block my-2'>Company Password:</label>
              <input type="password" id="companyPassword" className='w-full rounded p-3 mb-3 border' value={companyPassword} onChange={(e) => setCompanyPassword(e.target.value)} />
              <div className='flex justify-between my-4'>
                <div className='flex justify-between'>
                  <input type="checkbox" id="remember" />
                  <label htmlFor="remember" className='ml-2'>Remember me</label>
                </div>
                <Link to='/forgotpassword' className='text-green-500 hover:underline'>Forgot Password?</Link>
              </div>
              <div className='text-center'>
                <button type="submit" className="bg-green-500 text-white px-5 py-2 rounded-md shadow hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">LogIn</button>
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
      </div>
    </div>
  );
};

export default Login;