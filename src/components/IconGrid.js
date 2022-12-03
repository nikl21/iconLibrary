import { Box, SimpleGrid, Skeleton, Text } from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import IconComponent from './IconComponent';
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from 'axios';
import FilterColor from '../utils/FilterColor';
import { queryClient } from '../utils/queryApi';

const IconGrid = ({ data, isSearching, color, category }) => {
  const [nextData, setNextData] = useState(data.next);
  const [iconData, setData] = useState(data.results);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // console.log(filteredData.length,nextData);
  // useEffect(() => {
  //   if (!isLoading) {
  //     console.log('done');
  //     const prevData = queryClient.getQueryData([category]);
  //     console.log(prevData, iconData);
  //     if (prevData.results.length !== iconData.length) {
  //       prevData.next = null;
  //       prevData.results = iconData;
  //       queryClient.setQueryData([category], prevData);
  //     }
  //   }
  // }, [isLoading, category, iconData]);
  useEffect(() => {
    setData(data.results);
    if (data.next) {
      setNextData(data.next);
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }

    return;
  }, [category, data]);
  useEffect(() => {
    setFilteredData([]);
  }, [category]);

  useEffect(() => {
    function filter() {
      const filterColor = FilterColor(iconData, color);
      setFilteredData(filterColor);
    }
    iconData && filter();
  }, [color, iconData, data]);

  async function fetchData() {
    console.log('fetching');
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
      {data === 'none' && !isSearching ? (
        <Box h="full" pt="40">
          <Text>Sorry We didn't find anything!</Text>
        </Box>
      ) : (
        <InfiniteScroll
          dataLength={18} //This is important field to render the next data
          next={fetchData}
          hasMore={isLoading}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          <SimpleGrid pb={40} columns={[1, 1, 2, 4]} py={4}>
            {filteredData && filteredData !== 'none' && icons}
          </SimpleGrid>
        </InfiniteScroll>
      )}
    </>
  );
};

export default IconGrid;
