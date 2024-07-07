import React, { useState, useEffect } from "react";
import CustomInput from "../../../Component/CustomInput/CustomInput";

export default function UsersInfo({ values, setValues, handleSubmit, data, isPending, isError, loading }) {
  const [selectedOption, setSelectedOption] = useState("active"); // Default value changed to match the API response

  useEffect(() => {
    if (data && data.latestAddress) {
      console.log("Data loaded:", data);
      setValues({
        ...values,
        country: data.latestAddress.country || '',
        state: data.latestAddress.state || '',
        code: data.latestAddress.code || '',
        address: data.latestAddress.address || '',
      });
    }
  }, [data, setValues]);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleNameChange = (e) => {
    const fullName = e.target.value;
    const spaceIndex = fullName.indexOf(' ');
    const firstname = spaceIndex !== -1 ? fullName.slice(0, spaceIndex) : fullName;
    const lastname = spaceIndex !== -1 ? fullName.slice(spaceIndex + 1) : '';

    setValues({
      ...values,
      firstname: firstname || '',
      lastname: lastname || '',
    });
  };

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  let content;
  if (isPending) {
    content = (
      <div className='absolute left-[70%] top-[50%] -translate-x-[50%] text-black text-5xl'>
        <i className="fa-solid fa-spinner fa-spin"></i>
      </div>
    );
  }

  if (isError) {
    content = (
      <p className="text-center absolute left-[55%] top-[50%] bg-red-400 text-white p-6 text-md">
        Failed to fetch user data.
      </p>
    );
  }

  if (data) {
    content = (
      <div className="col-span-2 bg-white shadow p-4 rounded-sm h-auto">
        <p className="font-medium">Users' Personal Information</p>
        <hr className="my-4" />
        <form onSubmit={handleSubmit}>
          <CustomInput label='Username' type='text' name="username" value={values.username} onChange={handleChange} />
          <CustomInput label='Name, Last Name' type='text' value={`${values.firstname} ${values.lastname}`} onChange={handleNameChange} />
          <CustomInput label='Email Address' type='email' name="email" value={values.email} onChange={handleChange} />
          <CustomInput label='Phone Number' type='number' name="phoneNumber" value={values.phoneNumber} onChange={handleChange} />
          <CustomInput label='Country' type='text' name="country" value={values.country || ''} onChange={handleChange} />
          <CustomInput label='City' type='text' name="city" value={values.city || ''} onChange={handleChange} />
          <CustomInput label='State' type='text' name="state" value={values.state || ''} onChange={handleChange} />
          <CustomInput label='Postal Zip Code' type='text' name="code" value={values.code || ''} onChange={handleChange} />
          <label className="mb-1">Address</label>
          <textarea name="address" value={values.address || ''} className="inline-block w-[100%] px-4 py-2 border rounded-md shadow-sm" onChange={handleChange}></textarea>
          <label className="mb-1">Status</label>
          <select className="block w-[100%] p-1 border border-gray-400" value={selectedOption} onChange={handleOptionChange}>
            <option value="active">Active</option>
            <option value="notActive">Not Active</option>
          </select>
          <div className="flex justify-between items-center mt-5">
            <button className="px-10 py-2 mx-1 rounded hover:bg-gray-300 border border-[#FF5252] text-[#FF5252]">DELETE</button>
            {loading ? <button className="px-10 py-2 mx-1 rounded bg-[#4DB6AC] text-white"><i className="fa-solid fa-spinner fa-spin"></i></button> : <button type="submit" className="px-10 py-2 mx-1 rounded hover:bg-gray-300 bg-[#4DB6AC] text-white">SAVE</button>}
          </div>
        </form>
      </div>
    );
  }

  return (
    <>
      {content}
    </>
  );
}
