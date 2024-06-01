import React from 'react';
import {
  Box,
  Flex,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
  Icon,
  Badge,
  Avatar,
  Divider,
} from '@chakra-ui/react';
import { FiAlignLeft, FiBell, FiSearch } from 'react-icons/fi';
import { useLocation, Link as RouterLink } from 'react-router-dom';

const TopNav = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <Box bg={'#f9f9f9'} p={4}>
      <Flex justify="space-between" align="center">
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink as={RouterLink} to="/">
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>
          {pathnames.map((value, index) => {
            const to = `/${pathnames.slice(0, index + 1).join('/')}`;

            return (
              <BreadcrumbItem key={to}>
                <BreadcrumbLink as={RouterLink} to={to}>
                  {value.charAt(0).toUpperCase() + value.slice(1)}
                </BreadcrumbLink>
              </BreadcrumbItem>
            );
          })}
        </Breadcrumb>

        <Flex align="center">
          <InputGroup width="200px" borderRadius={15} mr={4}>
            <Input
              type="text"
              placeholder="Search..."
              w="200px"
              height="44px"
              border="none"
              outline="none"
              _focus={{
                outline: 'none',
                border: 'none',
              }}
              _hover={{
                outline: 'none',
                border: 'none',
              }}
              focusBorderColor="transparent"
              sx={{
                '::placeholder': {
                  fontSize: '14px',
                  color: '#a89f98',
                },
              }}
              bg={'white'}
            />
            <InputRightElement>
              <Icon
                as={FiSearch}
                color="black"
                marginTop={'1'}
                fontSize={'20px'}
                cursor={'pointer'}
              />
            </InputRightElement>
          </InputGroup>

          <Box position="relative" mr={4} mt={'2'}>
            <Icon as={FiBell} w={6} h={6} />
            <Badge
              colorScheme="red"
              borderRadius="full"
              position="absolute"
              top="-1"
              right="-1"
              fontSize="0.7em"
            >
              3
            </Badge>
          </Box>
          <Avatar
            size="sm"
            name="User Avatar"
            src="https://bit.ly/dan-abramov"
            mr={4}
            w={'50'}
          />
          <IconButton aria-label="Menu" icon={<FiAlignLeft />} />
        </Flex>
      </Flex>
      <Divider mt={'5'} borderWidth={'1px'} color={'black'} />
    </Box>
  );
};

export default TopNav;
