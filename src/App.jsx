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
import DriversProfile from './pages/drivers/component/DriversProfile';
import OweAmount from './pages/drivers/OweAmount';
import Sellers from './pages/FoodSellers/Sellers';
import SellersList from './pages/FoodSellers/SellersList';
import SideMenu from './Component/Profile/sideMenu';
import Request from './pages/drivers/component/Request';
import { io } from 'socket.io-client';
import { DriversProvider } from './contexts/DriversContext';

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
      localStorage.setItem(
        `driverLocation_${data.driverId}`,
        JSON.stringify(data)
      );
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
      console.log('Socket connection closed');
    };
  }, []);

  return (
    <DriversProvider>
      <Router>
        <Flex
          h="100vh"
          direction="row"
          backgroundColor="#f9f9f9"
          overflow="hidden"
        >
          <Box as="nav" flex="0 0 auto">
            <Sidebar />
          </Box>
          <Flex direction="column" flex="1" overflow="hidden">
            <Box as="header" flex="0 0 auto">
              <TopNav />
            </Box>
            <Box
              as="main"
              flex="1"
              overflowY="auto"
              overflowX="hidden"
              p={4}
              maxW="100%"
            >
              <Box maxW="100%">
                <Routes>
                  <Route path="/" element={<Home socket={socket} />} />
                  <Route
                    path="/profile/*"
                    element={<Profile socket={socket} />}
                  />
                  <Route
                    path="/foodsellers/*"
                    element={<Sellers socket={socket} />}
                  />
                  <Route
                    path="/foodsellers/list"
                    element={<SellersList socket={socket} />}
                  />
                  <Route
                    path="/ordersHistory/*"
                    element={<History socket={socket} />}
                  />
                  <Route path="/users/admin" element={<Users socket={socket} />} />
                  <Route
                    path="/users/admin"
                    element={<Admin socket={socket} />}
                  />
                  <Route
                    path="/users/allusers"
                    element={<AllUsers socket={socket} />}
                  />
                  <Route
                    path="/drivers"
                    element={<Drivers socket={socket} />}
                  />
                  <Route
                    path="/driversprofile/*"
                    element={<DriversProfile socket={socket} />}
                  />
                  <Route
                    path="/drivers/settings"
                    element={<DriverSettings socket={socket} />}
                  />
                  <Route
                    path="/drivers/list"
                    element={<DriversList socket={socket} />}
                  />
                  <Route
                    path="/request/:id"
                    element={<Request socket={socket} />}
                  />

                  <Route
                    path="/drivers/oweamount"
                    element={<OweAmount socket={socket} />}
                  />
                  <Route path="/faq" element={<Faq socket={socket} />} />
                  <Route
                    path="/settings"
                    element={<Settings socket={socket} />}
                  />
                  <Route
                    path="/sidemenu"
                    element={<SideMenu socket={socket} />}
                  />
                </Routes>
              </Box>
            </Box>
          </Flex>
        </Flex>
      </Router>
    </DriversProvider>
  );
}

export default App;
