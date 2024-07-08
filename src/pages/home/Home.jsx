import React, { useEffect } from 'react';
import { HStack, VStack, Flex, Box, Text, Divider } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import RestaurantMap from './GoogleMap';
import GoogleBar from '../home/GoogleBar';

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const adminId = localStorage.getItem('adminId');
    if (!adminId) {
      navigate('/Login');
    }
  }, [navigate]);

  return (
    <Box>
      <Text>Dashboard</Text>
      <Flex mt="4">
        <Box bg="#ffffff" p="3">
          <Text>
            250 Official stores in 21 countries, choose city to see location
            details.
          </Text>
          <Divider mb="5" mt="3" />
          <RestaurantMap />
        </Box>
        <GoogleBar />
      </Flex>
    </Box>
  );
};

export default Home;
