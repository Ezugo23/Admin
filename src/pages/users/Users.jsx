// src/components/AdminTable.js
import React, { useState } from 'react';
import './administrators/styles/users.css';  // Import the custom styles
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';  // Import icons from react-icons
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

const Users = () => {
  const [admins] = useState([
    {
      id: '03DR456',
      image: 'https://via.placeholder.com/40',
      name: 'John Cage',
      phone: '+1 (266) 314-5642',
      username: 'ampreduzo',
      email: 'info@yourmail.com',
      role: 'Super Admin',
      status: 'Active',
    },
    {
      id: '25DFR3',
      image: 'https://via.placeholder.com/40',
      name: 'Linda Bernstein',
      phone: '+1 (366) 314-2345',
      username: 'lindabern',
      email: 'name@yourmail.com',
      role: 'Admin',
      status: 'Active',
    },
    {
      id: '4RT56FD',
      image: 'https://via.placeholder.com/40',
      name: 'Natalie Vachini',
      phone: '+1 (366) 214-7890',
      username: 'natashkela',
      email: 'support@yourmail.com',
      role: 'Support',
      status: 'Active',
    },
  ]);

  return (
    <div className="contain">
      <div className="header">
        <h2 className="header-title">Administrators</h2>
        <span className="add-admin-btn">
          <FaPlus />
          Add a New Admin
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
                <th>IMAGES</th>
                <th>NAME, PHONE</th>
                <th>USERNAME</th>
                <th>EMAIL</th>
                <th>ROLE</th>
                <th>STATUS</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {admins.map((admin) => (
                <tr key={admin.id} className="table-row">
                  <td>{admin.id}</td>
                  <td>
                    <img
                      src={admin.image}
                      alt="Profile"
                      className="image"
                    />
                  </td>
                  <td>
                    <div className="name-phone-container">
                      <div className="text-sm">
                        <div className="!text-sm">{admin.name}</div>
                        <div className="text-gray-500 text-sm">{admin.phone}</div>
                      </div>
                    </div>
                  </td>
                  <td>{admin.username}</td>
                  <td>{admin.email}</td>
                  <td>{admin.role}</td>
                  <td>
                    <span className={`status ${admin.status === 'Active' ? 'status-active' : 'status-inactive'}`}>
                      {admin.status}
                    </span>
                  </td>
                  <td className="action-cell">
                    <span className="action-item  cursor-pointer flex items-center gap-3">
                      <FaEdit /> Edit
                    </span>
                    <span className="action-item  text-sm  cursor-pointer flex items-center gap-3">
                      <FaTrash /> Delete
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="pagination-con">
          <span className="text-gray-600">Showing 1-10 from 100 data</span>
          <div className="pagination flex items-center">
            <button className="px-3 py-1 mx-1  rounded hover:bg-gray-300">
              <FaAngleLeft />
            </button>
            <button className="px-3 py-1 mx-1  rounded hover:bg-gray-300 inactive">
              1
            </button>
            <button className="px-3 py-1 mx-1 bg-green-500 text-white rounded hover:bg-green-600 active">
              2
            </button>
            <button className="px-3 py-1 mx-1  rounded hover:bg-gray-300 inactive">
              3
            </button>
            <button className="px-3 py-1 mx-1  rounded hover:bg-gray-300">
              <FaAngleRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
