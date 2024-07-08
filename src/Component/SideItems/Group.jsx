import React, { useState, useEffect } from "react";
import { BsPlus, BsTrash } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import Backdrop from "./AddGroup";
import axios from "axios";
import DeleteConfirmationModal from "./Delete";
import { useParams } from 'react-router-dom';
import EditBackdrop from './EditGroup'

export default function GroupSideItem() {
  const { id, onDelete } = useParams();
  const [showBackdrop, setShowBackdrop] = useState(false);
  const [showEditBackdrop, setShowEditBackdrop] = useState(false);
  const [groupData, setGroupData] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [restaurantId, setRestaurantId] = useState('');

  const fetchData = async () => {
    try {
      const response = await axios.get(`https://delivery-chimelu-new.onrender.com/api/v1/foods/additive/group/${id}`);
      setGroupData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const deleteGroupItem = async (groupId) => {
    try {
      const response = await axios.delete(`https://delivery-chimelu-new.onrender.com/api/v1/foods/additive-group/${groupId}`);
      if (response.status === 200) {
        setGroupData(groupData.filter(group => group._id !== groupId));
        if (typeof onDelete === 'function') {
          onDelete(groupId); // Call onDelete only if it's a function
        }
      } else {
        console.error("Failed to delete group item");
      }
    } catch (error) {
      console.error("Error deleting group item:", error);
    }
  };

  const toggleBackdrop = () => {
    setShowBackdrop(!showBackdrop);
  };

  const handleGroupCreated = () => {
    fetchData(); // Fetch the updated list of groups after a new group is created
  };

  const toggleEditBackdrop = (group) => {
    setSelectedGroup(group);
    setShowEditBackdrop(!showEditBackdrop);
  };

  const handleDeleteClick = (group) => {
    setShowDeleteModal(true);
    setSelectedGroup(group);
  };

  const handleConfirmDelete = () => {
    deleteGroupItem(selectedGroup._id);
    setShowDeleteModal(false);
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
  };

  return (
    <div className="bg-white overflow-y-auto h-full">
      <div className="flex items-center px-3 bg-gray-50 py-4 justify-between">
        <p className="text-2xl font-semibold">All Groups</p>
        <div
          className="flex px-3 py-2 rounded-lg text-base text-white font-semibold bg-green-500 gap-1 items-center cursor-pointer"
          onClick={toggleBackdrop}
        >
          <BsPlus className="text-lg stroke-1" />
          <p>Add New Group</p>
        </div>
      </div>
      <div className="space-y-3">
        {groupData.map((group) => (
          <div key={group._id} className="flex px-3 justify-between items-center">
            <div className="">
              <p className="mb-1">
                <span className="font-semibold text-base mr-4">
                  {group.name} <span style={{ color: group.optional ? 'green' : 'red' }}>{group.optional ? '(Optional)' : '(Required)'}</span>
                </span>{" "}
                <span>X{group.requiredCount}</span>
              </p>
              <p className="text-sm">
                {group.additives.map((additive, index) => (
                  <span key={additive.name}>
                    {additive.name}
                    {additive.price ? ` (₦${additive.price})` : ""}
                    {index !== group.additives.length - 1 ? ", " : ""}
                  </span>
                ))}
              </p>
            </div>
            <div className="flex items-center text-lg gap-6">
              <FiEdit
                className="text-[green] cursor-pointer"
                onClick={() => toggleEditBackdrop(group)}
              />
              <BsTrash
                className="text-[red] cursor-pointer"
                onClick={() => handleDeleteClick(group)}
              />
            </div>
          </div>
        ))}
      </div>
      {showBackdrop && <Backdrop toggleBackdrop={toggleBackdrop} onSuccess={handleGroupCreated} />}
      {showEditBackdrop && <EditBackdrop toggleEditBackdrop={toggleEditBackdrop} groupId={selectedGroup._id} />}
      {showDeleteModal && (
        <DeleteConfirmationModal
          onCancel={handleCancelDelete}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
}