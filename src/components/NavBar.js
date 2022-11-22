import { DownloadIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  Image,
  Link,
  Spacer,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import logo from '../assets/logo.png';
function NavBar() {
  return (
    <Flex minWidth="max-content" alignItems="center" gap="10" p={10}>
      <Box>
        <Image boxSize="50px" src={logo} alt="noora_logo" />
      </Box>
      <Text as="b" fontSize="5xl">
        Icon Library
      </Text>
      <Spacer />
      <Box bg="black" _hover={{ bg: 'gray' }} rounded={20}>
        <Button
          rightIcon={<DownloadIcon />}
          colorScheme={'blackAlpha'}
          rounded={20}
        >
          Download all
        </Button>
      </Box>
    </Flex>
  );
}

export default NavBar;
