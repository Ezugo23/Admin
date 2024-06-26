import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const forgotPasswordHandler = async (e) => {
    e.preventDefault();
    const logInData = {
      email,
    };
    try {
      const data = await fetch(
        "https://swifdropp.onrender.com/api/v1/admin/forgotpassword",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(logInData),
        }
      );
      const response = await data.json();
      console.log(response);
      // Handle response here
      // if (response.success) {
      //   setSuccess(response.message);
      //   setEmail("");
      // } else {
      //   setError(response.message);
      // }
      // setTimeout(() => {
      //   setError("");
      // }, 5000);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    document.title = "forgot-password | Page";
  });

  return (
    <main className="flex flex-col items-center my-8">
      <div className="w-full bg-white p-8 rounded shadow-md">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Forgot Password?
        </h2>
        {error && <span className="text-red-500">{error}</span>}
        {success && <span className="text-green-500">{success}</span>}
        <p className="text-center mb-6">Let's help you recover your password</p>

        <form onSubmit={forgotPasswordHandler} className="space-y-4">
          <label className="block text-gray-700">
            Email
            <input
              type="email"
              placeholder="example@mail.com"
              className="mt-1 block w-full rounded-md border-gray-100 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50"
              value={email}
              style={{height:'50px'}}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          {error && <span className="text-red-500 italic">{error}</span>}

          <div className="text-center">
            <button
              type="submit"
              className="px-5 py-2 bg-green-500 text-white rounded-md shadow hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Reset Password
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default ForgotPassword;