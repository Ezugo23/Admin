import React, { useState, useEffect } from 'react';
import { FiX } from 'react-icons/fi';
import Select from 'react-select';
import axios from 'axios';
import '../FoodMenu/style.css';
import { useParams } from 'react-router-dom';

export default function EditBackdrop({ toggleEditBackdrop, groupId }) {
  const { id } = useParams();
  const [groupData, setGroupData] = useState({
    name: '',
    selectableCount: '',
    isCheckedRequired: false,
    isCheckedOptional: false,
    selectedItems: [],
    availableItems: [],
  });

  const [restaurantId, setRestaurantId] = useState('');

  useEffect(() => {
    fetchGroupData(groupId);
  }, [groupId]);

  const fetchGroupData = async (groupId) => {
    try {
      const storedRestaurantId = localStorage.getItem('userId');
      if (storedRestaurantId) {
        setRestaurantId(storedRestaurantId);
      }
      const response = await axios.get(`https://delivery-chimelu-new.onrender.com/api/v1/foods/additive-group/${groupId}`);
      const groupData = response.data;

      const allItemsResponse = await axios.get(`https://delivery-chimelu-new.onrender.com/api/v1/foods/additive/${id}`);
      const allItems = allItemsResponse.data.filter(item => item.isAvailable);

      setGroupData({
        name: groupData.name,
        selectableCount: groupData.requiredCount.toString(),
        isCheckedOptional: groupData.optional,
        isCheckedRequired: !groupData.optional,
        selectedItems: groupData.additives.map(additive => additive._id),
        availableItems: allItems || [],
      });
    } catch (error) {
      console.error('Error fetching group data:', error);
    }
  };

  const handleItemCheckboxChange = (itemId) => {
    const updatedSelectedItems = groupData.selectedItems.includes(itemId)
      ? groupData.selectedItems.filter(id => id !== itemId)
      : [...groupData.selectedItems, itemId];

    setGroupData(prevGroupData => ({
      ...prevGroupData,
      selectedItems: updatedSelectedItems
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const payload = {
      requiredCount: parseInt(groupData.selectableCount),
      name: groupData.name,
      additives: groupData.selectedItems,
      optional: groupData.isCheckedOptional
    };

    try {
      await axios.patch(`https://delivery-chimelu-new.onrender.com/api/v1/foods/additive-group/${groupId}`, payload);
      console.log('Group updated successfully:', payload);
      toggleEditBackdrop();
      window.location.reload();
    } catch (error) {
      console.error('Error updating group:', error);
    }
  };

  const handleRequiredCheckboxChange = () => {
    setGroupData({ ...groupData, isCheckedRequired: !groupData.isCheckedRequired, isCheckedOptional: false });
  };

  const handleOptionalCheckboxChange = () => {
    setGroupData({ ...groupData, isCheckedOptional: !groupData.isCheckedOptional, isCheckedRequired: false });
  };

  const filteredItems = groupData.availableItems;

  const options = filteredItems.map(item => ({
    value: item._id,
    label: item.price ? `${item.name} ₦${item.price}` : item.name
  }));

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50" onClick={toggleEditBackdrop}></div>
      <div className="relative bg-white w-[500px] p-6 rounded-md shadow-md">
        <form onSubmit={handleSubmit}>
          <div className="flex justify-between items-center">
            <p className="text-sm mt-5 font-semibold">Edit Group Type</p>
            <FiX className="text-gray-500 mt-5 close-icon cursor-pointer" onClick={toggleEditBackdrop} size={20} />
          </div>
          <div className="flex gap-8 mt-3">
            <div className="flex items-center gap-1">
              <div
                className={`h-6 w-6 cursor-pointer rounded-full border-2 ${groupData.isCheckedRequired ? 'border-red-500' : 'border-gray-400'}`}
                onClick={handleRequiredCheckboxChange}
              >
                {groupData.isCheckedRequired && <div className="h-4 w-4 bg-red-500 rounded-full"></div>}
              </div>
              <p>Required</p>
            </div>
            <div className="flex items-center gap-2">
              <div
                className={`h-6 w-6 cursor-pointer rounded-full border-2 ${groupData.isCheckedOptional ? 'border-emerald-500' : 'border-gray-400'}`}
                onClick={handleOptionalCheckboxChange}
              >
                {groupData.isCheckedOptional && <div className="h-4 w-4 bg-emerald-500 rounded-full"></div>}
              </div>
              <p>Optional</p>
            </div>
          </div>
          <div className="mt-2">
            <label htmlFor="groupName" className="font-semibold text-sm">Group Name</label>
            <input
              type="text"
              id="groupName"
              className="border-2 rounded-md bg-gray-100 w-full p-2 mt-2"
              value={groupData.name}
              onChange={(e) => setGroupData({ ...groupData, name: e.target.value })}
            />
          </div>
          <div className="mt-3">
            <label htmlFor="selectedItems" className="font-semibold text-sm">Selected Items</label>
            <Select
              id="selectedItems"
              options={options}
              value={options.filter(option => groupData.selectedItems.includes(option.value))}
              isMulti
              onChange={(selectedOptions) => setGroupData({ ...groupData, selectedItems: selectedOptions.map(option => option.value) })}
            />
          </div>
          <label htmlFor="selectableCount" className="text-sm mb-2 font-semibold mt-4">Selectable Count</label>
          <input
            type="text"
            id="selectableCount"
            className="h-10 rounded-md w-full border-2"
            value={groupData.selectableCount}
            onChange={(e) => setGroupData({ ...groupData, selectableCount: e.target.value })}
          />
          <div className="flex mt-3 justify-center items-end flex-1">
            <button type="submit" className="bg-emerald-500 text-white text-sm font-semibold p-2 mb-2 rounded-md">
              Group
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}