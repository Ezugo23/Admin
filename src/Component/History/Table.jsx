import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaAngleLeft, FaAngleRight, FaEdit } from 'react-icons/fa';
import './Order.css'

const data = [
  { id: 3000, Date: '2023-05-15', Time: '10:30 AM', client: "James Samuel Jackson", address: "No 4 Ubajjfjfjfjf Asaba", seller: "$345.45", invoice: "W404DFG434", driver: { name: "John Doe", image: '/Bitmap (1).png' }, fee: 1111 },
  { id: 3000, Date: '2023-05-15', Time: '10:30 AM', client: "James Samuel Jackson", address: "No 4 Ubajjfjfjfjf Asaba", seller: "$345.45", invoice: "W404DFG434", driver: { name: "John Doe", image: '/Bitmap (1).png' }, fee: 1111 },
  { id: 3000, Date: '2023-05-15', Time: '10:30 AM', client: "James Samuel Jackson", address: "No 4 Ubajjfjfjfjf Asaba", seller: "$345.45", invoice: "W404DFG434", driver: { name: "John Doe", image: '/Bitmap (1).png' }, fee: 1111 },
  { id: 3000, Date: '2023-05-15', Time: '10:30 AM', client: "James Samuel Jackson", address: "No 4 Ubajjfjfjfjf Asaba", seller: "$345.45", invoice: "W404DFG434", driver: { name: "John Doe", image: '/Bitmap (1).png' }, fee: 1111 },
  { id: 3000, Date: '2023-05-15', Time: '10:30 AM', client: "James Samuel Jackson", address: "No 4 Ubajjfjfjfjf Asaba", seller: "$345.45", invoice: "W404DFG434", driver: { name: "John Doe", image: '/Bitmap (1).png' }, fee: 1111 },
  { id: 3000, Date: '2023-05-15', Time: '10:30 AM', client: "James Samuel Jackson", address: "No 4 Ubajjfjfjfjf Asaba", seller: "$345.45", invoice: "W404DFG434", driver: { name: "John Doe", image: '/Bitmap (1).png' }, fee: 1111 },
  { id: 3000, Date: '2023-05-15', Time: '10:30 AM', client: "James Samuel Jackson", address: "No 4 Ubajjfjfjfjf Asaba", seller: "$345.45", invoice: "W404DFG434", driver: { name: "John Doe", image: '/Bitmap (1).png' }, fee: 1111 },
  { id: 3000, Date: '2023-05-15', Time: '10:30 AM', client: "James Samuel Jackson", address: "No 4 Ubajjfjfjfjf Asaba", seller: "$345.45", invoice: "W404DFG434", driver: { name: "John Doe", image: '/Bitmap (1).png' }, fee: 1111 },
  { id: 3000, Date: '2023-05-15', Time: '10:30 AM', client: "James Samuel Jackson", address: "No 4 Ubajjfjfjfjf Asaba", seller: "$345.45", invoice: "W404DFG434", driver: { name: "John Doe", image: '/Bitmap (1).png' }, fee: 1111 },
  { id: 3000, Date: '2023-05-15', Time: '10:30 AM', client: "James Samuel Jackson", address: "No 4 Ubajjfjfjfjf Asaba", seller: "$345.45", invoice: "W404DFG434", driver: { name: "John Doe", image: '/Bitmap (1).png' }, fee: 1111 },
  { id: 3000, Date: '2023-05-15', Time: '10:30 AM', client: "James Samuel Jackson", address: "No 4 Ubajjfjfjfjf Asaba", seller: "$345.45", invoice: "W404DFG434", driver: { name: "John Doe", image: '/Bitmap (1).png' }, fee: 1111 },
  { id: 3000, Date: '2023-05-15', Time: '10:30 AM', client: "James Samuel Jackson", address: "No 4 Ubajjfjfjfjf Asaba", seller: "$345.45", invoice: "W404DFG434", driver: { name: "John Doe", image: '/Bitmap (1).png' }, fee: 1111 },
  { id: 3000, Date: '2023-05-15', Time: '10:30 AM', client: "James Samuel Jackson", address: "No 4 Ubajjfjfjfjf Asaba", seller: "$345.45", invoice: "W404DFG434", driver: { name: "John Doe", image: '/Bitmap (1).png' }, fee: 1111 },
  { id: 3000, Date: '2023-05-15', Time: '10:30 AM', client: "James Samuel Jackson", address: "No 4 Ubajjfjfjfjf Asaba", seller: "$345.45", invoice: "W404DFG434", driver: { name: "John Doe", image: '/Bitmap (1).png' }, fee: 1111 },
  { id: 3000, Date: '2023-05-15', Time: '10:30 AM', client: "James Samuel Jackson", address: "No 4 Ubajjfjfjfjf Asaba", seller: "$345.45", invoice: "W404DFG434", driver: { name: "John Doe", image: '/Bitmap (1).png' }, fee: 1111 },
  { id: 3000, Date: '2023-05-15', Time: '10:30 AM', client: "James Samuel Jackson", address: "No 4 Ubajjfjfjfjf Asaba", seller: "$345.45", invoice: "W404DFG434", driver: { name: "John Doe", image: '/Bitmap (1).png' }, fee: 1111 },
  { id: 3000, Date: '2023-05-15', Time: '10:30 AM', client: "James Samuel Jackson", address: "No 4 Ubajjfjfjfjf Asaba", seller: "$345.45", invoice: "W404DFG434", driver: { name: "John Doe", image: '/Bitmap (1).png' }, fee: 1111 },
  { id: 3000, Date: '2023-05-15', Time: '10:30 AM', client: "James Samuel Jackson", address: "No 4 Ubajjfjfjfjf Asaba", seller: "$345.45", invoice: "W404DFG434", driver: { name: "John Doe", image: '/Bitmap (1).png' }, fee: 1111 },
  { id: 3000, Date: '2023-05-15', Time: '10:30 AM', client: "James Samuel Jackson", address: "No 4 Ubajjfjfjfjf Asaba", seller: "$345.45", invoice: "W404DFG434", driver: { name: "John Doe", image: '/Bitmap (1).png' }, fee: 1111 },
  { id: 3000, Date: '2023-05-15', Time: '10:30 AM', client: "James Samuel Jackson", address: "No 4 Ubajjfjfjfjf Asaba", seller: "$345.45", invoice: "W404DFG434", driver: { name: "John Doe", image: '/Bitmap (1).png' }, fee: 1111 },
  { id: 3000, Date: '2023-05-15', Time: '10:30 AM', client: "James Samuel Jackson", address: "No 4 Ubajjfjfjfjf Asaba", seller: "$345.45", invoice: "W404DFG434", driver: { name: "John Doe", image: '/Bitmap (1).png' }, fee: 1111 },
  { id: 3000, Date: '2023-05-15', Time: '10:30 AM', client: "James Samuel Jackson", address: "No 4 Ubajjfjfjfjf Asaba", seller: "$345.45", invoice: "W404DFG434", driver: { name: "John Doe", image: '/Bitmap (1).png' }, fee: 1111 },
  { id: 3000, Date: '2023-05-15', Time: '10:30 AM', client: "James Samuel Jackson", address: "No 4 Ubajjfjfjfjf Asaba", seller: "$345.45", invoice: "W404DFG434", driver: { name: "John Doe", image: '/Bitmap (1).png' }, fee: 1111 },
  { id: 3000, Date: '2023-05-15', Time: '10:30 AM', client: "James Samuel Jackson", address: "No 4 Ubajjfjfjfjf Asaba", seller: "$345.45", invoice: "W404DFG434", driver: { name: "John Doe", image: '/Bitmap (1).png' }, fee: 1111 },
  { id: 3000, Date: '2023-05-15', Time: '10:30 AM', client: "James Samuel Jackson", address: "No 4 Ubajjfjfjfjf Asaba", seller: "$345.45", invoice: "W404DFG434", driver: { name: "John Doe", image: '/Bitmap (1).png' }, fee: 1111 },
  { id: 3000, Date: '2023-05-15', Time: '10:30 AM', client: "James Samuel Jackson", address: "No 4 Ubajjfjfjfjf Asaba", seller: "$345.45", invoice: "W404DFG434", driver: { name: "John Doe", image: '/Bitmap (1).png' }, fee: 1111 },
  { id: 3000, Date: '2023-05-15', Time: '10:30 AM', client: "James Samuel Jackson", address: "No 4 Ubajjfjfjfjf Asaba", seller: "$345.45", invoice: "W404DFG434", driver: { name: "John Doe", image: '/Bitmap (1).png' }, fee: 1111 },
  { id: 3000, Date: '2023-05-15', Time: '10:30 AM', client: "James Samuel Jackson", address: "No 4 Ubajjfjfjfjf Asaba", seller: "$345.45", invoice: "W404DFG434", driver: { name: "John Doe", image: '/Bitmap (1).png' }, fee: 1111 },
  { id: 3000, Date: '2023-05-15', Time: '10:30 AM', client: "James Samuel Jackson", address: "No 4 Ubajjfjfjfjf Asaba", seller: "$345.45", invoice: "W404DFG434", driver: { name: "John Doe", image: '/Bitmap (1).png' }, fee: 1111 },
];

export default function Table() {
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
                <th>Date, Time</th>
                <th>Client</th>
                <th>Seller</th>
                <th>Invoice</th>
                <th>Driver</th>
                <th>Fee</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((item) => (
                <tr key={item.id} className="table-row">
                  <td>{item.id}</td>
                  <td>
                    <strong>{item.Date}</strong>
                    <br />
                    {item.Time}
                  </td>
                  <td>{item.client}</td>
                  <td>{item.seller}</td>
                  <td className='link'>
                    <Link to={`/invoice/${item.invoice}`}>
                      {item.invoice}
                    </Link>
                  </td>
                  <td>
                    <div className="flex items-center">
                      <img src={item.driver.image} alt={item.driver.name} className="w-8 h-8 rounded-full mr-2" />
                      {item.driver.name}
                    </div>
                  </td>
                  <td>{item.fee}</td>
                  <td className="action-cell">
                    <Link to={'menu/personal'}>
                      <span className="action-item cursor-pointer flex items-center gap-3">
                        <FaEdit />
                      </span>
                    </Link>
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