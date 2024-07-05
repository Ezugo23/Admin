import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  FaEdit,
  FaTrash,
  FaAngleLeft,
  FaAngleRight,
  FaPlus,
} from 'react-icons/fa';
import { RiErrorWarningLine } from 'react-icons/ri';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './administrators/styles/users.css';

const Users = () => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await axios.get(
          'https://delivery-chimelu-new.onrender.com/api/v1/admin/'
        );
        setAdmins(response.data.admins);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAdmins();
  }, []);

  const handleClick = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleToggleStatus = async (adminId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(
        `https://delivery-chimelu-new.onrender.com/api/v1/${adminId}/toggle-admin-status`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAdmins((prevAdmins) =>
        prevAdmins.map((admin) =>
          admin._id === adminId
            ? { ...admin, approved: !admin.approved }
            : admin
        )
      );
    } catch (err) {
      if (err.response && err.response.status === 401) {
        toast.error('Admin not authorized');
      } else {
        setError(err.message);
      }
    }
  };

  const handleDelete = async (adminId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(
        `https://delivery-chimelu-new.onrender.com/api/v1/admin/${adminId}/delete`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAdmins((prevAdmins) =>
        prevAdmins.filter((admin) => admin._id !== adminId)
      );
      toast.success('Admin deleted successfully');
    } catch (err) {
      if (err.response && err.response.status === 401) {
        toast.error('Admin not authorized');
      } else {
        setError(err.message);
      }
    }
  };

  const filteredData = admins.filter(
    (admin) =>
      admin.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.lastname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const filteredAdmins = admins.filter((admin) =>
    admin.username.toLowerCase().includes(searchTerm.toLowerCase())
  );
  // const currentAdmins = filteredAdmins.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="contain">
      <ToastContainer />
      <div className="header">
        <h2 className="header-title">Administrators</h2>
        <span className="add-admin-btn">
          <FaPlus />
          Add a New Admin
        </span>
      </div>
      <div className="main-container">
        <div className="entries-container mb-4">
          <label>
            Show
            <select
              className="ml-2"
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
            >
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
        <div className="table-container">
          <table className="table min-w-full">
            <thead className="table-header">
              <tr>
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
              {currentData.map((admin, index) => (
                <tr key={admin._id} className="table-row">
                  <td>
                    <img src={admin.image} alt="Profile" className="image" />
                  </td>
                  <td>
                    <div className="name-phone-container">
                      <div className="text-sm">
                        <div className="!text-sm">
                          {admin.firstname} {admin.lastname}
                        </div>
                        <div className="text-gray-500 text-sm">
                          {admin.phoneNumber}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{admin.username}</td>
                  <td>{admin.email}</td>
                  <td>{admin.roles.join(', ')}</td>
                  <td>
                    <span
                      className={`status ${
                        admin.approved ? 'status-active' : 'status-inactive'
                      }`}
                    >
                      {admin.approved ? 'Active' : 'On Hold'}
                    </span>
                  </td>
                  <td className="action-cell">
                    <span
                      className="action-item cursor-pointer flex items-center gap-3"
                      onClick={() => handleToggleStatus(admin._id)}
                    >
                      <RiErrorWarningLine size={20} />
                    </span>
                    <span
                      className="action-item text-sm cursor-pointer flex items-center gap-3"
                      onClick={() => handleDelete(admin._id)}
                    >
                      <FaTrash />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="pagination-con">
          <span className="text-gray-600">
            Showing{' '}
            {Math.min(
              currentPage * itemsPerPage - itemsPerPage + 1,
              filteredData.length
            )}
            -{Math.min(currentPage * itemsPerPage, filteredData.length)} of{' '}
            {filteredData.length} entries
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
                className={`px-3 py-1 mx-1 rounded ${
                  currentPage === i + 1
                    ? 'bg-green-500 text-white'
                    : 'hover:bg-gray-300'
                }`}
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
};

export default Users;
