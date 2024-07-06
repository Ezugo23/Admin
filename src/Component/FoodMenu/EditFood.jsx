import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FaEdit, FaTrash, FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { BsPlus } from "react-icons/bs";
import { SpinnerRoundOutlined } from 'spinners-react';
import axios from 'axios';
import EditFoodModal from './EditMenu';
import DeleteConfirmationModal from './Delete';
import AddMenu from './MenuAdd';

export default function EditFood() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedMenuId, setSelectedMenuId] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://delivery-chimelu-new.onrender.com/api/v1/menu/menusrestaurant/${id}`);
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleApproveClick = async (menu) => {
    try {
      // Toggle availability status
      const response = await axios.put(`https://delivery-chimelu-new.onrender.com/api/v1/menu/availability/${menu._id}`);
      if (response.status === 200) {
        // Update local state to reflect the change
        const updatedData = data.map(item => {
          if (item._id === menu._id) {
            return { ...item, available: !item.available }; // Toggle availability
          }
          return item;
        });
        setData(updatedData);
      } else {
        throw new Error('Failed to update availability');
      }
    } catch (error) {
      console.error('Error updating availability:', error);
      alert('Failed to update availability');
    }
  };

  const handleDeleteClick = (menuId) => {
    setSelectedMenuId(menuId);
    setShowDeleteModal(true);
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
  };

  const handleConfirmDelete = async () => {
    const menuId = selectedMenuId;

    try {
      const response = await axios.delete(
        `https://delivery-chimelu-new.onrender.com/api/v1/menu/delete/${menuId}`
      );

      if (response.status === 200) {
        const updatedData = data.filter(item => item._id !== menuId);
        setData(updatedData);
      } else {
        throw new Error('Failed to delete menu');
      }
    } catch (error) {
      console.error('Error deleting menu:', error);
      alert('Failed to delete menu');
    }

    setShowDeleteModal(false);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleAddMenuClick = () => {
    setIsAddModalOpen(true);
  };

  const handleAddMenuClose = () => {
    setIsAddModalOpen(false);
  };

  const refreshMenus = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`https://delivery-chimelu-new.onrender.com/api/v1/menu/menusrestaurant/${id}`);
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error refreshing menus:', error);
      setLoading(false);
    }
  };

  const filteredData = data.filter((item) =>
    item.name && item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleClick = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

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
            <input
              type="text"
              className="w-[25rem] h-12 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm pl-4"
              placeholder="Search by Food Name"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <div
              className="flex px-8 py-2 rounded-lg text-base text-white font-semibold bg-blue-800 gap-1 items-center cursor-pointer ml-6"
              onClick={handleAddMenuClick}
            >
              <BsPlus className="text-lg stroke-1" />
              <p>Add a New Menu</p>
            </div>
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
                      <Link to={`/foodsellers/menu/${id}/food-menu/${item._id}/${item.name}`}>
                        <strong>{item.name}</strong>
                      </Link>
                    </td>
                    <td style={{ border: 'none' }}>{item.foods}</td>
                    <td style={{ border: 'none' }}>
                      <button className={`px-4 py-1 mx-1 rounded-3xl border ${item.available ? "border-[#4DB6AC] text-[#4DB6AC]" : "bg-[#FF5252] text-white"}`}>
                        {item.available ? 'Available' : 'Not Available'}
                      </button>
                    </td>
                    <td className="flex items-center gap-3" style={{ border: 'none' }}>
                      <span onClick={() => handleApproveClick(item)} className="action-item text-sm cursor-pointer flex items-center gap-2">
                        <FaEdit size={15} /> Edit
                      </span>
                      <span className="action-item text-sm cursor-pointer flex items-center gap-2" onClick={() => handleDeleteClick(item._id)}>
                        <FaTrash /> Delete
                      </span>
                      <button
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
                        onClick={() => handleApproveClick(item)}
                      >
                        {item.available ? 'Menu' : 'Menu'}
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

      {/* Edit Food Modal */}
      {isModalOpen && (
        <EditFoodModal
          closeModal={() => setIsModalOpen(false)}
          selectedMenu={selectedMenu}
          handleEditUpdate={(updatedData) => {
            // Implement logic to update your data in this callback if needed
            console.log('Updated data:', updatedData);
          }}
        />
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <DeleteConfirmationModal
          onCancel={handleCancelDelete}
          onConfirm={handleConfirmDelete}
        />
      )}

      {/* Add Menu Modal */}
      {isAddModalOpen && (
        <AddMenu
          closeModal={handleAddMenuClose}
          refreshMenus={refreshMenus}
        />
      )}
    </div>
  );
}