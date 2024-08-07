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
import WithdrawalHistory from './pages/drivers/WithdrawalHistory';
import Sellers from './pages/FoodSellers/Sellers';
import SellersList from './pages/FoodSellers/SellersList';
import Request from './pages/drivers/component/Request';
import { io } from 'socket.io-client';
import { DriversProvider } from './contexts/DriversContext';
import { WithdrawalProvider } from './contexts/WithdrawalContext';
import EditUser from './pages/users/EditUser/EditUser';
import OweAmount from './pages/FoodSellers/Owe'
import Payment from './Component/FoodMenu/Swift/Payment'
import HistorySwift from './Component/FoodMenu/Swift/History'
import HistoryRec from './Component/FoodMenu/Reciept'
import Category from './Component/FoodMenu/Category/CategoryTable'
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './util/http';
import { PayoutProvider } from './contexts/PayoutContext';

function App() {
  const [socket, setSocket] = useState(null);
  const [userImage, setUserImage] = useState('');

  useEffect(() => {
    const newSocket = io('wss://delivery-chimelu-new.onrender.com');

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
    <Flex h="100vh" direction="row" backgroundColor="#f9f9f9" overflow="hidden">
      <Box as="nav" flex="0 0 auto">
        <Sidebar />
      </Box>
      <Flex direction="column" flex="1" overflow="hidden">
        <Box as="header" flex="0 0 auto">
          <TopNav userImage={userImage} setUserImage={setUserImage} />
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
    <QueryClientProvider client={queryClient}>
    <DriversProvider>
      <WithdrawalProvider>
        <PayoutProvider>
          <Router>
            <Routes>
              <Route path="/*" element={<Signup socket={socket} />} />
              <Route
                path="/Dashboard"
                element={
                  <MainLayout>
                    <Home socket={socket} />
                  </MainLayout>
                }
              />
              <Route
                path="/profile/*"
                element={
                  <MainLayout>
                    <Profile socket={socket} />
                  </MainLayout>
                }
              />
              <Route
                path="/foodsellers/*"
                element={
                  <MainLayout>
                    <Sellers socket={socket} />
                  </MainLayout>
                }
              />
              <Route
                path="/foodsellers/list"
                element={
                  <MainLayout>
                    <SellersList socket={socket} />
                  </MainLayout>
                }
              />
              <Route
                path="/history-reciept/:id"
                element={
                  <MainLayout>
                    <HistoryRec socket={socket} />
                  </MainLayout>
                }
              />
              <Route
                path="/foodsellers/oweamount"
                element={
                  <MainLayout>
                    <OweAmount socket={socket} />
                  </MainLayout>
                }
              />
              <Route
                path="/foodsellers/swiftamount"
                element={
                  <MainLayout>
                    <Payment socket={socket} />
                  </MainLayout>
                }
              />
               <Route
                path="/foodsellers/categories"
                element={
                  <MainLayout>
                    <Category socket={socket} />
                  </MainLayout>
                }
              />
              <Route
                path="/foodsellers/swiftamount/history"
                element={
                  <MainLayout>
                    <HistorySwift socket={socket} />
                  </MainLayout>
                }
              />
              <Route
                path="/ordersHistory/*"
                element={
                  <MainLayout>
                    <History socket={socket} />
                  </MainLayout>
                }
              />
              <Route
                path="/users/admin"
                element={
                  <MainLayout>
                    <Users socket={socket} />
                  </MainLayout>
                }
              />
              <Route
                path="/users/allusers"
                element={
                  <MainLayout>
                    <AllUsers socket={socket} />
                  </MainLayout>
                }
              />
              <Route
                path="/users/editUser/:id"
                element={
                  <MainLayout>
                    <EditUser socket={socket} />
                  </MainLayout>
                }
              />

              <Route
                path="/drivers"
                element={
                  <MainLayout>
                    <Drivers socket={socket} />
                  </MainLayout>
                }
              />
              <Route
                path="/driversprofile/:driverId/*"
                element={
                  <MainLayout>
                    <DriversProfile socket={socket} />
                  </MainLayout>
                }
              />
              <Route
                path="/drivers/settings"
                element={
                  <MainLayout>
                    <DriverSettings socket={socket} />
                  </MainLayout>
                }
              />
              <Route
                path="/drivers/list"
                element={
                  <MainLayout>
                    <DriversList socket={socket} />
                  </MainLayout>
                }
              />
              <Route
                path="/request/:id"
                element={
                  <MainLayout>
                    <Request socket={socket} />
                  </MainLayout>
                }
              />
              <Route
                path="/drivers/withdrawalhistory"
                element={
                  <MainLayout>
                    <WithdrawalHistory socket={socket} />
                  </MainLayout>
                }
              />
              <Route
                path="/daily-transaction/*"
                element={
                  <MainLayout>
                    <Daily socket={socket} />
                  </MainLayout>
                }
              />
              <Route
                path="/settings"
                element={
                  <MainLayout>
                    <Settings socket={socket} />
                  </MainLayout>
                }
              />
            </Routes>
          </Router>
        </PayoutProvider>
      </WithdrawalProvider>
    </DriversProvider>
    </QueryClientProvider>
  );
}

export default App;
