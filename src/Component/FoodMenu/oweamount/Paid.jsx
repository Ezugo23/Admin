import React, { useContext, useEffect, useState } from 'react';
import ReactModal from 'react-modal';
import { WithdrawalContext } from '../../../contexts/WithdrawalContext';

export default function SentWithdrawals() {
  const {
    restaurantTransactions,
    restaurantLoading,
    fetchRestaurantTransactions,
  } = useContext(WithdrawalContext);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState('');

  useEffect(() => {
    fetchRestaurantTransactions();
  }, []);

  const sentOrders = restaurantTransactions.filter(
    (order) => order.status === 'sent'
  );

  const handleImageClick = (imageUrl) => {
    setSelectedImageUrl(imageUrl);
    setIsImageModalOpen(true);
  };

  const handleCloseImageModal = () => {
    setIsImageModalOpen(false);
    setSelectedImageUrl('');
  };

  const header = [
    "Restaurant's Name",
    'Withdrawal (NGN)',
    'Account No.',
    'Account Name',
    'Bank Name',
    'Balance (NGN)',
    'Transaction Id',
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
        ) : sentOrders.length === 0 ? (
          <div className="text-center text-gray-500">Data not found</div>
        ) : (
          sentOrders.map((order, index) => (
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
                <div
                  className="center"
                  style={{
                    color: 'green',
                    cursor: 'pointer',
                    textDecoration: 'underline',
                  }}
                  onClick={() => handleImageClick(order.image)}
                >
                  <p>{order.transactionId}</p>
                </div>
              </div>
            </div>
          ))
        )}

        {/* React Modal for Image */}
        <ReactModal
          isOpen={isImageModalOpen}
          onRequestClose={handleCloseImageModal}
          contentLabel="Receipt Image"
          style={{
            overlay: {
              backgroundColor: 'rgba(0, 0, 0, 0.75)',
            },
            content: {
              top: '50%',
              left: '50%',
              right: 'auto',
              bottom: 'auto',
              marginRight: '-50%',
              transform: 'translate(-50%, -50%)',
              maxWidth: '90%',
              maxHeight: '90%',
            },
          }}
        >
          <img
            src={selectedImageUrl}
            alt="Receipt"
            style={{ width: '100%', height: 'auto' }}
          />
          <button
            onClick={handleCloseImageModal}
            style={{
              marginTop: '10px',
              padding: '10px',
              backgroundColor: '#FF0000',
              color: 'white',
              borderRadius: '5px',
            }}
          >
            Close
          </button>
        </ReactModal>
      </div>
    </main>
  );
}
