import React, { useContext, useState } from 'react';
import {
  Box,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Badge,
  Button,
  HStack,
  Text,
  Flex,
  Input,
  useToast,
  IconButton,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { WithdrawalContext } from '../../contexts/WithdrawalContext';

const WithdrawalHistory = () => {
  const { withdrawals, loading } = useContext(WithdrawalContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const filteredWithdrawals = withdrawals.filter((withdrawal) =>
    withdrawal.driverName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalItems = filteredWithdrawals.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const currentDrivers = filteredWithdrawals.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <Button
          key={i}
          size="sm"
          onClick={() => handlePageChange(i)}
          variant={currentPage === i ? '#4CAF50' : 'white'}
          bg={currentPage === i ? '#4CAF50' : 'white'}
          color={currentPage === i ? 'white' : 'black'}
          _hover={{
            bg: currentPage === i ? '#45a049' : '#f5f5f5',
          }}
        >
          {i}
        </Button>
      );
    }
    return pageNumbers;
  };

  if (loading) {
    return <Box>Loading...</Box>;
  }

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
            <Thead bg="#4caf50">
              <Tr>
                <Th
                  fontSize="0.738rem"
                  textAlign="center"
                  color={'#ffffff'}
                  textTransform={'capitalize'}
                  fontWeight={400}
                >
                  Date
                </Th>
                <Th
                  fontSize="0.738rem"
                  textAlign="center"
                  color={'#ffffff'}
                  textTransform={'capitalize'}
                  fontWeight={400}
                >
                  Driver's Name
                </Th>
                <Th
                  fontSize="0.738rem"
                  textAlign="center"
                  color={'#ffffff'}
                  textTransform={'capitalize'}
                  fontWeight={400}
                >
                  Amount
                </Th>
                <Th
                  fontSize="0.738rem"
                  textAlign="center"
                  color={'#ffffff'}
                  textTransform={'capitalize'}
                  fontWeight={400}
                >
                  Account Number
                </Th>
                <Th
                  fontSize="0.738rem"
                  textAlign="center"
                  color={'#ffffff'}
                  textTransform={'capitalize'}
                  fontWeight={400}
                >
                  Account Name
                </Th>
                <Th
                  fontSize="0.738rem"
                  textAlign="center"
                  color={'#ffffff'}
                  textTransform={'capitalize'}
                  fontWeight={400}
                >
                  Transaction Id
                </Th>
                <Th
                  fontSize="0.738rem"
                  textAlign="center"
                  color={'#ffffff'}
                  textTransform={'capitalize'}
                  fontWeight={400}
                >
                  Status
                </Th>
              </Tr>
            </Thead>
            <Tbody bg="#fefefd">
              {currentDrivers.map((driver, index) => (
                <Tr key={index} textAlign="center" bg={'#fafbff'} gap={'2'}>
                  <Td>
                    <Box>
                      <Text
                        fontSize="0.675rem"
                        color="#121111"
                        textAlign="center"
                        whiteSpace={'nowrap'}
                      >
                        {new Date(driver.timestamp).toLocaleDateString()}
                      </Text>
                      <Text
                        fontSize="0.675rem"
                        color="#121111"
                        textAlign="center"
                        whiteSpace={'nowrap'}
                      >
                        {new Date(driver.timestamp).toLocaleTimeString()}
                      </Text>
                    </Box>
                  </Td>
                  <Td
                    fontSize="0.675rem"
                    color="#121111"
                    textAlign="center"
                    whiteSpace={'nowrap'}
                  >
                    {driver.driverName}
                  </Td>
                  <Td
                    fontSize="0.675rem"
                    color="#121111"
                    textAlign="center"
                    whiteSpace={'nowrap'}
                  >
                    ₦{driver.amount}
                  </Td>
                  <Td
                    fontSize="0.675rem"
                    color="#121111"
                    textAlign="center"
                    whiteSpace={'nowrap'}
                  >
                    {driver.accountNumber}
                  </Td>
                  <Td
                    fontSize="0.675rem"
                    color="#121111"
                    textAlign="center"
                    whiteSpace={'nowrap'}
                  >
                    {driver.name}
                  </Td>
                  <Td
                    fontSize="0.675rem"
                    color="#121111"
                    textAlign="center"
                    whiteSpace={'nowrap'}
                  >
                    {driver.reference.length > 10
                      ? `${driver.reference.substring(0, 10)}...`
                      : driver.reference}
                  </Td>
                  <Td
                    fontSize="0.675rem"
                    color="#121111"
                    textAlign="center"
                    whiteSpace={'nowrap'}
                  >
                    {driver.status}
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

export default WithdrawalHistory;
