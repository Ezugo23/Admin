import React, { useState } from "react";
import "../administrators/styles/users.css";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import PaginationButton from "./paginationButton";
import SuspendModal from "./SuspendModal";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../../../util/http";

const AllUsers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [userId, setUserId] = useState(null);
  const [userStatus, setUserStatus] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const itemsPerPage = 10;

  const handleSuspendClick = (ID, isActive) => {
    setOpenModal(true);
    setUserId(ID);
    setUserStatus(isActive);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const { data, isPending, isError } = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });

  let filteredUsers = [];
  if (data) {
    filteredUsers = data.filter((user) =>
      user.firstname.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

  let content;
  if (isPending) {
    content = (
      <div className="absolute left-[52%] top-[50%] -translate-x-[50%] text-black text-5xl">
        <i className="fa-solid fa-spinner fa-spin"></i>
      </div>
    );
  }

  if (isError) {
    content = (
      <p className="text-center absolute left-[45%] top-[50%] bg-red-400 text-white p-6 text-md">
        Failed to fetch all users. Please try again.
      </p>
    );
  }

  if (data) {
    content = (
      <div className="main-container">
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
                <th>NAME</th>
                <th>PHONE</th>
                <th>EMAIL</th>
                <th>STATUS</th>
                <th>TOTAL PAID</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user, index) => (
                <tr key={user._id} className="table-row cursor-pointer">
                  <td>{index + 1}</td>
                  <td>
                    <img src={user.image} alt="Profile" className="image" />
                  </td>
                  <td>
                    <Link to={`/users/${user._id}`} className="user-link">
                      {user.firstname} {user.lastname}
                    </Link>
                  </td>
                  <td>{user.phoneNumber}</td>
                  <td>{user.email}</td>
                  <td>
                    <button
                      className={`px-4 py-1 mx-1 rounded-3xl border ${
                        user.isActive === true
                          ? "border-[#4DB6AC] text-[#4DB6AC]"
                          : "bg-[#FF5252] text-white"
                      }`}
                    >
                      {user.isActive === true ? <p>Active</p> : <p>Suspend</p>}
                    </button>
                  </td>
                  <td>{user.totalPaid}</td>

                  <td className="flex items-center gap-3">
                    <Link
                      to={`/users/editUser/${user._id}`}
                      className="action-item cursor-pointer flex items-center gap-2"
                    >
                      <FaEdit /> Edit
                    </Link>
                    <span
                      onClick={() =>
                        handleSuspendClick(user._id, user.isActive)
                      }
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
          filteredUsers={filteredUsers}
          itemsPerPage={itemsPerPage}
          indexOfFirstItem={indexOfFirstItem}
          indexOfLastItem={indexOfLastItem}
        />
      </div>
    );
  }

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
        {content}
        {openModal && (
          <SuspendModal
            setOpenModal={setOpenModal}
            userID={userId}
            isActive={userStatus}
          />
        )}
      </div>
    </>
  );
};

export default AllUsers;
