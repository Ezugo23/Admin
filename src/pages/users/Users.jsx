import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash, FaAngleLeft, FaAngleRight, FaPlus } from 'react-icons/fa';
import { RiErrorWarningLine } from 'react-icons/ri';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import Modal from './Modal';

const Users = () => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdmins = async () => {
      const adminId = localStorage.getItem('adminId');
      if (!adminId) {
        navigate('/Login');
        return;
      }
      try {
        const response = await axios.get('https://delivery-chimelu-new.onrender.com/api/v1/admin/');
        setAdmins(response.data.admins);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAdmins();
  }, [navigate]);

  const handleAddRoleClick = (admin) => {
    console.log("Clicked on admin: ", admin);
    setSelectedAdmin(admin);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedAdmin(null);
  };

  const handleSaveRole = async ({ roles }) => {
    console.log("Saving roles: ", roles);
    if (!selectedAdmin || !roles) {
      console.log("Admin or roles missing.");
      return;
    }
    try {
      const token = localStorage.getItem('token');
      await axios.patch(
        `http://localhost:8080/api/v1/admin/${selectedAdmin._id}`,
        { roles },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAdmins((prevAdmins) =>
        prevAdmins.map((admin) =>
          admin._id === selectedAdmin._id ? { ...admin, roles } : admin
        )
      );
      setShowModal(false);
    } catch (error) {
      console.error('Error updating roles:', error);
    }
  };
  

  const handleToggleStatus = async (adminId) => {
    try {
      const admin = admins.find(admin => admin._id === adminId);
      const newStatus = !admin.approved;
      const token = localStorage.getItem('token');
      await axios.patch(
        `http://localhost:8080/api/v1/admin/${adminId}`,
        { approved: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAdmins(prevAdmins =>
        prevAdmins.map(admin =>
          admin._id === adminId ? { ...admin, approved: newStatus } : admin
        )
      );
      toast.success('Status updated successfully');
    } catch (err) {
      toast.error('Error updating status');
    }
  };

  const handleDelete = async (adminId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:8080/api/v1/admin/${adminId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAdmins(prevAdmins => prevAdmins.filter(admin => admin._id !== adminId));
      toast.success('Admin deleted successfully');
    } catch (err) {
      toast.error('Error deleting admin');
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
              {currentData.map((admin) => (
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
                      className="action-item cursor-pointer"
                      onClick={() => handleAddRoleClick(admin)}
                    >
                      <FaEdit size={20} />
                    </span>
                    <span
                      className="action-item cursor-pointer"
                      onClick={() => handleDelete(admin._id)}
                    >
                      <FaTrash size={20} />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="pagination-container">
          <button
            className="pagination-button"
            onClick={() => handleClick(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <FaAngleLeft />
          </button>
          <span className="pagination-text">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="pagination-button"
            onClick={() => handleClick(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <FaAngleRight />
          </button>
        </div>
      </div>
      {showModal && (
        <Modal
          selectedAdmin={selectedAdmin}
          handleCloseModal={handleCloseModal}
          handleSaveRole={handleSaveRole}
        />
      )}
    </div>
  );
};

export default Users;
