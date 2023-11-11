'use client'

import { Button, Separator } from '@radix-ui/themes'
import React from 'react'
import formatCurrency from '../utils/formatCurrency'
import { useRouter } from 'next/navigation'
import { useCartStore } from '../utils/store'
import { useSession } from 'next-auth/react'

interface Props {
  openContact: Boolean;
  setOpenContact: React.Dispatch<React.SetStateAction<boolean>>;
}

const PaymentDetails = ({ openContact, setOpenContact } : Props) => {
  const { totalItems, totalPrice, emptyCart } = useCartStore();
  const deliveryCost = (totalPrice>50 || totalItems === 0) ? 0 : 5;
  const router = useRouter();
  const {data:session} = useSession();  
  
  return (
    <div className='flex h-[100vh-5rem] p-4 pt-3 flex-col gap-4 border-2 lg:w-1/2 w-full rounded-xl shadow-md'>
      <h1 className='p-1 font-bold'>Payment</h1>
      <Separator orientation="horizontal" size={'4'}/>
      <div className='flex justify-between'>
        <span>Subtotal ({totalItems} items)</span>
        <span>{formatCurrency(totalPrice)}</span>
      </div>
      <div className='flex justify-between'>
        <span>Delivery Cost</span>
        <span>{formatCurrency(deliveryCost)}</span>
      </div>
      <Separator orientation="horizontal" size={'4'}/>
      <div className='flex justify-between'>
        <span>TOTAL (INCL. VAT)</span>
        <span className='font-bold'>{ formatCurrency(totalPrice + deliveryCost)}</span>
      </div>
      <div className="flex sm:flex-row flex-col justify-center align-center w-full gap-3 mt-5">
        <Button
          className="px-4 rounded-md"
          onClick={() => router.push("/products")}
        >
          Continue Shopping
        </Button>
        <Button
          className="px-4 rounded-md"
          disabled={totalItems === 0}
          onClick={() => emptyCart()}
        >
          Empty Carty
        </Button>
        <Button
          className="px-4 rounded-md"
          disabled={totalItems === 0 || openContact === true }
          onClick={() => session ? setOpenContact(true) : router.push('/api/auth/signin')}
        >
          Proceed to Order
        </Button>
      </div>
    </div>
  )
}

export default PaymentDetails