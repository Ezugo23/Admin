import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  HStack,
  VStack,
  Text,
  Flex,
  Input,
  Button,
  IconButton,
  Center,
  Tooltip,
  Skeleton,
} from '@chakra-ui/react';
import {
  FaCalendarAlt,
  FaClock,
  FaArrowLeft,
  FaArrowRight,
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const DeliveryHistory = ({ driverId }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();

    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, 70000);

    return () => clearTimeout(timeoutId);
  }, [driverId]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://delivery-chimelu-new.onrender.com/api/v1/driver/${driverId}/orders`
      );
      // console.log('Fetched data:', response.data);

      let ordersArray = [];
      if (Array.isArray(response.data)) {
        ordersArray = response.data;
      } else if (typeof response.data === 'object') {
        ordersArray = Object.values(response.data);
      }

      const flattenedOrders = ordersArray.flatMap((item) =>
        Array.isArray(item) ? item : [item]
      );

      const validOrders = flattenedOrders.filter(
        (order) => order && typeof order === 'object' && order.orderId
      );

      setOrders(validOrders);
      setError('');
    } catch (error) {
      console.error('Error fetching orders:', error);
      setError('Error fetching orders. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatTime = (dateString) => {
    const options = { hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleTimeString(undefined, options);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const filteredOrders = orders.filter((order) =>
    `${order.username || ''} ${order.pickUpAddress || ''} ${
      order.deliveryAddress || ''
    }`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  const renderPaginationButtons = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
      let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

      if (endPage - startPage + 1 < maxPagesToShow) {
        startPage = Math.max(1, endPage - maxPagesToShow + 1);
      }

      if (startPage > 1) {
        pageNumbers.push(1);
        if (startPage > 2) {
          pageNumbers.push('...');
        }
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }

      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          pageNumbers.push('...');
        }
        pageNumbers.push(totalPages);
      }
    }

    return pageNumbers.map((page, index) => (
      <Button
        key={index}
        onClick={() => typeof page === 'number' && handlePageChange(page)}
        isActive={currentPage === page}
        variant={currentPage === page ? '#4CAF50' : 'white'}
        disabled={typeof page !== 'number'}
        bg={currentPage === page ? '#4CAF50' : 'white'}
        color={currentPage === page ? 'white' : 'black'}
        _hover={{
          bg: currentPage === page ? '#45a049' : '#f5f5f5',
        }}
      >
        {page}
      </Button>
    ));
  };

  if (loading) {
    return (
      <Box>
        <HStack justify={'space-between'} mb={'5'}>
          <Skeleton height="20px" width="150px" />
          <Skeleton height="40px" width="200px" />
        </HStack>
        <Box bg={'white'} p={'5'}>
          <HStack justifyContent={'flex-end'} mb={'10px'}>
            <Skeleton height="20px" width="80px" />
            <Skeleton height="40px" width="300px" />
          </HStack>

          <Box overflowX="auto" mb={4}>
            <Table
              variant="simple"
              minWidth="100%"
              border="1px"
              borderColor="gray.200"
            >
              <Thead>
                <Tr>
                  <Th>
                    <Skeleton height="20px" width="100px" />
                  </Th>
                  <Th>
                    <Skeleton height="20px" width="150px" />
                  </Th>
                  <Th>
                    <Skeleton height="20px" width="200px" />
                  </Th>
                  <Th>
                    <Skeleton height="20px" width="200px" />
                  </Th>
                  <Th>
                    <Skeleton height="20px" width="100px" />
                  </Th>
                  <Th>
                    <Skeleton height="20px" width="80px" />
                  </Th>
                  <Th>
                    <Skeleton height="20px" width="100px" />
                  </Th>
                  <Th>
                    <Skeleton height="20px" width="150px" />
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {[...Array(10)].map((_, index) => (
                  <Tr key={index}>
                    <Td>
                      <Skeleton height="20px" width="50px" />
                    </Td>
                    <Td>
                      <Skeleton height="20px" width="100px" />
                    </Td>
                    <Td>
                      <Skeleton height="20px" width="200px" />
                    </Td>
                    <Td>
                      <Skeleton height="20px" width="200px" />
                    </Td>
                    <Td>
                      <Skeleton height="20px" width="100px" />
                    </Td>
                    <Td>
                      <Skeleton height="20px" width="80px" />
                    </Td>
                    <Td>
                      <Skeleton height="20px" width="100px" />
                    </Td>
                    <Td>
                      <Skeleton height="20px" width="150px" />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>

          <Flex justify="space-between" align="center" mt={4}>
            <Skeleton height="20px" width="200px" />
            <Skeleton height="40px" width="300px" />
          </Flex>
        </Box>
      </Box>
    );
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  if (orders.length === 0) {
    return (
      <Center h={'400px'}>
        <VStack
          bg="white"
          p={4}
          borderRadius="md"
          boxShadow="lg"
          _hover={{ boxShadow: 'lg' }}
          justify={'center'}
          align={'center'}
          h={'200px'}
          w={'350px'}
          transition="all 0.7s"
        >
          <Text>No request history available for this driver</Text>
          <Button
            _hover={{ bg: '#4caf50', color: 'white' }}
            bg={'#4caf50'}
            color={'white'}
            onClick={() => navigate(-1)}
          >
            Okay
          </Button>
        </VStack>
      </Center>
    );
  }

  return (
    <Box overflowX={'auto'}>
      <Text fontSize={'1.125rem'} fontWeight={'400'} mb={'5'}>
        All Delivery Requests History of Driver:
      </Text>

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
                  #
                </Th>
                <Th
                  fontSize="0.738rem"
                  textAlign="center"
                  color={'#181616'}
                  textTransform={'capitalize'}
                  fontWeight={400}
                >
                  DATE TIME
                </Th>
                <Th
                  fontSize="0.738rem"
                  textAlign="center"
                  color={'#181616'}
                  textTransform={'capitalize'}
                  fontWeight={400}
                >
                  PICKUP LOCATION
                </Th>
                <Th
                  fontSize="0.738rem"
                  textAlign="center"
                  color={'#181616'}
                  textTransform={'capitalize'}
                  fontWeight={400}
                >
                  DROP LOCATION
                </Th>
                <Th
                  fontSize="0.738rem"
                  textAlign="center"
                  color={'#181616'}
                  textTransform={'capitalize'}
                  fontWeight={400}
                >
                  INVOICE
                </Th>
                <Th
                  fontSize="0.738rem"
                  textAlign="center"
                  color={'#181616'}
                  textTransform={'capitalize'}
                  fontWeight={400}
                >
                  FEE
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
              </Tr>
            </Thead>
            <Tbody bg="#fefefd">
              {currentOrders.map((order, index) => (
                <Tr
                  key={index}
                  textAlign="center"
                  bg={index % 2 === 0 ? '#f9fafc' : 'white'}
                  style={{ cursor: 'pointer' }}
                >
                  <Td
                    fontSize="0.675rem"
                    color="#121111"
                    textAlign="center"
                    whiteSpace={'nowrap'}
                  >
                    {indexOfFirstItem + index + 1}
                  </Td>
                  <Td textAlign="center" whiteSpace={'nowrap'}>
                    <HStack>
                      <Tooltip label="Date" aria-label="Date Tooltip">
                        <IconButton
                          icon={<FaCalendarAlt />}
                          color="black"
                          cursor="pointer"
                          bg="#EFEFEF"
                          aria-label=""
                          w="1.5rem"
                          h="2.0rem"
                        />
                      </Tooltip>
                      <Text>{formatDate(order.orderDate)}</Text>
                      <Tooltip label="Time" aria-label="Time Tooltip">
                        <IconButton
                          icon={<FaClock />}
                          color="black"
                          cursor="pointer"
                          bg="#EFEFEF"
                          aria-label=""
                          w="1.5rem"
                          h="2.0rem"
                        />
                      </Tooltip>
                      <Text>{formatTime(order.orderDate)}</Text>
                    </HStack>
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
                        {order.pickUpAddress}
                      </Text>
                    </Box>
                  </Td>
                  <Td
                    fontSize="0.675rem"
                    color="#121111"
                    textAlign="center"
                    whiteSpace={'nowrap'}
                  >
                    {order.deliveryAddress}
                  </Td>
                  <Td
                    fontSize="0.675rem"
                    color="#121111"
                    textAlign="center"
                    whiteSpace={'nowrap'}
                  >
                    {order.orderId}
                  </Td>
                  <Td
                    fontSize="0.675rem"
                    color="#121111"
                    textAlign="center"
                    whiteSpace={'nowrap'}
                  >
                    #{order.Fee}
                  </Td>
                  <Td
                    fontSize="0.675rem"
                    color="#121111"
                    textAlign="center"
                    whiteSpace={'nowrap'}
                  >
                    {order.orderStatus}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>

        <Flex justify="space-between" align="center" mt={4}>
          <Text fontSize="0.875rem">
            Showing {indexOfFirstItem + 1} -{' '}
            {Math.min(indexOfLastItem, filteredOrders.length)} of{' '}
            {filteredOrders.length} orders
          </Text>
          <HStack spacing={2}>
            <IconButton
              icon={<FaArrowLeft />}
              onClick={() => handlePageChange(currentPage - 1)}
              isDisabled={currentPage === 1}
              aria-label="Previous Page"
              bg="white"
              color="black"
              _hover={{ bg: '#4CAF50' }}
            />
            {renderPaginationButtons()}
            <IconButton
              icon={<FaArrowRight />}
              onClick={() => handlePageChange(currentPage + 1)}
              isDisabled={currentPage === totalPages}
              aria-label="Next Page"
              bg="white"
              color="black"
              _hover={{ bg: 'white' }}
            />
          </HStack>
        </Flex>
      </Box>
    </Box>
  );
};

export default DeliveryHistory;
