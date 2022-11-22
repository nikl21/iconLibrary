import { Box, Center, Divider, Flex, Spacer, Spinner } from '@chakra-ui/react';
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
  // const [datas, setData] = useState(null);
  const [filteredData, setFilteredData] = useState(null);

  const { status, data, error } = useQuery(['data'], fetchIcons);

  useEffect(() => {
    function filter() {
      const filterColor = [];
      data &&
        data.forEach(icon => {
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
      setFilteredData(filterColor);
    }
    filter();
  }, [color, data, category]);
  return (
    <Box textAlign="center" fontSize="xl" px={16}>
      <NavBar />
      <Flex>
        <Box flex="1" py={4}>
          <CategoryList category={category} setCategory={setCategory} />
        </Box>
        <Center>
          <Divider
            orientation="vertical"
            color="black"
            borderWidth="1px"
            borderColor="black"
            h="full"
          />
        </Center>
        <Box flex="4" bg="" mx={16}>
          <Flex align="center">
            <SearchBar />
            <Spacer />
            <ColorSwitcher color={color} setColor={setColor} />
          </Flex>
          <Box style={{ overflowY: 'scroll' }} h={'80vh'}>
            <IconGrid data={filteredData} />
          </Box>
        </Box>
      </Flex>
    </Box>
  );
}

export default HomePage;
