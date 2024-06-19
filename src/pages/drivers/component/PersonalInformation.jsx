import React, { useState } from 'react';
import {
  HStack,
  VStack,
  Input,
  Text,
  FormControl,
  FormLabel,
  Divider,
  Button,
  Stack,
  Image,
  Box,
  Flex,
  Icon,
  IconButton,
  Select,
  Skeleton,
  useToast,
} from '@chakra-ui/react';
import { ChevronDownIcon, CloseIcon } from '@chakra-ui/icons';
import axios from 'axios';

const PersonalInformation = ({ driverId, driverData }) => {
  const [formData, setFormData] = useState(driverData);
  const [error, setError] = useState(null);
  const toast = useToast();

  const handleUpdateDriverData = async () => {
    try {
      const response = await axios.patch(
        `https://swifdropp.onrender.com/api/v1/driver/${driverId}`,
        formData
      );
      setFormData(response.data.driver);
      toast({
        title: 'Success',
        description: 'Driver data updated successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
    } catch (err) {
      setError(err);
      toast({
        title: 'Error',
        description: err.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'NIN' ? value.toUpperCase() : value,
    });
  };

  if (!driverData) {
    return (
      <Stack>
        <Skeleton height="20px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
      </Stack>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Stack w={'full'}>
      <Text>Drivers' Info</Text>
      <Divider />
      <Flex as={'form'} gap={'7'}>
        <Box w={'30%'}>
          <Text>Upload Image</Text>
          <Stack
            border={'1px solid black'}
            p={'30px'}
            mt={'5px'}
            position="relative"
          >
            <Box position="relative">
              <Image src={driverData.image} w={'100%'} />
              <IconButton
                icon={<CloseIcon />}
                size="sm"
                position="absolute"
                top="-5px"
                right="-5px"
                backgroundColor="red"
                border="1px solid black"
                borderRadius="full"
                _hover={{
                  bg: 'red',
                }}
                onClick={() => console.log('Remove image')}
              />
            </Box>
            <Button
              bg={'#3B5998'}
              _hover={{
                bg: '#3b5998',
              }}
              color={'white'}
            >
              Change Photo
            </Button>
          </Stack>
        </Box>
        <Stack spacing={'4'}>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input
              border="2px solid #e8e8ff"
              py="15px"
              value={`${formData.firstname} ${formData.lastname}`}
              name="name"
              onChange={handleFormChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>E-mail</FormLabel>
            <Input
              border="2px solid #e8e8ff"
              py="15px"
              value={formData.email}
              name="email"
              onChange={handleFormChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Phone Number</FormLabel>
            <Input
              border="2px solid #e8e8ff"
              py="15px"
              value={formData.phoneNumber}
              name="phoneNumber"
              onChange={handleFormChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>NIN</FormLabel>
            <Input
              border="2px solid #e8e8ff"
              py="15px"
              value={formData.NIN}
              name="NIN"
              onChange={handleFormChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Address</FormLabel>
            <Input
              border="2px solid #e8e8ff"
              py="15px"
              px={'5px'}
              name="address"
              onChange={handleFormChange}
            />
          </FormControl>
        </Stack>
        <Stack spacing={'4'}>
          <FormControl>
            <FormLabel>Vehicle type</FormLabel>
            <Select
              placeholder="Select type"
              border="2px solid #e8e8ff"
              name="vehicleType"
              value={formData.vehicleType}
              onChange={handleFormChange}
            >
              <option value="car">Car</option>
              <option value="truck">Truck</option>
              <option value="motorcycle">Motorcycle</option>
              <option value="bicycle">Bicycle</option>
              <option value="bus">Bus</option>
              <option value="van">Van</option>
              <option value="suv">SUV</option>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Vehicle Registration No.</FormLabel>
            <Input
              border="2px solid #e8e8ff"
              py="15px"
              value={formData.vehiclePlateNumber}
              name="vehiclePlateNumber"
              onChange={handleFormChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Percentage</FormLabel>
            <Input
              border="2px solid #e8e8ff"
              py="15px"
              value={formData.feePercentage}
              name="feePercentage"
              onChange={handleFormChange}
            />
          </FormControl>
          <Button
            mt={'7'}
            onClick={handleUpdateDriverData}
            bg={'#4DB6AC'}
            color={'white'}
            py={'25px'}
            _hover={{
              bg: '#4db6ac',
            }}
          >
            Save
          </Button>
        </Stack>
      </Flex>
    </Stack>
  );
};

export default PersonalInformation;
