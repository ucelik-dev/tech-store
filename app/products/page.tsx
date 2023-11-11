import prisma from '@/prisma/client';
import { Card, Flex, Grid, Link as RadixLink, Text } from "@radix-ui/themes";
import React from 'react'
import NextLink from "next/link";
import Image from 'next/image';
import ProductActions from './ProductActions';
import AddToCartButton from './[id]/AddToCartButton';
import Pagination from '../components/Pagination';
import { ProductCategory } from '@prisma/client';
import { Metadata } from 'next';

const ProductList = async ({ searchParams } : { searchParams: { category: ProductCategory, page: string, search: string }}) => {

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 8;



  return (
    <Flex direction='column' gap='3'>
      
      <ProductActions />

      
      <Flex align={'center'} justify={'between'}>
        <Pagination pageSize={pageSize} currentPage={page} itemCount={10}/>
        <Text size={'2'}>{10} products</Text>
      </Flex>
       

    </Flex>
  );
}

export const metadata: Metadata = {
  title: 'Tech Shop - Products',
  description: 'View all products'
}

export default ProductList