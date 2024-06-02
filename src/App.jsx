import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box, Flex } from '@chakra-ui/react';
import Sidebar from './Component/Sidebar';
import Profile from './pages/Profile/Profile';
import TopNav from './Component/Topnav';
import Settings from './pages/settings/Settings';
import Home from './pages/home/Home';
import History from './pages/OrdersHistory/History';
import Faq from './pages/faq/Faq';
import Users from './pages/users/Users';
import Admin from './pages/users/administrators/Admin';
import AllUsers from './pages/users/allUsers/AllUsers';
import Drivers from './pages/drivers/Drivers';
import DriverSettings from './pages/drivers/DriverSettings';
import DriversList from './pages/drivers/DriversList';
import OweAmount from './pages/drivers/OweAmount';
import Sellers from './pages/FoodSellers/Sellers';
import SellersList from './pages/FoodSellers/SellersList';
import { io } from 'socket.io-client';

function App() {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io('wss://swifdropp.onrender.com');

    newSocket.on('connect', () => {
      console.log('Socket connected');
    });

    newSocket.on('disconnect', () => {
      console.log('Socket disconnected');
    });

    newSocket.on('driverLocationUpdate', (data) => {
      console.log('Driver location update received:', data);

      // Store the driver location update in localStorage
      localStorage.setItem(`driverLocation_${data.driverId}`, JSON.stringify(data));
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
      console.log('Socket connection closed');
    };
  }, []);

  return (
    <Router>
      <Flex h="100vh" direction="row" bg={'#f9f9f9'}>
        <Sidebar />
        <Flex direction="column" flex="1">
          <TopNav />
          <Box flex="1" p={4}>
            <Box>
              <Routes>
                <Route path="/" element={<Home socket={socket} />} />
                <Route path="/profile" element={<Profile socket={socket} />} />
                <Route path="/foodsellers" element={<Sellers socket={socket} />} />
                <Route path="/foodsellers/list" element={<SellersList socket={socket} />} />
                <Route path="/ordersHistory" element={<History socket={socket} />} />
                <Route path="/users" element={<Users socket={socket} />} />
                <Route path="/users/admin" element={<Admin socket={socket} />} />
                <Route path="/users/allusers" element={<AllUsers socket={socket} />} />
                <Route path="/drivers" element={<Drivers socket={socket} />} />
                <Route path="/drivers/settings" element={<DriverSettings socket={socket} />} />
                <Route path="/drivers/list" element={<DriversList socket={socket} />} />
                <Route path="/drivers/oweamount" element={<OweAmount socket={socket} />} />
                <Route path="/faq" element={<Faq socket={socket} />} />
                <Route path="/settings" element={<Settings socket={socket} />} />
              </Routes>
            </Box>
          </Box>
        </Flex>
      </Flex>
    </Router>
  );
}

export default App;
