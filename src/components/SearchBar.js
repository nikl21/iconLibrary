import { Search2Icon } from '@chakra-ui/icons';
import { Input, InputGroup, InputRightElement, Stack } from '@chakra-ui/react';
import React from 'react';

function SearchBar() {
  return (
    <Stack>
      <InputGroup>
        <Input
          placeholder="search"
          size="lg"
          w={[100, 200, 300, 600]}
          rounded={20}
          bg={'#f5f5f5'}
          border={0}
          boxShadow={'xs'}
        />
        <InputRightElement children={<Search2Icon />} mx={4} />
      </InputGroup>
    </Stack>
  );
}

export default SearchBar;
