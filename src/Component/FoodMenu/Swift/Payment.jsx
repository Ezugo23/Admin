import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { Switch } from '@chakra-ui/react';
import axios from 'axios';

export default function Payment() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Fetch data from API
    const fetchData = async () => {
      try {
        const response = await axios.get('https://delivery-chimelu-new.onrender.com/api/v1/restaurantWallet/restaurants/with-money');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleClick = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handlePayAll = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put('https://delivery-chimelu-new.onrender.com/api/v1/restaurantWallet/move-swift-balance', null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Payment processed successfully');
    } catch (error) {
      console.error('Error processing payment:', error);
      alert('Failed to process payment');
    }
  };

  const toggleCleared = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`https://delivery-chimelu-new.onrender.com/api/v1/restaurantWallet/${id}/toggle-cleared`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const updatedWallet = response.data;
      setData((prevData) =>
        prevData.map((item) => (item._id === id ? { ...item, cleared: updatedWallet.cleared } : item))
      );
    } catch (error) {
      console.error('Error toggling cleared status:', error);
    }
  };

  const filteredData = data.filter((item) =>
    item.restaurantName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="contain">
      <div className="header">
        <h2 className="header-title">Food Sellers Payment</h2>
      </div>
      <div className="main-container">
        <div className="entries-container mb-4">
          <label>
            Show
            <select className="ml-2" value={itemsPerPage} onChange={(e) => setItemsPerPage(Number(e.target.value))}>
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
            entries
          </label>
          <div className="search-container ml-auto">
            <p htmlFor="search">Pay all active swift balance</p>
            <button
              style={{
                width: '171px',
                height: '45px',
                backgroundColor: '#4CAF50',
                marginRight: '30px',
                marginLeft: '30px',
              }}
              onClick={handlePayAll}
            >
              Pay
            </button>
            <Link to={'/foodsellers/swiftamount/history'}>
              <button
                style={{
                  width: '171px',
                  height: '45px',
                  borderColor: '#4CAF50',
                  marginLeft: '30px',
                  color: '#4CAF50',
                  border: 'solid #4CAF50 1px',
                }}
              >
                Payment History
              </button>
            </Link>
          </div>
        </div>
        <div className="table-container" style={{ position: 'relative', minHeight: '300px' }}>
          <table className="table min-w-full" style={{ borderCollapse: 'collapse' }}>
            <thead className="table-header" style={{ backgroundColor: 'green', color: 'white' }}>
              <tr>
                <th style={{ color: 'white', border: 'none' }}>S/N</th>
                <th style={{ color: 'white', border: 'none' }}>Restaurant’s Name</th>
                <th style={{ color: 'white', border: 'none' }}>SWIFTBALANCE</th>
                <th style={{ color: 'white', border: 'none' }}>AVAILABLE BALANCE</th>
                <th style={{ color: 'white', border: 'none' }}>PAYMENT TOGGLE</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((item, index) => {
                const hasData = item.swiftWallet > 0; // Check if the restaurant has a swift wallet balance
                const serialNumber = (currentPage - 1) * itemsPerPage + index + 1; // Calculate the serial number

                return (
                  <tr
                    key={item._id}
                    className="table-row"
                    style={{ borderBottom: 'none' }}
                  >
                    <td style={{ border: 'none' }}>{serialNumber}</td>
                    <td style={{ border: 'none' }}>
                      <strong>{item.restaurantName}</strong>
                    </td>
                    <td style={{ border: 'none' }}>₦{item.swiftWallet}</td>
                    <td style={{ border: 'none' }}>₦{item.availableBalance}</td>
                    <td className="action-cell" style={{ border: 'none' }}>
                      <span className="action-item cursor-pointer flex items-center gap-3">
                        <Switch isChecked={item.cleared} onChange={() => toggleCleared(item._id)} />
                      </span>
                    </td>
                  </tr>
                );
              })}
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
}
