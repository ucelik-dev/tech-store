'use client';

import { Button, Flex } from '@radix-ui/themes'
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react'
import ProductCategoryFilter from './ProductCategoryFilter';
import ProductSearchFilter from './ProductSearchFilter';

const ProductActions = () => {
  const {data:session} = useSession();

  return (

    <Flex justify={'between'} direction={{ initial:'column', sm:'row'}} gap={{ initial:'2'}}>
      <div className='sm:flex sm:flex-1 sm:justify-start'>
          <ProductCategoryFilter />
      </div>

      <div className='sm:flex sm:flex-1 sm:justify-center'>
          <ProductSearchFilter />
      </div>

      <div className='sm:flex sm:flex-1 sm:justify-end'>
      {session?.user.isAdmin && <Link href="/products/new"><Button className='hover:cursor-pointer w-full dark:bg-gray-200 dark:text-black'>Add New Product</Button></Link>}
      </div>
    </Flex>
  )
}

export default ProductActions