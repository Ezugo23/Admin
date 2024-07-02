import React, { useEffect, useState } from 'react';
import '../administrators/styles/users.css';
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';
import PaginationButton from './paginationButton';
import SuspendModal from './SuspendModal';
import { Link } from 'react-router-dom';

const AllUsers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const itemsPerPage = 10;
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError('');
      }, 3000);
    }
  }, [error]);

  const getAllUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://delivery-chimelu-new.onrender.com/api/v1/user/profile/`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();
      setAllUsers(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching all users:', error);
      setLoading(false);
      setError('Failed to fetch data. Please try again.');
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const filteredAdmins = allUsers.filter((admin) =>
    admin.firstname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentAdmins = filteredAdmins.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <div className="contain">
        <div className="header">
          <h2 className="header-title">All Users</h2>
          <span className="add-admin-btn">
            <FaPlus />
            Add a New User
          </span>
        </div>
        <div className="main-container">
          {error && (
            <p className="text-center  text-base text-red-800">{error}</p>
          )}
          {loading && <p className="text-center">Loading...</p>}
          <div className="entries-container mb-4">
            <label>
              Show
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
              <input
                id="search"
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
          </div>
          <div className="table-container">
            <table className="table min-w-full">
              <thead className="table-header">
                <tr>
                  <th>NO</th>
                  <th>IMAGES</th>
                  <th>NAME, ADDRESS</th>
                  <th>PHONE</th>
                  <th>EMAIL</th>
                  <th>STATUS</th>
                  <th>TOTAL PAID</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {currentAdmins.map((admin, index) => (
                  <tr key={admin.id} className="table-row">
                    <td>{index + 1}</td>
                    <td>
                      <img src={admin.image} alt="Profile" className="image" />
                    </td>
                    <td>
                      <div className="name-phone-container">
                        <div className="text-sm">
                          <div className="!text-sm">{admin.firstname}</div>
                          <div className="text-gray-400 text-xs">
                            {admin.address}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>{admin.phoneNumber}</td>
                    <td>{admin.email}</td>
                    <td>
                      <button
                        className={`px-4 py-1 mx-1 rounded-3xl border ${
                          admin.isActive === true
                            ? 'border-[#4DB6AC] text-[#4DB6AC]'
                            : 'bg-[#FF5252] text-white'
                        }`}
                      >
                        {admin.isActive === true ? (
                          <p>Active</p>
                        ) : (
                          <p>Suspend</p>
                        )}
                      </button>
                    </td>
                    <td>{admin.totalPaid}</td>

                    <td className="flex items-center gap-3">
                      <Link
                        to={`/users/editUser/${admin._id}`}
                        className="action-item cursor-pointer flex items-center gap-2"
                      >
                        <FaEdit /> Edit
                      </Link>
                      <span
                        onClick={() => setOpenModal(true)}
                        className="action-item cursor-pointer flex items-center gap-1"
                      >
                        <img src="/suspendLogo.svg" alt="suspend" /> Suspend
                      </span>
                      <span className="action-item text-sm cursor-pointer flex items-center gap-2">
                        <FaTrash /> Delete
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <PaginationButton
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            filteredAdmins={filteredAdmins}
            itemsPerPage={itemsPerPage}
            indexOfFirstItem={indexOfFirstItem}
            indexOfLastItem={indexOfLastItem}
          />
        </div>
        {openModal && <SuspendModal setOpenModal={setOpenModal} />}
      </div>
    </>
  );
};

export default AllUsers;
