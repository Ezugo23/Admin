
import { Link } from 'react-router-dom';
import './Order.css';
import Table from './Table';
import { useState } from 'react';

const Order = () => {
  const [overview, setOverview] = useState({
    pending: null,
    confirm: null,
    ontheway: null,
    total: null,
  });

  return (
    <>
      <div className="p-6 pb-0" style={{ marginTop: "-30px" }}>
        <p className="text-2xl font-bold" style={{ color: 'black' }}>All Orders</p>
        <div className="grid mt-3 grid-cols-4 gap-3">
          {[
            {
              key: 'pending',
              text: 'Total Pending',
              color: '#4CAF50',
              icon: <p className="top">33%</p>,
            },
            {
              key: 'confirm',
              text: 'Total Confirmed',
              color: '#348238',
              icon: <p className="top2">33%</p>,
            },
            {
              key: 'ontheway',
              text: 'Total On The Way',
              color: '#246226',
              icon: <p className="top3">33%</p>,
            },
            {
              key: 'total',
              text: "Total Deliveries",
              color: '#507A52',
              icon: <p className="top4">33%</p>,
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
      <div style={{ backgroundColor: 'white', width: '70rem', height: '8.5rem', boxSizing: 'border-box', display: 'flex', alignItems: 'stretch', justifyContent: 'space-between', marginLeft:'60px'}} className='below'>
        <p style={{ borderRight: '1px solid #D8D8D8', paddingRight: '10px', marginRight: '10px', flex: 1, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Pending</p>
        <p style={{ borderRight: '1px solid #D8D8D8', paddingRight: '10px', marginRight: '10px', flex: 1, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Order Accepted By Restaurant</p>
        <p style={{ borderRight: '1px solid #D8D8D8', paddingRight: '10px', marginRight: '10px', flex: 1, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Order Accepted By Driver</p>
        <p style={{ borderRight: '1px solid #D8D8D8', paddingRight: '10px', marginRight: '10px', flex: 1, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Picked Up</p>
        <p style={{ paddingRight: '10px', flex: 1, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Declined</p>
      </div>
      <div>
        <Table />
      </div>
    </>
  );
};

export default Order;