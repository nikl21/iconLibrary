import {
  Box,
  Center,
  Divider,
  Flex,
  Spacer,
  Spinner,
  Text,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import IconGrid from '../components/IconGrid';
import SearchBar from '../components/SearchBar';
import ColorSwitcher from '../components/ColorSwitcher';
import CategoryList from '../components/CategoryList';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { fetchIcons } from '../App';

function HomePage() {
  const [category, setCategory] = useState('all');
  const [color, setColor] = useState('#383838');
  const [query, setQuery] = useState('');
  // const [datas, setData] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const [searchData, setSearchData] = useState(null);
  const [isSearching, setSearching] = useState(false);

  const { status, data, error } = useQuery(['data'], fetchIcons);
  useEffect(() => {
    function filter() {
      const filterColor = [];
      if (!searchData) {
        data &&
          data?.results.forEach(icon => {
            const iconObj = {};
            iconObj.category = icon.category.slug;
            icon.variants.forEach(variant => {
              if (variant.color === color) {
                iconObj.image = variant.image;
                iconObj.name = variant.filename;
                if (category === 'all') {
                  filterColor.push(iconObj);
                } else if (category === icon.category.slug) {
                  filterColor.push(iconObj);
                }
              }
            });
          });
      } else {
        searchData?.forEach(icon => {
          const iconObj = {};
          iconObj.category = icon.category.slug;
          icon.variants.forEach(variant => {
            if (variant.color === color) {
              iconObj.image = variant.image;
              iconObj.name = variant.filename;
              if (category === 'all') {
                filterColor.push(iconObj);
              } else if (category === icon.category.slug) {
                filterColor.push(iconObj);
              }
            }
          });
        });
      }
      setFilteredData(filterColor);
    }
    filter();
  }, [color, data, category, searchData]);
  return (
    <Box textAlign="center" fontSize="xl" px={[6, 10, 16]}>
      <NavBar />
      <Flex>
        <Box flex="1" py={4} ml={0}>
          <CategoryList
            category={category}
            setCategory={setCategory}
            setSearchData={setSearchData}
          />
        </Box>
        {/* <Center>
          <Divider
            orientation="vertical"
            color="black"
            borderWidth="1px"
            borderColor="black"
            h="full"
          />
        </Center> */}
        <Box flex="5" bg="" mx={4}>
          <Flex
            align="center"
            flexDirection={['column', 'column', 'column', 'row']}
          >
            <SearchBar
              query={query}
              setQuery={setQuery}
              setData={setSearchData}
              setSearching={setSearching}
            />
            <Spacer />
            <ColorSwitcher color={color} setColor={setColor} />
          </Flex>
          <Box style={{ overflowY: 'scroll' }} h={'80vh'}>
            <IconGrid data={filteredData} isSearching={isSearching} />
          </Box>
          <Box p={10}>
            <Text as="b" color="black">
              Don't see What you are looking for ?
            </Text>
            <Text color="black">
              Please share your suggestions on Slack:
              <Text as="b" color={'#00956E'}>
                {` #noora-health-the-brand`}
              </Text>
            </Text>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
}

export default HomePage;
