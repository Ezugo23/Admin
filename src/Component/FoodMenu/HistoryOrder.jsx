import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { FaEdit, FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import axios from 'axios';

export default function History() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`https://delivery-chimelu-new.onrender.com/api/v1/orders/restaurantorderss/${id}`);
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleClick = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleRowClick = (id, hasData) => {
    if (hasData) {
      navigate(`/history-reciept/${id}`);
    }
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleString();
  };

  const filteredData = data.filter((item) =>
    item.restaurantName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="contain" style={{ marginLeft: '20px' }}>
      <div className="header">
        <h2 className="header-title">Food Sellers Payment History</h2>
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
          <table className="table min-w-full" style={{ borderCollapse: 'collapse' }}>
            <thead className="table-header" style={{ backgroundColor: 'green', color: 'white' }}>
              <tr>
                <th style={{ color: 'white', border: 'none' }}>S/N</th>
                <th style={{ color: 'white', border: 'none' }}>DATE TIME</th>
                <th style={{ color: 'white', border: 'none' }}>INVOICE</th>
                <th style={{ color: 'white', border: 'none' }}>DELIVERY IMAGE</th>
                <th style={{ color: 'white', border: 'none' }}>SUM(NGN)</th>
                <th style={{ color: 'white', border: 'none' }}>ORDER STATUS</th>
                <th style={{ color: 'white', border: 'none' }}>PAYMENT TYPE</th>
                <th style={{ color: 'white', border: 'none' }}>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((item, index) => {
                const hasData = item.wallet?.swiftWallet > 0; // Check if the restaurant has a swift wallet balance
                const serialNumber = (currentPage - 1) * itemsPerPage + index + 1; // Calculate the serial number

                return (
                  <tr key={item._id} className="table-row cursor-pointer" onClick={() => handleRowClick(item._id, hasData)} style={{ borderBottom: 'none' }}>
                    <td style={{ border: 'none' }}>{serialNumber}</td>
                    <td style={{ border: 'none' }}>{formatDate(item.orderDate)}</td>
                    <Link to={`/ordersHistory/receipt/${item._id}`} className="invoice-link">
                    <td style={{ border: 'none' }} className="invoice-column">{item.orderId}</td>
                    </Link>
                    <td style={{ border: 'none' }}>
                      {item.assignedDriver ? (
                        <img src={item.assignedDriver.image} alt="Delivery" style={{ width: '50px', height: '50px' }} />
                      ) : (
                        'No Image'
                      )}
                    </td>
                    <td style={{ border: 'none' }}>₦{item.totalAmount}</td>
                    <td style={{ border: 'none' }}>{item.orderStatus}</td>
                    <td style={{ border: 'none' }}>{item.paymentMethod}</td>
                    <td style={{ border: 'none' }}>
                      <Link className="action-item cursor-pointer flex items-center gap-2">
                        <FaEdit /> Edit
                      </Link>
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
