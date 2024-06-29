import React, { useState } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { FaEdit, FaTrash, FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { BsPlus } from "react-icons/bs";
import { SpinnerRoundOutlined } from 'spinners-react';

export default function foodMenu() {
  const { id } = useParams();
  const [data, setData] = useState([
    {
      _id: '1',
      image: "/John.svg",
      menuName: 'Rice',
      price:'N200',
      sideDish: 'Plastic container, packaging, Roasted chicken',
      side2:'Bottle water, Pepsi, Cocacola, Sprit',
      status: true,
    },
    {
      _id: '2',
      image: "/John.svg",
      menuName: 'Rice',
      price:'N200',
      sideDish: 'Plastic container, packaging, Roasted chicken',
      side2:'Bottle water, Pepsi, Cocacola, Sprit',
      status: true,
      isAvailable: true
    },
    {
      _id: '3',
      image: "/John.svg",
      menuName: 'Rice',
      price:'N200',
      sideDish: 'Plastic container, packaging, Roasted chicken',
      side2:'Bottle water, Pepsi, Cocacola, Sprit',
      status: false,
      isAvailable: false
    },
    {
      _id: '3',
      image: "/John.svg",
      menuName: 'Rice',
      price:'N200',
      sideDish: 'Plastic container, packaging, Roasted chicken',
      side2:'Bottle water, Pepsi, Cocacola, Sprit',
      status: false,
      isAvailable: true,
    },
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const navigate = useNavigate();

  const handleToggleAvailability = (itemId) => {
    const updatedItems = sideItems.map((item) =>
      item._id === itemId ? { ...item, isAvailable: !item.isAvailable } : item
    );
    setSideItems(updatedItems);
  };

  const handleClick = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleApproveClick = () => {
    setIsModalOpen(true); // Open the modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  const filteredData = data.filter((item) =>
    item.menuName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="contain" style={{ marginLeft: '10px', marginTop: '45px' }}>
      <div className="main-container">
        <div className="">
        <div className="mb-4">
          <p className="font-roboto font-bold text-lg leading-6 text-black">Rice</p>
        </div>
        <hr className="mb-4" />
        </div>
        <div className="table-container" style={{ position: 'relative', minHeight: '300px' }}>
          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <SpinnerRoundOutlined size={50} color="green" />
            </div>
          ) : (
            <table className="table min-w-full" style={{ borderCollapse: 'collapse' }}>
              <thead className="table-header" style={{ color: 'black' }}>
                <tr>
                  <th style={{ color: 'black', border: 'none', width: '5%' }}>#</th>
                  <th style={{ color: 'black', border: 'none', width: '15%' }}>IMAGE</th>
                  <th style={{ color: 'black', border: 'none', width: '20%' }}>FOOD NAME</th>
                  <th style={{ color: 'black', border: 'none', width: '15%' }}>SIDE DISH (REQUIRED)</th>
                  <th style={{ color: 'black', border: 'none', width: '15%' }}>SIDE DISH (OPTIONAL)</th>
                  <th style={{ color: 'black', border: 'none', width: '20%' }}>STOCK</th>
                  <th style={{ color: 'black', border: 'none', width: '20%' }}>STATUS</th>
                  <th style={{ color: 'black', border: 'none', width: '20%' }}>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {currentData.map((item, index) => (
                  <tr key={item._id} className="table-row cursor-pointer" style={{ borderBottom: 'none' }}>
                    <td style={{ border: 'none' }}>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                    <td style={{ border: 'none' }}>
                      <img src={item.image} alt="" />
                    </td>
                    <td style={{ border: 'none' }}>{item.menuName}</td>
                    <td style={{ border: 'none' }}>{item.sideDish}</td>
                    <td style={{ border: 'none' }}>{item.side2}</td>
                    <td style={{ border: 'none' }}> 
                      <div
                       onClick={() => handleToggleAvailability(item._id)}
                  className={`p-1 rounded-full cursor-pointer ml-4 mt-1 w-9 flex duration-700 ${
                    item.isAvailable ? "justify-end bg-green-500" : "bg-gray-200 justify-start"
                  }`}
                > 
                <div className="h-3 w-3 bg-white rounded-full"></div>
                  </div>
                </td>
                    <td style={{ border: 'none' }}>
                      <button
                        className={`px-4 py-1 mx-1 rounded-3xl border ${item.status ? "border-[#4DB6AC] text-[#4DB6AC]" : "bg-[#FF5252] text-white"}`}
                      >
                        {item.status ? 'Active' : 'Inactive'}
                      </button>
                    </td>
                    <td className="flex items-center gap-3" style={{ border: 'none' }}>
                      <Link to={`/foodsellers/menu/${id}/food-group/${item._id}`} className="action-item cursor-pointer flex items-center gap-2">
                        <FaEdit /> Edit
                      </Link>
                      <span className="action-item cursor-pointer flex items-center gap-1">
                        <img src="/suspendLogo.svg" alt="suspend" /> Suspend
                      </span>
                      <span className="action-item text-sm cursor-pointer flex items-center gap-2">
                        <FaTrash /> Delete
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <div className="pagination-con">
        <div className="flex px-8 py-2 rounded-lg text-base text-white font-semibold bg-blue-800 gap-1 items-center cursor-pointer ml-6">
              <BsPlus className="text-lg stroke-1" />
              <p>Add a New Category</p>
            </div>
        </div>
      </div>
    </div>
  );
}