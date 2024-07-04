import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const PayoutContext = createContext();

export const usePayoutContext = () => useContext(PayoutContext);

export const PayoutProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [withdrawals, setWithdrawals] = useState([]);
  const [recipients, setRecipients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [driverId, setDriverId] = useState(null);

  const fetchTransactions = async (id, showLoading = true) => {
    if (!id) return;

    try {
      if (showLoading) setLoading(true);
      console.log('Fetching transactions for driverId:', id);

      const response = await axios.get(
        `https://delivery-chimelu-new.onrender.com/api/v1/wallet/recent-transactions/${id}`
      );
      const { data } = response;
      console.log('Fetched data:', data);

      if (data && data.wallet) {
        if (data.wallet.transactions) {
          setWithdrawals(data.wallet.transactions);
        }
        if (data.wallet.recipients) {
          setRecipients(data.wallet.recipients);
        }
      }

      if (showLoading) setLoading(false);
    } catch (err) {
      setError('Failed to fetch transactions');
      if (showLoading) setLoading(false);
    }
  };

  useEffect(() => {
    if (driverId) {
      fetchTransactions(driverId, true);
      const interval = setInterval(
        () => fetchTransactions(driverId, false),
        60000
      );
      return () => clearInterval(interval);
    }
  }, [driverId]);

  const setCurrentDriverId = (id) => {
    setDriverId(id);
  };

  return (
    <PayoutContext.Provider
      value={{
        transactions,
        withdrawals,
        recipients,
        loading,
        error,
        setCurrentDriverId,
        fetchTransactions: (id) => fetchTransactions(id, true),
      }}
    >
      {children}
    </PayoutContext.Provider>
  );
};
