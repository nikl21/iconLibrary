import { Button, Text } from '@chakra-ui/react';
import React from 'react';

function CategoryButton({ isSelected, title, onClick }) {
  return (
    <Button
      bg={!isSelected ? 'white' : 'black'}
      w={40}
      variant={isSelected ? 'solid' : 'outline'}
      rounded={20}
      color={isSelected ? 'white' : 'black'}
      py={4}
      borderColor="black"
      onClick={onClick}
      colorScheme="blackAlpha"
      justifyContent="flex-start"
    >
      <Text fontWeight={400}>{title}</Text>
    </Button>
  );
}

export default CategoryButton;
