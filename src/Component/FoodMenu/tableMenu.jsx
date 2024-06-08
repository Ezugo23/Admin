import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Pro from './Pro'
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { faStar } from '@fortawesome/free-solid-svg-icons';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import { FaEdit } from 'react-icons/fa';
import { FaAngleLeft, FaAngleRight, FaTrash } from 'react-icons/fa6';



const data = [
  // Your data array
  { id: 3000, sellerName: "James Samuel Jackson", address: "No 4 Ubajjfjfjfjf Asaba", swiftBalance: "$345.45", totalOrders: 356, withdraw: "$345.55", rating: 1111 },
  { id: 30001, sellerName: "Moon", address: "No 5 Uba Asaba", swiftBalance: "$545.45", totalOrders: 456, withdraw: "$445.55", rating: 2111 },
  { id: 30002, sellerName: "Sun", address: "No 6 Uba Asaba", swiftBalance: "$645.45", totalOrders: 556, withdraw: "$545.55", rating: 3111 },
  { id: 30003, sellerName: "Planet", address: "No 7 Uba Asaba", swiftBalance: "$745.45", totalOrders: 656, withdraw: "$645.55", rating: 4111 },
  { id: 30004, sellerName: "Galaxy", address: "No 8 Uba Asaba", swiftBalance: "$845.45", totalOrders: 756, withdraw: "$745.55", rating: 5111 },
  { id: 30005, sellerName: "Comet", address: "No 9 Uba Asaba", swiftBalance: "$945.45", totalOrders: 856, withdraw: "$845.55", rating: 6111 },
  { id: 30006, sellerName: "Asteroid", address: "No 10 Uba Asaba", swiftBalance: "$1045.45", totalOrders: 956, withdraw: "$945.55", rating: 7111 },
  { id: 30007, sellerName: "Meteor", address: "No 11 Uba Asaba", swiftBalance: "$1145.45", totalOrders: 1056, withdraw: "$1045.55", rating: 8111 },
  { id: 30008, sellerName: "Black Hole", address: "No 12 Uba Asaba", swiftBalance: "$1245.45", totalOrders: 1156, withdraw: "$1145.55", rating: 9111 },
  { id: 30009, sellerName: "Nebula", address: "No 13 Uba Asaba", swiftBalance: "$1345.45", totalOrders: 1256, withdraw: "$1245.55", rating: 10111 },
  { id: 30000, sellerName: "Star", address: "No 4 Uba Asaba", swiftBalance: "$345.45", totalOrders: 356, withdraw: "$345.55", rating: 1111 },
  { id: 30001, sellerName: "Moon", address: "No 5 Uba Asaba", swiftBalance: "$545.45", totalOrders: 456, withdraw: "$445.55", rating: 2111 },
  { id: 30002, sellerName: "Sun", address: "No 6 Uba Asaba", swiftBalance: "$645.45", totalOrders: 556, withdraw: "$545.55", rating: 3111 },
  { id: 30003, sellerName: "Planet", address: "No 7 Uba Asaba", swiftBalance: "$745.45", totalOrders: 656, withdraw: "$645.55", rating: 4111 },
  { id: 30004, sellerName: "Galaxy", address: "No 8 Uba Asaba", swiftBalance: "$845.45", totalOrders: 756, withdraw: "$745.55", rating: 5111 },
  { id: 30005, sellerName: "Comet", address: "No 9 Uba Asaba", swiftBalance: "$945.45", totalOrders: 856, withdraw: "$845.55", rating: 6111 },
  { id: 30006, sellerName: "Asteroid", address: "No 10 Uba Asaba", swiftBalance: "$1045.45", totalOrders: 956, withdraw: "$945.55", rating: 7111 },
  { id: 30007, sellerName: "Meteor", address: "No 11 Uba Asaba", swiftBalance: "$1145.45", totalOrders: 1056, withdraw: "$1045.55", rating: 8111 },
  { id: 30008, sellerName: "Black Hole", address: "No 12 Uba Asaba", swiftBalance: "$1245.45", totalOrders: 1156, withdraw: "$1145.55", rating: 9111 },
  { id: 30009, sellerName: "Nebula", address: "No 13 Uba Asaba", swiftBalance: "$1345.45", totalOrders: 1256, withdraw: "$1245.55", rating: 10111 },
  { id: 30000, sellerName: "Star", address: "No 4 Uba Asaba", swiftBalance: "$345.45", totalOrders: 356, withdraw: "$345.55", rating: 1111 },
  { id: 30001, sellerName: "Moon", address: "No 5 Uba Asaba", swiftBalance: "$545.45", totalOrders: 456, withdraw: "$445.55", rating: 2111 },
  { id: 30002, sellerName: "Sun", address: "No 6 Uba Asaba", swiftBalance: "$645.45", totalOrders: 556, withdraw: "$545.55", rating: 3111 },
  { id: 30003, sellerName: "Planet", address: "No 7 Uba Asaba", swiftBalance: "$745.45", totalOrders: 656, withdraw: "$645.55", rating: 4111 },

];

export default function TableMenu() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handleClick = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const currentData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

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
          <label>Show 
            <select className="ml-2">
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
                <th>ID</th>
                <th>SELLER NAME</th>
                <th>SWIFTBALANCE</th>
                <th>TOTAL ORDERS</th>
                <th>WITHDRAW</th>
                <th>RATING</th>
                <th>STATUS</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((item) => (
                <tr key={item.id} className="table-row">
                  <td>{item.id}</td>
                  <td >
                          <strong>{item.sellerName}</strong>
                          <br />
                          {item.address}
                        </td>
                  <td>{item.swiftBalance}</td>
                  <td>{item.totalOrders}</td>
                  <td>{item.withdraw}</td>
                  <td>{item.rating}</td>
                  <td >
                          <button className="w-[80px] h-[25px] font-roboto font-normal text-[12px] leading-[14.06px] text-center text-[#4DB6AC] border border-[#4DB6AC] rounded-md active:bg-[#4DB6AC]">
                            save
                          </button>
                        </td>
                  <td className="action-cell">
                    <Link     to={'menu/personal'}>
                    <span className="action-item cursor-pointer flex items-center gap-3">
                      <FaEdit /> 
                    </span>
                    </Link>
                    <span className="action-item cursor-pointer flex items-center gap-3">
                      <FaTrash /> 
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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