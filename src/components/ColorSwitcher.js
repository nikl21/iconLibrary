import { Flex, Text } from '@chakra-ui/react';
import React from 'react';
import ColorButton from './ColorButton';

function ColorSwitcher({ color, setColor }) {
  return (
    <Flex align="center" justify="center" gap={4} pt={[10, 10, 10, 0]}>
      <Text fontWeight={600} fontSize="lg">
        Choose Colour:
      </Text>
      <ColorButton
        color="#383838"
        isSelected={color === '#383838'}
        onClick={() => setColor('#383838')}
      />
      <ColorButton
        color="#37B7E6"
        isSelected={color === '#37B7E6'}
        onClick={() => setColor('#37B7E6')}
      />
      <ColorButton
        color="#DD3E77"
        isSelected={color === '#DD3E77'}
        onClick={() => setColor('#DD3E77')}
      />
      <ColorButton
        color="#00956E"
        isSelected={color === '#00956E'}
        onClick={() => setColor('#00956E')}
      />
      <ColorButton
        color="#FAA820"
        isSelected={color === '#FAA820'}
        onClick={() => setColor('#FAA820')}
      />
    </Flex>
  );
}

export default ColorSwitcher;
