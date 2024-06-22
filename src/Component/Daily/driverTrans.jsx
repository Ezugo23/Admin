import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../History/Order.css';
import Driver from './driverDaily'; // Updated import
import Company from './Company'; // Updated import

const  driverTrans = () => {
  const [overview, setOverview] = useState({
    pending: 1234,
    confirmedByRestaurant: 1234,
    acceptedByRider: 1234,
    onTheWay: 1234,
    delivered: 1234,
    declined: 1234,
  });
  const [activeTable, setActiveTable] = useState('dailySettlement'); // State to manage active table

  return (
    <>
      <div className="p-6 pb-0" style={{ marginTop: "-30px" }}>
        <p className="text-2xl font-bold" style={{ color: 'black' }}>All Orders</p>
        <div className="grid mt-3 grid-cols-4 gap-3">
          {[
            {
              key: 'pending',
              text: 'Total On The Way',
              color: '#4CAF50',
              icon: <p className="top">33%</p>,
            },
            {
              key: 'confirm',
              text: 'Total Confirmed',
              color: '#348238',
              icon: <p className="top2">33%</p>,
            },
          ].map((data, index) => (
            <Link to={index === 0 || index === 1 ? "/pending-order" : "invoice"} key={index}> {/* Use Link and set href accordingly */}
              <div
                className={`p-7 text-black flex flex-col justify-end items-start rounded-xl custom-box shadow-lg `}
                style={{ backgroundColor: 'white', borderColor: data.color, borderWidth: 1}}
              >
                <div className="flex flex-col items-start">
                  <p className="text-xl font-bold">3</p>
                  <p className="text-13 font-bold">{data.text}</p>
                </div>
                {data.icon && <div className="absolute top-4 right-4">{data.icon}</div>}
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div>
        <Driver />
      </div>
    </>
  );
};

export default driverTrans;