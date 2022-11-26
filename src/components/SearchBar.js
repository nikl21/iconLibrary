import { Search2Icon } from '@chakra-ui/icons';
import {
  Button,
  Center,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
} from '@chakra-ui/react';
import axios from 'axios';
import React from 'react';

function SearchBar({ query, setQuery, setData, setSearching }) {
  return (
    <HStack>
      <InputGroup>
        <Input
          placeholder="search"
          size="lg"
          w={[100, 200, 300, 600]}
          rounded={20}
          bg={'#f5f5f5'}
          border={0}
          value={query}
          onChange={e => {
            setQuery(e.target.value);
          }}
          boxShadow={'xs'}
        />
      </InputGroup>
      <Button
        onClick={() => {
          setSearching(true);
          axios
            .get(
              `https://staging.noorahealth.org/icons/api/v1/search/?q=${query}`
            )
            .then(result => {
              console.log(result.data);
              setData(result.data);
              setSearching(false);
            });
        }}
        p={6}
        bg={'none'}
      >
        <Search2Icon />
      </Button>
    </HStack>
  );
}

export default SearchBar;
