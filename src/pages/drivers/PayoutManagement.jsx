import React, { useState, lazy, Suspense } from 'react';
import { Box, Flex, Button, Spinner } from '@chakra-ui/react';

const Received = lazy(() => import('./component/Received'));
const Withdrawal = lazy(() => import('./component/Withdrawal'));

const PayoutManagement = () => {
  const [activeTab, setActiveTab] = useState('received');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <Box width="100%" bg="#ffffff" p="4">
      <Flex mb="4" justifyContent="center">
        <Button
          onClick={() => handleTabClick('received')}
          bg={activeTab === 'received' ? '#45A049' : '#ffffff'}
          color={activeTab === 'received' ? 'white' : '#45A049'}
          px={'125px'}
          mr="2"
          _hover={{ bg: activeTab === 'received' ? '#45A049' : '#ffffff' }}
          border={'2px solid #45A049'}
        >
          Driver Receipients 
        </Button>
        <Button
          onClick={() => handleTabClick('withdrawal')}
          bg={activeTab === 'withdrawal' ? '#45A049' : '#ffffff'}
          color={activeTab === 'withdrawal' ? 'white' : '#45A049'}
          px={'125px'}
          _hover={{ bg: activeTab === 'withdrawal' ? '#45A049' : '#ffffff' }}
          border={'2px solid #45A049'}
        >
          Withdrawal
        </Button>
      </Flex>

      <Suspense fallback={<Spinner />}>
        {activeTab === 'received' && <Received />}
        {activeTab === 'withdrawal' && <Withdrawal />}
      </Suspense>
    </Box>
  );
};

export default PayoutManagement;
