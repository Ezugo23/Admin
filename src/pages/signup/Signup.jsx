import React from 'react';
import { Routes, Route } from 'react-router-dom';

import SignupSignin from '../../SignupSignin/Component/LandingPage'
import ForgotPassword from '../../SignupSignin/Component/FogotPassword';
import ResetPassword from '../../SignupSignin/Component/ResetPassword';
import LandingPage from '../../SignupSignin/Component/LandingPage';
import Login from '../../SignupSignin/Component/Login';
import Register from '../../SignupSignin/Component/Register';
import Navbar from '../../SignupSignin/Component/Navbar';
 
export default function signup() {

    

    return (

        <>

            <div>
                
                    <Routes>
                    <Route path="" element={<SignupSignin />} />
                    <Route path="ForgotPassword" element={<ForgotPassword/>} />
                    <Route path="ResetPassword" element={<ResetPassword />} />
                    <Route path="LandingPage" element={<LandingPage/>} />
                    <Route path="Login" element={<Login />} />
                    <Route path="Register" element={<Register />} />
                    <Route path="Navbar" element={<Navbar />} />
                    </Routes>
                </div>
               
        </>

    )

}