import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Order.css';
import Table from './Table';

const Order = () => {
  const [overview, setOverview] = useState({
    pending: 0,
    confirmedByRestaurant: 0,
    acceptedByRider: 0,
    onTheWay: 0,
    delivered: 0,
    declined: 0,
  });

  const [filter, setFilter] = useState('');

  useEffect(() => {
    const fetchOrderOverview = async () => {
      try {
        const response = await fetch('https://swifdropp.onrender.com/api/v1/orders/count-orders/status');
        if (!response.ok) {
          throw new Error('Failed to fetch order overview');
        }
        const data = await response.json();
        const { PENDING, CONFIRMED, 'PICK UP SOON': acceptedByRider, 'ON THE WAY': onTheWay } = data.data;
        setOverview({
          pending: PENDING || 0,
          confirmedByRestaurant: CONFIRMED || 0,
          acceptedByRider: acceptedByRider || 0,
          onTheWay: onTheWay || 0,
          delivered: 0,
          declined: 0,
        });
      } catch (error) {
        console.error('Error fetching order overview:', error);
      }
    };

    fetchOrderOverview();
  }, []);

  const handleBoxClick = (status) => {
    setFilter(status);
  };

  return (
    <>
      <div className="p-4 pb-0" style={{ marginTop: '-30px' }}>
        <p className="text-2xl font-bold" style={{ color: 'black' }}>All Orders</p>
        <div className="grid mt-3 grid-cols-6 gap-4">
          {[
            { key: 'pending', text: 'Pending orders', color: '#4CAF50', status: 'PENDING' },
            { key: 'confirmedByRestaurant', text: 'Confirmed by Restaurant', color: '#348238', status: 'CONFIRMED' },
            { key: 'acceptedByRider', text: 'Accepted by Rider', color: '#246226', status: 'PICK UP SOON' },
            { key: 'onTheWay', text: 'On the Way', color: '#507A52', status: 'ON THE WAY' },
            { key: 'delivered', text: 'Delivered', color: '#4CAF50', status: 'DELIVERED' },
            { key: 'declined', text: 'Declined', color: '#FF6347', status: 'DECLINED' },
          ].map((data, index) => (
            <div
              key={index}
              className="p-6 h-38 w-25 text-black flex flex-col justify-between items-start rounded-xl shadow-lg cursor-pointer"
              style={{ backgroundColor: 'white', borderColor: data.color, borderWidth: 1, marginBottom: '10px' }}
              onClick={() => handleBoxClick(data.status)}
            >
              <div className="flex flex-col items-start">
                <p className="text-xl font-bold" style={{ color: 'black' }}>{overview[data.key]}</p>
                <p className="mt-4 text-xs font-bold" style={{ color: 'green' }}>{data.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Table filter={filter} />
      </div>
    </>
  );
};

export default Order;
