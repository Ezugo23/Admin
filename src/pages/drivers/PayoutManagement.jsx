import React, { useState, lazy, Suspense, useEffect } from 'react';
import { Box, Flex, Button, Spinner } from '@chakra-ui/react';
import { usePayoutContext } from '../../contexts/PayoutContext';

const Received = lazy(() => import('./component/Received'));
const Withdrawal = lazy(() => import('./component/Withdrawal'));

const PayoutManagement = ({ driverId }) => {
  const [activeTab, setActiveTab] = useState('received');
  const { setCurrentDriverId } = usePayoutContext();

  useEffect(() => {
    setCurrentDriverId(driverId);
  }, [driverId]);
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
        {activeTab === 'received' && <Received driverId={driverId} />}
        {activeTab === 'withdrawal' && <Withdrawal driverId={driverId} />}
      </Suspense>
    </Box>
  );
};

export default PayoutManagement;
