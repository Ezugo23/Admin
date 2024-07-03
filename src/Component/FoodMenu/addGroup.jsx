import React, { useState, useEffect } from 'react';
import { FiCamera } from 'react-icons/fi';
import Select from 'react-select';
import 'react-dropdown-tree-select/dist/styles.css';
import { FiX } from 'react-icons/fi';
import ImageCropper from './imageCropper';
import { useRef } from 'react';

export default function AddFood({ onClose, menuId, id }) {
  const [foodData, setFoodData] = useState({
    image: '',
    category: null,
    foodName: '',
    details: '',
    sideMenu: [],
    discount: '',
    price: '',
    menus: '',
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [sideMenus, setSideMenus] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const previewImageRef = useRef(null);

  const handleSelectImage = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const storedRestaurantId = localStorage.getItem('userId');
    if (!storedRestaurantId) {
      navigate('/signin');
      return;
    }
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
    fetch(
      `https://delivery-chimelu-new.onrender.com/api/v1/foods/additive/group/${menuId}`
    )
      .then((response) => response.json())
      .then((data) => {
        const sideMenuOptions = data.map((sideMenu) => ({
          value: sideMenu._id,
          label: sideMenu.requiredCount
            ? `${sideMenu.name}-x${sideMenu.requiredCount}`
            : sideMenu.name,
        }));
        setSideMenus(sideMenuOptions);
      })
      .catch((error) => console.error('Error fetching side menus:', error));
  }, []);

  const handleCategoryChange = (selectedOption) => {
    setFoodData((prevState) => ({
      ...prevState,
      category: selectedOption.value, // Store the selected category ID or an empty string if no category is selected
    }));
    console.log('Category selected:', selectedOption.value);
  };

  const handleSideMenuChange = (selectedOptions) => {
    // Map over the array of selected options and extract the value of each option
    const selectedOptionValues = selectedOptions.map((option) => option.value);
    setFoodData((prevState) => ({
      ...prevState,
      sideMenu: selectedOptionValues, // Store the selected side menu IDs in an array
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
    setLoading(true); // Set loading to true before fetch operation

    if (
      !foodData.image ||
      !foodData.foodName ||
      !foodData.details ||
      !foodData.price
    ) {
      setErrorMessage('Please fill in all required fields.'); // Set error message
      setLoading(false); // Stop loading
      return; // Exit the function early
    }

    const formData = new FormData();
    formData.append('category', String(foodData.category));
    formData.append('menus', String(menuId));
    foodData.sideMenu.forEach((additiveId) => {
      formData.append('additiveIds', additiveId);
    });
    formData.append('image', foodData.image);
    formData.append('title', foodData.foodName);
    formData.append('price', foodData.price);
    formData.append('description', foodData.details);
    formData.append('discount', foodData.discount); // Add discount if applicable

    console.log('Form Data:', formData);

    const storedRestaurantId = localStorage.getItem('userId');
    if (!storedRestaurantId) {
      navigate('/signin');
      setLoading(false); // Stop loading
      return;
    }
    // Send the form data to the API
    fetch(`https://delivery-chimelu-new.onrender.com/api/v1/foods/${menuId}`, {
      method: 'POST',
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to add food');
        }
        // Handle success
        return response.json();
      })
      .then((data) => {
        setShowSuccessMessage(true);
        console.log('Food added successfully:', data);
        setTimeout(() => {
          setShowSuccessMessage(false);
          onClose();
          window.location.reload(); // Close the modal after success message
        }, 2000);
      })
      .catch((error) => {
        console.error('Error adding food:', error);
        // Handle error
      })
      .finally(() => {
        setLoading(false); // Stop loading
      });
  };

  const updateFoodImage = (imageSrc) => {
    previewImageRef.current = imageSrc;

    // Converting the data URL to a File object
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
    <div className="p-3  text-lg rounded-md shadow-md ">
      <FiX className="close-icon-food " onClick={onClose} />
      <p className="text-xl mb-2 text-center font-bold">Add New Food </p>
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
                // onClick={handleImageClick}
                onClick={handleSelectImage}
              />
              <input
                // type="file"
                id="image"
                className="absolute inset-0 opacity-0 cursor-pointer"
                onClick={handleSelectImage}
                // accept="image/*"
                // onChange={handleImageChange}
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
          className="h-8 w-full border-2"
          onChange={handleFoodNameChange}
        />
        {errorMessage && (
          <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
        )}
      </div>

      <div className="w-full mt-1">
        <label htmlFor="sideMenu">Side items</label>
        <Select
          id="sideMenu"
          options={sideMenus}
          isMulti
          onChange={handleSideMenuChange}
        />
      </div>

      <div className="w-full mt-1">
        <label htmlFor="details">Details</label>
        <input
          type="text"
          id="details"
          className="h-8 w-full border-2"
          onChange={handleDetailsChange}
        />
        {errorMessage && (
          <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
        )}
      </div>
      <div className="w-full mt-1">
        <label htmlFor="discount">Discount (%)</label>
        <Select
          id="discount"
          options={discountOptions}
          onChange={handleDiscountChange}
          value={discountOptions.find(
            (option) => option.value === parseInt(foodData.discount)
          )}
        />
      </div>

      <div className="w-full mt-1">
        <label htmlFor="price">Price</label>
        <input
          type="number"
          id="price"
          className="h-8 w-full border-2"
          onChange={handlePriceChange}
          placeholder="₦"
        />
        {errorMessage && (
          <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
        )}
      </div>
      <div className="mt-3 center">
        <button
          onClick={handleSaveClick}
          disabled={loading}
          className="px-2 py-1 rounded-md bg-green-500 text-white font-semibold shadow-md"
        >
          {loading ? 'Saving...' : 'Save'}
        </button>
      </div>
      {showSuccessMessage && (
        <div className="mt-4 text-green-500">Item successfully added!</div>
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
