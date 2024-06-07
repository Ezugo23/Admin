import React, { useState, useEffect } from 'react';
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
} from '@chakra-ui/react';
import {
  RiEditLine,
  RiDeleteBinLine,
  RiErrorWarningLine,
} from 'react-icons/ri';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import axios from 'axios';

const DriversList = () => {
  const [drivers, setDrivers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const pageSize = 10;

  useEffect(() => {
    fetchDrivers();
  }, [currentPage]);

  const fetchDrivers = async () => {
    try {
      const response = await axios.get(
        'https://swifdropp.onrender.com/api/v1/driver'
      );

      const driversArray = response.data.drivers;
      const startIndex = (currentPage - 1) * pageSize;
      const endIndex = Math.min(startIndex + pageSize, driversArray.length);
      const currentDrivers = driversArray.slice(startIndex, endIndex);

      setDrivers(currentDrivers);
      setTotalItems(driversArray.length); // Update total items count
      console.log('Fetched drivers:', driversArray);
      console.log('Current page drivers:', currentDrivers);
      console.log('Total items:', driversArray.length);
    } catch (error) {
      console.error('Error fetching drivers:', error);
    }
  };

  const totalPages = Math.ceil(totalItems / pageSize);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <Box>
      <Box overflowX="auto" mb={4}>
        <Table variant="simple" minWidth="100%">
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
                NAME, LAST NAME
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
                CANCELED
              </Th>
              <Th
                fontSize="0.738rem"
                textAlign="center"
                color={'#181616'}
                textTransform={'capitalize'}
                fontWeight={400}
              >
                RATING
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
            {drivers.map((driver, index) => (
              <Tr
                key={index}
                textAlign="center"
                bg={index % 2 === 0 ? '#f9fafc' : 'white'}
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
                <Td
                  fontSize="0.675rem"
                  color="#121111"
                  textAlign="center"
                  whiteSpace={'nowrap'}
                >
                  {driver.canceled}
                </Td>
                <Td
                  fontSize="0.675rem"
                  color="#121111"
                  textAlign="center"
                  whiteSpace={'nowrap'}
                >
                  {driver.rating}
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
                        // onClick={onViewOpen}
                      />
                    </Tooltip>
                    <Tooltip label="Edit" aria-label="Edit Tooltip">
                      <IconButton
                        icon={<RiEditLine />}
                        color="black"
                        cursor="pointer"
                        bg="#EFEFEF"
                        // onClick={onEditOpen}
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
                        // onClick={onViewOpen}
                      />
                    </Tooltip>
                    <Tooltip label="Delete" aria-label="Delete Tooltip">
                      <IconButton
                        icon={<RiDeleteBinLine />}
                        color="black"
                        cursor="pointer"
                        bg="#EFEFEF"
                        // onClick={onDeleteOpen}
                        aria-label=""
                        w="1.5rem"
                        h="2.0rem"
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
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              onClick={() => handlePageChange(page)}
              isActive={currentPage === page}
              size="sm"
            >
              {page}
            </Button>
          ))}
          <IconButton
            icon={<FaArrowRight />}
            onClick={() => handlePageChange(currentPage + 1)}
            isDisabled={currentPage === totalPages}
            aria-label="Next Page"
          />
        </HStack>
      </Flex>
    </Box>
  );
};

export default DriversList;
