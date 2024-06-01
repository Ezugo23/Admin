import React from 'react';
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

function App() {
  return (
    <Router>
      <Flex h="100vh" direction="row" bg={'#f9f9f9'}>
        <Sidebar />
        <Flex direction="column" flex="1">
          <TopNav />
          <Box flex="1" p={4}>
            <Box>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/foodsellers" element={<Sellers />} />
                <Route path="/foodsellers/list" element={<SellersList />} />
                <Route path="/ordersHistory" element={<History />} />
                <Route path="/users" element={<Users />} />
                <Route path="/users/admin" element={<Admin />} />
                <Route path="/users/allusers" element={<AllUsers />} />
                <Route path="/drivers" element={<Drivers />} />
                <Route path="/drivers/settings" element={<DriverSettings />} />
                <Route path="/drivers/list" element={<DriversList />} />
                <Route path="/drivers/oweamount" element={<OweAmount />} />
                <Route path="/faq" element={<Faq />} />

                <Route path="/settings" element={<Settings />} />
              </Routes>
            </Box>
          </Box>
        </Flex>
      </Flex>
    </Router>
  );
}

export default App;
