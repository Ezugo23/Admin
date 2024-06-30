import { useState, useEffect } from "react";

export default function Succeed() {
  const [orders, setOrders] = useState([]);
  const [restaurantId, setRestaurantId] = useState('');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    const storedRestaurantId = 'someRestaurantId'; // Example hardcoded restaurant ID
    setRestaurantId(storedRestaurantId);

    const data = [
      {
        restaurantName: 'Restaurant A',
        withdrawalAmount: 1500,
        accountNo: '1234567890',
        accountName: 'John Doe',
        bankName: 'Bank A',
        availableBalance: 5000,
        transactionId: 'Failed',
      },
      {
        restaurantName: 'Restaurant B',
        withdrawalAmount: 2500,
        accountNo: '0987654321',
        accountName: 'Jane Smith',
        bankName: 'Bank B',
        availableBalance: 10000,
        transactionId: 'Failed',
      },
      {
        restaurantName: 'Restaurant C',
        withdrawalAmount: 3500,
        accountNo: '1122334455',
        accountName: 'Alice Johnson',
        bankName: 'Bank C',
        availableBalance: 15000,
        transactionId: 'Failed',
      },
    ];

    setOrders(data);
  };

  const header = [
    "Restaurant’s Name",
    "Withdrawal (NGN)",
    "Account No.",
    "Account Name",
    "Bank Name",
    " Balance (NGN)",
    "Status"
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
                  <p>{order.accountNo}</p>
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