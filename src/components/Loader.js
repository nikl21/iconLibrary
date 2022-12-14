import React from 'react';
import Lottie from 'lottie-react';
import loader from '../assets/loader.json';
import { Box } from '@chakra-ui/react';

const Loader = () => {
  return (
    <Box boxSize={200} bg={'white'} opacity={0.9}>
      <Lottie animationData={loader} loop={true} />
    </Box>
  );
};

export default Loader;
