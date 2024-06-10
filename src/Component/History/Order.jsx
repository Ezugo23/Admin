import { useState, useEffect } from 'react';
import { BiSolidBulb } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import './Order.css';
import Table from './Table'
const Order = () => {
  const userId = localStorage.getItem('userId');
  const [overview, setOverview] = useState({
    pending: null,
    confirm: null,
    ontheway: null,
    total: null,
  });

  useEffect(() => {
    const fetchPendingIntervalId = setInterval(FetchPending, 1000 * 10); // Fetch pending orders every 10 seconds
    const fetchAllIntervalId = setInterval(FetchAll, 1000 * 60 * 60); // Fetch all orders every hour
    return () => {
      clearInterval(fetchPendingIntervalId); // Clean up interval for fetching pending orders
      clearInterval(fetchAllIntervalId); // Clean up interval for fetching all orders
    };
  }, []);

  const [prevOnTheWayCount, setPrevOnTheWayCount] = useState(null);
  const [lastUpdatedTime, setLastUpdatedTime] = useState(null);

  const FetchAll = async () => {
    try {
      // Fetch data for all types of orders
      const [pendingResponse, confirmResponse, onTheWayResponse] =
        await Promise.all([
          fetch(
            `https://swifdropp.onrender.com/api/v1/restaurant/pending/${userId}`
          ),
          fetch(
            `https://swifdropp.onrender.com/api/v1/restaurant/confirm/${userId}`
          ),
          fetch(
            `https://swifdropp.onrender.com/api/v1/restaurant/ontheway/${userId}`
          ),
        ]);

      const [pendingData, confirmData, onTheWayData] = await Promise.all([
        pendingResponse.json(),
        confirmResponse.json(),
        onTheWayResponse.json(),
      ]);

      // Calculate total orders
      const total =
        (pendingData.totalPendingOrders || 0) +
        (confirmData.totalConfirmedOrders || 0) +
        (onTheWayData.totalDispatchedOrders || 0);

      // Update overview state
      setOverview({
        pending: pendingData.totalPendingOrders || 0,
        confirm: confirmData.totalConfirmedOrders || 0,
        ontheway: onTheWayData.totalDispatchedOrders || 0,
        total: total,
      });

      // Check if on-the-way orders remain constant for 1 hour and have increased at some point within that hour
      const currentTime = new Date().getTime();
      if (
        prevOnTheWayCount !== null &&
        onTheWayData.totalDispatchedOrders === prevOnTheWayCount
      ) {
        const timeDifference =
          (currentTime - lastUpdatedTime) / (1000 * 60 * 60); // Convert milliseconds to hours
        if (timeDifference >= 1) {
          // Reset the count of dispatched orders to 0
          setOverview((prevState) => ({
            ...prevState,
            ontheway: 0,
            total: prevState.pending + prevState.confirm,
          }));

          // Update the lastUpdated time after resetting the count to zero
          setLastUpdatedTime(currentTime);
        }
      } else {
        // Update the previous count and lastUpdatedTime if the count has changed
        setPrevOnTheWayCount(onTheWayData.totalDispatchedOrders);
        setLastUpdatedTime(currentTime);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      // If an error occurs during fetching, set all counts to 0
      setOverview({
        pending: 0,
        confirm: 0,
        ontheway: 0,
        total: 0,
      });
    }
  };

  const FetchPending = async () => {
    try {
      const responsePending = await fetch(
        `https://swifdropp.onrender.com/api/v1/restaurant/pending/${userId}`
      );
      const dataPending = await responsePending.json();
      setOverview((prevState) => ({
        ...prevState,
        pending: dataPending.totalPendingOrders,
      }));
    } catch (error) {
      console.error('Error fetching pending orders:', error);
      setOverview((prevState) => ({
        ...prevState,
        pending: 0,
      }));
    }
  };

  // Call FetchAll initially to get initial data
  useEffect(() => {
    FetchAll();

    // Set interval to check dispatched orders count after 1 hour
    const intervalId = setInterval(() => {
      FetchAll();
    }, 1000 * 60 * 60);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
    <div className="p-6 pb-0" style={{marginTop:"-30px"}}>
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
                <p className="text-xl font-bold">{overview[data.key]}</p>
                <p className="text-13 font-bold">{data.text}</p>
              </div>
              {data.icon && <div className="absolute top-4 right-4">{data.icon}</div>}
            </div>
          </Link>
        ))}
      </div>
    </div>
    <div style={{ backgroundColor: 'white', width: '80rem', height: '8.5rem', boxSizing: 'border-box', display: 'flex', alignItems: 'stretch', justifyContent: 'space-between' }} className='below'>
        <p style={{ borderRight: '1px solid #D8D8D8', paddingRight: '10px', marginRight: '10px', flex: 1, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Pending</p>
        <p style={{ borderRight: '1px solid #D8D8D8', paddingRight: '10px', marginRight: '10px', flex: 1, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Order Accepted By Resturant</p>
        <p style={{ borderRight: '1px solid #D8D8D8', paddingRight: '10px', marginRight: '10px', flex: 1, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Order Accepted By Driver</p>
        <p style={{ borderRight: '1px solid #D8D8D8', paddingRight: '10px', marginRight: '10px', flex: 1, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Picked Up</p>
        <p style={{ paddingRight: '10px', flex: 1, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Declined</p>
      </div>
    <div>
    <Table/>
    </div>
    </>
  );
};

export default Order;