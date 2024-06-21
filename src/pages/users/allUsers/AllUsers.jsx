import React, { useState } from 'react';
import '../administrators/styles/users.css'; 
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa'; 

const AllUsers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const [admins] = useState([
    {
      id: '03DR456',
      image: '/John.svg',
      name: 'John Cage',
      phone: '+1 (266) 314-5642',
      address: '02111., 50, G. Washington ave. app 5, Boston, USA',
      email: 'info@yourmail.com',
      status: true,
      totalPaid: '$235.55',
    },
    {
      id: '25DFR3',
      image: '/Linda.svg',
      name: 'Linda Bernstein',
      phone: '+1 (366) 314-2345',
      address: '02111., 83, A. Lincoln ave. app 12, Boston, USA',
      email: 'name@yourmail.com',
      status: true,
      totalPaid: '$345.30',
    },
    {
      id: '4RT56FD',
      image: '/Natalie.svg',
      name: 'Natalie Vachini',
      phone: '+1 (366) 214-7890',
      address: '02113., 70, Charter str. app 5, Boston, USA',
      email: 'support@yourmail.com',
      status: false,
      totalPaid: '$145.65',
    },
  ]);

  const filteredAdmins = admins.filter(admin =>
    admin.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentAdmins = filteredAdmins.slice(indexOfFirstItem, indexOfLastItem);

  const totalItems = filteredAdmins.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const showingFrom = totalItems === 0 ? 0 : indexOfFirstItem + 1;
  const showingTo = Math.min(indexOfLastItem, totalItems);
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="contain">
      <div className="header">
        <h2 className="header-title">All Users</h2>
        <span className="add-admin-btn">
          <FaPlus />
          Add a New User
        </span>
      </div>
      <div className="main-container">
        <div className="entries-container mb-4">
          <label>Show 
            <select className="ml-2">
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
            entries
          </label>
          <div className="search-container ml-auto">
            <label htmlFor="search">Search:</label>
            <input id="search" type="text"  value={searchTerm} onChange={handleSearchChange}/>
          </div>
        </div>
        <div className="table-container">
          <table className="table min-w-full">
            <thead className="table-header">
              <tr>
                <th>ID</th>
                <th>IMAGES</th>
                <th>NAME, ADDRESS</th>
                <th>PHONE</th>
                <th>EMAIL</th>
                <th>STATUS</th>
                <th>TOTAL PAID</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {currentAdmins.map((admin) => (
                <tr key={admin.id} className="table-row">
                  <td>{admin.id}</td>
                  <td>
                    <img
                      src={admin.image}
                      alt="Profile"
                      className="image"
                    />
                  </td>
                  <td>
                    <div className="name-phone-container">
                      <div className="text-sm">
                        <div className="!text-sm">{admin.name}</div>
                        <div className="text-gray-400 text-xs">{admin.address}</div>
                      </div>
                    </div>
                  </td>
                  <td>{admin.phone}</td>
                  <td>{admin.email}</td>
                  <td>
                    <button className={`px-4 py-1 mx-1 rounded-3xl border ${admin.status === true ? 'border-[#4DB6AC] text-[#4DB6AC]' : 'bg-[#FF5252] text-white'}`}>
                      {admin.status === true ? <p>Active</p> : <p>Suspend</p>}
                    </button>
                  </td>
                  <td>{admin.totalPaid}</td>
                

                  <td className="flex items-center gap-3">
                    <span className="action-item  cursor-pointer flex items-center gap-2">
                      <FaEdit /> Edit
                    </span>
                    <span className="action-item  cursor-pointer flex items-center gap-1">
                      <img src='/suspendLogo.svg' alt='suspend'/> Suspend
                    </span>
                    <span className="action-item  text-sm  cursor-pointer flex items-center gap-2">
                      <FaTrash /> Delete
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className='flex items-center justify-between p-3'>
        <p className='text-sm'>Showing <span className="font-semibold">{showingFrom}-{showingTo} </span> from <span className="font-semibold">{totalItems}</span> data </p>
        {totalPages > 1 && <div>
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className={`px-3 py-1 mx-1 rounded hover:bg-gray-300 ${currentPage === 1 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-200'}`}
        >
          &lt; 
        </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handleClick(index + 1)}
              className={`text-sm px-3 py-1 mx-1 rounded border border-gray-200 hover:bg-gray-300 ${index + 1 === currentPage ? 'bg-[#4CAF50] text-[#fff]' : ''}`}
              disabled={index + 1 === currentPage}
            >
              {index + 1}
            </button>
          ))}
          <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`px-2 py-1 mx-1 rounded hover:bg-gray-300 ${currentPage === totalPages ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-200'}`}
        >
          &gt;
        </button>
        </div>}
      </div>
      </div>
    </div>
  );
};

export default AllUsers;
