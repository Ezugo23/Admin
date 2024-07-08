import React, { useState } from "react";
import axios from "axios";
import { FiX } from 'react-icons/fi'; // Import the close icon
import '../FoodMenu/style.css';
import { useParams, useNavigate } from 'react-router-dom';

export default function AddSideMenuBackdrop({ setShowAddBackdrop, onSuccess }) {
  const { id } = useParams();
  const [values, setValues] = useState({
    name: "",
    price: "",
  });
  const [restaurantId, setRestaurantId] = useState('');
  const [errors, setErrors] = useState({
    name: "",
    price: "",
  });
  const [isCreating, setIsCreating] = useState(false) // State to track creation process

  const handleClose = () => {
    setShowAddBackdrop(false);
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!values.name) {
      setErrors({
        name: values.name ? '' : 'Please input a name',
      });
      return;
    }
    try {
      setIsCreating(true); 
      // Send a POST request to create a new side menu item
      const result = await axios.post(`https://delivery-chimelu-new.onrender.com/api/v1/foods/additive/${id}`, values);
      console.log(result);
      setShowAddBackdrop(false);
      setIsCreating(false); // Set state to indicate creation process finished

      // Fetch all side items after successfully creating a new one
      onSuccess();
    } catch (error) {
      console.error('Error adding side menu additives:', error);
      setIsCreating(false); // Set state to indicate creation process finished (even if it failed)
    }
  };

  return (
    <div className="fixed top-0 left-0 h-screen bgTrans w-screen z-[400]">
      <form onSubmit={handleSubmit} className="w-80 fixed top-1/2 left-1/2 -translate-y-1/2 z-[500] p-3 flex flex-col -translate-x-1/2 bg-white rounded-3xl ">
        <div className="flex justify-end">
          <FiX className="cursor-pointer close-icon" onClick={handleClose} size={20}/>
        </div>
        <p className="font-bold text-lg text-center mb-2">Add Side Item</p>
        <div className="space-y-3">
          <div className="">
            <p className="mb-2 font-semibold">Name</p>
            <input
              type="text"
              value={values.name}
              onChange={onChange}
              name="name"
              className="h-11 outline-none px-2 rounded-md border-gray-400 border-2 w-full"
            />
            {errors.name && <p className="text-red-500">{errors.name}</p>}
          </div>
          <div className="">
            <p className="mb-2 font-semibold">Price</p>
            <input
              type="number"
              name="price"
              value={values.price}
              onChange={onChange}
              placeholder="₦"
              className="h-11 outline-none px-2 rounded-md border-gray-400 border-2 w-full"
            />
            {errors.price && <p className="text-red-500">{errors.price}</p>}
          </div>
        </div>
        {/* Display "Creating..." text when creation process is ongoing */}
        <button type="submit" className="px-8 py-3 rounded-md shadow-md bg-green-500 text-white font-semibold text-sm mt-5 duration-300 active:scale-95" disabled={isCreating}>
          {isCreating ? 'Creating...' : 'Create'}
        </button>
      </form>
    </div>
  );
}
