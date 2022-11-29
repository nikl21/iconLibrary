import {
  Box,
  Center,
  Flex,
  Grid,
  GridItem,
  SimpleGrid,
  Skeleton,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import IconComponent from './IconComponent';

const IconGrid = ({ data, isSearching }) => {
  const icons =
    data &&
    data !== 'none' &&
    data.map(icon => (
      <IconComponent key={icon.name} name={icon.name} url={icon.image} />
    ));
  const skeleton = [1, 1, 1, 1, 1, 1, 1, , 1, 1, 1, 1, 1, 1, 1, 1, 1].map(
    (i, index) => <Skeleton height="200px" key={index} width="200px" m={4} />
  );
  return (
    <>
      {data === 'none' && !isSearching ? (
        <Box h="full" pt="40">
          <Text>Sorry We didn't find anything!</Text>
        </Box>
      ) : (
        <SimpleGrid pb={40} columns={[1, 1, 2, 4]} py={4}>
          {console.log(data, 'dat', isSearching)}
          {isSearching
            ? skeleton
            : data && data !== 'none' && data.length > 0
            ? icons
            : skeleton}
        </SimpleGrid>
      )}
    </>
  );
};

export default IconGrid;
