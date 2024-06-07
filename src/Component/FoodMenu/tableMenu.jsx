import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Pro from './Pro'
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { faStar } from '@fortawesome/free-solid-svg-icons';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'


const data = [
  // Your data array
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
  const itemsPerPage = 5;
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
                        <td className="px-6 py-4 text-start">
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
                              to={'personal'}
                              data-toggle="tooltip"
                              data-placement="top"
                              title="Edit"
                              className="text-blue-600 hover:text-blue-900 flex items-center"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M4.82362 11.7455H1.99792V9.1225L9.61325 2.0536C9.87331 1.81227 10.2949 1.81227 10.5549 2.0536L12.4389 3.80243C12.6989 4.04383 12.6989 4.43514 12.4389 4.67654L4.82362 11.7455ZM4.27153 10.5091L11.0258 4.23949L10.0841 3.36538L3.32986 9.63498V10.5091H4.27153ZM13.9853 12.9818H1.99792V14.2182H13.9853V12.9818Z"
                                  fill="black"
                                />
                              </svg>
                              <span className="ml-1">Edit</span>
                            </Link>
                            <button className="text-blue-600 hover:text-blue-900 flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M14.3334 5.378L10.624 1.66667H5.37735L1.66669 5.37733V10.624L5.37735 14.3333H10.624L14.3334 10.6247V5.378ZM5.92935 3H10.0714V3.00067L13.0007 5.92933V10.072L10.0714 13.0013H5.92935L3.00069 10.072V5.93L5.92935 3ZM7.33335 10H8.66669V11.3333H7.33335V10ZM8.66669 4.66667H7.33335V8.66667H8.66669V4.66667Z"
                                  fill="black"
                                />
                              </svg>
                              <span className="ml-1">Suspend</span>
                            </button>
                            <button className="text-red-600 hover:text-red-900 flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M8 1.33331C8.73635 1.33331 9.33335 1.9303 9.33335 2.66665H13.3334C13.7014 2.66665 14 2.96461 14 3.33331C14 3.70199 13.7014 4 13.3334 4H2.66669C2.29804 4 2 3.70199 2 3.33331C2 2.96461 2.29804 2.66665 2.66669 2.66665H6.66669C6.66669 1.9303 7.26369 1.33331 8 1.33331ZM3.31668 13.809C3.25456 13.8857 3.18058 13.9482 3.09848 13.9944C3.0163 14.0407 2.92721 14.0698 2.83418 14.0806C2.74115 14.0915 2.64659 14.0837 2.55549 14.0577C2.46439 14.0317 2.37848 13.9879 2.30267 13.9281C2.22686 13.8684 2.16251 13.7933 2.11325 13.7067C2.06399 13.6201 2.03096 13.5237 2.0156 13.4231C2.00024 13.3226 2.00277 13.2198 2.02311 13.1206C2.04345 13.0214 2.08114 12.9276 2.13468 12.844L3.99068 10H12.0093L13.8653 12.844C13.9188 12.9276 13.9565 13.0214 13.9769 13.1206C13.9972 13.2198 13.9998 13.3226 13.9844 13.4231C13.969 13.5237 13.936 13.6201 13.8867 13.7067C13.8374 13.7933 13.7731 13.8684 13.6973 13.9281C13.6215 13.9879 13.5356 14.0317 13.4445 14.0577C13.3534 14.0837 13.2588 14.0915 13.1658 14.0806C13.0727 14.0698 12.9836 14.0407 12.9015 13.9944C12.8194 13.9482 12.7454 13.8857 12.6833 13.809L10.514 11H5.48603L3.31668 13.809ZM5.73935 11.6667H10.2607L8.76935 13.3333H7.2307L5.73935 11.6667Z"
                                  fill="black"
                                />
                              </svg>
                              <span className="ml-1">Delete</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="flex justify-between items-center mt-4">
                  <button
                    className="font-roboto font-light text-base text-blue-600 hover:text-blue-800 leading-5"
                    onClick={() => handleClick(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeftIcon className="h-5 w-5" />
                  </button>
                  <span>
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    className="font-roboto font-light text-base text-blue-600 hover:text-blue-800 leading-5"
                    onClick={() => handleClick(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRightIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}