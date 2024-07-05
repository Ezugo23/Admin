import React, { useContext, useEffect } from 'react';
import { WithdrawalContext } from '../../../contexts/WithdrawalContext';

export default function Succeed() {
  const {
    restaurantTransactions,
    restaurantLoading,
    fetchRestaurantTransactions,
  } = useContext(WithdrawalContext);

  useEffect(() => {
    fetchRestaurantTransactions();
  }, []);

  const reversedWithdrawals = restaurantTransactions.filter(
    (order) => order.status === 'reversed'
  );

  const header = [
    "Restaurant's Name",
    'Withdrawal (NGN)',
    'Account No.',
    'Account Name',
    'Bank Name',
    'Balance (NGN)',
    'TransactionId',
  ];

  return (
    <main>
      <div
        className="flex flex-col mt-4 px-3 pb-5 gap-4"
        style={{ paddingBottom: '100px' }}
      >
        <div className="flex gap-3 items-center">
          <div className="flex-1 font-semibold text-gray-800 grid gap-3 grid-cols-7">
            {header.map((data, key) => (
              <div className="center" key={key}>
                <p>{data}</p>
              </div>
            ))}
          </div>
        </div>
        {restaurantLoading ? (
          <div className="text-center text-gray-500">Loading...</div>
        ) : reversedWithdrawals.length === 0 ? (
          <div className="text-center text-gray-500">Data not found</div>
        ) : (
          reversedWithdrawals.map((order, index) => (
            <div
              key={index}
              className="flex gap-3 border-b-2 pb-2 items-center"
            >
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
                <div className="center" style={{ color: 'red' }}>
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
