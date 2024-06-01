// import React, { useState } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import '../Component/Styles/Sidebar.css';
// import Logo from '../Asset/Logo.svg';
// import { RxDashboard } from 'react-icons/rx';
// import { CgProfile } from 'react-icons/cg';
// import { RiProfileFill } from 'react-icons/ri';
// import { GiFoodTruck } from 'react-icons/gi';
// import { FaMotorcycle } from 'react-icons/fa6';
// import { MdWorkHistory } from 'react-icons/md';
// import { FaQuestionCircle } from 'react-icons/fa';
// import { IoSettingsSharp } from 'react-icons/io5';
// import { MdOutlineArrowDropUp, MdArrowDropDown } from 'react-icons/md';
// import { FaFacebookF } from 'react-icons/fa6';
// import { FaTwitter } from 'react-icons/fa';
// import { FaGoogle } from 'react-icons/fa';

// const Sidebar = () => {
//   const [dropdowns, setDropdowns] = useState({});
//   const location = useLocation();

//   const toggleDropdown = (menu) => {
//     setDropdowns((prevDropdowns) => ({
//       ...prevDropdowns,
//       [menu]: !prevDropdowns[menu],
//     }));
//   };

//   return (
//     <div className="sidebar">
//       <div className="sidebar-logo">
//         <img
//           src={Logo}
//           alt="Company"
//           style={{ width: '48px', height: '48px' }}
//         />
//         <h1 className="logo-text">SWIFDROP</h1>
//       </div>
//       <div className="sidebar-content">
//         <ul className="nav">
//           <li
//             className={`nav-item ${
//               location.pathname === '/MainDashboard' ? 'active' : ''
//             }`}
//           >
//             <Link to="/MainDashboard" className="nav-link">
//               <RxDashboard className="nav-icon" />
//               <span>Dashboard</span>
//             </Link>
//           </li>
//           <li
//             className={`nav-item ${
//               location.pathname === '/profile' ? 'active' : ''
//             }`}
//           >
//             <Link to="/profile" className="nav-link">
//               <RiProfileFill className="nav-icon" />
//               <span>Profile</span>
//             </Link>
//           </li>
//           <li
//             className={`nav-item ${
//               location.pathname === '/User' ? 'active' : ''
//             }`}
//           >
//             <div
//               className="nav-link-wrapper"
//               onClick={() => toggleDropdown('user')}
//             >
//               <CgProfile className="nav-icon" />
//               <span className="nav-link" style={{ marginLeft: '10px' }}>
//                 User
//               </span>
//               {dropdowns.user ? (
//                 <MdOutlineArrowDropUp className="nav-arrow" size={20} />
//               ) : (
//                 <MdArrowDropDown className="nav-arrow" size={20} />
//               )}
//             </div>
//             {dropdowns.user && (
//               <ul className="dropdown-menu">
//                 <li
//                   className="dropdown-item"
//                   onClick={() => setDropdowns({ ...dropdowns, user: false })}
//                 >
//                   <Link to="/User/Profile">Profile</Link>
//                 </li>
//                 <li
//                   className="dropdown-item"
//                   onClick={() => setDropdowns({ ...dropdowns, user: false })}
//                 >
//                   <Link to="/User/Settings">Settings</Link>
//                 </li>
//               </ul>
//             )}
//           </li>
//           <li
//             className={`nav-item ${
//               location.pathname === '/Food' ? 'active' : ''
//             }`}
//           >
//             <div
//               className="nav-link-wrapper"
//               onClick={() => toggleDropdown('food')}
//             >
//               <GiFoodTruck className="nav-icon" />
//               <span className="nav-link" style={{ marginLeft: '10px' }}>
//                 Food Sellers
//               </span>
//               {dropdowns.food ? (
//                 <MdOutlineArrowDropUp className="nav-arrow" size={20} />
//               ) : (
//                 <MdArrowDropDown className="nav-arrow" size={20} />
//               )}
//             </div>
//             {dropdowns.food && (
//               <ul className="dropdown-menu">
//                 <li
//                   className="dropdown-item"
//                   onClick={() => setDropdowns({ ...dropdowns, food: false })}
//                 >
//                   <Link to="/User/Profile">Profile</Link>
//                 </li>
//                 <li
//                   className="dropdown-item"
//                   onClick={() => setDropdowns({ ...dropdowns, food: false })}
//                 >
//                   <Link to="/User/Settings">Settings</Link>
//                 </li>
//               </ul>
//             )}
//           </li>
//           <li
//             className={`nav-item ${
//               location.pathname === '/Driver' ? 'active' : ''
//             }`}
//           >
//             <div
//               className="nav-link-wrapper"
//               onClick={() => toggleDropdown('driver')}
//             >
//               <FaMotorcycle className="nav-icon" />
//               <span className="nav-link" style={{ marginLeft: '10px' }}>
//                 Drivers
//               </span>
//               {dropdowns.driver ? (
//                 <MdOutlineArrowDropUp className="nav-arrow" size={20} />
//               ) : (
//                 <MdArrowDropDown className="nav-arrow" size={20} />
//               )}
//             </div>
//             {dropdowns.driver && (
//               <ul className="dropdown-menu">
//                 <li
//                   className="dropdown-item"
//                   onClick={() => setDropdowns({ ...dropdowns, driver: false })}
//                 >
//                   <Link to="/User/Profile">Profile</Link>
//                 </li>
//                 <li
//                   className="dropdown-item"
//                   onClick={() => setDropdowns({ ...dropdowns, driver: false })}
//                 >
//                   <Link to="/User/Settings">Settings</Link>
//                 </li>
//               </ul>
//             )}
//           </li>
//           <li
//             className={`nav-item ${
//               location.pathname === '/Order' ? 'active' : ''
//             }`}
//           >
//             <Link to="/Order" className="nav-link">
//               <MdWorkHistory className="nav-icon" />
//               <span>Order History</span>
//             </Link>
//           </li>
//           <li
//             className={`nav-item ${
//               location.pathname === '/Faq' ? 'active' : ''
//             }`}
//           >
//             <Link to="/Faq" className="nav-link">
//               <FaQuestionCircle className="nav-icon" />
//               <span>Faq</span>
//             </Link>
//           </li>
//           <li
//             className={`nav-item ${
//               location.pathname === '/Admin' ? 'active' : ''
//             }`}
//           >
//             <Link to="/Admin" className="nav-link">
//               <IoSettingsSharp className="nav-icon" />
//               <span>General Settings</span>
//             </Link>
//           </li>
//         </ul>
//       </div>
//       <div className="border-lineSide"></div>
//       <div className="footer">
//         <FaFacebookF size={18} />
//         <FaTwitter size={18} />
//         <FaGoogle size={18} />
//       </div>
//       <p className="word">SWIFDROP @ ALL RIGHT RESERVED</p>
//     </div>
//   );
// };

// export default Sidebar;
import React from 'react';
import {
  Box,
  Flex,
  Icon,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Image,
  Text,
  HStack,
  Divider,
  VStack,
} from '@chakra-ui/react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import {
  FiHome,
  FiUser,
  FiUsers,
  FiShoppingCart,
  FiTruck,
  FiClipboard,
  FiHelpCircle,
  FiSettings,
} from 'react-icons/fi';
import { RxDashboard } from 'react-icons/rx';
import { FaFacebookF } from 'react-icons/fa6';
import { FaTwitter, FaGoogle } from 'react-icons/fa';

const Sidebar = () => {
  const location = useLocation();
  const activeLink = location.pathname;

  return (
    <Box
      bg="white"
      color="black"
      p={4}
      w="250px"
      height="100vh"
      position="relative"
      overflowY="auto"
    >
      <HStack pl={'10px'}>
        <Image src="/Logo.svg" />
        <Text fontSize="1.125rem" fontWeight={'600'}>
          Swifdrop
        </Text>
      </HStack>
      <Divider mt={'4'} />
      <Flex direction="column" align="start" mt={'30px'} pl={'10px'}>
        <RouterLink to="/" style={{ textDecoration: 'none' }}>
          <Flex
            alignItems="center"
            mb={4}
            fontWeight={activeLink === '/' ? 'bold' : 'normal'}
            color={activeLink === '/' ? 'white' : 'black'}
            bg={activeLink === '/' ? '#4caf50' : 'transparent'}
            p={2}
            borderRadius="md"
            _hover={{ bg: '#4caf50', color: 'white' }}
          >
            <Icon as={RxDashboard} mr={2} />
            DASHBOARD
          </Flex>
        </RouterLink>
        <RouterLink to="/profile" style={{ textDecoration: 'none' }}>
          <Flex
            alignItems="center"
            mb={4}
            fontWeight={activeLink === '/profile' ? 'bold' : 'normal'}
            color={activeLink === '/profile' ? 'white' : 'black'}
            bg={activeLink === '/profile' ? '#4caf50' : 'transparent'}
            p={2}
            borderRadius="md"
            _hover={{ bg: '#4caf50', color: 'white' }}
          >
            <Icon as={FiUser} mr={2} />
            PROFILE
          </Flex>
        </RouterLink>
        <Accordion defaultIndex={[]} allowMultiple>
          <AccordionItem>
            <RouterLink to="/users" style={{ textDecoration: 'none' }}>
              <AccordionButton
                display="flex"
                alignItems="center"
                mb={2}
                fontWeight={activeLink === '/users' ? 'bold' : 'normal'}
                color={activeLink === '/users' ? 'white' : 'black'}
                bg={activeLink === '/users' ? '#4caf50' : 'transparent'}
                p={2}
                borderRadius="md"
                _hover={{ bg: '#4caf50', color: 'white' }}
              >
                <Icon as={FiUsers} mr={2} />
                USERS
                <AccordionIcon ml="auto" />
              </AccordionButton>
            </RouterLink>
            <AccordionPanel pb={4}>
              <RouterLink to="/users/admin" style={{ textDecoration: 'none' }}>
                <Flex
                  alignItems="center"
                  mb={2}
                  fontWeight={activeLink === '/users/admin' ? 'bold' : 'normal'}
                  color={activeLink === '/users/admin' ? 'white' : 'black'}
                  bg={activeLink === '/users/admin' ? '#4caf50' : 'transparent'}
                  p={2}
                  pl={6}
                  borderRadius="md"
                  _hover={{ bg: '#4caf50', color: 'white' }}
                >
                  - Administrators
                </Flex>
              </RouterLink>
              <RouterLink
                to="/users/allusers"
                style={{ textDecoration: 'none' }}
              >
                <Flex
                  alignItems="center"
                  mb={2}
                  fontWeight={
                    activeLink === '/users/allusers' ? 'bold' : 'normal'
                  }
                  color={activeLink === '/users/allusers' ? 'white' : 'black'}
                  bg={
                    activeLink === '/users/allusers' ? '#4caf50' : 'transparent'
                  }
                  p={2}
                  pl={6}
                  borderRadius="md"
                  _hover={{ bg: '#4caf50', color: 'white' }}
                >
                  - All Users
                </Flex>
              </RouterLink>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <RouterLink to="/foodsellers" style={{ textDecoration: 'none' }}>
              <AccordionButton
                display="flex"
                alignItems="center"
                mb={2}
                fontWeight={activeLink === '/foodsellers' ? 'bold' : 'normal'}
                color={activeLink === '/foodsellers' ? 'white' : 'black'}
                bg={activeLink === '/foodsellers' ? '#4caf50' : 'transparent'}
                p={2}
                borderRadius="md"
                _hover={{ bg: '#4caf50', color: 'white' }}
              >
                <Icon as={FiShoppingCart} mr={2} />
                FOOD SELLERS
                <AccordionIcon ml="auto" />
              </AccordionButton>
            </RouterLink>
            <AccordionPanel pb={4}>
              <RouterLink
                to="/foodsellers/list"
                style={{ textDecoration: 'none' }}
              >
                <Flex
                  alignItems="center"
                  mb={2}
                  fontWeight={
                    activeLink === '/foodsellers/list' ? 'bold' : 'normal'
                  }
                  color={activeLink === '/foodsellers/list' ? 'white' : 'black'}
                  bg={
                    activeLink === '/foodsellers/list'
                      ? '#4caf50'
                      : 'transparent'
                  }
                  p={2}
                  pl={6}
                  borderRadius="md"
                  _hover={{ bg: '#4caf50', color: 'white' }}
                >
                  - List
                </Flex>
              </RouterLink>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <RouterLink to="/drivers" style={{ textDecoration: 'none' }}>
              <AccordionButton
                display="flex"
                alignItems="center"
                mb={2}
                fontWeight={activeLink === '/drivers' ? 'bold' : 'normal'}
                color={activeLink === '/drivers' ? 'white' : 'black'}
                bg={activeLink === '/drivers' ? '#4caf50' : 'transparent'}
                p={2}
                borderRadius="md"
                _hover={{ bg: '#4caf50', color: 'white' }}
              >
                <Icon as={FiTruck} mr={2} />
                DRIVERS
                <AccordionIcon ml="auto" />
              </AccordionButton>
            </RouterLink>
            <AccordionPanel pb={4}>
              <RouterLink
                to="/drivers/settings"
                style={{ textDecoration: 'none' }}
              >
                <Flex
                  alignItems="center"
                  mb={2}
                  fontWeight={
                    activeLink === '/drivers/settings' ? 'bold' : 'normal'
                  }
                  color={activeLink === '/drivers/settings' ? 'white' : 'black'}
                  bg={
                    activeLink === '/drivers/settings'
                      ? '#4caf50'
                      : 'transparent'
                  }
                  p={2}
                  pl={6}
                  borderRadius="md"
                  _hover={{ bg: '#4caf50', color: 'white' }}
                >
                  - Settings
                </Flex>
              </RouterLink>
            </AccordionPanel>
            <AccordionPanel pb={4}>
              <RouterLink to="/drivers/list" style={{ textDecoration: 'none' }}>
                <Flex
                  alignItems="center"
                  mb={2}
                  fontWeight={
                    activeLink === '/drivers/list' ? 'bold' : 'normal'
                  }
                  color={activeLink === '/drivers/list' ? 'white' : 'black'}
                  bg={
                    activeLink === '/drivers/list' ? '#4caf50' : 'transparent'
                  }
                  p={2}
                  pl={6}
                  borderRadius="md"
                  _hover={{ bg: '#4caf50', color: 'white' }}
                >
                  - List of Driver
                </Flex>
              </RouterLink>
            </AccordionPanel>
            <AccordionPanel pb={4}>
              <RouterLink
                to="/drivers/oweamount"
                style={{ textDecoration: 'none' }}
              >
                <Flex
                  alignItems="center"
                  mb={2}
                  fontWeight={
                    activeLink === '/drivers/oweamount' ? 'bold' : 'normal'
                  }
                  color={
                    activeLink === '/drivers/oweamount' ? 'white' : 'black'
                  }
                  bg={
                    activeLink === '/drivers/oweamount'
                      ? '#4caf50'
                      : 'transparent'
                  }
                  p={2}
                  pl={6}
                  borderRadius="md"
                  _hover={{ bg: '#4caf50', color: 'white' }}
                >
                  - Owe Amount
                </Flex>
              </RouterLink>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
        <RouterLink to="/ordersHistory" style={{ textDecoration: 'none' }}>
          <Flex
            alignItems="center"
            mb={4}
            fontWeight={activeLink === '/ordersHistory' ? 'bold' : 'normal'}
            color={activeLink === '/ordersHistory' ? 'white' : 'black'}
            bg={activeLink === '/ordersHistory' ? '#4caf50' : 'transparent'}
            p={2}
            borderRadius="md"
            _hover={{ bg: '#4caf50', color: 'white' }}
          >
            <Icon as={FiClipboard} mr={2} />
            ORDER HISTORY
          </Flex>
        </RouterLink>
        <RouterLink to="/faq" style={{ textDecoration: 'none' }}>
          <Flex
            alignItems="center"
            mb={4}
            fontWeight={activeLink === '/faq' ? 'bold' : 'normal'}
            color={activeLink === '/faq' ? 'white' : 'black'}
            bg={activeLink === '/faq' ? '#4caf50' : 'transparent'}
            p={2}
            borderRadius="md"
            _hover={{ bg: '#4caf50', color: 'white' }}
          >
            <Icon as={FiHelpCircle} mr={2} />
            FAQ
          </Flex>
        </RouterLink>
        <RouterLink to="/settings" style={{ textDecoration: 'none' }}>
          <Flex
            alignItems="center"
            mb={4}
            fontWeight={activeLink === '/settings' ? 'bold' : 'normal'}
            color={activeLink === '/settings' ? 'white' : 'black'}
            bg={activeLink === '/settings' ? '#4caf50' : 'transparent'}
            p={2}
            borderRadius="md"
            _hover={{ bg: '#4caf50', color: 'white' }}
          >
            <Icon as={FiSettings} mr={2} />
            GENERAL SETTINGS
          </Flex>
        </RouterLink>
      </Flex>
      <Divider mt={'20'} />
      <VStack>
        <HStack mt={'10'} spacing={5}>
          <FaFacebookF size={18} />
          <FaTwitter size={18} />
          <FaGoogle size={18} />
        </HStack>
        <Text fontSize={'10px'}>SWIFDROP @ ALL RIGHT RESERVED</Text>
      </VStack>
    </Box>
  );
};

export default Sidebar;
