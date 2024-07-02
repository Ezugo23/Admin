import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { SpinnerRoundOutlined } from 'spinners-react';

const DriverTrans = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);
  const [walletData, setWalletData] = useState({ totalWalletBalance: 0, totalPaidMoney: 0 });
  const [walletLoading, setWalletLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://delivery-chimelu-new.onrender.com/api/v1/driver/update/driver-sales');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    const fetchWalletData = async () => {
      try {
        const response = await axios.get('https://delivery-chimelu-new.onrender.com/api/v1/wallet/calculate/balance-and-paid');
        setWalletData(response.data);
      } catch (error) {
        console.error('Error fetching wallet data:', error);
      } finally {
        setWalletLoading(false);
      }
    };

    fetchData();
    fetchWalletData();
  }, []);

  const handleClick = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const filteredData = data.filter((item) =>
    item.date.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <>
      <div className="p-6 pb-0" style={{ marginTop: "-30px" }}>
        <div className="grid mt-3 grid-cols-2 gap-6">
          {[
            {
              key: 'totalWalletBalance',
              text: 'Total Drivers Wallet',
              value: walletData.totalWalletBalance,
              color: '#4CAF50',
            },
            {
              key: 'totalPaidMoney',
              text: 'Total Paid',
              value: walletData.totalPaidMoney,
              color: '#348238',
            },
          ].map((data, index) => (
            <div
              key={index}
              className="p-7 text-black flex flex-col justify-center items-start rounded-xl shadow-lg"
              style={{ backgroundColor: 'white', borderColor: data.color, borderWidth: 1 }}
            >
              {walletLoading ? (
                <SpinnerRoundOutlined size={50} color={data.color} />
              ) : (
                <>
                  <p className="text-2xl font-bold">₦{data.value}</p>
                  <p className="text-xl font-semibold">{data.text}</p>
                </>
              )}
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
            ) : error ? (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <p>{error}</p>
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
                      <td style={{ border: 'none' }}>{formatDate(item.date)}</td>
                      <td style={{ border: 'none' }}>₦{item.totalSales}</td>
                      <td style={{ border: 'none' }}>{item.totalOrders}</td>
                      <td style={{ border: 'none' }}>{item.totalDrivers}</td>
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
