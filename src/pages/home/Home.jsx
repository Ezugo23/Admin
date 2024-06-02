import React from 'react';
import { HStack, VStack } from '@chakra-ui/react';
import RestaurantMap from './GoogleMap';

const Home = () => {
  return (
    <HStack>
      <RestaurantMap />
    </HStack>
  );
};

export default Home;
