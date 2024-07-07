// Succeed.js

import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Modal from './Modal';
import { WithdrawalContext } from '../../../contexts/WithdrawalContext';

export default function Succeed() {
  const { pendingWithdrawals, fetchRestaurantTransactions } =
    useContext(WithdrawalContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedWithdrawalId, setSelectedWithdrawalId] = useState(null);

  useEffect(() => {
    fetchRestaurantTransactions();
  }, []);

  const handleRefund = async (restaurantId, withdrawalId) => {
    try {
      const response = await axios.put(
        `https://delivery-chimelu-new.onrender.com/api/v1/restaurantWallet/reverse-money/${restaurantId}/${withdrawalId}`
      );
      if (response.status === 200) {
        alert('Refund successful');
        fetchRestaurantTransactions();
      } else {
        alert('Refund failed');
      }
    } catch (error) {
      console.error('Error processing refund:', error);
      alert('Refund failed');
    }
  };

  const handlePayClick = (withdrawalId) => {
    setSelectedWithdrawalId(withdrawalId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedWithdrawalId(null);
  };

  const header = [
    "Restaurant's Name",
    'Withdrawal (NGN)',
    'Account No.',
    'Account Name',
    'Bank Name',
    'Transaction Id',
    'Action',
  ];

  return (
    <main>
      <div
        className="flex flex-col mt-4 px-3 pb-5 gap-4"
        style={{ paddingBottom: '100px' }}
      >
        <div className="flex gap-3 items-center">
          <div className="flex-1 font-semibold text-gray-800 grid gap-3 grid-cols-8">
            {header.map((data, key) => (
              <div className="center" key={key}>
                <p>{data}</p>
              </div>
            ))}
          </div>
        </div>
        {pendingWithdrawals.length === 0 ? (
          <div className="text-center text-gray-500">Data not found</div>
        ) : (
          pendingWithdrawals.map((order, index) => (
            <div
              key={index}
              className="flex gap-4 border-b-2 pb-2 items-center"
            >
              <div className="flex-1 grid gap-3 grid-cols-8">
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
                <div className="center" style={{ color: 'orange' }}>
                  <p>{order.transactionId}</p>
                </div>
                <div className="flex justify-between">
                  <div className="center">
                    <button
                      style={{
                        width: '69px',
                        height: '24px',
                        color: 'white',
                        backgroundColor: '#4CAF50',
                      }}
                      onClick={() => handlePayClick(order._id)}
                    >
                      Pay
                    </button>
                  </div>
                  <div className="center">
                    <button
                      style={{
                        width: '69px',
                        height: '24px',
                        color: 'white',
                        backgroundColor: '#4DB6AC',
                      }}
                      onClick={() =>
                        handleRefund(order.restaurantId, order._id)
                      }
                    >
                      Refund
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        withdrawalId={selectedWithdrawalId}
      />
    </main>
  );
}
