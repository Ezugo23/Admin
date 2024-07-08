import React, { useState, useEffect } from "react";
import { BsPlus } from "react-icons/bs";
import { useParams, useNavigate } from 'react-router-dom';
import Group from './Group';
import axios from 'axios';
import AddSideMenuBackdrop from './AddMenu'

export default function Side({ onDelete }) {
  const { id } = useParams();
  const [showAddBackdrop, setShowAddBackdrop] = useState(false);
  const [showEditBackdrop, setShowEditBackdrop] = useState(false);
  const [sideItems, setSideItems] = useState([]);
  const [editItem, setEditItem] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [restaurantId, setRestaurantId] = useState('');

  const fetchSideItems = async () => {
    try {
      const response = await axios.get(`https://delivery-chimelu-new.onrender.com/api/v1/foods/additive/${id}`);
      setSideItems(response.data);
    } catch (error) {
      console.error('Error fetching side items:', error);
    }
  };

  useEffect(() => {
    fetchSideItems();
  }, []);

  const handleAddButtonClick = () => {
    setShowAddBackdrop(true);
  };

  const handleToggleAvailability = async (itemId) => {
    try {
      const updatedItems = sideItems.map(item => {
        if (item._id === itemId) {
          return { ...item, isAvailable: !item.isAvailable };
        }
        return item;
      });
      setSideItems(updatedItems);

      await axios.patch(`https://delivery-chimelu-new.onrender.com/api/v1/foods/additive-availbility/${itemId}`);
    } catch (error) {
      console.error('Error toggling availability:', error);
    }
  };

  return (
    <div className="flex flex-col relative">
      <div className="h-full w-full overflow-y-auto bg-white mx-5" style={{ width: '60rem' }}>
        <div className="flex items-center px-3 overflow bg-gray-50 py-4 justify-between">
          <p className="text-2xl font-semibold" style={{ marginBottom: '-24px' }}>Side Menu</p>
          <div
          className="flex px-3 py-2 rounded-lg text-base text-white font-semibold bg-green-500 gap-1 items-center cursor-pointer"
          onClick={handleAddButtonClick}
        >
            <BsPlus className="text-lg stroke-1" />
            <p>Add a New Type</p>
          </div>
        </div>
        <div className="h-[calc(100vh - 200px)]">
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
      </div>
      <div style={{ marginTop: '30px' }}>
        <Group id={id} onDelete={onDelete}/>
      </div>
      {showAddBackdrop && <AddSideMenuBackdrop setShowAddBackdrop={setShowAddBackdrop} onSuccess={fetchSideItems} />}
    </div>
  );
}