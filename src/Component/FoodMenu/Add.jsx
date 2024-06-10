import { useState, useEffect } from "react";
import { BiCalendar } from "react-icons/bi";
import { BsCheck } from "react-icons/bs";
import { TiArrowSortedDown } from "react-icons/ti";
import './style.css';
import { FiX } from 'react-icons/fi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Spinner } from "react-bootstrap";
// import 'bootstrap/dist/css/bootstrap.min.css';

export default function Add({ onClose }) {
  const [open, setOpen] = useState(false);
  const [creatingDiscount, setCreatingDiscount] = useState(false);
  const [menuItems, setMenuItems] = useState([]);
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);
  const [values, setValues] = useState({
    discount: "",
    types: "",
    starts: "",
    ends: "",
  });
  const [errors, setErrors] = useState({
    discount: "",
    types: "",
    starts: "",
    ends: "",
  });

  const [discountOptions, setDiscountOptions] = useState([]);

  useEffect(() => {
    fetchMenuItems();
    generateDiscountOptions();
  }, []);

  const fetchMenuItems = async () => {
    const storedRestaurantId = localStorage.getItem('userId');
    if (!storedRestaurantId) {
      navigate('/signin');
      return;
    }
    try {
      const response = await fetch(`http://localhost:8080/api/v1/menu/menusrestaurant/${storedRestaurantId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch menu items");
      }
      const data = await response.json();
      setMenuItems(data);
    } catch (error) {
      console.error("Error fetching menu items:", error);
    }
  };

  const generateDiscountOptions = () => {
    const options = Array.from({ length: 100 }, (_, i) => ({ value: i + 1, label: `${i + 1}%` }));
    setDiscountOptions(options);
  };

  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  const handleMenuItemClick = (menuItem) => {
    setSelectedMenuItem(menuItem);
    setValues({ ...values, types: menuItem.name });
    setErrors({ ...errors, types: "" });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async () => {
    if (!values.discount) {
      setErrors({ ...errors, discount: "Discount is required" });
      return;
    }
    if (!values.starts) {
      setErrors({ ...errors, starts: "Start date is required" });
      return;
    }
    if (!values.ends) {
      setErrors({ ...errors, ends: "End date is required" });
      return;
    }
    if (!values.types) {
      setErrors({ ...errors, types: "Type is required" });
      return;
    }

    setCreatingDiscount(true);
    try {
      const storedRestaurantId = localStorage.getItem('userId');
      const response = await fetch(`https://swifdropp.onrender.com/api/v1/restaurant/restaurantDiscount/create/${storedRestaurantId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          startDate: values.starts,
          endDate: values.ends,
          discount: values.discount,
          discountType: selectedMenuItem && selectedMenuItem.name === "All" ? 'allMenu' : 'selectMenu',
          selectedMenuItems: selectedMenuItem && selectedMenuItem.name === "All" ? undefined : [selectedMenuItem._id]
        })
      });

      if (!response.ok) {
        throw new Error('Failed to create restaurant discount');
      }

      const data = await response.json();
      console.log('Restaurant discount created successfully:', data);
      toast.success('Discount created 👍');
      setTimeout(() => {
        onClose();
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error('Error creating restaurant discount:', error);
    } finally {
      setCreatingDiscount(false);
    }
  };

  return (
    <div className="popup-overlay overflow-y-auto">
      <div className="p-4 w-80 border-2 shadow-lg popup-content translate-x-2 bg-white rounded-md">
        <p className="text-2xl font-bold text-center mb-3">Add Discount</p>
        <FiX className="popup-close" onClick={handleClose} />
        <div>
          <p className="text-13 mb-1">Discount</p>
          <div className="h-12 border-2 rounded-md overflow-hidden">
            <select
              onChange={handleChange}
              name="discount"
              className="bg-gray-50 h-full w-full text-sm outline-none border-none pl-2"
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
                  {menuItem.name === "All" ? "On all menu" : `On all ${menuItem.name}`}
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
              className="bg-gray-50 h-full w-full text-sm outline-none border-none pl-8"
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
              className="bg-gray-50 h-full w-full text-sm outline-none border-none pl-8"
            />
          </div>
          {errors.ends && <p className="text-red-500">{errors.ends}</p>}
        </div>
        <div className="center mt-3">
          <button
            onClick={handleSubmit}
            className="px-4 py-2 duration-300 active:scale-90 rounded-md shadow-md bg-green-500 text-white font-semibold"
          >
            {creatingDiscount ? (
              <Spinner animation="border" size="sm" role="status" aria-hidden="true" />
            ) : (
              "Save"
            )}
          </button>
        </div>
      </div>
      <ToastContainer position="bottom-right" autoClose={5000} />
    </div>
  );
}
