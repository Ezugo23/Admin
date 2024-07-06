import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { BsPlus } from 'react-icons/bs';
import { SpinnerRoundOutlined } from 'spinners-react';
import axios from 'axios';
import DeleteConfirmationModal from "./Delete";
import EditFood from './foodGroup';
import AddFood from './addGroup';

export default function FoodMenu() {
  const { menuId, id, foodId, foodname } = useParams();
  const [menuData, setMenuData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedFoodItem, setSelectedFoodItem] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchMenuData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://delivery-chimelu-new.onrender.com/api/v1/foods/menus/${menuId}`);
        setMenuData(response.data.foods);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching menu data:', error);
        setLoading(false);
      }
    };

    fetchMenuData();
  }, [menuId]);

  const toggleAvailability = async (itemId) => {
    try {
      const itemToUpdate = menuData.find((item) => item._id === itemId);
      const newAvailability = !itemToUpdate.isAvailable;
      const response = await axios.patch(
        `https://delivery-chimelu-new.onrender.com/api/v1/foods/${itemId}`,
        { isAvailable: newAvailability },
        {
          headers: {
            'Content-Type': 'application/json'
          },
        }
      );

      if (response.status === 200) {
        const updatedMenuData = menuData.map((item) =>
          item._id === itemId ? { ...item, isAvailable: newAvailability } : item
        );
        setMenuData(updatedMenuData);
      } else {
        console.error('Failed to update availability status');
      }
    } catch (error) {
      console.error('Error updating availability:', error);
    }
  };

  const handleEditClick = (foodItem) => {
    setSelectedFoodItem(foodItem);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedFoodItem(null);
  };

  const handleAddButtonClick = () => {
    setIsAddModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
  };

  const handleAddFood = (newFoodItem) => {
    setMenuData((prevMenuData) => [...prevMenuData, newFoodItem]);
    setIsAddModalOpen(false);
  };

  const handleDeleteClick = (foodItem) => {
    setSelectedFoodItem(foodItem);
    setShowDeleteModal(true);
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
  };

  const handleConfirmDelete = async () => {
    try {
      setIsLoading(true);
      const response = await axios.delete(`https://delivery-chimelu-new.onrender.com/api/v1/foods/${selectedFoodItem._id}`);
      if (response.status === 200) {
        const updatedMenuData = menuData.filter((item) => item._id !== selectedFoodItem._id);
        setMenuData(updatedMenuData);
        setShowDeleteModal(false);
      } else {
        throw new Error('Failed to delete menu');
      }
    } catch (error) {
      console.error('Error deleting menu:', error);
      alert('Failed to delete menu');
    } finally {
      setIsLoading(false);
    }
  };

  if (loading) {
    return <SpinnerRoundOutlined size={50} color="green" />;
  }

  if (!menuData) {
    return <div>No data found for this menu.</div>;
  }

  const itemsPerPage = 10;

  const filteredData = menuData.filter((item) =>
  item.title && item.title.toLowerCase().includes(searchTerm.toLowerCase())
);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="contain" style={{ marginLeft: '10px', marginTop: '45px' }}>
      <div className="main-container">
      <div className="flex justify-between items-center mb-4">
          <p className="font-roboto font-bold text-lg leading-6 text-black">{foodname}</p>
          <div className="search-bar ml-auto">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-gray-300 rounded px-3 py-1 focus:outline-none"
            />
          </div>
        </div>
        <hr className="mb-4" />
        <div className="table-container" style={{ position: 'relative', minHeight: '300px' }}>
          <table className="table min-w-full" style={{ borderCollapse: 'collapse' }}>
            <thead className="table-header" style={{ color: 'black' }}>
              <tr>
                <th style={{ color: 'black', border: 'none', width: '5%' }}>#</th>
                <th style={{ color: 'black', border: 'none', width: '15%' }}>IMAGE</th>
                <th style={{ color: 'black', border: 'none', width: '20%' }}>FOOD NAME</th>
                <th style={{ color: 'black', border: 'none', width: '15%' }}>SIDE DISH (REQUIRED)</th>
                <th style={{ color: 'black', border: 'none', width: '15%' }}>SIDE DISH (OPTIONAL)</th>
                <th style={{ color: 'black', border: 'none', width: '20%' }}>STOCK</th>
                <th style={{ color: 'black', border: 'none', width: '20%' }}>STATUS</th>
                <th style={{ color: 'black', border: 'none', width: '20%' }}>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((item, index) => (
                <tr key={item._id} className="table-row cursor-pointer" style={{ borderBottom: 'none' }}>
                  <td style={{ border: 'none' }}>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                  <td style={{ border: 'none' }}>
                    <img src={item.image} alt="" style={{ borderRadius: '10px', width: '35px', height: '32px' }} />
                  </td>
                  <td style={{ border: 'none' }}>{item.title}</td>
                  <td style={{ border: 'none' }}>
                    {item.additives
                      .filter((additive) => additive.requiredCount > 0 && !additive.optional)
                      .map((additive) => (
                        <div key={additive._id}>{additive.name}</div>
                      ))}
                  </td>
                  <td style={{ border: 'none' }}>
                    {item.additives
                      .filter((additive) => additive.optional)
                      .map((additive) => (
                        <div key={additive._id}>{additive.name}</div>
                      ))}
                  </td>
                  <td style={{ border: 'none' }}>
                    <div
                      onClick={() => toggleAvailability(item._id)}
                      className={`p-1 rounded-full cursor-pointer ml-4 mt-1 w-9 flex duration-700 ${
                        item.isAvailable ? 'justify-end bg-green-500' : 'bg-gray-200 justify-start'
                      }`}
                    >
                      <div className="h-3 w-3 bg-white rounded-full"></div>
                    </div>
                  </td>
                  <td style={{ border: 'none' }}>
                    <button
                      className={`px-4 py-1 mx-1 rounded-3xl border ${
                        item.isAvailable ? 'border-[#4DB6AC] text-[#4DB6AC]' : 'bg-[#FF5252] text-white'
                      }`}
                    >
                      {item.isAvailable ? 'Active' : 'Inactive'}
                    </button>
                  </td>
                  <td className="flex items-center gap-3" style={{ border: 'none' }}>
                    <span onClick={() => handleEditClick(item)} className="action-item cursor-pointer flex items-center gap-2">
                      <FaEdit /> Edit
                    </span>
                    <span className="action-item text-sm cursor-pointer flex items-center gap-2" onClick={() => handleDeleteClick(item)}>
                      <FaTrash /> Delete
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="pagination-con">
          <div
            className="flex px-8 py-2 rounded-lg text-base text-white font-semibold bg-blue-800 gap-1 items-center cursor-pointer ml-6"
            onClick={handleAddButtonClick}
          >
            <BsPlus className="text-lg stroke-1" />
            <p>Add a New Category</p>
          </div>
        </div>
      </div>
      {isEditModalOpen && (
        <EditFood
          onClose={handleCloseEditModal}
          foodId={selectedFoodItem._id}
          id={id}
          foodData={selectedFoodItem}
        />
      )}
      {isAddModalOpen && (
        <div className="popup-overlay overflow-y-auto">
          <div className="popup-content overflow-y-auto">
            <AddFood
              onClose={handleCloseAddModal}
              menuId={foodId}
              onAddFood={handleAddFood}
            />
          </div>
        </div>
      )}
      {showDeleteModal && (
        <DeleteConfirmationModal
          onCancel={handleCancelDelete}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
}