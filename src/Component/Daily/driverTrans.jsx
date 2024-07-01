import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { SpinnerRoundOutlined } from 'spinners-react';

const DriverTrans = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://delivery-chimelu-new.onrender.com/api/v1/restaurant/');
        setData(response.data.restaurants);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    const timer = setTimeout(() => {
      setLoading(false);
    }, 4000); // Set the timer to 4 seconds

    return () => clearTimeout(timer);
  }, []);

  const handleClick = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const filteredData = data.filter((item) =>
    item.restaurantName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <>
      <div className="p-6 pb-0" style={{ marginTop: "-30px" }}>
        <div className="grid mt-3 grid-cols-4 gap-3">
          {[
            {
              key: 'pending',
              text: 'Total Drivers Wallet',
              color: '#4CAF50',
              // icon: <p className="top">33%</p>,
            },
            {
              key: 'confirm',
              text: 'Total Paid',
              color: '#348238',
              // icon: <p className="top2">33%</p>,
            },
          ].map((data, index) => (
            <div
              key={index}
              className="p-7 text-black flex flex-col justify-end items-start rounded-xl  shadow-lg"
              style={{ backgroundColor: 'white', borderColor: data.color, borderWidth: 1 }}
            >
              <div className="flex flex-col items-start">
                <p className="text-xl font-bold">3</p>
                <p className="text-13 font-bold">{data.text}</p>
              </div>
              {data.icon && <div className="absolute top-4 right-4">{data.icon}</div>}
            </div>
          ))}
        </div>
      </div>

      <div className="contain">
        <div className="main-container">
          <div className="entries-container mb-4">
            <div>
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
            </div>
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
                    <th style={{ color: 'white', border: 'none' }}>Date</th>
                    <th style={{ color: 'white', border: 'none' }}>Amount</th>
                    <th style={{ color: 'white', border: 'none' }}>Total Orders</th>
                    <th style={{ color: 'white', border: 'none' }}>Total Drivers</th>
                  </tr>
                </thead>
                <tbody>
                  {currentData.map((item) => (
                    <tr key={item._id} className="table-row" style={{ borderBottom: 'none' }}>
                      <td style={{ border: 'none' }}>
                        <strong>{item.restaurantName}</strong>
                        <br />
                        {item.address}
                      </td>
                      <td style={{ border: 'none' }}>${item.wallet.availableBalance}</td>
                      <td style={{ border: 'none' }}>{item.totalOrders}</td>
                      <td style={{ border: 'none' }}>${item.wallet.swiftWallet}</td>
                      {/* <td style={{ border: 'none' }}>{item.averageRating}</td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
          <div className="pagination-con">
            <span className="text-gray-600">
              Showing {Math.min(currentPage * itemsPerPage - itemsPerPage + 1, data.length)}-
              {Math.min(currentPage * itemsPerPage, data.length)} of {data.length} data
            </span>
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
    </>
  );
};

export default DriverTrans;
