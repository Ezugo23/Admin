import React, { useState, useEffect } from 'react';
import { FiCamera } from 'react-icons/fi';
import Select from 'react-select';
import 'react-dropdown-tree-select/dist/styles.css';
import { FiX } from 'react-icons/fi';
import ImageCropper from './imageCropper';
import { useRef } from 'react';
import { useParams } from 'react-router-dom';

export default function AddFood({ onClose, onAddFood, restaurantId }) {
  const [foodData, setFoodData] = useState({
    image: '',
    category: '',
    foodName: '',
    details: '',
    sideMenu: [],
    discount: '',
    price: '',
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [sideMenus, setSideMenus] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const previewImageRef = useRef(null);
  const { menuId, id } = useParams();

  useEffect(() => {
    // Fetch categories from API
    fetch('https://delivery-chimelu-new.onrender.com/api/v1/category/all')
      .then((response) => response.json())
      .then((data) => {
        const categoryOptions = data.map((category) => ({
          value: category._id,
          label: category.title,
        }));
        setCategories(categoryOptions);
      })
      .catch((error) => console.error('Error fetching categories:', error));

    // Fetch side menus from API
    fetch(`https://delivery-chimelu-new.onrender.com/api/v1/foods/additive/group/${id}`)
      .then((response) => response.json())
      .then((data) => {
        const sideMenuOptions = data.map((sideMenu) => ({
          value: sideMenu._id,
          label: sideMenu.requiredCount
            ? `${sideMenu.name} - x${sideMenu.requiredCount}`
            : sideMenu.name,
        }));
        setSideMenus(sideMenuOptions);
      })
      .catch((error) => console.error('Error fetching side menus:', error));
  }, [id]);

  const handleSelectImage = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCategoryChange = (selectedOption) => {
    setFoodData((prevState) => ({
      ...prevState,
      category: selectedOption.value,
    }));
  };

  const handleSideMenuChange = (selectedOptions) => {
    const selectedOptionValues = selectedOptions.map((option) => option.value);
    setFoodData((prevState) => ({
      ...prevState,
      sideMenu: selectedOptionValues,
    }));
  };

  const handleFoodNameChange = (e) => {
    const { value } = e.target;
    setFoodData((prevState) => ({
      ...prevState,
      foodName: value,
    }));
  };

  const handleDetailsChange = (e) => {
    const { value } = e.target;
    setFoodData((prevState) => ({
      ...prevState,
      details: value,
    }));
  };

  const handleDiscountChange = (selectedOption) => {
    setFoodData((prevState) => ({
      ...prevState,
      discount: selectedOption.value,
    }));
  };

  const handlePriceChange = (e) => {
    const { value } = e.target;
    setFoodData((prevState) => ({
      ...prevState,
      price: value,
    }));
  };

  const handleSaveClick = () => {
    setLoading(true);

    if (!foodData.image || !foodData.foodName || !foodData.details || !foodData.price) {
      setErrorMessage('Please fill in all required fields.');
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append('category', String(foodData.category));
    formData.append('menus', String(menuId));
    formData.append('restaurant', String(id)); // Adding restaurant ID
    foodData.sideMenu.forEach((additiveId) => {
      formData.append('additiveIds', additiveId);
    });
    formData.append('image', foodData.image);
    formData.append('title', foodData.foodName);
    formData.append('price', foodData.price);
    formData.append('description', foodData.details);
    formData.append('discount', foodData.discount);

    fetch(`https://delivery-chimelu-new.onrender.com/api/v1/foods/${id}`, {
      method: 'POST',
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((data) => {
            throw new Error(data.message || 'Failed to add food');
          });
        }
        return response.json();
      })
      .then((data) => {
        setShowSuccessMessage(true);
        onAddFood(data); 
        window.location.reload();
      })
      .catch((error) => {
        if (error.message.includes('already an ongoing discount')) {
          setErrorMessage('There is already an ongoing discount for this menu item.');
        } else {
          setErrorMessage('Failed to add food. Please try again.');
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const updateFoodImage = (imageSrc) => {
    previewImageRef.current = imageSrc;

    const mimeType = imageSrc.split(';')[0].slice(5);
    const binaryString = atob(imageSrc.split(',')[1]);
    const array = Array.from(binaryString, (char) => char.charCodeAt(0));
    const blob = new Blob([new Uint8Array(array)], { type: mimeType });
    const file = new File([blob], 'cropped_image.' + mimeType.split('/')[1], {
      type: mimeType,
    });

    setFoodData((prevState) => ({
      ...prevState,
      image: file,
    }));
  };

  const discountOptions = Array.from({ length: 100 }, (_, i) => ({
    value: i + 1,
    label: `${i + 1}%`,
  }));

  return (
    <div className="p-3 text-lg rounded-md shadow-md">
      <FiX className="close-icon-food" onClick={onClose} />
      <p className="text-xl mb-2 text-center font-bold">Add New Food</p>
      <div className="relative">
        <div className="h-14 w-12 border-2 m-auto rounded-md mt-2 relative flex justify-center items-center">
          {previewImageRef.current ? (
            <img
              src={previewImageRef.current}
              alt="Preview"
              className="h-full w-full object-cover"
            />
          ) : (
            <>
              <FiCamera
                className="absolute w-6 h-6 text-gray-600 cursor-pointer"
                onClick={handleSelectImage}
              />
              <input
                id="image"
                className="absolute inset-0 opacity-0 cursor-pointer"
                onClick={handleSelectImage}
              />
            </>
          )}
          {previewImage && (
            <img
              src="/edit.png"
              className="absolute bottom-0 right-0 mr-0 mb-0 ml-4 w-5 h-5 text-gray-600 cursor-pointer"
            />
          )}
        </div>
      </div>
      {errorMessage && (
        <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
      )}

      <div className="w-full mt-1">
        <label htmlFor="category">Category</label>
        <Select
          id="category"
          options={categories}
          onChange={handleCategoryChange}
        />
      </div>
      <div className="w-full mt-1">
        <label htmlFor="foodName">Food Name</label>
        <input
          type="text"
          id="foodName"
          value={foodData.foodName}
          onChange={handleFoodNameChange}
          className="w-full p-2 border border-gray-300 rounded-md mt-1"
        />
      </div>
      <div className="w-full mt-1">
        <label htmlFor="details">Details</label>
        <textarea
          id="details"
          value={foodData.details}
          onChange={handleDetailsChange}
          className="w-full p-2 border border-gray-300 rounded-md mt-1"
        />
      </div>
      <div className="w-full mt-1">
        <label htmlFor="sideMenu">Side Menu</label>
        <Select
          id="sideMenu"
          options={sideMenus}
          onChange={handleSideMenuChange}
          isMulti
        />
      </div>
      <div className="w-full mt-1">
        <label htmlFor="discount">Discount</label>
        <Select
          id="discount"
          options={discountOptions}
          onChange={handleDiscountChange}
        />
      </div>
      <div className="w-full mt-1">
        <label htmlFor="price">Price</label>
        <input
          type="number"
          id="price"
          value={foodData.price}
          onChange={handlePriceChange}
          className="w-full p-2 border border-gray-300 rounded-md mt-1"
        />
      </div>
      <button
        onClick={handleSaveClick}
        className="w-full py-2 px-4 bg-blue-500 text-white rounded-md mt-3"
        disabled={loading}
      >
        {loading ? 'Saving...' : 'Save'}
      </button>
      {showSuccessMessage && (
        <p className="text-green-500 text-sm mt-1">
          Food added successfully!
        </p>
      )}
      <ImageCropper
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        updateFoodImage={updateFoodImage}
        // src={selectedImageFile ? URL.createObjectURL(selectedImageFile) : null}
      />
    </div>
  );
}