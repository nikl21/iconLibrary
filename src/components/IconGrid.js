import { Box, Grid, GridItem, SimpleGrid, Skeleton } from '@chakra-ui/react';
import React from 'react';
import IconComponent from './IconComponent';

const IconGrid = ({ data, isSearching }) => {
  const icons =
    data &&
    data.map(icon => (
      <IconComponent key={icon.name} name={icon.name} url={icon.image} />
    ));
  const skeleton = [1, 1, 1, 1, 1, 1, 1, , 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map(
    i => <Skeleton height="150" width="150" m={4} />
  );
  return (
    <SimpleGrid pb={40} columns={[1, 1, 3, 4]} py={4}>
      {isSearching ? skeleton : data && data.length > 0 ? icons : skeleton}
    </SimpleGrid>
  );
};

export default IconGrid;
