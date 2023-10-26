import { Text, VStack } from '@chakra-ui/react';
import React from 'react';
import CategoryButton from './CategoryButton';

function CategoryList({
  category,
  setCategory,
  setSearchData,
  setSearching,
  setQuery,
  categoryList,
}) {
  function onClick(category) {
    setCategory(category);
    setSearchData(null);
    setQuery('');
    setSearching(false);
  }
  return (
    <VStack
      gap={6}
      // style={{ overflowY: 'scroll' }}
      h={'80vh'}
      justify="flex-start"
      align="left"
    >
      <Text fontWeight={600} color="black" align="left">
        Categories:
      </Text>
      {categoryList &&
        categoryList.map(cat => (
          <CategoryButton
            title={cat.name}
            isSelected={category === cat.slug}
            onClick={() => onClick(cat.slug)}
          />
        ))}
    </VStack>
  );
}

export default CategoryList;
