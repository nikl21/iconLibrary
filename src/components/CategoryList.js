import { Text, VStack } from '@chakra-ui/react';
import React from 'react';
import CategoryButton from './CategoryButton';

function CategoryList({ category, setCategory }) {
  return (
    <VStack gap={6} style={{ overflowY: 'scroll' }} h={'80vh'}>
      <Text as="b" color="black">
        Categories:
      </Text>

      <CategoryButton
        title="All"
        isSelected={category === 'all'}
        onClick={() => setCategory('all')}
      />
      <CategoryButton
        title="Caregivers"
        isSelected={category === 'caregivers'}
        onClick={() => setCategory('caregivers')}
      />
      <CategoryButton
        title="Patient"
        isSelected={category === 'patient'}
        onClick={() => setCategory('patient')}
      />
      <CategoryButton
        title="Technology"
        isSelected={category === 'technology'}
        onClick={() => setCategory('technology')}
      />
      <CategoryButton
        title="Reports"
        isSelected={category === 'reports'}
        onClick={() => setCategory('reports')}
      />
      <CategoryButton
        title="Medical"
        isSelected={category === 'medical'}
        onClick={() => setCategory('medical')}
      />
    </VStack>
  );
}

export default CategoryList;
