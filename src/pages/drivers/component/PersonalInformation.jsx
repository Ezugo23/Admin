import React, { useState, useEffect } from 'react';
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
import { FaUser } from 'react-icons/fa';
import axios from 'axios';

const PersonalInformation = ({ driverId, driverData }) => {
  const [formData, setFormData] = useState(driverData);
  const [initialFormData, setInitialFormData] = useState(null);
  const [file, setFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFormChanged, setIsFormChanged] = useState(false);
  const toast = useToast();
  const fileInputRef = React.useRef(null);

  useEffect(() => {
    if (driverData) {
      const initialData = {
        ...driverData,
        feePercentage: (driverData.feePercentage * 100).toFixed(0),
      };
      setInitialFormData(initialData);
      setFormData(initialData);
    }
  }, [driverData]);

  const hasFormChanged = (currentData, initialData) => {
    const normalizedCurrentData = {
      ...currentData,
      feePercentage: parseFloat(currentData.feePercentage),
    };

    const normalizedInitialData = {
      ...initialData,
      feePercentage: parseFloat(initialData.feePercentage),
    };

    for (const key in normalizedCurrentData) {
      if (normalizedCurrentData[key] !== normalizedInitialData[key]) {
        if (key === 'feePercentage') {
          // Handle the case where the user deleted the input for feePercentage
          if (
            isNaN(normalizedCurrentData[key]) &&
            !isNaN(normalizedInitialData[key])
          ) {
            return true;
          }
        } else {
          return true;
        }
      }
    }

    return false;
  };

  const handleUpdateDriverData = async () => {
    setIsLoading(true);
    try {
      const formDataToSend = new FormData();

      if (file) {
        formDataToSend.append('image', file);
      } else if (formData.image) {
        formDataToSend.append('image', formData.image);
      }

      const updatedFormData = {
        ...formData,
        feePercentage: formData.feePercentage / 100,
      };

      Object.entries(updatedFormData).forEach(([key, value]) => {
        if (key !== 'image') {
          formDataToSend.append(key, value);
        }
      });

      const response = await axios.patch(
        `https://swifdropp.onrender.com/api/v1/driver/${driverId}`,
        formDataToSend,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      const responseData = {
        ...response.data.driver,
        feePercentage: (response.data.driver.feePercentage * 100).toFixed(0),
      };
      setFormData(responseData);
      setInitialFormData(responseData);
      toast({
        title: 'Success',
        description: 'Driver data updated successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
      setIsFormChanged(false);
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
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = {
      ...formData,
      [name]: name === 'NIN' ? value.toUpperCase() : value,
    };
    setFormData(updatedFormData);
    setIsFormChanged(hasFormChanged(updatedFormData, initialFormData));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const updatedFormData = { ...formData, image: URL.createObjectURL(file) };
    setFile(file);
    setPreviewImage(updatedFormData.image);
    setFormData(updatedFormData);
    setIsFormChanged(true);
  };

  const handleChangePhoto = () => {
    fileInputRef.current.click();
    setIsFormChanged(true);
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
              {driverData.image || previewImage ? (
                <Image src={previewImage || driverData.image} w={'100%'} />
              ) : (
                <Icon as={FaUser} boxSize="100px" color="gray.400" />
              )}
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
                onClick={() => setPreviewImage(null)}
              />
            </Box>
            <Input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              ref={fileInputRef}
              style={{ display: 'none' }}
            />
            <Button
              bg={'#3B5998'}
              _hover={{
                bg: '#3b5998',
              }}
              color={'white'}
              onClick={handleChangePhoto}
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
            <Select
              border="2px solid #e8e8ff"
              py="15px"
              value={formData.feePercentage}
              name="feePercentage"
              onChange={handleFormChange}
            >
              {[...Array(61)].map((_, i) => (
                <option key={i + 40} value={i + 40}>
                  {i + 40}%
                </option>
              ))}
            </Select>
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
            isLoading={isLoading}
            loadingText="Saving..."
            isDisabled={!isFormChanged}
          >
            Save
          </Button>
        </Stack>
      </Flex>
    </Stack>
  );
};

export default PersonalInformation;
