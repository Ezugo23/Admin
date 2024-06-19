import React, { useEffect, useState } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
// import toast from 'react-hot-toast';
import { Link } from "react-router-dom";
// import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const forgotPasswordHandler = async (e) => {
    e.preventDefault();
    const logInData = {
      email
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
      // setSuccess(data.data)
      console.log(response);
      // if(response.success === true){
      //   toast.success(response.data)
      // }
      // if(response.success === false){
      //   toast.error(response.message)
      // }
    //   if (response.success === true) {
    //     toast.success(response.message);
    //   }

    //   if (response.success === false) {
    //     setError(response.message);
    //   }
    //   setEmail("");
    //   setTimeout(() => {
    //     setError("");
    //   }, 5000);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    document.title = "forgot-password | Page";
  });
  return (
    <>
      <main className="vh-50 d-flex flex-column  my-3  ">
        <div className="">
          
          <h2 className="fs-3 fw-bold my-4 text-center w-75 m-auto">
            Forgot Password?
          </h2>
          {error && <span>{error} </span>}
          {success && <span> {success} </span>}
          <p className="text-center">Let's help you recover your password</p>

          <Form className="w-75 m-auto" onSubmit={forgotPasswordHandler}>
            <Form.Label className=" fs-6 text-secondary ">Email </Form.Label>

            <FloatingLabel
              controlId="floatingInput"
              label="example@mail.com"
              className="mb-3"
            >
              <Form.Control
                type="email"
                placeholder="name@example.com"
                className="border border-3 rounded"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FloatingLabel>
            {error && <span className="text-danger fst-italic">{error} </span>}

            <div className='text-center'>
                <button className="btn btn-success px-5 py-2 text-white my-3">Reset Password</button>
                </div>
          </Form>
        </div>
      </main>
    </>
  );
};

export default ForgotPassword;
