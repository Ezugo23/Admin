import React, { useState, useEffect, useRef } from 'react';
import { FiCamera } from 'react-icons/fi';
import Select from 'react-select';
import './addFood.css';
import { FiX } from 'react-icons/fi';
import './header.css';
import './style.css';
import ImageCropper from './imageCropper';

export default function EditFood({ onClose, foodId, id }) {
  const [foodData, setFoodData] = useState({
    image: '',
    category: null,
    foodName: '',
    details: '',
    sideMenu: [],
    discount: '',
    price: '',
    menu: null,
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [categories, setCategories] = useState([]);

  const [menus, setMenus] = useState([]);
  const [sideMenus, setSideMenus] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const previewImageRef = useRef(null);
  const handleEditImage = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    // Fetch existing food data based on foodId and populate the state
    fetch(`https://delivery-chimelu-new.onrender.com/api/v1/foods/${foodId}`)
      .then((response) => response.json())
      .then((data) => {
        // Set foodData state with existing food data
        setFoodData({
          image: data.image,
          category: data.category,
          menu: data.menus,
          foodName: data.title,
          details: data.description,
          discount: data.discount * 100,
          price: data.price,
          sideMenu: data.additives.map((sideMenu) => sideMenu._id),
          // Populate other fields as needed
        });
        setPreviewImage(data.image);
      })
      .catch((error) => console.error('Error fetching food data:', error));

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
    const storedRestaurantId = localStorage.getItem('userId');
    if (!storedRestaurantId) {
      navigate('/signin');
      return;
    }

    fetch(
      `https://delivery-chimelu-new.onrender.com/api/v1/menu/menusrestaurant/${id}`
    )
      .then((response) => response.json())
      .then((data) => {
        const menuOptions = data.map((menu) => ({
          value: menu._id,
          label: menu.name,
        }));
        setMenus(menuOptions);
      })
      .catch((error) => console.error('Error fetching categories:', error));
    // Fetch side menus from API
    fetch(
      `https://delivery-chimelu-new.onrender.com/api/v1/foods/additive/group/${id}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch side menus');
        }
        return response.json();
      })
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
  }, [foodId]);

  const handleCategoryChange = (selectedOption) => {
    setFoodData((prevState) => ({
      ...prevState,
      category: selectedOption.value, // Store the selected category ID or an empty string if no category is selected
    }));
    console.log('Category selected:', selectedOption.value);
  };
  const handleMenuChange = (selectedOption) => {
    setFoodData((prevState) => ({
      ...prevState,
      menu: selectedOption.value,
    }));
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
    // Create FormData object to store image data
    const formData = new FormData();

    // Add image data to FormData if it has been updated
    if (foodData.image) {
      formData.append('image', foodData.image);
    }

    // Add other food data to FormData
    formData.append('category', foodData.category);
    formData.append('menus', foodData.menu);
    foodData.sideMenu.forEach((sideMenu) => {
      formData.append('additives', sideMenu);
    });
    formData.append('title', foodData.foodName);
    formData.append('price', foodData.price);
    formData.append('description', foodData.details);
    formData.append('discount', foodData.discount);

    // Send request to update food data
    fetch(
      `https://delivery-chimelu-new.onrender.com/api/v1/foods/edit-restaurant/${foodId}`,
      {
        method: 'PATCH',
        body: formData,
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log('Food data updated successfully:', data);
        setFoodData(data.updatedFood);
        onClose();
        window.location.reload();
        // Close the modal or perform any other action upon successful update
      })
      .catch((error) => {
        console.error('Error updating food data:', error);
        // Handle error
      });
  };

  const updateEditImage = (imageSrc) => {
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
    setPreviewImage(imageSrc);
  };

  const discountOptions = Array.from({ length: 100 }, (_, i) => ({
    value: i + 1,
    label: `${i + 1}%`,
  }));

  return (
    <div className="popup-overlay overflow-y-auto">
      <div className="p-3 border-2 popup-content text-lg rounded-md shadow-md w-500">
        <FiX className="close-icon-food " onClick={onClose} />
        <p className="text-xl mb-4 text-center  font-bold">Edit Food</p>
        <div className="relative">
          <div className="h-14 w-12 border-2 m-auto rounded-md mt-2 relative flex justify-center items-center">
            {previewImage ? (
              <img
                src={previewImage}
                alt="Preview"
                className="h-full w-full object-cover"
              />
            ) : (
              <>
                <FiCamera
                  className="absolute w-6 h-6 text-gray-600 cursor-pointer"
                  onClick={handleEditImage}
                />
                <input
                  id="image"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onClick={handleEditImage}
                />
              </>
            )}
            {previewImage && (
              <img
                src="/edit.png"
                className="absolute bottom-0 right-0 mr-0 mb-0 ml-4 w-5 h-5 text-gray-600 cursor-pointer"
                onClick={handleEditImage}
              />
            )}
          </div>
        </div>

        <div className="w-full mt-1">
          <label htmlFor="category">Category</label>
          <Select
            id="category"
            options={categories}
            onChange={handleCategoryChange}
            value={categories.find((cat) => cat.value === foodData.category)}
          />
        </div>
        <div className="w-full mt-1">
          <label htmlFor="menu">Food Menu</label>
          <Select
            id="menu"
            options={menus}
            onChange={handleMenuChange}
            value={menus.find((menu) => menu.value === foodData.menu)}
          />
        </div>
        <div className="w-full mt-1">
          <label htmlFor="foodName">Food Name</label>
          <input
            type="text"
            id="foodName"
            className="h-8 w-full border-2"
            onChange={handleFoodNameChange}
            value={foodData.foodName}
          />
        </div>

        <div className="w-full mt-1">
          <label htmlFor="sideMenu">Side items</label>
          <Select
            id="sideMenu"
            options={sideMenus}
            isMulti
            onChange={handleSideMenuChange}
            value={sideMenus.filter((menu) =>
              foodData.sideMenu.includes(menu.value)
            )}
          />
        </div>

        <div className="w-full mt-1">
          <label htmlFor="details">Details</label>
          <input
            type="text"
            id="details"
            className="h-8 w-full border-2"
            onChange={handleDetailsChange}
            value={foodData.details}
          />
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
          <label htmlFor="price">Price(₦)</label>
          <input
            type="number"
            id="price"
            className="h-8 w-full border-2"
            onChange={handlePriceChange}
            value={foodData.price}
          />
        </div>

        <div className="mt-3 center">
          <button
            onClick={handleSaveClick}
            className="px-2 py-1 rounded-md bg-green-500 text-white font-semibold shadow-md"
          >
            Save
          </button>
        </div>
      </div>
      <ImageCropper
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        updateEditImage={updateEditImage}
      />
    </div>
  );
}
