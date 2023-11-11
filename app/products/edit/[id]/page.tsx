import React from 'react'
import dynamic from "next/dynamic";
import prisma from '@/prisma/client';
import { notFound } from "next/navigation";
import { Metadata } from 'next';

const ProductForm = dynamic( () => import('@/app/products/ProductForm'), { ssr: false } );

const EditProductPage = async ({ params }: {params: { id: string }}) => {
  const product = await prisma.product.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!product) notFound();
  
  return (
    <ProductForm product={product}/>
  )
}

export const metadata: Metadata = {
  title: 'Tech Shop - Update Product',
  description: 'Update details of the product'
}

export default EditProductPage