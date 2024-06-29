import React, { useState, useEffect } from 'react';
import {
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
import { CloseIcon } from '@chakra-ui/icons';
import { FaUser } from 'react-icons/fa';

const foodGroup = ({ driverData }) => {
  const [formData, setFormData] = useState(driverData);
  const [previewImage, setPreviewImage] = useState(null);
  const [isFormChanged, setIsFormChanged] = useState(false);
  const fileInputRef = React.useRef(null);

  useEffect(() => {
    if (driverData) {
      const initialData = {
        ...driverData,
        feePercentage: (driverData.feePercentage * 100).toFixed(0),
      };
      setFormData(initialData);
    }
  }, [driverData]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = {
      ...formData,
      [name]: name === 'NIN' ? value.toUpperCase() : value,
    };
    setFormData(updatedFormData);
    setIsFormChanged(true);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const updatedFormData = { ...formData, image: URL.createObjectURL(file) };
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

  return (
    <Stack
      w={'full'}
      bg={'#FFFFFF'}
      p={'15px'}
      borderRadius={'10px'}
      boxShadow={'lg'}
    >
      <Text>Drivers' Info</Text>
      <Divider border={'2px solid #dfdfdf'} />
      <Flex gap={'7'}>
        <Box w={'30%'}>
          <Text>Upload Image</Text>
          <Stack
            border={'1px solid #dfdfdf'}
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
              _focus={{ borderColor: '#4DB6AC' }}
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
              _focus={{ borderColor: '#4DB6AC' }}
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
              _focus={{ borderColor: '#4DB6AC' }}
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
              _focus={{ borderColor: '#4DB6AC' }}
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
              _focus={{ borderColor: '#4DB6AC' }}
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
              _focus={{ borderColor: '#4DB6AC' }}
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
              _focus={{ borderColor: '#4DB6AC' }}
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
              _focus={{ borderColor: '#4DB6AC' }}
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
            onClick={() => console.log('Save button clicked')}
            bg={'#4DB6AC'}
            color={'white'}
            py={'25px'}
            _hover={{
              bg: '#4db6ac',
            }}
            isDisabled={!isFormChanged}
          >
            Save
          </Button>
        </Stack>
      </Flex>
    </Stack>
  );
};

export default foodGroup;