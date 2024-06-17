import React, { useEffect, useState } from "react";
// import '../Style/EditUsers.css'
import RegisterImage  from '../assets/image container.svg'
import star from '../assets/star 1.svg'
import profile from '../assets/BG.svg'
import axios from "axios";
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

  const handleSubmit = async () => {
    // e.preventDefault()

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
      navigate("/Login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-between gap-5 align-items-center">
        <div  style={{backgroundColor:'#4CAF50' , color:'#FFFFFF'}}>
         <div className="p-5">
         <img src={RegisterImage} alt="" className="bg-white rounded-5"/>
         <div className="my-5">
         <img src={star} alt="" />
          <img src={star} alt="" />
          <img src={star} alt="" />
          <img src={star} alt="" />
          <img src={star} alt="" />
         </div>
          <div className="w-75">
            <p >"We love SwifDrop! we've been getting and managing orders seamlessly, It's definately a restaurant's dream come true"</p>
            <div className="d-flex align-items-center">
            <img src={profile} alt="" />
            <div>
            <p> Fiyin Oladejo</p>
            <p>Founder, Tasty Natives</p>
            </div>
            </div>
          </div>
         </div>
        </div>
        <div className="m-3">
          <h1 className="my-3 text-center">Becaome our partner</h1>
          
          <form action="">
            <div className="d-flex justify-content-between">
              <div className="my-2 me-1">
              <label htmlFor="" className="label">
              FirstName
            </label>
            <input
              type="text"
              placeholder=""
              className="w-100 rounded p-2 mb-3"
              value={firstname}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <label htmlFor="" className="label">
              LastName
            </label>
            <input
              type="text"
              placeholder=""
              className="w-100 rounded p-2 mb-3"
              value={lastname}
              onChange={(e) => setLastName(e.target.value)}
            />
            <label htmlFor="" className="label">
              UserName
            </label>
            <input
              type="text"
              placeholder=""
              className="w-100 rounded p-2 mb-3"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
            />
            <label htmlFor="" className="label">
              Email
            </label>
            <input
              type="text"
              placeholder=""
              className="w-100 rounded p-2 mb-3"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="" className="label">
              Password
            </label>
            <input
              type="password"
              placeholder=""
              className="w-100 rounded p-2 mb-3"
              value={password}
              onChange={(e) => setPassWord(e.target.value)}
            />
            
              </div>


              <div className="my-2 ms-1">
              <label htmlFor="" className="label">
              Phone Number
            </label>
            <input
              type="number"
              placeholder=""
              className="w-100 rounded p-2 mb-3"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <label htmlFor="" className="label">
              Country
            </label>
            <input
              type="text"
              placeholder=""
              className="w-100 rounded p-2 mb-3"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
            <label htmlFor="" className="label">
              State
            </label>
            <input
              type="text"
              placeholder=""
              className="w-100 rounded p-2 mb-3"
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
            <label htmlFor="" className="label">
              City
            </label>
            <input
              type="text"
              placeholder=""
              className="w-100 rounded p-2 mb-3"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <label htmlFor="" className="label">
              Street
            </label>
            <input
              type="text"
              placeholder=""
              className="w-100 rounded p-2 mb-3"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
            />

              </div>
            </div>
            <label htmlFor="" className="label">
              ZipCode
            </label>
            <input
              type="text"
              placeholder=""
              className="w-100 rounded p-2 mb-3"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
            />
          </form>

          
           
            <div className='text-center'>
                <button className="btn btn-success px-5 py-2 text-white my-3" onClick={handleSubmit}>SignUp</button>
                </div>
          <div className="text-center d-flex justify-content-between  justify-content-lg-center ">
           <h5> Already have an account?</h5>
            <Link to='/Login'><h5>LogIn</h5></Link>
           </div>
          
        </div>
      </div>
    </div>
  );
};

export default Register;
