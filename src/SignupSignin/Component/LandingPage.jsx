import React from 'react';
import Burger from '../../../Asset/Burger image.svg';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-white landing-page" style={{backgroundColor:'black'}}>
      <div className="flex flex-col md:flex-row justify-around items-center w-full px-4 md:px-12 lg:px-24">
        <div className="max-w-md text-center md:text-left mb-8 md:mb-0">
        <h1 className="text-3xl md:text-4xl lg:text-4xl font-bold italic mb-4">Delicious Deliveries, Delivered to your Doorstep!</h1>
          <p className="text-lg mb-6">Our mission is to bring the diverse flavors of your city to your table with the ease of a click. We partner with renowned local restaurants to ensure you experience the best the culinary world has to offer.</p>
          <div className="flex justify-center md:justify-start">
            <div className="relative inline-block text-left group">
              <div>
              <Link to="Register">
                <button
                  type="button"
                  className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-500 text-base font-medium text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  id="options-menu"
                >
                  SignUp/SignIn
                </button>
                </Link>
              </div>
                
            </div>
          </div>
        </div>
        <img src={Burger} alt="Delicious Burger" className="w-full md:w-1/2 lg:w-1/3" />
      </div>
    </div>
  );
}

export default LandingPage;