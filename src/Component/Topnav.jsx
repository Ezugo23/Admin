import React, { useState } from 'react';
import {
  Box,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
  Icon,
  Badge,
  Avatar,
  Divider,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import { BsBoxArrowRight } from 'react-icons/bs';
import { FiAlignLeft, FiBell, FiSearch } from 'react-icons/fi';
import { useNavigate, Link as RouterLink } from 'react-router-dom';

const TopNav = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to manage dropdown visibility

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('adminId');
     navigate('/login');
  };

  return (
    <Box bg={'#f9f9f9'} p={4}>
      <Flex justify="space-between" align="center" justifyContent="flex-end">
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

          {/* Menu Button */}
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Options"
              icon={<FiAlignLeft />}
              onClick={toggleMenu}
            />
            <MenuList>
            <div
              className="flex items-center px-4 py-2 text-red-500 cursor-pointer"
              onClick={handleLogout}
            >
              <BsBoxArrowRight
                className="text-lg mr-2"
                onClick={handleLogout}
              />
              Logout
            </div>
            </MenuList>
          </Menu>

        </Flex>
      </Flex>
      <Divider mt={'5'} borderWidth={'1px'} color={'black'} />
    </Box>
  );
};

export default TopNav;