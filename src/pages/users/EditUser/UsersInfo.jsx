import { useState } from "react";
import CustomInput from "../../../Component/CustomInput";

export default function UsersInfo() {
    const [selectedOption, setSelectedOption] = useState("Active");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
    return(
        <div className="col-span-2 bg-white shadow p-4 rounded-sm h-auto">
            <p className="font-medium">Users' Personal Information</p>
            <hr className="my-4"/>
            <CustomInput label='Username' type='text' value='Natashkela'/>
            <CustomInput label='Name, Last Name' type='text' value='Natalie Vachini'/>
            <CustomInput label='Email Address' type='email' value='mail@yourmail.com'/>
            <CustomInput label='Phone Number' type='text' value='+1 (366) 34-5678'/>
            <CustomInput label='Country' type='text' value='United States'/>
            <CustomInput label='City' type='text' value='Boston'/>
            <CustomInput label='State' type='text' value='MA'/>
            <CustomInput label='Postal Zip Code' type='number' value='02111'/>
            <label className="mb-1">Address</label>
            <textarea name="" id="" value='70., Charter str. Apartment: 59a' className="inline-block w-[100%] px-4 py-2 border rounded-md shadow-sm"></textarea>
            <label className="mb-1">Status</label>
            <select className="block w-[100%] p-1 border border-gray-400" value={selectedOption} onChange={handleOptionChange}>
                <option value="active">Active</option>
                <option value="notActive">Not Active</option>
            </select>
            <div className="flex justify-between items-center mt-5">
                <button className="px-10 py-2 mx-1 rounded hover:bg-gray-300 border border-[#FF5252] text-[#FF5252]">DELETE</button>
                <button className="px-10 py-2 mx-1 rounded hover:bg-gray-300 bg-[#4DB6AC] text-white">SAVE</button>
            </div>
        </div>
    )
}