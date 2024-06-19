import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import RegisterImage from '../../../Asset/image container.svg';
import star from '../../../Asset/star 1.svg';
import profile from '../../../Asset/BG.svg';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  async function login(e) {
    e.preventDefault();

    const regData = {
      email,
      password,
    };

    try {
      const response = await fetch("https://swifdropp.onrender.com/api/v1/login-superAdmin", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(regData),
      });

      // Handle 404 (Not Found) error
      if (!response.ok) {
        throw new Error('404 (Not Found)');
      }

      const responseData = await response.json();
      console.log(responseData);

      if (responseData.token) {
        localStorage.setItem('token', responseData.token);
        navigate("/Dashboard");
      }
    } catch (error) {
      console.log(error);
      setError('SuperAdmin Not Found');

      setTimeout(() => {
        setError('');
      }, 3000);

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
            <div className="mt-5">
              <form>
                <label htmlFor="email" className="block mb-2">Email:</label>
                <input type="text" id="email" className="w-full rounded-md p-3 border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 mb-4" value={email} onChange={(e) => setEmail(e.target.value)} />
                <label htmlFor="password" className="block mb-2">Password:</label>
                <input type="password" id="password" className="w-full rounded-md p-3 border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 mb-4" value={password} onChange={(e) => setPassword(e.target.value)} />
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <input type="checkbox" id="remember" className="mr-2" />
                    <label htmlFor="remember">Remember me</label>
                  </div>
                  <Link to=''>Forgot Password?</Link>
                </div>
                {error && <div className="text-red-500 mb-4">{error}</div>}
                <div className="text-center">
                  <button className="bg-green-500 text-white px-5 py-2 rounded-md shadow hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500" onClick={login}>Log In</button>
                </div>
              </form>
              <div className="text-center mt-5 flex justify-between lg:justify-center">
                <div>
                  <h5>Don't have an account?</h5>
                </div>
                <Link to='/Register' className="text-green-500">Create free account</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}