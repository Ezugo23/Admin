import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash, FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { RiErrorWarningLine } from 'react-icons/ri';
import { Switch, Button } from '@chakra-ui/react';
import { SpinnerRoundOutlined } from 'spinners-react';
import axios from 'axios';
import ModalAddComponent from './AddModal';
import EditModal from './EditModal'

export default function TableMenu() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); // State for add modal
  const [editModalData, setEditModalData] = useState(null); // State to store data for editing
  const [inputValue, setInputValue] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const adminId = localStorage.getItem('adminId');
      if (!adminId) {
        navigate('/Login');
        return;
      }

      try {
        const response = await axios.get('https://delivery-chimelu-new.onrender.com/api/v1/category/all');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // Set the timer to 3 seconds (3000 milliseconds)

    return () => clearTimeout(timer);
  }, [navigate]);

  const handleClick = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleToggleAvailability = async (id, isAvailable) => {
    try {
      await axios.patch(`https://delivery-chimelu-new.onrender.com/api/v1/category/${id}`, { isAvailable: !isAvailable });
      setData((prevData) =>
        prevData.map((item) =>
          item._id === id ? { ...item, isAvailable: !isAvailable } : item
        )
      );
    } catch (error) {
      console.error('Error updating availability:', error);
    }
  };

  const filteredData = data.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenAddModal = () => {
    setIsAddModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
  };

  const handleEditModalOpen = (item) => {
    setEditModalData(item);
    setIsModalOpen(true);
  };

  const handleEditModalClose = () => {
    setEditModalData(null);
    setIsModalOpen(false);
  };
  return (
    <div className="contain">
      <div className="header">
        <h2 className="header-title">Food Sellers List</h2>
        <span className="add-admin-btn" onClick={handleOpenAddModal}>
          + Add New Category
        </span>
      </div>
      <div className="main-container">
        <div className="entries-container mb-4">
          <label>
            Show
            <select className="ml-2" value={itemsPerPage} onChange={(e) => setItemsPerPage(Number(e.target.value))}>
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
            entries
          </label>
          <div className="search-container ml-auto">
            <label htmlFor="search">Search:</label>
            <input
              id="search"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="table-container" style={{ position: 'relative', minHeight: '300px' }}>
          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <SpinnerRoundOutlined size={50} color="green" />
            </div>
          ) : (
            <table className="table min-w-full" style={{ borderCollapse: 'collapse' }}>
              <thead className="table-header" style={{ backgroundColor: 'green', color: 'white' }}>
                <tr>
                  <th style={{ color: 'white', border: 'none' }}>S/N</th>
                  <th style={{ color: 'white', border: 'none' }}>IMAGE</th>
                  <th style={{ color: 'white', border: 'none' }}>NAME OF CATEGORY</th>
                  <th style={{ color: 'white', border: 'none' }}> TOTAL ITEM</th>
                  <th style={{ color: 'white', border: 'none' }}>STATUS</th>
                  <th style={{ color: 'white', border: 'none' }}>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {currentData.map((item, index) => {
                  const serialNumber = (currentPage - 1) * itemsPerPage + index + 1;

                  return (
                    <tr key={item._id} className="table-row cursor-pointer" style={{ borderBottom: 'none' }}>
                      <td style={{ border: 'none' }}>{serialNumber}</td>
                      <td style={{ border: 'none' }}>
                        <img src={item.image} alt={item.title} style={{ width: '40px', height: '40px', borderRadius: '15px' }} />
                      </td>
                      <td style={{ border: 'none' }}><strong>{item.title}</strong> </td>
                      <td style={{ border: 'none' }}>
                        {item.numberOfItems}
                      </td>
                      <td style={{ border: 'none' }}>{item.isAvailable ? 'Available' : 'Unavailable'}</td>
                      <td className="action-cell" style={{ border: 'none' }}>
                        <span
                          className="action-item cursor-pointer flex items-center gap-3"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Switch
                            isChecked={item.isAvailable}
                            onChange={() => handleToggleAvailability(item._id, item.isAvailable)}
                          />
                        </span>
                        <span
                          className="action-item cursor-pointer flex items-center gap-3"
                          onClick={() => handleEditModalOpen(item)} // Open edit modal on click
                        >
                          <FaEdit size={15} />
                        </span>
                        <span
                          className="action-item cursor-pointer flex items-center gap-3"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <FaTrash size={15} />
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
        <div className="pagination-con">
          <span className="text-gray-600">Showing {Math.min(currentPage * itemsPerPage - itemsPerPage + 1, filteredData.length)}-{Math.min(currentPage * itemsPerPage, filteredData.length)} of {filteredData.length} data</span>
          <div className="pagination flex items-center">
            <button
              className="px-3 py-1 mx-1 rounded hover:bg-gray-300"
              onClick={() => handleClick(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <FaAngleLeft />
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => handleClick(i + 1)}
                className={`px-3 py-1 mx-1 rounded ${currentPage === i + 1 ? 'bg-green-500 text-white' : 'hover:bg-gray-300'}`}
              >
                {i + 1}
              </button>
            ))}
            <button
              className="px-3 py-1 mx-1 rounded hover:bg-gray-300"
              onClick={() => handleClick(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <FaAngleRight />
            </button>
          </div>
        </div>
      </div>
      {/* Edit Modal */}
      {editModalData && (
        <EditModal
          isOpen={isModalOpen}
          onClose={handleEditModalClose}
          imageSrc={editModalData.image} // Assuming 'image' is a field in your data object
          inputValue={inputValue}
          setInputValue={setInputValue}
          item={editModalData} // Pass the item data to the modal
        />
      )}
      {/* Add Modal */}
      <ModalAddComponent
        isOpen={isAddModalOpen}
        onClose={handleCloseAddModal}
        imageSrc="https://example.com/image.jpg" // Change this to the actual image source
        inputValue={inputValue}
        setInputValue={setInputValue}
      />
    </div>
  );
}