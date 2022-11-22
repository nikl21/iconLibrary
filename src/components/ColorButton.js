import { Square } from '@chakra-ui/react';
import React from 'react';

function ColorButton({ isSelected, color, onClick }) {
  return (
    <Square
      as="button"
      size="6"
      rounded="full"
      borderColor={!isSelected ? 'white' : 'black'}
      borderWidth="1px"
      onClick={onClick}
    >
      <Square bg={color} size="4" rounded="full" />
    </Square>
  );
}

export default ColorButton;
