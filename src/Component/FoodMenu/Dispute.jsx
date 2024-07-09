import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaReplyAll, FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { useParams } from 'react-router-dom';

export default function Dispute() {
  const { id } = useParams();
  const [disputes, setDisputes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchDisputes();
  }, []);

  const fetchDisputes = async () => {
    try {
    
      const response = await axios.get(`https://delivery-chimelu-new.onrender.com/api/v1/dispute/restaurant/${id}`);
      
      if (response.data && response.data.success && Array.isArray(response.data.data)) {
        setDisputes(response.data.data);
      } else {
        console.error('Unexpected response format:', response.data);
      }
    } catch (error) {
      console.error('Error fetching disputes:', error);
    }
  };

  const handleToggleStatus = async (id) => {
    try {
      const response = await axios.patch(`https://delivery-chimelu-new.onrender.com/api/v1/dispute/${id}/toggle`);
      if (response.data && response.data.success) {
        // Update the local state to reflect the new status
        setDisputes((prevDisputes) =>
          prevDisputes.map((dispute) =>
            dispute._id === id ? { ...dispute, solved: response.data.data.solved } : dispute
          )
        );
      } else {
        console.error('Unexpected response format:', response.data);
      }
    } catch (error) {
      console.error('Error toggling dispute status:', error);
    }
  };

  const handlePageClick = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleReplyViaEmail = (email) => {
    window.location.href = `mailto:${email}`;
  };

  const filteredDisputes = disputes.filter((dispute) =>
    dispute.restaurantName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredDisputes.length / itemsPerPage);
  const currentDisputes = filteredDisputes.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="contain" style={{ marginLeft: '10px', marginTop: '45px' }}>
      <div className="main-container">
        <div className="">
          <div className="mb-4">
            <p className="font-roboto font-bold text-lg leading-6 text-black">All Disputes/Complaints</p>
          </div>
          <hr className="mb-4" />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <label>
              Show
              <select className="ml-2" value={itemsPerPage} onChange={(e) => setItemsPerPage(Number(e.target.value))}>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="25">25</option>
              </select>
              entries
            </label>
            <div className="search-container " style={{ marginRight: "300px" }}>
              <label htmlFor="search">Search:</label>
              <input
                id="search"
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          {currentDisputes.length > 0 ? currentDisputes.map((dispute, index) => (
            <div key={dispute._id} style={{ backgroundColor: '#FAFAFA', boxSizing: 'border-box', width: '62rem', marginTop: "20px" }}>
              <div style={{ marginTop: "30px", display: "flex" }} className="gap-7">
                <p style={{ fontFamily: "Roboto", fontWeight: '300', fontSize: '14px', lineHeight: "18px", marginTop: '15px' }}>{dispute.restaurantName}</p>
                <p style={{ fontFamily: "Roboto", fontWeight: '300', fontSize: '14px', lineHeight: "18px", marginTop: '15px' }}>{dispute.name}</p>
                <p style={{ fontFamily: "Roboto", fontWeight: '300', fontSize: '14px', lineHeight: "18px", marginTop: '15px' }}>{dispute.phoneNumber}</p>
                <div style={{ display: "flex", justifyContent: "flex-end", marginLeft: "400px", marginTop: '15px' }} className="gap-7">
                  <p style={{ fontFamily: "Roboto", fontWeight: '300', fontSize: '14px', lineHeight: "18px" }}>12:56 pm</p>
                  <p style={{ fontFamily: "Roboto", fontWeight: '300', fontSize: '14px', lineHeight: "18px" }}>15/04/2024</p>
                </div>
              </div>
              <div style={{ marginTop: "30px", display: "flex" }} className="gap-7">
                <input
                  type="checkbox"
                  checked={dispute.solved}
                  onChange={() => handleToggleStatus(dispute._id)}
                  style={{ marginTop: "2px", display: "flex", cursor: 'pointer' }}
                />
                <p style={{ fontFamily: "Roboto", fontWeight: '300', fontSize: '14px', lineHeight: "18px", marginTop: '2px', marginLeft: "-15px" }}>Solved by admin</p>
                <p style={{ fontFamily: "Roboto", fontWeight: '300', fontSize: '14px', lineHeight: "18px", marginTop: '2px' }}>Nature of complaint:</p>
                <p style={{ fontFamily: "Roboto", fontWeight: '300', fontSize: '14px', lineHeight: "18px", marginTop: '2px' }}>{dispute.natureOfComplaint}</p>
                {dispute.orderId && (
                  <p style={{ fontFamily: "Roboto", fontWeight: '300', fontSize: '14px', lineHeight: "18px", marginTop: '2px' }}>Order ID: {dispute.orderId}</p>
                )}
              </div>
              <div style={{ backgroundColor: '#FFFFFF', boxSizing: 'border-box', width: '56rem', marginTop: "20px", height: "71px", marginLeft: '35px' }}>
                <p>{dispute.description}</p>
              </div>
              <div style={{ display: 'flex', color: "#406AFF", cursor: "pointer" }} className="gap-2" onClick={() => handleReplyViaEmail(dispute.email)}>
                <FaReplyAll style={{ marginTop: "2px", marginLeft: "10px" }} size={15} />
                <p style={{ fontFamily: "Roboto", fontWeight: '300', fontSize: '14px', lineHeight: "18px" }}>reply via email</p>
              </div>
            </div>
          )) : (
            <p>No disputes found.</p>
          )}
          <div className="pagination-con">
            <span className="text-gray-600">Showing {Math.min(currentPage * itemsPerPage - itemsPerPage + 1, filteredDisputes.length)}-{Math.min(currentPage * itemsPerPage, filteredDisputes.length)} of {filteredDisputes.length} data</span>
            <div className="pagination flex items-center">
              <button
                className="px-3 py-1 mx-1 rounded hover:bg-gray-300"
                onClick={() => handlePageClick(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <FaAngleLeft />
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => handlePageClick(i + 1)}
                  className={`px-3 py-1 mx-1 rounded ${currentPage === i + 1 ? 'bg-green-500 text-white' : 'hover:bg-gray-300'}`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                className="px-3 py-1 mx-1 rounded hover:bg-gray-300"
                onClick={() => handlePageClick(currentPage + 1)}
                disabled={currentPage === totalPages}
                style={{ marginRight: "300px" }}
              >
                <FaAngleRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
