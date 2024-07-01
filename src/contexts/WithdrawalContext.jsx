import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const WithdrawalContext = createContext();

const WithdrawalProvider = ({ children }) => {
  const [withdrawals, setWithdrawals] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchWithdrawals = async () => {
    try {
      const response = await axios.get(
        'https://delivery-chimelu-new.onrender.com/api/v1/wallet/allTransfer'
      );
      setWithdrawals(response.data.withdrawals);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching withdrawals:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWithdrawals();
    const intervalId = setInterval(() => {
      fetchWithdrawals();
    }, 2 * 60 * 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <WithdrawalContext.Provider value={{ withdrawals, loading }}>
      {children}
    </WithdrawalContext.Provider>
  );
};

export { WithdrawalContext, WithdrawalProvider };
