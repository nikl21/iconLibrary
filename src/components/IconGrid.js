import { Box, SimpleGrid, Skeleton, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import IconComponent from './IconComponent';
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from 'axios';

const IconGrid = ({ data, isSearching, color, category }) => {
  const [nextData, setNextData] = useState(data.next);
  const [iconData, setData] = useState(data);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  console.log(filteredData.length);
  console.log(nextData, data);

  console.log(isLoading);
  useEffect(() => {
    setNextData(data.next);
  }, [category, data.next]);
  useEffect(() => {
    if (data.next === null) {
      setIsLoading(false);
    }
    function filter() {
      const filterColor = [];
      data.results &&
        data.results.forEach(icon => {
          const iconObj = {};
          icon.variants.forEach(variant => {
            if (variant.color === color) {
              iconObj.image = variant.image;
              iconObj.name = variant.filename;
              filterColor.push(iconObj);
            }
          });
        });
      setFilteredData(filterColor);
    }
    filter();
  }, [color, data, category]);
  async function fetchData() {
    if (nextData === null) {
      setIsLoading(false);
    } else {
      axios
        .get(nextData)
        .then(dat => {
          console.log('next', dat.data);
          const filterColor = [];
          dat.data.results &&
            dat.data.results.forEach(icon => {
              const iconObj = {};
              icon.variants.forEach(variant => {
                if (variant.color === color) {
                  iconObj.image = variant.image;
                  iconObj.name = variant.filename;
                  filterColor.push(iconObj);
                }
              });
            });
          console.log('received next', dat.data.next);
          setFilteredData(filteredData.concat(filterColor));
          setNextData(dat.data.next);
        })
        .catch(error => console.log(error));
    }
    console.log(isLoading);
  }
  const icons =
    filteredData &&
    filteredData !== 'none' &&
    filteredData.map(icon => (
      <IconComponent key={icon.name} name={icon.name} url={icon.image} />
    ));
  const skeleton = [1, 1, 1, 1, 1, 1, 1, , 1, 1, 1, 1, 1, 1, 1, 1, 1].map(
    (i, index) => <Skeleton height="200px" key={index} width="200px" m={4} />
  );
  return (
    <>
      {data === 'none' && !isSearching ? (
        <Box h="full" pt="40">
          <Text>Sorry We didn't find anything!</Text>
        </Box>
      ) : (
        <InfiniteScroll
          dataLength={filteredData.length} //This is important field to render the next data
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
            {isSearching
              ? skeleton
              : filteredData &&
                filteredData !== 'none' &&
                filteredData.length > 0
              ? icons
              : skeleton}
          </SimpleGrid>
        </InfiniteScroll>
      )}
    </>
  );
};

export default IconGrid;
