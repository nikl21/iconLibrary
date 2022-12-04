import { Box, Center, SimpleGrid, Skeleton, Text } from '@chakra-ui/react';
import React from 'react';
import Lottie from 'lottie-react';
import LoadAnimation from '../assets/loader.json';
import IconComponent from './IconComponent';

const IconGrid = ({ data, isSearching }) => {
  const icons =
    data &&
    data !== 'none' &&
    data.map(icon => (
      <IconComponent key={icon.name} name={icon.name} url={icon.image} />
    ));
  // const skeleton = [1, 1, 1, 1, 1, 1, 1, , 1, 1, 1, 1, 1, 1, 1, 1, 1].map(
  //   (i, index) => <Skeleton height="200px" key={index} width="200px" m={4} />
  // );
  const skeleton = (
    <Center h="full" mt={-200}>
      <Box boxSize={200}>
        <Lottie animationData={LoadAnimation} loop={true} />
      </Box>
    </Center>
  );
  return (
    <>
      {data === 'none' && !isSearching ? (
        <Box h="full" pt="40">
          <Text>Sorry We didn't find anything!</Text>
        </Box>
      ) : isSearching ? (
        skeleton
      ) : data && data !== 'none' && data.length > 0 ? (
        <SimpleGrid pb={40} columns={[1, 1, 2, 4]} py={4}>
          {icons}
          {/* {isSearching
            ? skeleton
            : data && data !== 'none' && data.length > 0
            ? icons
            : skeleton} */}
        </SimpleGrid>
      ) : (
        skeleton
      )}
    </>
  );
};

export default IconGrid;
