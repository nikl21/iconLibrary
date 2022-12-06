import { Text, VStack } from '@chakra-ui/react';
import React from 'react';
import CategoryButton from './CategoryButton';

function CategoryList({
  category,
  setCategory,
  setSearchData,
  setSearching,
  setQuery,
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

      <CategoryButton
        title="All"
        isSelected={category === 'all'}
        onClick={() => onClick('all')}
      />
      <CategoryButton
        title="Caregivers"
        isSelected={category === 'caregivers'}
        onClick={() => onClick('caregivers')}
      />
      <CategoryButton
        title="Patient"
        isSelected={category === 'patient'}
        onClick={() => onClick('patient')}
      />
      <CategoryButton
        title="Technology"
        isSelected={category === 'technology'}
        onClick={() => onClick('technology')}
      />
      <CategoryButton
        title="Reports"
        isSelected={category === 'reports'}
        onClick={() => onClick('reports')}
      />
      <CategoryButton
        title="Medical"
        isSelected={category === 'medical'}
        onClick={() => onClick('medical')}
      />
    </VStack>
  );
}

export default CategoryList;
