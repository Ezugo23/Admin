import React, { useState } from "react";
import { BsPlus } from "react-icons/bs";
import { Routes, Route, useParams } from 'react-router-dom';
import Group from './Groups';
import AddMenu from './AddMenu'; // Import the AddMenu component

const Side = ({ onDelete }) => {
  const { id } = useParams();
  const [showAddBackdrop, setShowAddBackdrop] = useState(false);
  const [showEditBackdrop, setShowEditBackdrop] = useState(false);
  const [sideItems, setSideItems] = useState([
    { _id: 1, name: "French Fries", price: 500, isAvailable: true },
    { _id: 2, name: "Onion Rings", price: 700, isAvailable: false },
    { _id: 3, name: "Mozzarella Sticks", price: 800, isAvailable: true },
    { _id: 4, name: "Garlic Bread", price: 600, isAvailable: false },
    { _id: 1, name: "French Fries", price: 500, isAvailable: true },
    { _id: 2, name: "Onion Rings", price: 700, isAvailable: false },
    { _id: 3, name: "Mozzarella Sticks", price: 800, isAvailable: true },
    { _id: 4, name: "Garlic Bread", price: 600, isAvailable: false },
  ]);
  const [editItem, setEditItem] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleAddButtonClick = () => {
    setShowAddBackdrop(true);
  };

  const handleToggleAvailability = (itemId) => {
    const updatedItems = sideItems.map((item) =>
      item._id === itemId ? { ...item, isAvailable: !item.isAvailable } : item
    );
    setSideItems(updatedItems);
  };

  const handleEditButtonClick = (item) => {
    setShowEditBackdrop(true);
    setEditItem(item);
  };

  const handleDeleteClick = (item) => {
    setShowDeleteModal(true);
    setEditItem(item);
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
  };

  const deleteSideItem = (itemId) => {
    setSideItems(sideItems.filter((item) => item._id !== itemId));
    onDelete(itemId); // Assuming onDelete is a prop function to handle deletion in parent component
    setShowDeleteModal(false);
  };

  return (
    <div className="flex flex-col relative"> {/* Container to stack components */}
      <div className="h-full w-full overflow-y-auto bg-white mx-5" style={{width:'60rem'}}>
        <div className="flex items-center px-3 overflow bg-gray-50 py-4 justify-between">
          <p className="text-2xl font-semibold" style={{marginBottom:'-24px'}}>Side Menu</p>
          <div
            className="flex px-3 py-2 rounded-lg text-base text-white font-semibold bg-blue-900 gap-1 items-center cursor-pointer"
            onClick={handleAddButtonClick}
            style={{marginBottom:'-10px'}}
          >
            <BsPlus className="text-lg stroke-1" />
            <p>Add a New Type</p>
          </div>
        </div>
        <div className="h-[calc(100vh - 200px)]"> {/* Set a fixed height for the side menu */}
          <div className="flex flex-col gap-3">
            {sideItems.map((item) => (
              <div key={item._id} className="flex items-center px-3 justify-between">
                <div className="flex-grow">
                  <p className="text-15 mb-1 font-semibold">{item.name}</p>
                  <p>NGN {item.price}</p>
                </div>
                <div
                  onClick={() => handleToggleAvailability(item._id)}
                  className={`p-1 rounded-full cursor-pointer ml-4 mt-1 w-9 flex duration-700 ${
                    item.isAvailable ? "justify-end bg-green-500" : "bg-gray-200 justify-start"
                  }`}
                >
                  <div className="h-3 w-3 bg-white rounded-full"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Overlay for AddMenu modal */}
        {showAddBackdrop && (
          <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center z-[400]">
            <AddMenu
              setShowAddBackdrop={setShowAddBackdrop}
            />
          </div>
        )}
      </div>
      <div style={{marginTop:'30px'}}>
        <Group />
      </div>
    </div>
  );
};

export default Side;
