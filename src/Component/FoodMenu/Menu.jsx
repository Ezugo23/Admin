import { Link, useParams } from 'react-router-dom';
import { RiLockPasswordFill } from "react-icons/ri";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Image } from '@chakra-ui/react';

export default function Menu() {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [wallet, setWallet] = useState(null);

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const response = await axios.get(`https://swifdropp.onrender.com/api/v1/restaurant/byId/${id}`); 
        setRestaurant(response.data.restaurant);
        setWallet(response.data.wallet);
      } catch (error) {
        console.error('Error fetching restaurant data:', error);
      }
    };

    fetchRestaurant();
  }, [id]);

  if (!restaurant || !wallet) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-64" style={{marginTop:'39px'}}> {/* Adjust the width here */}
      <p className="font-roboto font-bold text-lg leading-6 text-black">Restaurant Profile</p>
      <div className="bg-white shadow-md rounded-lg mb-4 p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <img src={restaurant.image} alt="Profile Logo" className="w-12 h-15 top-48 left-11" />
            <div className="ml-4 text-sm">
              <span className="font-bold">{restaurant.restaurantName}</span> <br /> <span>Restaurant</span>
            </div>
          </div>
          <div className="cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path fillRule="evenodd" clipRule="evenodd" d="M4.5 10.5C3.675 10.5 3 11.175 3 12C3 12.825 3.675 13.5 4.5 13.5C5.325 13.5 6 12.825 6 12C6 11.175 5.325 10.5 4.5 10.5ZM19.5 10.5C18.675 10.5 18 11.175 18 12C18 12.825 18.675 13.5 19.5 13.5C20.325 13.5 21 12.825 21 12C21 11.175 20.325 10.5 19.5 10.5ZM10.5 12C10.5 11.175 11.175 10.5 12 10.5C12.825 10.5 13.5 11.175 13.5 12C13.5 12.825 12.825 13.5 12 13.5C11.175 13.5 10.5 12.825 10.5 12Z" fill="black" />
            </svg>
          </div>
        </div>
        <div className="p-0 m-0">
          <ul className="flex flex-col m-0 p-0">
            <li className="my-2">
              <Link to={`personal/${id}`} className="flex items-center p-2 rounded hover:bg-blue-200">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="15" viewBox="0 0 14 15" fill="none">
                  <path fillRule="evenodd" clipRule="evenodd" d="M7.00004 8.08333C5.74961 8.08333 4.59417 7.41623 3.96895 6.33333C3.34374 5.25042 3.34374 3.91623 3.96895 2.83333C4.59417 1.75042 5.74961 1.08333 7.00004 1.08333C8.93304 1.08333 10.5 2.65033 10.5 4.58333C10.5 6.51632 8.93304 8.08333 7.00004 8.08333ZM11.6667 13.3333H10.5V12.1667C10.5 11.2002 9.71654 10.4167 8.75004 10.4167H5.25004C4.28354 10.4167 3.50004 11.2002 3.50004 12.1667V13.3333H2.33337V12.1667C2.33337 10.5558 3.63921 9.25 5.25004 9.25H8.75004C10.3609 9.25 11.6667 10.5558 11.6667 12.1667V13.3333ZM9.33337 4.58333C9.33337 5.87199 8.2887 6.91666 7.00004 6.91666C5.71138 6.91666 4.66671 5.87199 4.66671 4.58333C4.66671 3.29466 5.71138 2.24999 7.00004 2.24999C8.2887 2.24999 9.33337 3.29466 9.33337 4.58333Z" fill="black" />
                </svg>
                <span className="pl-2">Personal Information</span>
              </Link>
            </li>
            <li className="my-2">
              <Link to={`password/${id}`} className="flex items-center p-2 rounded hover:bg-blue-200">
                <RiLockPasswordFill />
                <span className="pl-2">Change Password</span>
              </Link>
            </li>
            <li className="my-2">
              <Link to={`resturant-information/${id}`} className="flex items-center p-2 rounded hover:bg-blue-200">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12.25 4.66667V12.2459C12.2511 12.4006 12.1907 12.5494 12.082 12.6596C11.9734 12.7698 11.8255 12.8323 11.6707 12.8333H2.32925C2.00957 12.8333 1.75032 12.5743 1.75 12.2547V1.74533C1.75 1.43208 2.01192 1.16667 2.3345 1.16667H8.74825L12.25 4.66667ZM11.0833 5.25H8.16667V2.33333H2.91667V11.6667H11.0833V5.25ZM6.41667 4.08333H4.66667V5.25H6.41667V4.08333ZM4.66667 6.41667H9.33333V7.58333H4.66667V6.41667ZM9.33333 8.75H4.66667V9.91667H9.33333V8.75Z" fill="black" />
                </svg>
                <span className="pl-2">Resturants Information</span>
              </Link>
            </li>
            <hr />
            <li className="my-2">
              <Link to={`add-menu/${id}`} className="flex items-center p-2 rounded hover:bg-blue-200">
                <Image src="/restaurant-line.png" alt="Edit" />
                <span className="pl-2">Add Food Menu</span>
              </Link>
            </li>
            <li className="my-2">
              <Link to={`discount/${id}`} className="flex items-center p-2 rounded hover:bg-blue-200">
                <Image src="/coupon-line.png" alt="Edit" />
                <span className="pl-2">Discount</span>
              </Link>
            </li>
            <li className="my-2">
              <Link to="side-items" className="flex items-center p-2 rounded hover:bg-blue-200">
                <Image src="/ep_dish.png" alt="Edit" />
                <span className="pl-2">Side Items</span>
              </Link>
            </li>
            <hr />
            <li className="my-2 mt-9">
              <Link to={`order-history/${id}`} className="flex items-center p-2 rounded hover:bg-blue-200">
                <Image src="/currency-line.png" alt="Edit" />
                <span className="pl-2">Order (sale) History</span>
              </Link>
            </li>
            <li className="my-2">
              <Link to={`payout-management/${id}`} className="flex items-center p-2 rounded hover:bg-blue-200">
                <Image src="/wallet-2-line.png" alt="Edit" />
                <span className="pl-2">Payout Management</span>
              </Link>
            </li>
            <li className="my-2">
              <Link to={`dispute/${id}`} className="flex items-center p-2 rounded hover:bg-blue-200">
                <Image src="/foundation_x.png" alt="Edit" />
                <span className="pl-2">Dispute</span>
              </Link>
            </li>
          </ul>
          <hr className="mt-10" />
          <div className="flex justify-between pt-0 pb-4 space-x-5">
            <div className="flex flex-col items-center justify-center text-center">
              <span className="font-bold text-primary">{restaurant.totalItems}</span>
              <span>Items</span>
            </div>
            <div className="flex flex-col items-center justify-center text-center">
              <span className="font-bold text-primary">{restaurant.totalOrders}</span>
              <span>Orders</span>
            </div>
            <div className="flex flex-col items-center justify-center text-center">
              <span className="font-bold text-red-600">
              ₦{wallet.availableBalance ? wallet.availableBalance : 'N/A'}
              </span>
              <span>Balance</span>
            </div>
            <div className="flex flex-col items-center justify-center text-center">
              <span className="font-bold text-green-600"> ₦{restaurant.totalPaid}</span>
              <span>Paid</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
