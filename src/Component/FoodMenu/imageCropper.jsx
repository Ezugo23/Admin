import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  Box,
  Flex,
  Image,
  HStack,
  Text,
  VStack,
} from '@chakra-ui/react';
import ReactCrop, {
  centerCrop,
  convertToPixelCrop,
  makeAspectCrop,
} from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { useRef } from 'react';
import setCanvasPreview from './selectCanvasPreview';

const ASPECT_RATIO = 1;
const MIN_DIMENSION = 400;

const ImageCropper = ({
  isOpen,
  onClose,
  src,
  updateFoodImage,
  updateEditImage,
}) => {
  const imageRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const [imageSrc, setImageSrc] = useState('');
  const [crop, setCrop] = useState();
  const [error, setError] = useState('');

  const onSelectFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.addEventListener('load', () => {
      const imageElement = new window.Image();
      const imageUrl = reader.result?.toString() || '';
      imageElement.src = imageUrl;

      imageElement.addEventListener('load', onImageLoad);
    });
    reader.readAsDataURL(file);
  };

  const onImageLoad = (e) => {
    const { naturalWidth, naturalHeight } = e.currentTarget;
    if (naturalWidth < MIN_DIMENSION || naturalHeight < MIN_DIMENSION) {
      setError('Image must be at least 700 x 700 pixels.');
      return; // Exit the function if the requirement is not met
    }

    setError(''); // Clearing any existing error

    const { width, height } = e.currentTarget;
    const croppedMinWidth = (MIN_DIMENSION / width) * 100;

    const crop = makeAspectCrop(
      {
        unit: '%',
        width: croppedMinWidth,
      },
      ASPECT_RATIO,
      width,
      height
    );
    const centeredCrop = centerCrop(crop, width, height);
    setCrop(centeredCrop);

    setImageSrc(e.currentTarget.src);
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent h="120vh">
        <ModalHeader>Crop Image</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={onSelectFile}
          />
          {/* Button to trigger image selection */}
          <Button
            onClick={() => document.querySelector('input[type="file"]').click()}
            bg="#4CAF50"
            color="white"
            _hover={{ bg: '#4CAF50' }}
            py="1rem"
          >
            Select Image
          </Button>
          {error && <Text color="red">{error}</Text>}
          {imageSrc && (
            <VStack alignItems="center" mt={5}>
              <ReactCrop
                onChange={(pixelCrop, percentCrop) => setCrop(percentCrop)}
                crop={crop}
                // circularCrop
                keepSelection
                aspect={ASPECT_RATIO}
                minWidth={MIN_DIMENSION}
              >
                <Image
                  ref={imageRef}
                  src={imageSrc}
                  alt="Upload"
                  style={{ maxHeight: '70vh' }}
                  onLoad={onImageLoad}
                />
              </ReactCrop>
              <Button
                bg="#4CAF50"
                color="white"
                _hover={{ bg: '#4CAF50' }}
                py="1rem"
                onClick={() => {
                  setCanvasPreview(
                    imageRef.current,
                    previewCanvasRef.current,
                    convertToPixelCrop(
                      crop,
                      imageRef.current.width,
                      imageRef.current.height
                    )
                  );
                  const dataUrl = previewCanvasRef.current.toDataURL();

                  if (updateEditImage && updateFoodImage) {
                    updateFoodImage(dataUrl);
                    updateEditImage(dataUrl);
                  } else if (updateEditImage) {
                    updateEditImage(dataUrl);
                  } else if (updateFoodImage) {
                    updateFoodImage(dataUrl);
                  }
                  onClose(); // Close the modal
                }}
              >
                Crop Image
              </Button>
            </VStack>
          )}
          {crop && (
            <canvas
              ref={previewCanvasRef}
              style={{
                display: 'none',
                paddingTop: '10',
                border: '1px solid black',
                objectFit: 'contain',
                width: '300px',
                height: '300px',
              }}
            />
          )}
        </ModalBody>

        <ModalFooter>
          <Button
            onClick={onClose}
            bg="#4CAF50"
            color="white"
            _hover={{ bg: '#4CAF50' }}
            // w="20%"
            py="1rem"
          >
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ImageCropper;
