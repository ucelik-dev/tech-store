"use client";

import React, { useState } from 'react'
import '../globals.css'
import ProductsDetails from './ProductsDetails';
import ContactForm from './ContactForm';
import { Heading } from '@radix-ui/themes';

const CartPage = () => {
  const [openContact, setOpenContact] = useState(false);

  return (
    <div className='h-full flex flex-col lg:flex-col gap-4'>
      <Heading align={'center'} className='italic mb-3'>Shopping Cart</Heading>
      <div className='h-full flex flex-col lg:flex-row gap-4'>
        <ProductsDetails openContact={openContact} setOpenContact={setOpenContact}/>
        <ContactForm />
      </div>
      
    </div>
  )
}

export default CartPage