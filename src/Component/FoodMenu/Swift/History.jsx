import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { Switch } from '@chakra-ui/react';

export default function History() {
  const [data, setData] = useState([
    {
      _id: '1',
      restaurantName: 'Restaurant A',
      wallet: { swiftWallet: 5000, availableBalance: 3000 },
      date: '2024-06-25',
      admin: 'Admin1',
    },
    {
      _id: '2',
      restaurantName: 'Restaurant B',
      wallet: { swiftWallet: 8000, availableBalance: 4500 },
      date: '2024-06-24',
      admin: 'Admin2',
    },
    {
      _id: '3',
      restaurantName: 'Restaurant C',
      wallet: { swiftWallet: 12000, availableBalance: 7000 },
      date: '2024-06-23',
      admin: 'Admin3',
    },
    {
      _id: '4',
      restaurantName: 'Restaurant D',
      wallet: { swiftWallet: 6000, availableBalance: 3500 },
      date: '2024-06-22',
      admin: 'Admin4',
    },
    {
      _id: '5',
      restaurantName: 'Restaurant E',
      wallet: { swiftWallet: 9000, availableBalance: 5000 },
      date: '2024-06-21',
      admin: 'Admin5',
    },
    {
      _id: '6',
      restaurantName: 'Restaurant F',
      wallet: { swiftWallet: 7000, availableBalance: 4000 },
      date: '2024-06-20',
      admin: 'Admin6',
    },
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

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

  const filteredData = data.filter((item) =>
    item.restaurantName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="contain">
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
        </div>
        <div className="table-container" style={{ position: 'relative', minHeight: '300px' }}>
          <table className="table min-w-full" style={{ borderCollapse: 'collapse' }}>
            <thead className="table-header" style={{ backgroundColor: 'green', color: 'white' }}>
              <tr>
                <th style={{ color: 'white', border: 'none' }}>S/N</th>
                <th style={{ color: 'white', border: 'none' }}>Restaurant’s Name</th>
                <th style={{ color: 'white', border: 'none' }}>SWIFTBALANCE</th>
                <th style={{ color: 'white', border: 'none' }}>AVAILABLE BALANCE</th>
                <th style={{ color: 'white', border: 'none' }}>DATE</th>
                <th style={{ color: 'white', border: 'none' }}>ADMIN</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((item, index) => {
                const hasData = item.wallet.swiftWallet > 0; // Check if the restaurant has a swift wallet balance
                const serialNumber = (currentPage - 1) * itemsPerPage + index + 1; // Calculate the serial number

                return (
                  <tr key={item._id} className="table-row cursor-pointer" onClick={() => handleRowClick(item._id, hasData)} style={{ borderBottom: 'none' }}>
                    <td style={{ border: 'none' }}>{serialNumber}</td>
                    <td style={{ border: 'none' }}>
                      <strong>{item.restaurantName}</strong>
                    </td>
                    <td style={{ border: 'none' }}>₦{item.wallet.swiftWallet}</td>
                    <td style={{ border: 'none' }}>₦{item.wallet.availableBalance}</td>
                    <td style={{ border: 'none' }}>{item.date}</td>
                    <td style={{ border: 'none' }}>{item.admin}</td>
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