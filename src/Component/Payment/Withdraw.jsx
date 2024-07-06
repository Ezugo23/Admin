import { AiOutlineClose } from "react-icons/ai";
import { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios
import { Navigate, useNavigate, useParams } from "react-router-dom";

export default function Withdraw({ onClose }) {
  const {id} = useParams()
  const [accountNumber, setAccountNumber] = useState('');
  const [bankName, setBankName] = useState('');
  const [withdrawalAmount, setWithdrawalAmount] = useState('');
  const [accountName, setAccountName] = useState('');
  const [restaurantId, setRestaurantId] = useState('');
  const [error, setError] = useState(null);
  const [recents, setRecents] = useState([]);

  const inputStyle = {
    border: '1px solid #979797',
    borderRadius: '4px',
    width: '318px',
    height: '43px',
    marginTop: '10px',
    fontFamily: 'Inter, sans-serif',
    fontWeight: '400px',
    fontSize: '20px',
    lineHeight: '16.94px',
    paddingLeft: '10px'
  };

  const buttonStyle = {
    width: '35%',
    height: '40px',
    marginTop: '7%',
    borderRadius: '6px',
    border: '1px solid #979797',
    padding: '4px 12px',
    gap: '8px',
    backgroundColor: '#4CAF50',
    fontFamily: 'Inter, sans-serif',
    fontWeight: '700px',
    fontSize: '22px',
    lineHeight: '24px',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft:'auto',
    marginRight:'auto'
  };

  useEffect(() => {
    const storedRestaurantId = localStorage.getItem('userId');
    if (storedRestaurantId) {
      setRestaurantId(storedRestaurantId);
    }

    // Fetch recent withdrawal data
    const token = localStorage.getItem('token');
    axios.get(`https://delivery-chimelu-new.onrender.com/api/v1/restaurantWallet/account-details/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      setRecents(response.data?.withdrawals || []);
    })
    .catch(error => {
      console.error('Error fetching recent withdrawals:', error);
      setError('Error fetching recent withdrawals. Please check your network connection.');
    });
  }, []);

  const handleSubmit = () => {
    if (!accountNumber || !bankName || !withdrawalAmount || !accountName) {
        setError('Please fill in all fields');
        return;
    }

    const parsedWithdrawalAmount = parseFloat(withdrawalAmount);

    const data = {
        accountNumber: accountNumber,
        bankName: bankName,
        withdrawalAmount: parsedWithdrawalAmount,
        accountName: accountName
    };

    const token = localStorage.getItem('token');

    axios.post(`https://delivery-chimelu-new.onrender.com/api/v1/restaurantWallet/withdraw/${restaurantId}`, data, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            console.log('Withdrawal successful');
            onClose();
        })
        .catch(error => {
            console.error('Error:', error.response.data);
            setError(error.response.data.message);
        });
};

const handleCopy = (recent) => {
    setAccountNumber(recent.accountNumber);
    setBankName(recent.bankName);
    setAccountName(recent.accountName);

    // Convert invoiceId to Number
    const invoiceId = recent.invoiceId && !isNaN(recent.invoiceId) ? Number(recent.invoiceId) : null;
    // Handle invoiceId appropriately, e.g., set it in state
};

  return (
    <>
      <div style={{
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        zIndex: '1000',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          backgroundColor: 'white',
          width: '400px',
          padding: '20px',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
          maxHeight: '80%', // Set a fixed height for the container
          overflowY: 'auto' // Enable vertical scrolling
        }}>
          <div style={{ display: 'flex' }}>
                        <AiOutlineClose className="text-base text-black stroke-1 cursor-pointer" style={{ width: '24px', marginTop: '10px', border: '1px', borderStyle: 'solid', height: '24px', borderColor: '#979797' }} onClick={onClose} />
                        <h1 style={{ marginLeft: '10px', fontWeight: '600px', fontSize: '25px', marginTop: '5px', color: '#4CAF50' }}>Withdraw</h1>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '10px' }}>
                        <input placeholder="Account Number" style={inputStyle} type="number" value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} />
                        <input placeholder="Bank Name" style={inputStyle} value={bankName} onChange={(e) => setBankName(e.target.value)} />
                        <input placeholder="Amount" style={inputStyle} type="number" value={withdrawalAmount} onChange={(e) => setWithdrawalAmount(e.target.value)} />
                        <input placeholder="Account Name" style={inputStyle} value={accountName} onChange={(e) => setAccountName(e.target.value)} />
                    </div>
                    {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
                    <button style={buttonStyle} onClick={handleSubmit}>Withdraw</button>
                    <div style={{ paddingTop: '20px' }}>
                        <h1 style={{ fontFamily: 'Inter, sans-serif', fontWeight: '600px', fontSize: '20px', marginTop: '10px', color: '#4CAF50' }}>Recents</h1>
                        {recents.map((recent, index) => (
                            <div key={index}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <h3 style={{ fontFamily: 'Inter, sans-serif', fontWeight: '400px', fontSize: '14px', marginTop: '10px', lineHeight: '16.49px' }}>{recent.bankName}</h3>
                                    <a href="#" style={{ fontFamily: 'Inter, sans-serif', fontWeight: '400px', fontSize: '12px', marginTop: '10px', lineHeight: '14.52px', color: '#5364FF' }} onClick={() => handleCopy(recent)}>Copy</a>
                                </div>
                                <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: '300px', fontSize: '10px', marginTop: '10px', lineHeight: '12.1px' }}>{recent.accountNumber} {recent.accountName}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}