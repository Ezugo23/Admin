import React, { useState, useEffect } from 'react';
import {
  Box,
  HStack,
  Image,
  VStack,
  Text,
  Flex,
  Button,
} from '@chakra-ui/react';
import { AiOutlineUp, AiOutlineDown } from 'react-icons/ai';

const GoogleBar = () => {
  const [totalItems, setTotalItems] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalRestaurants, setTotalRestaurants] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalDrivers, setTotalDrivers] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [itemsRes, ordersRes, restaurantsRes, usersRes, driversRes] =
          await Promise.all([
            fetch('https://swifdropp.onrender.com/api/v1/restaurant/sumFoods'),
            fetch('https://swifdropp.onrender.com/api/v1/orders/sumOrders/sum'),
            fetch('https://swifdropp.onrender.com/api/v1/restaurant'),
            fetch('https://swifdropp.onrender.com/api/v1/user/sumallusers'),
            fetch('https://swifdropp.onrender.com/api/v1/driver/'),
          ]);

        const itemsData = await itemsRes.json();
        const ordersData = await ordersRes.json();
        const restaurantsData = await restaurantsRes.json();
        const usersData = await usersRes.json();
        const driversData = await driversRes.json();

        setTotalItems(itemsData.total_foods || 0);
        setTotalOrders(ordersData.total_orders || 0);
        setTotalRestaurants(restaurantsData.restaurants?.length || 0);
        setTotalUsers(usersData.total_users || 0);
        setTotalDrivers(driversData.drivers?.length || 0);
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
      label: 'Total Items',
      percentage: 33,
      icon: AiOutlineUp,
      bgColor: '#3B5998',
    },
    {
      id: 2,
      imageUrl: '/orders.png',
      vectorUrl: '/ordersvector.png',
      total: totalOrders,
      label: 'Total Orders',
      percentage: 2,
      icon: AiOutlineDown,
      bgColor: '#FF5252',
    },
    {
      id: 3,
      imageUrl: '/cart.png',
      vectorUrl: '/restaurantvector.png',
      total: totalRestaurants,
      label: 'Restaurants',
      percentage: 12,
      icon: AiOutlineUp,
      bgColor: '#4DB6AC',
    },
    {
      id: 4,
      imageUrl: '/users.png',
      vectorUrl: '/usersvector.png',
      total: totalUsers,
      label: 'Total Users',
      percentage: 21,
      icon: AiOutlineUp,
      bgColor: '#40C4FF',
    },
    {
      id: 5,
      imageUrl: '/drivers.png',
      vectorUrl: '/driversvector.png',
      total: totalDrivers,
      label: 'Total Drivers',
      percentage: 4,
      icon: AiOutlineDown,
      bgColor: '#FF5252',
    },
  ];

  return (
    <VStack spacing={4} ml={'7'}>
      {barData.map((bar) => (
        <HStack
          key={bar.id}
          justifyContent="space-between"
          minW="280px"
          minH={'140px'}
          p={3}
          bg="white"
          borderRadius="md"
          boxShadow="md"
          _hover={{ boxShadow: 'lg' }}
        >
          <Box>
            <Image src={bar.imageUrl} alt={`Icon ${bar.id}`} mb={'7'} />
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
              transition="all 0.3s"
            >
              <Text fontWeight="bold" fontSize="md">
                {bar.percentage}%
              </Text>
              <bar.icon size={24} style={{ marginRight: '8px' }} />
            </HStack>
            <Image
              src={bar.vectorUrl}
              alt={`Vector ${bar.id}`}
              mt={'5'}
              //   boxSize="50px"
            />
          </Box>
        </HStack>
      ))}
      <Button
        bg={'#3b5998'}
        color={'white'}
        minW={'280px'}
        _hover={{ bg: '#4c70ba' }}
      >
        VIEW ALL
      </Button>
    </VStack>
  );
};

export default GoogleBar;
