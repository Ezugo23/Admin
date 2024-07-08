import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FaEdit, FaTrash, FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { MdAirplanemodeActive } from "react-icons/md";
import { MdAirplanemodeInactive } from "react-icons/md";
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
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedMenuId, setSelectedMenuId] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

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

  useEffect(() => {
    fetchData(); // Initial data fetch
  }, [id]);

  const handleApproveClick = async (menu) => {
    try {
      // Toggle availability status
      const response = await axios.put(`https://delivery-chimelu-new.onrender.com/api/v1/menu/availability/${menu._id}`);
      if (response.status === 200) {
        // Update local state to reflect the change
        const updatedData = data.map(item => {
          if (item._id === menu._id) {
            return { ...item, isAvailable: !item.isAvailable }; // Toggle availability
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

  const refreshMenus = () => {
    fetchData(); // Refetch menu data
};

  const handleEditClick = (menu) => {
    setSelectedMenu(menu);
    setShowEditModal(true);
  };

  const handleEditUpdate = (updatedMenuData) => {
    const updatedData = data.map((item) => {
      if (item._id === updatedMenuData._id) {
        return updatedMenuData;
      }
      return item;
    });
    setData(updatedData);
    setShowEditModal(false);
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

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('menusData'));
    if (storedData && storedData.length > 0) {
      setData(storedData);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('menusData', JSON.stringify(data));
  }, [data]);

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
                    <td style={{ border: 'none' }}>{item.numberOfItems}</td>
                    {/* <td style={{ border: 'none' }}>{item.foods}</td> */}
                    <td style={{ border: 'none' }}>
                      <button className={`
                        px-4 py-1 mx-1 rounded-3xl border 
                        ${item.isAvailable ? "border-[#4DB6AC] text-[#4DB6AC]" : "bg-[#FF5252] text-white"}
                      `}>
                        {item.isAvailable ? 'Available' : 'Not Available'}
                      </button>
                    </td>
                    <td className="flex items-center gap-3" style={{ border: 'none' }}>
                      <span  onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleEditClick(item);
                        }} className="action-item text-sm cursor-pointer flex items-center gap-2">
                        <FaEdit size={15} /> Edit
                      </span>
                      <span className="action-item text-sm cursor-pointer flex items-center gap-2" onClick={() => handleDeleteClick(item._id)}>
                        <FaTrash size={15} /> Delete
                      </span>
                      <span className="action-item text-sm cursor-pointer flex items-center gap-2" onClick={() => handleApproveClick(item)}>
                        {item.isAvailable ? (
                          <>
                          <MdAirplanemodeActive size={17}/>
                            Activate
                          </>
                        ) : (
                          <>
                          <MdAirplanemodeInactive size={17} />
                            Deactivate
                          </>
                        )}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <div className="pagination-container" style={{ marginTop: '10px' }}>
            <button
              className={`pagination-button ${currentPage === 1 ? 'disabled' : ''}`}
              onClick={() => handleClick(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <FaAngleLeft />
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                className={`pagination-button ${currentPage === i + 1 ? 'active' : ''}`}
                onClick={() => handleClick(i + 1)}
              >
                {i + 1}
              </button>
            ))}
            <button
              className={`pagination-button ${currentPage === totalPages ? 'disabled' : ''}`}
              onClick={() => handleClick(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <FaAngleRight />
            </button>
          </div>
        </div>
      </div>
      {showEditModal && selectedMenu && (
  <EditFoodModal
    menu={selectedMenu}
    onClose={() => setShowEditModal(false)}
    onUpdate={handleEditUpdate}
    refreshMenus={refreshMenus}
  />
)}
      {showDeleteModal && (
        <DeleteConfirmationModal
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
      {isAddModalOpen && (
        <AddMenu onClose={handleAddMenuClose}  refreshMenus={refreshMenus}/>
      )}
    </div>
  );
}