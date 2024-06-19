import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from 'axios';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { resetToken } = useParams();
  const navigate = useNavigate();

  const resetPasswordHandler = async (e) => {
    e.preventDefault();
    const logInData = { password };

    if (password !== confirmPassword) {
      setPassword('');
      setConfirmPassword('');
      setTimeout(() => {
        setError('');
      }, 5000);
      return setError("Passwords don't match");
    }

    try {
      const data = await fetch(`https://swifdropp.onrender.com/api/v1/admin/resetpassword/${resetToken}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(logInData)
      });
      const response = await data.json();
      setSuccess(response.message);
      console.log(response);

      if (response.success === true) {
        navigate('/LogIn');
      }

      if (response.success === false) {
        setError(response.message);
      }

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <main className="min-h-screen flex flex-col items-center justify-center py-6">
        <div className="w-full bg-white p-8 rounded shadow-md">
          <h2 className="text-3xl font-bold mb-6 text-center">Reset Password</h2>
          {error && <span className="text-red-500">{error}</span>}
          {success && <span className="text-green-500">{success}</span>}
          <p className="text-center mb-6">Let's help you recover your password</p>

          <form onSubmit={resetPasswordHandler} className="space-y-4">
            <label className="block text-gray-700">
              Password
              <input
                type="password"
                placeholder="Enter your new password"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <label className="block text-gray-700">
              Confirm Password
              <input
                type="password"
                placeholder="Confirm your new password"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50"
                value={confirmPassword}
                required
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </label>
            {error && <span className="text-red-500 italic">{error}</span>}

            <div className='text-center'>
              <button type="submit" className="px-5 py-2 bg-green-500 text-white rounded-md shadow hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                Reset Password
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}

export default ResetPassword;