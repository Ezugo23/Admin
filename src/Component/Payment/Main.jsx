import { useState, useEffect } from "react";
import { BsChevronBarUp, BsEyeSlash, BsEye } from "react-icons/bs";
import Received from "./Recieved";
import Withdrawal from "./Withdrawal";
import Withdraw from "./Withdraw"; // Import the Withdraw component
import Spinner from 'react-bootstrap/Spinner';
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Modal from 'react-modal'; // Import react-modal

// Set the root element for the modal
Modal.setAppElement('#root');

export default function Main() {
  const {id} = useParams()
  const [showWithdrawForm, setShowWithdrawForm] = useState(false);
  const headers = ["IVOICE ID", "DATE", "RECEIVED", "STATUS"];
  const headersWithdrawal = ["TRANSACTIONID", "DATE", "AMOUNT WITHDRAWN", "STATUS"];
  const [balances, setBalances] = useState({});
  const [totalAmount, setTotalAmount] = useState(0);
  const [showAmount, setShowAmount] = useState(false);
  const [restaurantId, setRestaurantId] = useState('');
  const [error, setError] = useState(null); // State to track error
  const [receivedData, setReceivedData] = useState([]); // State to store received data
  const [withdrawalData, setWithdrawalData] = useState([]); // State to store withdrawal data
  const [activeTab, setActiveTab] = useState("received"); // Default to "received"
  const [loadingBalances, setLoadingBalances] = useState(true); // State to track loading for balances
  const [loadingReceived, setLoadingReceived] = useState(true); // State to track loading for received data
  const [loadingWithdrawals, setLoadingWithdrawals] = useState(true); // State to track loading for withdrawal data
  const [isLoading, setIsLoading] = useState(true); // Track loading state
  const [receiptUrl, setReceiptUrl] = useState(''); // State for the receipt URL
  const [isModalOpen, setIsModalOpen] = useState(false); 

  useEffect(() => {
  
    fetch(`https://delivery-chimelu-new.onrender.com/api/v1/restaurantWallet/balances/${id}`, {
      headers: {
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
         
        }
  
        return response.json();
      })
      .then(data => {
        setBalances(data);
        setTotalAmount(data.availableBalance + data.swiftBalance);
      })
      .catch(error => {
        console.error('Error fetching balances:', error);
        setError('Error fetching balances. Please check your network connection.');
        
      }) .finally(() => setLoadingBalances(false));

    // Fetch received data when the "Received" tab is active
    if (activeTab === "received") {
      fetch(`https://delivery-chimelu-new.onrender.com/api/v1/restaurantWallet/moved-swift/${id}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          setReceivedData(data.movedBalanceTransactions);
        })
        .catch(error => {
          console.error('Error fetching received data:', error);
          setError('Error fetching received data. Please check your network connection.');
        });
    }
  }, [activeTab]); // Added activeTab as a dependency

  // Fetch withdrawal data when the "Withdrawal" tab is active
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (activeTab === "withdrawal") {
      fetch(`https://delivery-chimelu-new.onrender.com/api/v1/restaurantWallet/withdrawals/${restaurantId}`,{
        headers: {
        }
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          setWithdrawalData(data.withdrawals);
        })
        .catch(error => {
          console.error('Error fetching withdrawals:', error);
          setError('Error fetching withdrawals. Please check your network connection.');
        })
        .finally(() => setLoadingWithdrawals(false));
    }
  }, [activeTab]);
  
  const openModal = (receiptUrl) => {
    setReceiptUrl(receiptUrl);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setReceiptUrl('');
    setIsModalOpen(false);
  };

  // Render error message if error occurred
  if (error) {
    return (
      <div>
        <div>Error: {error}</div>
        <div className="px-10 py-12 center flex-col gap-3 bg-green-50 shadow-md rounded-xl">
          <div className="flex text-green-500 gap-2">
            <p className="text-11 font-semibold">Total Amount in Wallet</p>
          </div>
          <p className="text-green-500 font-bold text-xl">
            Error fetching balance. Please check your network connection.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex border-b-2 bg-white p-6 pb-4 justify-between items-center">
        <p className="text-2xl font-bold">Payment</p>
      <div className="">
        {/* Render withdrawal form if showWithdrawForm is true */}
        {showWithdrawForm && <Withdraw onClose={() => setShowWithdrawForm(false)} />}
        {/* Rest of your component */}
      </div>
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 bg-green-500 rounded-full center shadow"> 
            <BsChevronBarUp
              className="text-base text-white stroke-1 cursor-pointer"
              onClick={() => setShowWithdrawForm(!showWithdrawForm)}
            />
          </div>
          <p className="font-semibold">Withdrawal</p>
        </div>
      </div>
      <div className="p-6">
        <div className="grid mt-3 grid-cols-3 gap-5">
          {/* Swift Wallet Balance */}
          <div className="px-10 py-12 center flex-col gap-3 rounded-md bg-green-50 shadow-md rounded-xl">
            <div className="flex text-green-500 gap-2">
              <p className="text-11 font-semibold">Swift Wallet Balance</p>
              {showAmount ? (
                <BsEyeSlash
                  className="text-sm cursor-pointer"
                  onClick={() => setShowAmount(false)}
                />
              ) : (
                <BsEye
                  className="text-sm cursor-pointer"
                  onClick={() => setShowAmount(true)}
                />
              )}
            </div>
            <p className="text-green-500 font-bold text-xl">
              ₦{showAmount ? balances.swiftBalance?.toLocaleString() + '.00' : '****'}
            </p>
          </div>
          {/* Available Wallet Balance */}
          <div className="px-10 py-12 center flex-col gap-3 rounded-md bg-green-50 shadow-md rounded-xl">
            <div className="flex text-green-500 gap-2">
              <p className="text-11 font-semibold">Available Wallet Balance</p>
              {showAmount ? (
                <BsEyeSlash
                  className="text-sm cursor-pointer"
                  onClick={() => setShowAmount(false)}
                />
              ) : (
                <BsEye
                  className="text-sm cursor-pointer"
                  onClick={() => setShowAmount(true)}
                />
              )}
            </div>
            <p className="text-green-500 font-bold text-xl">
              ₦{showAmount ? balances.availableBalance?.toLocaleString() + '.00' : '****'}
            </p>
          </div>
          {/* Total Amount in Wallet */}
          <div className="px-10 py-12 center flex-col gap-3 rounded-md bg-green-50 shadow-md rounded-xl">
            <div className="flex text-green-500 gap-2">
              <p className="text-11 font-semibold">Total Amount in Wallet</p>
              {showAmount ? (
                <BsEyeSlash
                  className="text-sm cursor-pointer"
                  onClick={() => setShowAmount(false)}
                />
              ) : (
                <BsEye
                  className="text-sm cursor-pointer"
                  onClick={() => setShowAmount(true)}
                />
              )}
            </div>
            <p className="text-green-500 font-bold text-xl">
              ₦{showAmount ? totalAmount?.toLocaleString() + '.00' : '****'}
            </p>
          </div>
        </div>
        <div className="flex mt-3 items-center gap-1">
          <div className="h-[6px] w-[6px] bg-gray-600 rounded-full "></div>
          <p className="text-gray-500 text-11">
            Swift balance is moved to available balance at the close of each day.
          </p>
        </div>
        <div className="grid mt-3 border-2 border-green-500 grid-cols-2 h-12">
          <div
            className={`center cursor-pointer duration-300 ${
              activeTab === "received" ? "bg-green-500 text-white" : "bg-transparent text-green-500"
            }`}
            onClick={() => setActiveTab("received")}
          >
            <p>Received</p>
          </div>
          <div
            className={`center cursor-pointer duration-300 ${
              activeTab === "withdrawal" ? "bg-green-500 text-white" : "bg-transparent text-green-500"
            }`}
            onClick={() => setActiveTab("withdrawal")}
          >
            <p>Withdrawal</p>
          </div>
        </div>
        {loadingBalances && (
          <div className="text-center mt-4">
            {/* <Spinner animation="grow" /> */}
          </div>
        )}
        {activeTab === "received" && loadingReceived && (
          <div className="text-center mt-4">
            {/* <Spinner animation="grow" /> */}
          </div>
        )}
        {activeTab === "withdrawal" && loadingWithdrawals && (
          <div className="text-center mt-4">
            <Spinner animation="grow" />
          </div>
        )}
        {activeTab === "received" && (
          <div>
            <div className="grid bg-white mt-3 mb-2 py-3 grid-cols-4">
              {headers.map((header, index) => (
                <div className="center" key={index}>
                  <p className="font-semibold">{header}</p>
                </div>
              ))}
            </div>
            <div className="space-y-3">
              {receivedData.map((transaction, index) => (
                <Received key={index} data={transaction} />
              ))}
            </div>
          </div>
        )}
        {activeTab === "withdrawal" && (
          <div>
            <div className="grid bg-white mt-3 mb-2 py-3 grid-cols-4">
              {headersWithdrawal.map((header, index) => (
                <div className="center" key={index}>
                  <p className="font-semibold">{header}</p>
                </div>
              ))}
            </div>
            <div className="space-y-3">
              {withdrawalData.map((withdrawal, index) => (
                <div key={index}>
                  <Withdrawal withdrawal={withdrawal} openModal={openModal} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Modal for displaying receipt */}
      <Modal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      contentLabel="Receipt Image"
      style={{
        content: {
          maxWidth: '500px',
          maxHeight: '500px',
          margin: 'auto',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        },
      }}
    >
      <img src={receiptUrl} alt="Receipt" style={{ maxWidth: '100%', maxHeight: '100%' }} />
      <button onClick={closeModal}>Close</button>
    </Modal>
    </div>
  );
}
