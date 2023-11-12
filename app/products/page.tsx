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
      {products.map((product) => (
        
          <Card key={product.id} className=' hover:drop-shadow-lg hover:shadow-xl hover:border-none  hover:transition-all'>
            <Flex direction='column' align='center' justify={'center'} height={'100%'}>

              <Flex className='object-contain' height={'100%'}>
                <NextLink href={`/products/${product.id}`} passHref legacyBehavior key={product.id}><RadixLink className='hover:no-underline'>
                  <Image src={product.imgUrl} height={200} width={200} alt='' loading="eager" priority={true} className="w-full h-auto"/>
                </RadixLink></NextLink>
              </Flex>
              <Flex className='m-0'>
                <NextLink href={`/products/${product.id}`} passHref legacyBehavior key={product.id}><RadixLink>
                  <Text as="div" size="2" weight="bold" className='sm:h-10 md:h-20'>{product.title}</Text>
                </RadixLink></NextLink>
              </Flex>

              <Flex justify={'between'} align={'center'} width={'100%'} className='mb-0 mt-4 md:mt-0'>
                  <Text as="div" size="6" color="red">${product.price}</Text>
                  <AddToCartButton product={product}/>
              </Flex>
              
            </Flex>
          </Card>

       ))}
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