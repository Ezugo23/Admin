import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const DriversContext = createContext();

export const useDrivers = () => {
  return useContext(DriversContext);
};

export const DriversProvider = ({ children }) => {
  const [drivers, setDrivers] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const pageSize = 10;

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await axios.get(
          'https://delivery-chimelu-new.onrender.com/api/v1/driver'
        );
        // console.log('Fetched drivers data:', response.data.drivers);

        setDrivers(response.data.drivers);
        setTotalItems(response.data.drivers.length);
      } catch (error) {
        console.error('Error fetching drivers:', error);
      }
    };

    fetchDrivers();

    const intervalId = setInterval(fetchDrivers, 60000);

    return () => clearInterval(intervalId);
  }, []);

  const toggleAvailability = async (driverId, currentStatus) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.patch(
        `https://delivery-chimelu-new.onrender.com/api/v1/driver/availability-driver/${driverId}`,
        { isAvailable: !currentStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        const updatedDrivers = drivers.map((driver) =>
          driver._id === driverId
            ? { ...driver, isAvailable: !currentStatus }
            : driver
        );
        setDrivers(updatedDrivers);
      } else {
        console.error('Failed to toggle availability:', response.data);
      }
    } catch (error) {
      console.error('Error toggling availability:', error);
    }
  };

  const handleApprove = async (driverId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(
        `https://delivery-chimelu-new.onrender.com/api/v1/approve-driver/${driverId}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Fetch updated data
      const response = await axios.get(
        'https://delivery-chimelu-new.onrender.com/api/v1/driver',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setDrivers(response.data.drivers);
    } catch (error) {
      console.error('Error approving driver:', error);
    }
  };

  const handleToggleStatus = async (driverId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(
        `https://delivery-chimelu-new.onrender.com/api/v1/${driverId}/toggle-driver-status`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Fetch updated data
      const response = await axios.get(
        'https://delivery-chimelu-new.onrender.com/api/v1/driver',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setDrivers(response.data.drivers);
    } catch (error) {
      console.error('Error toggling driver status:', error);
    }
  };

  const deleteDriver = async (driverId) => {
    try {
      const response = await axios.delete(
        `https://delivery-chimelu-new.onrender.com/api/v1/driver/${driverId}`
      );

      if (response.status === 200) {
        const updatedDrivers = drivers.filter(
          (driver) => driver._id !== driverId
        );
        setDrivers((prevDrivers) =>
          prevDrivers.filter((driver) => driver._id !== driverId)
        );
        setTotalItems((prevTotalItems) => prevTotalItems - 1); // Update the totalItems count
      } else {
        console.error('Failed to delete driver:', response.data);
      }
    } catch (error) {
      console.error('Error deleting driver:', error);
    }
  };

  const fetchUpdatedDrivers = async () => {
    try {
      const response = await axios.get(
        'https://delivery-chimelu-new.onrender.com/api/v1/driver'
      );
      setDrivers(response.data.drivers);
      setTotalItems(response.data.drivers.length);
    } catch (error) {
      console.error('Error fetching updated drivers:', error);
    }
  };

  return (
    <DriversContext.Provider
      value={{
        drivers,
        totalItems,
        pageSize,
        toggleAvailability,
        deleteDriver,
        fetchUpdatedDrivers,
        handleApprove,
        handleToggleStatus,
      }}
    >
      {children}
    </DriversContext.Provider>
  );
};
