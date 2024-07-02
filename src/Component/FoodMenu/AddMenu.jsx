import React, { useState } from "react";
import axios from "axios";
import { FiX } from 'react-icons/fi'; // Import the close icon

export default function AddMenu({ setShowAddBackdrop, fetchSideItems }) {
  const [values, setValues] = useState({
    name: "",
    price: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    price: "",
  });
  const [isCreating, setIsCreating] = useState(false); // State to track creation process

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
        name: "Please input a name",
      });
      return;
    }

    try {
      setIsCreating(true); // Set state to indicate creation process started

      // Send a POST request to create a new side menu item
      const result = await axios.post(`https://delivery-chimelu-new.onrender.com/api/v1/foods/additive/${id}`, values);
      console.log(result);
      
      setShowAddBackdrop(false);
      setIsCreating(false); // Set state to indicate creation process finished

      // Update sideItems state in the parent component after successful creation
      fetchSideItems();
    } catch (error) {
      console.error('Error adding side menu additives:', error);
      setIsCreating(false); // Set state to indicate creation process finished (even if it failed)
    }
  };

  return (
    <div className="fixed top-0 left-0 h-screen w-full bg-gray-800 bg-opacity-50 flex items-center justify-center z-[400]">
      <form onSubmit={handleSubmit} className="w-80 p-3 flex flex-col bg-white rounded-3xl">
        <div className="flex justify-end">
          <FiX className="cursor-pointer close-icon" onClick={handleClose} size={20}/>
        </div>
        <p className="font-bold text-lg text-center mb-2">Add Side Item</p>
        <div className="space-y-3">
          <div>
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
          <div>
            <p className="mb-2 font-semibold">Price</p>
            <input
              type="text"
              name="price"
              value={values.price}
              onChange={onChange}
              placeholder="₦"
              className="h-11 outline-none px-2 rounded-md border-gray-400 border-2 w-full"
            />
            {errors.price && <p className="text-red-500">{errors.price}</p>}
          </div>
        </div>
        <button type="submit" className="px-8 py-3 rounded-md shadow-md bg-green-500 text-white font-semibold text-sm mt-5 duration-300 active:scale-95" disabled={isCreating}>
          {isCreating ? 'Creating...' : 'Create'}
        </button>
      </form>
    </div>
  );
}