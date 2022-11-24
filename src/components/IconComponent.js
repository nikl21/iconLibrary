import { DownloadIcon } from '@chakra-ui/icons';
import { Box, Flex, Image, Spacer, Square, Text } from '@chakra-ui/react';
import React from 'react';
import { saveAs } from 'file-saver';

const IconComponent = ({ name, category, url }) => {
  const downloadImage = () => {
    saveAs(url, name); // Put your image url here.
  };
  async function download(url) {
    const a = document.createElement('a');
    a.href = await toDataURL(url);
    a.download = name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    downloadImage();
  }

  function toDataURL(url) {
    return fetch(url)
      .then(response => {
        return response.blob();
      })
      .then(blob => {
        return URL.createObjectURL(blob);
      });
  }
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
          _hover={{ backgroundColor: 'gray' }}
          onClick={() => download(url)}
        >
          <DownloadIcon color="white" boxSize={4} />
        </Square>
      </Flex>
    </Box>
  );
};

export default IconComponent;
