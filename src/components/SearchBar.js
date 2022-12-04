import { Search2Icon } from '@chakra-ui/icons';
import { Button, HStack, Input, InputGroup } from '@chakra-ui/react';
import axios from 'axios';
import React from 'react';

function SearchBar({ query, setQuery, setData, setSearching, setCategory }) {
  function search() {
    setSearching(true);
    axios
      .get(
        `https://staging.noorahealth.org/icons/api/v1/search/?limit=30&q=${query}`
      )
      .then(result => {
        setCategory('all');
        console.log(result.data);
        if (result.data.results.length > 0) {
          setData(result.data.results);
        } else {
          setData('none');
        }
        setSearching(false);
      });
  }
  function onKeyDown(e) {
    if (e.key === 'Enter') {
      search();
    }
  }
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
          onKeyDown={onKeyDown}
          boxShadow={'xs'}
        />
      </InputGroup>
      <Button onClick={search} p={6} bg={'none'}>
        <Search2Icon />
      </Button>
    </HStack>
  );
}

export default SearchBar;
