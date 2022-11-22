import { DownloadIcon } from '@chakra-ui/icons';
import { Box, Flex, Image, Spacer, Square, Text } from '@chakra-ui/react';
import React from 'react';
import { saveAs } from 'file-saver';

const IconComponent = ({ name, category, url }) => {
  const downloadImage = () => {
    saveAs(url); // Put your image url here.
  };
  return (
    <Box boxSize="200" position="relative">
      <Image src={url} alt="name" />
      <Flex px={20} justify="center" align="center">
        <Spacer />
        <Square
          position="absolute"
          size={7}
          rounded="full"
          right="4"
          bottom="6"
          m={2}
          bg="black"
          onClick={downloadImage}
        >
          <DownloadIcon color="white" boxSize={4} />
        </Square>
      </Flex>
    </Box>
  );
};

export default IconComponent;
