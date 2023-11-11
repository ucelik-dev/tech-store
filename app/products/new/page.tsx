import React from 'react'
import dynamic from 'next/dynamic'
import { Metadata } from 'next'

const ProductForm = dynamic(() => import('@/app/products/ProductForm'), {ssr: false})

const NewProductPage = () => {
  
  return (
    <ProductForm />
  )
}

export const metadata: Metadata = {
  title: 'Tech Shop - Add New Product',
  description: 'Add a new product to the store'
}

export default NewProductPage