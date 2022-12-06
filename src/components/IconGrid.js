import { Box, Center, Flex, SimpleGrid, Text } from '@chakra-ui/react';

import React, { useEffect, useState } from 'react';

import IconComponent from './IconComponent';
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from 'axios';
import FilterColor from '../utils/FilterColor';
import { queryClient } from '../utils/queryApi';
import Loader from './Loader';

const IconGrid = ({ data, isSearching, searchData, color, category }) => {
  const [nextData, setNextData] = useState(data.next);
  const [iconData, setData] = useState(data.results);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    function filter() {
      const filterColor = FilterColor(iconData, color);
      setFilteredData(filterColor);
    }
    iconData && filter();
  }, [color, iconData, data]);

  useEffect(() => {
    if (!isSearching && searchData?.results?.length > 0) {
      console.log('hi', searchData.results);
      setData(searchData.results);
      setFilteredData([]);
    } else {
      setData([]);
    }
  }, [isSearching, searchData]);

  useEffect(() => {
    setData(data.results);
    if (data.next) {
      setNextData(data.next);
      setIsLoading(true);
    } else {
      setNextData(null);
      setIsLoading(false);
    }
  }, [data]);

  useEffect(() => {
    if (
      data.count !== data.results.length &&
      filteredData.length === data.count
    ) {
      const newData = { ...data, results: iconData, next: null };
      queryClient.setQueryData([category], newData);
    }
  }, [data, category, filteredData.length, iconData]);

  async function fetchData() {
    if (nextData === null) {
      setIsLoading(false);
    } else {
      const result = await axios
        .get(nextData)
        .then(dat => {
          setNextData(dat.data.next);
          return dat.data;
        })
        .catch(error => console.log(error));
      setData(data => data.concat(result.results));

      if (!result.next) {
        setIsLoading(false);
      } else {
        setNextData(result.next);
      }
    }
  }

  const icons = filteredData.map(icon => (
    <IconComponent key={icon.name} name={icon.name} url={icon.image} />
  ));

  return (
    <>
      {searchData === 'none' && !isSearching ? (
        <Box pt="40">
          <Text>Sorry We didn't find anything!</Text>
        </Box>
      ) : isSearching ? (
        <Center h={600}>
          <Loader />
        </Center>
      ) : (
        <Box
          style={{ overflowY: 'scroll' }}
          id="scroll"
          height="600"
          flexDirection="column-reverse"
        >
          <InfiniteScroll
            dataLength={iconData.length} //This is important field to render the next data
            next={fetchData}
            hasMore={isLoading}
            loader={
              <Flex h={600} items="center" justify="center">
                <Loader />
              </Flex>
            }
            scrollableTarget="scroll"
          >
            <SimpleGrid pb={0} columns={[1, 1, 2, 4]}>
              {filteredData && filteredData !== 'none' && icons}
            </SimpleGrid>
          </InfiniteScroll>
        </Box>
      )}
    </>
  );
};

export default IconGrid;
