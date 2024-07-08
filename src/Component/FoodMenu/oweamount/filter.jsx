import { useState } from "react";
import { BsFunnelFill } from "react-icons/bs";

export default function Filter({ setActiveLink }) {
  const [active, setActive] = useState(0);

  const handleFilterClick = (index, filter) => {
    setActiveLink(index, filter); // Pass the selected filter to the parent component
    setActive(index);
  };

  return (
    <div className="mt-12 mb-1 px-6 flex justify-between items-center">
      <div className="flex gap-20 text-13 items-center">
        <p
          onClick={() => handleFilterClick(0, "Succeeded")} // Pass "Succeeded" as the filter
          className={`border-b-2 duration-300 pb-1 cursor-pointer ${
            active === 0 ? "border-b-blue-500 font-bold" : "border-transparent"
          }`}
        >
          Paid
        </p>
        <p
          onClick={() => handleFilterClick(1, "Refunded")} // Pass "Refunded" as the filter
          className={`border-b-2 duration-300 pb-1 cursor-pointer ${
            active === 1 ? "border-b-blue-500 font-bold" : "border-transparent"
          }`}
        >
          Pending
        </p>
        <p
          onClick={() => handleFilterClick(2, "All")} // Pass "All" as the filter
          className={`border-b-2 duration-300 pb-1 cursor-pointer ${
            active === 2 ? "border-b-blue-500 font-bold" : "border-transparent"
          }`}
        >
          Failed
        </p>
      </div>
      {/* <div className="flex bg-green-400 py-2 px-5 cursor-pointer text-white shadow-md rounded-md gap-2 items-center">
        <BsFunnelFill className="text-base" />
        <p>Filter</p>
      </div> */}
    </div>
  );
}
