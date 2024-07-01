import { useState, useEffect } from "react";
import axios from "axios";

export default function Succeed() {
  const [orders, setOrders] = useState([]);
  const [restaurantId, setRestaurantId] = useState('');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const storedRestaurantId = 'someRestaurantId'; // Example hardcoded restaurant ID
      setRestaurantId(storedRestaurantId);

      const response = await axios.get('https://delivery-chimelu-new.onrender.com/api/v1/restaurantWallet/pending-withdrawals');
      const allWithdrawals = response.data;

      const reversedWithdrawals = allWithdrawals.filter(order => order.status === 'reversed');

      setOrders(reversedWithdrawals);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const header = [
    "Restaurant’s Name",
    "Withdrawal (NGN)",
    "Account No.",
    "Account Name",
    "Bank Name",
    "Balance (NGN)",
    "TransactionId",
  ];

  return (
    <main>
      <div className="flex flex-col mt-4 px-3 pb-5 gap-4" style={{ paddingBottom: "100px" }}>
        <div className="flex gap-3 items-center">
          <div className="flex-1 font-semibold text-gray-800 grid gap-3 grid-cols-7">
            {header.map((data, key) => (
              <div className="center" key={key}>
                <p>{data}</p>
              </div>
            ))}
          </div>
        </div>
        {/* Check if orders is empty, display message if no data is found */}
        {orders.length === 0 ? (
          <div className="text-center text-gray-500">Data not found</div>
        ) : (
          // Display orders
          orders.map((order, index) => (
            <div key={index} className="flex gap-3 border-b-2 pb-2 items-center">
              <div className="flex-1 grid gap-3 grid-cols-7">
                <div className="center">
                  <p>{order.restaurantName}</p>
                </div>
                <div className="center">
                  <p>₦{order.withdrawalAmount}</p>
                </div>
                <div className="center">
                  <p>{order.accountNumber}</p>
                </div>
                <div className="center">
                  <p>{order.accountName}</p>
                </div>
                <div className="center">
                  <p>{order.bankName}</p>
                </div>
                <div className="center">
                  <p>₦{order.availableBalance}</p>
                </div>
                <div className="center" style={{color:'red'}}>
                  <p>{order.transactionId}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
}
