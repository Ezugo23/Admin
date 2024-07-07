// WithdrawalProvider.js

import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const WithdrawalContext = createContext();

const WithdrawalProvider = ({ children }) => {
  const [withdrawals, setWithdrawals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [walletData, setWalletData] = useState({
    totalWalletBalance: 0,
    totalPaidMoney: 0,
  });
  const [walletLoading, setWalletLoading] = useState(true);
  const [restaurantTransactions, setRestaurantTransactions] = useState([]);
  const [restaurantLoading, setRestaurantLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [pendingWithdrawals, setPendingWithdrawals] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [restaurantsLoading, setRestaurantsLoading] = useState(true);
  const [tableMenuData, setTableMenuData] = useState([]);
  const [tableMenuLoading, setTableMenuLoading] = useState(true);

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

  const fetchDriverData = async () => {
    try {
      const response = await axios.get(
        'https://delivery-chimelu-new.onrender.com/api/v1/driver/update/driver-sales'
      );
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Error fetching data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const fetchWalletData = async () => {
    try {
      const response = await axios.get(
        'https://delivery-chimelu-new.onrender.com/api/v1/wallet/calculate/balance-and-paid'
      );
      setWalletData(response.data);
    } catch (error) {
      console.error('Error fetching wallet data:', error);
    } finally {
      setWalletLoading(false);
    }
  };

  const fetchRestaurantTransactions = async (showLoading = false) => {
    if (showLoading) {
      setRestaurantLoading(true);
    }
    try {
      const response = await axios.get(
        'https://delivery-chimelu-new.onrender.com/api/v1/restaurantWallet/pending-withdrawals'
      );
      setRestaurantTransactions(response.data);
      const pendingOrders = response.data.filter(
        (order) => order.status === 'pending'
      );
      setPendingWithdrawals(pendingOrders);
    } catch (error) {
      console.error('Error fetching restaurant transactions:', error);
    } finally {
      if (showLoading) {
        setRestaurantLoading(false);
      }
    }
  };

  const fetchOrders = async () => {
    setOrdersLoading(true);
    try {
      const response = await axios.get(
        'https://delivery-chimelu-new.onrender.com/api/v1/orders/'
      );
      const formattedData = response.data.map((order) => ({
        id: order._id,
        Date: new Date(order.orderDate).toLocaleDateString(),
        Time: new Date(order.orderDate).toLocaleTimeString(),
        client: order.userId
          ? `${order.userId.username}\n${order.deliveryAddress.address}`
          : 'N/A',
        seller: order.restaurantId
          ? `${order.restaurantId.restaurantName}\n${order.restaurantId.address}`
          : 'N/A',
        invoice: `W${order.orderId}`,
        driver: order.assignedDriver
          ? {
              name: order.assignedDriver.username,
              image: order.assignedDriver.image,
              phoneNumber: order.assignedDriver.phoneNumber,
            }
          : {
              name: 'N/A',
              image: '',
              phoneNumber: 'N/A',
            },
        fee: order.grandTotal,
        orderStatus: order.orderStatus,
      }));
      setOrders(formattedData);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setError('Error fetching orders. Please try again later.');
    } finally {
      setOrdersLoading(false);
    }
  };

  const fetchRestaurants = async (showLoading = false) => {
    if (showLoading) {
      setRestaurantsLoading(true);
    }
    try {
      const response = await axios.get(
        'https://delivery-chimelu-new.onrender.com/api/v1/restaurant/'
      );
      const fetchedData = response.data.restaurants;
      setRestaurants(fetchedData);
      localStorage.setItem('restaurantData', JSON.stringify(fetchedData));
    } catch (error) {
      console.error('Error fetching restaurants:', error);
    } finally {
      if (showLoading) {
        setRestaurantsLoading(false);
      }
    }
  };

  const fetchTableMenuData = async () => {
    setTableMenuLoading(true);
    try {
      const response = await axios.get(
        'https://delivery-chimelu-new.onrender.com/api/v1/restaurantWallet/all-transaction'
      );
      setTableMenuData(response.data.transactions);
    } catch (error) {
      console.error('Error fetching table menu data:', error);
    } finally {
      setTableMenuLoading(false);
    }
  };

  const approveRestaurant = async (id) => {
    try {
      await axios.patch(
        `https://delivery-chimelu-new.onrender.com/api/v1/approve-restaurant/${id}`
      );
      await fetchRestaurants();
    } catch (error) {
      console.error('Error approving restaurant:', error);
    }
  };

  const toggleRestaurantStatus = async (id) => {
    try {
      await axios.patch(
        `https://delivery-chimelu-new.onrender.com/api/v1/${id}/toggle-restaurant-status`
      );
      await fetchRestaurants();
    } catch (error) {
      console.error('Error toggling restaurant status:', error);
    }
  };

  const toggleRestaurantAvailability = async (id, isAvailable) => {
    try {
      await axios.patch(
        `https://delivery-chimelu-new.onrender.com/api/v1/restaurant/available/${id}`,
        {
          isAvailable: !isAvailable,
        }
      );
      await fetchRestaurants();
    } catch (error) {
      console.error('Error toggling availability:', error);
    }
  };

  useEffect(() => {
    fetchWithdrawals();
    fetchDriverData();
    fetchWalletData();
    fetchRestaurantTransactions(true);
    fetchOrders();
    fetchRestaurants(true);
    fetchTableMenuData();
    const intervalId = setInterval(() => {
      fetchWithdrawals();
      fetchDriverData();
      fetchWalletData();
      fetchRestaurantTransactions(false);
      fetchOrders();
      fetchRestaurants(false);
      fetchTableMenuData();
    }, 2 * 60 * 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <WithdrawalContext.Provider
      value={{
        withdrawals,
        loading,
        data,
        error,
        walletData,
        walletLoading,
        restaurantTransactions,
        restaurantLoading,
        orders,
        ordersLoading,
        pendingWithdrawals,
        fetchRestaurantTransactions,
        restaurants,
        restaurantsLoading,
        approveRestaurant,
        toggleRestaurantStatus,
        toggleRestaurantAvailability,
        tableMenuData,
        tableMenuLoading,
        fetchTableMenuData,
      }}
    >
      {children}
    </WithdrawalContext.Provider>
  );
};

export { WithdrawalContext, WithdrawalProvider };
