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
          'https://swifdropp.onrender.com/api/v1/driver'
        );
        console.log('Fetched drivers data:', response.data.drivers);

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
      const response = await axios.patch(
        `https://swifdropp.onrender.com/api/v1/driver/availability-driver/${driverId}`,
        { isAvailable: !currentStatus }
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

  const deleteDriver = async (driverId) => {
    try {
      const response = await axios.delete(
        `https://swifdropp.onrender.com/api/v1/driver/${driverId}`
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
        'https://swifdropp.onrender.com/api/v1/driver'
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
      }}
    >
      {children}
    </DriversContext.Provider>
  );
};
