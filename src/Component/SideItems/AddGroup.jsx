import React, { useState, useEffect } from 'react';
import { FiX } from 'react-icons/fi';
import Select from 'react-select';
import axios from 'axios';
import '../FoodMenu/style.css';
import { SpinnerDotted } from 'spinners-react';
import { useParams } from 'react-router-dom';

export default function Backdrop({ toggleBackdrop, onSuccess }) {
  const { id } = useParams();
  const [groupName, setGroupName] = useState('');
  const [selectableCount, setSelectableCount] = useState('');
  const [isCheckedRequired, setIsCheckedRequired] = useState(false);
  const [isCheckedOptional, setIsCheckedOptional] = useState(false);
  const [selectedAdditives, setSelectedAdditives] = useState([]);
  const [availableAdditives, setAvailableAdditives] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [restaurantId, setRestaurantId] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchAdditives();
  }, []);

  const fetchAdditives = async () => {
    try {
      const response = await axios.get(`https://delivery-chimelu-new.onrender.com/api/v1/foods/additive/${id}`);
      const filteredAdditives = response.data.filter(additive => additive.isAvailable);
      setAvailableAdditives(filteredAdditives.slice(0, 60));
    } catch (error) {
      console.error('Error fetching additives:', error);
      setIsLoading(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newErrors = {};

    if (!groupName) {
      newErrors.groupName = 'Group Name is required';
    }
    if (!selectableCount) {
      newErrors.selectableCount = 'Selectable Count is required';
    }
    if (selectedAdditives.length === 0) {
      newErrors.selectedAdditives = 'At least one additive must be selected';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsCreating(true);
    const selectedIds = selectedAdditives.map(additive => additive.value);
    const payload = {
      requiredCount: parseInt(selectableCount),
      name: groupName,
      additives: selectedIds,
      optional: isCheckedOptional
    };

    try {
      const storedRestaurantId = localStorage.getItem('userId');
      if (storedRestaurantId) {
        setRestaurantId(storedRestaurantId);
      }
      await axios.post(`https://delivery-chimelu-new.onrender.com/api/v1/foods/additive-group/${id}`, payload);
      console.log('Group created successfully:', payload);
      // Reset form fields and close backdrop
      setGroupName('');
      setSelectableCount('');
      setSelectedAdditives([]);
      toggleBackdrop();
      onSuccess();
    } catch (error) {
      console.error('Error creating group:', error);
    } finally {
      setIsCreating(false);
    }
  };

  const handleRequiredCheckboxChange = () => {
    setIsCheckedRequired(!isCheckedRequired);
    setIsCheckedOptional(false);
  };

  const handleOptionalCheckboxChange = () => {
    setIsCheckedOptional(!isCheckedOptional);
    setIsCheckedRequired(false);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleChangeSelectedAdditives = (selectedOptions) => {
    setSelectedAdditives(selectedOptions);
  };

  const formatAdditiveLabel = (additive) => {
    if (additive.price) {
      return `${additive.name} - NGN ${additive.price}`;
    } else {
      return additive.name;
    }
  };

  const filteredAdditives = availableAdditives.filter(additive =>
    additive.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const options = filteredAdditives.map(additive => ({ value: additive._id, label: formatAdditiveLabel(additive) }));

  return (
    <div className="fixed top-0 left-0 h-screen w-screen bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="relative w-[500px] bg-white rounded-md shadow-md p-6">
        <form onSubmit={handleSubmit}>
          <div className="flex justify-between items-center mb-4">
            <p className="text-sm font-semibold">Select Group Type</p>
            <FiX className="text-gray-500 cursor-pointer" onClick={toggleBackdrop} size={20} />
          </div>
          <div className="flex gap-8 mb-4">
            <div className="flex items-center gap-1">
              <div
                className={`h-6 w-6 cursor-pointer rounded-full border-2 ${isCheckedRequired ? 'border-red-500' : 'border-gray-400'}`}
                onClick={handleRequiredCheckboxChange}
              >
                {isCheckedRequired && <div className="h-4 w-4 bg-red-500 rounded-full"></div>}
              </div>
              <p>Required</p>
            </div>
            <div className="flex items-center gap-2">
              <div
                className={`h-6 w-6 cursor-pointer rounded-full border-2 ${isCheckedOptional ? 'border-emerald-500' : 'border-gray-400'}`}
                onClick={handleOptionalCheckboxChange}
              >
                {isCheckedOptional && <div className="h-4 w-4 bg-emerald-500 rounded-full"></div>}
              </div>
              <p>Optional</p>
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="groupName" className="font-semibold text-sm">Group Name</label>
            <input
              type="text"
              id="groupName"
              className="border-2 rounded-md bg-gray-100 w-full p-2 mt-2"
              value={groupName}
              onChange={(e) => {
                setGroupName(e.target.value);
                setErrors({ ...errors, groupName: '' });
              }}
            />
            {errors.groupName && <p className="text-red-500 text-sm">{errors.groupName}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="selectedAdditives" className="font-semibold text-sm">Selected Additives</label>
            <Select
              id="selectedAdditives"
              options={options}
              value={selectedAdditives}
              onChange={handleChangeSelectedAdditives}
              isMulti
            />
            {errors.selectedAdditives && <p className="text-red-500 text-sm">{errors.selectedAdditives}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="selectableCount" className="font-semibold text-sm">Selectable Count</label>
            <input
              type="text"
              id="selectableCount"
              className="h-10 rounded-md w-full border-2 p-2"
              value={selectableCount}
              onChange={(e) => {
                setSelectableCount(e.target.value);
                setErrors({ ...errors, selectableCount: '' });
              }}
            />
            {errors.selectableCount && <p className="text-red-500 text-sm">{errors.selectableCount}</p>}
          </div>
          <div className="flex justify-center">
            <button type="submit" className="bg-emerald-500 text-white text-sm font-semibold py-2 px-4 rounded-md">
              {isCreating ? 'Grouping...' : 'Group'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}