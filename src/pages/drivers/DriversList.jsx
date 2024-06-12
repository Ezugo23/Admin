import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Badge,
  Image,
  IconButton,
  Tooltip,
  Button,
  HStack,
  Text,
  Flex,
  Input,
  Switch,
  useToast,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

import {
  RiEditLine,
  RiDeleteBinLine,
  RiErrorWarningLine,
} from 'react-icons/ri';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { useDrivers } from '../../contexts/DriversContext';

const DriversList = () => {
  const { drivers, totalItems, pageSize } = useDrivers();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const toast = useToast();

  const filteredDrivers = drivers.filter((driver) =>
    `${driver.name} ${driver.lastname}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(totalItems / pageSize);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 3;
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = startPage + maxPagesToShow - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let page = startPage; page <= endPage; page++) {
      pageNumbers.push(
        <Button
          key={page}
          onClick={() => handlePageChange(page)}
          bg={currentPage === page ? '#4CAF50' : 'gray.200'}
          color={currentPage === page ? 'white' : 'black'}
          _hover={{ bg: currentPage === page ? '#45A049' : 'gray.300' }}
          size="sm"
        >
          {page}
        </Button>
      );
    }

    return pageNumbers;
  };

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, drivers.length);
  const currentDrivers = filteredDrivers.slice(startIndex, endIndex);
  const navigate = useNavigate();

  const toggleAvailability = async (driverId, currentStatus) => {
    try {
      console.log(
        `Toggling availability for driver ID: ${driverId}, current status: ${currentStatus}`
      );

      const response = await fetch(
        `https://swifdropp.onrender.com/api/v1/driver/availability-driver/${driverId}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ available: !currentStatus }),
        }
      );

      console.log('Response status:', response.status);

      if (response.ok) {
        toast({
          title: 'Success',
          description: 'Driver availability has been updated.',
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top',
        });
      } else {
        const errorData = await response.json();
        console.error('Error response data:', errorData);
        toast({
          title: 'Error',
          description: `Failed to update driver availability: ${
            errorData.message || 'Unknown error'
          }`,
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'top',
        });
      }
    } catch (error) {
      console.error('Error during fetch:', error);
      toast({
        title: 'Error',
        description: 'Failed to update driver availability.',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
    }
  };

  return (
    <Box>
      <HStack justify={'space-between'} mb={'5'}>
        <Text fontSize={'1.125rem'} fontWeight={'400'}>
          List of Drivers
        </Text>
        <Button
          bg="#3B5998"
          color="white"
          _hover={{ bg: '#3B5998' }}
          w="188px"
          h="44px"
          py="1.5rem"
          borderRadius={8}
          leftIcon={<AddIcon />}
        >
          Add a New Driver
        </Button>
      </HStack>

      <Box bg={'white'} p={'5'}>
        <HStack justifyContent={'flex-end'} mb={'10px'}>
          <Text>Search:</Text>
          <Input
            h={'2.75rem'}
            type="text"
            placeholder="Search..."
            w={'293px'}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            borderRadius="0.5rem"
            paddingRight="0.6rem"
            paddingLeft="1.7rem"
            border="1px solid #544F4C"
            _focus={{
              border: '2px solid #4CAF50',
            }}
            focusBorderColor="transparent"
          />
        </HStack>

        <Box overflowX="auto" mb={4}>
          <Table
            variant="simple"
            minWidth="100%"
            border="1px"
            borderColor="gray.200"
          >
            <Thead bg="white">
              <Tr>
                <Th
                  fontSize="0.738rem"
                  textAlign="center"
                  color={'#181616'}
                  textTransform={'capitalize'}
                  fontWeight={400}
                >
                  ID
                </Th>
                <Th
                  fontSize="0.738rem"
                  textAlign="center"
                  color={'#181616'}
                  textTransform={'capitalize'}
                  fontWeight={400}
                >
                  AVATAR
                </Th>
                <Th
                  fontSize="0.738rem"
                  textAlign="center"
                  color={'#181616'}
                  textTransform={'capitalize'}
                  fontWeight={400}
                >
                  NAME
                </Th>
                <Th
                  fontSize="0.738rem"
                  textAlign="center"
                  color={'#181616'}
                  textTransform={'capitalize'}
                  fontWeight={400}
                >
                  PHONE
                </Th>
                <Th
                  fontSize="0.738rem"
                  textAlign="center"
                  color={'#181616'}
                  textTransform={'capitalize'}
                  fontWeight={400}
                >
                  EMAIL
                </Th>
                <Th
                  fontSize="0.738rem"
                  textAlign="center"
                  color={'#181616'}
                  textTransform={'capitalize'}
                  fontWeight={400}
                >
                  BALANCE
                </Th>
                <Th
                  fontSize="0.738rem"
                  textAlign="center"
                  color={'#181616'}
                  textTransform={'capitalize'}
                  fontWeight={400}
                >
                  DELIVERED
                </Th>

                <Th
                  fontSize="0.738rem"
                  textAlign="center"
                  color={'#181616'}
                  textTransform={'capitalize'}
                  fontWeight={400}
                >
                  STATUS
                </Th>
                <Th
                  fontSize="0.738rem"
                  textAlign="center"
                  color={'#181616'}
                  textTransform={'capitalize'}
                  fontWeight={400}
                >
                  ACTION
                </Th>
              </Tr>
            </Thead>
            <Tbody bg="#fefefd">
              {currentDrivers.map((driver, index) => (
                <Tr
                  key={index}
                  textAlign="center"
                  bg={index % 2 === 0 ? '#f9fafc' : 'white'}
                  onClick={() => navigate('/driversprofile')}
                >
                  <Td
                    fontSize="0.675rem"
                    color="#121111"
                    textAlign="center"
                    whiteSpace={'nowrap'}
                  >
                    {driver._id}
                  </Td>
                  <Td>
                    <Image
                      src={driver.image}
                      alt="avatar"
                      fill
                      borderRadius={'full'}
                      boxSize="40px"
                    />
                  </Td>
                  <Td
                    fontSize="0.675rem"
                    color="#121111"
                    textAlign="center"
                    whiteSpace={'nowrap'}
                  >
                    <Box noOfLines={2} maxWidth="10rem">
                      <Text
                        isTruncated={true}
                        fontSize={'0.675rem'}
                        color={'#000000'}
                      >
                        {driver.name} {driver.lastname}
                      </Text>
                      <Text fontSize={'0.575rem'}>{driver.vehicleType}</Text>
                    </Box>
                  </Td>

                  <Td
                    fontSize="0.675rem"
                    color="#121111"
                    textAlign="center"
                    whiteSpace={'nowrap'}
                  >
                    {driver.phoneNumber}
                  </Td>
                  <Td
                    fontSize="0.675rem"
                    color="#121111"
                    textAlign="center"
                    whiteSpace={'nowrap'}
                  >
                    {driver.email}
                  </Td>
                  <Td
                    fontSize="0.675rem"
                    color="#121111"
                    textAlign="center"
                    whiteSpace={'nowrap'}
                  >
                    {driver.balance}
                  </Td>
                  <Td
                    fontSize="0.675rem"
                    color="#121111"
                    textAlign="center"
                    whiteSpace={'nowrap'}
                  >
                    {driver.delivered}
                  </Td>

                  <Td>
                    <Badge
                      colorScheme={driver.status === 'Active' ? 'green' : 'red'}
                      borderRadius={'7rem'}
                      textTransform={'capitalize'}
                      px={2}
                    >
                      {driver.status}
                    </Badge>
                  </Td>
                  <Td textAlign="center" whiteSpace={'nowrap'}>
                    <HStack justify={'center'}>
                      <Tooltip label="Request" aria-label="Request Tooltip">
                        <IconButton
                          icon={<RiErrorWarningLine />}
                          color="black"
                          cursor="pointer"
                          bg="#EFEFEF"
                          aria-label=""
                          w="1.5rem"
                          h="2.0rem"
                          onClick={() => navigate(`/request/${driver._id}`)}
                        />
                      </Tooltip>
                      <Tooltip label="Edit" aria-label="Edit Tooltip">
                        <IconButton
                          icon={<RiEditLine />}
                          color="black"
                          cursor="pointer"
                          bg="#EFEFEF"
                          aria-label=""
                          w="1.5rem"
                          h="2.0rem"
                        />
                      </Tooltip>
                      <Tooltip label="Suspend" aria-label="Suspend Tooltip">
                        <IconButton
                          icon={<RiErrorWarningLine />}
                          color="black"
                          cursor="pointer"
                          bg="#EFEFEF"
                          aria-label=""
                          w="1.5rem"
                          h="2.0rem"
                        />
                      </Tooltip>
                      <Tooltip label="Delete" aria-label="Delete Tooltip">
                        <IconButton
                          icon={<RiDeleteBinLine />}
                          color="black"
                          cursor="pointer"
                          bg="#EFEFEF"
                          aria-label=""
                          w="1.5rem"
                          h="2.0rem"
                        />
                      </Tooltip>
                      <Tooltip
                        label="Toggle Availability"
                        aria-label="Toggle Availability Tooltip"
                      >
                        <Switch
                          isChecked={driver.available}
                          onChange={() =>
                            toggleAvailability(driver._id, driver.available)
                          }
                          colorScheme="teal"
                        />
                      </Tooltip>
                    </HStack>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>

        <Flex justify="space-between" align="center" mt={4}>
          <Text fontSize="0.875rem">
            Showing {(currentPage - 1) * pageSize + 1} -{' '}
            {Math.min(currentPage * pageSize, totalItems)} of {totalItems} data
          </Text>
          <HStack spacing={2}>
            <IconButton
              icon={<FaArrowLeft />}
              onClick={() => handlePageChange(currentPage - 1)}
              isDisabled={currentPage === 1}
              aria-label="Previous Page"
            />
            {renderPageNumbers()}
            <IconButton
              icon={<FaArrowRight />}
              onClick={() => handlePageChange(currentPage + 1)}
              isDisabled={currentPage === totalPages}
              aria-label="Next Page"
            />
          </HStack>
        </Flex>
      </Box>
    </Box>
  );
};

export default DriversList;
