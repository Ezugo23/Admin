import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaEdit, FaTrash, FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { RiErrorWarningLine } from 'react-icons/ri';
import { Switch } from '@chakra-ui/react';
import { SpinnerRoundOutlined } from 'spinners-react';

export default function TableMenu() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const adminId = localStorage.getItem('adminId');
      if (!adminId) {
        navigate('/Login');
        return;
      }
      const storedData = localStorage.getItem('restaurantData');
      if (storedData) {
        setData(JSON.parse(storedData));
        setLoading(false);
      } else {
        try {
          const response = await axios.get('https://delivery-chimelu-new.onrender.com/api/v1/restaurant/');
          const fetchedData = response.data.restaurants;
          setData(fetchedData);
          localStorage.setItem('restaurantData', JSON.stringify(fetchedData));
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();

    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // Set the timer to 3 seconds (3000 milliseconds)

    return () => clearTimeout(timer);
  }, []);

  const handleClick = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleRowClick = (id, hasData) => {
    if (hasData) {
      navigate(`menu/${id}/personal/${id}`);
    }
  };

  const handleApprove = async (id) => {
    try {
      await axios.patch(`https://delivery-chimelu-new.onrender.com/api/v1/approve-restaurant/${id}`);
      // Fetch updated data
      const response = await axios.get('https://delivery-chimelu-new.onrender.com/api/v1/restaurant/');
      setData(response.data.restaurants);
      localStorage.setItem('restaurantData', JSON.stringify(response.data.restaurants));
    } catch (error) {
      console.error('Error approving restaurant:', error);
    }
  };

  const handleToggleStatus = async (id) => {
    try {
      await axios.patch(`https://delivery-chimelu-new.onrender.com/api/v1/${id}/toggle-restaurant-status`);
      // Fetch updated data
      const response = await axios.get('https://delivery-chimelu-new.onrender.com/api/v1/restaurant/');
      setData(response.data.restaurants);
      localStorage.setItem('restaurantData', JSON.stringify(response.data.restaurants));
    } catch (error) {
      console.error('Error toggling restaurant status:', error);
    }
  };

  const handleToggleAvailability = async (id, isAvailable) => {
    try {
      await axios.patch(`https://delivery-chimelu-new.onrender.com/api/v1/restaurant/available/${id}`, {
        isAvailable: !isAvailable
      });
      // Fetch updated data
      const response = await axios.get('https://delivery-chimelu-new.onrender.com/api/v1/restaurant/');
      setData(response.data.restaurants);
      localStorage.setItem('restaurantData', JSON.stringify(response.data.restaurants));
    } catch (error) {
      console.error('Error toggling availability:', error);
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
        <h2 className="header-title">Food Sellers List</h2>
        <span className="add-admin-btn">
          + Add New Restaurant
        </span>
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
            <label htmlFor="search">Search:</label>
            <input
              id="search"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="table-container" style={{ position: 'relative', minHeight: '300px' }}>
          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <SpinnerRoundOutlined size={50} color="green" />
            </div>
          ) : (
            <table className="table min-w-full" style={{ borderCollapse: 'collapse' }}>
              <thead className="table-header" style={{ backgroundColor: 'green', color: 'white' }}>
                <tr>
                  <th style={{ color: 'white', border: 'none' }}>S/N</th>
                  <th style={{ color: 'white', border: 'none' }}>SELLER NAME</th>
                  <th style={{ color: 'white', border: 'none' }}>SWIFTBALANCE</th>
                  <th style={{ color: 'white', border: 'none' }}>TOTAL ORDERS</th>
                  <th style={{ color: 'white', border: 'none' }}>AVAILABLE BALANCE</th>
                  <th style={{ color: 'white', border: 'none' }}>RATING</th>
                  <th style={{ color: 'white', border: 'none' }}>STATUS</th>
                  <th style={{ color: 'white', border: 'none' }}>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {currentData.map((item, index) => {
                  const hasData = item.totalOrders > 0 || item.totalItems > 0; // Check if the restaurant has orders or items
                  const serialNumber = (currentPage - 1) * itemsPerPage + index + 1; // Calculate the serial number

                  let statusText = 'Pending';
                  let statusColorClass = 'bg-orange-500 text-white';

                  if (item.approved) {
                    if (item.isActive) {
                      statusText = 'Active';
                      statusColorClass = 'bg-green-500 text-white';
                    } else {
                      statusText = 'Suspended';
                      statusColorClass = 'bg-red-500 text-white';
                    }
                  }

                  return (
                    <tr key={item._id} className="table-row cursor-pointer" onClick={() => handleRowClick(item._id, hasData)} style={{ borderBottom: 'none' }}>
                      <td style={{ border: 'none' }}>{serialNumber}</td>
                      <td style={{ border: 'none' }}>
                        <strong>{item.restaurantName}</strong>
                        <br />
                        {item.address}
                      </td>
                      <td style={{ border: 'none' }}>₦{item.wallet.swiftWallet}</td>
                      <td style={{ border: 'none' }}>{item.totalOrders}</td>
                      <td style={{ border: 'none' }}>₦{item.wallet.availableBalance}</td>
                      <td style={{ border: 'none' }}>{item.averageRating}</td>
                      <td style={{ border: 'none' }}>
                        <button className={`w-[80px] h-[25px] font-roboto font-normal text-[12px] leading-[14.06px] text-center border rounded-md ${statusColorClass}`}>
                          {statusText}
                        </button>
                      </td>
                      <td className="action-cell" style={{ border: 'none' }}>
                        <span
                          className="action-item cursor-pointer flex items-center gap-3"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Switch
                            isChecked={item.isAvailable}
                            onChange={() => handleToggleAvailability(item._id, item.isAvailable)}
                          />
                        </span>
                        <span
                          className={`action-item cursor-pointer flex items-center gap-3 ${!hasData ? 'opacity-50 cursor-not-allowed' : ''}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            item.approved ? handleToggleStatus(item._id) : handleApprove(item._id);
                          }}
                        >
                          <RiErrorWarningLine size={20} />
                        </span>
                        <span
                          className="action-item cursor-pointer flex items-center gap-3"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <FaTrash size={15} />
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
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