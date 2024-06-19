import React, { useState } from 'react';
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
  FiDollarSign,
  FiTrendingUp,
} from 'react-icons/fi';
import { RxDashboard } from 'react-icons/rx';
import { FaFacebookF } from 'react-icons/fa6';
import { FaTwitter, FaGoogle } from 'react-icons/fa';

const Sidebar = () => {
  const location = useLocation();
  const activeLink = location.pathname;

  // State to manage the dropdowns
  const [isUsersExpanded, setIsUsersExpanded] = useState(false);
  const [isSellersExpanded, setIsSellersExpanded] = useState(false);
  const [isDriversExpanded, setIsDriversExpanded] = useState(false);
  const [isTransactionsExpanded, setIsTransactionsExpanded] = useState(false);

  const handleUsersToggle = () => setIsUsersExpanded(!isUsersExpanded);
  const handleSellersToggle = () => setIsSellersExpanded(!isSellersExpanded);
  const handleDriversToggle = () => setIsDriversExpanded(!isDriversExpanded);
  const handleTransactionsToggle = () => setIsTransactionsExpanded(!isTransactionsExpanded);

  return (
    <Box
      bg="white"
      color="black"
      p={4}
      minW="250px"
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
        <RouterLink to="/Dashboard" style={{ textDecoration: 'none' }}>
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
        <RouterLink to="/profile/user" style={{ textDecoration: 'none' }}>
          <Flex
            alignItems="center"
            mb={4}
            fontWeight={activeLink === '/profile/user' ? 'bold' : 'normal'}
            color={activeLink === '/profile/user' ? 'white' : 'black'}
            bg={activeLink === '/profile/user' ? '#4caf50' : 'transparent'}
            p={2}
            borderRadius="md"
            _hover={{ bg: '#4caf50', color: 'white' }}
          >
            <Icon as={FiUser} mr={2} />
            PROFILE
          </Flex>
        </RouterLink>
        <Accordion allowMultiple>
          <AccordionItem isExpanded={isUsersExpanded}>
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
              onClick={handleUsersToggle}
            >
              <Icon as={FiUsers} mr={2} />
              USERS
              <AccordionIcon ml="auto" transform={isUsersExpanded ? 'rotate(180deg)' : 'rotate(0deg)'} />
            </AccordionButton>
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
              <RouterLink to="/users/allusers" style={{ textDecoration: 'none' }}>
                <Flex
                  alignItems="center"
                  mb={2}
                  fontWeight={activeLink === '/users/allusers' ? 'bold' : 'normal'}
                  color={activeLink === '/users/allusers' ? 'white' : 'black'}
                  bg={activeLink === '/users/allusers' ? '#4caf50' : 'transparent'}
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
          <AccordionItem isExpanded={isSellersExpanded}>
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
              onClick={handleSellersToggle}
            >
              <Icon as={FiShoppingCart} mr={2} />
              FOOD SELLERS
              <AccordionIcon ml="auto" transform={isSellersExpanded ? 'rotate(180deg)' : 'rotate(0deg)'} />
            </AccordionButton>
            <AccordionPanel pb={4}>
              <RouterLink to="/foodsellers/" style={{ textDecoration: 'none' }}>
                <Flex
                  alignItems="center"
                  mb={2}
                  fontWeight={activeLink === '/foodsellers/' ? 'bold' : 'normal'}
                  color={activeLink === '/foodsellers/' ? 'white' : 'black'}
                  bg={activeLink === '/foodsellers/' ? '#4caf50' : 'transparent'}
                  p={2}
                  pl={6}
                  borderRadius="md"
                  _hover={{ bg: '#4caf50', color: 'white' }}
                >
                  - List
                </Flex>
              </RouterLink>
              <RouterLink to="/foodsellers/oweamount" style={{ textDecoration: 'none' }}>
                <Flex
                  alignItems="center"
                  mb={2}
                  fontWeight={activeLink === '/foodsellers/oweamount' ? 'bold' : 'normal'}
                  color={activeLink === '/foodsellers/oweamount' ? 'white' : 'black'}
                  bg={activeLink === '/foodsellers/oweamount' ? '#4caf50' : 'transparent'}
                  p={2}
                  pl={6}
                  borderRadius="md"
                  _hover={{ bg: '#4caf50', color: 'white' }}
                >
                  - Owe Amount
                </Flex>
              </RouterLink>
              <RouterLink to="/foodsellers/swiftamount" style={{ textDecoration: 'none' }}>
                <Flex
                  alignItems="center"
                  mb={2}
                  fontWeight={activeLink === '/foodsellers/swiftamount' ? 'bold' : 'normal'}
                  color={activeLink === '/foodsellers/swiftamount' ? 'white' : 'black'}
                  bg={activeLink === '/foodsellers/swiftamount' ? '#4caf50' : 'transparent'}
                  p={2}
                  pl={6}
                  borderRadius="md"
                  _hover={{ bg: '#4caf50', color: 'white' }}
                >
                  - Swift Amount
                </Flex>
              </RouterLink>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem isExpanded={isDriversExpanded}>
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
              onClick={handleDriversToggle}
            >
              <Icon as={FiTruck} mr={2} />
              DRIVERS
              <AccordionIcon ml="auto" transform={isDriversExpanded ? 'rotate(180deg)' : 'rotate(0deg)'} />
            </AccordionButton>
            <AccordionPanel pb={4}>
              <RouterLink to="/drivers/settings" style={{ textDecoration: 'none' }}>
                <Flex
                  alignItems="center"
                  mb={2}
                  fontWeight={activeLink === '/drivers/settings' ? 'bold' : 'normal'}
                  color={activeLink === '/drivers/settings' ? 'white' : 'black'}
                  bg={activeLink === '/drivers/settings' ? '#4caf50' : 'transparent'}
                  p={2}
                  pl={6}
                  borderRadius="md"
                  _hover={{ bg: '#4caf50', color: 'white' }}
                >
                  - Settings
                </Flex>
              </RouterLink>
              <RouterLink to="/drivers/list" style={{ textDecoration: 'none' }}>
                <Flex
                  alignItems="center"
                  mb={2}
                  fontWeight={activeLink === '/drivers/list' ? 'bold' : 'normal'}
                  color={activeLink === '/drivers/list' ? 'white' : 'black'}
                  bg={activeLink === '/drivers/list' ? '#4caf50' : 'transparent'}
                  p={2}
                  pl={6}
                  borderRadius="md"
                  _hover={{ bg: '#4caf50', color: 'white' }}
                >
                  - List of Driver
                </Flex>
              </RouterLink>
              <RouterLink to="/drivers/oweamount" style={{ textDecoration: 'none' }}>
                <Flex
                  alignItems="center"
                  mb={2}
                  fontWeight={activeLink === '/drivers/oweamount' ? 'bold' : 'normal'}
                  color={activeLink === '/drivers/oweamount' ? 'white' : 'black'}
                  bg={activeLink === '/drivers/oweamount' ? '#4caf50' : 'transparent'}
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
          <AccordionItem isExpanded={isTransactionsExpanded}>
            <AccordionButton
              display="flex"
              alignItems="center"
              mb={2}
              fontWeight={activeLink === '/daily-transaction' ? 'bold' : 'normal'}
              color={activeLink === '/daily-transaction' ? 'white' : 'black'}
              bg={activeLink === '/daily-transaction' ? '#4caf50' : 'transparent'}
              p={2}
              borderRadius="md"
              _hover={{ bg: '#4caf50', color: 'white' }}
              onClick={handleTransactionsToggle}
            >
              <Icon as={FiDollarSign} mr={2} />
              DAILY TRANSACTION
              <AccordionIcon ml="auto" transform={isTransactionsExpanded ? 'rotate(180deg)' : 'rotate(0deg)'} />
            </AccordionButton>
            <AccordionPanel pb={4}>
              <RouterLink to="/daily-transaction/restaurant" style={{ textDecoration: 'none' }}>
                <Flex
                  alignItems="center"
                  mb={2}
                  fontWeight={activeLink === '/daily-transaction/restaurant' ? 'bold' : 'normal'}
                  color={activeLink === '/daily-transaction/restaurant' ? 'white' : 'black'}
                  bg={activeLink === '/daily-transaction/restaurant' ? '#4caf50' : 'transparent'}
                  p={2}
                  pl={6}
                  borderRadius="md"
                  _hover={{ bg: '#4caf50', color: 'white' }}
                >
                  - Restaurant Transaction
                </Flex>
              </RouterLink>
              <RouterLink to="/daily-transaction/driver" style={{ textDecoration: 'none' }}>
                <Flex
                  alignItems="center"
                  mb={2}
                  fontWeight={activeLink === '/daily-transaction/driver' ? 'bold' : 'normal'}
                  color={activeLink === '/daily-transaction/driver' ? 'white' : 'black'}
                  bg={activeLink === '/daily-transaction/driver' ? '#4caf50' : 'transparent'}
                  p={2}
                  pl={6}
                  borderRadius="md"
                  _hover={{ bg: '#4caf50', color: 'white' }}
                >
                  - Drivers Transaction
                </Flex>
              </RouterLink>
              <RouterLink to="/daily-transaction/total" style={{ textDecoration: 'none' }}>
                <Flex
                  alignItems="center"
                  mb={2}
                  fontWeight={activeLink === '/daily-transaction/total' ? 'bold' : 'normal'}
                  color={activeLink === '/daily-transaction/total' ? 'white' : 'black'}
                  bg={activeLink === '/daily-transaction/total' ? '#4caf50' : 'transparent'}
                  p={2}
                  pl={6}
                  borderRadius="md"
                  _hover={{ bg: '#4caf50', color: 'white' }}
                >
                  - Total Daily Transaction
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
