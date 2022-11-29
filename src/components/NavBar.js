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
import { saveAs } from 'file-saver';
import icons from '../assets/icon_library.zip';
function NavBar() {
  return (
    <Flex minWidth="max-content" alignItems="center" gap="10" p={10}>
      <Box>
        <Image boxSize="50px" src={logo} alt="noora_logo" />
      </Box>
      <Text fontWeight={600} fontSize="5xl">
        Icon Library
      </Text>
      <Spacer />
      <Box rounded={20}>
        <Button
          rightIcon={<DownloadIcon />}
          variant="outline"
          colorScheme="black"
          rounded={20}
          onClick={() => {
            saveAs(icons, 'all_Icons.zip');
          }}
        >
          Download all
        </Button>
      </Box>
    </Flex>
  );
}

export default NavBar;
