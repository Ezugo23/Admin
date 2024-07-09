import React, { useState, useEffect } from 'react';
import { Box, HStack, Image, VStack, Text } from '@chakra-ui/react';
// import { AiOutlineUp, AiOutlineDown } from 'react-icons/ai';

const GoogleBar = () => {
  const [totalItems, setTotalItems] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalRestaurants, setTotalRestaurants] = useState(0);
  const [totalAvailableRestaurants, setTotalAvailableRestaurants] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalDrivers, setTotalDrivers] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [itemsRes, ordersRes, restaurantsRes, availableRes, usersRes, driversRes] =
          await Promise.all([
            fetch('https://delivery-chimelu-new.onrender.com/api/v1/restaurant/sumFoods'),
            fetch('https://delivery-chimelu-new.onrender.com/api/v1/orders/sumOrders/sum'),
            fetch('https://delivery-chimelu-new.onrender.com/api/v1/restaurant'),
            fetch('https://delivery-chimelu-new.onrender.com/api/v1/restaurant/sumRestaurants'),
            fetch('https://delivery-chimelu-new.onrender.com/api/v1/user/sumallusers'),
            fetch('https://delivery-chimelu-new.onrender.com/api/v1/driver/sum/sumDrivers'),
          ]);

        const itemsData = await itemsRes.json();
        const ordersData = await ordersRes.json();
        const restaurantsData = await restaurantsRes.json();
        const availableResData = await availableRes.json();
        const usersData = await usersRes.json();
        const driversData = await driversRes.json();
     

        setTotalItems(itemsData.sumAvailableFoods || 0);
        setTotalOrders(ordersData.total_orders || 0);
        setTotalAvailableRestaurants(availableResData.sumApprovedRestaurants  || 0);
        setTotalUsers(usersData.sumVerifiedUsers || 0);
        setTotalDrivers(driversData.sumApproveddrivers|| 0);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const barData = [
    {
      id: 1,
      imageUrl: '/cart.png',
      vectorUrl: '/cartvector.png',
      total: totalItems,
      label: 'Total Items Available',
      percentage: 33,
      // icon: AiOutlineUp,
      bgColor: '#3B5998',
    },
    {
      id: 2,
      imageUrl: '/orders.png',
      // vectorUrl: '/ordersvector.png',
      total: totalOrders,
      label: 'Total Orders',

      // icon: AiOutlineDown,
      bgColor: '#FF5252',
    },
    {
      id: 3,
      imageUrl: '/cart.png',
      vectorUrl: '/restaurantvector.png',
      total: totalAvailableRestaurants,
      label: 'Available Restaurants',
      percentage: 12,
      // icon: AiOutlineUp,
      bgColor: '#4DB6AC',
    },
    {
      id: 4,
      imageUrl: '/users.png',
      vectorUrl: '/usersvector.png',
      total: totalUsers,
      label: 'Total Users',
      percentage: 21,
      // icon: AiOutlineUp,
      bgColor: '#40C4FF',
    },
    {
      id: 5,
      imageUrl: '/drivers.png',
      vectorUrl: '/driversvector.png',
      total: totalDrivers,
      label: 'Total Riders Available',
      percentage: 4,
      // icon: AiOutlineDown,
      bgColor: '#FF5252',
    },
  ];

  return (
    <VStack spacing={12} mx={2}>
      {barData.map((bar) => (
        <HStack
          key={bar.id}
          justifyContent="space-between"
          minW="200px"
          minH={'120px'}
          bg="white"
          p={4}
          borderRadius="md"
          boxShadow="md"
          _hover={{ boxShadow: 'lg' }}
        >
          <Box>
            <Image src={bar.imageUrl} alt={`Icon ${bar.id}`} mb={'5'} />
            <Box>
              <Text fontWeight="bold">{bar.total.toLocaleString()}</Text>
              <Text fontSize="sm" color="gray.600">
                {bar.label}
              </Text>
            </Box>
          </Box>
          <Box>
            <HStack
              alignItems="center"
              justifyContent="center"
              justify={'space-between'}
              bg={bar.bgColor}
              color="white"
              spacing={'3'}
              //   px={3}
              py={2}
              borderRadius="full"
              boxShadow="md"
              minW="20px"
              transition="all 0.7s"
            >
              {/* <Text fontWeight="bold" fontSize="md">
                {bar.percentage}%
              </Text> */}
              {bar.icon && (
                <bar.icon size={24} style={{ marginRight: '8px' }} />
              )}
            </HStack>
            {/* <Image
              src={bar.vectorUrl}
              alt={`Vector ${bar.id}`}
              mt={'5'}
              //   boxSize="50px"
            /> */}
          </Box>
        </HStack>
      ))}
    </VStack>
  );
};

export default GoogleBar;
