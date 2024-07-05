import { useState } from "react";
import CustomInput from "../../../Component/CustomInput/CustomInput";

export default function UsersInfo({ values, setValues, handleSubmit, data, isPending, isError, loading }) {
    const [selectedOption, setSelectedOption] = useState("Active");
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
  
    const handleChange = () => {
  
    }

    let content;
    if(isPending) {
        content = <div className='absolute left-[70%] top-[50%] -translate-x-[50%] text-black text-5xl'><i class="fa-solid fa-spinner fa-spin"></i></div>
    }

    if(isError) {
        content = <p className="text-center absolute left-[55%] top-[50%] bg-red-400 text-white p-6 text-md">Failed to fetch user data.</p>
    }
    if(data) {
      content = <div className="col-span-2 bg-white shadow p-4 rounded-sm h-auto">
        <p className="font-medium">Users' Personal Information</p>
            <hr className="my-4"/>
            <form onSubmit={handleSubmit}>
              <CustomInput label='Username' type='text' value={values.username} onChange={e => setValues({...values, username: e.target.value})}/>
              <CustomInput label='Name, Last Name' type='text' value={`${values.firstname} ${values.lastname}`} onChange={handleNameChange}/>
              <CustomInput label='Email Address' type='email' value={values.email} onChange={e => setValues({...values, email: e.target.value})}/>
              <CustomInput label='Phone Number' type='number' value={values.phoneNumber} onChange={e => setValues({...values, phoneNumber: e.target.value})}/>
              <CustomInput label='Country' type='text' value={values.country} onChange={e => setValues({...values, country: e.target.value})}/>
              <CustomInput label='City' type='text' value='' onChange={handleChange}/>
              <CustomInput label='State' type='text' value={values.state} onChange={e => setValues({...values, state: e.target.value})}/>
              <CustomInput label='Postal Zip Code' type='text' value={values.code} onChange={e => setValues({...values, code: e.target.value})}/>
              <label className="mb-1">Address</label>
              <textarea name="" id="" value={values.address} className="inline-block w-[100%] px-4 py-2 border rounded-md shadow-sm" onChange={e => setValues({...values, address: e.target.value})}></textarea>
              <label className="mb-1">Status</label>
              <select className="block w-[100%] p-1 border border-gray-400" value={selectedOption} onChange={handleOptionChange}>
                  <option value="active">Active</option>
                  <option value="notActive">Not Active</option>
              </select>
              <div className="flex justify-between items-center mt-5">
                  <button className="px-10 py-2 mx-1 rounded hover:bg-gray-300 border border-[#FF5252] text-[#FF5252]">DELETE</button>
                  {loading ? <button className="px-10 py-2 mx-1 rounded bg-[#4DB6AC] text-white"><i class="fa-solid fa-spinner fa-spin"></i></button> : <button type="submit" className="px-10 py-2 mx-1 rounded hover:bg-gray-300 bg-[#4DB6AC] text-white">SAVE</button>}
              </div>
            </form>
      </div>
    }

    return(
        <>
          {content}
        </>
    )
}