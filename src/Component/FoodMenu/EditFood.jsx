import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FaEdit, FaTrash, FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { BsPlus } from "react-icons/bs";
import { SpinnerRoundOutlined } from 'spinners-react';
import axios from 'axios'; // Import axios for API requests

export default function EditFood() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://delivery-chimelu-new.onrender.com/api/v1/menu/menusrestaurant/${id}`);
        setData(response.data); // Assuming API returns an array of menu items
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleClick = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleApproveClick = () => {
    setIsModalOpen(true); // Open the modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  const filteredData = data.filter((item) =>
  item.name && item.name.toLowerCase().includes(searchTerm.toLowerCase())
);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="contain" style={{ marginLeft: '10px', marginTop: '45px' }}>
      <div className="main-container">
        <div className="">
          <div className="mb-4">
            <p className="font-roboto font-bold text-lg leading-6 text-black">Add / Edit Food Menu</p>
          </div>
          <hr className="mb-4" />
          <label className='font-roboto font-sm-bold text-small leading-6 text-black'>Show</label>
        </div>
        <div className="entries-container mb-4">
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
            <select className="w-[25rem] h-12 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm pl-12" value={itemsPerPage} onChange={(e) => setItemsPerPage(Number(e.target.value))}>
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
            <div className="flex px-8 py-2 rounded-lg text-base text-white font-semibold bg-blue-800 gap-1 items-center cursor-pointer ml-6">
              <BsPlus className="text-lg stroke-1" />
              <p>Add a New Group</p>
            </div>
          </div>
          <div className="search-container ml-auto">
          </div>
        </div>
        <div className="table-container" style={{ position: 'relative', minHeight: '300px' }}>
          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <SpinnerRoundOutlined size={50} color="green" />
            </div>
          ) : (
            <table className="table min-w-full" style={{ borderCollapse: 'collapse' }}>
              <thead className="table-header" style={{ color: 'black' }}>
                <tr>
                  <th style={{ color: 'black', border: 'none', width: '5%' }}>#</th>
                  <th style={{ color: 'black', border: 'none', width: '45%' }}>Menu Name</th>
                  <th style={{ color: 'black', border: 'none', width: '20%' }}>All Foods</th>
                  <th style={{ color: 'black', border: 'none', width: '15%' }}>Status</th>
                  <th style={{ color: 'black', border: 'none', width: '15%' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentData.map((item, index) => (
                  <tr key={item._id} className="table-row cursor-pointer" style={{ borderBottom: 'none' }}>
                    <td style={{ border: 'none' }}>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                    <td style={{ border: 'none' }}>
                    <Link to={`/foodsellers/menu/${id}/food-menu/${item._id}`}>
                        <strong>{item.name}</strong>
                      </Link>
                    </td>
                    <td style={{ border: 'none' }}>{item.foods}</td>
                    <td style={{ border: 'none' }}>
        <button className={`px-4 py-1 mx-1 rounded-3xl border ${item.isAvailable ? "border-[#4DB6AC] text-[#4DB6AC]" : "bg-[#FF5252] text-white"}`}>
          {item.isAvailable ? 'Active' : 'Inactive'}
        </button>
      </td>
                    <td className="flex items-center gap-3" style={{ border: 'none' }}>
                    <Link to={`/foodsellers/menu/${id}/food-menu/${item._id}`} style={{ display:'flex'}}>
                        <FaEdit size={15}/> Edit
                      </Link>
                      <span className="action-item text-sm cursor-pointer flex items-center gap-2">
                        <FaTrash /> Delete
                      </span>
                      <button
                        onClick={handleApproveClick}
                        style={{
                          width: "90.39px",
                          height: '25px',
                          backgroundColor: '#4CAF50',
                          color: "white",
                          fontFamily: 'Open Sans',
                          fontSize: '16px',
                          fontWeight: '600',
                          lineHeight: '21.79px',
                        }}
                      >
                        Approve
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
            <button className="px-3 py-1 mx-1 rounded hover:bg-gray-300" onClick={() => handleClick(currentPage - 1)} disabled={currentPage === 1}>
              <FaAngleLeft />
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button key={i + 1} onClick={() => handleClick(i + 1)} className={`px-3 py-1 mx-1 rounded ${currentPage === i + 1 ? 'bg-green-500 text-white' : 'hover:bg-gray-300'}`}>
                {i + 1}
              </button>
            ))}
            <button className="px-3 py-1 mx-1 rounded hover:bg-gray-300" onClick={() => handleClick(currentPage + 1)} disabled={currentPage === totalPages}>
              <FaAngleRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}