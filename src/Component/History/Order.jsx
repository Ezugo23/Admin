import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Order.css';
import Table from './Table';

const Order = () => {
  const [overview, setOverview] = useState({
    pending: 1234,
    confirmedByRestaurant: 1234,
    acceptedByRider: 1234,
    onTheWay: 1234,
    delivered: 1234,
    declined: 1234,
  });

  return (
    <>
      <div className="p-4 pb-0" style={{ marginTop: "-30px" }}>
        <p className="text-2xl font-bold" style={{ color: 'black' }}>All Orders</p>
        <div className="grid mt-3 grid-cols-6 gap-4">
          {[
            { key: 'pending', text: 'Pending', color: '#4CAF50' },
            { key: 'confirmedByRestaurant', text: 'Confirmed by Restaurant', color: '#348238' },
            { key: 'acceptedByRider', text: 'Accepted by Rider', color: '#246226' },
            { key: 'onTheWay', text: 'On the Way', color: '#507A52' },
            { key: 'delivered', text: 'Delivered', color: '#4CAF50' },
            { key: 'declined', text: 'Declined', color: '#FF6347' },
          ].map((data, index) => (
            <div
              key={index}
              className="p-3  py-5 text-black flex flex-col justify-end items-start rounded-xl shadow-lg"
              style={{ backgroundColor: 'white', borderColor: data.color, borderWidth: 1, marginBottom: '10px' }}
            >
              <div className="flex flex-col items-start">
                <p className="text-xl font-bold">{overview[data.key]}</p>
                <p className="text-sm font-bold">{data.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Table />
      </div>
    </>
  );
};

export default Order;
