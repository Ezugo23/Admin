import React, { useEffect, useState } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { Routes, Route, Navigate, useParams } from 'react-router-dom';
import axios from 'axios';
import DriverProfileSidebar from './DriversProfileSidebar';
import PersonalInformation from './PersonalInformation';
import DeliveryHistory from './DeliveryHistory';

const DriversProfile = () => {
  const { driverId } = useParams();
  const [driverData, setDriverData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDriverData = async () => {
      try {
        const response = await axios.get(
          `https://swifdropp.onrender.com/api/v1/driver/${driverId}`
        );
        setDriverData(response.data.driver);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDriverData();
  }, [driverId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Flex>
      <Box flex="0 0 auto">
        <DriverProfileSidebar driverId={driverId} driverData={driverData} />
      </Box>
      <Box flex="1" p={4} overflowX={'auto'}>
        <Routes>
          <Route path="/" element={<Navigate to="personal" />} />
          <Route
            path="personal"
            element={
              <PersonalInformation
                driverId={driverId}
                driverData={driverData}
              />
            }
          />
          <Route
            path="delivery"
            element={
              <DeliveryHistory
                driverId={driverId}
                // driverData={driverData}
              />
            }
          />
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
