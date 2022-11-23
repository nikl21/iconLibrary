import { DownloadIcon } from '@chakra-ui/icons';
import { Box, Flex, Image, Spacer, Square, Text } from '@chakra-ui/react';
import React from 'react';
import { saveAs } from 'file-saver';

const IconComponent = ({ name, category, url }) => {
  const downloadImage = () => {
    saveAs(url, name); // Put your image url here.
  };
  const download = e => {
    e.preventDefault();
    console.log(e.target.href);
    fetch(e.target.href, {
      method: 'GET',
      headers: {},
    })
      .then(response => {
        response.arrayBuffer().then(function (buffer) {
          const url = window.URL.createObjectURL(new Blob([buffer]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', name); //or any other extension
          document.body.appendChild(link);
          link.click();
        });
      })
      .catch(err => {
        console.log(err);
      });
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
          _hover={{ backgroundColor: 'gray' }}
        >
          <a href={url} download onClick={e => download(e)}>
            <DownloadIcon color="white" boxSize={4} />
          </a>
        </Square>
      </Flex>
    </Box>
  );
};

export default IconComponent;
