import React, { useState, useEffect, useRef } from 'react';
import { Box, Flex, Icon, Badge, Avatar, Divider, Menu, MenuButton, MenuList, IconButton } from '@chakra-ui/react';
import { BsBoxArrowRight } from 'react-icons/bs';
import { FiAlignLeft, FiBell } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import axios from 'axios';
import notificationSound from '../../public/Sound Effect Twinkle.mp3'; // Adjust the path as necessary

const TopNav = () => {
  const navigate = useNavigate();
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [userImage, setUserImage] = useState(''); // State to store the user's image URL
  const notificationRef = useRef(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const bellIconRef = useRef(null);
  const [adminData, setAdminData] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('adminId');
    navigate('/login');
  };

  const handleClickOutside = (event) => {
    if (
      notificationRef.current &&
      !notificationRef.current.contains(event.target) &&
      bellIconRef.current &&
      !bellIconRef.current.contains(event.target)
    ) {
      setIsNotificationOpen(false);
    }
  };

  const playNotificationSound = () => {
    const audio = new Audio(notificationSound);
    audio.play().catch((error) => {
      console.error('Error playing notification sound:', error);
    });
  };

  const fetchNotifications = async () => {
    try {
      const response = await fetch('https://delivery-chimelu-new.onrender.com/api/v1/admin/get/notifications');
      if (response.ok) {
        const data = await response.json();
        setNotifications(data);
      } else {
        console.error('Error fetching notifications:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const fetchUserImage = async () => {
    const adminId = localStorage.getItem('adminId');
    if (!adminId) {
      navigate('/login');
      return;
    }
    try {
      const response = await axios.get(`https://delivery-chimelu-new.onrender.com/api/v1/admin/${adminId}`);
      setAdminData(response.data.admin);
      setImagePreviewUrl(response.data.admin.image);
    } catch (error) {
      console.error('Error fetching admin data:', error);
      if (error.response && error.response.status === 404) {
        console.error('Admin not found');
        // Handle admin not found case, maybe redirect or show a message
      }
    }
  };

  const toggleNotification = () => {
    setIsNotificationOpen((prevState) => {
      if (!prevState) {
        fetchNotifications();
      }
      return !prevState;
    });
  };

  useEffect(() => {
    fetchNotifications();
    fetchUserImage(); // Fetch user image on component mount
    const newSocket = io('wss://delivery-chimelu-new.onrender.com');
    newSocket.on('connect', () => {
      console.log('Socket connected');
    });

    newSocket.on('newNotification', (message) => {
      console.log('New notification received:', message);
      setNotifications((prevNotifications) => [
        ...prevNotifications,
        message,
      ]);
      playNotificationSound();
    });

    newSocket.on('newOrders', (message) => {
      console.log('New order received:', message);
      setNotifications((prevNotifications) => [
        ...prevNotifications,
        message,
      ]);
      playNotificationSound();
    });

    newSocket.on('disconnect', () => {
      console.log('Socket disconnected');
    });

    return () => {
      newSocket.close();
      console.log('Socket connection closed');
    };
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <Box bg={'#f9f9f9'} p={4}>
      <Flex justify="space-between" align="center" justifyContent="flex-end">
        <Flex align="center">
          <Box position="relative" mr={9} mt={'2'}>
            <Icon as={FiBell} w={6} h={6} onClick={toggleNotification} cursor="pointer" ref={bellIconRef} />
            <Badge
              colorScheme="red"
              borderRadius="full"
              position="absolute"
              top="-1"
              right="-1"
              fontSize="0.7em"
            >
              {notifications.length}
            </Badge>
            {isNotificationOpen && (
              <Box
                ref={notificationRef}
                position="absolute"
                top="8"
                right="0"
                bg="white"
                boxShadow="md"
                borderRadius="md"
                p={4}
                zIndex={10}
                width="250px"
                maxHeight="300px" // Set max height for the scroll bar
                overflowY="auto" // Enable vertical scrolling
              >
                <Box>
                  <Box mb={2} borderBottom="1px solid" borderColor="gray.200">
                    <strong>Notifications</strong>
                  </Box>
                  {notifications.map((notification, index) => (
                    <Box mb={2} key={index}>
                      {notification.message}
                      <Divider mt={2} mb={2} borderWidth="2px" />
                    </Box>
                  ))}
                </Box>
              </Box>
            )}
          </Box>
          <Avatar
            size="sm"
            name="User Avatar"
            src={imagePreviewUrl || 'default_avatar_url_here'} // Replace with your default avatar URL
            mr={6}
            w={'50'}
            h={'12'}
          />

          {/* Menu Button */}
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Options"
              icon={<FiAlignLeft />}
            />
            <MenuList>
              <div
                className="flex items-center px-4 py-2 text-red-500 cursor-pointer"
                onClick={handleLogout}
              >
                <BsBoxArrowRight className="text-lg mr-2" />
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