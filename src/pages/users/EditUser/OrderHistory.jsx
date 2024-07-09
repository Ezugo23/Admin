import { useState } from "react";
import PaginationButton from "../allUsers/paginationButton";
import { useQuery } from "@tanstack/react-query";
import { getOrderHistory } from "../../../util/http";
import "../administrators/styles/users.css";
import { Link } from "react-router-dom";

export default function OrderHistory({id}) {
const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const {data, isPending, isError, error} = useQuery({
    queryKey: ['orders', id],
    queryFn: () => getOrderHistory(id)
  })
  
  const filteredUsers = data && data.length > 0 && data.filter((order) =>
    order.orderId.toString().includes(searchTerm)
  );

  const currentOrders = filteredUsers && filteredUsers.length > 0 && filteredUsers?.slice(indexOfFirstItem, indexOfLastItem);

  let content;

  if (isPending) {
    content = <div className='absolute left-[70%] top-[50%] text-black text-5xl'><i class="fa-solid fa-spinner fa-spin"></i></div>;
  } else if (isError) {
    content = <p className="text-center">{error.info?.message || "Failed to fetch order history"}</p>;
  } else if (data && data.length === 0) {
    content = <p className="text-center text-gray-500 text-xl flex justify-center items-center">No order history available</p>;
  } 

  if(data && data.length > 0) {
    content = <div className="col-span-2 bg-white shadow p-4 rounded-sm">
    <p className="font-medium">Order History</p>
    <hr className="my-4"/>
    <div className="main-container">
<div className="entries-container mb-4">
  <label>
    Show
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
    <input
      id="search"
      type="text"
      value={searchTerm}
      onChange={handleSearchChange}
      placeholder="Search by order id"
    />
  </div>
</div>
<div className="table-container">
  <table className="border border-[#ddd] min-w-full">
    <thead className="table-header">
      <tr className="uppercase">
        <th className="p-2 align-middle">No</th>
        <th className="p-2 align-middle">Date</th>
        <th className="p-2 align-middle">Seller</th>
        <th className="p-2 align-middle border-r-2">Invoice</th>
        <th className="p-2 align-middle">Pickup Location</th>
        <th className="p-2 align-middle border-r-2">Drop off Location</th>
        <th className="p-2 align-middle">Amount</th>
        <th className="p-2 align-middle">Order status</th>
      </tr>
    </thead>
    <tbody>
      {currentOrders && currentOrders.map((order, index) => (
        <tr key={order.id} className={`cursor-pointer text-xs hover:bg-stone-200 ${index % 2 === 0 ? 'bg-gray-100' : ''}`}>
          <td className="p-2 align-middle">{index + 1}</td>
          <td className="p-2 align-middle">{new Date(order.orderDate).toLocaleString('en', {day: '2-digit', month: '2-digit', year: 'numeric'}).replace(/\//g, '.')} - {new Date(order.orderDate).toLocaleString('en', {hour: '2-digit', minute: '2-digit'})}</td>
          <td className="p-2 align-middle">{order.restaurantName}</td>
          <td className="p-2 align-middle border-r-2">
                      <Link to={`/ordersHistory/receipt/${order.id}`} className="invoice-link">
                        <img src='/invoice.svg' alt="invoice logo"/>
                      </Link>
                    </td>
          <td className="p-2 align-middle">{order.pickUpLocation}</td>
          <td className="p-2 align-middle border-r-2">{order.dropOffLocation}</td>
          <td className="p-1 align-middle">₦{order.grandTotal}</td>
          <td className="p-1 align-middle">{order.orderStatus}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
<PaginationButton
  currentPage={currentPage}
  setCurrentPage={setCurrentPage}
  filteredUsers={filteredUsers}
  itemsPerPage={itemsPerPage}
  indexOfFirstItem={indexOfFirstItem}
  indexOfLastItem={indexOfLastItem}
/>
</div>
</div>
  }
    return(
        <>
        {content}
        </>
    )
}