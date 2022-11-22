import { Box, Grid, GridItem, SimpleGrid } from '@chakra-ui/react';
import React from 'react';
import IconComponent from './IconComponent';

const IconGrid = ({ data }) => {
  const icons = data.map(icon => (
    <IconComponent name={icon.name} url={icon.image} />
  ));
  return (
    <SimpleGrid pb={40} columns={[1, 1, 3, 4]} py={4}>
      {icons}
    </SimpleGrid>
  );
};

export default IconGrid;
