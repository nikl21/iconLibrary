import { Box, Center, Flex, Spacer, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import IconGrid from '../components/IconGrid';
import SearchBar from '../components/SearchBar';
import ColorSwitcher from '../components/ColorSwitcher';
import CategoryList from '../components/CategoryList';
import { useQuery } from '@tanstack/react-query';
import { fetchCategory, fetchIcons } from '../utils/queryApi';
import Loader from '../components/Loader';

const skeleton = (
  <Center>
    <Loader />
  </Center>
);
function HomePage() {
  const [category, setCategory] = useState('all');
  const [color, setColor] = useState('#383838');
  const [query, setQuery] = useState('');
  // const [datas, setData] = useState(null);
  const [searchData, setSearchData] = useState(null);
  const [isSearching, setSearching] = useState(false);
  const [fetchPost, setFetchPost] = useState(true);

  const {
    data: data1,
    // isLoading: isLoading1,
    // error: error1,
  } = useQuery([category], () => fetchIcons(category), {
    enabled: fetchPost,
  });

  const {
    data: data2,
    // isLoading: isLoading1,
    // error: error1,
  } = useQuery(['categoryList'], () => fetchCategory(), {
    enabled: fetchPost,
  });
  useEffect(() => {
    setFetchPost(true);
    if (data1 && data1.count === data1.results.length && data2) {
      setFetchPost(false);
    }
  }, [data1]);

  return (
    <Box textAlign="center" fontSize="xl" px={[6, 10, 16]}>
      <NavBar />
      <Flex>
        <Box flex="1" py={4} ml={0}>
          <CategoryList
            category={category}
            setCategory={setCategory}
            setSearching={setSearching}
            categoryList={data2 && data2.results}
            setSearchData={setSearchData}
            setQuery={setQuery}
          />
        </Box>
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
              setCategory={setCategory}
            />
            <Spacer />
            <ColorSwitcher color={color} setColor={setColor} />
          </Flex>
          <Box h={''} mt={10}>
            {data1 ? (
              <Box>
                <IconGrid
                  data={data1}
                  isSearching={isSearching}
                  searchData={searchData}
                  color={color}
                  category={category}
                  setCategory={setCategory}
                />
              </Box>
            ) : (
              <Flex h={600} items={'center'} justify="center">
                {skeleton}
              </Flex>
            )}
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
