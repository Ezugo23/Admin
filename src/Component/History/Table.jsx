import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaAngleLeft, FaAngleRight, FaEdit } from 'react-icons/fa';
import './Order.css';

const Table = ({ filter }) => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://swifdropp.onrender.com/api/v1/orders/');
        const result = await response.json();
        const formattedData = result.map(order => {
          const date = new Date(order.orderDate);
          return {
            id: order._id,
            Date: date.toLocaleDateString(),
            Time: date.toLocaleTimeString(),
            client: order.userId ? `${order.userId.username}\n${order.deliveryAddress.address}` : 'N/A',
            seller: order.restaurantId ? `${order.restaurantId.restaurantName}\n${order.restaurantId.address}` : 'N/A',
            invoice: `W${order.orderId}`,
            driver: order.assignedDriver ? { 
              name: order.assignedDriver.username, 
              image: order.assignedDriver.image, 
              phoneNumber: order.assignedDriver.phoneNumber 
            } : { 
              name: 'N/A', 
              image: '', 
              phoneNumber: 'N/A' 
            },
            fee: order.grandTotal,
            orderStatus: order.orderStatus
          };
        });
        setData(formattedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const filteredData = filter ? data.filter(item => item.orderStatus === filter) : data;

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handleClick = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const currentData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="contain">
      <div className="main-container">
        <div className="entries-container mb-4">
          <label>Show 
            <select className="ml-2" onChange={(e) => setItemsPerPage(Number(e.target.value))}>
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
            entries
          </label>
          <div className="search-container ml-auto">
            <label htmlFor="search">Search:</label>
            <input id="search" type="text" />
          </div>
        </div>
        <div className="table-container">
          <table className="table min-w-full">
            <thead className="table-header">
              <tr>
                <th>Date, Time</th>
                <th>Client</th>
                <th>Seller</th>
                <th>Invoice</th>
                <th>Driver</th>
                <th>Fee</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((item) => (
                <tr key={item.id} className="table-row">
                  <td>
                    <strong>{item.Date}</strong>
                    <br />
                    {item.Time}
                  </td>
                  <td dangerouslySetInnerHTML={{ __html: item.client.replace(/\n/g, '<br />') }}></td>
                  <td dangerouslySetInnerHTML={{ __html: item.seller.replace(/\n/g, '<br />') }}></td>
                  <td className="invoice-column">
                    <Link to={`receipt/${item.id}`} className="link">{item.invoice}</Link>
                  </td>
                  <td>
                    <div className="flex flex-col items-start">
                      {item.driver.image ? <img src={item.driver.image} alt={item.driver.name} className="w-8 h-8 rounded-full mr-2" /> : null}
                      <p>{item.driver.name}</p>
                      <p>{item.driver.phoneNumber}</p>
                    </div>
                  </td>
                  <td>₦{item.fee}</td>
                  <td>{item.orderStatus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="pagination-con">
          <span className="text-gray-600">Showing {Math.min(currentPage * itemsPerPage - itemsPerPage + 1, filteredData.length)}-{Math.min(currentPage * itemsPerPage, filteredData.length)} of {filteredData.length} data</span>
          <div className="pagination flex items-center">
            <button 
              className="px-3 py-1 mx-1 rounded hover:bg-gray-300" 
              onClick={() => handleClick(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <FaAngleLeft />
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => handleClick(i + 1)}
                className={`px-3 py-1 mx-1 rounded ${currentPage === i + 1 ? 'bg-green-500 text-white' : 'hover:bg-gray-300'}`}
              >
                {i + 1}
              </button>
            ))}
            <button 
              className="px-3 py-1 mx-1 rounded hover:bg-gray-300" 
              onClick={() => handleClick(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <FaAngleRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
