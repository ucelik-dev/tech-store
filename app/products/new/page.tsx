import React from 'react'
import dynamic from 'next/dynamic'
import { Metadata } from 'next'
import RouteProtectionAuthorized from '@/app/components/RouteProtectionAuthorized'

const ProductForm = dynamic(() => import('@/app/products/ProductForm'), {ssr: false})

const NewProductPage = () => {
  
  return (
    <RouteProtectionAuthorized>
      <ProductForm />
    </RouteProtectionAuthorized>
  )
}

export const metadata: Metadata = {
  title: 'Tech Store - Add New Product',
  description: 'Add a new product to the store'
}

export default NewProductPage