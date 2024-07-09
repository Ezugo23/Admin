import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, Image, Input } from '@chakra-ui/react';

const ModalComponent = ({ isOpen, onClose, imageSrc, inputValue, setInputValue }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add New Category</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Image src={imageSrc} alt="Modal Image" mb={4} />
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter category name"
          />
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button variant="ghost">Save</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalComponent;