import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import Modal from './modal'; // Import the Modal component
import { SpinnerRoundOutlined } from 'spinners-react';

export default function SentPendingBal() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [selectedItem, setSelectedItem] = useState(null); // State for selected item

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://delivery-chimelu-new.onrender.com/api/v1/restaurantWallet/sent-restaurant-bal');
        setData(response.data.data);
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

  const handleApproveClick = async (id) => {
    try {
      await axios.put(`https://delivery-chimelu-new.onrender.com/api/v1/restaurantWallet/update-restaurant-bal/${id}`);
      setData((prevData) =>
        prevData.map((item) =>
          item._id === id ? { ...item, approved: true } : item
        )
      );
    } catch (error) {
      console.error('Error approving item:', error);
    }
  };

  const handlePayClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  const filteredData = data.filter((item) =>
    item.amountSent.toLowerCase().includes(searchTerm.toLowerCase())
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
          </div>
          <div className="search-container ml-auto">
            <input
              type="text"
              placeholder="Search by Amount"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: "145px",
                height: '30px',
                borderRadius: '10px',
                padding: '5px',
                fontFamily: 'Open Sans',
                fontSize: '16px',
              }}
            />
            <button
              onClick={handlePayClick}
              style={{
                width: "145px",
                height: '30px',
                borderRadius: '10px',
                backgroundColor: '#4CAF50',
                color: "white",
                fontFamily: 'Open Sans',
                fontSize: '16px',
                fontWeight: '600',
                lineHeight: '21.79px',
                marginLeft: '10px'
              }}
            >
              Pay
            </button>
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
                  <th style={{ color: 'white', border: 'none' }}>Invoice</th>
                  <th style={{ color: 'white', border: 'none' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {currentData.map((item) => (
                  <tr key={item._id} className="table-row" style={{ borderBottom: 'none' }}>
                    <td style={{ border: 'none' }}>{new Date(item.createdAt).toLocaleDateString()}</td>
                    <td style={{ border: 'none' }}>₦{item.amountSent}</td>
                    <td style={{ border: 'none' }}>{item._id.slice(-5)}</td>
                    <td style={{ border: 'none' }}>
                      <button
                        onClick={() => handleApproveClick(item._id)}
                        style={{
                          width: "100px",
                          height: '30px',
                          borderRadius: '10px',
                          backgroundColor: item.approved ? '#4CAF50' : '#FFA500',
                          color: "white",
                          fontFamily: 'Open Sans',
                          fontSize: '14px',
                          fontWeight: '600',
                          lineHeight: '21.79px',
                        }}
                        disabled={item.approved}
                      >
                        {item.approved ? 'Approved' : 'Pending'}
                      </button>
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
      {/* Modal Component */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
}
