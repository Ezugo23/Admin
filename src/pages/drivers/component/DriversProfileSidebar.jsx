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
  Image,
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

const SidebarLink = ({ to, icon, driverId, children }) => {
  const { pathname } = useLocation();
  const isActive = pathname === `/driversprofile/${driverId}/${to}`;
  const activeLinkStyles = {
    bg: '#40C4FF',
    color: 'white',
    fontWeight: 'bold',
  };

  return (
    <Link
      as={RouterLink}
      to={`/driversprofile/${driverId}/${to}`}
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

const DriverProfileSidebar = ({ driverId, driverData }) => {
  return (
    <Box
      as="nav"
      pos="relative"
      minW="100"
      maxHh="full"
      bg={useColorModeValue('white', 'gray.900')}
      boxShadow="md"
      borderRadius="lg"
      p="5"
    >
      <Flex alignItems="center" justifyContent="space-between" mb="6">
        <Flex alignItems="center">
          <Avatar src={driverData.image} size="md" />
          <Box ml="3">
            <Box fontWeight="bold">{driverData.firstname} </Box>
            <Box fontSize="bold">{driverData.lastname}</Box>
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
        <SidebarLink to="personal" icon={<FaUser />} driverId={driverId}>
          Personal Information
        </SidebarLink>
        <SidebarLink to="change-password" icon={<FaLock />} driverId={driverId}>
          Change Password
        </SidebarLink>
        {/* <SidebarLink
          to="company-info"
          icon={<FaBuilding />}
          driverId={driverId}
        >
          Company Information
        </SidebarLink> */}
        {/* <SidebarLink to="license" icon={<FaIdCard />} driverId={driverId}>
          Driver License
        </SidebarLink>
        <SidebarLink to="vehicle" icon={<FaCar />} driverId={driverId}>
          Registered Vehicle
        </SidebarLink>
        <SidebarLink to="schedule" icon={<FaCalendar />} driverId={driverId}>
          Schedule
        </SidebarLink> */}
        {/* <SidebarLink
          to="payment-method"
          icon={<FaMoneyCheckAlt />}
          driverId={driverId}
        >
          Payment Method
        </SidebarLink> */}
        <SidebarLink
          to="payout-management"
          icon={<FaCreditCard />}
          driverId={driverId}
        >
          Payout Management
        </SidebarLink>
        <SidebarLink to="delivery" icon={<FaTruck />} driverId={driverId}>
          Delivery Request History
        </SidebarLink>
        {/* <SidebarLink
          to="request-history"
          icon={<FaHistory />}
          driverId={driverId}
        >
          Dispute
        </SidebarLink> */}
      </VStack>
    </Box>
  );
};

export default DriverProfileSidebar;
