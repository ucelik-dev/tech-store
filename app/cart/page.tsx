"use client";

import React, { useState } from 'react'
import '../globals.css'
import ProductsDetails from './ProductsDetails';
import PaymentDetails from './PaymentDetails';
import ContactForm from './ContactForm';
import { Metadata } from 'next';

const CartPage = () => {
  const [openContact, setOpenContact] = useState(false);

  return (
    <div className='h-full flex flex-col lg:flex-col gap-4'>
      <div className='h-full flex flex-col lg:flex-row gap-4'>
        <ProductsDetails />
        <PaymentDetails openContact={openContact} setOpenContact={setOpenContact}/>
      </div>
        {openContact &&  
          <div>
            <ContactForm openContact={openContact} setOpenContact={setOpenContact}/>
          </div>
        }
    </div>
  )
}

export default CartPage