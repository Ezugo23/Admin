import { useState } from "react";
import PaginationButton from "../allUsers/paginationButton";
import "../administrators/styles/users.css";

export default function OrderHistory() {
const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const [admins] = useState([
    {
      no: "01",
      date: "17.08.2022 - 7:47PM",
      seller: "Cafe “Belvedere”",
      invoice: "/invoice.svg",
      pickupLocation: "02111, 50., Charter str. Boston, USA",
        dropOffLocation: "02111, 34., Washington ave. app 23, Boston, USA",
        amount: "4,500",
    },
    {
      no: "02",
      date: "17.08.2022 - 7:47PM",
      seller: "Cafe “Mexico”",
      invoice: "/invoice.svg",
      pickupLocation: "02111, 50., Charter str. Boston, USA",
      dropOffLocation: "02111, 34., Washington ave. app 23, Boston, USA",
      amount: "2,800",
    },
    {
      no: "03",
      date: "17.08.2022 - 7:47PM",
      seller: "McDonald",
      invoice: "/invoice.svg",
      pickupLocation: "02111, 50., Charter str. Boston, USA",
      dropOffLocation: "02111, 34., Washington ave. app 23, Boston, USA",
      amount: "7,100",
    },
  ]);

  const filteredAdmins = admins.filter((admin) =>
    admin.seller.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const currentAdmins = filteredAdmins.slice(indexOfFirstItem, indexOfLastItem);

    return(
        <div className="col-span-2 bg-white shadow p-4 rounded-sm">
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
              </tr>
            </thead>
            <tbody>
              {currentAdmins.map((admin, index) => (
                <tr key={admin.no} className={`cursor-pointer text-xs hover:bg-stone-200 ${index % 2 === 0 ? 'bg-gray-100' : ''}`}>
                  <td className="p-2 align-middle">{admin.no}</td>
                  <td className="p-2 align-middle">{admin.date}</td>
                  <td className="p-2 align-middle">{admin.seller}</td>
                  <td className="p-2 align-middle border-r-2"><img src={admin.invoice} alt="invoice logo"/></td>
                  <td className="p-2 align-middle">{admin.pickupLocation}</td>
                  <td className="p-2 align-middle border-r-2">{admin.dropOffLocation}</td>
                  <td className="p-2 align-middle">{admin.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <PaginationButton
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          filteredAdmins={filteredAdmins}
          itemsPerPage={itemsPerPage}
          indexOfFirstItem={indexOfFirstItem}
          indexOfLastItem={indexOfLastItem}
        />
        </div>
        </div>
    )
}