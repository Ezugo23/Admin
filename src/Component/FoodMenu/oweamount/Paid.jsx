import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactModal from 'react-modal';

export default function SentWithdrawals() {
  const [orders, setOrders] = useState([]);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false); // State for the image modal
  const [selectedImageUrl, setSelectedImageUrl] = useState(''); // State for selected image URL

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('https://delivery-chimelu-new.onrender.com/api/v1/restaurantWallet/pending-withdrawals');
      const sentOrders = response.data.filter(order => order.status === 'sent');
      setOrders(sentOrders);
    } catch (error) {
      console.error('Error fetching sent withdrawals:', error);
    }
  };

  const handleImageClick = (imageUrl) => {
    setSelectedImageUrl(imageUrl);
    setIsImageModalOpen(true);
  };

  const handleCloseImageModal = () => {
    setIsImageModalOpen(false);
    setSelectedImageUrl('');
  };

  const header = [
    "Restaurant’s Name",
    "Withdrawal (NGN)",
    "Account No.",
    "Account Name",
    "Bank Name",
    "Balance (NGN)",
    "Transaction Id",
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
        {orders.length === 0 ? (
          <div className="text-center text-gray-500">Data not found</div>
        ) : (
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
                <div className="center" style={{ color: 'green', cursor: 'pointer', textDecoration: 'underline' }}
                  onClick={() => handleImageClick(order.image)}>
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
              backgroundColor: 'rgba(0, 0, 0, 0.75)'
            },
            content: {
              top: '50%',
              left: '50%',
              right: 'auto',
              bottom: 'auto',
              marginRight: '-50%',
              transform: 'translate(-50%, -50%)',
              maxWidth: '90%',
              maxHeight: '90%'
            }
          }}
        >
          <img src={selectedImageUrl} alt="Receipt" style={{ width: '100%', height: 'auto' }} />
          <button
            onClick={handleCloseImageModal}
            style={{
              marginTop: '10px',
              padding: '10px',
              backgroundColor: '#FF0000',
              color: 'white',
              borderRadius: '5px'
            }}
          >
            Close
          </button>
        </ReactModal>
      </div>
    </main>
  );
}
