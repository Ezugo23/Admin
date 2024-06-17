import React from 'react';
import {
  Avatar,
  Box,
  Divider,
  Flex,
  IconButton,
  Link,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import {
  FaEllipsisV,
  FaUser,
  FaLock,
  FaBuilding,
  FaIdCard,
  FaCar,
  FaCalendar,
  FaMoneyCheckAlt,
  FaCreditCard,
  FaHistory,
  FaTruck,
} from 'react-icons/fa';

const SidebarLink = ({ to, icon, children }) => {
  const { pathname } = useLocation();
  const isActive = pathname === `/driversprofile/${to}`;
  const activeLinkStyles = {
    bg: '#40C4FF',
    color: 'white',
    fontWeight: 'bold',
  };

  return (
    <Link
      as={RouterLink}
      to={`/driversprofile/${to}`}
      display="flex"
      alignItems="center"
      p="2"
      borderRadius="md"
      _hover={{
        textDecoration: 'none',
        ...activeLinkStyles,
      }}
      sx={isActive ? activeLinkStyles : {}}
    >
      {icon}
      <Box ml="3">{children}</Box>
    </Link>
  );
};
const DriverProfileSidebar = () => {
  return (
    <Box
      as="nav"
      pos="relative"
      minW={'100'}
      h="full"
      bg={useColorModeValue('white', 'gray.900')}
      boxShadow="md"
      p="5"
    >
      <Flex alignItems="center" justifyContent="space-between" mb="6">
        <Flex alignItems="center">
          <Avatar name="Driver Name" src="/path/to/avatar.jpg" />
          <Box ml="3">
            <Box fontWeight="bold">Driver Name</Box>
            <Box fontSize="sm" color="gray.500">
              Driver Role
            </Box>
          </Box>
        </Flex>
        <IconButton
          aria-label="Options"
          icon={<FaEllipsisV />}
          variant="ghost"
        />
      </Flex>
      <Divider mb="6" />
      <VStack spacing="1" align="stretch">
        <SidebarLink to="personal" icon={<FaUser />}>
          Personal Information
        </SidebarLink>
        <SidebarLink to="change-password" icon={<FaLock />}>
          Change Password
        </SidebarLink>
        <SidebarLink to="company-info" icon={<FaBuilding />}>
          Company Information
        </SidebarLink>
        <SidebarLink to="license" icon={<FaIdCard />}>
          Driver License
        </SidebarLink>
        <SidebarLink to="vehicle" icon={<FaCar />}>
          Registered Vehicle
        </SidebarLink>
        <SidebarLink to="schedule" icon={<FaCalendar />}>
          Schedule
        </SidebarLink>
        <SidebarLink to="payment-method" icon={<FaMoneyCheckAlt />}>
          Payment Method
        </SidebarLink>
        <SidebarLink to="payout-management" icon={<FaCreditCard />}>
          Payout Management
        </SidebarLink>
        <SidebarLink to="delivery" icon={<FaTruck />}>
          Delivery
        </SidebarLink>
        <SidebarLink to="request-history" icon={<FaHistory />}>
          Request History
        </SidebarLink>
      </VStack>
    </Box>
  );
};

export default DriverProfileSidebar;
