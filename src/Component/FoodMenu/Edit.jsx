import { useState, useEffect } from "react";
import { BsCheck } from "react-icons/bs";
import { TiArrowSortedDown } from "react-icons/ti";
import { FiX } from 'react-icons/fi';
import './style.css';

export default function Edit({ onClose, discount }) {
  const [open, setOpen] = useState(false);
  const [menuItems, setMenuItems] = useState([]);
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);
  const [discountOptions, setDiscountOptions] = useState([]);
  const [values, setValues] = useState({
    discount: "",
    types: [],
    starts: "",
    ends: "",
  });
  const [errors, setErrors] = useState({
    discount: "",
    types: "",
    starts: "",
    ends: "",
  });

  useEffect(() => {
    generateDiscountOptions();
    fetchMenuItems();
  }, []);

  useEffect(() => {
    if (menuItems.length > 0) {
      setInitialValues(menuItems);
    }
  }, [menuItems, discount]);

  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  const fetchMenuItems = async () => {
    const storedRestaurantId = localStorage.getItem('userId');
    if (!storedRestaurantId) {
      navigate('/signin');
      return;
    }
    try {
      const response = await fetch(`https://swifdropp.onrender.com/api/v1/menu/menusrestaurant/${storedRestaurantId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch menu items");
      }
      const data = await response.json();
      setMenuItems(data);
    } catch (error) {
      console.error("Error fetching menu items:", error);
    }
  };

  const setInitialValues = (menuItemsData) => {
    const initialValues = {
      discount: discount.discount*100,
      types: discount.discountType === 'allMenu' ? ['All'] : ['Select'],
      starts: discount.startDate.split('T')[0],
      ends: discount.endDate.split('T')[0],
    };

    if (discount.discountType === 'selectMenu') {
      const selectedMenuItem = menuItemsData.find(item => item._id === discount.selectedMenuItems[0]);
      setSelectedMenuItem(selectedMenuItem || null);
    }

    setValues(initialValues);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues(prevValues => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleMenuItemClick = (menuItem) => {
    setSelectedMenuItem(menuItem);
    setOpen(false);
  };

  const generateDiscountOptions = () => {
    const options = Array.from({ length: 100 }, (_, i) => ({ value: i + 1, label: `${i + 1}%` }));
    setDiscountOptions(options);
  };
  const handleSubmit = async () => {
    // Construct the updatedDiscount object without startDate initially
    const updatedDiscount = {
      discount: values.discount,
      discountType: selectedMenuItem ? 'selectMenu' : 'allMenu',
      selectedMenuItems: selectedMenuItem ? [selectedMenuItem._id] : [],
      endDate: values.ends,
    };
  
    // Add startDate only if the discount is not ongoing
    if (!discount.applied) {
      updatedDiscount.startDate = values.starts;
    }
  
    try {
      const response = await fetch(`https://swifdropp.onrender.com/api/v1/restaurant/restaurantDiscount/edit/${discount._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedDiscount),
      });
  
      const isJson = response.headers.get('content-type')?.includes('application/json');
      const data = isJson ? await response.json() : await response.text();
  
      if (!response.ok) {
        throw new Error(isJson ? data.message : data || "Failed to update discount");
      }
  
      console.log("Discount updated successfully:", data);
      window.location.reload()
      onClose();
    } catch (error) {
      console.error("Error updating discount:", error);
    }
  };
  
  

  return (
    <div className="popup-overlay overflow-y-auto">
      <div className="p-4 w-80 border-2 shadow-lg popup-content translate-x-2 bg-white rounded-md">
        <p className="text-2xl font-bold text-center mb-3">Edit Discount</p>
        <FiX className="popup-close" onClick={handleClose} />
        <div>
          <p className="text-13 mb-1">Discount</p>
          <div className="h-12 border-2 rounded-md overflow-hidden">
            <select
              onChange={handleChange}
              name="discount"
              className="bg-gray-50 h-full w-full text-sm outline-none border-none pl-2"
              value={values.discount}
            >
              <option value="">Select Discount</option>
              {discountOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
          {errors.discount && <p className="text-red-500">{errors.discount}</p>}
        </div>
        <div className="mt-3">
          <p className="text-13 mb-1">Type</p>
          <div
            onClick={() => setOpen(!open)}
            className="h-12 bg-gray-50 overflow-hidden border-2 cursor-pointer flex justify-between items-center px-3 rounded-md relative"
          >
            <input
              type="text"
              value={selectedMenuItem ? selectedMenuItem.name : "(Select type)"}
              readOnly
              className="text-sm bg-transparent w-full outline-none cursor-pointer"
            />
            <TiArrowSortedDown
              className={`text-gray-500 text-lg duration-300 ${open ? "-rotate-180" : "rotate-0"}`}
            />
          </div>
          {errors.types && <p className="text-red-500">{errors.types}</p>}
          <div
            className={`bg-gray-50 flex flex-col gap-3 duration-300 ${open ? "shadow-md px-3 py-5 mt-1" : "h-0 overflow-hidden"}`}
          >
            {menuItems.map((menuItem) => (
              <div
                key={menuItem._id}
                className={`flex items-center gap-3 cursor-pointer ${selectedMenuItem && selectedMenuItem._id === menuItem._id ? "bg-blue-200" : ""}`}
                onClick={() => handleMenuItemClick(menuItem)}
              >
                <div className="h-5 w-5 center rounded-full bg-transparent border-2">
                  {selectedMenuItem && selectedMenuItem._id === menuItem._id && <BsCheck />}
                </div>
                <p className="text-sm">
                  {menuItem.name === "All" ? "On all orders" : `On all ${menuItem.name}`}
                </p>
              </div>
            ))}
          </div>
          {errors.types && <p className="text-red-500">{errors.types}</p>}
        </div>
        <div className="mt-3">
          <p className="text-13 mb-1">Starts</p>
          <div className="h-12 border-2 overflow-hidden rounded-md relative">
            <input
              type="date"
              onChange={handleChange}
              name="starts"
              className="bg-gray-50 h-full w-full text-sm outline-none border-none pl-2"
              value={values.starts}
            />
          </div>
          {errors.starts && <p className="text-red-500">{errors.starts}</p>}
        </div>
        <div className="mt-3">
          <p className="text-13 mb-1">Ends</p>
          <div className="h-12 border-2 overflow-hidden rounded-md relative">
            <input
              type="date"
              onChange={handleChange}
              name="ends"
              className="bg-gray-50 h-full w-full text-sm outline-none border-none pl-2"
              value={values.ends}
            />
          </div>
          {errors.ends && <p className="text-red-500">{errors.ends}</p>}
        </div>
        <div className="center mt-3">
          <button
            onClick={handleSubmit}
            className="px-4 py-2 duration-300 active:scale-90 rounded-md shadow-md bg-green-500 text-white font-semibold"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
