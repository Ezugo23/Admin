import React from 'react';
import {
  HStack,
  VStack,
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
} from '@chakra-ui/react';

const PersonalInformation = () => {
  return (
    <Stack>
      <Text>Drivers' Info</Text>
      <Divider />
      <Flex as={'form'} gap={'7'}>
        <Stack>
          <Image />
          <Button>Change Photo</Button>
        </Stack>
        <Stack>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input />
          </FormControl>
          <FormControl>
            <FormLabel>E-mail</FormLabel>
            <Input />
          </FormControl>
          <FormControl>
            <FormLabel>NIN</FormLabel>
            <Input />
          </FormControl>
          <FormControl>
            <FormLabel>Address</FormLabel>
            <Input />
          </FormControl>
        </Stack>
        <Stack>
          <FormControl>
            <FormLabel>Vehicle type</FormLabel>
            <Input placeholder="(Select type)" />
          </FormControl>
          <FormControl>
            <FormLabel>Vehicle Registration No.</FormLabel>
            <Input />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input />
          </FormControl>
          <Button mt={'8'}>Save</Button>
        </Stack>
      </Flex>
    </Stack>
  );
};

export default PersonalInformation;
