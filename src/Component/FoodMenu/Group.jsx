import React, { useState } from 'react';
import { FiX } from 'react-icons/fi';

export default function Groups({ toggleBackdrop }) {
  const [groupName, setGroupName] = useState('');
  const [selectableCount, setSelectableCount] = useState('');
  const [isCheckedRequired, setIsCheckedRequired] = useState(false);
  const [isCheckedOptional, setIsCheckedOptional] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const payload = {
      requiredCount: parseInt(selectableCount),
      name: groupName,
      optional: isCheckedOptional,
    };

    console.log('Group created successfully:', payload);
    // Reset form fields and close backdrop
    setGroupName('');
    setSelectableCount('');
    setIsCheckedRequired(false);
    setIsCheckedOptional(false);
    toggleBackdrop();
  };

  const handleRequiredCheckboxChange = () => {
    setIsCheckedRequired(!isCheckedRequired);
    setIsCheckedOptional(false);
  };

  const handleOptionalCheckboxChange = () => {
    setIsCheckedOptional(!isCheckedOptional);
    setIsCheckedRequired(false);
  };

  return (
    <div className="fixed top-0 left-0 h-screen w-screen bg-gray-100 z-50 flex justify-center items-center">
      <div className="w-[400px] bg-white rounded-md shadow-md p-4">
        <form onSubmit={handleSubmit}>
          <div className="flex justify-between items-center mb-4">
            <p className="text-lg font-semibold">Create New Group</p>
            <FiX className="text-gray-500 cursor-pointer" onClick={toggleBackdrop} size={20} />
          </div>
          <div className="mb-4">
            <label htmlFor="groupName" className="font-semibold text-sm">Group Name</label>
            <input
              type="text"
              id="groupName"
              className="border-2 rounded-md bg-gray-100 w-full p-2 mt-2"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="font-semibold text-sm">Select Group Type</label>
            <div className="flex mt-2">
              <div
                className={`h-6 w-6 cursor-pointer rounded-full border-2 ${isCheckedRequired ? 'border-red-500' : 'border-gray-400'}`}
                onClick={handleRequiredCheckboxChange}
              >
                {isCheckedRequired && <div className="h-4 w-4 bg-red-500 rounded-full"></div>}
              </div>
              <p className="ml-2">Required</p>
              <div
                className={`h-6 w-6 cursor-pointer rounded-full border-2 ml-4 ${isCheckedOptional ? 'border-emerald-500' : 'border-gray-400'}`}
                onClick={handleOptionalCheckboxChange}
              >
                {isCheckedOptional && <div className="h-4 w-4 bg-emerald-500 rounded-full"></div>}
              </div>
              <p className="ml-2">Optional</p>
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="selectableCount" className="font-semibold text-sm">Selectable Count</label>
            <input
              type="number"
              id="selectableCount"
              className="border-2 rounded-md bg-gray-100 w-full p-2 mt-2"
              value={selectableCount}
              onChange={(e) => setSelectableCount(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-end">
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-semibold">
              Create Group
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}