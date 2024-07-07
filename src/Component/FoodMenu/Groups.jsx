import React, { useState } from "react";
import { BsPlus, BsTrash } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import Groups from './Group'

// Mock data for groups
const mockGroupData = [
  {
    _id: 1,
    name: "Group 1",
    optional: false,
    requiredCount: 3,
    additives: [
      { _id: 1, name: "Additive 1", price: 200 },
      { _id: 2, name: "Additive 2", price: 300 },
      { _id: 3, name: "Additive 3", price: 250 }
    ]
  },
  {
    _id: 2,
    name: "Group 2",
    optional: true,
    requiredCount: 2,
    additives: [
      { _id: 4, name: "Additive 4", price: 150 },
      { _id: 5, name: "Additive 5", price: 180 }
    ]
  },
  {
    _id: 3,
    name: "Group 3",
    optional: true,
    requiredCount: 2,
    additives: [
      { _id: 4, name: "Additive 4", price: 150 },
      { _id: 5, name: "Additive 5", price: 180 }
    ]
  },
  {
    _id: 4,
    name: "Group 4",
    optional: true,
    requiredCount: 2,
    additives: [
      { _id: 4, name: "Additive 4", price: 150 },
      { _id: 5, name: "Additive 5", price: 180 }
    ]
  }
];

const GroupSideItem = ({ onDelete }) => {
  const [showBackdrop, setShowBackdrop] = useState(false);
  const [showEditBackdrop, setShowEditBackdrop] = useState(false);
  const [groupData, setGroupData] = useState(mockGroupData);
  const [selectedGroup, setSelectedGroup] = useState(null);

  const toggleBackdrop = () => {
    setShowBackdrop(!showBackdrop);
  };

  const toggleEditBackdrop = (group) => {
    setSelectedGroup(group);
    setShowEditBackdrop(!showEditBackdrop);
  };

  const handleDeleteClick = (group) => {
    // Handle delete logic here
    console.log('Delete group:', group);
  };

  return (
    <div className="bg-white overflow-y-auto h-full">
      <div className="flex items-center px-3 bg-gray-50 py-4 justify-between">
        <p className="text-2xl font-semibold">All Groups</p>
        <div
          className="flex px-3 py-2 rounded-lg text-base text-white font-semibold bg-green-500 gap-1 items-center cursor-pointer"
          onClick={toggleBackdrop} // Toggle Add Group modal
        >
          <BsPlus className="text-lg stroke-1" />
          <p>Add a New Group</p>
        </div>
      </div>
      <div className="space-y-3">
        {groupData.map((group) => (
          <div key={group._id} className="flex px-3 justify-between items-center">
            <div>
              <p className="mb-1">
                <span className="font-semibold text-base mr-4">
                  {group.name}{' '}
                  <span style={{ color: group.optional ? 'green' : 'red' }}>
                    {group.optional ? '(Optional)' : '(Required)'}
                  </span>
                </span>{' '}
                <span>X{group.requiredCount}</span>
              </p>
              <p className="text-sm">
                {group.additives.map((additive, index) => (
                  <span key={additive._id}>
                    {additive.name}
                    {additive.price ? ` (₦${additive.price})` : ''}
                    {index !== group.additives.length - 1 ? ', ' : ''}
                  </span>
                ))}
              </p>
            </div>
            <div className="flex items-center text-lg gap-6">
              <FiEdit
                className="text-[green] cursor-pointer"
                onClick={() => toggleEditBackdrop(group)} // Toggle Edit Group modal
              />
              <BsTrash
                className="text-[red] cursor-pointer"
                onClick={() => handleDeleteClick(group)}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Overlay for Add New Group Modal */}
      {showBackdrop && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <Groups toggleBackdrop={toggleBackdrop} />
        </div>
      )}

      {/* Overlay for Edit Group Modal */}
      {showEditBackdrop && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <Groups
            toggleBackdrop={() => toggleEditBackdrop(selectedGroup)} // Pass toggle function and selected group
            group={selectedGroup} // Pass selected group to edit
          />
        </div>
      )}
    </div>
  );
};

export default GroupSideItem;