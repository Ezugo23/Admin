import React, { useState } from 'react';
import {
  FormControl,
  Input,
  Button,
  Text,
  Stack,
  Divider,
  FormLabel,
  useToast,
  FormHelperText,
} from '@chakra-ui/react';

const ChangePassword = ({ driverId }) => {
  const [newPassword, setNewPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (!newPassword) {
      toast({
        title: 'Error',
        description: 'Please enter a new password.',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://swifdropp.onrender.com/api/v1/driver/password-new/${driverId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            newPassword: newPassword,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      toast({
        title: 'Success',
        description: 'Password changed successfully.',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
      setNewPassword('');
    } catch (error) {
      // console.error('Error changing password:', error);
      toast({
        title: 'Error',
        description: 'Server error. Please try again later or contact support.',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Stack
      bg={'#FFFFFF'}
      h={'243px'}
      w={'full'}
      p={'20px'}
      borderRadius={'10px'}
    >
      <Text color={'#000000'} fontSize={'1rem'} fontWeight={'400'}>
        Change Password
      </Text>
      <Divider border={'2px solid #dfdfdf'} />
      <Stack as={'form'} onSubmit={handlePasswordChange}>
        <FormControl>
          <FormLabel>New Password</FormLabel>
          <Input
            type="password"
            value={newPassword}
            w={'80%'}
            _focus={{ borderColor: '#4DB6AC' }}
            border={'2px solid #dfdfdf'}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <FormHelperText>
            Password must be at least 8 characters long.
          </FormHelperText>
        </FormControl>
        <Button
          type="submit"
          loadingText="Saving..."
          isLoading={isLoading}
          w={'30%'}
          bg={'#4DB6AC'}
          color={'white'}
          _hover={{
            bg: '#4DB6AC',
            color: 'white',
          }}
        >
          SAVE PASSWORD
        </Button>
      </Stack>
    </Stack>
  );
};

export default ChangePassword;
