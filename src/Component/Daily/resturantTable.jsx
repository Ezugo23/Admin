import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
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
      try {
        const response = await axios.get('https://delivery-chimelu-new.onrender.com/api/v1/restaurantWallet/all-transaction');
        setData(response.data.transactions);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    const timer = setTimeout(() => {
      setLoading(false);
    }, 4000); // Set the timer to 4 seconds (4000 milliseconds)

    return () => clearTimeout(timer);
  }, []);

  const handleClick = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const filteredData = data.filter((item) =>
    (item.admin?.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.admin?.email?.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
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
            <p
              style={{
                fontFamily: 'Open Sans, sans-serif',
                fontWeight: 600,
                fontSize: '16px',
                lineHeight: '21.79px',
                textAlign: 'right',
                color: '#000000',
                marginTop: "30px"
              }}
            >
              Daily Total Moved Swift Amount
            </p>
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
                  <th style={{ color: 'white', border: 'none' }}>Transaction Id</th>
                  <th style={{ color: 'white', border: 'none' }}>Name Of Admin</th>
                </tr>
              </thead>
              <tbody>
                {currentData.map((item) => (
                  <tr key={item._id} className="table-row" style={{ borderBottom: 'none' }}>
                    <td style={{ border: 'none' }}>{new Date(item.createdAt).toLocaleDateString()}</td>
                    <td style={{ border: 'none' }}>₦{item.amountMoved}</td>
                    <td style={{ border: 'none' }}>{item.totalOrders}</td>
                    <td style={{ border: 'none' }}>{item.invoiceID}</td>
                    <td style={{ border: 'none' }}>
                      {item.admin ? `${item.admin.username} (${item.admin.email})` : 'Anonymous'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <div className="pagination-con">
          <span className="text-gray-600">Showing {Math.min(currentPage * itemsPerPage - itemsPerPage + 1, data.length)}-{Math.min(currentPage * itemsPerPage, data.length)} of {data.length} data</span>
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
