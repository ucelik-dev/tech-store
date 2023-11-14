'use client';

import { Select } from '@radix-ui/themes';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';
import { categories } from '../utils/store';


const ProductCategoryFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <Select.Root
      defaultValue={searchParams.get('category') || ''}
      onValueChange={(category) => {
        const params = new URLSearchParams();
        if (category) params.append('category', category);
        if (searchParams.get('search'))
          params.append('search', searchParams.get('search')!);
        router.push('/products?' + params);
      }}
    >
      <Select.Trigger placeholder="Select category" className='w-full sm:w-auto dark:bg-gray-200 dark:text-black'/>
      <Select.Content className='dark:bg-gray-200 dark:text-black'>
        {categories.map((category) => (
          <Select.Item className='dark:hover:bg-black'
            key={category.text}
            value={category.value || ' '}
          >
            {category.text}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default ProductCategoryFilter;