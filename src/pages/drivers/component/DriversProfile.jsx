import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { Routes, Route } from 'react-router-dom';
import DriverProfileSidebar from './DriversProfileSidebar';
import PersonalInformation from './PersonalInformation';
// import other components

const DriversProfile = () => {
  return (
    <Flex>
      <Box flex="0 0 auto">
        <DriverProfileSidebar />
      </Box>
      <Box flex="1" p={4}>
        <Routes>
          <Route path="personal" element={<PersonalInformation />} />
          {/* Uncomment and add other routes */}
          {/* <Route path="change-password" element={<ChangePassword />} />
          <Route path="company-info" element={<CompanyInformation />} />
          <Route path="license" element={<DriverLicense />} />
          <Route path="vehicle" element={<RegisteredVehicle />} />
          <Route path="schedule" element={<Schedule />} />
          <Route path="payment-method" element={<PaymentMethod />} />
          <Route path="payout-management" element={<PayoutManagement />} />
          <Route path="delivery" element={<Delivery />} />
          <Route path="request-history" element={<RequestHistory />} /> */}
        </Routes>
      </Box>
    </Flex>
  );
};

export default DriversProfile;
