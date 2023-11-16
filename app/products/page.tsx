import prisma from '@/prisma/client';
import { Flex, Grid, Text } from "@radix-ui/themes";
import React from 'react'
import ProductActions from './ProductActions';
import Pagination from '../components/Pagination';
import { ProductCategory } from '@prisma/client';
import { Metadata } from 'next';
import ProductCard from './ProductCard';

const ProductList = async ({ searchParams } : { searchParams: { category: ProductCategory, page: string, search: string }}) => {

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 8;
  
  if(searchParams.category === 'Other'){
    var products = await prisma.product.findMany({ where: { id: { not: 0 }, title: { contains: searchParams.search } }, skip: (page - 1) * pageSize, take: pageSize });
  } else {
    var products = await prisma.product.findMany({ where: { category: searchParams.category, title: { contains: searchParams.search } }, skip: (page - 1) * pageSize, take: pageSize });
  }

  if(searchParams.category === 'Other'){
    var productCount = await prisma.product.count({where: { id: { not: 0 }, title: { contains: searchParams.search } }})
  } else {
    var productCount = await prisma.product.count({where: { category: searchParams.category, title: { contains: searchParams.search } }})
  }

  return (
    <Flex direction='column' gap='3'>
      
      <ProductActions />

      <Grid columns={{ initial:"1", sm:"3", md:"4" }} gap="3" width="auto">
        {products.map((product) => ( <ProductCard product={product} key={product.id}/> ))}
       </Grid>

      <Flex align={'center'} justify={'between'}>
        <Pagination pageSize={pageSize} currentPage={page} itemCount={productCount}/>
        <Text size={'2'}>{productCount} products</Text>
      </Flex>

    </Flex>
  );
}

export const metadata: Metadata = {
  title: 'Tech Store - Products',
  description: 'View all products'
}

export default ProductList