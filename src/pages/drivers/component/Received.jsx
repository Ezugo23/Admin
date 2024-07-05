import React, { useState, useEffect } from 'react';
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
  Button,
  Center,
  IconButton,
  Tooltip,
} from '@chakra-ui/react';
import {
  FaCalendarAlt,
  FaClock,
  FaArrowLeft,
  FaArrowRight,
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { usePayoutContext } from '../../../contexts/PayoutContext';

const Received = ({ driverId }) => {
  const { recipients, loading, error, fetchTransactions, setCurrentDriverId } =
    usePayoutContext();

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    setCurrentDriverId(driverId);
  }, [driverId, setCurrentDriverId]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentRecipients = recipients.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(recipients.length / itemsPerPage);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? 'Invalid Date' : date.toLocaleDateString();
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? 'Invalid Time' : date.toLocaleTimeString();
  };

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

  if (loading && recipients.length === 0) {
    return <Text>Loading...</Text>;
  }

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  if (recipients.length === 0) {
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
          w={'400px'}
          transition="all 0.7s"
        >
          <Text>No received transactions available for this driver</Text>
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
      <Box bg={'white'} p={'5'}>
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
                  ACCOUNT NUMBER
                </Th>
                <Th
                  fontSize="0.738rem"
                  textAlign="center"
                  color={'#181616'}
                  textTransform={'capitalize'}
                  fontWeight={400}
                >
                  BANK CODE
                </Th>
                <Th
                  fontSize="0.738rem"
                  textAlign="center"
                  color={'#181616'}
                  textTransform={'capitalize'}
                  fontWeight={400}
                >
                  BANK NAME
                </Th>
                <Th
                  fontSize="0.738rem"
                  textAlign="center"
                  color={'#181616'}
                  textTransform={'capitalize'}
                  fontWeight={400}
                >
                  ACCOUNT NAME
                </Th>
                <Th
                  fontSize="0.738rem"
                  textAlign="center"
                  color={'#181616'}
                  textTransform={'capitalize'}
                  fontWeight={400}
                >
                  RECIPIENT CODE
                </Th>
              </Tr>
            </Thead>
            <Tbody bg="#fefefd">
              {currentRecipients.map((recipient, index) => (
                <Tr
                  key={index}
                  textAlign="center"
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
                      <Text>{formatDate(recipient.createdAt)}</Text>
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
                      <Text>{formatTime(recipient.createdAt)}</Text>
                    </HStack>
                  </Td>
                  <Td
                    fontSize="0.675rem"
                    color="#121111"
                    textAlign="center"
                    whiteSpace={'nowrap'}
                  >
                    {recipient.accountNumber}
                  </Td>
                  <Td
                    fontSize="0.675rem"
                    color="#121111"
                    textAlign="center"
                    whiteSpace={'nowrap'}
                  >
                    {recipient.bankCode}
                  </Td>
                  <Td
                    fontSize="0.675rem"
                    color="#121111"
                    textAlign="center"
                    whiteSpace={'nowrap'}
                  >
                    {recipient.bankName}
                  </Td>
                  <Td
                    fontSize="0.675rem"
                    color="#121111"
                    textAlign="center"
                    whiteSpace={'nowrap'}
                  >
                    {recipient.name}
                  </Td>
                  <Td
                    fontSize="0.675rem"
                    color="#121111"
                    textAlign="center"
                    whiteSpace={'nowrap'}
                  >
                    {recipient.recipientCode}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
        <Flex justify="space-between" align="center" mt={4}>
          <Text fontSize="0.875rem">
            Showing {indexOfFirstItem + 1} -{' '}
            {Math.min(indexOfLastItem, recipients.length)} of{' '}
            {recipients.length} recipients
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

export default Received;
