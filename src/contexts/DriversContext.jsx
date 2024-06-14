// this is context is for the driver list
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
        setDrivers(response.data.drivers);
        setTotalItems(response.data.drivers.length);
      } catch (error) {
        console.error('Error fetching drivers:', error);
      }
    };

    // this is where im doing the Initial fetch
    fetchDrivers();

    // it refetches every 1 minutes, doing this for a better user experience
    const intervalId = setInterval(fetchDrivers, 60000);

    // Cleanup function
    return () => clearInterval(intervalId);
  }, []);

  return (
    <DriversContext.Provider value={{ drivers, totalItems, pageSize }}>
      {children}
    </DriversContext.Provider>
  );
};
