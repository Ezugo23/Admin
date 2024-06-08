import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Pro from './Pro'
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { faStar } from '@fortawesome/free-solid-svg-icons';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'



const data = [
  // Your data array
  { id: 300002222222222222, sellerName: "James Samuel Jackson", address: "No 4 Ubajjfjfjfjf Asaba", swiftBalance: "$345.45", totalOrders: 356, withdraw: "$345.55", rating: 1111 },
  { id: 30001, sellerName: "Moon", address: "No 5 Uba Asaba", swiftBalance: "$545.45", totalOrders: 456, withdraw: "$445.55", rating: 2111 },
  { id: 30002, sellerName: "Sun", address: "No 6 Uba Asaba", swiftBalance: "$645.45", totalOrders: 556, withdraw: "$545.55", rating: 3111 },
  { id: 30003, sellerName: "Planet", address: "No 7 Uba Asaba", swiftBalance: "$745.45", totalOrders: 656, withdraw: "$645.55", rating: 4111 },
  { id: 30004, sellerName: "Galaxy", address: "No 8 Uba Asaba", swiftBalance: "$845.45", totalOrders: 756, withdraw: "$745.55", rating: 5111 },
  { id: 30005, sellerName: "Comet", address: "No 9 Uba Asaba", swiftBalance: "$945.45", totalOrders: 856, withdraw: "$845.55", rating: 6111 },
  { id: 30006, sellerName: "Asteroid", address: "No 10 Uba Asaba", swiftBalance: "$1045.45", totalOrders: 956, withdraw: "$945.55", rating: 7111 },
  { id: 30007, sellerName: "Meteor", address: "No 11 Uba Asaba", swiftBalance: "$1145.45", totalOrders: 1056, withdraw: "$1045.55", rating: 8111 },
  { id: 30008, sellerName: "Black Hole", address: "No 12 Uba Asaba", swiftBalance: "$1245.45", totalOrders: 1156, withdraw: "$1145.55", rating: 9111 },
  { id: 30009, sellerName: "Nebula", address: "No 13 Uba Asaba", swiftBalance: "$1345.45", totalOrders: 1256, withdraw: "$1245.55", rating: 10111 },
  { id: 30000, sellerName: "Star", address: "No 4 Uba Asaba", swiftBalance: "$345.45", totalOrders: 356, withdraw: "$345.55", rating: 1111 },
  { id: 30001, sellerName: "Moon", address: "No 5 Uba Asaba", swiftBalance: "$545.45", totalOrders: 456, withdraw: "$445.55", rating: 2111 },
  { id: 30002, sellerName: "Sun", address: "No 6 Uba Asaba", swiftBalance: "$645.45", totalOrders: 556, withdraw: "$545.55", rating: 3111 },
  { id: 30003, sellerName: "Planet", address: "No 7 Uba Asaba", swiftBalance: "$745.45", totalOrders: 656, withdraw: "$645.55", rating: 4111 },
  { id: 30004, sellerName: "Galaxy", address: "No 8 Uba Asaba", swiftBalance: "$845.45", totalOrders: 756, withdraw: "$745.55", rating: 5111 },
  { id: 30005, sellerName: "Comet", address: "No 9 Uba Asaba", swiftBalance: "$945.45", totalOrders: 856, withdraw: "$845.55", rating: 6111 },
  { id: 30006, sellerName: "Asteroid", address: "No 10 Uba Asaba", swiftBalance: "$1045.45", totalOrders: 956, withdraw: "$945.55", rating: 7111 },
  { id: 30007, sellerName: "Meteor", address: "No 11 Uba Asaba", swiftBalance: "$1145.45", totalOrders: 1056, withdraw: "$1045.55", rating: 8111 },
  { id: 30008, sellerName: "Black Hole", address: "No 12 Uba Asaba", swiftBalance: "$1245.45", totalOrders: 1156, withdraw: "$1145.55", rating: 9111 },
  { id: 30009, sellerName: "Nebula", address: "No 13 Uba Asaba", swiftBalance: "$1345.45", totalOrders: 1256, withdraw: "$1245.55", rating: 10111 },
  { id: 30000, sellerName: "Star", address: "No 4 Uba Asaba", swiftBalance: "$345.45", totalOrders: 356, withdraw: "$345.55", rating: 1111 },
  { id: 30001, sellerName: "Moon", address: "No 5 Uba Asaba", swiftBalance: "$545.45", totalOrders: 456, withdraw: "$445.55", rating: 2111 },
  { id: 30002, sellerName: "Sun", address: "No 6 Uba Asaba", swiftBalance: "$645.45", totalOrders: 556, withdraw: "$545.55", rating: 3111 },
  { id: 30003, sellerName: "Planet", address: "No 7 Uba Asaba", swiftBalance: "$745.45", totalOrders: 656, withdraw: "$645.55", rating: 4111 },
  { id: 30004, sellerName: "Galaxy", address: "No 8 Uba Asaba", swiftBalance: "$845.45", totalOrders: 756, withdraw: "$745.55", rating: 5111 },
  { id: 30005, sellerName: "Comet", address: "No 9 Uba Asaba", swiftBalance: "$945.45", totalOrders: 856, withdraw: "$845.55", rating: 6111 },
  { id: 30006, sellerName: "Asteroid", address: "No 10 Uba Asaba", swiftBalance: "$1045.45", totalOrders: 956, withdraw: "$945.55", rating: 7111 },
  { id: 30007, sellerName: "Meteor", address: "No 11 Uba Asaba", swiftBalance: "$1145.45", totalOrders: 1056, withdraw: "$1045.55", rating: 8111 },
  { id: 30008, sellerName: "Black Hole", address: "No 12 Uba Asaba", swiftBalance: "$1245.45", totalOrders: 1156, withdraw: "$1145.55", rating: 9111 },
  { id: 30009, sellerName: "Nebula", address: "No 13 Uba Asaba", swiftBalance: "$1345.45", totalOrders: 1256, withdraw: "$1245.55", rating: 10111 },
];

export default function TableMenu() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handleClick = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const currentData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <>
      <div className="flex justify-between items-center top-107 left-1349 w-177 h-45">
        <p className="font-roboto font-light text-base text-black leading-4">Food Sellers List</p>
        <button className="font-roboto font-light text-base text-white leading-5 bg-blue-800 hover:bg-blue-600 py-2 px-6 rounded-lg color-white">
          + Add New Restaurant
        </button>
      </div>

      <div className="container mx-auto px-4">
        <div className="w-full">
          <div className="bg-white shadow-md rounded-lg">
            <div className="p-6">
              <div className="flex justify-between">
                <div>
                  <p>All Reviews</p>
                </div>
                <div>
                  <div className="relative flex items-center">
                    <input
                      className="form-input bg-white border rounded-full text-dark px-4 py-2"
                      type="text"
                      placeholder="Search"
                      id="example-search-input"
                    />
                    <button className="ml-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path fillRule="evenodd" clipRule="evenodd" d="M11 2C15.968 2 20 6.032 20 11C20 15.968 15.968 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2ZM11 18C14.867 18 18 14.867 18 11C18 7.132 14.867 4 11 4C7.132 4 4 7.132 4 11C4 14.867 7.132 18 11 18ZM22.314 20.899L19.485 18.071L18.071 19.485L20.899 22.314L22.314 20.899Z" fill="black" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              <hr className="my-4" />
              <div className="overflow-x-auto mt-3" id="printMe">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">SELLER NAME</th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">SWIFTBALANCE</th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">TOTAL ORDERS</th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">WITHDRAW</th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">RATING</th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">STATUS</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">ACTION</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {currentData.map((item, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 text-center">{item.id}</td>
                        <td className="px-7 py-7 text-start">
                          <strong>{item.sellerName}</strong>
                          <br />
                          {item.address}
                        </td>
                        <td className="px-6 py-4 text-center">{item.swiftBalance}</td>
                        <td className="px-6 py-4 text-center">{item.totalOrders}</td>
                        <td className="px-6 py-4 text-center">{item.withdraw}</td>
                        <td className="px-6 py-4 text-center">{item.rating}</td>
                        <td className="px-6 py-4 text-center">
                          <button className="w-[80px] h-[25px] font-roboto font-normal text-[12px] leading-[14.06px] text-center text-[#4DB6AC] border border-[#4DB6AC] rounded-md active:bg-[#4DB6AC]">
                            save
                          </button>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex space-x-2 items-center">
                            <Link
                              to={'menu/personal'}
                              className="text-blue-600 hover:text-blue-900 flex items-center group relative"
                            >
                             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
</svg>

                              <span className="absolute left-1/2 transform -translate-x-1/2 -translate-y-full px-2 py-1 bg-gray-700 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity">Edit</span>
                            </Link>
                            <button className="text-blue-600 hover:text-blue-900 flex items-center group relative">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>

                              <span className="absolute left-1/2 transform -translate-x-1/2 -translate-y-full px-2 py-1 bg-gray-700 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity">Suspend</span>
                            </button>
                            <button className="text-red-600 hover:text-red-900 flex items-center group relative">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
</svg>

                              <span className="absolute left-1/2 transform -translate-x-1/2 -translate-y-full px-2 py-1 bg-gray-700 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity">Delete</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="flex justify-between items-center py-3 bg-white border-t border-gray-200">
                  <div className="flex-1 flex justify-between sm:hidden">
                    <button
                      onClick={() => handleClick(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => handleClick(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500"
                    >
                      Next
                    </button>
                  </div>
                  <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm text-gray-700">
                        Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to <span className="font-medium">{Math.min(currentPage * itemsPerPage, data.length)}</span> of <span className="font-medium">{data.length}</span> results
                      </p>
                    </div>
                    <div>
                      <nav className="relative z-0 inline-flex shadow-sm -space-x-px" aria-label="Pagination">
                        <button
                          onClick={() => handleClick(currentPage - 1)}
                          disabled={currentPage === 1}
                          className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                        >
                          <span className="sr-only">Previous</span>
                          <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                        </button>
                        {Array.from({ length: totalPages }, (_, i) => (
                          <button
                            key={i + 1}
                            onClick={() => handleClick(i + 1)}
                            className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium ${currentPage === i + 1 ? 'bg-indigo-50 border-indigo-500 text-indigo-600' : 'bg-white text-gray-500 hover:bg-gray-50'}`}
                          >
                            {i + 1}
                          </button>
                        ))}
                        <button
                          onClick={() => handleClick(currentPage + 1)}
                          disabled={currentPage === totalPages}
                          className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                        >
                          <span className="sr-only">Next</span>
                          <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                        </button>
                      </nav>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}