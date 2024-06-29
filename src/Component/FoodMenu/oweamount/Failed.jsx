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
        transactionId: 'Pending',
      },
      {
        restaurantName: 'Restaurant B',
        withdrawalAmount: 2500,
        accountNo: '0987654321',
        accountName: 'Jane Smith',
        bankName: 'Bank B',
        availableBalance: 10000,
        transactionId: 'Pending',
      },
      {
        restaurantName: 'Restaurant C',
        withdrawalAmount: 3500,
        accountNo: '1122334455',
        accountName: 'Alice Johnson',
        bankName: 'Bank C',
        availableBalance: 15000,
        transactionId: 'Pending',
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
    "Balance (NGN)",
    "Status",
   "Action"
  ];

  return (
    <main>
      <div className="flex flex-col mt-4 px-3 pb-5 gap-4" style={{ paddingBottom: "100px" }}>
        <div className="flex gap-3 items-center">
          <div className="flex-1 font-semibold text-gray-800 grid gap-3 grid-cols-8"> {/* Updated grid-cols to 8 */}
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
              <div className="flex-1 grid gap-3 grid-cols-8"> {/* Updated grid-cols to 8 */}
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
                <div className="center" style={{color:'orange'}}>
                  <p>{order.transactionId}</p>
                </div>
                <div className="flex justify-between">
                <div className="center"> {/* Added div for the button */}
                  <button style={{width:'69px', height:'24px', color:'white', backgroundColor:"#4CAF50"}}>Pay</button>
                </div>
                <div className="center"> {/* Added div for the button */}
                  <button style={{width:'69px', height:'24px', color:'white', backgroundColor:"#4DB6AC"}}>Refund</button>
                </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
}