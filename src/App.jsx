import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box, Flex } from '@chakra-ui/react';
import Signup from './pages/signup/Signup';
import Sidebar from './Component/Sidebar';
import Profile from './pages/Profile/Profile';
import TopNav from './Component/Topnav';
import Settings from './pages/settings/Settings';
import Home from './pages/home/Home';
import History from './pages/OrdersHistory/History';
import Daily from './pages/faq/Daily';
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
import Request from './pages/drivers/component/Request';
import SuperRegister from './pages/Register/Register'
import SuperLogin from './pages/Login/Login'
import { io } from 'socket.io-client';
import { DriversProvider } from './contexts/DriversContext';
import EditUser from './pages/users/EditUser/EditUser';

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

  const MainLayout = ({ children }) => (
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
          {children}
        </Box>
      </Flex>
    </Flex>
  );

  return (
    <DriversProvider>
      <Router>
        <Routes>
          <Route path="/*" element={<Signup socket={socket} />} />
          <Route path="/Dashboard" element={<MainLayout><Home socket={socket} /></MainLayout>} />
          <Route path="/profile/*" element={<MainLayout><Profile socket={socket} /></MainLayout>} />
          <Route path="/foodsellers/*" element={<MainLayout><Sellers socket={socket} /></MainLayout>} />
          <Route path="/foodsellers/list" element={<MainLayout><SellersList socket={socket} /></MainLayout>} />
          <Route path="/ordersHistory/*" element={<MainLayout><History socket={socket} /></MainLayout>} />
          <Route path="/users/admin" element={<MainLayout><Users socket={socket} /></MainLayout>} />
          <Route path="/users/allusers" element={<MainLayout><AllUsers socket={socket} /></MainLayout>} />
          <Route path="/users/editUser" element={<MainLayout><EditUser socket={socket} /></MainLayout>} />
          <Route path="/drivers" element={<MainLayout><Drivers socket={socket} /></MainLayout>} />
          <Route path="/driversprofile/*" element={<MainLayout><DriversProfile socket={socket} /></MainLayout>} />
          <Route path="/drivers/settings" element={<MainLayout><DriverSettings socket={socket} /></MainLayout>} />
          <Route path="/drivers/list" element={<MainLayout><DriversList socket={socket} /></MainLayout>} />
          <Route path="/request/:id" element={<MainLayout><Request socket={socket} /></MainLayout>} />
          <Route path="/drivers/oweamount" element={<MainLayout><OweAmount socket={socket} /></MainLayout>} />
          <Route path="/daily-transaction/*" element={<MainLayout><Daily socket={socket} /></MainLayout>} />
          <Route path="/settings" element={<MainLayout><Settings socket={socket} /></MainLayout>} />
          <Route exact path="/SuperRegister" element={<SuperRegister />} />
           <Route exact path="/SuperLogin" element={<SuperLogin />}/>
        </Routes>
      </Router>
    </DriversProvider>
  );
}

export default App;