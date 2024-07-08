import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../History/Order.css';
import TableMenu from './resturantTable';
import Company from './Company';

const Resturant = () => {
  const [overview, setOverview] = useState({
    pending: 1234,
    confirmedByRestaurant: 1234,
    acceptedByRider: 1234,
    onTheWay: 1234,
    delivered: 1234,
    declined: 1234,
  });

  const [companyBalances, setCompanyBalances] = useState({
    pendingRestauransbal: 0,
    totalRestauransbal: 0,
    totalSwiftBal: 0,
    totalInBank: 0,
  });
  
  const [loading, setLoading] = useState(true);
  const [activeTable, setActiveTable] = useState('dailySettlement');

  useEffect(() => {
    const fetchCompanyDetails = async () => {
      try {
        const response = await axios.get('https://delivery-chimelu-new.onrender.com/api/v1/company/details/6581527dc96a438562098fef');
        const { pendingRestauransbal, totalRestauransbal, totalSwiftBal } = response.data;
        setCompanyBalances({
          pendingRestauransbal,
          totalRestauransbal,
          totalSwiftBal,
          totalInBank: totalRestauransbal - pendingRestauransbal,
        });
      } catch (error) {
        console.error('Error fetching company details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyDetails();
  }, []);

  const balanceData = [
    {
      key: 'totalSwiftBal',
      text: 'Total Swift bal',
      color: '#4CAF50',
      value: companyBalances.totalSwiftBal,
    },
    {
      key: 'totalRestauransbal',
      text: 'Total Available bal',
      color: '#348238',
      value: companyBalances.totalRestauransbal,
    },
    {
      key: 'pendingRestauransbal',
      text: 'Owe amount',
      color: '#246226',
      value: companyBalances.pendingRestauransbal,
    },
    {
      key: 'totalInBank',
      text: "Total in the bank",
      color: '#507A52',
      value: companyBalances.totalInBank,
    },
  ];

  return (
    <>
      <div className="p-6 pb-0" style={{ marginTop: "-30px" }}>
        {/* <p className="text-2xl font-bold" style={{ color: 'black' }}>All Orders</p> */}
        <div className="grid mt-3 grid-cols-4 gap-3">
          {balanceData.map((data, index) => (
            <Link key={index}>
              <div
                className={`p-7 text-black flex flex-col justify-end items-start rounded-xl shadow-lg`}
                style={{ backgroundColor: 'white', borderColor: data.color, borderWidth: 1 }}
              >
                <div className="flex flex-col items-start">
                  <p className="text-xl font-bold">₦{data.value}</p>
                  <p className="text-13 font-bold">{data.text}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className='dem'>
        <div 
          style={{
            backgroundColor: 'white', 
            width: '25rem', 
            height: '5.5rem', 
            boxSizing: 'border-box', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            marginLeft:'20px',
             marginTop:'30px'
          }} 
          className={`below ${activeTable === 'dailySettlement' ? 'active' : ''}`}
          onClick={() => setActiveTable('dailySettlement')}
        >
          <p>Daily Settlement Report</p>
        </div>
        <div 
          style={{
            backgroundColor: 'white', 
            width: '25rem', 
            height: '5.5rem', 
            boxSizing: 'border-box', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            marginLeft:'30px',
            marginTop:'30px'
          }} 
          className={`below ${activeTable === 'companyBalance' ? 'active' : ''}`}
          onClick={() => setActiveTable('companyBalance')}
        >
          <p>Company's Balance Sheet</p>
        </div>
      </div>
      <div>
        {activeTable === 'dailySettlement' ? <TableMenu /> : <Company />}
      </div>
    </>
  );
};

export default Resturant;
